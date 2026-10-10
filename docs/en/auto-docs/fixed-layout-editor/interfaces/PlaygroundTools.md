# Interface: PlaygroundTools

## Table of contents

### Properties

* [canRedo](/en/auto-docs/fixed-layout-editor/interfaces/PlaygroundTools.md#canredo)
* [canUndo](/en/auto-docs/fixed-layout-editor/interfaces/PlaygroundTools.md#canundo)
* [changeLayout](/en/auto-docs/fixed-layout-editor/interfaces/PlaygroundTools.md#changelayout)
* [fitView](/en/auto-docs/fixed-layout-editor/interfaces/PlaygroundTools.md#fitview)
* [interactiveType](/en/auto-docs/fixed-layout-editor/interfaces/PlaygroundTools.md#interactivetype)
* [isVertical](/en/auto-docs/fixed-layout-editor/interfaces/PlaygroundTools.md#isvertical)
* [redo](/en/auto-docs/fixed-layout-editor/interfaces/PlaygroundTools.md#redo)
* [setInteractiveType](/en/auto-docs/fixed-layout-editor/interfaces/PlaygroundTools.md#setinteractivetype)
* [undo](/en/auto-docs/fixed-layout-editor/interfaces/PlaygroundTools.md#undo)
* [updateZoom](/en/auto-docs/fixed-layout-editor/interfaces/PlaygroundTools.md#updatezoom)
* [zoom](/en/auto-docs/fixed-layout-editor/interfaces/PlaygroundTools.md#zoom)
* [zoomin](/en/auto-docs/fixed-layout-editor/interfaces/PlaygroundTools.md#zoomin)
* [zoomout](/en/auto-docs/fixed-layout-editor/interfaces/PlaygroundTools.md#zoomout)

## Properties

### canRedo

**canRedo**: `boolean`

是否可 redo

***

### canUndo

**canUndo**: `boolean`

是否可 undo

***

### changeLayout

**changeLayout**: (`layout?`: [`FlowLayoutDefault`](/en/auto-docs/fixed-layout-editor/enums/FlowLayoutDefault-1.md)) => `void`

#### Type declaration

(`layout?`): `void`

切换布局, 如果不传入则直接切换

##### Parameters

| Name | Type |
| :------ | :------ |
| `layout?` | [`FlowLayoutDefault`](/en/auto-docs/fixed-layout-editor/enums/FlowLayoutDefault-1.md) |

##### Returns

`void`

***

### fitView

**fitView**: (`easing?`: `boolean`, `easingDuration?`: `number`, `padding?`: `number`) => `Promise`<`void`>

#### Type declaration

(`easing?`, `easingDuration?`, `padding?`): `Promise`<`void`>

自适应视区

##### Parameters

| Name | Type |
| :------ | :------ |
| `easing?` | `boolean` |
| `easingDuration?` | `number` |
| `padding?` | `number` |

##### Returns

`Promise`<`void`>

***

### interactiveType

**interactiveType**: [`PlaygroundInteractiveType`](/en/auto-docs/fixed-layout-editor/types/PlaygroundInteractiveType.md)

交互模式：鼠标 or 触控板

***

### isVertical

**isVertical**: `boolean`

是否垂直布局

***

### redo

**redo**: () => `void`

#### Type declaration

(): `void`

redo

##### Returns

`void`

***

### setInteractiveType

**setInteractiveType**: (`type`: [`PlaygroundInteractiveType`](/en/auto-docs/fixed-layout-editor/types/PlaygroundInteractiveType.md)) => `void`

#### Type declaration

(`type`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `type` | [`PlaygroundInteractiveType`](/en/auto-docs/fixed-layout-editor/types/PlaygroundInteractiveType.md) |

##### Returns

`void`

***

### undo

**undo**: () => `void`

#### Type declaration

(): `void`

undo

##### Returns

`void`

***

### updateZoom

**updateZoom**: (`newZoom`: `number`, `easing?`: `boolean`, `easingDuration?`: `number`) => `void`

#### Type declaration

(`newZoom`, `easing?`, `easingDuration?`): `void`

设置缩放比例

##### Parameters

| Name | Type |
| :------ | :------ |
| `newZoom` | `number` |
| `easing?` | `boolean` |
| `easingDuration?` | `number` |

##### Returns

`void`

***

### zoom

**zoom**: `number`

缩放 zoom 大小比例

***

### zoomin

**zoomin**: (`easing?`: `boolean`) => `void`

#### Type declaration

(`easing?`): `void`

放大

##### Parameters

| Name | Type |
| :------ | :------ |
| `easing?` | `boolean` |

##### Returns

`void`

***

### zoomout

**zoomout**: (`easing?`: `boolean`) => `void`

#### Type declaration

(`easing?`): `void`

缩小

##### Parameters

| Name | Type |
| :------ | :------ |
| `easing?` | `boolean` |

##### Returns

`void`
