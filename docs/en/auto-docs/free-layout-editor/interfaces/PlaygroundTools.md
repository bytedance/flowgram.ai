# Interface: PlaygroundTools

## Table of contents

### Properties

* [autoLayout](/en/auto-docs/free-layout-editor/interfaces/PlaygroundTools.md#autolayout)
* [cursorState](/en/auto-docs/free-layout-editor/interfaces/PlaygroundTools.md#cursorstate)
* [fitView](/en/auto-docs/free-layout-editor/interfaces/PlaygroundTools.md#fitview)
* [interactiveType](/en/auto-docs/free-layout-editor/interfaces/PlaygroundTools.md#interactivetype)
* [lineType](/en/auto-docs/free-layout-editor/interfaces/PlaygroundTools.md#linetype)
* [setCursorState](/en/auto-docs/free-layout-editor/interfaces/PlaygroundTools.md#setcursorstate)
* [setInteractiveType](/en/auto-docs/free-layout-editor/interfaces/PlaygroundTools.md#setinteractivetype)
* [setMouseScrollDelta](/en/auto-docs/free-layout-editor/interfaces/PlaygroundTools.md#setmousescrolldelta)
* [switchLineType](/en/auto-docs/free-layout-editor/interfaces/PlaygroundTools.md#switchlinetype)
* [zoom](/en/auto-docs/free-layout-editor/interfaces/PlaygroundTools.md#zoom)
* [zoomin](/en/auto-docs/free-layout-editor/interfaces/PlaygroundTools.md#zoomin)
* [zoomout](/en/auto-docs/free-layout-editor/interfaces/PlaygroundTools.md#zoomout)

## Properties

### autoLayout

**autoLayout**: (`options?`: `LayoutOptions`) => `Promise`<[`AutoLayoutResetFn`](/en/auto-docs/free-layout-editor/types/AutoLayoutResetFn.md)>

#### Type declaration

(`options?`): `Promise`<[`AutoLayoutResetFn`](/en/auto-docs/free-layout-editor/types/AutoLayoutResetFn.md)>

Auto layout tool - 自动布局工具
https://flowgram.ai/guide/plugin/free-auto-layout-plugin.html

##### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `LayoutOptions` |

##### Returns

`Promise`<[`AutoLayoutResetFn`](/en/auto-docs/free-layout-editor/types/AutoLayoutResetFn.md)>

***

### cursorState

**cursorState**: [`EditorCursorState`](/en/auto-docs/free-layout-editor/enums/EditorCursorState.md)

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

**interactiveType**: [`InteractiveType`](/en/auto-docs/free-layout-editor/enums/InteractiveType.md)

交互模式：鼠标 or 触控板

***

### lineType

**lineType**: [`LineRenderType`](/en/auto-docs/free-layout-editor/types/LineRenderType.md)

***

### setCursorState

**setCursorState**: (`stateId`: [`EditorCursorState`](/en/auto-docs/free-layout-editor/enums/EditorCursorState.md) | `SetCursorStateCallback`) => `void`

#### Type declaration

(`stateId`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `stateId` | [`EditorCursorState`](/en/auto-docs/free-layout-editor/enums/EditorCursorState.md) | `SetCursorStateCallback` |

##### Returns

`void`

***

### setInteractiveType

**setInteractiveType**: (`type`: [`InteractiveType`](/en/auto-docs/free-layout-editor/enums/InteractiveType.md)) => `void`

#### Type declaration

(`type`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `type` | [`InteractiveType`](/en/auto-docs/free-layout-editor/enums/InteractiveType.md) |

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

**switchLineType**: (`lineType?`: [`LineRenderType`](/en/auto-docs/free-layout-editor/types/LineRenderType.md)) => [`LineRenderType`](/en/auto-docs/free-layout-editor/types/LineRenderType.md)

#### Type declaration

(`lineType?`): [`LineRenderType`](/en/auto-docs/free-layout-editor/types/LineRenderType.md)

切换线条

##### Parameters

| Name | Type |
| :------ | :------ |
| `lineType?` | [`LineRenderType`](/en/auto-docs/free-layout-editor/types/LineRenderType.md) |

##### Returns

[`LineRenderType`](/en/auto-docs/free-layout-editor/types/LineRenderType.md)

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
