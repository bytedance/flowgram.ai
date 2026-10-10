# 内置节点

本文档详细介绍FlowGram Runtime中的节点系统，包括节点的基本概念、现有节点类型及其用法，以及如何创建自定义节点。

现有节点：

* 开始节点
* 结束节点
* LLM节点
* 条件节点
* 循环节点

> 后续会支持代码节点、意图识别节点、批处理节点、终止循环节点、继续循环节点、HTTP节点

## 节点概述

### 节点在FlowGram Runtime中的作用

节点是FlowGram工作流的基本执行单元，每个节点代表一个特定的操作或功能。FlowGram工作流本质上是由多个节点通过边连接形成的有向图，描述了任务的执行流程。节点系统的核心职责包括：

1. **执行特定操作**：每种类型的节点都有其特定的功能，如启动工作流、调用LLM模型、执行条件判断等
2. **处理输入输出**：节点接收输入数据，执行操作后产生输出数据
3. **控制执行流程**：通过条件节点和循环节点控制工作流的执行路径

### INodeExecutor接口介绍

所有节点执行器都必须实现`INodeExecutor`接口，该接口定义了节点执行器的基本结构：

```typescript
interface INodeExecutor {
  // 节点类型，用于标识不同种类的节点
  type: string;

  // 执行方法，处理节点的具体逻辑
  execute(context: ExecutionContext): Promise<ExecutionResult>;
}
```

其中：

* `type`：节点类型标识符，如'start'、'end'、'llm'等
* `execute`：节点执行方法，接收执行上下文，返回执行结果

### 节点执行流程

节点的执行流程如下：

1. **准备阶段**：
   * 从执行上下文中获取节点的输入数据
   * 验证输入数据是否符合要求

2. **执行阶段**：
   * 执行节点特定的业务逻辑
   * 处理可能出现的异常情况

3. **完成阶段**：
   * 生成节点的输出数据
   * 更新节点状态
   * 返回执行结果

工作流引擎会根据节点间的连接关系，按顺序调度节点的执行。对于特殊节点（如条件节点和循环节点），引擎会根据节点的执行结果决定下一步的执行路径。

## 现有节点详细介绍

FlowGram Runtime目前实现了五种类型的节点：Start、End、LLM、Condition和Loop。下面将详细介绍每种节点的功能、配置和使用示例。

### 开始节点 `Start`

#### 功能

Start节点是工作流的起始节点，用于接收工作流的输入数据并开始工作流的执行。每个工作流必须有且只有一个Start节点。

#### 配置选项

| 选项 | 类型 | 必填 | 描述 |
|------|------|------|------|
| outputs | JSONSchema | 是 | 定义工作流的输入数据结构 |

#### 使用示例

```json
{
  "id": "start_0",
  "type": "start",
  "data": {
    "title": "开始节点",
    "outputs": {
      "type": "object",
      "properties": {
        "prompt": {
          "type": "string",
          "description": "用户输入的提示词"
        }
      },
      "required": ["prompt"]
    }
  }
}
```

在这个例子中，Start节点定义了工作流需要一个名为`prompt`的字符串类型输入。

### 结束节点 `End`

#### 功能

End节点是工作流的结束节点，用于收集工作流的输出数据并结束工作流的执行。每个工作流必须有至少一个End节点。

#### 配置选项

| 选项 | 类型 | 必填 | 描述 |
|------|------|------|------|
| inputs | JSONSchema | 是 | 定义工作流的输出数据结构 |
| inputsValues | `Record<string, ValueSchema>` | 是 | 定义工作流的输出数据值，可以是引用或常量 |

#### 使用示例

```json
{
  "id": "end_0",
  "type": "end",
  "data": {
    "title": "结束节点",
    "inputs": {
      "type": "object",
      "properties": {
        "result": {
          "type": "string",
          "description": "工作流的输出结果"
        }
      }
    },
    "inputsValues": {
      "result": {
        "type": "ref",
        "content": ["llm_0", "result"]
      }
    }
  }
}
```

