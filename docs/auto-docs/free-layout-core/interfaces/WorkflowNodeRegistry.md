# Interface: WorkflowNodeRegistry

节点注册

## Hierarchy

* `FlowNodeRegistry`<[`WorkflowNodeMeta`](/auto-docs/free-layout-core/interfaces/WorkflowNodeMeta.md)>

  ↳ **`WorkflowNodeRegistry`**

## Table of contents

### Properties

* [\_\_extends\_\_](/auto-docs/free-layout-core/interfaces/WorkflowNodeRegistry.md#__extends__)
* [addChild](/auto-docs/free-layout-core/interfaces/WorkflowNodeRegistry.md#addchild)
* [canAddLine](/auto-docs/free-layout-core/interfaces/WorkflowNodeRegistry.md#canaddline)
* [dataRegistries](/auto-docs/free-layout-core/interfaces/WorkflowNodeRegistry.md#dataregistries)
* [extend](/auto-docs/free-layout-core/interfaces/WorkflowNodeRegistry.md#extend)
* [extendChildRegistries](/auto-docs/free-layout-core/interfaces/WorkflowNodeRegistry.md#extendchildregistries)
* [formMeta](/auto-docs/free-layout-core/interfaces/WorkflowNodeRegistry.md#formmeta)
* [getChildDelta](/auto-docs/free-layout-core/interfaces/WorkflowNodeRegistry.md#getchilddelta)
* [getChildLabels](/auto-docs/free-layout-core/interfaces/WorkflowNodeRegistry.md#getchildlabels)
* [getChildLines](/auto-docs/free-layout-core/interfaces/WorkflowNodeRegistry.md#getchildlines)
* [getDelta](/auto-docs/free-layout-core/interfaces/WorkflowNodeRegistry.md#getdelta)
* [getInputPoint](/auto-docs/free-layout-core/interfaces/WorkflowNodeRegistry.md#getinputpoint)
* [getLabels](/auto-docs/free-layout-core/interfaces/WorkflowNodeRegistry.md#getlabels)
* [getLines](/auto-docs/free-layout-core/interfaces/WorkflowNodeRegistry.md#getlines)
* [getOriginDeltaX](/auto-docs/free-layout-core/interfaces/WorkflowNodeRegistry.md#getorigindeltax)
* [getOriginDeltaY](/auto-docs/free-layout-core/interfaces/WorkflowNodeRegistry.md#getorigindeltay)
* [getOutputPoint](/auto-docs/free-layout-core/interfaces/WorkflowNodeRegistry.md#getoutputpoint)
* [meta](/auto-docs/free-layout-core/interfaces/WorkflowNodeRegistry.md#meta)
* [onAfterUpdateLocalTransform](/auto-docs/free-layout-core/interfaces/WorkflowNodeRegistry.md#onafterupdatelocaltransform)
* [onBlockChildCreate](/auto-docs/free-layout-core/interfaces/WorkflowNodeRegistry.md#onblockchildcreate)
* [onCreate](/auto-docs/free-layout-core/interfaces/WorkflowNodeRegistry.md#oncreate)
* [type](/auto-docs/free-layout-core/interfaces/WorkflowNodeRegistry.md#type)

### Methods

* [getOrigin](/auto-docs/free-layout-core/interfaces/WorkflowNodeRegistry.md#getorigin)

## Properties

### \_\_extends\_\_

`Optional` **\_\_extends\_\_**: `FlowNodeType`\[]

内部用于继承逻辑判断，不要使用

#### Inherited from

FlowNodeRegistry.\_\_extends\_\_

***

### addChild

`Optional` **addChild**: (`node`: `FlowNodeEntity`, `json`: `FlowNodeJSON`, `options?`: { `hidden?`: `boolean` ; `index?`: `number`  }) => `FlowNodeEntity`

#### Type declaration

(`node`, `json`, `options?`): `FlowNodeEntity`

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `FlowNodeEntity` | 节点 |
| `json` | `FlowNodeJSON` | 添加的节点 JSON |
| `options?` | `Object` | 其它配置 |
| `options.hidden?` | `boolean` | - |
| `options.index?` | `number` | - |

##### Returns

`FlowNodeEntity`

**`Deprecated`**

自定义子节点添加逻辑

#### Inherited from

FlowNodeRegistry.addChild

***

### canAddLine

`Optional` **canAddLine**: (`fromPort`: [`WorkflowPortEntity`](/auto-docs/free-layout-core/classes/WorkflowPortEntity.md), `toPort`: [`WorkflowPortEntity`](/auto-docs/free-layout-core/classes/WorkflowPortEntity.md), `lines`: [`WorkflowLinesManager`](/auto-docs/free-layout-core/classes/WorkflowLinesManager.md), `silent?`: `boolean`) => `boolean`

#### Type declaration

(`fromPort`, `toPort`, `lines`, `silent?`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `fromPort` | [`WorkflowPortEntity`](/auto-docs/free-layout-core/classes/WorkflowPortEntity.md) |
| `toPort` | [`WorkflowPortEntity`](/auto-docs/free-layout-core/classes/WorkflowPortEntity.md) |
| `lines` | [`WorkflowLinesManager`](/auto-docs/free-layout-core/classes/WorkflowLinesManager.md) |
| `silent?` | `boolean` |

##### Returns

`boolean`

***

### dataRegistries

`Optional` **dataRegistries**: `EntityDataRegistry`<`EntityData`<`any`, {}>>\[]

节点注册的数据，可以理解为 ECS 里的 Component, 这里可以配置自定义数据

#### Inherited from

FlowNodeRegistry.dataRegistries

***

### extend

`Optional` **extend**: `string`

从另外一个注册扩展

#### Inherited from

FlowNodeRegistry.extend

***

### extendChildRegistries

`Optional` **extendChildRegistries**: `FlowNodeRegistry`<`FlowNodeMeta`>\[]

子节点的 registry 覆盖，这里通过 originParent 来查找

#### Inherited from

FlowNodeRegistry.extendChildRegistries

***

### formMeta

`Optional` **formMeta**: [`WorkflowNodeFormMeta`](/auto-docs/free-layout-core/types/WorkflowNodeFormMeta.md)

***

### getChildDelta

`Optional` **getChildDelta**: (`childBlock`: `FlowNodeTransformData`, `layout`: `FlowLayout`) => `undefined` | `IPoint`

#### Type declaration

(`childBlock`, `layout`): `undefined` | `IPoint`

通过 parent 计算当前节点的偏移，规则同 getDelta

##### Parameters

| Name | Type |
| :------ | :------ |
| `childBlock` | `FlowNodeTransformData` |
| `layout` | `FlowLayout` |

##### Returns

`undefined` | `IPoint`

#### Inherited from

FlowNodeRegistry.getChildDelta

***

### getChildLabels

`Optional` **getChildLabels**: (`transition`: `FlowNodeTransitionData`, `layout`: `FlowLayout`) => `FlowTransitionLabel`\[]

#### Type declaration

(`transition`, `layout`): `FlowTransitionLabel`\[]

调整子节点的 Labels，优先级高于子节点本身的 getLabels

##### Parameters

| Name | Type |
| :------ | :------ |
| `transition` | `FlowNodeTransitionData` |
| `layout` | `FlowLayout` |

##### Returns

`FlowTransitionLabel`\[]

#### Inherited from

FlowNodeRegistry.getChildLabels

***

### getChildLines

`Optional` **getChildLines**: (`transition`: `FlowNodeTransitionData`, `layout`: `FlowLayout`) => `FlowTransitionLine`\[]

#### Type declaration

(`transition`, `layout`): `FlowTransitionLine`\[]

调整子节点的线条，优先级高于子节点本身的 getLines

##### Parameters

| Name | Type |
| :------ | :------ |
| `transition` | `FlowNodeTransitionData` |
| `layout` | `FlowLayout` |

##### Returns

`FlowTransitionLine`\[]

#### Inherited from

FlowNodeRegistry.getChildLines

***

### getDelta

`Optional` **getDelta**: (`transform`: `FlowNodeTransformData`, `layout`: `FlowLayout`) => `undefined` | `IPoint`

#### Type declaration

(`transform`, `layout`): `undefined` | `IPoint`

获取当前节点 Position 偏移量，偏移量计算只能使用已经计算完的数据，如上一个节点或者子节点，不然会造成 o(n^2) 复杂度

1. 切记不要用当前节点的 localBounds(相对位置 bbox)，因为 delta 计算发生在 localBounds 计算之前
2. 切记不要用 bounds(绝对位置 bbox, 会触发所有父节点绝对位置计算), bounds 只能在最终 render 时候使用
3. 可以用 pre 节点 和 子节点的 localBounds 或者 size 数据，因为子节点是先算的
4. 可以用当前节点的 size (所有子节点的最大 bbox), 这是已经确定下来的

##### Parameters

| Name | Type |
| :------ | :------ |
| `transform` | `FlowNodeTransformData` |
| `layout` | `FlowLayout` |

##### Returns

`undefined` | `IPoint`

#### Inherited from

FlowNodeRegistry.getDelta

***

### getInputPoint

`Optional` **getInputPoint**: (`transform`: `FlowNodeTransformData`, `layout`: `FlowLayout`) => `IPoint`

#### Type declaration

(`transform`, `layout`): `IPoint`

自定义输入节点

##### Parameters

| Name | Type |
| :------ | :------ |
| `transform` | `FlowNodeTransformData` |
| `layout` | `FlowLayout` |

##### Returns

`IPoint`

#### Inherited from

FlowNodeRegistry.getInputPoint

***

### getLabels

`Optional` **getLabels**: (`transition`: `FlowNodeTransitionData`, `layout`: `FlowLayout`) => `FlowTransitionLabel`\[]

#### Type declaration

(`transition`, `layout`): `FlowTransitionLabel`\[]

创建 label

##### Parameters

| Name | Type |
| :------ | :------ |
| `transition` | `FlowNodeTransitionData` |
| `layout` | `FlowLayout` |

##### Returns

`FlowTransitionLabel`\[]

#### Inherited from

FlowNodeRegistry.getLabels

***

### getLines

`Optional` **getLines**: (`transition`: `FlowNodeTransitionData`, `layout`: `FlowLayout`) => `FlowTransitionLine`\[]

#### Type declaration

(`transition`, `layout`): `FlowTransitionLine`\[]

创建线条

##### Parameters

| Name | Type |
| :------ | :------ |
| `transition` | `FlowNodeTransitionData` |
| `layout` | `FlowLayout` |

##### Returns

`FlowTransitionLine`\[]

#### Inherited from

FlowNodeRegistry.getLines

***

### getOriginDeltaX

`Optional` **getOriginDeltaX**: (`transform`: `FlowNodeTransformData`, `layout`: `FlowLayout`) => `number`

#### Type declaration

(`transform`, `layout`): `number`

原点 X 偏移

##### Parameters

| Name | Type |
| :------ | :------ |
| `transform` | `FlowNodeTransformData` |
| `layout` | `FlowLayout` |

##### Returns

`number`

#### Inherited from

FlowNodeRegistry.getOriginDeltaX

***

### getOriginDeltaY

`Optional` **getOriginDeltaY**: (`transform`: `FlowNodeTransformData`, `layout`: `FlowLayout`) => `number`

#### Type declaration

(`transform`, `layout`): `number`

原点 Y 偏移

##### Parameters

| Name | Type |
| :------ | :------ |
| `transform` | `FlowNodeTransformData` |
| `layout` | `FlowLayout` |

##### Returns

`number`

#### Inherited from

FlowNodeRegistry.getOriginDeltaY

***

### getOutputPoint

`Optional` **getOutputPoint**: (`transform`: `FlowNodeTransformData`, `layoutKey`: `FlowLayout`) => `IPoint`

#### Type declaration

(`transform`, `layoutKey`): `IPoint`

自定义输出节点

##### Parameters

| Name | Type |
| :------ | :------ |
| `transform` | `FlowNodeTransformData` |
| `layoutKey` | `FlowLayout` |

##### Returns

`IPoint`

#### Inherited from

FlowNodeRegistry.getOutputPoint

***

### meta

`Optional` **meta**: `Partial`<[`WorkflowNodeMeta`](/auto-docs/free-layout-core/interfaces/WorkflowNodeMeta.md)>

节点画布相关初始化配置信息，会覆盖 DEFAULT\_FLOW\_NODE\_META

#### Inherited from

FlowNodeRegistry.meta

***

### onAfterUpdateLocalTransform

`Optional` **onAfterUpdateLocalTransform**: (`transform`: `FlowNodeTransformData`, `layout`: `FlowLayout`) => `void`

#### Type declaration

(`transform`, `layout`): `void`

在当前节点布局完成后调用，可以对布局做更精细的调整

##### Parameters

| Name | Type |
| :------ | :------ |
| `transform` | `FlowNodeTransformData` |
| `layout` | `FlowLayout` |

##### Returns

`void`

#### Inherited from

FlowNodeRegistry.onAfterUpdateLocalTransform

***

### onBlockChildCreate

`Optional` **onBlockChildCreate**: (`node`: `FlowNodeEntity`, `json`: `FlowNodeJSON`, `addedNodes?`: `FlowNodeEntity`\[]) => `FlowNodeEntity`

#### Type declaration

(`node`, `json`, `addedNodes?`): `FlowNodeEntity`

添加子 block，一般用于分支的动态添加

##### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `FlowNodeEntity` |
| `json` | `FlowNodeJSON` |
| `addedNodes?` | `FlowNodeEntity`\[] |

##### Returns

`FlowNodeEntity`

#### Inherited from

FlowNodeRegistry.onBlockChildCreate

***

### onCreate

`Optional` **onCreate**: (`node`: `FlowNodeEntity`, `json`: `FlowNodeJSON`) => `void` | `FlowNodeEntity`\[]

#### Type declaration

(`node`, `json`): `void` | `FlowNodeEntity`\[]

自定义创建节点，可以自定义节点的树形结构
返回新加入的节点，这样才能统计缓存

##### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `FlowNodeEntity` |
| `json` | `FlowNodeJSON` |

##### Returns

`void` | `FlowNodeEntity`\[]

**`Action`**

使用该方法，在创建时候将会忽略 json blocks 数据，而是交给适用节点自己处理 json 逻辑

#### Inherited from

FlowNodeRegistry.onCreate

***

### type

**type**: `FlowNodeType`

节点类型

#### Inherited from

FlowNodeRegistry.type

## Methods

### getOrigin

`Optional` **getOrigin**(`transform`, `layout`): `IPoint`

动态获取原点，会覆盖 meta.origin

#### Parameters

| Name | Type |
| :------ | :------ |
| `transform` | `FlowNodeTransformData` |
| `layout` | `FlowLayout` |

#### Returns

`IPoint`

#### Inherited from

FlowNodeRegistry.getOrigin
