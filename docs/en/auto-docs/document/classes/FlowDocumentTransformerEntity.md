# Class: FlowDocumentTransformerEntity

用于通知所有 layer 更新

## Hierarchy

* `ConfigEntity`<{ `loading`: `boolean` ; `treeVersion`: `number`  }, `FlowDocumentTransformerEntityConfig`>

  ↳ **`FlowDocumentTransformerEntity`**

## Table of contents

### Constructors

* [constructor](/en/auto-docs/document/classes/FlowDocumentTransformerEntity.md#constructor)

### Properties

* [\_\_opts\_type\_\_](/en/auto-docs/document/classes/FlowDocumentTransformerEntity.md#__opts_type__)
* [document](/en/auto-docs/document/classes/FlowDocumentTransformerEntity.md#document)
* [entityManager](/en/auto-docs/document/classes/FlowDocumentTransformerEntity.md#entitymanager)
* [onDataChange](/en/auto-docs/document/classes/FlowDocumentTransformerEntity.md#ondatachange)
* [onEntityChange](/en/auto-docs/document/classes/FlowDocumentTransformerEntity.md#onentitychange)
* [onRefresh](/en/auto-docs/document/classes/FlowDocumentTransformerEntity.md#onrefresh)
* [preDispose](/en/auto-docs/document/classes/FlowDocumentTransformerEntity.md#predispose)
* [toDispose](/en/auto-docs/document/classes/FlowDocumentTransformerEntity.md#todispose)
* [type](/en/auto-docs/document/classes/FlowDocumentTransformerEntity.md#type)

### Accessors

* [config](/en/auto-docs/document/classes/FlowDocumentTransformerEntity.md#config)
* [context](/en/auto-docs/document/classes/FlowDocumentTransformerEntity.md#context)
* [disposed](/en/auto-docs/document/classes/FlowDocumentTransformerEntity.md#disposed)
* [id](/en/auto-docs/document/classes/FlowDocumentTransformerEntity.md#id)
* [loading](/en/auto-docs/document/classes/FlowDocumentTransformerEntity.md#loading)
* [onDispose](/en/auto-docs/document/classes/FlowDocumentTransformerEntity.md#ondispose)
* [savedInManager](/en/auto-docs/document/classes/FlowDocumentTransformerEntity.md#savedinmanager)
* [type](/en/auto-docs/document/classes/FlowDocumentTransformerEntity.md#type-1)
* [version](/en/auto-docs/document/classes/FlowDocumentTransformerEntity.md#version)

### Methods

* [addData](/en/auto-docs/document/classes/FlowDocumentTransformerEntity.md#adddata)
* [addInitializeData](/en/auto-docs/document/classes/FlowDocumentTransformerEntity.md#addinitializedata)
* [checkChanged](/en/auto-docs/document/classes/FlowDocumentTransformerEntity.md#checkchanged)
* [clear](/en/auto-docs/document/classes/FlowDocumentTransformerEntity.md#clear)
* [dispose](/en/auto-docs/document/classes/FlowDocumentTransformerEntity.md#dispose)
* [fromJSON](/en/auto-docs/document/classes/FlowDocumentTransformerEntity.md#fromjson)
* [getData](/en/auto-docs/document/classes/FlowDocumentTransformerEntity.md#getdata)
* [getDefaultConfig](/en/auto-docs/document/classes/FlowDocumentTransformerEntity.md#getdefaultconfig)
* [getDefaultDataRegistries](/en/auto-docs/document/classes/FlowDocumentTransformerEntity.md#getdefaultdataregistries)
* [getService](/en/auto-docs/document/classes/FlowDocumentTransformerEntity.md#getservice)
* [hasData](/en/auto-docs/document/classes/FlowDocumentTransformerEntity.md#hasdata)
* [isTreeDirty](/en/auto-docs/document/classes/FlowDocumentTransformerEntity.md#istreedirty)
* [onConfigChanged](/en/auto-docs/document/classes/FlowDocumentTransformerEntity.md#onconfigchanged)
* [refresh](/en/auto-docs/document/classes/FlowDocumentTransformerEntity.md#refresh)
* [removeData](/en/auto-docs/document/classes/FlowDocumentTransformerEntity.md#removedata)
* [reset](/en/auto-docs/document/classes/FlowDocumentTransformerEntity.md#reset)
* [toJSON](/en/auto-docs/document/classes/FlowDocumentTransformerEntity.md#tojson)
* [updateConfig](/en/auto-docs/document/classes/FlowDocumentTransformerEntity.md#updateconfig)
* [updateData](/en/auto-docs/document/classes/FlowDocumentTransformerEntity.md#updatedata)
* [updateTransformsTree](/en/auto-docs/document/classes/FlowDocumentTransformerEntity.md#updatetransformstree)

## Constructors

### constructor

**new FlowDocumentTransformerEntity**(`conf`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `conf` | `FlowDocumentTransformerEntityConfig` |

#### Overrides

ConfigEntity\&lt;
{
loading: boolean;
treeVersion: number;
},
FlowDocumentTransformerEntityConfig
\&gt;.constructor

## Properties

### \_\_opts\_type\_\_

**\_\_opts\_type\_\_**: `FlowDocumentTransformerEntityConfig`

#### Inherited from

ConfigEntity.\_\_opts\_type\_\_

***

### document

**document**: [`FlowDocument`](/en/auto-docs/document/classes/FlowDocument.md)<[`FlowDocumentJSON`](/en/auto-docs/document/types/FlowDocumentJSON.md)>

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

### onRefresh

`Readonly` **onRefresh**: `Event`<`void`>

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

`Static` **type**: `string` = `'FlowDocumentTransformerEntity'`

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
| `oldData` | `Object` |
| `oldData.loading` | `boolean` |
| `oldData.treeVersion` | `number` |
| `newData` | `Partial`<{ `loading`: `boolean` ; `treeVersion`: `number`  }> |

#### Returns

`boolean`

#### Inherited from

ConfigEntity.checkChanged

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

**getDefaultConfig**(): `Object`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `loading` | `boolean` |
| `treeVersion` | `number` |

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

### isTreeDirty

**isTreeDirty**(): `boolean`

#### Returns

`boolean`

***

### onConfigChanged

**onConfigChanged**(`fn`): `Disposable`

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | (`data`: { `loading`: `boolean` ; `treeVersion`: `number`  }) => `void` |

#### Returns

`Disposable`

#### Inherited from

ConfigEntity.onConfigChanged

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
| `props` | `Partial`<{ `loading`: `boolean` ; `treeVersion`: `number`  }> |

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

***

### updateTransformsTree

**updateTransformsTree**(): `void`

更新矩阵结构 (这个只有在树结构变化时候才会触发，如：添加节点、删除节点、改变位置节点)

#### Returns

`void`