在这个例子中，End节点定义了工作流的输出包含一个名为`result`的字符串，其值引用自ID为`llm_0`的节点的`result`输出。

### LLM节点 `LLM`

#### 功能

LLM节点用于调用大型语言模型执行自然语言处理任务，是FlowGram工作流中最常用的节点类型之一。

#### 配置选项

| 选项 | 类型 | 必填 | 描述 |
|------|------|------|------|
| modelName | string | 是 | 模型名称，如"gpt-3.5-turbo" |
| apiKey | string | 是 | API密钥 |
| apiHost | string | 是 | API主机地址 |
| temperature | number | 是 | 温度参数，控制输出的随机性 |
| systemPrompt | string | 否 | 系统提示词，设置AI助手的角色和行为 |
| prompt | string | 是 | 用户提示词，即向AI提出的问题或请求 |

#### 使用示例

```json
{
  "id": "llm_0",
  "type": "llm",
  "data": {
    "title": "LLM节点",
    "inputsValues": {
      "modelName": {
        "type": "constant",
        "content": "gpt-3.5-turbo"
      },
      "apiKey": {
        "type": "constant",
        "content": "sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
      },
      "apiHost": {
        "type": "constant",
        "content": "https://api.openai.com/v1"
      },
      "temperature": {
        "type": "constant",
        "content": 0.7
      },
      "systemPrompt": {
        "type": "constant",
        "content": "你是一个有帮助的助手。"
      },
      "prompt": {
        "type": "ref",
        "content": ["start_0", "prompt"]
      }
    },
    "inputs": {
      "type": "object",
      "required": ["modelName", "apiKey", "apiHost", "temperature", "prompt"],
      "properties": {
        "modelName": { "type": "string" },
        "apiKey": { "type": "string" },
        "apiHost": { "type": "string" },
        "temperature": { "type": "number" },
        "systemPrompt": { "type": "string" },
        "prompt": { "type": "string" }
      }
    },
    "outputs": {
      "type": "object",
      "properties": {
        "result": { "type": "string" }
      }
    }
  }
}
```

在这个例子中，LLM节点使用gpt-3.5-turbo模型，温度参数为0.7，系统提示词设置为"你是一个有帮助的助手"，用户提示词引用自Start节点的输入。

### 条件节点 `Condition`

#### 功能

Condition节点用于根据条件选择不同的执行分支，实现工作流的条件逻辑。

#### 配置选项

| 选项 | 类型 | 必填 | 描述 |
|------|------|------|------|
| conditions | Array | 是 | 条件数组，每个条件包含key和value |

条件value的结构：

| 选项 | 类型 | 必填 | 描述 |
|------|------|------|------|
| left | ValueSchema | 是 | 左值，可以是引用或常量 |
| operator | string | 是 | 操作符，如"eq"、"gt"等 |
| right | ValueSchema | 是 | 右值，可以是引用或常量 |

支持的操作符：

| 操作符 | 描述 | 适用类型 |
|--------|------|----------|
| eq | 等于 | 所有类型 |
| neq | 不等于 | 所有类型 |
| gt | 大于 | 数字、字符串 |
| gte | 大于等于 | 数字、字符串 |
| lt | 小于 | 数字、字符串 |
| lte | 小于等于 | 数字、字符串 |
| includes | 包含 | 字符串、数组 |
| startsWith | 以...开始 | 字符串 |
| endsWith | 以...结束 | 字符串 |

#### 使用示例

```json
{
  "id": "condition_0",
  "type": "condition",
  "data": {
    "title": "条件节点",
    "conditions": [
      {
        "key": "if_true",
        "value": {
          "left": {
            "type": "ref",
            "content": ["start_0", "value"]
          },
          "operator": "gt",
          "right": {
            "type": "constant",
            "content": 10
          }
        }
      },
      {
        "key": "if_false",
        "value": {
          "left": {
            "type": "ref",
            "content": ["start_0", "value"]
          },
          "operator": "lte",
          "right": {
            "type": "constant",
            "content": 10
          }
        }
      }
    ]
  }
}
```

