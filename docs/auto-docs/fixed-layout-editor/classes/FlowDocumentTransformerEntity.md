# Class: FlowDocumentTransformerEntity

用于通知所有 layer 更新

## Hierarchy

* [`ConfigEntity`](/auto-docs/fixed-layout-editor/classes/ConfigEntity.md)<{ `loading`: `boolean` ; `treeVersion`: `number`  }, `FlowDocumentTransformerEntityConfig`>

  ↳ **`FlowDocumentTransformerEntity`**

## Table of contents

### Constructors

* [constructor](/auto-docs/fixed-layout-editor/classes/FlowDocumentTransformerEntity.md#constructor)

### Properties

* [\_\_opts\_type\_\_](/auto-docs/fixed-layout-editor/classes/FlowDocumentTransformerEntity.md#__opts_type__)
* [document](/auto-docs/fixed-layout-editor/classes/FlowDocumentTransformerEntity.md#document)
* [entityManager](/auto-docs/fixed-layout-editor/classes/FlowDocumentTransformerEntity.md#entitymanager)
* [onDataChange](/auto-docs/fixed-layout-editor/classes/FlowDocumentTransformerEntity.md#ondatachange)
* [onEntityChange](/auto-docs/fixed-layout-editor/classes/FlowDocumentTransformerEntity.md#onentitychange)
* [onRefresh](/auto-docs/fixed-layout-editor/classes/FlowDocumentTransformerEntity.md#onrefresh)
* [preDispose](/auto-docs/fixed-layout-editor/classes/FlowDocumentTransformerEntity.md#predispose)
* [toDispose](/auto-docs/fixed-layout-editor/classes/FlowDocumentTransformerEntity.md#todispose)
* [type](/auto-docs/fixed-layout-editor/classes/FlowDocumentTransformerEntity.md#type)

### Accessors

* [config](/auto-docs/fixed-layout-editor/classes/FlowDocumentTransformerEntity.md#config)
* [context](/auto-docs/fixed-layout-editor/classes/FlowDocumentTransformerEntity.md#context)
* [disposed](/auto-docs/fixed-layout-editor/classes/FlowDocumentTransformerEntity.md#disposed)
* [id](/auto-docs/fixed-layout-editor/classes/FlowDocumentTransformerEntity.md#id)
* [loading](/auto-docs/fixed-layout-editor/classes/FlowDocumentTransformerEntity.md#loading)
* [onDispose](/auto-docs/fixed-layout-editor/classes/FlowDocumentTransformerEntity.md#ondispose)
* [savedInManager](/auto-docs/fixed-layout-editor/classes/FlowDocumentTransformerEntity.md#savedinmanager)
* [type](/auto-docs/fixed-layout-editor/classes/FlowDocumentTransformerEntity.md#type-1)
* [version](/auto-docs/fixed-layout-editor/classes/FlowDocumentTransformerEntity.md#version)

### Methods

* [addData](/auto-docs/fixed-layout-editor/classes/FlowDocumentTransformerEntity.md#adddata)
* [addInitializeData](/auto-docs/fixed-layout-editor/classes/FlowDocumentTransformerEntity.md#addinitializedata)
* [checkChanged](/auto-docs/fixed-layout-editor/classes/FlowDocumentTransformerEntity.md#checkchanged)
* [clear](/auto-docs/fixed-layout-editor/classes/FlowDocumentTransformerEntity.md#clear)
* [dispose](/auto-docs/fixed-layout-editor/classes/FlowDocumentTransformerEntity.md#dispose)
* [fromJSON](/auto-docs/fixed-layout-editor/classes/FlowDocumentTransformerEntity.md#fromjson)
* [getData](/auto-docs/fixed-layout-editor/classes/FlowDocumentTransformerEntity.md#getdata)
* [getDefaultConfig](/auto-docs/fixed-layout-editor/classes/FlowDocumentTransformerEntity.md#getdefaultconfig)
* [getDefaultDataRegistries](/auto-docs/fixed-layout-editor/classes/FlowDocumentTransformerEntity.md#getdefaultdataregistries)
* [getService](/auto-docs/fixed-layout-editor/classes/FlowDocumentTransformerEntity.md#getservice)
* [hasData](/auto-docs/fixed-layout-editor/classes/FlowDocumentTransformerEntity.md#hasdata)
* [isTreeDirty](/auto-docs/fixed-layout-editor/classes/FlowDocumentTransformerEntity.md#istreedirty)
* [onConfigChanged](/auto-docs/fixed-layout-editor/classes/FlowDocumentTransformerEntity.md#onconfigchanged)
* [refresh](/auto-docs/fixed-layout-editor/classes/FlowDocumentTransformerEntity.md#refresh)
* [removeData](/auto-docs/fixed-layout-editor/classes/FlowDocumentTransformerEntity.md#removedata)
* [reset](/auto-docs/fixed-layout-editor/classes/FlowDocumentTransformerEntity.md#reset)
* [toJSON](/auto-docs/fixed-layout-editor/classes/FlowDocumentTransformerEntity.md#tojson)
* [updateConfig](/auto-docs/fixed-layout-editor/classes/FlowDocumentTransformerEntity.md#updateconfig)
* [updateData](/auto-docs/fixed-layout-editor/classes/FlowDocumentTransformerEntity.md#updatedata)
* [updateTransformsTree](/auto-docs/fixed-layout-editor/classes/FlowDocumentTransformerEntity.md#updatetransformstree)

## Constructors

### constructor

**new FlowDocumentTransformerEntity**(`conf`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `conf` | `FlowDocumentTransformerEntityConfig` |

#### Overrides

[ConfigEntity](/auto-docs/fixed-layout-editor/classes/ConfigEntity.md).[constructor](/auto-docs/fixed-layout-editor/classes/ConfigEntity.md#constructor)

## Properties

### \_\_opts\_type\_\_

**\_\_opts\_type\_\_**: `FlowDocumentTransformerEntityConfig`

#### Inherited from

[ConfigEntity](/auto-docs/fixed-layout-editor/classes/ConfigEntity.md).[**opts\_type**](/auto-docs/fixed-layout-editor/classes/ConfigEntity.md#__opts_type__)

***

### document

**document**: [`FlowDocument`](/auto-docs/fixed-layout-editor/classes/FlowDocument.md)<[`FlowDocumentJSON`](/auto-docs/fixed-layout-editor/types/FlowDocumentJSON.md)>

***

### entityManager

`Readonly` **entityManager**: [`EntityManager`](/auto-docs/fixed-layout-editor/classes/EntityManager.md)

全局的entity管理器

#### Inherited from

[ConfigEntity](/auto-docs/fixed-layout-editor/classes/ConfigEntity.md).[entityManager](/auto-docs/fixed-layout-editor/classes/ConfigEntity.md#entitymanager)

***

### onDataChange

`Readonly` **onDataChange**: [`Event`](/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<[`EntityDataChangedEvent`](/auto-docs/fixed-layout-editor/interfaces/EntityDataChangedEvent.md)<[`Entity`](/auto-docs/fixed-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/fixed-layout-editor/interfaces/EntityOpts.md)>>>

数据更改事件

#### Inherited from

[ConfigEntity](/auto-docs/fixed-layout-editor/classes/ConfigEntity.md).[onDataChange](/auto-docs/fixed-layout-editor/classes/ConfigEntity.md#ondatachange)

***

### onEntityChange

`Readonly` **onEntityChange**: [`Event`](/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<[`Entity`](/auto-docs/fixed-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/fixed-layout-editor/interfaces/EntityOpts.md)>>

修改会触发

#### Inherited from

[ConfigEntity](/auto-docs/fixed-layout-editor/classes/ConfigEntity.md).[onEntityChange](/auto-docs/fixed-layout-editor/classes/ConfigEntity.md#onentitychange)

***

### onRefresh

`Readonly` **onRefresh**: [`Event`](/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<`void`>

***

### preDispose

`Readonly` **preDispose**: [`DisposableCollection`](/auto-docs/fixed-layout-editor/classes/DisposableCollection.md)

销毁前事件管理

#### Inherited from

[ConfigEntity](/auto-docs/fixed-layout-editor/classes/ConfigEntity.md).[preDispose](/auto-docs/fixed-layout-editor/classes/ConfigEntity.md#predispose)

***

### toDispose

`Readonly` **toDispose**: [`DisposableCollection`](/auto-docs/fixed-layout-editor/classes/DisposableCollection.md)

销毁事件管理

#### Inherited from

[ConfigEntity](/auto-docs/fixed-layout-editor/classes/ConfigEntity.md).[toDispose](/auto-docs/fixed-layout-editor/classes/ConfigEntity.md#todispose)

***

### type

`Static` **type**: `string`

#### Overrides

[ConfigEntity](/auto-docs/fixed-layout-editor/classes/ConfigEntity.md).[type](/auto-docs/fixed-layout-editor/classes/ConfigEntity.md#type)

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

### loading

`get` **loading**(): `boolean`

#### Returns

`boolean`

`set` **loading**(`loading`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `loading` | `boolean` |

#### Returns

`void`

***

### onDispose

`get` **onDispose**(): [`Event`](/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<`void`>

销毁事件

#### Returns

[`Event`](/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<`void`>

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
| `D` | extends [`EntityData`](/auto-docs/fixed-layout-editor/classes/EntityData.md)<`any`, {}, `D`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `Registry` | [`EntityDataRegistry`](/auto-docs/fixed-layout-editor/interfaces/EntityDataRegistry.md)<[`EntityData`](/auto-docs/fixed-layout-editor/classes/EntityData.md)<`any`, {}>> |
| `defaultProps?` | [`EntityDataProps`](/auto-docs/fixed-layout-editor/types/EntityDataProps.md)<`D`> |

#### Returns

`D`

#### Inherited from

[ConfigEntity](/auto-docs/fixed-layout-editor/classes/ConfigEntity.md).[addData](/auto-docs/fixed-layout-editor/classes/ConfigEntity.md#adddata)

***

### addInitializeData

**addInitializeData**(`datas`, `dataConfig?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `datas` | [`EntityDataRegistry`](/auto-docs/fixed-layout-editor/interfaces/EntityDataRegistry.md)<[`EntityData`](/auto-docs/fixed-layout-editor/classes/EntityData.md)<`any`, {}>>\[] |
| `dataConfig?` | `any` |

#### Returns

`void`

#### Inherited from

[ConfigEntity](/auto-docs/fixed-layout-editor/classes/ConfigEntity.md).[addInitializeData](/auto-docs/fixed-layout-editor/classes/ConfigEntity.md#addinitializedata)

***

### checkChanged

**checkChanged**(`oldData`, `newData`): `boolean`

判断 config 数据是否变化

#### Parameters

| Name | Type |
| :------ | :------ |
| `oldData` | `Object` |
| `oldData.loading` | `boolean` |
| `oldData.treeVersion` | `number` |
| `newData` | `Partial`<{ `loading`: `boolean` ; `treeVersion`: `number`  }> |

#### Returns

`boolean`

#### Inherited from

[ConfigEntity](/auto-docs/fixed-layout-editor/classes/ConfigEntity.md).[checkChanged](/auto-docs/fixed-layout-editor/classes/ConfigEntity.md#checkchanged)

***

### clear

**clear**(): `void`

#### Returns

`void`

***

### dispose

**dispose**(): `void`

销毁实体

#### Returns

`void`

#### Inherited from

[ConfigEntity](/auto-docs/fixed-layout-editor/classes/ConfigEntity.md).[dispose](/auto-docs/fixed-layout-editor/classes/ConfigEntity.md#dispose)

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

[ConfigEntity](/auto-docs/fixed-layout-editor/classes/ConfigEntity.md).[fromJSON](/auto-docs/fixed-layout-editor/classes/ConfigEntity.md#fromjson)

***

### getData

**getData**<`D`>(`Registry`): `D`

获取 data 数据

#### Type parameters

| Name | Type |
| :------ | :------ |
| `D` | extends [`EntityData`](/auto-docs/fixed-layout-editor/classes/EntityData.md)<`any`, {}, `D`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `Registry` | [`EntityDataRegistry`](/auto-docs/fixed-layout-editor/interfaces/EntityDataRegistry.md)<`D`> |

#### Returns

`D`

#### Inherited from

[ConfigEntity](/auto-docs/fixed-layout-editor/classes/ConfigEntity.md).[getData](/auto-docs/fixed-layout-editor/classes/ConfigEntity.md#getdata)

***

### getDefaultConfig

**getDefaultConfig**(): `Object`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `loading` | `boolean` |
| `treeVersion` | `number` |

#### Overrides

[ConfigEntity](/auto-docs/fixed-layout-editor/classes/ConfigEntity.md).[getDefaultConfig](/auto-docs/fixed-layout-editor/classes/ConfigEntity.md#getdefaultconfig)

***

### getDefaultDataRegistries

**getDefaultDataRegistries**(): [`EntityDataRegistry`](/auto-docs/fixed-layout-editor/interfaces/EntityDataRegistry.md)<[`EntityData`](/auto-docs/fixed-layout-editor/classes/EntityData.md)<`any`, {}>>\[]

默认初始化的 Data

#### Returns

[`EntityDataRegistry`](/auto-docs/fixed-layout-editor/interfaces/EntityDataRegistry.md)<[`EntityData`](/auto-docs/fixed-layout-editor/classes/EntityData.md)<`any`, {}>>\[]

#### Inherited from

[ConfigEntity](/auto-docs/fixed-layout-editor/classes/ConfigEntity.md).[getDefaultDataRegistries](/auto-docs/fixed-layout-editor/classes/ConfigEntity.md#getdefaultdataregistries)

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
| `identifier` | [`ServiceIdentifier`](/auto-docs/fixed-layout-editor/types/interfaces.ServiceIdentifier.md)<`T`> |

#### Returns

`T`

#### Inherited from

[ConfigEntity](/auto-docs/fixed-layout-editor/classes/ConfigEntity.md).[getService](/auto-docs/fixed-layout-editor/classes/ConfigEntity.md#getservice)

***

### hasData

**hasData**(`Registry`): `boolean`

是否有指定数据

#### Parameters

| Name | Type |
| :------ | :------ |
| `Registry` | [`EntityDataRegistry`](/auto-docs/fixed-layout-editor/interfaces/EntityDataRegistry.md)<[`EntityData`](/auto-docs/fixed-layout-editor/classes/EntityData.md)<`any`, {}>> |

#### Returns

`boolean`

#### Inherited from

[ConfigEntity](/auto-docs/fixed-layout-editor/classes/ConfigEntity.md).[hasData](/auto-docs/fixed-layout-editor/classes/ConfigEntity.md#hasdata)

***

### isTreeDirty

**isTreeDirty**(): `boolean`

#### Returns

`boolean`

***

### onConfigChanged

**onConfigChanged**(`fn`): [`Disposable`](/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | (`data`: { `loading`: `boolean` ; `treeVersion`: `number`  }) => `void` |

#### Returns

[`Disposable`](/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md)

#### Inherited from

[ConfigEntity](/auto-docs/fixed-layout-editor/classes/ConfigEntity.md).[onConfigChanged](/auto-docs/fixed-layout-editor/classes/ConfigEntity.md#onconfigchanged)

***

### refresh

**refresh**(): `void`

刷新节点的相对偏移

#### Returns

`void`

***

### removeData

**removeData**<`D`>(`Registry`): `void`

删除数据，初始化状态注入的数据无法被删除

#### Type parameters

| Name | Type |
| :------ | :------ |
| `D` | extends [`EntityData`](/auto-docs/fixed-layout-editor/classes/EntityData.md)<`any`, {}, `D`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `Registry` | [`EntityDataRegistry`](/auto-docs/fixed-layout-editor/interfaces/EntityDataRegistry.md)<`D`> |

#### Returns

`void`

#### Inherited from

[ConfigEntity](/auto-docs/fixed-layout-editor/classes/ConfigEntity.md).[removeData](/auto-docs/fixed-layout-editor/classes/ConfigEntity.md#removedata)

***

### reset

**reset**(): `void`

重制为初始化状态

#### Returns

`void`

#### Inherited from

[ConfigEntity](/auto-docs/fixed-layout-editor/classes/ConfigEntity.md).[reset](/auto-docs/fixed-layout-editor/classes/ConfigEntity.md#reset)

***

### toJSON

**toJSON**(): `any`

存储数据，用于持久化存储

#### Returns

`any`

#### Inherited from

[ConfigEntity](/auto-docs/fixed-layout-editor/classes/ConfigEntity.md).[toJSON](/auto-docs/fixed-layout-editor/classes/ConfigEntity.md#tojson)

***

### updateConfig

**updateConfig**(`props`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `Partial`<{ `loading`: `boolean` ; `treeVersion`: `number`  }> |

#### Returns

`void`

#### Inherited from

[ConfigEntity](/auto-docs/fixed-layout-editor/classes/ConfigEntity.md).[updateConfig](/auto-docs/fixed-layout-editor/classes/ConfigEntity.md#updateconfig)

***

### updateData

**updateData**<`D`>(`Registry`, `props`): `void`

更新实体的数据

#### Type parameters

| Name | Type |
| :------ | :------ |
| `D` | extends [`EntityData`](/auto-docs/fixed-layout-editor/classes/EntityData.md)<`any`, {}, `D`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `Registry` | [`EntityDataRegistry`](/auto-docs/fixed-layout-editor/interfaces/EntityDataRegistry.md)<`D`> |
| `props` | [`EntityDataProps`](/auto-docs/fixed-layout-editor/types/EntityDataProps.md)<`D`> |

#### Returns

`void`

#### Inherited from

[ConfigEntity](/auto-docs/fixed-layout-editor/classes/ConfigEntity.md).[updateData](/auto-docs/fixed-layout-editor/classes/ConfigEntity.md#updatedata)

***

### updateTransformsTree

**updateTransformsTree**(): `void`

更新矩阵结构 (这个只有在树结构变化时候才会触发，如：添加节点、删除节点、改变位置节点)

#### Returns

`void`
