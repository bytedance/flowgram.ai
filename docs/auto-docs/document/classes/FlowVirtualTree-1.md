# Class: FlowVirtualTree\<T>

存储节点的 tree 结构信息
策略是 "重修改轻查询"，即修改时候做的事情更多，查询都通过指针来操作

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Object` |

## Implements

* `Disposable`

## Table of contents

### Constructors

* [constructor](/auto-docs/document/classes/FlowVirtualTree-1.md#constructor)

### Properties

* [onTreeChange](/auto-docs/document/classes/FlowVirtualTree-1.md#ontreechange)
* [root](/auto-docs/document/classes/FlowVirtualTree-1.md#root)

### Accessors

* [size](/auto-docs/document/classes/FlowVirtualTree-1.md#size)

### Methods

* [addChild](/auto-docs/document/classes/FlowVirtualTree-1.md#addchild)
* [clear](/auto-docs/document/classes/FlowVirtualTree-1.md#clear)
* [clone](/auto-docs/document/classes/FlowVirtualTree-1.md#clone)
* [cloneMap](/auto-docs/document/classes/FlowVirtualTree-1.md#clonemap)
* [dispose](/auto-docs/document/classes/FlowVirtualTree-1.md#dispose)
* [fireTreeChange](/auto-docs/document/classes/FlowVirtualTree-1.md#firetreechange)
* [getById](/auto-docs/document/classes/FlowVirtualTree-1.md#getbyid)
* [getChildren](/auto-docs/document/classes/FlowVirtualTree-1.md#getchildren)
* [getInfo](/auto-docs/document/classes/FlowVirtualTree-1.md#getinfo)
* [getNext](/auto-docs/document/classes/FlowVirtualTree-1.md#getnext)
* [getParent](/auto-docs/document/classes/FlowVirtualTree-1.md#getparent)
* [getPre](/auto-docs/document/classes/FlowVirtualTree-1.md#getpre)
* [insertAfter](/auto-docs/document/classes/FlowVirtualTree-1.md#insertafter)
* [moveChilds](/auto-docs/document/classes/FlowVirtualTree-1.md#movechilds)
* [remove](/auto-docs/document/classes/FlowVirtualTree-1.md#remove)
* [removeParent](/auto-docs/document/classes/FlowVirtualTree-1.md#removeparent)
* [toString](/auto-docs/document/classes/FlowVirtualTree-1.md#tostring)
* [traverse](/auto-docs/document/classes/FlowVirtualTree-1.md#traverse)

## Constructors

### constructor

**new FlowVirtualTree**<`T`>(`root`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Object` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | `T` |

## Properties

### onTreeChange

**onTreeChange**: `Event`<`void`>

tree 结构变化时候触发

***

### root

`Readonly` **root**: `T`

## Accessors

### size

`get` **size**(): `number`

#### Returns

`number`

## Methods

### addChild

**addChild**(`parent`, `child`, `index?`): `T`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parent` | `T` |
| `child` | `T` |
| `index?` | `number` |

#### Returns

`T`

***

### clear

**clear**(): `void`

#### Returns

`void`

***

### clone

**clone**(): [`FlowVirtualTree`](/auto-docs/document/classes/FlowVirtualTree-1.md)<`T`>

#### Returns

[`FlowVirtualTree`](/auto-docs/document/classes/FlowVirtualTree-1.md)<`T`>

***

### cloneMap

**cloneMap**(): `Map`<`T`, [`NodeInfo`](/auto-docs/document/interfaces/FlowVirtualTree.NodeInfo.md)<`T`>>

#### Returns

`Map`<`T`, [`NodeInfo`](/auto-docs/document/interfaces/FlowVirtualTree.NodeInfo.md)<`T`>>

***

### dispose

**dispose**(): `void`

#### Returns

`void`

#### Implementation of

Disposable.dispose

***

### fireTreeChange

**fireTreeChange**(): `void`

通知文档树结构更新

#### Returns

`void`

***

### getById

**getById**(`id`): `undefined` | `T`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`undefined` | `T`

***

### getChildren

**getChildren**(`node`): `T`\[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `T` |

#### Returns

`T`\[]

***

### getInfo

**getInfo**(`node`): [`NodeInfo`](/auto-docs/document/interfaces/FlowVirtualTree.NodeInfo.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `T` |

#### Returns

[`NodeInfo`](/auto-docs/document/interfaces/FlowVirtualTree.NodeInfo.md)<`T`>

***

### getNext

**getNext**(`node`): `undefined` | `T`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `T` |

#### Returns

`undefined` | `T`

***

### getParent

**getParent**(`node`): `undefined` | `T`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `T` |

#### Returns

`undefined` | `T`

***

### getPre

**getPre**(`node`): `undefined` | `T`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `T` |

#### Returns

`undefined` | `T`

***

### insertAfter

**insertAfter**(`before`, `after`): `void`

插入节点到后边

#### Parameters

| Name | Type |
| :------ | :------ |
| `before` | `T` |
| `after` | `T` |

#### Returns

`void`

***

### moveChilds

**moveChilds**(`parent`, `childs`, `index?`): `T`\[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `parent` | `T` |
| `childs` | `T`\[] |
| `index?` | `number` |

#### Returns

`T`\[]

***

### remove

**remove**(`node`, `withChildren?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `node` | `T` | `undefined` |
| `withChildren` | `boolean` | `true` |

#### Returns

`void`

***

### removeParent

**removeParent**(`node`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `T` |

#### Returns

`void`

***

### toString

**toString**(`showType?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `showType?` | `boolean` |

#### Returns

`string`

***

### traverse

**traverse**(`fn`, `node?`, `depth?`, `index?`): `boolean` | `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `fn` | (`node`: `T`, `depth`: `number`, `index`: `number`) => `boolean` | `void` | `undefined` |
| `node` | `T` | `undefined` |
| `depth` | `number` | `0` |
| `index` | `number` | `0` |

#### Returns

`boolean` | `void`
