# Interface: FlowLayout

流程布局算法

## Table of contents

### Properties

* [name](/auto-docs/document/interfaces/FlowLayout.md#name)

### Methods

* [getDefaultInputPoint](/auto-docs/document/interfaces/FlowLayout.md#getdefaultinputpoint)
* [getDefaultNodeOrigin](/auto-docs/document/interfaces/FlowLayout.md#getdefaultnodeorigin)
* [getDefaultOutputPoint](/auto-docs/document/interfaces/FlowLayout.md#getdefaultoutputpoint)
* [getInitScroll](/auto-docs/document/interfaces/FlowLayout.md#getinitscroll)
* [getPadding](/auto-docs/document/interfaces/FlowLayout.md#getpadding)
* [reload](/auto-docs/document/interfaces/FlowLayout.md#reload)
* [update](/auto-docs/document/interfaces/FlowLayout.md#update)

## Properties

### name

**name**: `string`

布局名字

## Methods

### getDefaultInputPoint

**getDefaultInputPoint**(`node`): `IPoint`

获取默认输入点

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`FlowNodeEntity`](/auto-docs/document/classes/FlowNodeEntity-1.md) |

#### Returns

`IPoint`

***

### getDefaultNodeOrigin

**getDefaultNodeOrigin**(): `IPoint`

获取默认远点

#### Returns

`IPoint`

***

### getDefaultOutputPoint

**getDefaultOutputPoint**(`node`): `IPoint`

获取默认输出点

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`FlowNodeEntity`](/auto-docs/document/classes/FlowNodeEntity-1.md) |

#### Returns

`IPoint`

***

### getInitScroll

**getInitScroll**(`contentSize`): `ScrollSchema`

获取默认滚动 目前用在 scroll-limit-layer

#### Parameters

| Name | Type |
| :------ | :------ |
| `contentSize` | `SizeSchema` |

#### Returns

`ScrollSchema`

***

### getPadding

**getPadding**(`node`): `PaddingSchema`

获取节点的 padding 数据

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`FlowNodeEntity`](/auto-docs/document/classes/FlowNodeEntity-1.md) |

#### Returns

`PaddingSchema`

***

### reload

`Optional` **reload**(): `void`

布局切换时候触发

#### Returns

`void`

***

### update

**update**(): `void`

更新布局

#### Returns

`void`
