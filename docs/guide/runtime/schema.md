# Workflow Schema

本文档详细介绍了 Workflow 的 Schema 结构。Workflow Schema 是定义工作流程的核心配置，描述了节点，以及边的配置。

## 基本结构

一个完整的 Workflow Schema 包含以下主要部分：

```typescript
interface WorkflowSchema {
  nodes: WorkflowNodeSchema[];
  edges: WorkflowEdgeSchema[];
}
```

## 节点 Schema

节点是工作流中的基本单元，每个节点都有其特定的类型和配置：

```typescript
interface WorkflowNodeSchema<T = string, D = any> {
  id: string;           // 节点唯一标识符
  type: T;              // 节点类型
  meta: WorkflowNodeMetaSchema;  // 节点元数据
  data: D & {          // 节点数据
    title?: string;    // 节点标题
    inputsValues?: Record<string, IFlowValue>;  // 输入值
    inputs?: IJsonSchema;   // 输入模式定义
    outputs?: IJsonSchema;  // 输出模式定义
    [key: string]: any;     // 其他自定义数据
  };
  blocks?: WorkflowNodeSchema[];  // 子节点（用于复合节点）
  edges?: WorkflowEdgeSchema[];   // 子节点之间的连接
}
```

### 节点元数据

```typescript
interface WorkflowNodeMetaSchema {
  position: PositionSchema;        // 节点在画布中的位置
}
```

## 边 Schema

边定义了节点之间的连接关系：

```typescript
interface WorkflowEdgeSchema {
  sourceNodeID: string;    // 源节点ID
  targetNodeID: string;    // 目标节点ID
  sourcePortID?: string;   // 源节点端口ID（可选）
  targetPortID?: string;   // 目标节点端口ID（可选）
}
```

## 值类型

Workflow 支持多种值类型：

```typescript
enum WorkflowVariableType {
  String = 'string',    // 字符串
  Integer = 'integer',  // 整数
  Number = 'number',    // 数字
  Boolean = 'boolean',  // 布尔值
  Object = 'object',    // 对象
  Array = 'array',      // 数组
  Null = 'null'         // 空值
}
```

### 流程值

在节点的输入值中，支持以下几种类型：

```typescript
type IFlowValue =
  | IFlowConstantValue     // 常量值
  | IFlowRefValue          // 引用值
  | IFlowExpressionValue   // 表达式值
  | IFlowTemplateValue;    // 模板值
```

每种类型的具体定义：

```typescript
interface IFlowConstantValue {
  type: 'constant';
  content?: string | number | boolean;
}

interface IFlowRefValue {
  type: 'ref';
  content?: string[];
}

interface IFlowExpressionValue {
  type: 'expression';
  content?: string;
}

interface IFlowTemplateValue {
  type: 'template';
  content?: string;
}
```

## JSON Schema

节点的输入输出定义使用 JSON Schema 格式：

```typescript
interface IJsonSchema<T = string> {
  type: T;                 // 数据类型
  default?: any;           // 默认值
  title?: string;          // 标题
  description?: string;    // 描述
  enum?: (string | number)[];  // 枚举值
  properties?: Record<string, IJsonSchema<T>>;  // 对象属性
  additionalProperties?: IJsonSchema<T>;        // 额外属性
  items?: IJsonSchema<T>;                       // 数组项定义
  required?: string[];                          // 必需字段
  $ref?: string;                                // 引用
  extra?: {                                     // 额外配置
    index?: number;                             // 索引
    weak?: boolean;                             // 弱类型比较
    formComponent?: string;                     // 表单组件
    [key: string]: any;
  };
}
```
