# FlowGram Runtime API 参考

FlowGram Runtime 提供了五个核心 API，用于工作流的验证、运行、监控、结果获取和取消。本文档详细介绍了这些 API 的使用方法、参数和返回值。

## TaskRun API

### 功能描述

TaskRun API 用于启动一个工作流任务，接收工作流 schema 和初始输入，返回任务 ID。

### 参数说明

TaskRun API 接收一个 `TaskRunInput` 对象作为参数：

| 参数名 | 类型 | 必填 | 描述 |
| ------ | ---- | ---- | ---- |
| schema | string | 是 | 工作流 schema 的 JSON 字符串，定义了工作流的节点和边 |
| inputs | object | 否 | 工作流的初始输入参数，可以为空 |

`schema` 参数是一个 JSON 字符串，定义了工作流的结构，包括节点和边的信息。schema 的基本结构如下：

```typescript
interface WorkflowSchema {
  nodes: WorkflowNodeSchema[];
  edges: WorkflowEdgeSchema[];
}

interface WorkflowNodeSchema {
  id: string;
  type: FlowGramNode;
  name?: string;
  meta: {
    position: {
      x: number;
      y: number;
    };
  };
  data: any;
  blocks?: WorkflowNodeSchema[];
  edges?: WorkflowEdgeSchema[];
}

interface WorkflowEdgeSchema {
  sourceNodeID: string;
  sourcePort: string;
  targetNodeID: string;
  targetPort: string;
}
```

### 返回值说明

TaskRun API 返回一个 `TaskRunOutput` 对象：

| 字段名 | 类型 | 描述 |
| ------ | ---- | ---- |
| taskID | string | 任务的唯一标识符，用于后续查询任务状态和结果 |

### 错误处理

TaskRun API 可能会抛出以下错误：

* **Schema 解析错误**：当提供的 schema 不是有效的 JSON 字符串时
* **Schema 结构错误**：当 schema 结构不符合预期格式时
* **节点类型错误**：当 schema 中包含不支持的节点类型时
* **初始化错误**：当工作流初始化失败时

### 使用示例

```javascript
import { TaskRunAPI } from '@flowgram.ai/runtime-js';

const schema = JSON.stringify({
  nodes: [
    {
      id: 'start',
      type: 'start',
      meta: { position: { x: 0, y: 0 } },
      data: {}
    },
    {
      id: 'llm',
      type: 'llm',
      meta: { position: { x: 200, y: 0 } },
      data: {
        modelName: 'gpt-3.5-turbo',
        temperature: 0.7,
        systemPrompt: '你是一个助手',
        prompt: '介绍一下自己'
      }
    },
    {
      id: 'end',
      type: 'end',
      meta: { position: { x: 400, y: 0 } },
      data: {}
    }
  ],
  edges: [
    {
      sourceNodeID: 'start',
      sourcePort: 'out',
      targetNodeID: 'llm',
      targetPort: 'in'
    },
    {
      sourceNodeID: 'llm',
      sourcePort: 'out',
      targetNodeID: 'end',
      targetPort: 'in'
    }
  ]
});

const inputs = {
  userInput: '请介绍一下自己'
};

async function runWorkflow() {
  try {
    const result = await TaskRunAPI({
      schema,
      inputs
    });
    console.log('Task ID:', result.taskID);
    return result.taskID;
  } catch (error) {
    console.error('启动工作流失败:', error);
  }
}
```

### 注意事项

* schema 必须是有效的 JSON 字符串，且符合 WorkflowSchema 的结构
* 工作流必须包含一个起始节点（type: 'start'）和一个结束节点（type: 'end'）
* 节点之间的连接必须通过边（edges）正确定义
* 任务启动后会异步执行，可以通过 TaskReport API 和 TaskResult API 获取执行状态和结果

## TaskReport API

### 功能描述

TaskReport API 用于获取工作流任务的执行报告，包括任务状态和各节点的执行状态。

### 参数说明

TaskReport API 接收一个 `TaskReportInput` 对象作为参数：

| 参数名 | 类型 | 必填 | 描述 |
| ------ | ---- | ---- | ---- |
| taskID | string | 是 | 任务的唯一标识符，由 TaskRun API 返回 |

### 返回值说明

TaskReport API 返回一个 `TaskReportOutput` 对象，包含任务的执行报告：

| 字段名 | 类型 | 描述 |
| ------ | ---- | ---- |
| workflow | WorkflowStatus | 工作流整体状态 |
| nodes | `Record<string, NodeStatus>` | 各节点的执行状态 |

`WorkflowStatus` 结构如下：

```typescript
interface WorkflowStatus {
  status: 'idle' | 'processing' | 'success' | 'fail' | 'canceled';
  terminated: boolean;
}
```

`NodeStatus` 结构如下：

```typescript
interface NodeStatus {
  status: 'idle' | 'processing' | 'success' | 'fail' | 'canceled';
  startTime?: number;
  endTime?: number;
}
```

### 错误处理

TaskReport API 可能会遇到以下错误情况：

