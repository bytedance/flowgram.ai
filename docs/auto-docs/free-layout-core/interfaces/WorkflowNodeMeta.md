# Interface: WorkflowNodeMeta

节点 meta 信息

## Hierarchy

* `FlowNodeMeta`

  ↳ **`WorkflowNodeMeta`**

## Table of contents

### Properties

* [addDisable](/auto-docs/free-layout-core/interfaces/WorkflowNodeMeta.md#adddisable)
* [addable](/auto-docs/free-layout-core/interfaces/WorkflowNodeMeta.md#addable)
* [autoResizeDisable](/auto-docs/free-layout-core/interfaces/WorkflowNodeMeta.md#autoresizedisable)
* [canvasPosition](/auto-docs/free-layout-core/interfaces/WorkflowNodeMeta.md#canvasposition)
* [copyDisable](/auto-docs/free-layout-core/interfaces/WorkflowNodeMeta.md#copydisable)
* [defaultCollapsed](/auto-docs/free-layout-core/interfaces/WorkflowNodeMeta.md#defaultcollapsed)
* [defaultExpanded](/auto-docs/free-layout-core/interfaces/WorkflowNodeMeta.md#defaultexpanded)
* [defaultPorts](/auto-docs/free-layout-core/interfaces/WorkflowNodeMeta.md#defaultports)
* [deleteDisable](/auto-docs/free-layout-core/interfaces/WorkflowNodeMeta.md#deletedisable)
* [draggable](/auto-docs/free-layout-core/interfaces/WorkflowNodeMeta.md#draggable)
* [expandable](/auto-docs/free-layout-core/interfaces/WorkflowNodeMeta.md#expandable)
* [hidden](/auto-docs/free-layout-core/interfaces/WorkflowNodeMeta.md#hidden)
* [inlineSpacingAfter](/auto-docs/free-layout-core/interfaces/WorkflowNodeMeta.md#inlinespacingafter)
* [inlineSpacingPre](/auto-docs/free-layout-core/interfaces/WorkflowNodeMeta.md#inlinespacingpre)
* [inputDisable](/auto-docs/free-layout-core/interfaces/WorkflowNodeMeta.md#inputdisable)
* [isContainer](/auto-docs/free-layout-core/interfaces/WorkflowNodeMeta.md#iscontainer)
* [isInlineBlocks](/auto-docs/free-layout-core/interfaces/WorkflowNodeMeta.md#isinlineblocks)
* [isNodeEnd](/auto-docs/free-layout-core/interfaces/WorkflowNodeMeta.md#isnodeend)
* [isStart](/auto-docs/free-layout-core/interfaces/WorkflowNodeMeta.md#isstart)
* [minInlineBlockSpacing](/auto-docs/free-layout-core/interfaces/WorkflowNodeMeta.md#mininlineblockspacing)
* [origin](/auto-docs/free-layout-core/interfaces/WorkflowNodeMeta.md#origin)
* [outputDisable](/auto-docs/free-layout-core/interfaces/WorkflowNodeMeta.md#outputdisable)
* [padding](/auto-docs/free-layout-core/interfaces/WorkflowNodeMeta.md#padding)
* [position](/auto-docs/free-layout-core/interfaces/WorkflowNodeMeta.md#position)
* [renderKey](/auto-docs/free-layout-core/interfaces/WorkflowNodeMeta.md#renderkey)
* [selectable](/auto-docs/free-layout-core/interfaces/WorkflowNodeMeta.md#selectable)
* [size](/auto-docs/free-layout-core/interfaces/WorkflowNodeMeta.md#size)
* [spacing](/auto-docs/free-layout-core/interfaces/WorkflowNodeMeta.md#spacing)
* [subCanvas](/auto-docs/free-layout-core/interfaces/WorkflowNodeMeta.md#subcanvas)
* [useDynamicPort](/auto-docs/free-layout-core/interfaces/WorkflowNodeMeta.md#usedynamicport)

## Properties

### addDisable

`Optional` **addDisable**: `boolean`

#### Inherited from

FlowNodeMeta.addDisable

***

### addable

`Optional` **addable**: `boolean`

#### Inherited from

FlowNodeMeta.addable

***

### autoResizeDisable

`Optional` **autoResizeDisable**: `boolean`

#### Inherited from

FlowNodeMeta.autoResizeDisable

***

### canvasPosition

`Optional` **canvasPosition**: `IPoint`

***

### copyDisable

`Optional` **copyDisable**: `boolean`

#### Overrides

FlowNodeMeta.copyDisable

***

### defaultCollapsed

`Optional` **defaultCollapsed**: `boolean`

#### Inherited from

FlowNodeMeta.defaultCollapsed

***

### defaultExpanded

`Optional` **defaultExpanded**: `boolean`

#### Inherited from

FlowNodeMeta.defaultExpanded

***

### defaultPorts

`Optional` **defaultPorts**: [`WorkflowPorts`](/auto-docs/free-layout-core/types/WorkflowPorts.md)

***

### deleteDisable

`Optional` **deleteDisable**: `boolean`

#### Overrides

FlowNodeMeta.deleteDisable

***

### draggable

`Optional` **draggable**: `boolean` | (`node`: `FlowNodeEntity`) => `boolean`

#### Inherited from

FlowNodeMeta.draggable

***

### expandable

`Optional` **expandable**: `boolean`

#### Inherited from

FlowNodeMeta.expandable

***

### hidden

`Optional` **hidden**: `boolean`

#### Inherited from

FlowNodeMeta.hidden

***

### inlineSpacingAfter

`Optional` **inlineSpacingAfter**: `number` | (`transform`: `FlowNodeTransformData`) => `number`

#### Inherited from

FlowNodeMeta.inlineSpacingAfter

***

### inlineSpacingPre

`Optional` **inlineSpacingPre**: `number` | (`transform`: `FlowNodeTransformData`) => `number`

#### Inherited from

FlowNodeMeta.inlineSpacingPre

***

### inputDisable

`Optional` **inputDisable**: `boolean`

***

### isContainer

`Optional` **isContainer**: `boolean`

***

### isInlineBlocks

`Optional` **isInlineBlocks**: `boolean` | (`node`: `FlowNodeEntity`) => `boolean`

#### Inherited from

FlowNodeMeta.isInlineBlocks

***

### isNodeEnd

`Optional` **isNodeEnd**: `boolean`

#### Inherited from

FlowNodeMeta.isNodeEnd

***

### isStart

`Optional` **isStart**: `boolean`

#### Inherited from

FlowNodeMeta.isStart

***

### minInlineBlockSpacing

`Optional` **minInlineBlockSpacing**: `number` | (`node`: `FlowNodeTransformData`) => `number`

#### Inherited from

FlowNodeMeta.minInlineBlockSpacing

***

### origin

`Optional` **origin**: `OriginSchema`

**`Deprecated`**

使用 NodeRegister.getOrigin 代替

#### Inherited from

FlowNodeMeta.origin

***

### outputDisable

`Optional` **outputDisable**: `boolean`

***

### padding

`Optional` **padding**: `PaddingSchema` | (`transform`: `FlowNodeTransformData`) => `PaddingSchema`

#### Inherited from

FlowNodeMeta.padding

***

### position

`Optional` **position**: `IPoint`

***

### renderKey

`Optional` **renderKey**: `string`

#### Inherited from

FlowNodeMeta.renderKey

***

### selectable

`Optional` **selectable**: `boolean` | (`node`: `FlowNodeEntity`, `mousePos?`: `PositionSchema`) => `boolean`

#### Inherited from

FlowNodeMeta.selectable

***

### size

`Optional` **size**: `SizeSchema`

#### Inherited from

FlowNodeMeta.size

***

### spacing

`Optional` **spacing**: `number` | (`transform`: `FlowNodeTransformData`) => `number`

#### Inherited from

FlowNodeMeta.spacing

***

### subCanvas

`Optional` **subCanvas**: (`node`: `FlowNodeEntity`) => `undefined` | [`WorkflowSubCanvas`](/auto-docs/free-layout-core/types/WorkflowSubCanvas.md)

#### Type declaration

(`node`): `undefined` | [`WorkflowSubCanvas`](/auto-docs/free-layout-core/types/WorkflowSubCanvas.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `FlowNodeEntity` |

##### Returns

`undefined` | [`WorkflowSubCanvas`](/auto-docs/free-layout-core/types/WorkflowSubCanvas.md)

***

### useDynamicPort

`Optional` **useDynamicPort**: `boolean`
