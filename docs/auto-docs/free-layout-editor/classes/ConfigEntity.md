# Class: ConfigEntity\<P, O>

用于专门的数据配置，且是单例

## Type parameters

| Name | Type |
| :------ | :------ |
| `P` | extends [`ConfigEntityProps`](/auto-docs/free-layout-editor/interfaces/ConfigEntityProps.md) = [`ConfigEntityProps`](/auto-docs/free-layout-editor/interfaces/ConfigEntityProps.md) |
| `O` | extends [`EntityOpts`](/auto-docs/free-layout-editor/interfaces/EntityOpts.md) = [`EntityOpts`](/auto-docs/free-layout-editor/interfaces/EntityOpts.md) |

## Hierarchy

* [`Entity`](/auto-docs/free-layout-editor/classes/Entity-1.md)<`O`>

  ↳ **`ConfigEntity`**

  ↳↳ [`EditorStateConfigEntity`](/auto-docs/free-layout-editor/classes/EditorStateConfigEntity.md)

  ↳↳ [`PlaygroundConfigEntity`](/auto-docs/free-layout-editor/classes/PlaygroundConfigEntity.md)

  ↳↳ [`FlowDocumentTransformerEntity`](/auto-docs/free-layout-editor/classes/FlowDocumentTransformerEntity.md)

  ↳↳ [`FlowRendererStateEntity`](/auto-docs/free-layout-editor/classes/FlowRendererStateEntity.md)

  ↳↳ [`FlowDragEntity`](/auto-docs/free-layout-editor/classes/FlowDragEntity.md)

  ↳↳ [`FlowSelectConfigEntity`](/auto-docs/free-layout-editor/classes/FlowSelectConfigEntity.md)

  ↳↳ [`SelectorBoxConfigEntity`](/auto-docs/free-layout-editor/classes/SelectorBoxConfigEntity.md)

## Table of contents

### Constructors

