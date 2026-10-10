# Class: StackingComputing

## Table of contents

### Constructors

* [constructor](/auto-docs/free-stack-plugin/classes/StackingComputing.md#constructor)

### Methods

* [compute](/auto-docs/free-stack-plugin/classes/StackingComputing.md#compute)

## Constructors

### constructor

**new StackingComputing**()

## Methods

### compute

**compute**(`params`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.context` | [`StackingContext`](/auto-docs/free-stack-plugin/interfaces/StackingContext.md) |
| `params.nodes` | `FlowNodeEntity`\[] |
| `params.root` | `FlowNodeEntity` |

#### Returns

`Object`

| Name | Type | Description |
| :------ | :------ | :------ |
| `lineLevel` | `Map`<`string`, `number`> | 线条层级 |
| `maxLevel` | `number` | 选中计算叠加后可能计算出的最高层级 |
| `nodeLevel` | `Map`<`string`, `number`> | 节点层级 |
| `topLevel` | `number` | 正常渲染的最高层级 |
