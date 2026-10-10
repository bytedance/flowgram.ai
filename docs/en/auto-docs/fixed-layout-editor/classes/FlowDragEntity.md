# Class: FlowDragEntity

用于专门的数据配置，且是单例

## Hierarchy

* [`ConfigEntity`](/en/auto-docs/fixed-layout-editor/classes/ConfigEntity.md)<`FlowDragEntityConfig`>

  ↳ **`FlowDragEntity`**

## Table of contents

### Constructors

* [constructor](/en/auto-docs/fixed-layout-editor/classes/FlowDragEntity.md#constructor)

### Properties

* [\_\_opts\_type\_\_](/en/auto-docs/fixed-layout-editor/classes/FlowDragEntity.md#__opts_type__)
* [entityManager](/en/auto-docs/fixed-layout-editor/classes/FlowDragEntity.md#entitymanager)
* [onDataChange](/en/auto-docs/fixed-layout-editor/classes/FlowDragEntity.md#ondatachange)
* [onEntityChange](/en/auto-docs/fixed-layout-editor/classes/FlowDragEntity.md#onentitychange)
* [preDispose](/en/auto-docs/fixed-layout-editor/classes/FlowDragEntity.md#predispose)
* [toDispose](/en/auto-docs/fixed-layout-editor/classes/FlowDragEntity.md#todispose)
* [type](/en/auto-docs/fixed-layout-editor/classes/FlowDragEntity.md#type)

### Accessors

* [config](/en/auto-docs/fixed-layout-editor/classes/FlowDragEntity.md#config)
* [context](/en/auto-docs/fixed-layout-editor/classes/FlowDragEntity.md#context)
* [disposed](/en/auto-docs/fixed-layout-editor/classes/FlowDragEntity.md#disposed)
* [hasScroll](/en/auto-docs/fixed-layout-editor/classes/FlowDragEntity.md#hasscroll)
* [id](/en/auto-docs/fixed-layout-editor/classes/FlowDragEntity.md#id)
* [onDispose](/en/auto-docs/fixed-layout-editor/classes/FlowDragEntity.md#ondispose)
* [savedInManager](/en/auto-docs/fixed-layout-editor/classes/FlowDragEntity.md#savedinmanager)
* [type](/en/auto-docs/fixed-layout-editor/classes/FlowDragEntity.md#type-1)
* [version](/en/auto-docs/fixed-layout-editor/classes/FlowDragEntity.md#version)

### Methods

* [addData](/en/auto-docs/fixed-layout-editor/classes/FlowDragEntity.md#adddata)
* [addInitializeData](/en/auto-docs/fixed-layout-editor/classes/FlowDragEntity.md#addinitializedata)
* [checkChanged](/en/auto-docs/fixed-layout-editor/classes/FlowDragEntity.md#checkchanged)
* [dispose](/en/auto-docs/fixed-layout-editor/classes/FlowDragEntity.md#dispose)
* [fromJSON](/en/auto-docs/fixed-layout-editor/classes/FlowDragEntity.md#fromjson)
* [getData](/en/auto-docs/fixed-layout-editor/classes/FlowDragEntity.md#getdata)
* [getDefaultConfig](/en/auto-docs/fixed-layout-editor/classes/FlowDragEntity.md#getdefaultconfig)
* [getDefaultDataRegistries](/en/auto-docs/fixed-layout-editor/classes/FlowDragEntity.md#getdefaultdataregistries)
* [getService](/en/auto-docs/fixed-layout-editor/classes/FlowDragEntity.md#getservice)
* [hasData](/en/auto-docs/fixed-layout-editor/classes/FlowDragEntity.md#hasdata)
* [isBranchCollision](/en/auto-docs/fixed-layout-editor/classes/FlowDragEntity.md#isbranchcollision)
* [isCollision](/en/auto-docs/fixed-layout-editor/classes/FlowDragEntity.md#iscollision)
* [isNodeCollision](/en/auto-docs/fixed-layout-editor/classes/FlowDragEntity.md#isnodecollision)
* [onConfigChanged](/en/auto-docs/fixed-layout-editor/classes/FlowDragEntity.md#onconfigchanged)
* [removeData](/en/auto-docs/fixed-layout-editor/classes/FlowDragEntity.md#removedata)
* [reset](/en/auto-docs/fixed-layout-editor/classes/FlowDragEntity.md#reset)
* [scrollDirection](/en/auto-docs/fixed-layout-editor/classes/FlowDragEntity.md#scrolldirection)
* [stopAllScroll](/en/auto-docs/fixed-layout-editor/classes/FlowDragEntity.md#stopallscroll)
* [toJSON](/en/auto-docs/fixed-layout-editor/classes/FlowDragEntity.md#tojson)
* [updateConfig](/en/auto-docs/fixed-layout-editor/classes/FlowDragEntity.md#updateconfig)
* [updateData](/en/auto-docs/fixed-layout-editor/classes/FlowDragEntity.md#updatedata)

## Constructors

### constructor

**new FlowDragEntity**(`conf`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `conf` | `any` |

#### Overrides

[ConfigEntity](/en/auto-docs/fixed-layout-editor/classes/ConfigEntity.md).[constructor](/en/auto-docs/fixed-layout-editor/classes/ConfigEntity.md#constructor)

## Properties

### \_\_opts\_type\_\_

**\_\_opts\_type\_\_**: [`EntityOpts`](/en/auto-docs/fixed-layout-editor/interfaces/EntityOpts.md)

#### Inherited from

[ConfigEntity](/en/auto-docs/fixed-layout-editor/classes/ConfigEntity.md).[**opts\_type**](/en/auto-docs/fixed-layout-editor/classes/ConfigEntity.md#__opts_type__)

***

### entityManager

`Readonly` **entityManager**: [`EntityManager`](/en/auto-docs/fixed-layout-editor/classes/EntityManager.md)

全局的entity管理器

#### Inherited from

[ConfigEntity](/en/auto-docs/fixed-layout-editor/classes/ConfigEntity.md).[entityManager](/en/auto-docs/fixed-layout-editor/classes/ConfigEntity.md#entitymanager)

***

### onDataChange

`Readonly` **onDataChange**: [`Event`](/en/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<[`EntityDataChangedEvent`](/en/auto-docs/fixed-layout-editor/interfaces/EntityDataChangedEvent.md)<[`Entity`](/en/auto-docs/fixed-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/fixed-layout-editor/interfaces/EntityOpts.md)>>>

数据更改事件

#### Inherited from

[ConfigEntity](/en/auto-docs/fixed-layout-editor/classes/ConfigEntity.md).[onDataChange](/en/auto-docs/fixed-layout-editor/classes/ConfigEntity.md#ondatachange)

***

### onEntityChange

`Readonly` **onEntityChange**: [`Event`](/en/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<[`Entity`](/en/auto-docs/fixed-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/fixed-layout-editor/interfaces/EntityOpts.md)>>

修改会触发

#### Inherited from

[ConfigEntity](/en/auto-docs/fixed-layout-editor/classes/ConfigEntity.md).[onEntityChange](/en/auto-docs/fixed-layout-editor/classes/ConfigEntity.md#onentitychange)

***

### preDispose

`Readonly` **preDispose**: [`DisposableCollection`](/en/auto-docs/fixed-layout-editor/classes/DisposableCollection.md)

销毁前事件管理

#### Inherited from

[ConfigEntity](/en/auto-docs/fixed-layout-editor/classes/ConfigEntity.md).[preDispose](/en/auto-docs/fixed-layout-editor/classes/ConfigEntity.md#predispose)

***

### toDispose

`Readonly` **toDispose**: [`DisposableCollection`](/en/auto-docs/fixed-layout-editor/classes/DisposableCollection.md)

销毁事件管理

#### Inherited from

[ConfigEntity](/en/auto-docs/fixed-layout-editor/classes/ConfigEntity.md).[toDispose](/en/auto-docs/fixed-layout-editor/classes/ConfigEntity.md#todispose)

***

### type

`Static` **type**: `string`

#### Overrides

[ConfigEntity](/en/auto-docs/fixed-layout-editor/classes/ConfigEntity.md).[type](/en/auto-docs/fixed-layout-editor/classes/ConfigEntity.md#type)

## Accessors

### config

`get` **config**(): `P`

#### Returns

`P`

#### Inherited from

ConfigEntity.config

***

### context

`get` **context**(): `any`

#### Returns

`any`

#### Inherited from

ConfigEntity.context

***

### disposed

`get` **disposed**(): `boolean`

#### Returns

`boolean`

#### Inherited from

ConfigEntity.disposed

***

### hasScroll

`get` **hasScroll**(): `boolean`

#### Returns

`boolean`

***

### id

`get` **id**(): `string`

实体 id

#### Returns

`string`

#### Inherited from

ConfigEntity.id

***

### onDispose

`get` **onDispose**(): [`Event`](/en/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<`void`>

销毁事件

#### Returns

[`Event`](/en/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<`void`>

#### Inherited from

ConfigEntity.onDispose

***

### savedInManager

`get` **savedInManager**(): `boolean`

是否存到全局 manager，默认 true

#### Returns

`boolean`

#### Inherited from

ConfigEntity.savedInManager

***

### type

`get` **type**(): `string`

实体类型

#### Returns

`string`

#### Inherited from

ConfigEntity.type

***

### version

`get` **version**(): `number`

实体的版本

#### Returns

`number`

#### Inherited from

ConfigEntity.version

## Methods

### addData

**addData**<`D`>(`Registry`, `defaultProps?`): `D`

添加数据

#### Type parameters

| Name | Type |
| :------ | :------ |
| `D` | extends [`EntityData`](/en/auto-docs/fixed-layout-editor/classes/EntityData.md)<`any`, {}, `D`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `Registry` | [`EntityDataRegistry`](/en/auto-docs/fixed-layout-editor/interfaces/EntityDataRegistry.md)<[`EntityData`](/en/auto-docs/fixed-layout-editor/classes/EntityData.md)<`any`, {}>> |
| `defaultProps?` | [`EntityDataProps`](/en/auto-docs/fixed-layout-editor/types/EntityDataProps.md)<`D`> |

#### Returns

`D`

#### Inherited from

[ConfigEntity](/en/auto-docs/fixed-layout-editor/classes/ConfigEntity.md).[addData](/en/auto-docs/fixed-layout-editor/classes/ConfigEntity.md#adddata)

***

### addInitializeData

**addInitializeData**(`datas`, `dataConfig?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `datas` | [`EntityDataRegistry`](/en/auto-docs/fixed-layout-editor/interfaces/EntityDataRegistry.md)<[`EntityData`](/en/auto-docs/fixed-layout-editor/classes/EntityData.md)<`any`, {}>>\[] |
| `dataConfig?` | `any` |

#### Returns

`void`

#### Inherited from

[ConfigEntity](/en/auto-docs/fixed-layout-editor/classes/ConfigEntity.md).[addInitializeData](/en/auto-docs/fixed-layout-editor/classes/ConfigEntity.md#addinitializedata)

***

### checkChanged

**checkChanged**(`oldData`, `newData`): `boolean`

判断 config 数据是否变化

#### Parameters

| Name | Type |
| :------ | :------ |
| `oldData` | `FlowDragEntityConfig` |
| `newData` | `Partial`<`FlowDragEntityConfig`> |

#### Returns

`boolean`

#### Inherited from

[ConfigEntity](/en/auto-docs/fixed-layout-editor/classes/ConfigEntity.md).[checkChanged](/en/auto-docs/fixed-layout-editor/classes/ConfigEntity.md#checkchanged)

***

### dispose

**dispose**(): `void`

销毁实体

#### Returns

`void`

#### Overrides

[ConfigEntity](/en/auto-docs/fixed-layout-editor/classes/ConfigEntity.md).[dispose](/en/auto-docs/fixed-layout-editor/classes/ConfigEntity.md#dispose)

***

### fromJSON

**fromJSON**(`data?`): `void`

还原数据

#### Parameters

| Name | Type |
| :------ | :------ |
| `data?` | `any` |

#### Returns

`void`

#### Inherited from

[ConfigEntity](/en/auto-docs/fixed-layout-editor/classes/ConfigEntity.md).[fromJSON](/en/auto-docs/fixed-layout-editor/classes/ConfigEntity.md#fromjson)

***

### getData

**getData**<`D`>(`Registry`): `D`

获取 data 数据

#### Type parameters

| Name | Type |
| :------ | :------ |
| `D` | extends [`EntityData`](/en/auto-docs/fixed-layout-editor/classes/EntityData.md)<`any`, {}, `D`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `Registry` | [`EntityDataRegistry`](/en/auto-docs/fixed-layout-editor/interfaces/EntityDataRegistry.md)<`D`> |

#### Returns

`D`

#### Inherited from

[ConfigEntity](/en/auto-docs/fixed-layout-editor/classes/ConfigEntity.md).[getData](/en/auto-docs/fixed-layout-editor/classes/ConfigEntity.md#getdata)

***

### getDefaultConfig

**getDefaultConfig**(): `FlowDragEntityConfig`

#### Returns

`FlowDragEntityConfig`

#### Inherited from

[ConfigEntity](/en/auto-docs/fixed-layout-editor/classes/ConfigEntity.md).[getDefaultConfig](/en/auto-docs/fixed-layout-editor/classes/ConfigEntity.md#getdefaultconfig)

***

### getDefaultDataRegistries

**getDefaultDataRegistries**(): [`EntityDataRegistry`](/en/auto-docs/fixed-layout-editor/interfaces/EntityDataRegistry.md)<[`EntityData`](/en/auto-docs/fixed-layout-editor/classes/EntityData.md)<`any`, {}>>\[]

默认初始化的 Data

#### Returns

[`EntityDataRegistry`](/en/auto-docs/fixed-layout-editor/interfaces/EntityDataRegistry.md)<[`EntityData`](/en/auto-docs/fixed-layout-editor/classes/EntityData.md)<`any`, {}>>\[]

#### Inherited from

[ConfigEntity](/en/auto-docs/fixed-layout-editor/classes/ConfigEntity.md).[getDefaultDataRegistries](/en/auto-docs/fixed-layout-editor/classes/ConfigEntity.md#getdefaultdataregistries)

***

### getService

**getService**<`T`>(`identifier`): `T`

获取 IOC 服务

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `identifier` | [`ServiceIdentifier`](/en/auto-docs/fixed-layout-editor/types/interfaces.ServiceIdentifier.md)<`T`> |

#### Returns

`T`

#### Inherited from

[ConfigEntity](/en/auto-docs/fixed-layout-editor/classes/ConfigEntity.md).[getService](/en/auto-docs/fixed-layout-editor/classes/ConfigEntity.md#getservice)

***

### hasData

**hasData**(`Registry`): `boolean`

是否有指定数据

#### Parameters

| Name | Type |
| :------ | :------ |
| `Registry` | [`EntityDataRegistry`](/en/auto-docs/fixed-layout-editor/interfaces/EntityDataRegistry.md)<[`EntityData`](/en/auto-docs/fixed-layout-editor/classes/EntityData.md)<`any`, {}>> |

#### Returns

`boolean`

#### Inherited from

[ConfigEntity](/en/auto-docs/fixed-layout-editor/classes/ConfigEntity.md).[hasData](/en/auto-docs/fixed-layout-editor/classes/ConfigEntity.md#hasdata)

***

### isBranchCollision

**isBranchCollision**(`transition`, `rect`, `scale`): [`CollisionRetType`](/en/auto-docs/fixed-layout-editor/interfaces/CollisionRetType.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `transition` | [`FlowNodeTransitionData`](/en/auto-docs/fixed-layout-editor/classes/FlowNodeTransitionData.md) |
| `rect` | [`Rectangle`](/en/auto-docs/fixed-layout-editor/classes/Rectangle-1.md) |
| `scale` | `number` |

#### Returns

[`CollisionRetType`](/en/auto-docs/fixed-layout-editor/interfaces/CollisionRetType.md)

***

### isCollision

**isCollision**(`transition`, `rect`, `isBranch`): [`CollisionRetType`](/en/auto-docs/fixed-layout-editor/interfaces/CollisionRetType.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `transition` | [`FlowNodeTransitionData`](/en/auto-docs/fixed-layout-editor/classes/FlowNodeTransitionData.md) |
| `rect` | [`Rectangle`](/en/auto-docs/fixed-layout-editor/classes/Rectangle-1.md) |
| `isBranch` | `boolean` |

#### Returns

[`CollisionRetType`](/en/auto-docs/fixed-layout-editor/interfaces/CollisionRetType.md)

***

### isNodeCollision

**isNodeCollision**(`transition`, `rect`, `scale`): [`CollisionRetType`](/en/auto-docs/fixed-layout-editor/interfaces/CollisionRetType.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `transition` | [`FlowNodeTransitionData`](/en/auto-docs/fixed-layout-editor/classes/FlowNodeTransitionData.md) |
| `rect` | [`Rectangle`](/en/auto-docs/fixed-layout-editor/classes/Rectangle-1.md) |
| `scale` | `number` |

#### Returns

[`CollisionRetType`](/en/auto-docs/fixed-layout-editor/interfaces/CollisionRetType.md)

***

### onConfigChanged

**onConfigChanged**(`fn`): [`Disposable`](/en/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | (`data`: `FlowDragEntityConfig`) => `void` |

#### Returns

[`Disposable`](/en/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md)

#### Inherited from

[ConfigEntity](/en/auto-docs/fixed-layout-editor/classes/ConfigEntity.md).[onConfigChanged](/en/auto-docs/fixed-layout-editor/classes/ConfigEntity.md#onconfigchanged)

***

### removeData

**removeData**<`D`>(`Registry`): `void`

删除数据，初始化状态注入的数据无法被删除

#### Type parameters

| Name | Type |
| :------ | :------ |
| `D` | extends [`EntityData`](/en/auto-docs/fixed-layout-editor/classes/EntityData.md)<`any`, {}, `D`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `Registry` | [`EntityDataRegistry`](/en/auto-docs/fixed-layout-editor/interfaces/EntityDataRegistry.md)<`D`> |

#### Returns

`void`

#### Inherited from

[ConfigEntity](/en/auto-docs/fixed-layout-editor/classes/ConfigEntity.md).[removeData](/en/auto-docs/fixed-layout-editor/classes/ConfigEntity.md#removedata)

***

### reset

**reset**(): `void`

重制为初始化状态

#### Returns

`void`

#### Inherited from

[ConfigEntity](/en/auto-docs/fixed-layout-editor/classes/ConfigEntity.md).[reset](/en/auto-docs/fixed-layout-editor/classes/ConfigEntity.md#reset)

***

### scrollDirection

**scrollDirection**(`e`, `x`, `y`): `undefined` | `ScrollDirection`

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `MouseEvent` |
| `x` | `number` |
| `y` | `number` |

#### Returns

`undefined` | `ScrollDirection`

***

### stopAllScroll

**stopAllScroll**(): `void`

#### Returns

`void`

***

### toJSON

**toJSON**(): `any`

存储数据，用于持久化存储

#### Returns

`any`

#### Inherited from

[ConfigEntity](/en/auto-docs/fixed-layout-editor/classes/ConfigEntity.md).[toJSON](/en/auto-docs/fixed-layout-editor/classes/ConfigEntity.md#tojson)

***

### updateConfig

**updateConfig**(`props`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `Partial`<`FlowDragEntityConfig`> |

#### Returns

`void`

#### Inherited from

[ConfigEntity](/en/auto-docs/fixed-layout-editor/classes/ConfigEntity.md).[updateConfig](/en/auto-docs/fixed-layout-editor/classes/ConfigEntity.md#updateconfig)

***

### updateData

**updateData**<`D`>(`Registry`, `props`): `void`

更新实体的数据

#### Type parameters

| Name | Type |
| :------ | :------ |
| `D` | extends [`EntityData`](/en/auto-docs/fixed-layout-editor/classes/EntityData.md)<`any`, {}, `D`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `Registry` | [`EntityDataRegistry`](/en/auto-docs/fixed-layout-editor/interfaces/EntityDataRegistry.md)<`D`> |
| `props` | [`EntityDataProps`](/en/auto-docs/fixed-layout-editor/types/EntityDataProps.md)<`D`> |

#### Returns

`void`

#### Inherited from

[ConfigEntity](/en/auto-docs/fixed-layout-editor/classes/ConfigEntity.md).[updateData](/en/auto-docs/fixed-layout-editor/classes/ConfigEntity.md#updatedata)
