# Interface: FlowLayout

流程布局算法

## Table of contents

### Properties

* [name](/en/auto-docs/editor/interfaces/FlowLayout.md#name)

### Methods

* [getDefaultInputPoint](/en/auto-docs/editor/interfaces/FlowLayout.md#getdefaultinputpoint)
* [getDefaultNodeOrigin](/en/auto-docs/editor/interfaces/FlowLayout.md#getdefaultnodeorigin)
* [getDefaultOutputPoint](/en/auto-docs/editor/interfaces/FlowLayout.md#getdefaultoutputpoint)
* [getInitScroll](/en/auto-docs/editor/interfaces/FlowLayout.md#getinitscroll)
* [getPadding](/en/auto-docs/editor/interfaces/FlowLayout.md#getpadding)
* [reload](/en/auto-docs/editor/interfaces/FlowLayout.md#reload)
* [update](/en/auto-docs/editor/interfaces/FlowLayout.md#update)

## Properties

### name

**name**: `string`

布局名字

## Methods

### getDefaultInputPoint

**getDefaultInputPoint**(`node`): [`IPoint`](/en/auto-docs/editor/interfaces/IPoint.md)

获取默认输入点

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`FlowNodeEntity`](/en/auto-docs/editor/classes/FlowNodeEntity-1.md) |

#### Returns

[`IPoint`](/en/auto-docs/editor/interfaces/IPoint.md)

***

### getDefaultNodeOrigin

**getDefaultNodeOrigin**(): [`IPoint`](/en/auto-docs/editor/interfaces/IPoint.md)

获取默认远点

#### Returns

[`IPoint`](/en/auto-docs/editor/interfaces/IPoint.md)

***

### getDefaultOutputPoint

**getDefaultOutputPoint**(`node`): [`IPoint`](/en/auto-docs/editor/interfaces/IPoint.md)

获取默认输出点

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`FlowNodeEntity`](/en/auto-docs/editor/classes/FlowNodeEntity-1.md) |

#### Returns

[`IPoint`](/en/auto-docs/editor/interfaces/IPoint.md)

***

### getInitScroll

**getInitScroll**(`contentSize`): [`ScrollSchema`](/en/auto-docs/editor/interfaces/ScrollSchema.md)

获取默认滚动 目前用在 scroll-limit-layer

#### Parameters

| Name | Type |
| :------ | :------ |
| `contentSize` | [`SizeSchema`](/en/auto-docs/editor/interfaces/SizeSchema-1.md) |

#### Returns

[`ScrollSchema`](/en/auto-docs/editor/interfaces/ScrollSchema.md)

***

### getPadding

**getPadding**(`node`): [`PaddingSchema`](/en/auto-docs/editor/interfaces/PaddingSchema-1.md)

获取节点的 padding 数据

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`FlowNodeEntity`](/en/auto-docs/editor/classes/FlowNodeEntity-1.md) |

#### Returns

[`PaddingSchema`](/en/auto-docs/editor/interfaces/PaddingSchema-1.md)

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
