# Class: FlowDragEntity

## Hierarchy

* `ConfigEntity`<`FlowDragEntityConfig`>

  ↳ **`FlowDragEntity`**

## Table of contents

### Constructors

* [constructor](/en/auto-docs/renderer/classes/FlowDragEntity.md#constructor)

### Properties

* [\_\_opts\_type\_\_](/en/auto-docs/renderer/classes/FlowDragEntity.md#__opts_type__)
* [entityManager](/en/auto-docs/renderer/classes/FlowDragEntity.md#entitymanager)
* [onDataChange](/en/auto-docs/renderer/classes/FlowDragEntity.md#ondatachange)
* [onEntityChange](/en/auto-docs/renderer/classes/FlowDragEntity.md#onentitychange)
* [preDispose](/en/auto-docs/renderer/classes/FlowDragEntity.md#predispose)
* [toDispose](/en/auto-docs/renderer/classes/FlowDragEntity.md#todispose)
* [type](/en/auto-docs/renderer/classes/FlowDragEntity.md#type)

### Accessors

* [config](/en/auto-docs/renderer/classes/FlowDragEntity.md#config)
* [context](/en/auto-docs/renderer/classes/FlowDragEntity.md#context)
* [disposed](/en/auto-docs/renderer/classes/FlowDragEntity.md#disposed)
* [hasScroll](/en/auto-docs/renderer/classes/FlowDragEntity.md#hasscroll)
* [id](/en/auto-docs/renderer/classes/FlowDragEntity.md#id)
* [onDispose](/en/auto-docs/renderer/classes/FlowDragEntity.md#ondispose)
* [savedInManager](/en/auto-docs/renderer/classes/FlowDragEntity.md#savedinmanager)
* [type](/en/auto-docs/renderer/classes/FlowDragEntity.md#type-1)
* [version](/en/auto-docs/renderer/classes/FlowDragEntity.md#version)

### Methods

* [addData](/en/auto-docs/renderer/classes/FlowDragEntity.md#adddata)
* [addInitializeData](/en/auto-docs/renderer/classes/FlowDragEntity.md#addinitializedata)
* [checkChanged](/en/auto-docs/renderer/classes/FlowDragEntity.md#checkchanged)
* [dispose](/en/auto-docs/renderer/classes/FlowDragEntity.md#dispose)
* [fromJSON](/en/auto-docs/renderer/classes/FlowDragEntity.md#fromjson)
* [getData](/en/auto-docs/renderer/classes/FlowDragEntity.md#getdata)
* [getDefaultConfig](/en/auto-docs/renderer/classes/FlowDragEntity.md#getdefaultconfig)
* [getDefaultDataRegistries](/en/auto-docs/renderer/classes/FlowDragEntity.md#getdefaultdataregistries)
* [getService](/en/auto-docs/renderer/classes/FlowDragEntity.md#getservice)
* [hasData](/en/auto-docs/renderer/classes/FlowDragEntity.md#hasdata)
* [isBranchCollision](/en/auto-docs/renderer/classes/FlowDragEntity.md#isbranchcollision)
* [isCollision](/en/auto-docs/renderer/classes/FlowDragEntity.md#iscollision)
* [isNodeCollision](/en/auto-docs/renderer/classes/FlowDragEntity.md#isnodecollision)
* [onConfigChanged](/en/auto-docs/renderer/classes/FlowDragEntity.md#onconfigchanged)
* [removeData](/en/auto-docs/renderer/classes/FlowDragEntity.md#removedata)
* [reset](/en/auto-docs/renderer/classes/FlowDragEntity.md#reset)
* [scrollDirection](/en/auto-docs/renderer/classes/FlowDragEntity.md#scrolldirection)
* [stopAllScroll](/en/auto-docs/renderer/classes/FlowDragEntity.md#stopallscroll)
* [toJSON](/en/auto-docs/renderer/classes/FlowDragEntity.md#tojson)
* [updateConfig](/en/auto-docs/renderer/classes/FlowDragEntity.md#updateconfig)
* [updateData](/en/auto-docs/renderer/classes/FlowDragEntity.md#updatedata)

## Constructors

### constructor

**new FlowDragEntity**(`conf`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `conf` | `any` |

#### Overrides

ConfigEntity\&lt;FlowDragEntityConfig\&gt;.constructor

## Properties

### \_\_opts\_type\_\_

**\_\_opts\_type\_\_**: `EntityOpts`

#### Inherited from

ConfigEntity.\_\_opts\_type\_\_

***

### entityManager

`Readonly` **entityManager**: `EntityManager`

全局的entity管理器

#### Inherited from

ConfigEntity.entityManager

***

### onDataChange

`Readonly` **onDataChange**: `Event`<`EntityDataChangedEvent`<`Entity`<`EntityOpts`>>>

数据更改事件

#### Inherited from

ConfigEntity.onDataChange

***

### onEntityChange

`Readonly` **onEntityChange**: `Event`<`Entity`<`EntityOpts`>>

修改会触发

#### Inherited from

ConfigEntity.onEntityChange

***

### preDispose

`Readonly` **preDispose**: `DisposableCollection`

销毁前事件管理

#### Inherited from

ConfigEntity.preDispose

***

### toDispose

`Readonly` **toDispose**: `DisposableCollection`

销毁事件管理

#### Inherited from

ConfigEntity.toDispose

***

### type

`Static` **type**: `string` = `'FlowDragEntity'`

#### Overrides

ConfigEntity.type

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

`get` **onDispose**(): `Event`<`void`>

销毁事件

#### Returns

`Event`<`void`>

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
| `D` | extends `EntityData`<`any`, {}, `D`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `Registry` | `EntityDataRegistry`<`EntityData`<`any`, {}>> |
| `defaultProps?` | `EntityDataProps`<`D`> |

#### Returns

`D`

#### Inherited from

ConfigEntity.addData

***

### addInitializeData

**addInitializeData**(`datas`, `dataConfig?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `datas` | `EntityDataRegistry`<`EntityData`<`any`, {}>>\[] |
| `dataConfig?` | `any` |

#### Returns

`void`

#### Inherited from

ConfigEntity.addInitializeData

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

ConfigEntity.checkChanged

***

### dispose

**dispose**(): `void`

#### Returns

`void`

#### Overrides

ConfigEntity.dispose

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

ConfigEntity.fromJSON

***

### getData

**getData**<`D`>(`Registry`): `D`

获取 data 数据

#### Type parameters

| Name | Type |
| :------ | :------ |
| `D` | extends `EntityData`<`any`, {}, `D`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `Registry` | `EntityDataRegistry`<`D`> |

#### Returns

`D`

#### Inherited from

ConfigEntity.getData

***

### getDefaultConfig

**getDefaultConfig**(): `FlowDragEntityConfig`

#### Returns

`FlowDragEntityConfig`

#### Inherited from

ConfigEntity.getDefaultConfig

***

### getDefaultDataRegistries

**getDefaultDataRegistries**(): `EntityDataRegistry`<`EntityData`<`any`, {}>>\[]

默认初始化的 Data

#### Returns

`EntityDataRegistry`<`EntityData`<`any`, {}>>\[]

#### Inherited from

ConfigEntity.getDefaultDataRegistries

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
| `identifier` | `ServiceIdentifier`<`T`> |

#### Returns

`T`

#### Inherited from

ConfigEntity.getService

***

### hasData

**hasData**(`Registry`): `boolean`

是否有指定数据

#### Parameters

| Name | Type |
| :------ | :------ |
| `Registry` | `EntityDataRegistry`<`EntityData`<`any`, {}>> |

#### Returns

`boolean`

#### Inherited from

ConfigEntity.hasData

***

### isBranchCollision

**isBranchCollision**(`transition`, `rect`, `scale`): [`CollisionRetType`](/en/auto-docs/renderer/interfaces/CollisionRetType.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `transition` | `FlowNodeTransitionData` |
| `rect` | `Rectangle` |
| `scale` | `number` |

#### Returns

[`CollisionRetType`](/en/auto-docs/renderer/interfaces/CollisionRetType.md)

***

### isCollision

**isCollision**(`transition`, `rect`, `isBranch`): [`CollisionRetType`](/en/auto-docs/renderer/interfaces/CollisionRetType.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `transition` | `FlowNodeTransitionData` |
| `rect` | `Rectangle` |
| `isBranch` | `boolean` |

#### Returns

[`CollisionRetType`](/en/auto-docs/renderer/interfaces/CollisionRetType.md)

***

### isNodeCollision

**isNodeCollision**(`transition`, `rect`, `scale`): [`CollisionRetType`](/en/auto-docs/renderer/interfaces/CollisionRetType.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `transition` | `FlowNodeTransitionData` |
| `rect` | `Rectangle` |
| `scale` | `number` |

#### Returns

[`CollisionRetType`](/en/auto-docs/renderer/interfaces/CollisionRetType.md)

***

### onConfigChanged

**onConfigChanged**(`fn`): `Disposable`

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | (`data`: `FlowDragEntityConfig`) => `void` |

#### Returns

`Disposable`

#### Inherited from

ConfigEntity.onConfigChanged

***

### removeData

**removeData**<`D`>(`Registry`): `void`

删除数据，初始化状态注入的数据无法被删除

#### Type parameters

| Name | Type |
| :------ | :------ |
| `D` | extends `EntityData`<`any`, {}, `D`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `Registry` | `EntityDataRegistry`<`D`> |

#### Returns

`void`

#### Inherited from

ConfigEntity.removeData

***

### reset

**reset**(): `void`

重制为初始化状态

#### Returns

`void`

#### Inherited from

ConfigEntity.reset

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

ConfigEntity.toJSON

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

ConfigEntity.updateConfig

***

### updateData

**updateData**<`D`>(`Registry`, `props`): `void`

更新实体的数据

#### Type parameters

| Name | Type |
| :------ | :------ |
| `D` | extends `EntityData`<`any`, {}, `D`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `Registry` | `EntityDataRegistry`<`D`> |
| `props` | `EntityDataProps`<`D`> |

#### Returns

`void`

#### Inherited from

ConfigEntity.updateData