* **任务不存在**：当提供的 taskID 不存在时，返回 undefined
* **报告生成错误**：当报告生成过程中出现错误时

### 使用示例

```javascript
import { TaskReportAPI } from '@flowgram.ai/runtime-js';

async function getTaskReport(taskID) {
  try {
    const report = await TaskReportAPI({ taskID });

    if (!report) {
      console.log('任务不存在或报告未生成');
      return;
    }

    console.log('工作流状态:', report.workflow.status);
    console.log('工作流是否终止:', report.workflow.terminated);

    // 打印各节点状态
    for (const [nodeId, nodeStatus] of Object.entries(report.nodes)) {
      console.log(`节点 ${nodeId} 状态:`, nodeStatus.status);
      if (nodeStatus.startTime) {
        console.log(`节点 ${nodeId} 开始时间:`, new Date(nodeStatus.startTime).toLocaleString());
      }
      if (nodeStatus.endTime) {
        console.log(`节点 ${nodeId} 结束时间:`, new Date(nodeStatus.endTime).toLocaleString());
      }
    }

    return report;
  } catch (error) {
    console.error('获取任务报告失败:', error);
  }
}
```

### 注意事项

* 任务报告是实时的，可以多次调用 TaskReport API 来获取最新的执行状态
* 如果工作流尚未终止（`workflow.terminated` 为 false），则工作流仍在执行中
* 节点状态可能为 'idle'（未开始）、'processing'（执行中）、'success'（成功）、'fail'（失败）或 'canceled'（已取消）
* 建议定期轮询任务报告，以监控工作流的执行进度

## TaskCancel API

### 功能描述

TaskCancel API 用于取消正在执行的工作流任务。

### 参数说明

TaskCancel API 接收一个 `TaskCancelInput` 对象作为参数：

| 参数名 | 类型 | 必填 | 描述 |
| ------ | ---- | ---- | ---- |
| taskID | string | 是 | 任务的唯一标识符，由 TaskRun API 返回 |

### 返回值说明

TaskCancel API 返回一个 `TaskCancelOutput` 对象：

| 字段名 | 类型 | 描述 |
| ------ | ---- | ---- |
| success | boolean | 表示任务是否成功取消 |

### 错误处理

TaskCancel API 可能会遇到以下错误情况：

* **任务不存在**：当提供的 taskID 不存在时，返回 `{ success: false }`
* **任务已完成**：当任务已经完成或已经取消时，无法再次取消

### 使用示例

```javascript
import { TaskCancelAPI } from '@flowgram.ai/runtime-js';

async function cancelTask(taskID) {
  try {
    const result = await TaskCancelAPI({ taskID });

    if (result.success) {
      console.log('任务已成功取消');
    } else {
      console.log('任务取消失败，可能任务不存在或已完成');
    }

    return result.success;
  } catch (error) {
    console.error('取消任务失败:', error);
    return false;
  }
}
```

### 注意事项

* 任务取消是异步的，取消请求成功后，任务可能需要一些时间才能完全停止
* 已经完成的任务无法取消
* 取消任务后，可以通过 TaskReport API 查看任务的最终状态，已取消的任务状态将变为 'canceled'
* 取消任务不会清除任务的中间结果，仍然可以通过 TaskResult API 获取已执行部分的结果

## TaskResult API

### 功能描述

TaskResult API 用于获取工作流任务的最终结果。

### 参数说明

TaskResult API 接收一个 `TaskResultInput` 对象作为参数：

| 参数名 | 类型 | 必填 | 描述 |
| ------ | ---- | ---- | ---- |
| taskID | string | 是 | 任务的唯一标识符，由 TaskRun API 返回 |

### 返回值说明

TaskResult API 返回一个 `WorkflowOutputs` 对象，包含工作流的输出结果：

```typescript
type WorkflowOutputs = Record<string, any>;
```

返回的对象结构取决于工作流的具体实现和输出定义。

### 错误处理

TaskResult API 可能会遇到以下错误情况：

* **任务不存在**：当提供的 taskID 不存在时，返回 undefined
* **任务未完成**：当任务尚未终止时，返回 undefined
* **结果获取错误**：当获取结果过程中出现错误时

### 使用示例

```javascript
import { TaskResultAPI } from '@flowgram.ai/runtime-js';

async function getTaskResult(taskID) {
  try {
    const result = await TaskResultAPI({ taskID });

    if (!result) {
      console.log('任务不存在或尚未完成');
      return;
    }

    console.log('任务结果:', result);
    return result;
  } catch (error) {
    console.error('获取任务结果失败:', error);
  }
}

// 使用示例：等待任务完成并获取结果
async function waitForResult(taskID, pollingInterval = 1000, timeout = 60000) {
  const startTime = Date.now();

  while (Date.now() - startTime < timeout) {
    // 获取任务报告
    const report = await TaskReportAPI({ taskID });

    // 如果任务已终止，获取结果
    if (report && report.workflow.terminated) {
      return await TaskResultAPI({ taskID });
    }

    // 等待一段时间后再次检查
    await new Promise(resolve => setTimeout(resolve, pollingInterval));
  }

  throw new Error('等待任务结果超时');
}
```

