# Class: EditorStateConfigEntity

编辑状态管理

## Hierarchy

* [`ConfigEntity`](/auto-docs/free-layout-editor/classes/ConfigEntity.md)

  ↳ **`EditorStateConfigEntity`**

## Table of contents

### Constructors

* [constructor](/auto-docs/free-layout-editor/classes/EditorStateConfigEntity.md#constructor)

### Properties

* [\_\_opts\_type\_\_](/auto-docs/free-layout-editor/classes/EditorStateConfigEntity.md#__opts_type__)
* [entityManager](/auto-docs/free-layout-editor/classes/EditorStateConfigEntity.md#entitymanager)
* [onDataChange](/auto-docs/free-layout-editor/classes/EditorStateConfigEntity.md#ondatachange)
* [onEntityChange](/auto-docs/free-layout-editor/classes/EditorStateConfigEntity.md#onentitychange)
* [onStateChange](/auto-docs/free-layout-editor/classes/EditorStateConfigEntity.md#onstatechange)
* [preDispose](/auto-docs/free-layout-editor/classes/EditorStateConfigEntity.md#predispose)
* [toDispose](/auto-docs/free-layout-editor/classes/EditorStateConfigEntity.md#todispose)
* [type](/auto-docs/free-layout-editor/classes/EditorStateConfigEntity.md#type)

### Accessors

* [config](/auto-docs/free-layout-editor/classes/EditorStateConfigEntity.md#config)
* [context](/auto-docs/free-layout-editor/classes/EditorStateConfigEntity.md#context)
* [disposed](/auto-docs/free-layout-editor/classes/EditorStateConfigEntity.md#disposed)
* [id](/auto-docs/free-layout-editor/classes/EditorStateConfigEntity.md#id)
* [isPressingShift](/auto-docs/free-layout-editor/classes/EditorStateConfigEntity.md#ispressingshift)
* [isPressingSpaceBar](/auto-docs/free-layout-editor/classes/EditorStateConfigEntity.md#ispressingspacebar)
* [onDispose](/auto-docs/free-layout-editor/classes/EditorStateConfigEntity.md#ondispose)
* [savedInManager](/auto-docs/free-layout-editor/classes/EditorStateConfigEntity.md#savedinmanager)
* [type](/auto-docs/free-layout-editor/classes/EditorStateConfigEntity.md#type-1)
* [version](/auto-docs/free-layout-editor/classes/EditorStateConfigEntity.md#version)

### Methods

* [addData](/auto-docs/free-layout-editor/classes/EditorStateConfigEntity.md#adddata)
* [addInitializeData](/auto-docs/free-layout-editor/classes/EditorStateConfigEntity.md#addinitializedata)
* [changeState](/auto-docs/free-layout-editor/classes/EditorStateConfigEntity.md#changestate)
* [checkChanged](/auto-docs/free-layout-editor/classes/EditorStateConfigEntity.md#checkchanged)
* [dispose](/auto-docs/free-layout-editor/classes/EditorStateConfigEntity.md#dispose)
* [fromJSON](/auto-docs/free-layout-editor/classes/EditorStateConfigEntity.md#fromjson)
* [getCurrentState](/auto-docs/free-layout-editor/classes/EditorStateConfigEntity.md#getcurrentstate)
* [getData](/auto-docs/free-layout-editor/classes/EditorStateConfigEntity.md#getdata)
* [getDefaultConfig](/auto-docs/free-layout-editor/classes/EditorStateConfigEntity.md#getdefaultconfig)
* [getDefaultDataRegistries](/auto-docs/free-layout-editor/classes/EditorStateConfigEntity.md#getdefaultdataregistries)
* [getService](/auto-docs/free-layout-editor/classes/EditorStateConfigEntity.md#getservice)
* [getStateFromShortcut](/auto-docs/free-layout-editor/classes/EditorStateConfigEntity.md#getstatefromshortcut)
* [getStates](/auto-docs/free-layout-editor/classes/EditorStateConfigEntity.md#getstates)
* [hasData](/auto-docs/free-layout-editor/classes/EditorStateConfigEntity.md#hasdata)
* [is](/auto-docs/free-layout-editor/classes/EditorStateConfigEntity.md#is)
* [isMouseFriendlyMode](/auto-docs/free-layout-editor/classes/EditorStateConfigEntity.md#ismousefriendlymode)
* [onCancel](/auto-docs/free-layout-editor/classes/EditorStateConfigEntity.md#oncancel)
* [onConfigChanged](/auto-docs/free-layout-editor/classes/EditorStateConfigEntity.md#onconfigchanged)
* [registerState](/auto-docs/free-layout-editor/classes/EditorStateConfigEntity.md#registerstate)
* [removeData](/auto-docs/free-layout-editor/classes/EditorStateConfigEntity.md#removedata)
* [reset](/auto-docs/free-layout-editor/classes/EditorStateConfigEntity.md#reset)
* [toDefaultState](/auto-docs/free-layout-editor/classes/EditorStateConfigEntity.md#todefaultstate)
* [toJSON](/auto-docs/free-layout-editor/classes/EditorStateConfigEntity.md#tojson)
* [updateConfig](/auto-docs/free-layout-editor/classes/EditorStateConfigEntity.md#updateconfig)
* [updateData](/auto-docs/free-layout-editor/classes/EditorStateConfigEntity.md#updatedata)

## Constructors

### constructor

**new EditorStateConfigEntity**(`opts`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | [`EntityOpts`](/auto-docs/free-layout-editor/interfaces/EntityOpts.md) |

#### Overrides

[ConfigEntity](/auto-docs/free-layout-editor/classes/ConfigEntity.md).[constructor](/auto-docs/free-layout-editor/classes/ConfigEntity.md#constructor)

## Properties

### \_\_opts\_type\_\_

**\_\_opts\_type\_\_**: [`EntityOpts`](/auto-docs/free-layout-editor/interfaces/EntityOpts.md)

#### Inherited from

[ConfigEntity](/auto-docs/free-layout-editor/classes/ConfigEntity.md).[**opts\_type**](/auto-docs/free-layout-editor/classes/ConfigEntity.md#__opts_type__)

***

### entityManager

`Readonly` **entityManager**: [`EntityManager`](/auto-docs/free-layout-editor/classes/EntityManager.md)

全局的entity管理器

#### Inherited from

[ConfigEntity](/auto-docs/free-layout-editor/classes/ConfigEntity.md).[entityManager](/auto-docs/free-layout-editor/classes/ConfigEntity.md#entitymanager)

***

### onDataChange

`Readonly` **onDataChange**: [`Event`](/auto-docs/free-layout-editor/interfaces/Event-1.md)<[`EntityDataChangedEvent`](/auto-docs/free-layout-editor/interfaces/EntityDataChangedEvent.md)<[`Entity`](/auto-docs/free-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/free-layout-editor/interfaces/EntityOpts.md)>>>

数据更改事件

#### Inherited from

[ConfigEntity](/auto-docs/free-layout-editor/classes/ConfigEntity.md).[onDataChange](/auto-docs/free-layout-editor/classes/ConfigEntity.md#ondatachange)

***

### onEntityChange

`Readonly` **onEntityChange**: [`Event`](/auto-docs/free-layout-editor/interfaces/Event-1.md)<[`Entity`](/auto-docs/free-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/free-layout-editor/interfaces/EntityOpts.md)>>

修改会触发

#### Inherited from

[ConfigEntity](/auto-docs/free-layout-editor/classes/ConfigEntity.md).[onEntityChange](/auto-docs/free-layout-editor/classes/ConfigEntity.md#onentitychange)

***

### onStateChange

`Readonly` **onStateChange**: [`Event`](/auto-docs/free-layout-editor/interfaces/Event-1.md)<[`EditorStateChangeEvent`](/auto-docs/free-layout-editor/interfaces/EditorStateChangeEvent.md)>

***

### preDispose

`Readonly` **preDispose**: [`DisposableCollection`](/auto-docs/free-layout-editor/classes/DisposableCollection.md)

销毁前事件管理

#### Inherited from

[ConfigEntity](/auto-docs/free-layout-editor/classes/ConfigEntity.md).[preDispose](/auto-docs/free-layout-editor/classes/ConfigEntity.md#predispose)

***

### toDispose

`Readonly` **toDispose**: [`DisposableCollection`](/auto-docs/free-layout-editor/classes/DisposableCollection.md)

销毁事件管理

#### Inherited from

[ConfigEntity](/auto-docs/free-layout-editor/classes/ConfigEntity.md).[toDispose](/auto-docs/free-layout-editor/classes/ConfigEntity.md#todispose)

***

### type

`Static` **type**: `string`

#### Overrides

[ConfigEntity](/auto-docs/free-layout-editor/classes/ConfigEntity.md).[type](/auto-docs/free-layout-editor/classes/ConfigEntity.md#type)

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

`get` **onDispose**(): [`Event`](/auto-docs/free-layout-editor/interfaces/Event-1.md)<`void`>

销毁事件

#### Returns

[`Event`](/auto-docs/free-layout-editor/interfaces/Event-1.md)<`void`>

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
| `D` | extends [`EntityData`](/auto-docs/free-layout-editor/classes/EntityData.md)<`any`, {}, `D`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `Registry` | [`EntityDataRegistry`](/auto-docs/free-layout-editor/interfaces/EntityDataRegistry.md)<[`EntityData`](/auto-docs/free-layout-editor/classes/EntityData.md)<`any`, {}>> |
| `defaultProps?` | [`EntityDataProps`](/auto-docs/free-layout-editor/types/EntityDataProps.md)<`D`> |

#### Returns

`D`

#### Inherited from

[ConfigEntity](/auto-docs/free-layout-editor/classes/ConfigEntity.md).[addData](/auto-docs/free-layout-editor/classes/ConfigEntity.md#adddata)

***

### addInitializeData

**addInitializeData**(`datas`, `dataConfig?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `datas` | [`EntityDataRegistry`](/auto-docs/free-layout-editor/interfaces/EntityDataRegistry.md)<[`EntityData`](/auto-docs/free-layout-editor/classes/EntityData.md)<`any`, {}>>\[] |
| `dataConfig?` | `any` |

#### Returns

`void`

#### Inherited from

[ConfigEntity](/auto-docs/free-layout-editor/classes/ConfigEntity.md).[addInitializeData](/auto-docs/free-layout-editor/classes/ConfigEntity.md#addinitializedata)

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
| `oldData` | [`ConfigEntityProps`](/auto-docs/free-layout-editor/interfaces/ConfigEntityProps.md) |
| `newData` | `Partial`<[`ConfigEntityProps`](/auto-docs/free-layout-editor/interfaces/ConfigEntityProps.md)> |

#### Returns

`boolean`

#### Inherited from

[ConfigEntity](/auto-docs/free-layout-editor/classes/ConfigEntity.md).[checkChanged](/auto-docs/free-layout-editor/classes/ConfigEntity.md#checkchanged)

***

### dispose

**dispose**(): `void`

销毁实体

#### Returns

`void`

#### Inherited from

[ConfigEntity](/auto-docs/free-layout-editor/classes/ConfigEntity.md).[dispose](/auto-docs/free-layout-editor/classes/ConfigEntity.md#dispose)

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

[ConfigEntity](/auto-docs/free-layout-editor/classes/ConfigEntity.md).[fromJSON](/auto-docs/free-layout-editor/classes/ConfigEntity.md#fromjson)

***

### getCurrentState

**getCurrentState**(): `undefined` | [`EditorState`](/auto-docs/free-layout-editor/interfaces/EditorState-1.md)

#### Returns

`undefined` | [`EditorState`](/auto-docs/free-layout-editor/interfaces/EditorState-1.md)

***

### getData

**getData**<`D`>(`Registry`): `D`

获取 data 数据

#### Type parameters

| Name | Type |
| :------ | :------ |
| `D` | extends [`EntityData`](/auto-docs/free-layout-editor/classes/EntityData.md)<`any`, {}, `D`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `Registry` | [`EntityDataRegistry`](/auto-docs/free-layout-editor/interfaces/EntityDataRegistry.md)<`D`> |

#### Returns

`D`

#### Inherited from

[ConfigEntity](/auto-docs/free-layout-editor/classes/ConfigEntity.md).[getData](/auto-docs/free-layout-editor/classes/ConfigEntity.md#getdata)

***

### getDefaultConfig

**getDefaultConfig**(): [`ConfigEntityProps`](/auto-docs/free-layout-editor/interfaces/ConfigEntityProps.md)

#### Returns

[`ConfigEntityProps`](/auto-docs/free-layout-editor/interfaces/ConfigEntityProps.md)

#### Inherited from

[ConfigEntity](/auto-docs/free-layout-editor/classes/ConfigEntity.md).[getDefaultConfig](/auto-docs/free-layout-editor/classes/ConfigEntity.md#getdefaultconfig)

***

### getDefaultDataRegistries

**getDefaultDataRegistries**(): [`EntityDataRegistry`](/auto-docs/free-layout-editor/interfaces/EntityDataRegistry.md)<[`EntityData`](/auto-docs/free-layout-editor/classes/EntityData.md)<`any`, {}>>\[]

默认初始化的 Data

#### Returns

[`EntityDataRegistry`](/auto-docs/free-layout-editor/interfaces/EntityDataRegistry.md)<[`EntityData`](/auto-docs/free-layout-editor/classes/EntityData.md)<`any`, {}>>\[]

#### Inherited from

[ConfigEntity](/auto-docs/free-layout-editor/classes/ConfigEntity.md).[getDefaultDataRegistries](/auto-docs/free-layout-editor/classes/ConfigEntity.md#getdefaultdataregistries)

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
| `identifier` | [`ServiceIdentifier`](/auto-docs/free-layout-editor/types/interfaces.ServiceIdentifier.md)<`T`> |

#### Returns

`T`

#### Inherited from

[ConfigEntity](/auto-docs/free-layout-editor/classes/ConfigEntity.md).[getService](/auto-docs/free-layout-editor/classes/ConfigEntity.md#getservice)

***

### getStateFromShortcut

**getStateFromShortcut**(`e`): `undefined` | [`EditorState`](/auto-docs/free-layout-editor/interfaces/EditorState-1.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `KeyboardEvent` |

#### Returns

`undefined` | [`EditorState`](/auto-docs/free-layout-editor/interfaces/EditorState-1.md)

***

### getStates

**getStates**(): [`EditorState`](/auto-docs/free-layout-editor/interfaces/EditorState-1.md)\[]

#### Returns

[`EditorState`](/auto-docs/free-layout-editor/interfaces/EditorState-1.md)\[]

***

### hasData

**hasData**(`Registry`): `boolean`

是否有指定数据

#### Parameters

| Name | Type |
| :------ | :------ |
| `Registry` | [`EntityDataRegistry`](/auto-docs/free-layout-editor/interfaces/EntityDataRegistry.md)<[`EntityData`](/auto-docs/free-layout-editor/classes/EntityData.md)<`any`, {}>> |

#### Returns

`boolean`

#### Inherited from

[ConfigEntity](/auto-docs/free-layout-editor/classes/ConfigEntity.md).[hasData](/auto-docs/free-layout-editor/classes/ConfigEntity.md#hasdata)

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

**onCancel**(`stateId`, `fn`): [`Disposable`](/auto-docs/free-layout-editor/interfaces/Disposable-1.md)

取消指定状态后触发

#### Parameters

| Name | Type |
| :------ | :------ |
| `stateId` | `string` |
| `fn` | () => `void` |

#### Returns

[`Disposable`](/auto-docs/free-layout-editor/interfaces/Disposable-1.md)

***

### onConfigChanged

**onConfigChanged**(`fn`): [`Disposable`](/auto-docs/free-layout-editor/interfaces/Disposable-1.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | (`data`: [`ConfigEntityProps`](/auto-docs/free-layout-editor/interfaces/ConfigEntityProps.md)) => `void` |

#### Returns

[`Disposable`](/auto-docs/free-layout-editor/interfaces/Disposable-1.md)

#### Inherited from

[ConfigEntity](/auto-docs/free-layout-editor/classes/ConfigEntity.md).[onConfigChanged](/auto-docs/free-layout-editor/classes/ConfigEntity.md#onconfigchanged)

***

### registerState

**registerState**(`state`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`EditorState`](/auto-docs/free-layout-editor/interfaces/EditorState-1.md) |

#### Returns

`void`

***

### removeData

**removeData**<`D`>(`Registry`): `void`

删除数据，初始化状态注入的数据无法被删除

#### Type parameters

| Name | Type |
| :------ | :------ |
| `D` | extends [`EntityData`](/auto-docs/free-layout-editor/classes/EntityData.md)<`any`, {}, `D`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `Registry` | [`EntityDataRegistry`](/auto-docs/free-layout-editor/interfaces/EntityDataRegistry.md)<`D`> |

#### Returns

`void`

#### Inherited from

[ConfigEntity](/auto-docs/free-layout-editor/classes/ConfigEntity.md).[removeData](/auto-docs/free-layout-editor/classes/ConfigEntity.md#removedata)

***

### reset

**reset**(): `void`

重制为初始化状态

#### Returns

`void`

#### Inherited from

[ConfigEntity](/auto-docs/free-layout-editor/classes/ConfigEntity.md).[reset](/auto-docs/free-layout-editor/classes/ConfigEntity.md#reset)

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

[ConfigEntity](/auto-docs/free-layout-editor/classes/ConfigEntity.md).[toJSON](/auto-docs/free-layout-editor/classes/ConfigEntity.md#tojson)

***

### updateConfig

**updateConfig**(`props`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `Partial`<[`ConfigEntityProps`](/auto-docs/free-layout-editor/interfaces/ConfigEntityProps.md)> |

#### Returns

`void`

#### Inherited from

[ConfigEntity](/auto-docs/free-layout-editor/classes/ConfigEntity.md).[updateConfig](/auto-docs/free-layout-editor/classes/ConfigEntity.md#updateconfig)

***

### updateData

**updateData**<`D`>(`Registry`, `props`): `void`

更新实体的数据

#### Type parameters

| Name | Type |
| :------ | :------ |
| `D` | extends [`EntityData`](/auto-docs/free-layout-editor/classes/EntityData.md)<`any`, {}, `D`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `Registry` | [`EntityDataRegistry`](/auto-docs/free-layout-editor/interfaces/EntityDataRegistry.md)<`D`> |
| `props` | [`EntityDataProps`](/auto-docs/free-layout-editor/types/EntityDataProps.md)<`D`> |

#### Returns

`void`

#### Inherited from

[ConfigEntity](/auto-docs/free-layout-editor/classes/ConfigEntity.md).[updateData](/auto-docs/free-layout-editor/classes/ConfigEntity.md#updatedata)
