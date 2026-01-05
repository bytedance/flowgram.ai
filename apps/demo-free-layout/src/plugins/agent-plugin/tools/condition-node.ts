/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { ConditionItem } from '@flowgram.ai/runtime-interface';
import { injectable, FlowNodeFormData, FormModelV2 } from '@flowgram.ai/free-layout-editor';
import { IJsonSchema } from '@flowgram.ai/form-materials';

import { WorkflowNodeType } from '@/nodes';

import type { ToolCallResult } from './type';
import { BaseNodeTool } from './base-tool';
import type { Tool } from '../types';
import { createNodeRender } from '../renders';

interface CreateConditionNodeParams {
  operation: 'create';
  id: string;
  title: string;
  description?: string;
  conditions: ConditionItem[];
  parentNodeID?: string;
}

interface UpdateConditionNodeParams {
  operation: 'update';
  id: string;
  title?: string;
  description?: string;
  conditions?: ConditionItem[];
}

type ConditionNodeParams = CreateConditionNodeParams | UpdateConditionNodeParams;

interface ConditionNodeResult {
  nodeID: string;
}

@injectable()
export class ConditionNodeTool extends BaseNodeTool<ConditionNodeParams, ConditionNodeResult> {
  public readonly tool: Tool = {
    type: 'function',
    function: {
      name: 'ConditionNode',
      description: `在工作流中创建一个 Condition 节点，或者修改一个 Condition 节点的参数

## 创建节点参数类型

全量更新，所有 key 都为必填

\`\`\`typescript
interface CreateConditionNodeParams {
  operation: 'create'; // 固定为 create
  id: string; // 节点 ID，英文、数字、下划线组成
  title: string; // 节点标题，根据用户可理解的语言生成
  description?: string; // 节点描述，根据用户可理解的语言生成
  conditions: ConditionItem[]; // 条件列表
  parentNodeID?: string; // 可选，指定父 Loop 节点 ID，将节点创建在 Loop 内
}
\`\`\`

## 修改节点参数类型

增量更新，可选部分 key 进行更新

\`\`\`typescript
interface UpdateConditionNodeParams {
  operation: 'update'; // 固定为 update
  id: string; // 节点 ID，英文、数字、下划线组成
  title?: string; // 节点标题，根据用户可理解的语言生成
  description?: string; // 节点描述，根据用户可理解的语言生成
  conditions?: ConditionItem[]; // 条件列表
}
\`\`\`

## ConditionItem 参数说明

\`\`\`typescript
interface ConditionItem {
  key: string; // 条件分支的唯一标识符，建议使用 if_xxxxx 格式，例如 if_vbeap
  value: {
    left: IFlowConstantRefValue; // 左值，可以是常量或引用
    operator: ConditionOperator; // 比较运算符
    right?: IFlowConstantRefValue; // 右值，可以是常量或引用（某些运算符不需要右值）
  };
}
\`\`\`

## IFlowConstantRefValue 说明

支持两种形式：

1. 常量形式
\`\`\`typescript
interface ConstantValue {
  type: 'constant';
  content: string | number | boolean | any; // 可以是任意类型，包括数组、对象等
}
\`\`\`

2. 引用形式，content 为引用其他前序节点输出变量的结构
\`\`\`typescript
interface RefValue {
  type: 'ref';
  content: [string, string]; // [节点ID, 输出变量名]
}
\`\`\`

## ConditionOperator 说明

\`\`\`typescript
enum ConditionOperator {
  EQ = 'eq',                     // 等于 - 支持: String, Number, Integer, Boolean, DateTime, Null
  NEQ = 'neq',                   // 不等于 - 支持: String, Number, Integer, Boolean, DateTime, Null
  GT = 'gt',                     // 大于 - 支持: Number, Integer, DateTime
  GTE = 'gte',                   // 大于等于 - 支持: Number, Integer, DateTime
  LT = 'lt',                     // 小于 - 支持: Number, Integer, DateTime
  LTE = 'lte',                   // 小于等于 - 支持: Number, Integer, DateTime
  IN = 'in',                     // 包含于 - 支持: String, Number, Integer, Boolean, DateTime, Null
  NIN = 'nin',                   // 不包含于 - 支持: String, Number, Integer, Boolean, DateTime, Null
  CONTAINS = 'contains',         // 包含 - 支持: String
  NOT_CONTAINS = 'not_contains', // 不包含 - 支持: String
  IS_EMPTY = 'is_empty',         // 为空 - 支持: String, Number, Integer, Boolean, DateTime, Null, Object, Map, Array（不需要 right 参数）
  IS_NOT_EMPTY = 'is_not_empty', // 不为空 - 支持: String, Number, Integer, Boolean, DateTime, Null, Object, Map, Array（不需要 right 参数）
  IS_TRUE = 'is_true',           // 为真 - 支持: Boolean（不需要 right 参数）
  IS_FALSE = 'is_false',         // 为假 - 支持: Boolean（不需要 right 参数）
}
\`\`\`

## 示例

创建一个条件节点：
\`\`\`json
{
  "operation": "create",
  "id": "condition_001",
  "title": "检查用户输入",
  "conditions": [
    {
      "key": "if_contains_hello",
      "value": {
        "left": {
          "type": "ref",
          "content": ["start", "user_input"]
        },
        "operator": "contains",
        "right": {
          "type": "constant",
          "content": "hello"
        }
      }
    },
    {
      "key": "if_is_active",
      "value": {
        "left": {
          "type": "ref",
          "content": ["start", "is_active"]
        },
        "operator": "is_true"
      }
    },
    {
      "key": "if_in_array",
      "value": {
        "left": {
          "type": "ref",
          "content": ["start", "city"]
        },
        "operator": "in",
        "right": {
          "type": "constant",
          "content": ["Beijing", "Shanghai", "Shenzhen"]
        }
      }
    }
  ]
}
\`\`\`
`,
      parameters: {
        type: 'object',
      } as IJsonSchema,
    },
    render: createNodeRender(WorkflowNodeType.Condition),
  };

