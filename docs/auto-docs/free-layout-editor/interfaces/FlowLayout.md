# Interface: FlowLayout

流程布局算法

## Table of contents

### Properties

* [name](/auto-docs/free-layout-editor/interfaces/FlowLayout.md#name)

### Methods

* [getDefaultInputPoint](/auto-docs/free-layout-editor/interfaces/FlowLayout.md#getdefaultinputpoint)
* [getDefaultNodeOrigin](/auto-docs/free-layout-editor/interfaces/FlowLayout.md#getdefaultnodeorigin)
* [getDefaultOutputPoint](/auto-docs/free-layout-editor/interfaces/FlowLayout.md#getdefaultoutputpoint)
* [getInitScroll](/auto-docs/free-layout-editor/interfaces/FlowLayout.md#getinitscroll)
* [getPadding](/auto-docs/free-layout-editor/interfaces/FlowLayout.md#getpadding)
* [reload](/auto-docs/free-layout-editor/interfaces/FlowLayout.md#reload)
* [update](/auto-docs/free-layout-editor/interfaces/FlowLayout.md#update)

## Properties

### name

**name**: `string`

布局名字

## Methods

### getDefaultInputPoint

**getDefaultInputPoint**(`node`): [`IPoint`](/auto-docs/free-layout-editor/interfaces/IPoint.md)

获取默认输入点

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) |

#### Returns

[`IPoint`](/auto-docs/free-layout-editor/interfaces/IPoint.md)

***

### getDefaultNodeOrigin

**getDefaultNodeOrigin**(): [`IPoint`](/auto-docs/free-layout-editor/interfaces/IPoint.md)

获取默认远点

#### Returns

[`IPoint`](/auto-docs/free-layout-editor/interfaces/IPoint.md)

***

### getDefaultOutputPoint

**getDefaultOutputPoint**(`node`): [`IPoint`](/auto-docs/free-layout-editor/interfaces/IPoint.md)

获取默认输出点

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) |

#### Returns

[`IPoint`](/auto-docs/free-layout-editor/interfaces/IPoint.md)

***

### getInitScroll

**getInitScroll**(`contentSize`): [`ScrollSchema`](/auto-docs/free-layout-editor/interfaces/ScrollSchema.md)

获取默认滚动 目前用在 scroll-limit-layer

#### Parameters

| Name | Type |
| :------ | :------ |
| `contentSize` | [`SizeSchema`](/auto-docs/free-layout-editor/interfaces/SizeSchema-1.md) |

#### Returns

[`ScrollSchema`](/auto-docs/free-layout-editor/interfaces/ScrollSchema.md)

***

### getPadding

**getPadding**(`node`): [`PaddingSchema`](/auto-docs/free-layout-editor/interfaces/PaddingSchema-1.md)

获取节点的 padding 数据

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) |

#### Returns

[`PaddingSchema`](/auto-docs/free-layout-editor/interfaces/PaddingSchema-1.md)

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