在这个例子中，条件节点定义了两个分支：当Start节点的value输出大于10时走"if\_true"分支，否则走"if\_false"分支。

### 循环节点 `Loop`

#### 功能

Loop节点用于对数组中的每个元素执行相同的操作，实现工作流的循环逻辑。

#### 配置选项

| 选项 | 类型 | 必填 | 描述 |
|------|------|------|------|
| loopFor | ValueSchema | 是 | 要迭代的数组，通常是一个引用 |
| loopOutputs | `Record<string, ValueSchema>` | 是 | 循环输出，引用子节点的变量 |
| blocks | `Array<NodeSchema>` | 是 | 循环体内的节点数组 |

#### 使用示例

```json
{
  "id": "loop_0",
  "type": "loop",
  "data": {
    "title": "循环节点",
    "loopFor": {
      "type": "ref",
      "content": ["start_0", "items"]
    },
    "loopOutputs": {
      "results": {
        "type": "ref",
        "content": ["llm_1", "result"]
      }
    }
  },
  "blocks": [
    {
      "id": "llm_1",
      "type": "llm",
      "data": {
        "inputsValues": {
          "prompt": {
            "type": "ref",
            "content": ["loop_0_locals", "item"]
          }
        }
      }
    }
  ]
}
```

在这个例子中，循环节点对Start节点的items输出（假设是一个数组）进行迭代，对每个元素调用一个LLM节点。在循环体内，可以通过`loop_0_locals.item`引用当前迭代的元素，循环输出可引用LLM节点输出作为循环节点的输出。

## 如何新增自定义节点

FlowGram Runtime设计为可扩展的，允许开发者添加自定义节点类型。以下是实现和注册自定义节点的步骤。

### 实现INodeExecutor接口的步骤

1. **创建节点执行器类**：

```typescript
import { ExecutionContext, ExecutionResult, INodeExecutor } from '@flowgram.ai/runtime-interface';

export class CustomNodeExecutor implements INodeExecutor {
  // 定义节点类型
  public type = 'custom';

  // 实现execute方法
  public async execute(context: ExecutionContext): Promise<ExecutionResult> {
    // 1. 从上下文中获取输入
    const inputs = context.inputs as CustomNodeInputs;

    // 2. 验证输入
    if (!inputs.requiredParam) {
      throw new Error('必需参数缺失');
    }

    // 3. 执行节点逻辑
    const result = await this.processCustomLogic(inputs);

    // 4. 返回输出
    return {
      outputs: {
        result: result
      }
    };
  }

  // 自定义处理逻辑
  private async processCustomLogic(inputs: CustomNodeInputs): Promise<string> {
    // 实现自定义逻辑
    return `处理结果: ${inputs.requiredParam}`;
  }
}

// 定义输入接口
interface CustomNodeInputs {
  requiredParam: string;
  optionalParam?: number;
}
```

2. **处理异常情况**：

```typescript
public async execute(context: ExecutionContext): Promise<ExecutionResult> {
  try {
    const inputs = context.inputs as CustomNodeInputs;

    // 验证输入
    if (!inputs.requiredParam) {
      throw new Error('必需参数缺失');
    }

    // 执行节点逻辑
    const result = await this.processCustomLogic(inputs);

    return {
      outputs: {
        result: result
      }
    };
  } catch (error) {
    // 处理异常
    console.error('节点执行失败:', error);
    throw error; // 或者返回特定的错误输出
  }
}
```

### 注册自定义节点的方法

将自定义节点执行器添加到FlowGram Runtime的节点执行器注册表中：

```typescript
import { WorkflowRuntimeNodeExecutors } from './nodes';
import { CustomNodeExecutor } from './nodes/custom';

// 注册自定义节点执行器
WorkflowRuntimeNodeExecutors.push(new CustomNodeExecutor());
```

### 自定义节点开发最佳实践

1. **明确节点职责**：
   * 每个节点应该有明确的单一职责
   * 避免在一个节点中实现多个不相关的功能

