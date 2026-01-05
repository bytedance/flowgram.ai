/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { nanoid } from 'nanoid';
import { IFlowConstantRefValue } from '@flowgram.ai/runtime-interface';
import { injectable, FlowNodeFormData, FormModelV2 } from '@flowgram.ai/free-layout-editor';
import { IJsonSchema } from '@flowgram.ai/form-materials';

import { WorkflowNodeType } from '@/nodes';

import type { ToolCallResult } from './type';
import { BaseNodeTool } from './base-tool';
import type { Tool } from '../types';
import { createNodeRender } from '../renders';

interface CreateLoopNodeParams {
  operation: 'create';
  id: string;
  title: string;
  description?: string;
  loopFor: IFlowConstantRefValue;
  loopOutputs?: Record<string, IFlowConstantRefValue>;
}

interface UpdateLoopNodeParams {
  operation: 'update';
  id: string;
  title?: string;
  description?: string;
  loopFor?: IFlowConstantRefValue;
  loopOutputs?: Record<string, IFlowConstantRefValue>;
}

type LoopNodeParams = CreateLoopNodeParams | UpdateLoopNodeParams;

interface LoopNodeResult {
  nodeID: string;
}

@injectable()
export class LoopNodeTool extends BaseNodeTool<LoopNodeParams, LoopNodeResult> {
  public readonly tool: Tool = {
    type: 'function',
    function: {
      name: 'LoopNode',
      description: `在工作流中创建一个 Loop 节点，或者修改一个 Loop 节点的参数

Loop 节点是一个容器节点，用于遍历数组并对每个元素执行一系列子节点。

## 创建节点参数类型

全量更新，所有 key 都为必填

\`\`\`typescript
interface CreateLoopNodeParams {
  operation: 'create'; // 固定为 create
  id: string; // 节点 ID，英文、数字、下划线组成
  title: string; // 节点标题，根据用户可理解的语言生成
  description?: string; // 节点描述，根据用户可理解的语言生成
  loopFor: IFlowConstantRefValue; // 要遍历的数组变量引用
  loopOutputs?: Record<string, IFlowConstantRefValue>; // Loop 输出变量映射
}
\`\`\`

## 修改节点参数类型

增量更新，可选部分 key 进行更新

\`\`\`typescript
interface UpdateLoopNodeParams {
  operation: 'update'; // 固定为 update
  id: string; // 节点 ID，英文、数字、下划线组成
  title?: string; // 节点标题，根据用户可理解的语言生成
  description?: string; // 节点描述，根据用户可理解的语言生成
  loopFor?: IFlowConstantRefValue; // 要遍历的数组变量引用
  loopOutputs?: Record<string, IFlowConstantRefValue>; // Loop 输出变量映射
}
\`\`\`

## loopFor 字段说明

loopFor 字段用于指定要遍历的数组变量，必须引用一个 array 类型的变量

\`\`\`typescript
interface IFlowConstantRefValue {
  type: 'ref'; // 必须是 ref 类型
  content: [string, string]; // [节点ID, 输出变量名]
}
\`\`\`

示例：引用 start 节点的 tasks 数组输出
\`\`\`json
{
  "type": "ref",
  "content": ["start", "tasks"]
}
\`\`\`

## loopOutputs 字段说明

loopOutputs 字段用于定义 Loop 节点的输出变量，通过引用子节点的输出来收集每次迭代的结果

\`\`\`typescript
type LoopOutputs = Record<string, IFlowConstantRefValue>;
\`\`\`

示例：收集子节点 llm_0 的 result 输出
\`\`\`json
{
  "results": {
    "type": "ref",
    "content": ["llm_0", "result"]
  }
}
\`\`\`

## Loop 局部变量

Loop 节点在执行时会自动创建局部作用域，提供以下变量供子节点引用：

1. **item**：当前迭代的数组元素
   - 引用方式：\`{loopId}_locals.item\`
   - 示例：\`["loop_0_locals", "item"]\`

2. **index**：当前迭代的索引（从 0 开始）
   - 引用方式：\`{loopId}_locals.index\`
   - 示例：\`["loop_0_locals", "index"]\`

## 在 Loop 内创建子节点

Loop 是一个容器节点，可以在其内部创建子节点（如 HTTP、Code、LLM 等）。

创建子节点时，需要在对应节点工具的参数中指定 \`parentNodeID\` 参数，值为 Loop 节点的 ID。

示例：在 loop_0 内创建一个 HTTP 节点
\`\`\`json
{
  "operation": "create",
  "id": "http_001",
  "parentNodeID": "loop_0",
  "title": "调用 API",
  "api": {
    "method": "POST",
    "url": {
      "type": "template",
      "content": "https://api.example.com/process"
    }
  },
  "body": {
    "bodyType": "json",
    "json": {
      "type": "template",
      "content": "{\\"task\\": \\"{{loop_0_locals.item}}\\"}"
    }
  }
}
\`\`\`

## 完整示例

创建一个 Loop 节点遍历任务列表：

\`\`\`json
{
  "operation": "create",
  "id": "loop_0",
  "title": "处理任务列表",
  "description": "遍历所有任务并调用 LLM 处理",
  "loopFor": {
    "type": "ref",
    "content": ["start", "tasks"]
  },
  "loopOutputs": {
    "results": {
      "type": "ref",
      "content": ["llm_0", "result"]
    },
    "items": {
      "type": "ref",
      "content": ["loop_0_locals", "item"]
    },
    "indexes": {
      "type": "ref",
      "content": ["loop_0_locals", "index"]
    }
  }
}
\`\`\`

然后在 Loop 内创建子节点（使用其他节点工具，指定 parentNodeID 参数）。

## IMPORTANT: Loop 内节点连接要求

**创建 Loop 后必须完成以下步骤，缺一不可：**

1. **在 Loop 内创建子节点**：使用其他节点工具（LLMNode、HTTPNode、CodeNode 等），必须指定 \`parentNodeID\` 参数为 Loop 节点的 ID
2. **连接 block_start**：Loop 创建时会自动生成 \`block_start_{xxx}\` 节点，必须使用 CreateEdge 工具将 block_start 连接到第一个子节点
3. **连接子节点之间**：如果 Loop 内有多个子节点，必须使用 CreateEdge 工具将它们按执行顺序连接起来
4. **连接 block_end**：Loop 创建时会自动生成 \`block_end_{xxx}\` 节点，必须使用 CreateEdge 工具将最后一个子节点连接到 block_end

**获取 block_start 和 block_end 的 ID：**
- 创建 Loop 后，使用 GetNodeSchema 工具查询 Loop 节点，从返回的 \`blocks\` 字段中获取 block_start 和 block_end 的准确 ID
- block_start 的 type 为 "block_start"，block_end 的 type 为 "block_end"

**完整示例流程：**

步骤1：创建 Loop 节点
\`\`\`json
{
  "operation": "create",
  "id": "loop_0",
  "title": "处理任务列表",
  "loopFor": { "type": "ref", "content": ["start", "tasks"] }
}
\`\`\`

步骤2：获取 Loop 的 block_start 和 block_end ID
\`\`\`json
// 使用 GetNodeSchema 工具
{ "nodeID": "loop_0" }
// 从返回的 blocks 中找到 block_start 和 block_end 的 ID
// 假设返回: block_start_abc123 和 block_end_xyz789
\`\`\`

步骤3：在 Loop 内创建子节点
\`\`\`json
{
  "operation": "create",
  "id": "llm_0",
  "parentNodeID": "loop_0",
  "title": "处理单个任务",
  "modelName": ["start", "llm_config", "model_name"],
  "apiKey": ["start", "llm_config", "api_key"],
  "apiHost": ["start", "llm_config", "api_host"],
  "temperature": 0.7,
  "prompt": "处理任务: {{loop_0_locals.item}}"
}
\`\`\`

步骤4：连接节点（必须使用 CreateEdge 工具）
\`\`\`json
// 连接 block_start 到第一个子节点
{ "from": "block_start_abc123", "to": "llm_0" }

// 如果有多个子节点，连接它们
// { "from": "llm_0", "to": "http_0" }

// 连接最后一个子节点到 block_end
{ "from": "llm_0", "to": "block_end_xyz789" }
\`\`\`

步骤5：更新 Loop 的 loopOutputs（可选）
\`\`\`json
{
  "operation": "update",
  "id": "loop_0",
  "loopOutputs": {
    "results": { "type": "ref", "content": ["llm_0", "result"] }
  }
}
\`\`\`

## 注意事项

1. **operation 参数是必填的**：创建节点时必须传 \`operation: "create"\`，更新节点时必须传 \`operation: "update"\`
2. loopFor 必须引用一个 array 类型的变量
3. Loop 内的子节点可以引用 \`{loopId}_locals.item\` 和 \`{loopId}_locals.index\`
4. loopOutputs 用于收集每次迭代的结果，最终输出为数组
5. 可以在 Loop 内创建 Break 和 Continue 节点来控制循环流程
6. **Loop 内的节点如果没有正确连接，工作流将无法正常执行**
`,
      parameters: {
        type: 'object',
        properties: {
          operation: {
            type: 'string',
            enum: ['create', 'update'],
            description: '操作类型：create 表示创建新节点，update 表示更新现有节点',
          },
          id: { type: 'string', description: '节点 ID' },
        },
        required: ['operation', 'id'],
      } as IJsonSchema,
    },
    render: createNodeRender(WorkflowNodeType.Loop),
  };

