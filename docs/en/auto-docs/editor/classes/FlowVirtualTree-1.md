# Class: FlowVirtualTree\<T>

存储节点的 tree 结构信息
策略是 "重修改轻查询"，即修改时候做的事情更多，查询都通过指针来操作

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Object` |

## Implements

* [`Disposable`](/en/auto-docs/editor/interfaces/Disposable-1.md)

## Table of contents

### Constructors

* [constructor](/en/auto-docs/editor/classes/FlowVirtualTree-1.md#constructor)

### Properties

* [onTreeChange](/en/auto-docs/editor/classes/FlowVirtualTree-1.md#ontreechange)
* [root](/en/auto-docs/editor/classes/FlowVirtualTree-1.md#root)

### Accessors

* [size](/en/auto-docs/editor/classes/FlowVirtualTree-1.md#size)

### Methods

* [addChild](/en/auto-docs/editor/classes/FlowVirtualTree-1.md#addchild)
* [clear](/en/auto-docs/editor/classes/FlowVirtualTree-1.md#clear)
* [clone](/en/auto-docs/editor/classes/FlowVirtualTree-1.md#clone)
* [cloneMap](/en/auto-docs/editor/classes/FlowVirtualTree-1.md#clonemap)
* [dispose](/en/auto-docs/editor/classes/FlowVirtualTree-1.md#dispose)
* [fireTreeChange](/en/auto-docs/editor/classes/FlowVirtualTree-1.md#firetreechange)
* [getById](/en/auto-docs/editor/classes/FlowVirtualTree-1.md#getbyid)
* [getChildren](/en/auto-docs/editor/classes/FlowVirtualTree-1.md#getchildren)
* [getInfo](/en/auto-docs/editor/classes/FlowVirtualTree-1.md#getinfo)
* [getNext](/en/auto-docs/editor/classes/FlowVirtualTree-1.md#getnext)
* [getParent](/en/auto-docs/editor/classes/FlowVirtualTree-1.md#getparent)
* [getPre](/en/auto-docs/editor/classes/FlowVirtualTree-1.md#getpre)
* [insertAfter](/en/auto-docs/editor/classes/FlowVirtualTree-1.md#insertafter)
* [moveChilds](/en/auto-docs/editor/classes/FlowVirtualTree-1.md#movechilds)
* [remove](/en/auto-docs/editor/classes/FlowVirtualTree-1.md#remove)
* [removeParent](/en/auto-docs/editor/classes/FlowVirtualTree-1.md#removeparent)
* [toString](/en/auto-docs/editor/classes/FlowVirtualTree-1.md#tostring)
* [traverse](/en/auto-docs/editor/classes/FlowVirtualTree-1.md#traverse)

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

**onTreeChange**: [`Event`](/en/auto-docs/editor/interfaces/Event-1.md)<`void`>

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

**clone**(): [`FlowVirtualTree`](/en/auto-docs/editor/classes/FlowVirtualTree-1.md)<`T`>

#### Returns

[`FlowVirtualTree`](/en/auto-docs/editor/classes/FlowVirtualTree-1.md)<`T`>

***

### cloneMap

**cloneMap**(): `Map`<`T`, [`NodeInfo`](/en/auto-docs/editor/interfaces/FlowVirtualTree.NodeInfo.md)<`T`>>

#### Returns

`Map`<`T`, [`NodeInfo`](/en/auto-docs/editor/interfaces/FlowVirtualTree.NodeInfo.md)<`T`>>

***

### dispose

**dispose**(): `void`

#### Returns

`void`

#### Implementation of

[Disposable](/en/auto-docs/editor/interfaces/Disposable-1.md).[dispose](/en/auto-docs/editor/interfaces/Disposable-1.md#dispose)

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

**getInfo**(`node`): [`NodeInfo`](/en/auto-docs/editor/interfaces/FlowVirtualTree.NodeInfo.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `T` |

#### Returns

[`NodeInfo`](/en/auto-docs/editor/interfaces/FlowVirtualTree.NodeInfo.md)<`T`>

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

| Name | Type |
| :------ | :------ |
| `node` | `T` |
| `withChildren?` | `boolean` |

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

| Name | Type |
| :------ | :------ |
| `fn` | (`node`: `T`, `depth`: `number`, `index`: `number`) => `boolean` | `void` |
| `node?` | `T` |
| `depth?` | `number` |
| `index?` | `number` |

#### Returns

`boolean` | `void`