* [constructor](/auto-docs/free-layout-editor/classes/ConfigEntity.md#constructor)

### Properties

* [\_\_opts\_type\_\_](/auto-docs/free-layout-editor/classes/ConfigEntity.md#__opts_type__)
* [entityManager](/auto-docs/free-layout-editor/classes/ConfigEntity.md#entitymanager)
* [onDataChange](/auto-docs/free-layout-editor/classes/ConfigEntity.md#ondatachange)
* [onEntityChange](/auto-docs/free-layout-editor/classes/ConfigEntity.md#onentitychange)
* [preDispose](/auto-docs/free-layout-editor/classes/ConfigEntity.md#predispose)
* [toDispose](/auto-docs/free-layout-editor/classes/ConfigEntity.md#todispose)
* [type](/auto-docs/free-layout-editor/classes/ConfigEntity.md#type)

### Accessors

* [config](/auto-docs/free-layout-editor/classes/ConfigEntity.md#config)
* [context](/auto-docs/free-layout-editor/classes/ConfigEntity.md#context)
* [disposed](/auto-docs/free-layout-editor/classes/ConfigEntity.md#disposed)
* [id](/auto-docs/free-layout-editor/classes/ConfigEntity.md#id)
* [onDispose](/auto-docs/free-layout-editor/classes/ConfigEntity.md#ondispose)
* [savedInManager](/auto-docs/free-layout-editor/classes/ConfigEntity.md#savedinmanager)
* [type](/auto-docs/free-layout-editor/classes/ConfigEntity.md#type-1)
* [version](/auto-docs/free-layout-editor/classes/ConfigEntity.md#version)

### Methods

* [addData](/auto-docs/free-layout-editor/classes/ConfigEntity.md#adddata)
* [addInitializeData](/auto-docs/free-layout-editor/classes/ConfigEntity.md#addinitializedata)
* [checkChanged](/auto-docs/free-layout-editor/classes/ConfigEntity.md#checkchanged)
* [dispose](/auto-docs/free-layout-editor/classes/ConfigEntity.md#dispose)
* [fromJSON](/auto-docs/free-layout-editor/classes/ConfigEntity.md#fromjson)
* [getData](/auto-docs/free-layout-editor/classes/ConfigEntity.md#getdata)
* [getDefaultConfig](/auto-docs/free-layout-editor/classes/ConfigEntity.md#getdefaultconfig)
* [getDefaultDataRegistries](/auto-docs/free-layout-editor/classes/ConfigEntity.md#getdefaultdataregistries)
* [getService](/auto-docs/free-layout-editor/classes/ConfigEntity.md#getservice)
* [hasData](/auto-docs/free-layout-editor/classes/ConfigEntity.md#hasdata)
* [onConfigChanged](/auto-docs/free-layout-editor/classes/ConfigEntity.md#onconfigchanged)
* [removeData](/auto-docs/free-layout-editor/classes/ConfigEntity.md#removedata)
* [reset](/auto-docs/free-layout-editor/classes/ConfigEntity.md#reset)
* [toJSON](/auto-docs/free-layout-editor/classes/ConfigEntity.md#tojson)
* [updateConfig](/auto-docs/free-layout-editor/classes/ConfigEntity.md#updateconfig)
* [updateData](/auto-docs/free-layout-editor/classes/ConfigEntity.md#updatedata)

## Constructors

### constructor

**new ConfigEntity**<`P`, `O`>(`opts`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | extends [`ConfigEntityProps`](/auto-docs/free-layout-editor/interfaces/ConfigEntityProps.md) = [`ConfigEntityProps`](/auto-docs/free-layout-editor/interfaces/ConfigEntityProps.md) |
| `O` | extends [`EntityOpts`](/auto-docs/free-layout-editor/interfaces/EntityOpts.md) = [`EntityOpts`](/auto-docs/free-layout-editor/interfaces/EntityOpts.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | `O` |

#### Overrides

[Entity](/auto-docs/free-layout-editor/classes/Entity-1.md).[constructor](/auto-docs/free-layout-editor/classes/Entity-1.md#constructor)

## Properties

### \_\_opts\_type\_\_

**\_\_opts\_type\_\_**: `O`

#### Inherited from

[Entity](/auto-docs/free-layout-editor/classes/Entity-1.md).[**opts\_type**](/auto-docs/free-layout-editor/classes/Entity-1.md#__opts_type__)

***

### entityManager

`Readonly` **entityManager**: [`EntityManager`](/auto-docs/free-layout-editor/classes/EntityManager.md)

全局的entity管理器

#### Inherited from

[Entity](/auto-docs/free-layout-editor/classes/Entity-1.md).[entityManager](/auto-docs/free-layout-editor/classes/Entity-1.md#entitymanager)

***

### onDataChange

`Readonly` **onDataChange**: [`Event`](/auto-docs/free-layout-editor/interfaces/Event-1.md)<[`EntityDataChangedEvent`](/auto-docs/free-layout-editor/interfaces/EntityDataChangedEvent.md)<[`Entity`](/auto-docs/free-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/free-layout-editor/interfaces/EntityOpts.md)>>>

数据更改事件

#### Inherited from

[Entity](/auto-docs/free-layout-editor/classes/Entity-1.md).[onDataChange](/auto-docs/free-layout-editor/classes/Entity-1.md#ondatachange)

***

### onEntityChange

`Readonly` **onEntityChange**: [`Event`](/auto-docs/free-layout-editor/interfaces/Event-1.md)<[`Entity`](/auto-docs/free-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/free-layout-editor/interfaces/EntityOpts.md)>>

修改会触发

#### Inherited from

[Entity](/auto-docs/free-layout-editor/classes/Entity-1.md).[onEntityChange](/auto-docs/free-layout-editor/classes/Entity-1.md#onentitychange)

***

### preDispose

`Readonly` **preDispose**: [`DisposableCollection`](/auto-docs/free-layout-editor/classes/DisposableCollection.md)

销毁前事件管理

#### Inherited from

[Entity](/auto-docs/free-layout-editor/classes/Entity-1.md).[preDispose](/auto-docs/free-layout-editor/classes/Entity-1.md#predispose)

***

### toDispose

`Readonly` **toDispose**: [`DisposableCollection`](/auto-docs/free-layout-editor/classes/DisposableCollection.md)

销毁事件管理

#### Inherited from

[Entity](/auto-docs/free-layout-editor/classes/Entity-1.md).[toDispose](/auto-docs/free-layout-editor/classes/Entity-1.md#todispose)

***

### type

`Static` **type**: `string`

#### Overrides

[Entity](/auto-docs/free-layout-editor/classes/Entity-1.md).[type](/auto-docs/free-layout-editor/classes/Entity-1.md#type)

## Accessors

### config

`get` **config**(): `P`

#### Returns

`P`

***

### context

`get` **context**(): `any`

#### Returns

`any`

#### Inherited from

Entity.context

***

### disposed

`get` **disposed**(): `boolean`

#### Returns

`boolean`

#### Inherited from

Entity.disposed

***

### id

`get` **id**(): `string`

实体 id

#### Returns

`string`

#### Inherited from

Entity.id

***

### onDispose

`get` **onDispose**(): [`Event`](/auto-docs/free-layout-editor/interfaces/Event-1.md)<`void`>

销毁事件

#### Returns

[`Event`](/auto-docs/free-layout-editor/interfaces/Event-1.md)<`void`>

#### Inherited from

Entity.onDispose

***

### savedInManager

`get` **savedInManager**(): `boolean`

是否存到全局 manager，默认 true

#### Returns

`boolean`

#### Inherited from

Entity.savedInManager

***

### type

`get` **type**(): `string`

实体类型

#### Returns

`string`

#### Inherited from

Entity.type

***

### version

`get` **version**(): `number`

实体的版本

#### Returns

`number`

#### Inherited from

Entity.version

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

[Entity](/auto-docs/free-layout-editor/classes/Entity-1.md).[addData](/auto-docs/free-layout-editor/classes/Entity-1.md#adddata)

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

[Entity](/auto-docs/free-layout-editor/classes/Entity-1.md).[addInitializeData](/auto-docs/free-layout-editor/classes/Entity-1.md#addinitializedata)

***

### checkChanged

**checkChanged**(`oldData`, `newData`): `boolean`

判断 config 数据是否变化

#### Parameters

| Name | Type |
| :------ | :------ |
| `oldData` | `P` |
| `newData` | `Partial`<`P`> |

#### Returns

`boolean`

***

### dispose

**dispose**(): `void`

销毁实体

#### Returns

`void`

#### Inherited from

[Entity](/auto-docs/free-layout-editor/classes/Entity-1.md).[dispose](/auto-docs/free-layout-editor/classes/Entity-1.md#dispose)

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

[Entity](/auto-docs/free-layout-editor/classes/Entity-1.md).[fromJSON](/auto-docs/free-layout-editor/classes/Entity-1.md#fromjson)

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

[Entity](/auto-docs/free-layout-editor/classes/Entity-1.md).[getData](/auto-docs/free-layout-editor/classes/Entity-1.md#getdata)

***

### getDefaultConfig

**getDefaultConfig**(): `P`

#### Returns

`P`

***

### getDefaultDataRegistries

**getDefaultDataRegistries**(): [`EntityDataRegistry`](/auto-docs/free-layout-editor/interfaces/EntityDataRegistry.md)<[`EntityData`](/auto-docs/free-layout-editor/classes/EntityData.md)<`any`, {}>>\[]

默认初始化的 Data

#### Returns

[`EntityDataRegistry`](/auto-docs/free-layout-editor/interfaces/EntityDataRegistry.md)<[`EntityData`](/auto-docs/free-layout-editor/classes/EntityData.md)<`any`, {}>>\[]

#### Inherited from

[Entity](/auto-docs/free-layout-editor/classes/Entity-1.md).[getDefaultDataRegistries](/auto-docs/free-layout-editor/classes/Entity-1.md#getdefaultdataregistries)

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

[Entity](/auto-docs/free-layout-editor/classes/Entity-1.md).[getService](/auto-docs/free-layout-editor/classes/Entity-1.md#getservice)

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

[Entity](/auto-docs/free-layout-editor/classes/Entity-1.md).[hasData](/auto-docs/free-layout-editor/classes/Entity-1.md#hasdata)

***

### onConfigChanged

**onConfigChanged**(`fn`): [`Disposable`](/auto-docs/free-layout-editor/interfaces/Disposable-1.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | (`data`: `P`) => `void` |

#### Returns

[`Disposable`](/auto-docs/free-layout-editor/interfaces/Disposable-1.md)

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

[Entity](/auto-docs/free-layout-editor/classes/Entity-1.md).[removeData](/auto-docs/free-layout-editor/classes/Entity-1.md#removedata)

***

### reset

**reset**(): `void`

重制为初始化状态

#### Returns

`void`

#### Inherited from

[Entity](/auto-docs/free-layout-editor/classes/Entity-1.md).[reset](/auto-docs/free-layout-editor/classes/Entity-1.md#reset)

***

### toJSON

**toJSON**(): `any`

存储数据，用于持久化存储

#### Returns

`any`

#### Inherited from

[Entity](/auto-docs/free-layout-editor/classes/Entity-1.md).[toJSON](/auto-docs/free-layout-editor/classes/Entity-1.md#tojson)

***

### updateConfig

**updateConfig**(`props`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `Partial`<`P`> |

#### Returns

`void`

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

[Entity](/auto-docs/free-layout-editor/classes/Entity-1.md).[updateData](/auto-docs/free-layout-editor/classes/Entity-1.md#updatedata)
