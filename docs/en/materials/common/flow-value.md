import { SourceCode } from '@theme';

# FlowValue

FlowValue is a special type used in Flowgram Official Materials to represent data. It can be a constant, reference, expression, or template, providing a flexible way for data transfer and processing in workflows.

## FlowValue Types

FlowValue supports the following four types:

### 1. Constant

A fixed value that does not change at runtime. It can contain any type of data, such as strings, numbers, booleans, or objects.

```typescript
{
  type: 'constant',
  content: 'Hello World', // Can be any type
  schema?: { type: "string" },    // Optional JSON Schema definition
  extra?: { index: 1 }  // Additional information, such as ordering, etc.
}
```

### 2. Reference

A reference to other variables or data in the workflow, specifying the reference location through a path array.

```typescript
{
  type: 'ref',
  content: ['variable', 'name'], // Reference path array
  extra?: { index: 1 }  // Additional information, such as ordering, etc.
}
```

### 3. Template

A string template containing variable placeholders, using the `{{variable}}` syntax to embed variables.

```typescript
{
  type: 'template',
  content: 'Hello {{user.name}}!', // Template string
  extra?: { index: 1 }  // Additional information, such as ordering, etc.
}
```

### 4. WIP: Expression

A JavaScript expression that will be evaluated at runtime.

```typescript
{
  type: 'expression',
  content: 'a + b', // JavaScript, Python, etc. expression string
  extra?: { index: 1 }  // Additional information, such as ordering, etc.
}
```

::: warning
The expression type is currently in WIP status and does not support type derivation capabilities at the moment. There may be breaking changes in the future.
:::

## FlowValueUtils Utility Class

FlowValueUtils provides rich utility functions for handling FlowValues:

### Type Checking Functions

* `isConstant(value)` - Check if it's a constant type
* `isRef(value)` - Check if it's a reference type
* `isExpression(value)` - Check if it's an expression type
* `isTemplate(value)` - Check if it's a template type
* `isConstantOrRef(value)` - Check if it's a constant or reference type
* `isFlowValue(value)` - Check if it's a valid FlowValue type

### Traversal and Extraction Functions

* `traverse(value, options)` - Traverse all FlowValues in an object, with type filtering support
* `getTemplateKeyPaths(templateValue)` - Extract all variable paths from templates

### Schema Inference Functions

* `inferConstantJsonSchema(constantValue)` - Infer JSON Schema based on constant value
* `inferJsonSchema(values, scope)` - Infer corresponding JSON Schema based on FlowValue

## Usage Examples

### Using Utility Functions

```typescript
// Type checking
if (FlowValueUtils.isConstant(value)) {
  console.log('This is a constant value:', value.content);
}

// Traverse FlowValues
for (const { value, path } of FlowValueUtils.traverse(data, {
  includeTypes: ['ref', 'template']
})) {
  console.log(`Found ${value.type} at path: ${path}`);
}

// Extract template variables
const templatePaths = FlowValueUtils.getTemplateKeyPaths(templateValue);
console.log('Template variables:', templatePaths); // [['user', 'name'], ['count']]
```

## Type Definitions

<SourceCode href="https://github.com/bytedance/flowgram.ai/tree/main/packages/materials/form-materials/src/shared/flow-value/types.ts" />

The core type definitions of FlowValue include:

* `IFlowValue` - Union type of FlowValue
* `IFlowConstantValue` - Constant type interface
* `IFlowRefValue` - Reference type interface
* `IFlowExpressionValue` - Expression type interface
* `IFlowTemplateValue` - Template type interface
* `IFlowConstantRefValue` - Union type of constant or reference types
* `IInputsValues` - Mapping type of input values

## Source Code Guide

<SourceCode href="https://github.com/bytedance/flowgram.ai/tree/main/packages/materials/form-materials/src/shared/flow-value" />

Use CLI command to copy source code locally:

```bash
npx @flowgram.ai/cli@latest materials shared/flow-value
```

### Directory Structure

```
flow-value/
├── index.ts           # Main entry file, exports all types and utility functions
├── types.ts           # Type definitions file, contains all FlowValue interface definitions
├── schema.ts          # Zod schema definitions for runtime type validation
├── utils.ts           # Complete implementation of FlowValueUtils utility class
└── README.md          # Module documentation
```

### Third-party APIs Used

* [Zod](https://v3.zod.dev/): Used for type validation and data parsing to determine if FlowValue schemas meet expectations.
