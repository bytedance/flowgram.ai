# Interface: PlaygroundTools

## Table of contents

### Properties

* [autoLayout](/auto-docs/free-layout-editor/interfaces/PlaygroundTools.md#autolayout)
* [cursorState](/auto-docs/free-layout-editor/interfaces/PlaygroundTools.md#cursorstate)
* [fitView](/auto-docs/free-layout-editor/interfaces/PlaygroundTools.md#fitview)
* [interactiveType](/auto-docs/free-layout-editor/interfaces/PlaygroundTools.md#interactivetype)
* [lineType](/auto-docs/free-layout-editor/interfaces/PlaygroundTools.md#linetype)
* [setCursorState](/auto-docs/free-layout-editor/interfaces/PlaygroundTools.md#setcursorstate)
* [setInteractiveType](/auto-docs/free-layout-editor/interfaces/PlaygroundTools.md#setinteractivetype)
* [setMouseScrollDelta](/auto-docs/free-layout-editor/interfaces/PlaygroundTools.md#setmousescrolldelta)
* [switchLineType](/auto-docs/free-layout-editor/interfaces/PlaygroundTools.md#switchlinetype)
* [zoom](/auto-docs/free-layout-editor/interfaces/PlaygroundTools.md#zoom)
* [zoomin](/auto-docs/free-layout-editor/interfaces/PlaygroundTools.md#zoomin)
* [zoomout](/auto-docs/free-layout-editor/interfaces/PlaygroundTools.md#zoomout)

## Properties

### autoLayout

**autoLayout**: (`options?`: `LayoutOptions`) => `Promise`<[`AutoLayoutResetFn`](/auto-docs/free-layout-editor/types/AutoLayoutResetFn.md)>

#### Type declaration

(`options?`): `Promise`<[`AutoLayoutResetFn`](/auto-docs/free-layout-editor/types/AutoLayoutResetFn.md)>

Auto layout tool - 自动布局工具
https://flowgram.ai/guide/plugin/free-auto-layout-plugin.html

##### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `LayoutOptions` |

##### Returns

`Promise`<[`AutoLayoutResetFn`](/auto-docs/free-layout-editor/types/AutoLayoutResetFn.md)>

***

### cursorState

**cursorState**: [`EditorCursorState`](/auto-docs/free-layout-editor/enums/EditorCursorState.md)

***

### fitView

**fitView**: (`easing?`: `boolean`) => `void`

#### Type declaration

(`easing?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `easing?` | `boolean` |

##### Returns

`void`

***

### interactiveType

**interactiveType**: [`InteractiveType`](/auto-docs/free-layout-editor/enums/InteractiveType.md)

交互模式：鼠标 or 触控板

***

### lineType

**lineType**: [`LineRenderType`](/auto-docs/free-layout-editor/types/LineRenderType.md)

***

### setCursorState

**setCursorState**: (`stateId`: [`EditorCursorState`](/auto-docs/free-layout-editor/enums/EditorCursorState.md) | `SetCursorStateCallback`) => `void`

#### Type declaration

(`stateId`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `stateId` | [`EditorCursorState`](/auto-docs/free-layout-editor/enums/EditorCursorState.md) | `SetCursorStateCallback` |

##### Returns

`void`

***

### setInteractiveType

**setInteractiveType**: (`type`: [`InteractiveType`](/auto-docs/free-layout-editor/enums/InteractiveType.md)) => `void`

#### Type declaration

(`type`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `type` | [`InteractiveType`](/auto-docs/free-layout-editor/enums/InteractiveType.md) |

##### Returns

`void`

***

### setMouseScrollDelta

**setMouseScrollDelta**: (`mouseScrollDelta`: `number` | (`zoom`: `number`) => `number`) => `void`

#### Type declaration

(`mouseScrollDelta`): `void`

设置鼠标缩放 delta

##### Parameters

| Name | Type |
| :------ | :------ |
| `mouseScrollDelta` | `number` | (`zoom`: `number`) => `number` |

##### Returns

`void`

***

### switchLineType

**switchLineType**: (`lineType?`: [`LineRenderType`](/auto-docs/free-layout-editor/types/LineRenderType.md)) => [`LineRenderType`](/auto-docs/free-layout-editor/types/LineRenderType.md)

#### Type declaration

(`lineType?`): [`LineRenderType`](/auto-docs/free-layout-editor/types/LineRenderType.md)

切换线条

##### Parameters

| Name | Type |
| :------ | :------ |
| `lineType?` | [`LineRenderType`](/auto-docs/free-layout-editor/types/LineRenderType.md) |

##### Returns

[`LineRenderType`](/auto-docs/free-layout-editor/types/LineRenderType.md)

***

### zoom

**zoom**: `number`

***

### zoomin

**zoomin**: (`easing?`: `boolean`) => `void`

#### Type declaration

(`easing?`): `void`

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

##### Parameters

| Name | Type |
| :------ | :------ |
| `easing?` | `boolean` |

##### Returns

`void`
