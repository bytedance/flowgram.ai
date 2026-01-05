/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { IFlowConstantRefValue } from '@flowgram.ai/runtime-interface';
import { injectable, FlowNodeFormData, FormModelV2 } from '@flowgram.ai/free-layout-editor';
import { IJsonSchema } from '@flowgram.ai/form-materials';

import { WorkflowNodeType } from '@/nodes';

import type { ToolCallResult } from './type';
import { BaseNodeTool } from './base-tool';
import type { Tool } from '../types';
import { createNodeRender } from '../renders';

interface ScriptContent {
  language: 'javascript';
  content: string;
}

interface InputsValuesItem {
  [key: string]: IFlowConstantRefValue;
}

interface CreateCodeNodeParams {
  operation: 'create';
  id: string;
  title: string;
  description?: string;
  inputsValues?: InputsValuesItem;
  script: ScriptContent;
  outputs?: IJsonSchema;
  parentNodeID?: string;
}

interface UpdateCodeNodeParams {
  operation: 'update';
  id: string;
  title?: string;
  description?: string;
  inputsValues?: InputsValuesItem;
  script?: ScriptContent;
  outputs?: IJsonSchema;
}

type CodeNodeParams = CreateCodeNodeParams | UpdateCodeNodeParams;

interface CodeNodeResult {
  nodeID: string;
}

@injectable()
export class CodeNodeTool extends BaseNodeTool<CodeNodeParams, CodeNodeResult> {
  public readonly tool: Tool = {
    type: 'function',
    function: {
      name: 'CodeNode',
      description: `在工作流中创建一个 Code 节点，或者修改一个 Code 节点的参数

## 创建节点参数类型

全量更新，所有 key 都为必填

\`\`\`typescript
interface CreateCodeNodeParams {
  operation: 'create'; // 固定为 create
  id: string; // 节点 ID，英文、数字、下划线组成
  title: string; // 节点标题，根据用户可理解的语言生成
  description?: string; // 节点描述，根据用户可理解的语言生成
  inputsValues?: InputsValuesItem; // 节点输入值映射
  script: ScriptContent; // 脚本内容
  outputs?: IJsonSchema; // 节点输出变量的 JSON Schema 定义
}
\`\`\`

## 修改节点参数类型

增量更新，可选部分 key 进行更新

\`\`\`typescript
interface UpdateCodeNodeParams {
  operation: 'update'; // 固定为 update
  id: string; // 节点 ID，英文、数字、下划线组成
  title?: string; // 节点标题，根据用户可理解的语言生成
  description?: string; // 节点描述，根据用户可理解的语言生成
  inputsValues?: InputsValuesItem; // 节点输入值映射
  script?: ScriptContent; // 脚本内容
  outputs?: IJsonSchema; // 节点输出变量的 JSON Schema 定义
}
\`\`\`

## script 字段说明

script 字段包含脚本语言和代码内容

\`\`\`typescript
interface ScriptContent {
  language: 'javascript'; // 脚本语言，目前只支持 javascript
  content: string; // 脚本代码内容
}
\`\`\`

### JavaScript 脚本格式

JavaScript 脚本需要定义一个 async main 函数，通过 params 获取输入，通过 return 返回输出

\`\`\`javascript
async function main({ params }) {
  // 获取输入参数
  const input = params.input;

  // 处理逻辑
  const result = input + input;

  // 返回输出对象
  return {
    key0: result,
    key1: ["hello", "world"],
    key2: { key21: "hi" }
  };
}
\`\`\`

## inputsValues 字段说明

inputsValues 字段用于设置每个输入变量的值，支持常量和引用两种形式

\`\`\`typescript
interface InputsValuesItem {
  [key: string]: IFlowConstantRefValue;
}
\`\`\`

### IFlowConstantRefValue 说明

支持两种形式：

1. 常量形式
\`\`\`typescript
interface ConstantValue {
  type: 'constant';
  content: string | number | boolean | any; // 可以是任意类型
}
\`\`\`

2. 引用形式，content 为引用其他前序节点输出变量的结构
\`\`\`typescript
interface RefValue {
  type: 'ref';
  content: string[]; // [节点ID, 输出变量名, ...嵌套路径]
}
\`\`\`

## outputs 字段说明

outputs 字段接受 JSON Schema 格式定义，用于定义 Code 节点的输出变量类型

outputs 示例：
\`\`\`json
{
  "type": "object",
  "properties": {
    "key0": {
      "type": "string"
    },
    "key1": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "key2": {
      "type": "object",
      "properties": {
        "key21": {
          "type": "string"
        }
      }
    }
  }
}
\`\`\`

## 示例

创建一个 Code 节点：
\`\`\`json
{
  "operation": "create",
  "id": "code_001",
  "title": "字符串拼接",
  "description": "将输入字符串拼接两次",
  "inputsValues": {
    "input": {
      "type": "ref",
      "content": ["start", "AAA"]
    }
  },
  "script": {
    "language": "javascript",
    "content": "async function main({ params }) {\\n  const ret = {\\n    key0: params.input + params.input,\\n    key1: [\\"hello\\", \\"world\\"],\\n    key2: { key21: \\"hi\\" }\\n  };\\n  return ret;\\n}"
  },
  "outputs": {
    "type": "object",
    "properties": {
      "key0": {
        "type": "string"
      },
      "key1": {
        "type": "array",
        "items": {
          "type": "string"
        }
      },
      "key2": {
        "type": "object",
        "properties": {
          "key21": {
            "type": "string"
          }
        }
      }
    }
  }
}
\`\`\`
`,
      parameters: {
        type: 'object',
      } as IJsonSchema,
    },
    render: createNodeRender(WorkflowNodeType.Code),
  };

