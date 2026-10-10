# Interface: FlowNodeMeta

节点渲染相关配置信息，可扩展

## Indexable

▪ \[key: `string`]: `any`

## Table of contents

### Properties

* [addDisable](/en/auto-docs/document/interfaces/FlowNodeMeta.md#adddisable)
* [addable](/en/auto-docs/document/interfaces/FlowNodeMeta.md#addable)
* [autoResizeDisable](/en/auto-docs/document/interfaces/FlowNodeMeta.md#autoresizedisable)
* [copyDisable](/en/auto-docs/document/interfaces/FlowNodeMeta.md#copydisable)
* [defaultCollapsed](/en/auto-docs/document/interfaces/FlowNodeMeta.md#defaultcollapsed)
* [defaultExpanded](/en/auto-docs/document/interfaces/FlowNodeMeta.md#defaultexpanded)
* [deleteDisable](/en/auto-docs/document/interfaces/FlowNodeMeta.md#deletedisable)
* [draggable](/en/auto-docs/document/interfaces/FlowNodeMeta.md#draggable)
* [expandable](/en/auto-docs/document/interfaces/FlowNodeMeta.md#expandable)
* [hidden](/en/auto-docs/document/interfaces/FlowNodeMeta.md#hidden)
* [inlineSpacingAfter](/en/auto-docs/document/interfaces/FlowNodeMeta.md#inlinespacingafter)
* [inlineSpacingPre](/en/auto-docs/document/interfaces/FlowNodeMeta.md#inlinespacingpre)
* [isInlineBlocks](/en/auto-docs/document/interfaces/FlowNodeMeta.md#isinlineblocks)
* [isNodeEnd](/en/auto-docs/document/interfaces/FlowNodeMeta.md#isnodeend)
* [isStart](/en/auto-docs/document/interfaces/FlowNodeMeta.md#isstart)
* [minInlineBlockSpacing](/en/auto-docs/document/interfaces/FlowNodeMeta.md#mininlineblockspacing)
* [origin](/en/auto-docs/document/interfaces/FlowNodeMeta.md#origin)
* [padding](/en/auto-docs/document/interfaces/FlowNodeMeta.md#padding)
* [renderKey](/en/auto-docs/document/interfaces/FlowNodeMeta.md#renderkey)
* [selectable](/en/auto-docs/document/interfaces/FlowNodeMeta.md#selectable)
* [size](/en/auto-docs/document/interfaces/FlowNodeMeta.md#size)
* [spacing](/en/auto-docs/document/interfaces/FlowNodeMeta.md#spacing)

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

`Optional` **draggable**: `boolean` | (`node`: [`FlowNodeEntity`](/en/auto-docs/document/classes/FlowNodeEntity-1.md)) => `boolean`

***

### expandable

`Optional` **expandable**: `boolean`

***

### hidden

`Optional` **hidden**: `boolean`

***

### inlineSpacingAfter

`Optional` **inlineSpacingAfter**: `number` | (`transform`: [`FlowNodeTransformData`](/en/auto-docs/document/classes/FlowNodeTransformData.md)) => `number`

***

### inlineSpacingPre

`Optional` **inlineSpacingPre**: `number` | (`transform`: [`FlowNodeTransformData`](/en/auto-docs/document/classes/FlowNodeTransformData.md)) => `number`

***

### isInlineBlocks

`Optional` **isInlineBlocks**: `boolean` | (`node`: [`FlowNodeEntity`](/en/auto-docs/document/classes/FlowNodeEntity-1.md)) => `boolean`

***

### isNodeEnd

`Optional` **isNodeEnd**: `boolean`

***

### isStart

`Optional` **isStart**: `boolean`

***

### minInlineBlockSpacing

`Optional` **minInlineBlockSpacing**: `number` | (`node`: [`FlowNodeTransformData`](/en/auto-docs/document/classes/FlowNodeTransformData.md)) => `number`

***

### origin

`Optional` **origin**: `OriginSchema`

**`Deprecated`**

使用 NodeRegister.getOrigin 代替

***

### padding

`Optional` **padding**: `PaddingSchema` | (`transform`: [`FlowNodeTransformData`](/en/auto-docs/document/classes/FlowNodeTransformData.md)) => `PaddingSchema`

***

### renderKey

`Optional` **renderKey**: `string`

***

### selectable

`Optional` **selectable**: `boolean` | (`node`: [`FlowNodeEntity`](/en/auto-docs/document/classes/FlowNodeEntity-1.md), `mousePos?`: `PositionSchema`) => `boolean`

***

### size

`Optional` **size**: `SizeSchema`

***

### spacing

`Optional` **spacing**: `number` | (`transform`: [`FlowNodeTransformData`](/en/auto-docs/document/classes/FlowNodeTransformData.md)) => `number`
