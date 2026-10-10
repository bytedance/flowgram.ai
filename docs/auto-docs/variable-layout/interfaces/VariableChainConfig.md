# Interface: VariableChainConfig

Configuration for the variable chain.

## Table of contents

### Properties

* [getNodeChildren](/auto-docs/variable-layout/interfaces/VariableChainConfig.md#getnodechildren)
* [getNodeParent](/auto-docs/variable-layout/interfaces/VariableChainConfig.md#getnodeparent)
* [isNodeChildrenPrivate](/auto-docs/variable-layout/interfaces/VariableChainConfig.md#isnodechildrenprivate)
* [transformCovers](/auto-docs/variable-layout/interfaces/VariableChainConfig.md#transformcovers)
* [transformDeps](/auto-docs/variable-layout/interfaces/VariableChainConfig.md#transformdeps)

## Properties

### getNodeChildren

`Optional` **getNodeChildren**: (`node`: `FlowNodeEntity`) => `FlowNodeEntity`\[]

#### Type declaration

(`node`): `FlowNodeEntity`\[]

For fixed layout scenarios: there are a large number of useless nodes between parent and child (such as inlineBlocks, etc., which need to be configured to be skipped)
For free canvas scenarios: in some scenarios, the parent-child relationship between nodes is expressed through connections or other interactive forms, which needs to be configurable

##### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `FlowNodeEntity` |

##### Returns

`FlowNodeEntity`\[]

***

### getNodeParent

`Optional` **getNodeParent**: (`node`: `FlowNodeEntity`) => `undefined` | `FlowNodeEntity`

#### Type declaration

(`node`): `undefined` | `FlowNodeEntity`

##### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `FlowNodeEntity` |

##### Returns

`undefined` | `FlowNodeEntity`

***

### isNodeChildrenPrivate

`Optional` **isNodeChildrenPrivate**: (`node`: `ScopeChainNode`) => `boolean`

#### Type declaration

(`node`): `boolean`

The output variables of a node's children cannot be accessed by subsequent nodes.

##### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `ScopeChainNode` |

##### Returns

`boolean`

***

### transformCovers

`Optional` **transformCovers**: `IScopeTransformer`

Fine-tune the cover scope.

***

### transformDeps

`Optional` **transformDeps**: `IScopeTransformer`

Fine-tune the dependency scope.
