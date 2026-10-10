# Class: EditorStateConfigEntity

编辑状态管理

## Hierarchy

* [`ConfigEntity`](/auto-docs/core/classes/ConfigEntity.md)

  ↳ **`EditorStateConfigEntity`**

## Table of contents

### Constructors

* [constructor](/auto-docs/core/classes/EditorStateConfigEntity.md#constructor)

### Properties

* [\_\_opts\_type\_\_](/auto-docs/core/classes/EditorStateConfigEntity.md#__opts_type__)
* [entityManager](/auto-docs/core/classes/EditorStateConfigEntity.md#entitymanager)
* [onDataChange](/auto-docs/core/classes/EditorStateConfigEntity.md#ondatachange)
* [onEntityChange](/auto-docs/core/classes/EditorStateConfigEntity.md#onentitychange)
* [onStateChange](/auto-docs/core/classes/EditorStateConfigEntity.md#onstatechange)
* [preDispose](/auto-docs/core/classes/EditorStateConfigEntity.md#predispose)
* [toDispose](/auto-docs/core/classes/EditorStateConfigEntity.md#todispose)
* [type](/auto-docs/core/classes/EditorStateConfigEntity.md#type)

### Accessors

* [config](/auto-docs/core/classes/EditorStateConfigEntity.md#config)
* [context](/auto-docs/core/classes/EditorStateConfigEntity.md#context)
* [disposed](/auto-docs/core/classes/EditorStateConfigEntity.md#disposed)
* [id](/auto-docs/core/classes/EditorStateConfigEntity.md#id)
* [isPressingShift](/auto-docs/core/classes/EditorStateConfigEntity.md#ispressingshift)
* [isPressingSpaceBar](/auto-docs/core/classes/EditorStateConfigEntity.md#ispressingspacebar)
* [onDispose](/auto-docs/core/classes/EditorStateConfigEntity.md#ondispose)
* [savedInManager](/auto-docs/core/classes/EditorStateConfigEntity.md#savedinmanager)
* [type](/auto-docs/core/classes/EditorStateConfigEntity.md#type-1)
* [version](/auto-docs/core/classes/EditorStateConfigEntity.md#version)

### Methods

* [addData](/auto-docs/core/classes/EditorStateConfigEntity.md#adddata)
* [addInitializeData](/auto-docs/core/classes/EditorStateConfigEntity.md#addinitializedata)
* [changeState](/auto-docs/core/classes/EditorStateConfigEntity.md#changestate)
* [checkChanged](/auto-docs/core/classes/EditorStateConfigEntity.md#checkchanged)
* [dispose](/auto-docs/core/classes/EditorStateConfigEntity.md#dispose)
* [fromJSON](/auto-docs/core/classes/EditorStateConfigEntity.md#fromjson)
* [getCurrentState](/auto-docs/core/classes/EditorStateConfigEntity.md#getcurrentstate)
* [getData](/auto-docs/core/classes/EditorStateConfigEntity.md#getdata)
* [getDefaultConfig](/auto-docs/core/classes/EditorStateConfigEntity.md#getdefaultconfig)
* [getDefaultDataRegistries](/auto-docs/core/classes/EditorStateConfigEntity.md#getdefaultdataregistries)
* [getService](/auto-docs/core/classes/EditorStateConfigEntity.md#getservice)
* [getStateFromShortcut](/auto-docs/core/classes/EditorStateConfigEntity.md#getstatefromshortcut)
* [getStates](/auto-docs/core/classes/EditorStateConfigEntity.md#getstates)
* [hasData](/auto-docs/core/classes/EditorStateConfigEntity.md#hasdata)
* [is](/auto-docs/core/classes/EditorStateConfigEntity.md#is)
* [isMouseFriendlyMode](/auto-docs/core/classes/EditorStateConfigEntity.md#ismousefriendlymode)
* [onCancel](/auto-docs/core/classes/EditorStateConfigEntity.md#oncancel)
* [onConfigChanged](/auto-docs/core/classes/EditorStateConfigEntity.md#onconfigchanged)
* [registerState](/auto-docs/core/classes/EditorStateConfigEntity.md#registerstate)
* [removeData](/auto-docs/core/classes/EditorStateConfigEntity.md#removedata)
* [reset](/auto-docs/core/classes/EditorStateConfigEntity.md#reset)
* [toDefaultState](/auto-docs/core/classes/EditorStateConfigEntity.md#todefaultstate)
* [toJSON](/auto-docs/core/classes/EditorStateConfigEntity.md#tojson)
* [updateConfig](/auto-docs/core/classes/EditorStateConfigEntity.md#updateconfig)
* [updateData](/auto-docs/core/classes/EditorStateConfigEntity.md#updatedata)

## Constructors

### constructor

**new EditorStateConfigEntity**(`opts`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | [`EntityOpts`](/auto-docs/core/interfaces/EntityOpts.md) |

#### Overrides

[ConfigEntity](/auto-docs/core/classes/ConfigEntity.md).[constructor](/auto-docs/core/classes/ConfigEntity.md#constructor)

## Properties

### \_\_opts\_type\_\_

**\_\_opts\_type\_\_**: [`EntityOpts`](/auto-docs/core/interfaces/EntityOpts.md)

#### Inherited from

[ConfigEntity](/auto-docs/core/classes/ConfigEntity.md).[**opts\_type**](/auto-docs/core/classes/ConfigEntity.md#__opts_type__)

***

### entityManager

`Readonly` **entityManager**: [`EntityManager`](/auto-docs/core/classes/EntityManager.md)

全局的entity管理器

#### Inherited from

[ConfigEntity](/auto-docs/core/classes/ConfigEntity.md).[entityManager](/auto-docs/core/classes/ConfigEntity.md#entitymanager)

***

### onDataChange

`Readonly` **onDataChange**: `Event`<[`EntityDataChangedEvent`](/auto-docs/core/interfaces/EntityDataChangedEvent.md)<[`Entity`](/auto-docs/core/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/core/interfaces/EntityOpts.md)>>>

数据更改事件

#### Inherited from

[ConfigEntity](/auto-docs/core/classes/ConfigEntity.md).[onDataChange](/auto-docs/core/classes/ConfigEntity.md#ondatachange)

***

### onEntityChange

`Readonly` **onEntityChange**: `Event`<[`Entity`](/auto-docs/core/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/core/interfaces/EntityOpts.md)>>

修改会触发

#### Inherited from

[ConfigEntity](/auto-docs/core/classes/ConfigEntity.md).[onEntityChange](/auto-docs/core/classes/ConfigEntity.md#onentitychange)

***

### onStateChange

`Readonly` **onStateChange**: `Event`<[`EditorStateChangeEvent`](/auto-docs/core/interfaces/EditorStateChangeEvent.md)>

***

### preDispose

`Readonly` **preDispose**: `DisposableCollection`

销毁前事件管理

#### Inherited from

[ConfigEntity](/auto-docs/core/classes/ConfigEntity.md).[preDispose](/auto-docs/core/classes/ConfigEntity.md#predispose)

***

### toDispose

`Readonly` **toDispose**: `DisposableCollection`

销毁事件管理

#### Inherited from

[ConfigEntity](/auto-docs/core/classes/ConfigEntity.md).[toDispose](/auto-docs/core/classes/ConfigEntity.md#todispose)

***

### type

`Static` **type**: `string` = `'EditorStateConfigEntity'`

#### Overrides

[ConfigEntity](/auto-docs/core/classes/ConfigEntity.md).[type](/auto-docs/core/classes/ConfigEntity.md#type)

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

### isPressingShift

`get` **isPressingShift**(): `boolean`

#### Returns

`boolean`

`set` **isPressingShift**(`isPressing`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `isPressing` | `boolean` |

#### Returns

`void`

***

### isPressingSpaceBar

`get` **isPressingSpaceBar**(): `boolean`

#### Returns

`boolean`

`set` **isPressingSpaceBar**(`isPressing`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `isPressing` | `boolean` |

#### Returns

`void`

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
| `D` | extends [`EntityData`](/auto-docs/core/classes/EntityData.md)<`any`, {}, `D`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `Registry` | [`EntityDataRegistry`](/auto-docs/core/interfaces/EntityDataRegistry.md)<[`EntityData`](/auto-docs/core/classes/EntityData.md)<`any`, {}>> |
| `defaultProps?` | [`EntityDataProps`](/auto-docs/core/types/EntityDataProps.md)<`D`> |

#### Returns

`D`

#### Inherited from

[ConfigEntity](/auto-docs/core/classes/ConfigEntity.md).[addData](/auto-docs/core/classes/ConfigEntity.md#adddata)

***

### addInitializeData

**addInitializeData**(`datas`, `dataConfig?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `datas` | [`EntityDataRegistry`](/auto-docs/core/interfaces/EntityDataRegistry.md)<[`EntityData`](/auto-docs/core/classes/EntityData.md)<`any`, {}>>\[] |
| `dataConfig?` | `any` |

#### Returns

`void`

#### Inherited from

[ConfigEntity](/auto-docs/core/classes/ConfigEntity.md).[addInitializeData](/auto-docs/core/classes/ConfigEntity.md#addinitializedata)

***

### changeState

**changeState**(`stateId`, `event?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `stateId` | `string` |
| `event?` | `MouseEvent`<`Element`, `MouseEvent`> |

#### Returns

`void`

***

### checkChanged

**checkChanged**(`oldData`, `newData`): `boolean`

判断 config 数据是否变化

#### Parameters

| Name | Type |
| :------ | :------ |
| `oldData` | [`ConfigEntityProps`](/auto-docs/core/interfaces/ConfigEntityProps.md) |
| `newData` | `Partial`<[`ConfigEntityProps`](/auto-docs/core/interfaces/ConfigEntityProps.md)> |

#### Returns

`boolean`

#### Inherited from

[ConfigEntity](/auto-docs/core/classes/ConfigEntity.md).[checkChanged](/auto-docs/core/classes/ConfigEntity.md#checkchanged)

***

### dispose

**dispose**(): `void`

销毁实体

#### Returns

`void`

#### Inherited from

[ConfigEntity](/auto-docs/core/classes/ConfigEntity.md).[dispose](/auto-docs/core/classes/ConfigEntity.md#dispose)

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

[ConfigEntity](/auto-docs/core/classes/ConfigEntity.md).[fromJSON](/auto-docs/core/classes/ConfigEntity.md#fromjson)

***

### getCurrentState

**getCurrentState**(): `undefined` | [`EditorState`](/auto-docs/core/interfaces/EditorState-1.md)

#### Returns

`undefined` | [`EditorState`](/auto-docs/core/interfaces/EditorState-1.md)

***

### getData

**getData**<`D`>(`Registry`): `D`

获取 data 数据

#### Type parameters

| Name | Type |
| :------ | :------ |
| `D` | extends [`EntityData`](/auto-docs/core/classes/EntityData.md)<`any`, {}, `D`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `Registry` | [`EntityDataRegistry`](/auto-docs/core/interfaces/EntityDataRegistry.md)<`D`> |

#### Returns

`D`

#### Inherited from

[ConfigEntity](/auto-docs/core/classes/ConfigEntity.md).[getData](/auto-docs/core/classes/ConfigEntity.md#getdata)

***

### getDefaultConfig

**getDefaultConfig**(): [`ConfigEntityProps`](/auto-docs/core/interfaces/ConfigEntityProps.md)

#### Returns

[`ConfigEntityProps`](/auto-docs/core/interfaces/ConfigEntityProps.md)

#### Inherited from

[ConfigEntity](/auto-docs/core/classes/ConfigEntity.md).[getDefaultConfig](/auto-docs/core/classes/ConfigEntity.md#getdefaultconfig)

***

### getDefaultDataRegistries

**getDefaultDataRegistries**(): [`EntityDataRegistry`](/auto-docs/core/interfaces/EntityDataRegistry.md)<[`EntityData`](/auto-docs/core/classes/EntityData.md)<`any`, {}>>\[]

默认初始化的 Data

#### Returns

[`EntityDataRegistry`](/auto-docs/core/interfaces/EntityDataRegistry.md)<[`EntityData`](/auto-docs/core/classes/EntityData.md)<`any`, {}>>\[]

#### Inherited from

[ConfigEntity](/auto-docs/core/classes/ConfigEntity.md).[getDefaultDataRegistries](/auto-docs/core/classes/ConfigEntity.md#getdefaultdataregistries)

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

[ConfigEntity](/auto-docs/core/classes/ConfigEntity.md).[getService](/auto-docs/core/classes/ConfigEntity.md#getservice)

***

### getStateFromShortcut

**getStateFromShortcut**(`e`): `undefined` | [`EditorState`](/auto-docs/core/interfaces/EditorState-1.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `KeyboardEvent` |

#### Returns

`undefined` | [`EditorState`](/auto-docs/core/interfaces/EditorState-1.md)

***

### getStates

**getStates**(): [`EditorState`](/auto-docs/core/interfaces/EditorState-1.md)\[]

#### Returns

[`EditorState`](/auto-docs/core/interfaces/EditorState-1.md)\[]

***

### hasData

**hasData**(`Registry`): `boolean`

是否有指定数据

#### Parameters

| Name | Type |
| :------ | :------ |
| `Registry` | [`EntityDataRegistry`](/auto-docs/core/interfaces/EntityDataRegistry.md)<[`EntityData`](/auto-docs/core/classes/EntityData.md)<`any`, {}>> |

#### Returns

`boolean`

#### Inherited from

[ConfigEntity](/auto-docs/core/classes/ConfigEntity.md).[hasData](/auto-docs/core/classes/ConfigEntity.md#hasdata)

***

### is

**is**(`stateId`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `stateId` | `string` |

#### Returns

`boolean`

***

### isMouseFriendlyMode

**isMouseFriendlyMode**(): `boolean`

是否为鼠标友好模式

#### Returns

`boolean`

***

### onCancel

**onCancel**(`stateId`, `fn`): `Disposable`

取消指定状态后触发

#### Parameters

| Name | Type |
| :------ | :------ |
| `stateId` | `string` |
| `fn` | () => `void` |

#### Returns

`Disposable`

***

### onConfigChanged

**onConfigChanged**(`fn`): `Disposable`

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | (`data`: [`ConfigEntityProps`](/auto-docs/core/interfaces/ConfigEntityProps.md)) => `void` |

#### Returns

`Disposable`

#### Inherited from

[ConfigEntity](/auto-docs/core/classes/ConfigEntity.md).[onConfigChanged](/auto-docs/core/classes/ConfigEntity.md#onconfigchanged)

***

### registerState

**registerState**(`state`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`EditorState`](/auto-docs/core/interfaces/EditorState-1.md) |

#### Returns

`void`

***

### removeData

**removeData**<`D`>(`Registry`): `void`

删除数据，初始化状态注入的数据无法被删除

#### Type parameters

| Name | Type |
| :------ | :------ |
| `D` | extends [`EntityData`](/auto-docs/core/classes/EntityData.md)<`any`, {}, `D`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `Registry` | [`EntityDataRegistry`](/auto-docs/core/interfaces/EntityDataRegistry.md)<`D`> |

#### Returns

`void`

#### Inherited from

[ConfigEntity](/auto-docs/core/classes/ConfigEntity.md).[removeData](/auto-docs/core/classes/ConfigEntity.md#removedata)

***

### reset

**reset**(): `void`

重制为初始化状态

#### Returns

`void`

#### Inherited from

[ConfigEntity](/auto-docs/core/classes/ConfigEntity.md).[reset](/auto-docs/core/classes/ConfigEntity.md#reset)

***

### toDefaultState

**toDefaultState**(): `void`

#### Returns

`void`

***

### toJSON

**toJSON**(): `any`

存储数据，用于持久化存储

#### Returns

`any`

#### Inherited from

[ConfigEntity](/auto-docs/core/classes/ConfigEntity.md).[toJSON](/auto-docs/core/classes/ConfigEntity.md#tojson)

***

### updateConfig

**updateConfig**(`props`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `Partial`<[`ConfigEntityProps`](/auto-docs/core/interfaces/ConfigEntityProps.md)> |

#### Returns

`void`

#### Inherited from

[ConfigEntity](/auto-docs/core/classes/ConfigEntity.md).[updateConfig](/auto-docs/core/classes/ConfigEntity.md#updateconfig)

***

### updateData

**updateData**<`D`>(`Registry`, `props`): `void`

更新实体的数据

#### Type parameters

| Name | Type |
| :------ | :------ |
| `D` | extends [`EntityData`](/auto-docs/core/classes/EntityData.md)<`any`, {}, `D`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `Registry` | [`EntityDataRegistry`](/auto-docs/core/interfaces/EntityDataRegistry.md)<`D`> |
| `props` | [`EntityDataProps`](/auto-docs/core/types/EntityDataProps.md)<`D`> |

#### Returns

`void`

#### Inherited from

[ConfigEntity](/auto-docs/core/classes/ConfigEntity.md).[updateData](/auto-docs/core/classes/ConfigEntity.md#updatedata)
