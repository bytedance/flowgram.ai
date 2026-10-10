# Class: FlowSelectConfigEntity

圈选节点相关数据存储

## Hierarchy

* `ConfigEntity`<`FlowSelectConfigEntityData`>

  ↳ **`FlowSelectConfigEntity`**

## Table of contents

### Constructors

* [constructor](/auto-docs/renderer/classes/FlowSelectConfigEntity.md#constructor)

### Properties

* [\_\_opts\_type\_\_](/auto-docs/renderer/classes/FlowSelectConfigEntity.md#__opts_type__)
* [boundsPadding](/auto-docs/renderer/classes/FlowSelectConfigEntity.md#boundspadding)
* [entityManager](/auto-docs/renderer/classes/FlowSelectConfigEntity.md#entitymanager)
* [onDataChange](/auto-docs/renderer/classes/FlowSelectConfigEntity.md#ondatachange)
* [onEntityChange](/auto-docs/renderer/classes/FlowSelectConfigEntity.md#onentitychange)
* [preDispose](/auto-docs/renderer/classes/FlowSelectConfigEntity.md#predispose)
* [toDispose](/auto-docs/renderer/classes/FlowSelectConfigEntity.md#todispose)
* [type](/auto-docs/renderer/classes/FlowSelectConfigEntity.md#type)

### Accessors

* [config](/auto-docs/renderer/classes/FlowSelectConfigEntity.md#config)
* [context](/auto-docs/renderer/classes/FlowSelectConfigEntity.md#context)
* [disposed](/auto-docs/renderer/classes/FlowSelectConfigEntity.md#disposed)
* [id](/auto-docs/renderer/classes/FlowSelectConfigEntity.md#id)
* [onDispose](/auto-docs/renderer/classes/FlowSelectConfigEntity.md#ondispose)
* [savedInManager](/auto-docs/renderer/classes/FlowSelectConfigEntity.md#savedinmanager)
* [selectedNodes](/auto-docs/renderer/classes/FlowSelectConfigEntity.md#selectednodes)
* [type](/auto-docs/renderer/classes/FlowSelectConfigEntity.md#type-1)
* [version](/auto-docs/renderer/classes/FlowSelectConfigEntity.md#version)

### Methods

* [addData](/auto-docs/renderer/classes/FlowSelectConfigEntity.md#adddata)
* [addInitializeData](/auto-docs/renderer/classes/FlowSelectConfigEntity.md#addinitializedata)
* [checkChanged](/auto-docs/renderer/classes/FlowSelectConfigEntity.md#checkchanged)
* [clearSelectedNodes](/auto-docs/renderer/classes/FlowSelectConfigEntity.md#clearselectednodes)
* [dispose](/auto-docs/renderer/classes/FlowSelectConfigEntity.md#dispose)
* [fromJSON](/auto-docs/renderer/classes/FlowSelectConfigEntity.md#fromjson)
* [getData](/auto-docs/renderer/classes/FlowSelectConfigEntity.md#getdata)
* [getDefaultConfig](/auto-docs/renderer/classes/FlowSelectConfigEntity.md#getdefaultconfig)
* [getDefaultDataRegistries](/auto-docs/renderer/classes/FlowSelectConfigEntity.md#getdefaultdataregistries)
* [getSelectedBounds](/auto-docs/renderer/classes/FlowSelectConfigEntity.md#getselectedbounds)
* [getService](/auto-docs/renderer/classes/FlowSelectConfigEntity.md#getservice)
* [hasData](/auto-docs/renderer/classes/FlowSelectConfigEntity.md#hasdata)
* [onConfigChanged](/auto-docs/renderer/classes/FlowSelectConfigEntity.md#onconfigchanged)
* [removeData](/auto-docs/renderer/classes/FlowSelectConfigEntity.md#removedata)
* [reset](/auto-docs/renderer/classes/FlowSelectConfigEntity.md#reset)
* [selectFromBounds](/auto-docs/renderer/classes/FlowSelectConfigEntity.md#selectfrombounds)
* [toJSON](/auto-docs/renderer/classes/FlowSelectConfigEntity.md#tojson)
* [updateConfig](/auto-docs/renderer/classes/FlowSelectConfigEntity.md#updateconfig)
* [updateData](/auto-docs/renderer/classes/FlowSelectConfigEntity.md#updatedata)

## Constructors

### constructor

**new FlowSelectConfigEntity**(`opts`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | `EntityOpts` |

#### Inherited from

ConfigEntity\<FlowSelectConfigEntityData>.constructor

## Properties

### \_\_opts\_type\_\_

**\_\_opts\_type\_\_**: `EntityOpts`

#### Inherited from

ConfigEntity.\_\_opts\_type\_\_

***

### boundsPadding

**boundsPadding**: `number` = `BOUNDS_PADDING_DEFAULT`

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

`Static` **type**: `string` = `'FlowSelectConfigEntity'`

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

### selectedNodes

`get` **selectedNodes**(): `FlowNodeEntity`\[]

#### Returns

`FlowNodeEntity`\[]

`set` **selectedNodes**(`nodes`): `void`

选中节点

#### Parameters

| Name | Type |
| :------ | :------ |
| `nodes` | `FlowNodeEntity`\[] |

#### Returns

`void`

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
| `oldData` | `FlowSelectConfigEntityData` |
| `newData` | `Partial`<`FlowSelectConfigEntityData`> |

#### Returns

`boolean`

#### Inherited from

ConfigEntity.checkChanged

***

### clearSelectedNodes

**clearSelectedNodes**(): `void`

清除选中节点

#### Returns

`void`

***

### dispose

**dispose**(): `void`

销毁实体

#### Returns

`void`

#### Inherited from

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

**getDefaultConfig**(): `FlowSelectConfigEntityData`

#### Returns

`FlowSelectConfigEntityData`

#### Overrides

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

### getSelectedBounds

**getSelectedBounds**(): `Rectangle`

获取选中节点外围的最大边框

#### Returns

`Rectangle`

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

### onConfigChanged

**onConfigChanged**(`fn`): `Disposable`

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | (`data`: `FlowSelectConfigEntityData`) => `void` |

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

### selectFromBounds

**selectFromBounds**(`rect`, `transforms`): `void`

通过选择框选中节点

#### Parameters

| Name | Type |
| :------ | :------ |
| `rect` | `Rectangle` |
| `transforms` | `FlowNodeTransformData`\[] |

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
| `props` | `Partial`<`FlowSelectConfigEntityData`> |

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
