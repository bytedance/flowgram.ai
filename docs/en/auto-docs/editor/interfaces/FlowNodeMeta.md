# Interface: FlowNodeMeta

节点渲染相关配置信息，可扩展

## Indexable

▪ \[key: `string`]: `any`

## Table of contents

### Properties

* [addDisable](/en/auto-docs/editor/interfaces/FlowNodeMeta.md#adddisable)
* [addable](/en/auto-docs/editor/interfaces/FlowNodeMeta.md#addable)
* [autoResizeDisable](/en/auto-docs/editor/interfaces/FlowNodeMeta.md#autoresizedisable)
* [copyDisable](/en/auto-docs/editor/interfaces/FlowNodeMeta.md#copydisable)
* [defaultCollapsed](/en/auto-docs/editor/interfaces/FlowNodeMeta.md#defaultcollapsed)
* [defaultExpanded](/en/auto-docs/editor/interfaces/FlowNodeMeta.md#defaultexpanded)
* [deleteDisable](/en/auto-docs/editor/interfaces/FlowNodeMeta.md#deletedisable)
* [draggable](/en/auto-docs/editor/interfaces/FlowNodeMeta.md#draggable)
* [expandable](/en/auto-docs/editor/interfaces/FlowNodeMeta.md#expandable)
* [hidden](/en/auto-docs/editor/interfaces/FlowNodeMeta.md#hidden)
* [inlineSpacingAfter](/en/auto-docs/editor/interfaces/FlowNodeMeta.md#inlinespacingafter)
* [inlineSpacingPre](/en/auto-docs/editor/interfaces/FlowNodeMeta.md#inlinespacingpre)
* [isInlineBlocks](/en/auto-docs/editor/interfaces/FlowNodeMeta.md#isinlineblocks)
* [isNodeEnd](/en/auto-docs/editor/interfaces/FlowNodeMeta.md#isnodeend)
* [isStart](/en/auto-docs/editor/interfaces/FlowNodeMeta.md#isstart)
* [minInlineBlockSpacing](/en/auto-docs/editor/interfaces/FlowNodeMeta.md#mininlineblockspacing)
* [origin](/en/auto-docs/editor/interfaces/FlowNodeMeta.md#origin)
* [padding](/en/auto-docs/editor/interfaces/FlowNodeMeta.md#padding)
* [renderKey](/en/auto-docs/editor/interfaces/FlowNodeMeta.md#renderkey)
* [selectable](/en/auto-docs/editor/interfaces/FlowNodeMeta.md#selectable)
* [size](/en/auto-docs/editor/interfaces/FlowNodeMeta.md#size)
* [spacing](/en/auto-docs/editor/interfaces/FlowNodeMeta.md#spacing)

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

`Optional` **draggable**: `boolean` | (`node`: [`FlowNodeEntity`](/en/auto-docs/editor/classes/FlowNodeEntity-1.md)) => `boolean`

***

### expandable

`Optional` **expandable**: `boolean`

***

### hidden

`Optional` **hidden**: `boolean`

***

### inlineSpacingAfter

`Optional` **inlineSpacingAfter**: `number` | (`transform`: [`FlowNodeTransformData`](/en/auto-docs/editor/classes/FlowNodeTransformData.md)) => `number`

***

### inlineSpacingPre

`Optional` **inlineSpacingPre**: `number` | (`transform`: [`FlowNodeTransformData`](/en/auto-docs/editor/classes/FlowNodeTransformData.md)) => `number`

***

### isInlineBlocks

`Optional` **isInlineBlocks**: `boolean` | (`node`: [`FlowNodeEntity`](/en/auto-docs/editor/classes/FlowNodeEntity-1.md)) => `boolean`

***

### isNodeEnd

`Optional` **isNodeEnd**: `boolean`

***

### isStart

`Optional` **isStart**: `boolean`

***

### minInlineBlockSpacing

`Optional` **minInlineBlockSpacing**: `number` | (`node`: [`FlowNodeTransformData`](/en/auto-docs/editor/classes/FlowNodeTransformData.md)) => `number`

***

### origin

`Optional` **origin**: [`OriginSchema`](/en/auto-docs/editor/interfaces/OriginSchema.md)

**`Deprecated`**

使用 NodeRegister.getOrigin 代替

***

### padding

`Optional` **padding**: [`PaddingSchema`](/en/auto-docs/editor/interfaces/PaddingSchema-1.md) | (`transform`: [`FlowNodeTransformData`](/en/auto-docs/editor/classes/FlowNodeTransformData.md)) => [`PaddingSchema`](/en/auto-docs/editor/interfaces/PaddingSchema-1.md)

***

### renderKey

`Optional` **renderKey**: `string`

***

### selectable

`Optional` **selectable**: `boolean` | (`node`: [`FlowNodeEntity`](/en/auto-docs/editor/classes/FlowNodeEntity-1.md), `mousePos?`: [`PositionSchema`](/en/auto-docs/editor/interfaces/PositionSchema.md)) => `boolean`

***

### size

`Optional` **size**: [`SizeSchema`](/en/auto-docs/editor/interfaces/SizeSchema-1.md)

***

### spacing

`Optional` **spacing**: `number` | (`transform`: [`FlowNodeTransformData`](/en/auto-docs/editor/classes/FlowNodeTransformData.md)) => `number`