  public async execute(params: ConditionNodeParams): Promise<ToolCallResult<ConditionNodeResult>> {
    if (params.operation === 'create') {
      if (this.document.getNode(params.id)) {
        return {
          success: false,
          error: `节点 ID ${params.id} 已存在，请重新生成一个唯一的节点 ID。`,
        };
      }
      const nodeID = await this.createConditionNode(params);
      return {
        success: true,
        data: { nodeID },
        message: `成功创建 Condition 节点，节点 ID: ${nodeID}`,
      };
    }
    if (params.operation === 'update') {
      if (!this.document.getNode(params.id)) {
        return {
          success: false,
          error: `节点 ID ${params.id} 不存在，无法进行修改。`,
        };
      }
      const nodeID = await this.updateConditionNode(params);
      return {
        success: true,
        data: { nodeID },
        message: `成功修改 Condition 节点，节点 ID: ${nodeID}`,
      };
    }
    return {
      success: false,
      error: `无效的操作类型 ${
        (params as ConditionNodeParams).operation
      }，仅支持 create 和 update。`,
    };
  }

  private convertConditionItem(item: ConditionItem) {
    const result: ConditionItem = {
      key: item.key,
      value: {
        left: item.value.left,
        operator: item.value.operator,
        right: item.value.right,
      },
    };
    return result;
  }

  private async createConditionNode(params: CreateConditionNodeParams): Promise<string> {
    const conditions = params.conditions.map((item) => this.convertConditionItem(item));

    const nodeConfig = {
      id: params.id,
      type: WorkflowNodeType.Condition,
      data: {
        title: params.title,
        description: params.description,
        conditions,
      },
    };

    const node = params.parentNodeID
      ? this.document.createWorkflowNode(nodeConfig, false, params.parentNodeID)
      : this.document.createWorkflowNode(nodeConfig);

    await this.handleAutoLayout();

    this.focusNode(node);

    return node.id;
  }

  private async updateConditionNode(params: UpdateConditionNodeParams): Promise<string> {
    const node = this.document.getNode(params.id)!;

    const formModel = node?.getData(FlowNodeFormData).getFormModel<FormModelV2>();

    if (params.title !== undefined) {
      formModel.setValueIn('title', params.title);
    }

    if (params.description !== undefined) {
      formModel.setValueIn('description', params.description);
    }

    if (params.conditions !== undefined) {
      const conditions = params.conditions.map((item) => this.convertConditionItem(item));
      formModel.setValueIn('conditions', conditions);
    }

    await this.handleAutoLayout();

    this.focusNode(node);

    return node.id;
  }
}
