# Interface: FlowNodeMeta

节点渲染相关配置信息，可扩展

## Hierarchy

* **`FlowNodeMeta`**

  ↳ [`WorkflowNodeMeta`](/auto-docs/free-layout-editor/interfaces/WorkflowNodeMeta.md)

## Indexable

▪ \[key: `string`]: `any`

## Table of contents

### Properties

* [addDisable](/auto-docs/free-layout-editor/interfaces/FlowNodeMeta.md#adddisable)
* [addable](/auto-docs/free-layout-editor/interfaces/FlowNodeMeta.md#addable)
* [autoResizeDisable](/auto-docs/free-layout-editor/interfaces/FlowNodeMeta.md#autoresizedisable)
* [copyDisable](/auto-docs/free-layout-editor/interfaces/FlowNodeMeta.md#copydisable)
* [defaultCollapsed](/auto-docs/free-layout-editor/interfaces/FlowNodeMeta.md#defaultcollapsed)
* [defaultExpanded](/auto-docs/free-layout-editor/interfaces/FlowNodeMeta.md#defaultexpanded)
* [deleteDisable](/auto-docs/free-layout-editor/interfaces/FlowNodeMeta.md#deletedisable)
* [draggable](/auto-docs/free-layout-editor/interfaces/FlowNodeMeta.md#draggable)
* [expandable](/auto-docs/free-layout-editor/interfaces/FlowNodeMeta.md#expandable)
* [hidden](/auto-docs/free-layout-editor/interfaces/FlowNodeMeta.md#hidden)
* [inlineSpacingAfter](/auto-docs/free-layout-editor/interfaces/FlowNodeMeta.md#inlinespacingafter)
* [inlineSpacingPre](/auto-docs/free-layout-editor/interfaces/FlowNodeMeta.md#inlinespacingpre)
* [isInlineBlocks](/auto-docs/free-layout-editor/interfaces/FlowNodeMeta.md#isinlineblocks)
* [isNodeEnd](/auto-docs/free-layout-editor/interfaces/FlowNodeMeta.md#isnodeend)
* [isStart](/auto-docs/free-layout-editor/interfaces/FlowNodeMeta.md#isstart)
* [minInlineBlockSpacing](/auto-docs/free-layout-editor/interfaces/FlowNodeMeta.md#mininlineblockspacing)
* [origin](/auto-docs/free-layout-editor/interfaces/FlowNodeMeta.md#origin)
* [padding](/auto-docs/free-layout-editor/interfaces/FlowNodeMeta.md#padding)
* [renderKey](/auto-docs/free-layout-editor/interfaces/FlowNodeMeta.md#renderkey)
* [selectable](/auto-docs/free-layout-editor/interfaces/FlowNodeMeta.md#selectable)
* [size](/auto-docs/free-layout-editor/interfaces/FlowNodeMeta.md#size)
* [spacing](/auto-docs/free-layout-editor/interfaces/FlowNodeMeta.md#spacing)

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

`Optional` **draggable**: `boolean` | (`node`: [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)) => `boolean`

***

### expandable

`Optional` **expandable**: `boolean`

***

### hidden

`Optional` **hidden**: `boolean`

***

### inlineSpacingAfter

`Optional` **inlineSpacingAfter**: `number` | (`transform`: [`FlowNodeTransformData`](/auto-docs/free-layout-editor/classes/FlowNodeTransformData.md)) => `number`

***

### inlineSpacingPre

`Optional` **inlineSpacingPre**: `number` | (`transform`: [`FlowNodeTransformData`](/auto-docs/free-layout-editor/classes/FlowNodeTransformData.md)) => `number`

***

### isInlineBlocks

`Optional` **isInlineBlocks**: `boolean` | (`node`: [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)) => `boolean`

***

### isNodeEnd

`Optional` **isNodeEnd**: `boolean`

***

### isStart

`Optional` **isStart**: `boolean`

***

### minInlineBlockSpacing

`Optional` **minInlineBlockSpacing**: `number` | (`node`: [`FlowNodeTransformData`](/auto-docs/free-layout-editor/classes/FlowNodeTransformData.md)) => `number`

***

### origin

`Optional` **origin**: [`OriginSchema`](/auto-docs/free-layout-editor/interfaces/OriginSchema.md)

**`Deprecated`**

使用 NodeRegister.getOrigin 代替

***

### padding

`Optional` **padding**: [`PaddingSchema`](/auto-docs/free-layout-editor/interfaces/PaddingSchema-1.md) | (`transform`: [`FlowNodeTransformData`](/auto-docs/free-layout-editor/classes/FlowNodeTransformData.md)) => [`PaddingSchema`](/auto-docs/free-layout-editor/interfaces/PaddingSchema-1.md)

***

### renderKey

`Optional` **renderKey**: `string`

***

### selectable

`Optional` **selectable**: `boolean` | (`node`: [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md), `mousePos?`: [`PositionSchema`](/auto-docs/free-layout-editor/interfaces/PositionSchema.md)) => `boolean`

***

### size

`Optional` **size**: [`SizeSchema`](/auto-docs/free-layout-editor/interfaces/SizeSchema-1.md)

***

### spacing

`Optional` **spacing**: `number` | (`transform`: [`FlowNodeTransformData`](/auto-docs/free-layout-editor/classes/FlowNodeTransformData.md)) => `number`
