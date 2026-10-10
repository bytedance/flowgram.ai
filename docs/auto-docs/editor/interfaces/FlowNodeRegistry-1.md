# Interface: FlowNodeRegistry\<M>

节点注册

## Type parameters

| Name | Type |
| :------ | :------ |
| `M` | extends [`FlowNodeMeta`](/auto-docs/editor/interfaces/FlowNodeMeta.md) = [`FlowNodeMeta`](/auto-docs/editor/interfaces/FlowNodeMeta.md) |

## Indexable

▪ \[key: `string`]: `any`

## Table of contents

### Properties

* [\_\_extends\_\_](/auto-docs/editor/interfaces/FlowNodeRegistry-1.md#__extends__)
* [addChild](/auto-docs/editor/interfaces/FlowNodeRegistry-1.md#addchild)
* [dataRegistries](/auto-docs/editor/interfaces/FlowNodeRegistry-1.md#dataregistries)
* [extend](/auto-docs/editor/interfaces/FlowNodeRegistry-1.md#extend)
* [extendChildRegistries](/auto-docs/editor/interfaces/FlowNodeRegistry-1.md#extendchildregistries)
* [getChildDelta](/auto-docs/editor/interfaces/FlowNodeRegistry-1.md#getchilddelta)
* [getChildLabels](/auto-docs/editor/interfaces/FlowNodeRegistry-1.md#getchildlabels)
* [getChildLines](/auto-docs/editor/interfaces/FlowNodeRegistry-1.md#getchildlines)
* [getDelta](/auto-docs/editor/interfaces/FlowNodeRegistry-1.md#getdelta)
* [getInputPoint](/auto-docs/editor/interfaces/FlowNodeRegistry-1.md#getinputpoint)
* [getLabels](/auto-docs/editor/interfaces/FlowNodeRegistry-1.md#getlabels)
* [getLines](/auto-docs/editor/interfaces/FlowNodeRegistry-1.md#getlines)
* [getOriginDeltaX](/auto-docs/editor/interfaces/FlowNodeRegistry-1.md#getorigindeltax)
* [getOriginDeltaY](/auto-docs/editor/interfaces/FlowNodeRegistry-1.md#getorigindeltay)
* [getOutputPoint](/auto-docs/editor/interfaces/FlowNodeRegistry-1.md#getoutputpoint)
* [meta](/auto-docs/editor/interfaces/FlowNodeRegistry-1.md#meta)
* [onAfterUpdateLocalTransform](/auto-docs/editor/interfaces/FlowNodeRegistry-1.md#onafterupdatelocaltransform)
* [onBlockChildCreate](/auto-docs/editor/interfaces/FlowNodeRegistry-1.md#onblockchildcreate)
* [onCreate](/auto-docs/editor/interfaces/FlowNodeRegistry-1.md#oncreate)
* [type](/auto-docs/editor/interfaces/FlowNodeRegistry-1.md#type)

### Methods

* [getOrigin](/auto-docs/editor/interfaces/FlowNodeRegistry-1.md#getorigin)

## Properties

### \_\_extends\_\_

`Optional` **\_\_extends\_\_**: [`FlowNodeType`](/auto-docs/editor/types/FlowNodeType.md)\[]

内部用于继承逻辑判断，不要使用

***

### addChild

`Optional` **addChild**: (`node`: [`FlowNodeEntity`](/auto-docs/editor/classes/FlowNodeEntity-1.md), `json`: [`FlowNodeJSON`](/auto-docs/editor/interfaces/FlowNodeJSON.md), `options?`: { `hidden?`: `boolean` ; `index?`: `number`  }) => [`FlowNodeEntity`](/auto-docs/editor/classes/FlowNodeEntity-1.md)

#### Type declaration

(`node`, `json`, `options?`): [`FlowNodeEntity`](/auto-docs/editor/classes/FlowNodeEntity-1.md)

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | [`FlowNodeEntity`](/auto-docs/editor/classes/FlowNodeEntity-1.md) | 节点 |
| `json` | [`FlowNodeJSON`](/auto-docs/editor/interfaces/FlowNodeJSON.md) | 添加的节点 JSON |
| `options?` | `Object` | 其它配置 |
| `options.hidden?` | `boolean` | - |
| `options.index?` | `number` | - |

##### Returns

[`FlowNodeEntity`](/auto-docs/editor/classes/FlowNodeEntity-1.md)

**`Deprecated`**

自定义子节点添加逻辑

***

### dataRegistries

`Optional` **dataRegistries**: [`EntityDataRegistry`](/auto-docs/editor/interfaces/EntityDataRegistry.md)<[`EntityData`](/auto-docs/editor/classes/EntityData.md)<`any`, {}>>\[]

节点注册的数据，可以理解为 ECS 里的 Component, 这里可以配置自定义数据

***

### extend

`Optional` **extend**: `string`

从另外一个注册扩展

***

### extendChildRegistries

`Optional` **extendChildRegistries**: [`FlowNodeRegistry`](/auto-docs/editor/interfaces/FlowNodeRegistry-1.md)<[`FlowNodeMeta`](/auto-docs/editor/interfaces/FlowNodeMeta.md)>\[]

子节点的 registry 覆盖，这里通过 originParent 来查找

***

### getChildDelta

`Optional` **getChildDelta**: (`childBlock`: [`FlowNodeTransformData`](/auto-docs/editor/classes/FlowNodeTransformData.md), `layout`: [`FlowLayout`](/auto-docs/editor/variables/FlowLayout-1.md)) => `undefined` | [`IPoint`](/auto-docs/editor/interfaces/IPoint.md)

#### Type declaration

(`childBlock`, `layout`): `undefined` | [`IPoint`](/auto-docs/editor/interfaces/IPoint.md)

通过 parent 计算当前节点的偏移，规则同 getDelta

##### Parameters

| Name | Type |
| :------ | :------ |
| `childBlock` | [`FlowNodeTransformData`](/auto-docs/editor/classes/FlowNodeTransformData.md) |
| `layout` | [`FlowLayout`](/auto-docs/editor/variables/FlowLayout-1.md) |

##### Returns

`undefined` | [`IPoint`](/auto-docs/editor/interfaces/IPoint.md)

***

### getChildLabels

`Optional` **getChildLabels**: (`transition`: [`FlowNodeTransitionData`](/auto-docs/editor/classes/FlowNodeTransitionData.md), `layout`: [`FlowLayout`](/auto-docs/editor/variables/FlowLayout-1.md)) => [`FlowTransitionLabel`](/auto-docs/editor/interfaces/FlowTransitionLabel.md)\[]

#### Type declaration

(`transition`, `layout`): [`FlowTransitionLabel`](/auto-docs/editor/interfaces/FlowTransitionLabel.md)\[]

调整子节点的 Labels，优先级高于子节点本身的 getLabels

##### Parameters

| Name | Type |
| :------ | :------ |
| `transition` | [`FlowNodeTransitionData`](/auto-docs/editor/classes/FlowNodeTransitionData.md) |
| `layout` | [`FlowLayout`](/auto-docs/editor/variables/FlowLayout-1.md) |

##### Returns

[`FlowTransitionLabel`](/auto-docs/editor/interfaces/FlowTransitionLabel.md)\[]

***

### getChildLines

`Optional` **getChildLines**: (`transition`: [`FlowNodeTransitionData`](/auto-docs/editor/classes/FlowNodeTransitionData.md), `layout`: [`FlowLayout`](/auto-docs/editor/variables/FlowLayout-1.md)) => [`FlowTransitionLine`](/auto-docs/editor/interfaces/FlowTransitionLine.md)\[]

#### Type declaration

(`transition`, `layout`): [`FlowTransitionLine`](/auto-docs/editor/interfaces/FlowTransitionLine.md)\[]

调整子节点的线条，优先级高于子节点本身的 getLines

##### Parameters

| Name | Type |
| :------ | :------ |
| `transition` | [`FlowNodeTransitionData`](/auto-docs/editor/classes/FlowNodeTransitionData.md) |
| `layout` | [`FlowLayout`](/auto-docs/editor/variables/FlowLayout-1.md) |

##### Returns

[`FlowTransitionLine`](/auto-docs/editor/interfaces/FlowTransitionLine.md)\[]

***

### getDelta

`Optional` **getDelta**: (`transform`: [`FlowNodeTransformData`](/auto-docs/editor/classes/FlowNodeTransformData.md), `layout`: [`FlowLayout`](/auto-docs/editor/variables/FlowLayout-1.md)) => `undefined` | [`IPoint`](/auto-docs/editor/interfaces/IPoint.md)

#### Type declaration

(`transform`, `layout`): `undefined` | [`IPoint`](/auto-docs/editor/interfaces/IPoint.md)

获取当前节点 Position 偏移量，偏移量计算只能使用已经计算完的数据，如上一个节点或者子节点，不然会造成 o(n^2) 复杂度

1. 切记不要用当前节点的 localBounds(相对位置 bbox)，因为 delta 计算发生在 localBounds 计算之前
2. 切记不要用 bounds(绝对位置 bbox, 会触发所有父节点绝对位置计算), bounds 只能在最终 render 时候使用
3. 可以用 pre 节点 和 子节点的 localBounds 或者 size 数据，因为子节点是先算的
4. 可以用当前节点的 size (所有子节点的最大 bbox), 这是已经确定下来的

##### Parameters

| Name | Type |
| :------ | :------ |
| `transform` | [`FlowNodeTransformData`](/auto-docs/editor/classes/FlowNodeTransformData.md) |
| `layout` | [`FlowLayout`](/auto-docs/editor/variables/FlowLayout-1.md) |

##### Returns

`undefined` | [`IPoint`](/auto-docs/editor/interfaces/IPoint.md)

***

### getInputPoint

`Optional` **getInputPoint**: (`transform`: [`FlowNodeTransformData`](/auto-docs/editor/classes/FlowNodeTransformData.md), `layout`: [`FlowLayout`](/auto-docs/editor/variables/FlowLayout-1.md)) => [`IPoint`](/auto-docs/editor/interfaces/IPoint.md)

#### Type declaration

(`transform`, `layout`): [`IPoint`](/auto-docs/editor/interfaces/IPoint.md)

自定义输入节点

##### Parameters

| Name | Type |
| :------ | :------ |
| `transform` | [`FlowNodeTransformData`](/auto-docs/editor/classes/FlowNodeTransformData.md) |
| `layout` | [`FlowLayout`](/auto-docs/editor/variables/FlowLayout-1.md) |

##### Returns

[`IPoint`](/auto-docs/editor/interfaces/IPoint.md)

***

### getLabels

`Optional` **getLabels**: (`transition`: [`FlowNodeTransitionData`](/auto-docs/editor/classes/FlowNodeTransitionData.md), `layout`: [`FlowLayout`](/auto-docs/editor/variables/FlowLayout-1.md)) => [`FlowTransitionLabel`](/auto-docs/editor/interfaces/FlowTransitionLabel.md)\[]

#### Type declaration

(`transition`, `layout`): [`FlowTransitionLabel`](/auto-docs/editor/interfaces/FlowTransitionLabel.md)\[]

创建 label

##### Parameters

| Name | Type |
| :------ | :------ |
| `transition` | [`FlowNodeTransitionData`](/auto-docs/editor/classes/FlowNodeTransitionData.md) |
| `layout` | [`FlowLayout`](/auto-docs/editor/variables/FlowLayout-1.md) |

##### Returns

[`FlowTransitionLabel`](/auto-docs/editor/interfaces/FlowTransitionLabel.md)\[]

***

### getLines

`Optional` **getLines**: (`transition`: [`FlowNodeTransitionData`](/auto-docs/editor/classes/FlowNodeTransitionData.md), `layout`: [`FlowLayout`](/auto-docs/editor/variables/FlowLayout-1.md)) => [`FlowTransitionLine`](/auto-docs/editor/interfaces/FlowTransitionLine.md)\[]

#### Type declaration

(`transition`, `layout`): [`FlowTransitionLine`](/auto-docs/editor/interfaces/FlowTransitionLine.md)\[]

创建线条

##### Parameters

| Name | Type |
| :------ | :------ |
| `transition` | [`FlowNodeTransitionData`](/auto-docs/editor/classes/FlowNodeTransitionData.md) |
| `layout` | [`FlowLayout`](/auto-docs/editor/variables/FlowLayout-1.md) |

##### Returns

[`FlowTransitionLine`](/auto-docs/editor/interfaces/FlowTransitionLine.md)\[]

***

### getOriginDeltaX

`Optional` **getOriginDeltaX**: (`transform`: [`FlowNodeTransformData`](/auto-docs/editor/classes/FlowNodeTransformData.md), `layout`: [`FlowLayout`](/auto-docs/editor/variables/FlowLayout-1.md)) => `number`

#### Type declaration

(`transform`, `layout`): `number`

原点 X 偏移

##### Parameters

| Name | Type |
| :------ | :------ |
| `transform` | [`FlowNodeTransformData`](/auto-docs/editor/classes/FlowNodeTransformData.md) |
| `layout` | [`FlowLayout`](/auto-docs/editor/variables/FlowLayout-1.md) |

##### Returns

`number`

***

### getOriginDeltaY

`Optional` **getOriginDeltaY**: (`transform`: [`FlowNodeTransformData`](/auto-docs/editor/classes/FlowNodeTransformData.md), `layout`: [`FlowLayout`](/auto-docs/editor/variables/FlowLayout-1.md)) => `number`

#### Type declaration

(`transform`, `layout`): `number`

原点 Y 偏移

##### Parameters

| Name | Type |
| :------ | :------ |
| `transform` | [`FlowNodeTransformData`](/auto-docs/editor/classes/FlowNodeTransformData.md) |
| `layout` | [`FlowLayout`](/auto-docs/editor/variables/FlowLayout-1.md) |

##### Returns

`number`

***

### getOutputPoint

`Optional` **getOutputPoint**: (`transform`: [`FlowNodeTransformData`](/auto-docs/editor/classes/FlowNodeTransformData.md), `layoutKey`: [`FlowLayout`](/auto-docs/editor/variables/FlowLayout-1.md)) => [`IPoint`](/auto-docs/editor/interfaces/IPoint.md)

#### Type declaration

(`transform`, `layoutKey`): [`IPoint`](/auto-docs/editor/interfaces/IPoint.md)

自定义输出节点

##### Parameters

| Name | Type |
| :------ | :------ |
| `transform` | [`FlowNodeTransformData`](/auto-docs/editor/classes/FlowNodeTransformData.md) |
| `layoutKey` | [`FlowLayout`](/auto-docs/editor/variables/FlowLayout-1.md) |

##### Returns

[`IPoint`](/auto-docs/editor/interfaces/IPoint.md)

***

### meta

`Optional` **meta**: `Partial`<`M`>

节点画布相关初始化配置信息，会覆盖 DEFAULT\_FLOW\_NODE\_META

***

### onAfterUpdateLocalTransform

`Optional` **onAfterUpdateLocalTransform**: (`transform`: [`FlowNodeTransformData`](/auto-docs/editor/classes/FlowNodeTransformData.md), `layout`: [`FlowLayout`](/auto-docs/editor/variables/FlowLayout-1.md)) => `void`

#### Type declaration

(`transform`, `layout`): `void`

在当前节点布局完成后调用，可以对布局做更精细的调整

##### Parameters

| Name | Type |
| :------ | :------ |
| `transform` | [`FlowNodeTransformData`](/auto-docs/editor/classes/FlowNodeTransformData.md) |
| `layout` | [`FlowLayout`](/auto-docs/editor/variables/FlowLayout-1.md) |

##### Returns

`void`

***

### onBlockChildCreate

`Optional` **onBlockChildCreate**: (`node`: [`FlowNodeEntity`](/auto-docs/editor/classes/FlowNodeEntity-1.md), `json`: [`FlowNodeJSON`](/auto-docs/editor/interfaces/FlowNodeJSON.md), `addedNodes?`: [`FlowNodeEntity`](/auto-docs/editor/classes/FlowNodeEntity-1.md)\[]) => [`FlowNodeEntity`](/auto-docs/editor/classes/FlowNodeEntity-1.md)

#### Type declaration

(`node`, `json`, `addedNodes?`): [`FlowNodeEntity`](/auto-docs/editor/classes/FlowNodeEntity-1.md)

添加子 block，一般用于分支的动态添加

##### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`FlowNodeEntity`](/auto-docs/editor/classes/FlowNodeEntity-1.md) |
| `json` | [`FlowNodeJSON`](/auto-docs/editor/interfaces/FlowNodeJSON.md) |
| `addedNodes?` | [`FlowNodeEntity`](/auto-docs/editor/classes/FlowNodeEntity-1.md)\[] |

##### Returns

[`FlowNodeEntity`](/auto-docs/editor/classes/FlowNodeEntity-1.md)

***

### onCreate

`Optional` **onCreate**: (`node`: [`FlowNodeEntity`](/auto-docs/editor/classes/FlowNodeEntity-1.md), `json`: [`FlowNodeJSON`](/auto-docs/editor/interfaces/FlowNodeJSON.md)) => `void` | [`FlowNodeEntity`](/auto-docs/editor/classes/FlowNodeEntity-1.md)\[]

#### Type declaration

(`node`, `json`): `void` | [`FlowNodeEntity`](/auto-docs/editor/classes/FlowNodeEntity-1.md)\[]

自定义创建节点，可以自定义节点的树形结构
返回新加入的节点，这样才能统计缓存

##### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`FlowNodeEntity`](/auto-docs/editor/classes/FlowNodeEntity-1.md) |
| `json` | [`FlowNodeJSON`](/auto-docs/editor/interfaces/FlowNodeJSON.md) |

##### Returns

`void` | [`FlowNodeEntity`](/auto-docs/editor/classes/FlowNodeEntity-1.md)\[]

**`Action`**

使用该方法，在创建时候将会忽略 json blocks 数据，而是交给适用节点自己处理 json 逻辑

***

### type

**type**: [`FlowNodeType`](/auto-docs/editor/types/FlowNodeType.md)

节点类型

## Methods

### getOrigin

`Optional` **getOrigin**(`transform`, `layout`): [`IPoint`](/auto-docs/editor/interfaces/IPoint.md)

动态获取原点，会覆盖 meta.origin

#### Parameters

| Name | Type |
| :------ | :------ |
| `transform` | [`FlowNodeTransformData`](/auto-docs/editor/classes/FlowNodeTransformData.md) |
| `layout` | [`FlowLayout`](/auto-docs/editor/variables/FlowLayout-1.md) |

#### Returns

[`IPoint`](/auto-docs/editor/interfaces/IPoint.md)