2. **输入验证**：
   * 在执行节点逻辑前验证所有必需的输入
   * 提供清晰的错误信息，便于调试

3. **异常处理**：
   * 捕获并处理可能的异常情况
   * 避免让未处理的异常导致整个工作流崩溃

4. **性能考虑**：
   * 对于耗时操作，考虑实现超时机制
   * 避免阻塞主线程的长时间同步操作

5. **可测试性**：
   * 设计节点时考虑单元测试的便利性
   * 将核心逻辑与外部依赖分离，便于模拟测试

6. **文档和注释**：
   * 为自定义节点提供详细的文档
   * 在代码中添加必要的注释，特别是复杂逻辑部分

### 自定义节点示例

下面是一个完整的自定义HTTP请求节点示例，用于发送HTTP请求并处理响应：

```typescript
import { ExecutionContext, ExecutionResult, INodeExecutor } from '@flowgram.ai/runtime-interface';
import axios from 'axios';

// 定义HTTP节点的输入接口
interface HTTPNodeInputs {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: any;
  timeout?: number;
}

// 定义HTTP节点的输出接口
interface HTTPNodeOutputs {
  status: number;
  data: any;
  headers: Record<string, string>;
}

export class HTTPNodeExecutor implements INodeExecutor {
  // 定义节点类型
  public type = 'http';

  // 实现execute方法
  public async execute(context: ExecutionContext): Promise<ExecutionResult> {
    // 1. 从上下文中获取输入
    const inputs = context.inputs as HTTPNodeInputs;

    // 2. 验证输入
    if (!inputs.url) {
      throw new Error('URL参数缺失');
    }

    if (!inputs.method) {
      throw new Error('请求方法参数缺失');
    }

    // 3. 执行HTTP请求
    try {
      const response = await axios({
        url: inputs.url,
        method: inputs.method,
        headers: inputs.headers || {},
        data: inputs.body,
        timeout: inputs.timeout || 30000
      });

      // 4. 处理响应
      const outputs: HTTPNodeOutputs = {
        status: response.status,
        data: response.data,
        headers: response.headers as Record<string, string>
      };

      // 5. 返回输出
      return {
        outputs
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // 处理Axios错误
        if (error.response) {
          // 服务器返回了错误状态码
          return {
            outputs: {
              status: error.response.status,
              data: error.response.data,
              headers: error.response.headers as Record<string, string>
            }
          };
        } else if (error.request) {
          // 请求已发送但未收到响应
          throw new Error(`请求超时或无响应: ${error.message}`);
        } else {
          // 请求配置有误
          throw new Error(`请求配置错误: ${error.message}`);
        }
      } else {
        // 处理非Axios错误
        throw error;
      }
    }
  }
}

// 注册HTTP节点执行器
import { WorkflowRuntimeNodeExecutors } from './nodes';
WorkflowRuntimeNodeExecutors.push(new HTTPNodeExecutor());
```

使用示例：

```json
{
  "id": "http_0",
  "type": "http",
  "data": {
    "title": "HTTP请求节点",
    "inputsValues": {
      "url": {
        "type": "constant",
        "content": "https://api.example.com/data"
      },
      "method": {
        "type": "constant",
        "content": "GET"
      },
      "headers": {
        "type": "constant",
        "content": {
          "Authorization": "Bearer token123"
        }
      }
    },
    "inputs": {
      "type": "object",
      "required": ["url", "method"],
      "properties": {
        "url": { "type": "string" },
        "method": { "type": "string", "enum": ["GET", "POST", "PUT", "DELETE"] },
        "headers": { "type": "object" },
        "body": { "type": "object" },
        "timeout": { "type": "number" }
      }
    },
    "outputs": {
      "type": "object",
      "properties": {
        "status": { "type": "number" },
        "data": { "type": "object" },
        "headers": { "type": "object" }
      }
    }
  }
}
```

通过以上步骤和示例，您可以根据自己的需求开发和注册自定义节点，扩展FlowGram Runtime的功能。
