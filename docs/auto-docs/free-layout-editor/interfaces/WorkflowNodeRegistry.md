# Interface: WorkflowNodeRegistry

节点注册

## Hierarchy

* [`FlowNodeRegistry`](/auto-docs/free-layout-editor/interfaces/FlowNodeRegistry-1.md)<[`WorkflowNodeMeta`](/auto-docs/free-layout-editor/interfaces/WorkflowNodeMeta.md)>

  ↳ **`WorkflowNodeRegistry`**

## Table of contents

### Properties

* [\_\_extends\_\_](/auto-docs/free-layout-editor/interfaces/WorkflowNodeRegistry.md#__extends__)
* [addChild](/auto-docs/free-layout-editor/interfaces/WorkflowNodeRegistry.md#addchild)
* [canAddLine](/auto-docs/free-layout-editor/interfaces/WorkflowNodeRegistry.md#canaddline)
* [dataRegistries](/auto-docs/free-layout-editor/interfaces/WorkflowNodeRegistry.md#dataregistries)
* [extend](/auto-docs/free-layout-editor/interfaces/WorkflowNodeRegistry.md#extend)
* [extendChildRegistries](/auto-docs/free-layout-editor/interfaces/WorkflowNodeRegistry.md#extendchildregistries)
* [formMeta](/auto-docs/free-layout-editor/interfaces/WorkflowNodeRegistry.md#formmeta)
* [getChildDelta](/auto-docs/free-layout-editor/interfaces/WorkflowNodeRegistry.md#getchilddelta)
* [getChildLabels](/auto-docs/free-layout-editor/interfaces/WorkflowNodeRegistry.md#getchildlabels)
* [getChildLines](/auto-docs/free-layout-editor/interfaces/WorkflowNodeRegistry.md#getchildlines)
* [getDelta](/auto-docs/free-layout-editor/interfaces/WorkflowNodeRegistry.md#getdelta)
* [getInputPoint](/auto-docs/free-layout-editor/interfaces/WorkflowNodeRegistry.md#getinputpoint)
* [getLabels](/auto-docs/free-layout-editor/interfaces/WorkflowNodeRegistry.md#getlabels)
* [getLines](/auto-docs/free-layout-editor/interfaces/WorkflowNodeRegistry.md#getlines)
* [getOriginDeltaX](/auto-docs/free-layout-editor/interfaces/WorkflowNodeRegistry.md#getorigindeltax)
* [getOriginDeltaY](/auto-docs/free-layout-editor/interfaces/WorkflowNodeRegistry.md#getorigindeltay)
* [getOutputPoint](/auto-docs/free-layout-editor/interfaces/WorkflowNodeRegistry.md#getoutputpoint)
* [meta](/auto-docs/free-layout-editor/interfaces/WorkflowNodeRegistry.md#meta)
* [onAfterUpdateLocalTransform](/auto-docs/free-layout-editor/interfaces/WorkflowNodeRegistry.md#onafterupdatelocaltransform)
* [onBlockChildCreate](/auto-docs/free-layout-editor/interfaces/WorkflowNodeRegistry.md#onblockchildcreate)
* [onCreate](/auto-docs/free-layout-editor/interfaces/WorkflowNodeRegistry.md#oncreate)
* [type](/auto-docs/free-layout-editor/interfaces/WorkflowNodeRegistry.md#type)

### Methods

* [getOrigin](/auto-docs/free-layout-editor/interfaces/WorkflowNodeRegistry.md#getorigin)

## Properties

### \_\_extends\_\_

`Optional` **\_\_extends\_\_**: [`FlowNodeType`](/auto-docs/free-layout-editor/types/FlowNodeType.md)\[]

内部用于继承逻辑判断，不要使用

#### Inherited from

[FlowNodeRegistry](/auto-docs/free-layout-editor/interfaces/FlowNodeRegistry-1.md).[**extends**](/auto-docs/free-layout-editor/interfaces/FlowNodeRegistry-1.md#__extends__)

***

### addChild

`Optional` **addChild**: (`node`: [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md), `json`: [`FlowNodeJSON`](/auto-docs/free-layout-editor/interfaces/FlowNodeJSON.md), `options?`: { `hidden?`: `boolean` ; `index?`: `number`  }) => [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)

#### Type declaration

(`node`, `json`, `options?`): [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) | 节点 |
| `json` | [`FlowNodeJSON`](/auto-docs/free-layout-editor/interfaces/FlowNodeJSON.md) | 添加的节点 JSON |
| `options?` | `Object` | 其它配置 |
| `options.hidden?` | `boolean` | - |
| `options.index?` | `number` | - |

##### Returns

[`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)

**`Deprecated`**

自定义子节点添加逻辑

#### Inherited from

[FlowNodeRegistry](/auto-docs/free-layout-editor/interfaces/FlowNodeRegistry-1.md).[addChild](/auto-docs/free-layout-editor/interfaces/FlowNodeRegistry-1.md#addchild)

***

### canAddLine

`Optional` **canAddLine**: (`fromPort`: [`WorkflowPortEntity`](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md), `toPort`: [`WorkflowPortEntity`](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md), `lines`: [`WorkflowLinesManager`](/auto-docs/free-layout-editor/classes/WorkflowLinesManager.md), `silent?`: `boolean`) => `boolean`

#### Type declaration

(`fromPort`, `toPort`, `lines`, `silent?`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `fromPort` | [`WorkflowPortEntity`](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md) |
| `toPort` | [`WorkflowPortEntity`](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md) |
| `lines` | [`WorkflowLinesManager`](/auto-docs/free-layout-editor/classes/WorkflowLinesManager.md) |
| `silent?` | `boolean` |

##### Returns

`boolean`

***

### dataRegistries

`Optional` **dataRegistries**: [`EntityDataRegistry`](/auto-docs/free-layout-editor/interfaces/EntityDataRegistry.md)<[`EntityData`](/auto-docs/free-layout-editor/classes/EntityData.md)<`any`, {}>>\[]

节点注册的数据，可以理解为 ECS 里的 Component, 这里可以配置自定义数据

#### Inherited from

[FlowNodeRegistry](/auto-docs/free-layout-editor/interfaces/FlowNodeRegistry-1.md).[dataRegistries](/auto-docs/free-layout-editor/interfaces/FlowNodeRegistry-1.md#dataregistries)

***

### extend

`Optional` **extend**: `string`

从另外一个注册扩展

#### Inherited from

[FlowNodeRegistry](/auto-docs/free-layout-editor/interfaces/FlowNodeRegistry-1.md).[extend](/auto-docs/free-layout-editor/interfaces/FlowNodeRegistry-1.md#extend)

***

### extendChildRegistries

`Optional` **extendChildRegistries**: [`FlowNodeRegistry`](/auto-docs/free-layout-editor/interfaces/FlowNodeRegistry-1.md)<[`FlowNodeMeta`](/auto-docs/free-layout-editor/interfaces/FlowNodeMeta.md)>\[]

子节点的 registry 覆盖，这里通过 originParent 来查找

#### Inherited from

[FlowNodeRegistry](/auto-docs/free-layout-editor/interfaces/FlowNodeRegistry-1.md).[extendChildRegistries](/auto-docs/free-layout-editor/interfaces/FlowNodeRegistry-1.md#extendchildregistries)

***

### formMeta

`Optional` **formMeta**: [`WorkflowNodeFormMeta`](/auto-docs/free-layout-editor/types/WorkflowNodeFormMeta.md)

***

### getChildDelta

`Optional` **getChildDelta**: (`childBlock`: [`FlowNodeTransformData`](/auto-docs/free-layout-editor/classes/FlowNodeTransformData.md), `layout`: [`FlowLayout`](/auto-docs/free-layout-editor/variables/FlowLayout-1.md)) => `undefined` | [`IPoint`](/auto-docs/free-layout-editor/interfaces/IPoint.md)

#### Type declaration

(`childBlock`, `layout`): `undefined` | [`IPoint`](/auto-docs/free-layout-editor/interfaces/IPoint.md)

通过 parent 计算当前节点的偏移，规则同 getDelta

##### Parameters

| Name | Type |
| :------ | :------ |
| `childBlock` | [`FlowNodeTransformData`](/auto-docs/free-layout-editor/classes/FlowNodeTransformData.md) |
| `layout` | [`FlowLayout`](/auto-docs/free-layout-editor/variables/FlowLayout-1.md) |

##### Returns

`undefined` | [`IPoint`](/auto-docs/free-layout-editor/interfaces/IPoint.md)

#### Inherited from

[FlowNodeRegistry](/auto-docs/free-layout-editor/interfaces/FlowNodeRegistry-1.md).[getChildDelta](/auto-docs/free-layout-editor/interfaces/FlowNodeRegistry-1.md#getchilddelta)

***

### getChildLabels

`Optional` **getChildLabels**: (`transition`: [`FlowNodeTransitionData`](/auto-docs/free-layout-editor/classes/FlowNodeTransitionData.md), `layout`: [`FlowLayout`](/auto-docs/free-layout-editor/variables/FlowLayout-1.md)) => [`FlowTransitionLabel`](/auto-docs/free-layout-editor/interfaces/FlowTransitionLabel.md)\[]

#### Type declaration

(`transition`, `layout`): [`FlowTransitionLabel`](/auto-docs/free-layout-editor/interfaces/FlowTransitionLabel.md)\[]

调整子节点的 Labels，优先级高于子节点本身的 getLabels

##### Parameters

| Name | Type |
| :------ | :------ |
| `transition` | [`FlowNodeTransitionData`](/auto-docs/free-layout-editor/classes/FlowNodeTransitionData.md) |
| `layout` | [`FlowLayout`](/auto-docs/free-layout-editor/variables/FlowLayout-1.md) |

##### Returns

[`FlowTransitionLabel`](/auto-docs/free-layout-editor/interfaces/FlowTransitionLabel.md)\[]

#### Inherited from

[FlowNodeRegistry](/auto-docs/free-layout-editor/interfaces/FlowNodeRegistry-1.md).[getChildLabels](/auto-docs/free-layout-editor/interfaces/FlowNodeRegistry-1.md#getchildlabels)

***

### getChildLines

`Optional` **getChildLines**: (`transition`: [`FlowNodeTransitionData`](/auto-docs/free-layout-editor/classes/FlowNodeTransitionData.md), `layout`: [`FlowLayout`](/auto-docs/free-layout-editor/variables/FlowLayout-1.md)) => [`FlowTransitionLine`](/auto-docs/free-layout-editor/interfaces/FlowTransitionLine.md)\[]

#### Type declaration

(`transition`, `layout`): [`FlowTransitionLine`](/auto-docs/free-layout-editor/interfaces/FlowTransitionLine.md)\[]

调整子节点的线条，优先级高于子节点本身的 getLines

##### Parameters

| Name | Type |
| :------ | :------ |
| `transition` | [`FlowNodeTransitionData`](/auto-docs/free-layout-editor/classes/FlowNodeTransitionData.md) |
| `layout` | [`FlowLayout`](/auto-docs/free-layout-editor/variables/FlowLayout-1.md) |

##### Returns

[`FlowTransitionLine`](/auto-docs/free-layout-editor/interfaces/FlowTransitionLine.md)\[]

#### Inherited from

[FlowNodeRegistry](/auto-docs/free-layout-editor/interfaces/FlowNodeRegistry-1.md).[getChildLines](/auto-docs/free-layout-editor/interfaces/FlowNodeRegistry-1.md#getchildlines)

***

### getDelta

`Optional` **getDelta**: (`transform`: [`FlowNodeTransformData`](/auto-docs/free-layout-editor/classes/FlowNodeTransformData.md), `layout`: [`FlowLayout`](/auto-docs/free-layout-editor/variables/FlowLayout-1.md)) => `undefined` | [`IPoint`](/auto-docs/free-layout-editor/interfaces/IPoint.md)

#### Type declaration

(`transform`, `layout`): `undefined` | [`IPoint`](/auto-docs/free-layout-editor/interfaces/IPoint.md)

获取当前节点 Position 偏移量，偏移量计算只能使用已经计算完的数据，如上一个节点或者子节点，不然会造成 o(n^2) 复杂度

1. 切记不要用当前节点的 localBounds(相对位置 bbox)，因为 delta 计算发生在 localBounds 计算之前
2. 切记不要用 bounds(绝对位置 bbox, 会触发所有父节点绝对位置计算), bounds 只能在最终 render 时候使用
3. 可以用 pre 节点 和 子节点的 localBounds 或者 size 数据，因为子节点是先算的
4. 可以用当前节点的 size (所有子节点的最大 bbox), 这是已经确定下来的

##### Parameters

| Name | Type |
| :------ | :------ |
| `transform` | [`FlowNodeTransformData`](/auto-docs/free-layout-editor/classes/FlowNodeTransformData.md) |
| `layout` | [`FlowLayout`](/auto-docs/free-layout-editor/variables/FlowLayout-1.md) |

##### Returns

`undefined` | [`IPoint`](/auto-docs/free-layout-editor/interfaces/IPoint.md)

#### Inherited from

[FlowNodeRegistry](/auto-docs/free-layout-editor/interfaces/FlowNodeRegistry-1.md).[getDelta](/auto-docs/free-layout-editor/interfaces/FlowNodeRegistry-1.md#getdelta)

***

### getInputPoint

`Optional` **getInputPoint**: (`transform`: [`FlowNodeTransformData`](/auto-docs/free-layout-editor/classes/FlowNodeTransformData.md), `layout`: [`FlowLayout`](/auto-docs/free-layout-editor/variables/FlowLayout-1.md)) => [`IPoint`](/auto-docs/free-layout-editor/interfaces/IPoint.md)

#### Type declaration

(`transform`, `layout`): [`IPoint`](/auto-docs/free-layout-editor/interfaces/IPoint.md)

自定义输入节点

##### Parameters

| Name | Type |
| :------ | :------ |
| `transform` | [`FlowNodeTransformData`](/auto-docs/free-layout-editor/classes/FlowNodeTransformData.md) |
| `layout` | [`FlowLayout`](/auto-docs/free-layout-editor/variables/FlowLayout-1.md) |

##### Returns

[`IPoint`](/auto-docs/free-layout-editor/interfaces/IPoint.md)

#### Inherited from

[FlowNodeRegistry](/auto-docs/free-layout-editor/interfaces/FlowNodeRegistry-1.md).[getInputPoint](/auto-docs/free-layout-editor/interfaces/FlowNodeRegistry-1.md#getinputpoint)

***

### getLabels

`Optional` **getLabels**: (`transition`: [`FlowNodeTransitionData`](/auto-docs/free-layout-editor/classes/FlowNodeTransitionData.md), `layout`: [`FlowLayout`](/auto-docs/free-layout-editor/variables/FlowLayout-1.md)) => [`FlowTransitionLabel`](/auto-docs/free-layout-editor/interfaces/FlowTransitionLabel.md)\[]

#### Type declaration

(`transition`, `layout`): [`FlowTransitionLabel`](/auto-docs/free-layout-editor/interfaces/FlowTransitionLabel.md)\[]

创建 label

##### Parameters

| Name | Type |
| :------ | :------ |
| `transition` | [`FlowNodeTransitionData`](/auto-docs/free-layout-editor/classes/FlowNodeTransitionData.md) |
| `layout` | [`FlowLayout`](/auto-docs/free-layout-editor/variables/FlowLayout-1.md) |

##### Returns

[`FlowTransitionLabel`](/auto-docs/free-layout-editor/interfaces/FlowTransitionLabel.md)\[]

#### Inherited from

[FlowNodeRegistry](/auto-docs/free-layout-editor/interfaces/FlowNodeRegistry-1.md).[getLabels](/auto-docs/free-layout-editor/interfaces/FlowNodeRegistry-1.md#getlabels)

***

### getLines

`Optional` **getLines**: (`transition`: [`FlowNodeTransitionData`](/auto-docs/free-layout-editor/classes/FlowNodeTransitionData.md), `layout`: [`FlowLayout`](/auto-docs/free-layout-editor/variables/FlowLayout-1.md)) => [`FlowTransitionLine`](/auto-docs/free-layout-editor/interfaces/FlowTransitionLine.md)\[]

#### Type declaration

(`transition`, `layout`): [`FlowTransitionLine`](/auto-docs/free-layout-editor/interfaces/FlowTransitionLine.md)\[]

创建线条

##### Parameters

| Name | Type |
| :------ | :------ |
| `transition` | [`FlowNodeTransitionData`](/auto-docs/free-layout-editor/classes/FlowNodeTransitionData.md) |
| `layout` | [`FlowLayout`](/auto-docs/free-layout-editor/variables/FlowLayout-1.md) |

##### Returns

[`FlowTransitionLine`](/auto-docs/free-layout-editor/interfaces/FlowTransitionLine.md)\[]

#### Inherited from

[FlowNodeRegistry](/auto-docs/free-layout-editor/interfaces/FlowNodeRegistry-1.md).[getLines](/auto-docs/free-layout-editor/interfaces/FlowNodeRegistry-1.md#getlines)

***

### getOriginDeltaX

`Optional` **getOriginDeltaX**: (`transform`: [`FlowNodeTransformData`](/auto-docs/free-layout-editor/classes/FlowNodeTransformData.md), `layout`: [`FlowLayout`](/auto-docs/free-layout-editor/variables/FlowLayout-1.md)) => `number`

#### Type declaration

(`transform`, `layout`): `number`

原点 X 偏移

##### Parameters

| Name | Type |
| :------ | :------ |
| `transform` | [`FlowNodeTransformData`](/auto-docs/free-layout-editor/classes/FlowNodeTransformData.md) |
| `layout` | [`FlowLayout`](/auto-docs/free-layout-editor/variables/FlowLayout-1.md) |

##### Returns

`number`

#### Inherited from

[FlowNodeRegistry](/auto-docs/free-layout-editor/interfaces/FlowNodeRegistry-1.md).[getOriginDeltaX](/auto-docs/free-layout-editor/interfaces/FlowNodeRegistry-1.md#getorigindeltax)

***

### getOriginDeltaY

`Optional` **getOriginDeltaY**: (`transform`: [`FlowNodeTransformData`](/auto-docs/free-layout-editor/classes/FlowNodeTransformData.md), `layout`: [`FlowLayout`](/auto-docs/free-layout-editor/variables/FlowLayout-1.md)) => `number`

#### Type declaration

(`transform`, `layout`): `number`

原点 Y 偏移

##### Parameters

| Name | Type |
| :------ | :------ |
| `transform` | [`FlowNodeTransformData`](/auto-docs/free-layout-editor/classes/FlowNodeTransformData.md) |
| `layout` | [`FlowLayout`](/auto-docs/free-layout-editor/variables/FlowLayout-1.md) |

##### Returns

`number`

#### Inherited from

[FlowNodeRegistry](/auto-docs/free-layout-editor/interfaces/FlowNodeRegistry-1.md).[getOriginDeltaY](/auto-docs/free-layout-editor/interfaces/FlowNodeRegistry-1.md#getorigindeltay)

***

### getOutputPoint

`Optional` **getOutputPoint**: (`transform`: [`FlowNodeTransformData`](/auto-docs/free-layout-editor/classes/FlowNodeTransformData.md), `layoutKey`: [`FlowLayout`](/auto-docs/free-layout-editor/variables/FlowLayout-1.md)) => [`IPoint`](/auto-docs/free-layout-editor/interfaces/IPoint.md)

#### Type declaration

(`transform`, `layoutKey`): [`IPoint`](/auto-docs/free-layout-editor/interfaces/IPoint.md)

自定义输出节点

##### Parameters

| Name | Type |
| :------ | :------ |
| `transform` | [`FlowNodeTransformData`](/auto-docs/free-layout-editor/classes/FlowNodeTransformData.md) |
| `layoutKey` | [`FlowLayout`](/auto-docs/free-layout-editor/variables/FlowLayout-1.md) |

##### Returns

[`IPoint`](/auto-docs/free-layout-editor/interfaces/IPoint.md)

#### Inherited from

[FlowNodeRegistry](/auto-docs/free-layout-editor/interfaces/FlowNodeRegistry-1.md).[getOutputPoint](/auto-docs/free-layout-editor/interfaces/FlowNodeRegistry-1.md#getoutputpoint)

***

### meta

`Optional` **meta**: `Partial`<[`WorkflowNodeMeta`](/auto-docs/free-layout-editor/interfaces/WorkflowNodeMeta.md)>

节点画布相关初始化配置信息，会覆盖 DEFAULT\_FLOW\_NODE\_META

#### Inherited from

[FlowNodeRegistry](/auto-docs/free-layout-editor/interfaces/FlowNodeRegistry-1.md).[meta](/auto-docs/free-layout-editor/interfaces/FlowNodeRegistry-1.md#meta)

***

### onAfterUpdateLocalTransform

`Optional` **onAfterUpdateLocalTransform**: (`transform`: [`FlowNodeTransformData`](/auto-docs/free-layout-editor/classes/FlowNodeTransformData.md), `layout`: [`FlowLayout`](/auto-docs/free-layout-editor/variables/FlowLayout-1.md)) => `void`

#### Type declaration

(`transform`, `layout`): `void`

在当前节点布局完成后调用，可以对布局做更精细的调整

##### Parameters

| Name | Type |
| :------ | :------ |
| `transform` | [`FlowNodeTransformData`](/auto-docs/free-layout-editor/classes/FlowNodeTransformData.md) |
| `layout` | [`FlowLayout`](/auto-docs/free-layout-editor/variables/FlowLayout-1.md) |

##### Returns

`void`

#### Inherited from

[FlowNodeRegistry](/auto-docs/free-layout-editor/interfaces/FlowNodeRegistry-1.md).[onAfterUpdateLocalTransform](/auto-docs/free-layout-editor/interfaces/FlowNodeRegistry-1.md#onafterupdatelocaltransform)

***

### onBlockChildCreate

`Optional` **onBlockChildCreate**: (`node`: [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md), `json`: [`FlowNodeJSON`](/auto-docs/free-layout-editor/interfaces/FlowNodeJSON.md), `addedNodes?`: [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)\[]) => [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)

#### Type declaration

(`node`, `json`, `addedNodes?`): [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)

添加子 block，一般用于分支的动态添加

##### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) |
| `json` | [`FlowNodeJSON`](/auto-docs/free-layout-editor/interfaces/FlowNodeJSON.md) |
| `addedNodes?` | [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)\[] |

##### Returns

[`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)

#### Inherited from

[FlowNodeRegistry](/auto-docs/free-layout-editor/interfaces/FlowNodeRegistry-1.md).[onBlockChildCreate](/auto-docs/free-layout-editor/interfaces/FlowNodeRegistry-1.md#onblockchildcreate)

***

### onCreate

`Optional` **onCreate**: (`node`: [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md), `json`: [`FlowNodeJSON`](/auto-docs/free-layout-editor/interfaces/FlowNodeJSON.md)) => `void` | [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)\[]

#### Type declaration

(`node`, `json`): `void` | [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)\[]

自定义创建节点，可以自定义节点的树形结构
返回新加入的节点，这样才能统计缓存

##### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) |
| `json` | [`FlowNodeJSON`](/auto-docs/free-layout-editor/interfaces/FlowNodeJSON.md) |

##### Returns

`void` | [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)\[]

**`Action`**

使用该方法，在创建时候将会忽略 json blocks 数据，而是交给适用节点自己处理 json 逻辑

#### Inherited from

[FlowNodeRegistry](/auto-docs/free-layout-editor/interfaces/FlowNodeRegistry-1.md).[onCreate](/auto-docs/free-layout-editor/interfaces/FlowNodeRegistry-1.md#oncreate)

***

### type

**type**: [`FlowNodeType`](/auto-docs/free-layout-editor/types/FlowNodeType.md)

节点类型

#### Inherited from

[FlowNodeRegistry](/auto-docs/free-layout-editor/interfaces/FlowNodeRegistry-1.md).[type](/auto-docs/free-layout-editor/interfaces/FlowNodeRegistry-1.md#type)

## Methods

### getOrigin

`Optional` **getOrigin**(`transform`, `layout`): [`IPoint`](/auto-docs/free-layout-editor/interfaces/IPoint.md)

动态获取原点，会覆盖 meta.origin

#### Parameters

| Name | Type |
| :------ | :------ |
| `transform` | [`FlowNodeTransformData`](/auto-docs/free-layout-editor/classes/FlowNodeTransformData.md) |
| `layout` | [`FlowLayout`](/auto-docs/free-layout-editor/variables/FlowLayout-1.md) |

#### Returns

[`IPoint`](/auto-docs/free-layout-editor/interfaces/IPoint.md)

#### Inherited from

[FlowNodeRegistry](/auto-docs/free-layout-editor/interfaces/FlowNodeRegistry-1.md).[getOrigin](/auto-docs/free-layout-editor/interfaces/FlowNodeRegistry-1.md#getorigin)