### 注意事项

* 只有当任务已经终止（完成、失败或取消）时，才能获取到结果
* 如果任务尚未完成，TaskResult API 将返回 undefined
* 建议先通过 TaskReport API 检查任务是否已终止，再调用 TaskResult API 获取结果
* 对于已取消的任务，可能只能获取到部分结果或没有结果
* 结果的具体结构取决于工作流的定义，需要根据实际工作流的输出进行解析

## TaskValidate API

### 功能描述

TaskValidate API 用于验证工作流 schema 和输入参数的有效性，在实际运行工作流之前检查配置是否正确。这个 API 可以帮助您在启动工作流之前发现潜在的配置错误。

### 参数说明

TaskValidate API 接收一个 `TaskValidateInput` 对象作为参数：

| 参数名 | 类型 | 必填 | 描述 |
| ------ | ---- | ---- | ---- |
| schema | string | 是 | 工作流 schema 的 JSON 字符串，定义了工作流的节点和边 |
| inputs | object | 否 | 工作流的初始输入参数，用于验证输入是否符合 schema 要求 |

### 返回值说明

TaskValidate API 返回一个 `TaskValidateOutput` 对象：

| 字段名 | 类型 | 描述 |
| ------ | ---- | ---- |
| valid | boolean | 表示验证是否通过，true 表示验证成功，false 表示验证失败 |
| errors | string\[] | 可选字段，当验证失败时包含具体的错误信息列表 |

### 验证内容

TaskValidate API 会对以下内容进行验证：

* **Schema 结构验证**：检查 schema 是否符合 WorkflowSchema 的格式要求
* **节点类型验证**：验证 schema 中的节点类型是否被支持
* **边连接验证**：检查节点之间的连接是否正确
* **输入参数验证**：验证提供的 inputs 是否符合 schema 中定义的输入要求
* **工作流完整性验证**：检查工作流是否包含必要的起始和结束节点

### 错误处理

TaskValidate API 可能会返回以下类型的验证错误：

* **Schema 解析错误**：当提供的 schema 不是有效的 JSON 字符串时
* **Schema 结构错误**：当 schema 结构不符合预期格式时
* **节点配置错误**：当节点配置不完整或不正确时
* **连接错误**：当节点之间的连接存在问题时
* **输入参数错误**：当输入参数不符合要求时

### 使用示例

```javascript
import { TaskValidateAPI } from '@flowgram.ai/runtime-js';

const schema = JSON.stringify({
  nodes: [
    {
      id: 'start',
      type: 'start',
      meta: { position: { x: 0, y: 0 } },
      data: {
        outputs: {
          type: 'object',
          properties: {
            userInput: {
              type: 'string',
              extra: {
                index: 0,
              },
            }
          },
          required: ['userInput'],
        },
      }
    },
    {
      id: 'llm',
      type: 'llm',
      meta: { position: { x: 200, y: 0 } },
      data: {
        title: 'LLM_0',
        inputsValues: {
          prompt: {
            type: 'ref',
            content: ['start_0', 'userInput'],
          }
        },
        inputs: {
          type: 'object',
          required: ['editor'],
          properties: {
            prompt: {
              type: 'string',
              extra: {
                formComponent: 'prompt-editor',
              },
            },
          },
        },
        outputs: {
          type: 'object',
          properties: {
            result: {
              type: 'string',
            },
          },
        },
      },
    },
    {
      id: 'end',
      type: 'end',
      meta: { position: { x: 400, y: 0 } },
      data: {}
    }
  ],
  edges: [
    {
      sourceNodeID: 'start',
      sourcePort: 'out',
      targetNodeID: 'llm',
      targetPort: 'in'
    },
    {
      sourceNodeID: 'llm',
      sourcePort: 'out',
      targetNodeID: 'end',
      targetPort: 'in'
    }
  ]
});

const inputs = {
  userInput: '请介绍一下自己'
};

async function validateWorkflow() {
  try {
    const result = await TaskValidateAPI({
      schema,
      inputs
    });

    if (result.valid) {
      console.log('工作流验证通过，可以安全运行');
      return true;
    } else {
      console.error('工作流验证失败:');
      result.errors?.forEach(error => {
        console.error('- ' + error);
      });
      return false;
    }
  } catch (error) {
    console.error('验证过程中发生错误:', error);
    return false;
  }
}

// 在运行工作流之前先进行验证
async function safeRunWorkflow() {
  const isValid = await validateWorkflow();
  if (isValid) {
    // 验证通过后再运行工作流
    const runResult = await TaskRunAPI({ schema, inputs });
    console.log('工作流已启动，任务 ID:', runResult.taskID);
  } else {
    console.log('工作流验证失败，请修复错误后重试');
  }
}
```

### 注意事项

* 建议在调用 TaskRun API 之前先调用 TaskValidate API 进行验证
* 验证通过并不保证工作流运行时不会出错，但可以提前发现大部分配置问题
* TaskValidate API 的执行速度通常比 TaskRun API 快，适合用于实时验证
* 验证结果中的错误信息可以帮助快速定位和修复问题
