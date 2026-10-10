# Class: FocusableWidget

## Hierarchy

* `WidgetType`

  ↳ **`FocusableWidget`**

## Table of contents

### Constructors

* [constructor](/en/auto-docs/coze-editor/classes/FocusableWidget.md#constructor)

### Accessors

* [estimatedHeight](/en/auto-docs/coze-editor/classes/FocusableWidget.md#estimatedheight)
* [lineBreaks](/en/auto-docs/coze-editor/classes/FocusableWidget.md#linebreaks)

### Methods

* [coordsAt](/en/auto-docs/coze-editor/classes/FocusableWidget.md#coordsat)
* [destroy](/en/auto-docs/coze-editor/classes/FocusableWidget.md#destroy)
* [eq](/en/auto-docs/coze-editor/classes/FocusableWidget.md#eq)
* [focus](/en/auto-docs/coze-editor/classes/FocusableWidget.md#focus)
* [ignoreEvent](/en/auto-docs/coze-editor/classes/FocusableWidget.md#ignoreevent)
* [toDOM](/en/auto-docs/coze-editor/classes/FocusableWidget.md#todom)
* [updateDOM](/en/auto-docs/coze-editor/classes/FocusableWidget.md#updatedom)

## Constructors

### constructor

**new FocusableWidget**()

#### Inherited from

WidgetType.constructor

## Accessors

### estimatedHeight

`get` **estimatedHeight**(): `number`

The estimated height this widget will have, to be used when
estimating the height of content that hasn't been drawn. May
return -1 to indicate you don't know. The default implementation
returns -1.

#### Returns

`number`

#### Inherited from

WidgetType.estimatedHeight

***

### lineBreaks

`get` **lineBreaks**(): `number`

For inline widgets that are displayed inline (as opposed to
`inline-block`) and introduce line breaks (through `<br>` tags
or textual newlines), this must indicate the amount of line
breaks they introduce. Defaults to 0.

#### Returns

`number`

#### Inherited from

WidgetType.lineBreaks

## Methods

### coordsAt

**coordsAt**(`dom`, `pos`, `side`): `null` | `Rect`

Override the way screen coordinates for positions at/in the
widget are found. `pos` will be the offset into the widget, and
`side` the side of the position that is being queried—less than
zero for before, greater than zero for after, and zero for
directly at that position.

#### Parameters

| Name | Type |
| :------ | :------ |
| `dom` | `HTMLElement` |
| `pos` | `number` |
| `side` | `number` |

#### Returns

`null` | `Rect`

#### Inherited from

WidgetType.coordsAt

***

### destroy

**destroy**(`dom`): `void`

This is called when the an instance of the widget is removed
from the editor view.

#### Parameters

| Name | Type |
| :------ | :------ |
| `dom` | `HTMLElement` |

#### Returns

`void`

#### Inherited from

WidgetType.destroy

***

### eq

**eq**(`widget`): `boolean`

Compare this instance to another instance of the same type.
(TypeScript can't express this, but only instances of the same
specific class will be passed to this method.) This is used to
avoid redrawing widgets when they are replaced by a new
decoration of the same type. The default implementation just
returns `false`, which will cause new instances of the widget to
always be redrawn.

#### Parameters

| Name | Type |
| :------ | :------ |
| `widget` | `WidgetType` |

#### Returns

`boolean`

#### Inherited from

WidgetType.eq

***

### focus

`Abstract` **focus**(`fromSide`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `fromSide` | `1` | `-1` |

#### Returns

`void`

***

### ignoreEvent

**ignoreEvent**(`event`): `boolean`

Can be used to configure which kinds of events inside the widget
should be ignored by the editor. The default is to ignore all
events.

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `Event` |

#### Returns

`boolean`

#### Inherited from

WidgetType.ignoreEvent

***

### toDOM

`Abstract` **toDOM**(`view`): `HTMLElement`

Build the DOM structure for this widget instance.

#### Parameters

| Name | Type |
| :------ | :------ |
| `view` | `EditorView` |

#### Returns

`HTMLElement`

#### Inherited from

WidgetType.toDOM

***

### updateDOM

**updateDOM**(`dom`, `view`): `boolean`

Update a DOM element created by a widget of the same type (but
different, non-`eq` content) to reflect this widget. May return
true to indicate that it could update, false to indicate it
couldn't (in which case the widget will be redrawn). The default
implementation just returns false.

#### Parameters

| Name | Type |
| :------ | :------ |
| `dom` | `HTMLElement` |
| `view` | `EditorView` |

#### Returns

`boolean`

#### Inherited from

WidgetType.updateDOM