  public async execute(params: LoopNodeParams): Promise<ToolCallResult<LoopNodeResult>> {
    if (params.operation === 'create') {
      if (this.document.getNode(params.id)) {
        return {
          success: false,
          error: `节点 ID ${params.id} 已存在，请重新生成一个唯一的节点 ID。`,
        };
      }
      const nodeID = await this.createLoopNode(params);
      return {
        success: true,
        data: { nodeID },
        message: `成功创建 Loop 节点，节点 ID: ${nodeID}`,
      };
    }
    if (params.operation === 'update') {
      if (!this.document.getNode(params.id)) {
        return {
          success: false,
          error: `节点 ID ${params.id} 不存在，无法进行修改。`,
        };
      }
      const nodeID = await this.updateLoopNode(params);
      return {
        success: true,
        data: { nodeID },
        message: `成功修改 Loop 节点，节点 ID: ${nodeID}`,
      };
    }
    return {
      success: false,
      error: `无效的操作类型 ${(params as LoopNodeParams).operation}，仅支持 create 和 update。`,
    };
  }

  private async createLoopNode(params: CreateLoopNodeParams): Promise<string> {
    const node = this.document.createWorkflowNode({
      id: params.id,
      type: WorkflowNodeType.Loop,
      data: {
        title: params.title,
        description: params.description,
        loopFor: params.loopFor,
        loopOutputs: params.loopOutputs || {},
      },
      blocks: [
        {
          id: `block_start_${nanoid(5)}`,
          type: WorkflowNodeType.BlockStart,
          meta: {
            position: {
              x: 32,
              y: 0,
            },
          },
          data: {},
        },
        {
          id: `block_end_${nanoid(5)}`,
          type: WorkflowNodeType.BlockEnd,
          meta: {
            position: {
              x: 192,
              y: 0,
            },
          },
          data: {},
        },
      ],
    });

    await this.handleAutoLayout();

    this.focusNode(node);

    return node.id;
  }

  private async updateLoopNode(params: UpdateLoopNodeParams): Promise<string> {
    const node = this.document.getNode(params.id)!;

    const formModel = node?.getData(FlowNodeFormData).getFormModel<FormModelV2>();

    if (params.title !== undefined) {
      formModel.setValueIn('title', params.title);
    }

    if (params.description !== undefined) {
      formModel.setValueIn('description', params.description);
    }

    if (params.loopFor !== undefined) {
      formModel.setValueIn('loopFor', params.loopFor);
    }

    if (params.loopOutputs !== undefined) {
      formModel.setValueIn('loopOutputs', params.loopOutputs);
    }

    await this.handleAutoLayout();

    this.focusNode(node);

    return node.id;
  }
}
