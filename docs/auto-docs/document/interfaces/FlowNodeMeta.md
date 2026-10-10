# Interface: FlowNodeMeta

节点渲染相关配置信息，可扩展

## Indexable

▪ \[key: `string`]: `any`

## Table of contents

### Properties

* [addDisable](/auto-docs/document/interfaces/FlowNodeMeta.md#adddisable)
* [addable](/auto-docs/document/interfaces/FlowNodeMeta.md#addable)
* [autoResizeDisable](/auto-docs/document/interfaces/FlowNodeMeta.md#autoresizedisable)
* [copyDisable](/auto-docs/document/interfaces/FlowNodeMeta.md#copydisable)
* [defaultCollapsed](/auto-docs/document/interfaces/FlowNodeMeta.md#defaultcollapsed)
* [defaultExpanded](/auto-docs/document/interfaces/FlowNodeMeta.md#defaultexpanded)
* [deleteDisable](/auto-docs/document/interfaces/FlowNodeMeta.md#deletedisable)
* [draggable](/auto-docs/document/interfaces/FlowNodeMeta.md#draggable)
* [expandable](/auto-docs/document/interfaces/FlowNodeMeta.md#expandable)
* [hidden](/auto-docs/document/interfaces/FlowNodeMeta.md#hidden)
* [inlineSpacingAfter](/auto-docs/document/interfaces/FlowNodeMeta.md#inlinespacingafter)
* [inlineSpacingPre](/auto-docs/document/interfaces/FlowNodeMeta.md#inlinespacingpre)
* [isInlineBlocks](/auto-docs/document/interfaces/FlowNodeMeta.md#isinlineblocks)
* [isNodeEnd](/auto-docs/document/interfaces/FlowNodeMeta.md#isnodeend)
* [isStart](/auto-docs/document/interfaces/FlowNodeMeta.md#isstart)
* [minInlineBlockSpacing](/auto-docs/document/interfaces/FlowNodeMeta.md#mininlineblockspacing)
* [origin](/auto-docs/document/interfaces/FlowNodeMeta.md#origin)
* [padding](/auto-docs/document/interfaces/FlowNodeMeta.md#padding)
* [renderKey](/auto-docs/document/interfaces/FlowNodeMeta.md#renderkey)
* [selectable](/auto-docs/document/interfaces/FlowNodeMeta.md#selectable)
* [size](/auto-docs/document/interfaces/FlowNodeMeta.md#size)
* [spacing](/auto-docs/document/interfaces/FlowNodeMeta.md#spacing)

## Properties

### addDisable

`Optional` **addDisable**: `boolean`

***

### addable

`Optional` **addable**: `boolean`

***

### autoResizeDisable

`Optional` **autoResizeDisable**: `boolean`

***

### copyDisable

`Optional` **copyDisable**: `boolean`

***

### defaultCollapsed

`Optional` **defaultCollapsed**: `boolean`

***

### defaultExpanded

`Optional` **defaultExpanded**: `boolean`

***

### deleteDisable

`Optional` **deleteDisable**: `boolean`

***

### draggable

`Optional` **draggable**: `boolean` | (`node`: [`FlowNodeEntity`](/auto-docs/document/classes/FlowNodeEntity-1.md)) => `boolean`

***

### expandable

`Optional` **expandable**: `boolean`

***

### hidden

`Optional` **hidden**: `boolean`

***

### inlineSpacingAfter

`Optional` **inlineSpacingAfter**: `number` | (`transform`: [`FlowNodeTransformData`](/auto-docs/document/classes/FlowNodeTransformData.md)) => `number`

***

### inlineSpacingPre

`Optional` **inlineSpacingPre**: `number` | (`transform`: [`FlowNodeTransformData`](/auto-docs/document/classes/FlowNodeTransformData.md)) => `number`

***

### isInlineBlocks

`Optional` **isInlineBlocks**: `boolean` | (`node`: [`FlowNodeEntity`](/auto-docs/document/classes/FlowNodeEntity-1.md)) => `boolean`

***

### isNodeEnd

`Optional` **isNodeEnd**: `boolean`

***

### isStart

`Optional` **isStart**: `boolean`

***

### minInlineBlockSpacing

`Optional` **minInlineBlockSpacing**: `number` | (`node`: [`FlowNodeTransformData`](/auto-docs/document/classes/FlowNodeTransformData.md)) => `number`

***

### origin

`Optional` **origin**: `OriginSchema`

**`Deprecated`**

使用 NodeRegister.getOrigin 代替

***

### padding

`Optional` **padding**: `PaddingSchema` | (`transform`: [`FlowNodeTransformData`](/auto-docs/document/classes/FlowNodeTransformData.md)) => `PaddingSchema`

***

### renderKey

`Optional` **renderKey**: `string`

***

### selectable

`Optional` **selectable**: `boolean` | (`node`: [`FlowNodeEntity`](/auto-docs/document/classes/FlowNodeEntity-1.md), `mousePos?`: `PositionSchema`) => `boolean`

***

### size

`Optional` **size**: `SizeSchema`

***

### spacing

`Optional` **spacing**: `number` | (`transform`: [`FlowNodeTransformData`](/auto-docs/document/classes/FlowNodeTransformData.md)) => `number`
