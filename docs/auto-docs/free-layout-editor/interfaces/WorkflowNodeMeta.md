# Interface: WorkflowNodeMeta

节点 meta 信息

## Hierarchy

* [`FlowNodeMeta`](/auto-docs/free-layout-editor/interfaces/FlowNodeMeta.md)

  ↳ **`WorkflowNodeMeta`**

## Table of contents

### Properties

* [addDisable](/auto-docs/free-layout-editor/interfaces/WorkflowNodeMeta.md#adddisable)
* [addable](/auto-docs/free-layout-editor/interfaces/WorkflowNodeMeta.md#addable)
* [autoResizeDisable](/auto-docs/free-layout-editor/interfaces/WorkflowNodeMeta.md#autoresizedisable)
* [canvasPosition](/auto-docs/free-layout-editor/interfaces/WorkflowNodeMeta.md#canvasposition)
* [copyDisable](/auto-docs/free-layout-editor/interfaces/WorkflowNodeMeta.md#copydisable)
* [defaultCollapsed](/auto-docs/free-layout-editor/interfaces/WorkflowNodeMeta.md#defaultcollapsed)
* [defaultExpanded](/auto-docs/free-layout-editor/interfaces/WorkflowNodeMeta.md#defaultexpanded)
* [defaultPorts](/auto-docs/free-layout-editor/interfaces/WorkflowNodeMeta.md#defaultports)
* [deleteDisable](/auto-docs/free-layout-editor/interfaces/WorkflowNodeMeta.md#deletedisable)
* [draggable](/auto-docs/free-layout-editor/interfaces/WorkflowNodeMeta.md#draggable)
* [expandable](/auto-docs/free-layout-editor/interfaces/WorkflowNodeMeta.md#expandable)
* [hidden](/auto-docs/free-layout-editor/interfaces/WorkflowNodeMeta.md#hidden)
* [inlineSpacingAfter](/auto-docs/free-layout-editor/interfaces/WorkflowNodeMeta.md#inlinespacingafter)
* [inlineSpacingPre](/auto-docs/free-layout-editor/interfaces/WorkflowNodeMeta.md#inlinespacingpre)
* [inputDisable](/auto-docs/free-layout-editor/interfaces/WorkflowNodeMeta.md#inputdisable)
* [isContainer](/auto-docs/free-layout-editor/interfaces/WorkflowNodeMeta.md#iscontainer)
* [isInlineBlocks](/auto-docs/free-layout-editor/interfaces/WorkflowNodeMeta.md#isinlineblocks)
* [isNodeEnd](/auto-docs/free-layout-editor/interfaces/WorkflowNodeMeta.md#isnodeend)
* [isStart](/auto-docs/free-layout-editor/interfaces/WorkflowNodeMeta.md#isstart)
* [minInlineBlockSpacing](/auto-docs/free-layout-editor/interfaces/WorkflowNodeMeta.md#mininlineblockspacing)
* [origin](/auto-docs/free-layout-editor/interfaces/WorkflowNodeMeta.md#origin)
* [outputDisable](/auto-docs/free-layout-editor/interfaces/WorkflowNodeMeta.md#outputdisable)
* [padding](/auto-docs/free-layout-editor/interfaces/WorkflowNodeMeta.md#padding)
* [position](/auto-docs/free-layout-editor/interfaces/WorkflowNodeMeta.md#position)
* [renderKey](/auto-docs/free-layout-editor/interfaces/WorkflowNodeMeta.md#renderkey)
* [selectable](/auto-docs/free-layout-editor/interfaces/WorkflowNodeMeta.md#selectable)
* [size](/auto-docs/free-layout-editor/interfaces/WorkflowNodeMeta.md#size)
* [spacing](/auto-docs/free-layout-editor/interfaces/WorkflowNodeMeta.md#spacing)
* [subCanvas](/auto-docs/free-layout-editor/interfaces/WorkflowNodeMeta.md#subcanvas)
* [useDynamicPort](/auto-docs/free-layout-editor/interfaces/WorkflowNodeMeta.md#usedynamicport)

## Properties

### addDisable

`Optional` **addDisable**: `boolean`

#### Inherited from

[FlowNodeMeta](/auto-docs/free-layout-editor/interfaces/FlowNodeMeta.md).[addDisable](/auto-docs/free-layout-editor/interfaces/FlowNodeMeta.md#adddisable)

***

### addable

`Optional` **addable**: `boolean`

#### Inherited from

[FlowNodeMeta](/auto-docs/free-layout-editor/interfaces/FlowNodeMeta.md).[addable](/auto-docs/free-layout-editor/interfaces/FlowNodeMeta.md#addable)

***

### autoResizeDisable

`Optional` **autoResizeDisable**: `boolean`

#### Inherited from

[FlowNodeMeta](/auto-docs/free-layout-editor/interfaces/FlowNodeMeta.md).[autoResizeDisable](/auto-docs/free-layout-editor/interfaces/FlowNodeMeta.md#autoresizedisable)

***

### canvasPosition

`Optional` **canvasPosition**: [`IPoint`](/auto-docs/free-layout-editor/interfaces/IPoint.md)

***

### copyDisable

`Optional` **copyDisable**: `boolean`

#### Overrides

[FlowNodeMeta](/auto-docs/free-layout-editor/interfaces/FlowNodeMeta.md).[copyDisable](/auto-docs/free-layout-editor/interfaces/FlowNodeMeta.md#copydisable)

***

### defaultCollapsed

`Optional` **defaultCollapsed**: `boolean`

#### Inherited from

[FlowNodeMeta](/auto-docs/free-layout-editor/interfaces/FlowNodeMeta.md).[defaultCollapsed](/auto-docs/free-layout-editor/interfaces/FlowNodeMeta.md#defaultcollapsed)

***

### defaultExpanded

`Optional` **defaultExpanded**: `boolean`

#### Inherited from

[FlowNodeMeta](/auto-docs/free-layout-editor/interfaces/FlowNodeMeta.md).[defaultExpanded](/auto-docs/free-layout-editor/interfaces/FlowNodeMeta.md#defaultexpanded)

***

### defaultPorts

`Optional` **defaultPorts**: [`WorkflowPorts`](/auto-docs/free-layout-editor/types/WorkflowPorts.md)

***

### deleteDisable

`Optional` **deleteDisable**: `boolean`

#### Overrides

[FlowNodeMeta](/auto-docs/free-layout-editor/interfaces/FlowNodeMeta.md).[deleteDisable](/auto-docs/free-layout-editor/interfaces/FlowNodeMeta.md#deletedisable)

***

### draggable

`Optional` **draggable**: `boolean` | (`node`: [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)) => `boolean`

#### Inherited from

[FlowNodeMeta](/auto-docs/free-layout-editor/interfaces/FlowNodeMeta.md).[draggable](/auto-docs/free-layout-editor/interfaces/FlowNodeMeta.md#draggable)

***

### expandable

`Optional` **expandable**: `boolean`

#### Inherited from

[FlowNodeMeta](/auto-docs/free-layout-editor/interfaces/FlowNodeMeta.md).[expandable](/auto-docs/free-layout-editor/interfaces/FlowNodeMeta.md#expandable)

***

### hidden

`Optional` **hidden**: `boolean`

#### Inherited from

[FlowNodeMeta](/auto-docs/free-layout-editor/interfaces/FlowNodeMeta.md).[hidden](/auto-docs/free-layout-editor/interfaces/FlowNodeMeta.md#hidden)

***

### inlineSpacingAfter

`Optional` **inlineSpacingAfter**: `number` | (`transform`: [`FlowNodeTransformData`](/auto-docs/free-layout-editor/classes/FlowNodeTransformData.md)) => `number`

#### Inherited from

[FlowNodeMeta](/auto-docs/free-layout-editor/interfaces/FlowNodeMeta.md).[inlineSpacingAfter](/auto-docs/free-layout-editor/interfaces/FlowNodeMeta.md#inlinespacingafter)

***

### inlineSpacingPre

`Optional` **inlineSpacingPre**: `number` | (`transform`: [`FlowNodeTransformData`](/auto-docs/free-layout-editor/classes/FlowNodeTransformData.md)) => `number`

#### Inherited from

[FlowNodeMeta](/auto-docs/free-layout-editor/interfaces/FlowNodeMeta.md).[inlineSpacingPre](/auto-docs/free-layout-editor/interfaces/FlowNodeMeta.md#inlinespacingpre)

***

### inputDisable

`Optional` **inputDisable**: `boolean`

***

### isContainer

`Optional` **isContainer**: `boolean`

***

### isInlineBlocks

`Optional` **isInlineBlocks**: `boolean` | (`node`: [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)) => `boolean`

#### Inherited from

[FlowNodeMeta](/auto-docs/free-layout-editor/interfaces/FlowNodeMeta.md).[isInlineBlocks](/auto-docs/free-layout-editor/interfaces/FlowNodeMeta.md#isinlineblocks)

***

### isNodeEnd

`Optional` **isNodeEnd**: `boolean`

#### Inherited from

[FlowNodeMeta](/auto-docs/free-layout-editor/interfaces/FlowNodeMeta.md).[isNodeEnd](/auto-docs/free-layout-editor/interfaces/FlowNodeMeta.md#isnodeend)

***

### isStart

`Optional` **isStart**: `boolean`

#### Inherited from

[FlowNodeMeta](/auto-docs/free-layout-editor/interfaces/FlowNodeMeta.md).[isStart](/auto-docs/free-layout-editor/interfaces/FlowNodeMeta.md#isstart)

***

### minInlineBlockSpacing

`Optional` **minInlineBlockSpacing**: `number` | (`node`: [`FlowNodeTransformData`](/auto-docs/free-layout-editor/classes/FlowNodeTransformData.md)) => `number`

#### Inherited from

[FlowNodeMeta](/auto-docs/free-layout-editor/interfaces/FlowNodeMeta.md).[minInlineBlockSpacing](/auto-docs/free-layout-editor/interfaces/FlowNodeMeta.md#mininlineblockspacing)

***

### origin

`Optional` **origin**: [`OriginSchema`](/auto-docs/free-layout-editor/interfaces/OriginSchema.md)

**`Deprecated`**

使用 NodeRegister.getOrigin 代替

#### Inherited from

[FlowNodeMeta](/auto-docs/free-layout-editor/interfaces/FlowNodeMeta.md).[origin](/auto-docs/free-layout-editor/interfaces/FlowNodeMeta.md#origin)

***

### outputDisable

`Optional` **outputDisable**: `boolean`

***

### padding

`Optional` **padding**: [`PaddingSchema`](/auto-docs/free-layout-editor/interfaces/PaddingSchema-1.md) | (`transform`: [`FlowNodeTransformData`](/auto-docs/free-layout-editor/classes/FlowNodeTransformData.md)) => [`PaddingSchema`](/auto-docs/free-layout-editor/interfaces/PaddingSchema-1.md)

#### Inherited from

[FlowNodeMeta](/auto-docs/free-layout-editor/interfaces/FlowNodeMeta.md).[padding](/auto-docs/free-layout-editor/interfaces/FlowNodeMeta.md#padding)

***

### position

`Optional` **position**: [`IPoint`](/auto-docs/free-layout-editor/interfaces/IPoint.md)

***

### renderKey

`Optional` **renderKey**: `string`

#### Inherited from

[FlowNodeMeta](/auto-docs/free-layout-editor/interfaces/FlowNodeMeta.md).[renderKey](/auto-docs/free-layout-editor/interfaces/FlowNodeMeta.md#renderkey)

***

### selectable

`Optional` **selectable**: `boolean` | (`node`: [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md), `mousePos?`: [`PositionSchema`](/auto-docs/free-layout-editor/interfaces/PositionSchema.md)) => `boolean`

#### Inherited from

[FlowNodeMeta](/auto-docs/free-layout-editor/interfaces/FlowNodeMeta.md).[selectable](/auto-docs/free-layout-editor/interfaces/FlowNodeMeta.md#selectable)

***

### size

`Optional` **size**: [`SizeSchema`](/auto-docs/free-layout-editor/interfaces/SizeSchema-1.md)

#### Inherited from

[FlowNodeMeta](/auto-docs/free-layout-editor/interfaces/FlowNodeMeta.md).[size](/auto-docs/free-layout-editor/interfaces/FlowNodeMeta.md#size)

***

### spacing

`Optional` **spacing**: `number` | (`transform`: [`FlowNodeTransformData`](/auto-docs/free-layout-editor/classes/FlowNodeTransformData.md)) => `number`

#### Inherited from

[FlowNodeMeta](/auto-docs/free-layout-editor/interfaces/FlowNodeMeta.md).[spacing](/auto-docs/free-layout-editor/interfaces/FlowNodeMeta.md#spacing)

***

### subCanvas

`Optional` **subCanvas**: (`node`: [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)) => `undefined` | [`WorkflowSubCanvas`](/auto-docs/free-layout-editor/types/WorkflowSubCanvas.md)

#### Type declaration

(`node`): `undefined` | [`WorkflowSubCanvas`](/auto-docs/free-layout-editor/types/WorkflowSubCanvas.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) |

##### Returns

`undefined` | [`WorkflowSubCanvas`](/auto-docs/free-layout-editor/types/WorkflowSubCanvas.md)

***

### useDynamicPort

`Optional` **useDynamicPort**: `boolean`
