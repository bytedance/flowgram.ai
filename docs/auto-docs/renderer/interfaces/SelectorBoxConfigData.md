# Interface: SelectorBoxConfigData

## Hierarchy

* `PlaygroundDragEvent`

  ↳ **`SelectorBoxConfigData`**

## Table of contents

### Properties

* [AT\_TARGET](/auto-docs/renderer/interfaces/SelectorBoxConfigData.md#at_target)
* [BUBBLING\_PHASE](/auto-docs/renderer/interfaces/SelectorBoxConfigData.md#bubbling_phase)
* [CAPTURING\_PHASE](/auto-docs/renderer/interfaces/SelectorBoxConfigData.md#capturing_phase)
* [NONE](/auto-docs/renderer/interfaces/SelectorBoxConfigData.md#none)
* [altKey](/auto-docs/renderer/interfaces/SelectorBoxConfigData.md#altkey)
* [bubbles](/auto-docs/renderer/interfaces/SelectorBoxConfigData.md#bubbles)
* [button](/auto-docs/renderer/interfaces/SelectorBoxConfigData.md#button)
* [buttons](/auto-docs/renderer/interfaces/SelectorBoxConfigData.md#buttons)
* [cancelBubble](/auto-docs/renderer/interfaces/SelectorBoxConfigData.md#cancelbubble)
* [cancelable](/auto-docs/renderer/interfaces/SelectorBoxConfigData.md#cancelable)
* [clientX](/auto-docs/renderer/interfaces/SelectorBoxConfigData.md#clientx)
* [clientY](/auto-docs/renderer/interfaces/SelectorBoxConfigData.md#clienty)
* [composed](/auto-docs/renderer/interfaces/SelectorBoxConfigData.md#composed)
* [ctrlKey](/auto-docs/renderer/interfaces/SelectorBoxConfigData.md#ctrlkey)
* [currentTarget](/auto-docs/renderer/interfaces/SelectorBoxConfigData.md#currenttarget)
* [defaultPrevented](/auto-docs/renderer/interfaces/SelectorBoxConfigData.md#defaultprevented)
* [detail](/auto-docs/renderer/interfaces/SelectorBoxConfigData.md#detail)
* [disabled](/auto-docs/renderer/interfaces/SelectorBoxConfigData.md#disabled)
* [endPos](/auto-docs/renderer/interfaces/SelectorBoxConfigData.md#endpos)
* [eventPhase](/auto-docs/renderer/interfaces/SelectorBoxConfigData.md#eventphase)
* [id](/auto-docs/renderer/interfaces/SelectorBoxConfigData.md#id)
* [isMoving](/auto-docs/renderer/interfaces/SelectorBoxConfigData.md#ismoving)
* [isStart](/auto-docs/renderer/interfaces/SelectorBoxConfigData.md#isstart)
* [isTrusted](/auto-docs/renderer/interfaces/SelectorBoxConfigData.md#istrusted)
* [metaKey](/auto-docs/renderer/interfaces/SelectorBoxConfigData.md#metakey)
* [movementX](/auto-docs/renderer/interfaces/SelectorBoxConfigData.md#movementx)
* [movementY](/auto-docs/renderer/interfaces/SelectorBoxConfigData.md#movementy)
* [movingDelta](/auto-docs/renderer/interfaces/SelectorBoxConfigData.md#movingdelta)
* [offsetX](/auto-docs/renderer/interfaces/SelectorBoxConfigData.md#offsetx)
* [offsetY](/auto-docs/renderer/interfaces/SelectorBoxConfigData.md#offsety)
* [pageX](/auto-docs/renderer/interfaces/SelectorBoxConfigData.md#pagex)
* [pageY](/auto-docs/renderer/interfaces/SelectorBoxConfigData.md#pagey)
* [relatedTarget](/auto-docs/renderer/interfaces/SelectorBoxConfigData.md#relatedtarget)
* [returnValue](/auto-docs/renderer/interfaces/SelectorBoxConfigData.md#returnvalue)
* [scale](/auto-docs/renderer/interfaces/SelectorBoxConfigData.md#scale)
* [screenX](/auto-docs/renderer/interfaces/SelectorBoxConfigData.md#screenx)
* [screenY](/auto-docs/renderer/interfaces/SelectorBoxConfigData.md#screeny)
* [shiftKey](/auto-docs/renderer/interfaces/SelectorBoxConfigData.md#shiftkey)
* [srcElement](/auto-docs/renderer/interfaces/SelectorBoxConfigData.md#srcelement)
* [startPos](/auto-docs/renderer/interfaces/SelectorBoxConfigData.md#startpos)
* [target](/auto-docs/renderer/interfaces/SelectorBoxConfigData.md#target)
* [timeStamp](/auto-docs/renderer/interfaces/SelectorBoxConfigData.md#timestamp)
* [type](/auto-docs/renderer/interfaces/SelectorBoxConfigData.md#type)
* [view](/auto-docs/renderer/interfaces/SelectorBoxConfigData.md#view)
* [which](/auto-docs/renderer/interfaces/SelectorBoxConfigData.md#which)
* [x](/auto-docs/renderer/interfaces/SelectorBoxConfigData.md#x)
* [y](/auto-docs/renderer/interfaces/SelectorBoxConfigData.md#y)

### Methods

* [composedPath](/auto-docs/renderer/interfaces/SelectorBoxConfigData.md#composedpath)
* [getModifierState](/auto-docs/renderer/interfaces/SelectorBoxConfigData.md#getmodifierstate)
* [initEvent](/auto-docs/renderer/interfaces/SelectorBoxConfigData.md#initevent)
* [initMouseEvent](/auto-docs/renderer/interfaces/SelectorBoxConfigData.md#initmouseevent)
* [initUIEvent](/auto-docs/renderer/interfaces/SelectorBoxConfigData.md#inituievent)
* [preventDefault](/auto-docs/renderer/interfaces/SelectorBoxConfigData.md#preventdefault)
* [stopImmediatePropagation](/auto-docs/renderer/interfaces/SelectorBoxConfigData.md#stopimmediatepropagation)
* [stopPropagation](/auto-docs/renderer/interfaces/SelectorBoxConfigData.md#stoppropagation)

## Properties

### AT\_TARGET

`Readonly` **AT\_TARGET**: `2`

#### Inherited from

PlaygroundDragEvent.AT\_TARGET

***

### BUBBLING\_PHASE

`Readonly` **BUBBLING\_PHASE**: `3`

#### Inherited from

PlaygroundDragEvent.BUBBLING\_PHASE

***

### CAPTURING\_PHASE

`Readonly` **CAPTURING\_PHASE**: `1`

#### Inherited from

PlaygroundDragEvent.CAPTURING\_PHASE

***

### NONE

`Readonly` **NONE**: `0`

#### Inherited from

PlaygroundDragEvent.NONE

***

### altKey

`Readonly` **altKey**: `boolean`

#### Inherited from

PlaygroundDragEvent.altKey

***

### bubbles

`Readonly` **bubbles**: `boolean`

Returns true or false depending on how event was initialized. True if event goes through its target's ancestors in reverse tree order, and false otherwise.

#### Inherited from

PlaygroundDragEvent.bubbles

***

### button

`Readonly` **button**: `number`

#### Inherited from

PlaygroundDragEvent.button

***

### buttons

`Readonly` **buttons**: `number`

#### Inherited from

PlaygroundDragEvent.buttons

***

### cancelBubble

**cancelBubble**: `boolean`

**`Deprecated`**

#### Inherited from

PlaygroundDragEvent.cancelBubble

***

### cancelable

`Readonly` **cancelable**: `boolean`

Returns true or false depending on how event was initialized. Its return value does not always carry meaning, but true can indicate that part of the operation during which event was dispatched, can be canceled by invoking the preventDefault() method.

#### Inherited from

PlaygroundDragEvent.cancelable

***

### clientX

`Readonly` **clientX**: `number`

#### Inherited from

PlaygroundDragEvent.clientX

***

### clientY

`Readonly` **clientY**: `number`

#### Inherited from

PlaygroundDragEvent.clientY

***

### composed

`Readonly` **composed**: `boolean`

Returns true or false depending on how event was initialized. True if event invokes listeners past a ShadowRoot node that is the root of its target, and false otherwise.

#### Inherited from

PlaygroundDragEvent.composed

***

### ctrlKey

`Readonly` **ctrlKey**: `boolean`

#### Inherited from

PlaygroundDragEvent.ctrlKey

***

### currentTarget

`Readonly` **currentTarget**: `null` | `EventTarget`

Returns the object whose event listener's callback is currently being invoked.

#### Inherited from

PlaygroundDragEvent.currentTarget

***

### defaultPrevented

`Readonly` **defaultPrevented**: `boolean`

Returns true if preventDefault() was invoked successfully to indicate cancelation, and false otherwise.

#### Inherited from

PlaygroundDragEvent.defaultPrevented

***

### detail

`Readonly` **detail**: `number`

#### Inherited from

PlaygroundDragEvent.detail

***

### disabled

`Optional` **disabled**: `boolean`

***

### endPos

**endPos**: `PositionSchema`

#### Inherited from

PlaygroundDragEvent.endPos

***

### eventPhase

`Readonly` **eventPhase**: `number`

Returns the event's phase, which is one of NONE, CAPTURING\_PHASE, AT\_TARGET, and BUBBLING\_PHASE.

#### Inherited from

PlaygroundDragEvent.eventPhase

***

### id

**id**: `number`

#### Inherited from

PlaygroundDragEvent.id

***

### isMoving

**isMoving**: `boolean`

#### Inherited from

PlaygroundDragEvent.isMoving

***

### isStart

**isStart**: `boolean`

#### Inherited from

PlaygroundDragEvent.isStart

***

### isTrusted

`Readonly` **isTrusted**: `boolean`

Returns true if event was dispatched by the user agent, and false otherwise.

#### Inherited from

PlaygroundDragEvent.isTrusted

***

### metaKey

`Readonly` **metaKey**: `boolean`

#### Inherited from

PlaygroundDragEvent.metaKey

***

### movementX

`Readonly` **movementX**: `number`

#### Inherited from

PlaygroundDragEvent.movementX

***

### movementY

`Readonly` **movementY**: `number`

#### Inherited from

PlaygroundDragEvent.movementY

***

### movingDelta

**movingDelta**: `PositionSchema`

#### Inherited from

PlaygroundDragEvent.movingDelta

***

### offsetX

`Readonly` **offsetX**: `number`

#### Inherited from

PlaygroundDragEvent.offsetX

***

### offsetY

`Readonly` **offsetY**: `number`

#### Inherited from

PlaygroundDragEvent.offsetY

***

### pageX

`Readonly` **pageX**: `number`

#### Inherited from

PlaygroundDragEvent.pageX

***

### pageY

`Readonly` **pageY**: `number`

#### Inherited from

PlaygroundDragEvent.pageY

***

### relatedTarget

`Readonly` **relatedTarget**: `null` | `EventTarget`

#### Inherited from

PlaygroundDragEvent.relatedTarget

***

### returnValue

**returnValue**: `boolean`

**`Deprecated`**

#### Inherited from

PlaygroundDragEvent.returnValue

***

### scale

**scale**: `number`

#### Inherited from

PlaygroundDragEvent.scale

***

### screenX

`Readonly` **screenX**: `number`

#### Inherited from

PlaygroundDragEvent.screenX

***

### screenY

`Readonly` **screenY**: `number`

#### Inherited from

PlaygroundDragEvent.screenY

***

### shiftKey

`Readonly` **shiftKey**: `boolean`

#### Inherited from

PlaygroundDragEvent.shiftKey

***

### srcElement

`Readonly` **srcElement**: `null` | `EventTarget`

**`Deprecated`**

#### Inherited from

PlaygroundDragEvent.srcElement

***

### startPos

**startPos**: `PositionSchema`

#### Inherited from

PlaygroundDragEvent.startPos

***

### target

`Readonly` **target**: `null` | `EventTarget`

Returns the object to which event is dispatched (its target).

#### Inherited from

PlaygroundDragEvent.target

***

### timeStamp

`Readonly` **timeStamp**: `number`

Returns the event's timestamp as the number of milliseconds measured relative to the time origin.

#### Inherited from

PlaygroundDragEvent.timeStamp

***

### type

`Readonly` **type**: `string`

Returns the type of event, e.g. "click", "hashchange", or "submit".

#### Inherited from

PlaygroundDragEvent.type

***

### view

`Readonly` **view**: `null` | `Window`

#### Inherited from

PlaygroundDragEvent.view

***

### which

`Readonly` **which**: `number`

**`Deprecated`**

#### Inherited from

PlaygroundDragEvent.which

***

### x

`Readonly` **x**: `number`

#### Inherited from

PlaygroundDragEvent.x

***

### y

`Readonly` **y**: `number`

#### Inherited from

PlaygroundDragEvent.y

## Methods

### composedPath

**composedPath**(): `EventTarget`\[]

Returns the invocation target objects of event's path (objects on which listeners will be invoked), except for any nodes in shadow trees of which the shadow root's mode is "closed" that are not reachable from event's currentTarget.

#### Returns

`EventTarget`\[]

#### Inherited from

PlaygroundDragEvent.composedPath

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

PlaygroundDragEvent.getModifierState

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

PlaygroundDragEvent.initEvent

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

PlaygroundDragEvent.initMouseEvent

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

PlaygroundDragEvent.initUIEvent

***

### preventDefault

**preventDefault**(): `void`

If invoked when the cancelable attribute value is true, and while executing a listener for the event with passive set to false, signals to the operation that caused event to be dispatched that it needs to be canceled.

#### Returns

`void`

#### Inherited from

PlaygroundDragEvent.preventDefault

***

### stopImmediatePropagation

**stopImmediatePropagation**(): `void`

Invoking this method prevents event from reaching any registered event listeners after the current one finishes running and, when dispatched in a tree, also prevents event from reaching any other objects.

#### Returns

`void`

#### Inherited from

PlaygroundDragEvent.stopImmediatePropagation

***

### stopPropagation

**stopPropagation**(): `void`

When dispatched in a tree, invoking this method prevents event from reaching any objects other than the current object.

#### Returns

`void`

#### Inherited from

PlaygroundDragEvent.stopPropagation