  public async execute(params: CodeNodeParams): Promise<ToolCallResult<CodeNodeResult>> {
    if (params.operation === 'create') {
      if (this.document.getNode(params.id)) {
        return {
          success: false,
          error: `节点 ID ${params.id} 已存在，请重新生成一个唯一的节点 ID。`,
        };
      }
      const nodeID = await this.createCodeNode(params);
      return {
        success: true,
        data: { nodeID },
        message: `成功创建 Code 节点，节点 ID: ${nodeID}`,
      };
    }
    if (params.operation === 'update') {
      if (!this.document.getNode(params.id)) {
        return {
          success: false,
          error: `节点 ID ${params.id} 不存在，无法进行修改。`,
        };
      }
      const nodeID = await this.updateCodeNode(params);
      return {
        success: true,
        data: { nodeID },
        message: `成功修改 Code 节点，节点 ID: ${nodeID}`,
      };
    }
    return {
      success: false,
      error: `无效的操作类型 ${(params as CodeNodeParams).operation}，仅支持 create 和 update。`,
    };
  }

  private async createCodeNode(params: CreateCodeNodeParams): Promise<string> {
    const nodeConfig = {
      id: params.id,
      type: WorkflowNodeType.Code,
      data: {
        title: params.title,
        description: params.description || 'Run the Script',
        inputsValues: params.inputsValues || {},
        script: params.script,
        outputs: params.outputs || {
          type: 'object',
          properties: {},
        },
      },
    };

    const node = params.parentNodeID
      ? this.document.createWorkflowNode(nodeConfig, false, params.parentNodeID)
      : this.document.createWorkflowNode(nodeConfig);

    await this.handleAutoLayout();

    this.focusNode(node);

    return node.id;
  }

  private async updateCodeNode(params: UpdateCodeNodeParams): Promise<string> {
    const node = this.document.getNode(params.id)!;

    const formModel = node?.getData(FlowNodeFormData).getFormModel<FormModelV2>();

    if (params.title !== undefined) {
      formModel.setValueIn('title', params.title);
    }

    if (params.description !== undefined) {
      formModel.setValueIn('description', params.description);
    }

    if (params.inputsValues !== undefined) {
      formModel.setValueIn('inputsValues', params.inputsValues);
    }

    if (params.script !== undefined) {
      formModel.setValueIn('script', params.script);
    }

    if (params.outputs !== undefined) {
      formModel.setValueIn('outputs', params.outputs);
    }

    await this.handleAutoLayout();

    this.focusNode(node);

    return node.id;
  }
}
