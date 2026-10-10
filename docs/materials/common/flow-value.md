import { SourceCode } from '@theme';

# FlowValue

FlowValue 是指在 Flowgram 官方物料库 中用于表示数据的一种特殊类型。它可以是常量、引用、表达式或模板，为流程中的数据传递和处理提供了灵活的方式。

## FlowValue 类型

FlowValue 支持以下四种类型：

### 1. 常量 (Constant)

固定值，在运行时不会改变。可以包含任意类型的数据，如字符串、数字、布尔值或对象。

```typescript
{
  type: 'constant',
  content: 'Hello World', // 可以是任意类型
  schema?: { type: "string" },    // 可选的 JSON Schema 定义
  extra?: { index: 1 }  // 额外信息，如排序等
}
```

### 2. 引用 (Reference)

对流程中其他变量或数据的引用，通过路径数组来指定引用的位置。

```typescript
{
  type: 'ref',
  content: ['variable', 'name'], // 引用路径数组
  extra?: { index: 1 }  // 额外信息，如排序等
}
```

### 3. 模板 (Template)

包含变量占位符的字符串模板，使用 `{{variable}}` 语法来嵌入变量。

```typescript
{
  type: 'template',
  content: 'Hello {{user.name}}!', // 模板字符串
  extra?: { index: 1 }  // 额外信息，如排序等
}
```

### 4. WIP: 表达式 (Expression)

JavaScript 表达式，在运行时会进行求值计算。

```typescript
{
  type: 'expression',
  content: 'a + b', // JavaScript、Python 等表达式字符串
  extra?: { index: 1 }  // 额外信息，如排序等
}
```

::: warning
表达式类型当前为 WIP 状态，目前暂不支持类型推导能力，未来可能会有 breaking change。
:::

## FlowValueUtils 工具类

FlowValueUtils 提供了丰富的工具函数来处理 FlowValue：

### 类型判断函数

* `isConstant(value)` - 判断是否为常量类型
* `isRef(value)` - 判断是否为引用类型
* `isExpression(value)` - 判断是否为表达式类型
* `isTemplate(value)` - 判断是否为模板类型
* `isConstantOrRef(value)` - 判断是否为常量或引用类型
* `isFlowValue(value)` - 判断是否为有效的 FlowValue 类型

### 遍历和提取函数

* `traverse(value, options)` - 遍历对象中的所有 FlowValue，支持按类型筛选
* `getTemplateKeyPaths(templateValue)` - 提取模板中所有的变量路径

### Schema 推断函数

* `inferConstantJsonSchema(constantValue)` - 根据常量值推断 JSON Schema
* `inferJsonSchema(values, scope)` - 根据 FlowValue 推断对应的 JSON Schema

## 使用示例

### 使用工具函数

```typescript
// 类型判断
if (FlowValueUtils.isConstant(value)) {
  console.log('This is a constant value:', value.content);
}

// 遍历 FlowValues
for (const { value, path } of FlowValueUtils.traverse(data, {
  includeTypes: ['ref', 'template']
})) {
  console.log(`Found ${value.type} at path: ${path}`);
}

// 提取模板变量
const templatePaths = FlowValueUtils.getTemplateKeyPaths(templateValue);
console.log('Template variables:', templatePaths); // [['user', 'name'], ['count']]
```

## 类型定义

<SourceCode href="https://github.com/bytedance/flowgram.ai/tree/main/packages/materials/form-materials/src/shared/flow-value/types.ts" />

FlowValue 的核心类型定义包括：

* `IFlowValue` - FlowValue 的联合类型
* `IFlowConstantValue` - 常量类型接口
* `IFlowRefValue` - 引用类型接口
* `IFlowExpressionValue` - 表达式类型接口
* `IFlowTemplateValue` - 模板类型接口
* `IFlowConstantRefValue` - 常量或引用类型的联合类型
* `IInputsValues` - 输入值的映射类型

## 源码导读

<SourceCode href="https://github.com/bytedance/flowgram.ai/tree/main/packages/materials/form-materials/src/shared/flow-value" />

使用 CLI 命令可以复制源代码到本地：

```bash
npx @flowgram.ai/cli@latest materials shared/flow-value
```

### 目录结构讲解

```
flow-value/
├── index.ts           # 主入口文件，导出所有类型和工具函数
├── types.ts           # 类型定义文件，包含所有 FlowValue 接口定义
├── schema.ts          # Zod 模式定义，用于运行时类型验证
├── utils.ts           # FlowValueUtils 工具类的完整实现
└── README.md          # 模块说明文档
```

### 使用到的第三方 API

* [Zod](https://v3.zod.dev/): 用于类型验证和数据解析，判断 FlowValue 的 Schema 是否符合预期。
