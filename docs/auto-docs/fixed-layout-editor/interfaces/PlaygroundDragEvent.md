# Interface: PlaygroundDragEvent

## Hierarchy

* `MouseEvent`

  ↳ **`PlaygroundDragEvent`**

  ↳↳ [`SelectorBoxConfigData`](/auto-docs/fixed-layout-editor/interfaces/SelectorBoxConfigData.md)

## Table of contents

### Properties

* [AT\_TARGET](/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragEvent.md#at_target)
* [BUBBLING\_PHASE](/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragEvent.md#bubbling_phase)
* [CAPTURING\_PHASE](/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragEvent.md#capturing_phase)
* [NONE](/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragEvent.md#none)
* [altKey](/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragEvent.md#altkey)
* [bubbles](/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragEvent.md#bubbles)
* [button](/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragEvent.md#button)
* [buttons](/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragEvent.md#buttons)
* [cancelBubble](/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragEvent.md#cancelbubble)
* [cancelable](/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragEvent.md#cancelable)
* [clientX](/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragEvent.md#clientx)
* [clientY](/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragEvent.md#clienty)
* [composed](/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragEvent.md#composed)
* [ctrlKey](/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragEvent.md#ctrlkey)
* [currentTarget](/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragEvent.md#currenttarget)
* [defaultPrevented](/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragEvent.md#defaultprevented)
* [detail](/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragEvent.md#detail)
* [endPos](/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragEvent.md#endpos)
* [eventPhase](/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragEvent.md#eventphase)
* [id](/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragEvent.md#id)
* [isMoving](/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragEvent.md#ismoving)
* [isStart](/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragEvent.md#isstart)
* [isTrusted](/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragEvent.md#istrusted)
* [metaKey](/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragEvent.md#metakey)
* [movementX](/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragEvent.md#movementx)
* [movementY](/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragEvent.md#movementy)
* [movingDelta](/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragEvent.md#movingdelta)
* [offsetX](/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragEvent.md#offsetx)
* [offsetY](/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragEvent.md#offsety)
* [pageX](/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragEvent.md#pagex)
* [pageY](/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragEvent.md#pagey)
* [relatedTarget](/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragEvent.md#relatedtarget)
* [returnValue](/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragEvent.md#returnvalue)
* [scale](/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragEvent.md#scale)
* [screenX](/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragEvent.md#screenx)
* [screenY](/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragEvent.md#screeny)
* [shiftKey](/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragEvent.md#shiftkey)
* [srcElement](/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragEvent.md#srcelement)
* [startPos](/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragEvent.md#startpos)
* [target](/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragEvent.md#target)
* [timeStamp](/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragEvent.md#timestamp)
* [type](/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragEvent.md#type)
* [view](/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragEvent.md#view)
* [which](/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragEvent.md#which)
* [x](/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragEvent.md#x)
* [y](/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragEvent.md#y)

### Methods

* [composedPath](/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragEvent.md#composedpath)
* [getModifierState](/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragEvent.md#getmodifierstate)
* [initEvent](/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragEvent.md#initevent)
* [initMouseEvent](/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragEvent.md#initmouseevent)
* [initUIEvent](/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragEvent.md#inituievent)
* [preventDefault](/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragEvent.md#preventdefault)
* [stopImmediatePropagation](/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragEvent.md#stopimmediatepropagation)
* [stopPropagation](/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragEvent.md#stoppropagation)

## Properties

### AT\_TARGET

`Readonly` **AT\_TARGET**: `2`

#### Inherited from

MouseEvent.AT\_TARGET

***

### BUBBLING\_PHASE

`Readonly` **BUBBLING\_PHASE**: `3`

#### Inherited from

MouseEvent.BUBBLING\_PHASE

***

### CAPTURING\_PHASE

`Readonly` **CAPTURING\_PHASE**: `1`

#### Inherited from

MouseEvent.CAPTURING\_PHASE

***

### NONE

`Readonly` **NONE**: `0`

#### Inherited from

MouseEvent.NONE

***

### altKey

`Readonly` **altKey**: `boolean`

#### Inherited from

MouseEvent.altKey

***

### bubbles

`Readonly` **bubbles**: `boolean`

Returns true or false depending on how event was initialized. True if event goes through its target's ancestors in reverse tree order, and false otherwise.

#### Inherited from

MouseEvent.bubbles

***

### button

`Readonly` **button**: `number`

#### Inherited from

MouseEvent.button

***

### buttons

`Readonly` **buttons**: `number`

#### Inherited from

MouseEvent.buttons

***

### cancelBubble

**cancelBubble**: `boolean`

**`Deprecated`**

#### Inherited from

MouseEvent.cancelBubble

***

### cancelable

`Readonly` **cancelable**: `boolean`

Returns true or false depending on how event was initialized. Its return value does not always carry meaning, but true can indicate that part of the operation during which event was dispatched, can be canceled by invoking the preventDefault() method.

#### Inherited from

MouseEvent.cancelable

***

### clientX

`Readonly` **clientX**: `number`

#### Inherited from

MouseEvent.clientX

***

### clientY

`Readonly` **clientY**: `number`

#### Inherited from

MouseEvent.clientY

***

### composed

`Readonly` **composed**: `boolean`

Returns true or false depending on how event was initialized. True if event invokes listeners past a ShadowRoot node that is the root of its target, and false otherwise.

#### Inherited from

MouseEvent.composed

***

### ctrlKey

`Readonly` **ctrlKey**: `boolean`

#### Inherited from

MouseEvent.ctrlKey

***

### currentTarget

`Readonly` **currentTarget**: `null` | `EventTarget`

Returns the object whose event listener's callback is currently being invoked.

#### Inherited from

MouseEvent.currentTarget

***

### defaultPrevented

`Readonly` **defaultPrevented**: `boolean`

Returns true if preventDefault() was invoked successfully to indicate cancelation, and false otherwise.

#### Inherited from

MouseEvent.defaultPrevented

***

### detail

`Readonly` **detail**: `number`

#### Inherited from

MouseEvent.detail

***

### endPos

**endPos**: [`PositionSchema`](/auto-docs/fixed-layout-editor/interfaces/PositionSchema.md)

***

### eventPhase

`Readonly` **eventPhase**: `number`

Returns the event's phase, which is one of NONE, CAPTURING\_PHASE, AT\_TARGET, and BUBBLING\_PHASE.

#### Inherited from

MouseEvent.eventPhase

***

### id

**id**: `number`

***

### isMoving

**isMoving**: `boolean`

***

### isStart

**isStart**: `boolean`

***

### isTrusted

`Readonly` **isTrusted**: `boolean`

Returns true if event was dispatched by the user agent, and false otherwise.

#### Inherited from

MouseEvent.isTrusted

***

### metaKey

`Readonly` **metaKey**: `boolean`

#### Inherited from

MouseEvent.metaKey

***

### movementX

`Readonly` **movementX**: `number`

#### Inherited from

MouseEvent.movementX

***

### movementY

`Readonly` **movementY**: `number`

#### Inherited from

MouseEvent.movementY

***

### movingDelta

**movingDelta**: [`PositionSchema`](/auto-docs/fixed-layout-editor/interfaces/PositionSchema.md)

***

### offsetX

`Readonly` **offsetX**: `number`

#### Inherited from

MouseEvent.offsetX

***

### offsetY

`Readonly` **offsetY**: `number`

#### Inherited from

MouseEvent.offsetY

***

### pageX

`Readonly` **pageX**: `number`

#### Inherited from

MouseEvent.pageX

***

### pageY

`Readonly` **pageY**: `number`

#### Inherited from

MouseEvent.pageY

***

### relatedTarget

`Readonly` **relatedTarget**: `null` | `EventTarget`

#### Inherited from

MouseEvent.relatedTarget

***

### returnValue

**returnValue**: `boolean`

**`Deprecated`**

#### Inherited from

MouseEvent.returnValue

***

### scale

**scale**: `number`

***

### screenX

`Readonly` **screenX**: `number`

#### Inherited from

MouseEvent.screenX

***

### screenY

`Readonly` **screenY**: `number`

#### Inherited from

MouseEvent.screenY

***

### shiftKey

`Readonly` **shiftKey**: `boolean`

#### Inherited from

MouseEvent.shiftKey

***

### srcElement

`Readonly` **srcElement**: `null` | `EventTarget`

**`Deprecated`**

#### Inherited from

MouseEvent.srcElement

***

### startPos

**startPos**: [`PositionSchema`](/auto-docs/fixed-layout-editor/interfaces/PositionSchema.md)

***

### target

`Readonly` **target**: `null` | `EventTarget`

Returns the object to which event is dispatched (its target).

#### Inherited from

MouseEvent.target

***

### timeStamp

`Readonly` **timeStamp**: `number`

Returns the event's timestamp as the number of milliseconds measured relative to the time origin.

#### Inherited from

MouseEvent.timeStamp

***

### type

`Readonly` **type**: `string`

Returns the type of event, e.g. "click", "hashchange", or "submit".

#### Inherited from

MouseEvent.type

***

### view

`Readonly` **view**: `null` | `Window`

#### Inherited from

MouseEvent.view

***

### which

`Readonly` **which**: `number`

**`Deprecated`**

#### Inherited from

MouseEvent.which

***

### x

`Readonly` **x**: `number`

#### Inherited from

MouseEvent.x

***

### y

`Readonly` **y**: `number`

#### Inherited from

MouseEvent.y

## Methods

### composedPath

**composedPath**(): `EventTarget`\[]

Returns the invocation target objects of event's path (objects on which listeners will be invoked), except for any nodes in shadow trees of which the shadow root's mode is "closed" that are not reachable from event's currentTarget.

#### Returns

`EventTarget`\[]

#### Inherited from

MouseEvent.composedPath

***

### getModifierState

**getModifierState**(`keyArg`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `keyArg` | `string` |

#### Returns

`boolean`

#### Inherited from

MouseEvent.getModifierState

***

### initEvent

**initEvent**(`type`, `bubbles?`, `cancelable?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |
| `bubbles?` | `boolean` |
| `cancelable?` | `boolean` |

#### Returns

`void`

**`Deprecated`**

#### Inherited from

MouseEvent.initEvent

***

### initMouseEvent

**initMouseEvent**(`typeArg`, `canBubbleArg`, `cancelableArg`, `viewArg`, `detailArg`, `screenXArg`, `screenYArg`, `clientXArg`, `clientYArg`, `ctrlKeyArg`, `altKeyArg`, `shiftKeyArg`, `metaKeyArg`, `buttonArg`, `relatedTargetArg`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `typeArg` | `string` |
| `canBubbleArg` | `boolean` |
| `cancelableArg` | `boolean` |
| `viewArg` | `Window` |
| `detailArg` | `number` |
| `screenXArg` | `number` |
| `screenYArg` | `number` |
| `clientXArg` | `number` |
| `clientYArg` | `number` |
| `ctrlKeyArg` | `boolean` |
| `altKeyArg` | `boolean` |
| `shiftKeyArg` | `boolean` |
| `metaKeyArg` | `boolean` |
| `buttonArg` | `number` |
| `relatedTargetArg` | `null` | `EventTarget` |

#### Returns

`void`

**`Deprecated`**

#### Inherited from

MouseEvent.initMouseEvent

***

### initUIEvent

**initUIEvent**(`typeArg`, `bubblesArg?`, `cancelableArg?`, `viewArg?`, `detailArg?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `typeArg` | `string` |
| `bubblesArg?` | `boolean` |
| `cancelableArg?` | `boolean` |
| `viewArg?` | `null` | `Window` |
| `detailArg?` | `number` |

#### Returns

`void`

**`Deprecated`**

#### Inherited from

MouseEvent.initUIEvent

***

### preventDefault

**preventDefault**(): `void`

If invoked when the cancelable attribute value is true, and while executing a listener for the event with passive set to false, signals to the operation that caused event to be dispatched that it needs to be canceled.

#### Returns

`void`

#### Inherited from

MouseEvent.preventDefault

***

### stopImmediatePropagation

**stopImmediatePropagation**(): `void`

Invoking this method prevents event from reaching any registered event listeners after the current one finishes running and, when dispatched in a tree, also prevents event from reaching any other objects.

#### Returns

`void`

#### Inherited from

MouseEvent.stopImmediatePropagation

***

### stopPropagation

**stopPropagation**(): `void`

When dispatched in a tree, invoking this method prevents event from reaching any objects other than the current object.

#### Returns

`void`

#### Inherited from

MouseEvent.stopPropagation
