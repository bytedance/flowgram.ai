# Class: LayoutStore

## Implements

* `ILayoutStore`

## Table of contents

### Constructors

* [constructor](/en/auto-docs/free-auto-layout-plugin/classes/LayoutStore.md#constructor)

### Properties

* [config](/en/auto-docs/free-auto-layout-plugin/classes/LayoutStore.md#config)
* [container](/en/auto-docs/free-auto-layout-plugin/classes/LayoutStore.md#container)
* [options](/en/auto-docs/free-auto-layout-plugin/classes/LayoutStore.md#options)

### Accessors

* [edges](/en/auto-docs/free-auto-layout-plugin/classes/LayoutStore.md#edges)
* [initialized](/en/auto-docs/free-auto-layout-plugin/classes/LayoutStore.md#initialized)
* [nodes](/en/auto-docs/free-auto-layout-plugin/classes/LayoutStore.md#nodes)

### Methods

* [create](/en/auto-docs/free-auto-layout-plugin/classes/LayoutStore.md#create)
* [getEdge](/en/auto-docs/free-auto-layout-plugin/classes/LayoutStore.md#getedge)
* [getNode](/en/auto-docs/free-auto-layout-plugin/classes/LayoutStore.md#getnode)
* [getNodeByIndex](/en/auto-docs/free-auto-layout-plugin/classes/LayoutStore.md#getnodebyindex)

## Constructors

### constructor

**new LayoutStore**(`config`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `LayoutConfig` |

## Properties

### config

`Readonly` **config**: `LayoutConfig`

***

### container

**container**: [`LayoutNode`](/en/auto-docs/free-auto-layout-plugin/interfaces/LayoutNode.md)

#### Implementation of

ILayoutStore.container

***

### options

**options**: [`LayoutOptions`](/en/auto-docs/free-auto-layout-plugin/interfaces/LayoutOptions.md)

#### Implementation of

ILayoutStore.options

## Accessors

### edges

`get` **edges**(): [`LayoutEdge`](/en/auto-docs/free-auto-layout-plugin/interfaces/LayoutEdge.md)\[]

#### Returns

[`LayoutEdge`](/en/auto-docs/free-auto-layout-plugin/interfaces/LayoutEdge.md)\[]

#### Implementation of

ILayoutStore.edges

***

### initialized

`get` **initialized**(): `boolean`

#### Returns

`boolean`

#### Implementation of

ILayoutStore.initialized

***

### nodes

`get` **nodes**(): [`LayoutNode`](/en/auto-docs/free-auto-layout-plugin/interfaces/LayoutNode.md)\[]

#### Returns

[`LayoutNode`](/en/auto-docs/free-auto-layout-plugin/interfaces/LayoutNode.md)\[]

#### Implementation of

ILayoutStore.nodes

## Methods

### create

**create**(`params`, `options`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `LayoutParams` |
| `options` | [`LayoutOptions`](/en/auto-docs/free-auto-layout-plugin/interfaces/LayoutOptions.md) |

#### Returns

`void`

#### Implementation of

ILayoutStore.create

***

### getEdge

**getEdge**(`id`): `undefined` | [`LayoutEdge`](/en/auto-docs/free-auto-layout-plugin/interfaces/LayoutEdge.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`undefined` | [`LayoutEdge`](/en/auto-docs/free-auto-layout-plugin/interfaces/LayoutEdge.md)

#### Implementation of

ILayoutStore.getEdge

***

### getNode

**getNode**(`id?`): `undefined` | [`LayoutNode`](/en/auto-docs/free-auto-layout-plugin/interfaces/LayoutNode.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id?` | `string` |

#### Returns

`undefined` | [`LayoutNode`](/en/auto-docs/free-auto-layout-plugin/interfaces/LayoutNode.md)

#### Implementation of

ILayoutStore.getNode

***

### getNodeByIndex

**getNodeByIndex**(`index`): `undefined` | [`LayoutNode`](/en/auto-docs/free-auto-layout-plugin/interfaces/LayoutNode.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `string` |

#### Returns

`undefined` | [`LayoutNode`](/en/auto-docs/free-auto-layout-plugin/interfaces/LayoutNode.md)

#### Implementation of

ILayoutStore.getNodeByIndex
