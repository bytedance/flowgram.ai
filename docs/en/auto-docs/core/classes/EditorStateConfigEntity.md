# Class: EditorStateConfigEntity

编辑状态管理

## Hierarchy

* [`ConfigEntity`](/en/auto-docs/core/classes/ConfigEntity.md)

  ↳ **`EditorStateConfigEntity`**

## Table of contents

### Constructors

* [constructor](/en/auto-docs/core/classes/EditorStateConfigEntity.md#constructor)

### Properties

* [\_\_opts\_type\_\_](/en/auto-docs/core/classes/EditorStateConfigEntity.md#__opts_type__)
* [entityManager](/en/auto-docs/core/classes/EditorStateConfigEntity.md#entitymanager)
* [onDataChange](/en/auto-docs/core/classes/EditorStateConfigEntity.md#ondatachange)
* [onEntityChange](/en/auto-docs/core/classes/EditorStateConfigEntity.md#onentitychange)
* [onStateChange](/en/auto-docs/core/classes/EditorStateConfigEntity.md#onstatechange)
* [preDispose](/en/auto-docs/core/classes/EditorStateConfigEntity.md#predispose)
* [toDispose](/en/auto-docs/core/classes/EditorStateConfigEntity.md#todispose)
* [type](/en/auto-docs/core/classes/EditorStateConfigEntity.md#type)

### Accessors

* [config](/en/auto-docs/core/classes/EditorStateConfigEntity.md#config)
* [context](/en/auto-docs/core/classes/EditorStateConfigEntity.md#context)
* [disposed](/en/auto-docs/core/classes/EditorStateConfigEntity.md#disposed)
* [id](/en/auto-docs/core/classes/EditorStateConfigEntity.md#id)
* [isPressingShift](/en/auto-docs/core/classes/EditorStateConfigEntity.md#ispressingshift)
* [isPressingSpaceBar](/en/auto-docs/core/classes/EditorStateConfigEntity.md#ispressingspacebar)
* [onDispose](/en/auto-docs/core/classes/EditorStateConfigEntity.md#ondispose)
* [savedInManager](/en/auto-docs/core/classes/EditorStateConfigEntity.md#savedinmanager)
* [type](/en/auto-docs/core/classes/EditorStateConfigEntity.md#type-1)
* [version](/en/auto-docs/core/classes/EditorStateConfigEntity.md#version)

### Methods

* [addData](/en/auto-docs/core/classes/EditorStateConfigEntity.md#adddata)
* [addInitializeData](/en/auto-docs/core/classes/EditorStateConfigEntity.md#addinitializedata)
* [changeState](/en/auto-docs/core/classes/EditorStateConfigEntity.md#changestate)
* [checkChanged](/en/auto-docs/core/classes/EditorStateConfigEntity.md#checkchanged)
* [dispose](/en/auto-docs/core/classes/EditorStateConfigEntity.md#dispose)
* [fromJSON](/en/auto-docs/core/classes/EditorStateConfigEntity.md#fromjson)
* [getCurrentState](/en/auto-docs/core/classes/EditorStateConfigEntity.md#getcurrentstate)
* [getData](/en/auto-docs/core/classes/EditorStateConfigEntity.md#getdata)
* [getDefaultConfig](/en/auto-docs/core/classes/EditorStateConfigEntity.md#getdefaultconfig)
* [getDefaultDataRegistries](/en/auto-docs/core/classes/EditorStateConfigEntity.md#getdefaultdataregistries)
* [getService](/en/auto-docs/core/classes/EditorStateConfigEntity.md#getservice)
* [getStateFromShortcut](/en/auto-docs/core/classes/EditorStateConfigEntity.md#getstatefromshortcut)
* [getStates](/en/auto-docs/core/classes/EditorStateConfigEntity.md#getstates)
* [hasData](/en/auto-docs/core/classes/EditorStateConfigEntity.md#hasdata)
* [is](/en/auto-docs/core/classes/EditorStateConfigEntity.md#is)
* [isMouseFriendlyMode](/en/auto-docs/core/classes/EditorStateConfigEntity.md#ismousefriendlymode)
* [onCancel](/en/auto-docs/core/classes/EditorStateConfigEntity.md#oncancel)
* [onConfigChanged](/en/auto-docs/core/classes/EditorStateConfigEntity.md#onconfigchanged)
* [registerState](/en/auto-docs/core/classes/EditorStateConfigEntity.md#registerstate)
* [removeData](/en/auto-docs/core/classes/EditorStateConfigEntity.md#removedata)
* [reset](/en/auto-docs/core/classes/EditorStateConfigEntity.md#reset)
* [toDefaultState](/en/auto-docs/core/classes/EditorStateConfigEntity.md#todefaultstate)
* [toJSON](/en/auto-docs/core/classes/EditorStateConfigEntity.md#tojson)
* [updateConfig](/en/auto-docs/core/classes/EditorStateConfigEntity.md#updateconfig)
* [updateData](/en/auto-docs/core/classes/EditorStateConfigEntity.md#updatedata)

## Constructors

### constructor

**new EditorStateConfigEntity**(`opts`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | [`EntityOpts`](/en/auto-docs/core/interfaces/EntityOpts.md) |

#### Overrides

[ConfigEntity](/en/auto-docs/core/classes/ConfigEntity.md).[constructor](/en/auto-docs/core/classes/ConfigEntity.md#constructor)

## Properties

### \_\_opts\_type\_\_

**\_\_opts\_type\_\_**: [`EntityOpts`](/en/auto-docs/core/interfaces/EntityOpts.md)

#### Inherited from

[ConfigEntity](/en/auto-docs/core/classes/ConfigEntity.md).[**opts\_type**](/en/auto-docs/core/classes/ConfigEntity.md#__opts_type__)

***

### entityManager

`Readonly` **entityManager**: [`EntityManager`](/en/auto-docs/core/classes/EntityManager.md)

全局的entity管理器

#### Inherited from

[ConfigEntity](/en/auto-docs/core/classes/ConfigEntity.md).[entityManager](/en/auto-docs/core/classes/ConfigEntity.md#entitymanager)

***

### onDataChange

`Readonly` **onDataChange**: `Event`<[`EntityDataChangedEvent`](/en/auto-docs/core/interfaces/EntityDataChangedEvent.md)<[`Entity`](/en/auto-docs/core/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/core/interfaces/EntityOpts.md)>>>

数据更改事件

#### Inherited from

[ConfigEntity](/en/auto-docs/core/classes/ConfigEntity.md).[onDataChange](/en/auto-docs/core/classes/ConfigEntity.md#ondatachange)

***

### onEntityChange

`Readonly` **onEntityChange**: `Event`<[`Entity`](/en/auto-docs/core/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/core/interfaces/EntityOpts.md)>>

修改会触发

#### Inherited from

[ConfigEntity](/en/auto-docs/core/classes/ConfigEntity.md).[onEntityChange](/en/auto-docs/core/classes/ConfigEntity.md#onentitychange)

***

### onStateChange

`Readonly` **onStateChange**: `Event`<[`EditorStateChangeEvent`](/en/auto-docs/core/interfaces/EditorStateChangeEvent.md)>

***

### preDispose

`Readonly` **preDispose**: `DisposableCollection`

销毁前事件管理

#### Inherited from

[ConfigEntity](/en/auto-docs/core/classes/ConfigEntity.md).[preDispose](/en/auto-docs/core/classes/ConfigEntity.md#predispose)

***

### toDispose

`Readonly` **toDispose**: `DisposableCollection`

销毁事件管理

#### Inherited from

[ConfigEntity](/en/auto-docs/core/classes/ConfigEntity.md).[toDispose](/en/auto-docs/core/classes/ConfigEntity.md#todispose)

***

### type

`Static` **type**: `string` = `'EditorStateConfigEntity'`

#### Overrides

[ConfigEntity](/en/auto-docs/core/classes/ConfigEntity.md).[type](/en/auto-docs/core/classes/ConfigEntity.md#type)

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
| `D` | extends [`EntityData`](/en/auto-docs/core/classes/EntityData.md)<`any`, {}, `D`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `Registry` | [`EntityDataRegistry`](/en/auto-docs/core/interfaces/EntityDataRegistry.md)<[`EntityData`](/en/auto-docs/core/classes/EntityData.md)<`any`, {}>> |
| `defaultProps?` | [`EntityDataProps`](/en/auto-docs/core/types/EntityDataProps.md)<`D`> |

#### Returns

`D`

#### Inherited from

[ConfigEntity](/en/auto-docs/core/classes/ConfigEntity.md).[addData](/en/auto-docs/core/classes/ConfigEntity.md#adddata)

***

### addInitializeData

**addInitializeData**(`datas`, `dataConfig?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `datas` | [`EntityDataRegistry`](/en/auto-docs/core/interfaces/EntityDataRegistry.md)<[`EntityData`](/en/auto-docs/core/classes/EntityData.md)<`any`, {}>>\[] |
| `dataConfig?` | `any` |

#### Returns

`void`

#### Inherited from

[ConfigEntity](/en/auto-docs/core/classes/ConfigEntity.md).[addInitializeData](/en/auto-docs/core/classes/ConfigEntity.md#addinitializedata)

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
| `oldData` | [`ConfigEntityProps`](/en/auto-docs/core/interfaces/ConfigEntityProps.md) |
| `newData` | `Partial`<[`ConfigEntityProps`](/en/auto-docs/core/interfaces/ConfigEntityProps.md)> |

#### Returns

`boolean`

#### Inherited from

[ConfigEntity](/en/auto-docs/core/classes/ConfigEntity.md).[checkChanged](/en/auto-docs/core/classes/ConfigEntity.md#checkchanged)

***

### dispose

**dispose**(): `void`

销毁实体

#### Returns

`void`

#### Inherited from

[ConfigEntity](/en/auto-docs/core/classes/ConfigEntity.md).[dispose](/en/auto-docs/core/classes/ConfigEntity.md#dispose)

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

[ConfigEntity](/en/auto-docs/core/classes/ConfigEntity.md).[fromJSON](/en/auto-docs/core/classes/ConfigEntity.md#fromjson)

***

### getCurrentState

**getCurrentState**(): `undefined` | [`EditorState`](/en/auto-docs/core/interfaces/EditorState-1.md)

#### Returns

`undefined` | [`EditorState`](/en/auto-docs/core/interfaces/EditorState-1.md)

***

### getData

**getData**<`D`>(`Registry`): `D`

获取 data 数据

#### Type parameters

| Name | Type |
| :------ | :------ |
| `D` | extends [`EntityData`](/en/auto-docs/core/classes/EntityData.md)<`any`, {}, `D`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `Registry` | [`EntityDataRegistry`](/en/auto-docs/core/interfaces/EntityDataRegistry.md)<`D`> |

#### Returns

`D`

#### Inherited from

[ConfigEntity](/en/auto-docs/core/classes/ConfigEntity.md).[getData](/en/auto-docs/core/classes/ConfigEntity.md#getdata)

***

### getDefaultConfig

**getDefaultConfig**(): [`ConfigEntityProps`](/en/auto-docs/core/interfaces/ConfigEntityProps.md)

#### Returns

[`ConfigEntityProps`](/en/auto-docs/core/interfaces/ConfigEntityProps.md)

#### Inherited from

[ConfigEntity](/en/auto-docs/core/classes/ConfigEntity.md).[getDefaultConfig](/en/auto-docs/core/classes/ConfigEntity.md#getdefaultconfig)

***

### getDefaultDataRegistries

**getDefaultDataRegistries**(): [`EntityDataRegistry`](/en/auto-docs/core/interfaces/EntityDataRegistry.md)<[`EntityData`](/en/auto-docs/core/classes/EntityData.md)<`any`, {}>>\[]

默认初始化的 Data

#### Returns

[`EntityDataRegistry`](/en/auto-docs/core/interfaces/EntityDataRegistry.md)<[`EntityData`](/en/auto-docs/core/classes/EntityData.md)<`any`, {}>>\[]

#### Inherited from

[ConfigEntity](/en/auto-docs/core/classes/ConfigEntity.md).[getDefaultDataRegistries](/en/auto-docs/core/classes/ConfigEntity.md#getdefaultdataregistries)

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

[ConfigEntity](/en/auto-docs/core/classes/ConfigEntity.md).[getService](/en/auto-docs/core/classes/ConfigEntity.md#getservice)

***

### getStateFromShortcut

**getStateFromShortcut**(`e`): `undefined` | [`EditorState`](/en/auto-docs/core/interfaces/EditorState-1.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `KeyboardEvent` |

#### Returns

`undefined` | [`EditorState`](/en/auto-docs/core/interfaces/EditorState-1.md)

***

### getStates

**getStates**(): [`EditorState`](/en/auto-docs/core/interfaces/EditorState-1.md)\[]

#### Returns

[`EditorState`](/en/auto-docs/core/interfaces/EditorState-1.md)\[]

***

### hasData

**hasData**(`Registry`): `boolean`

是否有指定数据

#### Parameters

| Name | Type |
| :------ | :------ |
| `Registry` | [`EntityDataRegistry`](/en/auto-docs/core/interfaces/EntityDataRegistry.md)<[`EntityData`](/en/auto-docs/core/classes/EntityData.md)<`any`, {}>> |

#### Returns

`boolean`

#### Inherited from

[ConfigEntity](/en/auto-docs/core/classes/ConfigEntity.md).[hasData](/en/auto-docs/core/classes/ConfigEntity.md#hasdata)

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
| `fn` | (`data`: [`ConfigEntityProps`](/en/auto-docs/core/interfaces/ConfigEntityProps.md)) => `void` |

#### Returns

`Disposable`

#### Inherited from

[ConfigEntity](/en/auto-docs/core/classes/ConfigEntity.md).[onConfigChanged](/en/auto-docs/core/classes/ConfigEntity.md#onconfigchanged)

***

### registerState

**registerState**(`state`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`EditorState`](/en/auto-docs/core/interfaces/EditorState-1.md) |

#### Returns

`void`

***

### removeData

**removeData**<`D`>(`Registry`): `void`

删除数据，初始化状态注入的数据无法被删除

#### Type parameters

| Name | Type |
| :------ | :------ |
| `D` | extends [`EntityData`](/en/auto-docs/core/classes/EntityData.md)<`any`, {}, `D`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `Registry` | [`EntityDataRegistry`](/en/auto-docs/core/interfaces/EntityDataRegistry.md)<`D`> |

#### Returns

`void`

#### Inherited from

[ConfigEntity](/en/auto-docs/core/classes/ConfigEntity.md).[removeData](/en/auto-docs/core/classes/ConfigEntity.md#removedata)

***

### reset

**reset**(): `void`

重制为初始化状态

#### Returns

`void`

#### Inherited from

[ConfigEntity](/en/auto-docs/core/classes/ConfigEntity.md).[reset](/en/auto-docs/core/classes/ConfigEntity.md#reset)

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

[ConfigEntity](/en/auto-docs/core/classes/ConfigEntity.md).[toJSON](/en/auto-docs/core/classes/ConfigEntity.md#tojson)

***

### updateConfig

**updateConfig**(`props`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `Partial`<[`ConfigEntityProps`](/en/auto-docs/core/interfaces/ConfigEntityProps.md)> |

#### Returns

`void`

#### Inherited from

[ConfigEntity](/en/auto-docs/core/classes/ConfigEntity.md).[updateConfig](/en/auto-docs/core/classes/ConfigEntity.md#updateconfig)

***

### updateData

**updateData**<`D`>(`Registry`, `props`): `void`

更新实体的数据

#### Type parameters

| Name | Type |
| :------ | :------ |
| `D` | extends [`EntityData`](/en/auto-docs/core/classes/EntityData.md)<`any`, {}, `D`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `Registry` | [`EntityDataRegistry`](/en/auto-docs/core/interfaces/EntityDataRegistry.md)<`D`> |
| `props` | [`EntityDataProps`](/en/auto-docs/core/types/EntityDataProps.md)<`D`> |

#### Returns

`void`

#### Inherited from

[ConfigEntity](/en/auto-docs/core/classes/ConfigEntity.md).[updateData](/en/auto-docs/core/classes/ConfigEntity.md#updatedata)
