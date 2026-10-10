# Class: SpanWidget

## Hierarchy

* `WidgetType`

  ↳ **`SpanWidget`**

## Table of contents

### Constructors

* [constructor](/auto-docs/coze-editor/classes/SpanWidget.md#constructor)

### Properties

* [className](/auto-docs/coze-editor/classes/SpanWidget.md#classname)
* [text](/auto-docs/coze-editor/classes/SpanWidget.md#text)

### Accessors

* [estimatedHeight](/auto-docs/coze-editor/classes/SpanWidget.md#estimatedheight)
* [lineBreaks](/auto-docs/coze-editor/classes/SpanWidget.md#linebreaks)

### Methods

* [coordsAt](/auto-docs/coze-editor/classes/SpanWidget.md#coordsat)
* [destroy](/auto-docs/coze-editor/classes/SpanWidget.md#destroy)
* [eq](/auto-docs/coze-editor/classes/SpanWidget.md#eq)
* [ignoreEvent](/auto-docs/coze-editor/classes/SpanWidget.md#ignoreevent)
* [toDOM](/auto-docs/coze-editor/classes/SpanWidget.md#todom)
* [updateDOM](/auto-docs/coze-editor/classes/SpanWidget.md#updatedom)

## Constructors

### constructor

**new SpanWidget**(`options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `SpanWidgetOptions` |

#### Overrides

WidgetType.constructor

## Properties

### className

`Optional` **className**: `string`

***

### text

`Optional` **text**: `string`

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

**eq**(`other`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `other` | [`SpanWidget`](/auto-docs/coze-editor/classes/SpanWidget.md) |

#### Returns

`boolean`

#### Overrides

WidgetType.eq

***

### ignoreEvent

**ignoreEvent**(): `boolean`

#### Returns

`boolean`

#### Overrides

WidgetType.ignoreEvent

***

### toDOM

**toDOM**(): `HTMLSpanElement`

#### Returns

`HTMLSpanElement`

#### Overrides

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
