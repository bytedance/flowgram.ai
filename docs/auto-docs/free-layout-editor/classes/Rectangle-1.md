# Class: Rectangle

Rectangle object is an area defined by its position, as indicated by its top-left corner
point (x, y) and by its width and its height.

## Table of contents

### Constructors

* [constructor](/auto-docs/free-layout-editor/classes/Rectangle-1.md#constructor)

### Properties

* [height](/auto-docs/free-layout-editor/classes/Rectangle-1.md#height)
* [type](/auto-docs/free-layout-editor/classes/Rectangle-1.md#type)
* [width](/auto-docs/free-layout-editor/classes/Rectangle-1.md#width)
* [x](/auto-docs/free-layout-editor/classes/Rectangle-1.md#x)
* [y](/auto-docs/free-layout-editor/classes/Rectangle-1.md#y)

### Accessors

* [bottom](/auto-docs/free-layout-editor/classes/Rectangle-1.md#bottom)
* [bottomCenter](/auto-docs/free-layout-editor/classes/Rectangle-1.md#bottomcenter)
* [center](/auto-docs/free-layout-editor/classes/Rectangle-1.md#center)
* [crossDistance](/auto-docs/free-layout-editor/classes/Rectangle-1.md#crossdistance)
* [left](/auto-docs/free-layout-editor/classes/Rectangle-1.md#left)
* [leftBottom](/auto-docs/free-layout-editor/classes/Rectangle-1.md#leftbottom)
* [leftCenter](/auto-docs/free-layout-editor/classes/Rectangle-1.md#leftcenter)
* [leftTop](/auto-docs/free-layout-editor/classes/Rectangle-1.md#lefttop)
* [right](/auto-docs/free-layout-editor/classes/Rectangle-1.md#right)
* [rightBottom](/auto-docs/free-layout-editor/classes/Rectangle-1.md#rightbottom)
* [rightCenter](/auto-docs/free-layout-editor/classes/Rectangle-1.md#rightcenter)
* [rightTop](/auto-docs/free-layout-editor/classes/Rectangle-1.md#righttop)
* [top](/auto-docs/free-layout-editor/classes/Rectangle-1.md#top)
* [topCenter](/auto-docs/free-layout-editor/classes/Rectangle-1.md#topcenter)
* [EMPTY](/auto-docs/free-layout-editor/classes/Rectangle-1.md#empty)

### Methods

* [ceil](/auto-docs/free-layout-editor/classes/Rectangle-1.md#ceil)
* [clearSpace](/auto-docs/free-layout-editor/classes/Rectangle-1.md#clearspace)
* [clone](/auto-docs/free-layout-editor/classes/Rectangle-1.md#clone)
* [contains](/auto-docs/free-layout-editor/classes/Rectangle-1.md#contains)
* [containsRectangle](/auto-docs/free-layout-editor/classes/Rectangle-1.md#containsrectangle)
* [copyFrom](/auto-docs/free-layout-editor/classes/Rectangle-1.md#copyfrom)
* [copyTo](/auto-docs/free-layout-editor/classes/Rectangle-1.md#copyto)
* [enlarge](/auto-docs/free-layout-editor/classes/Rectangle-1.md#enlarge)
* [fit](/auto-docs/free-layout-editor/classes/Rectangle-1.md#fit)
* [isEqual](/auto-docs/free-layout-editor/classes/Rectangle-1.md#isequal)
* [pad](/auto-docs/free-layout-editor/classes/Rectangle-1.md#pad)
* [toStyleStr](/auto-docs/free-layout-editor/classes/Rectangle-1.md#tostylestr)
* [update](/auto-docs/free-layout-editor/classes/Rectangle-1.md#update)
* [withHeight](/auto-docs/free-layout-editor/classes/Rectangle-1.md#withheight)
* [withPadding](/auto-docs/free-layout-editor/classes/Rectangle-1.md#withpadding)
* [withoutPadding](/auto-docs/free-layout-editor/classes/Rectangle-1.md#withoutpadding)

## Constructors

### constructor

**new Rectangle**(`x?`, `y?`, `width?`, `height?`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x?` | `number` | The X coordinate of the upper-left corner of the rectangle |
| `y?` | `number` | The Y coordinate of the upper-left corner of the rectangle |
| `width?` | `number` | The overall width of this rectangle |
| `height?` | `number` | The overall height of this rectangle |

## Properties

### height

**height**: `number`

***

### type

`Readonly` **type**: [`RECT`](/auto-docs/free-layout-editor/enums/SHAPES.md#rect) = `SHAPES.RECT`

The type of the object, mainly used to avoid `instanceof` checks

***

### width

**width**: `number`

***

### x

**x**: `number`

***

### y

**y**: `number`

## Accessors

### bottom

`get` **bottom**(): `number`

#### Returns

`number`

***

### bottomCenter

`get` **bottomCenter**(): [`IPoint`](/auto-docs/free-layout-editor/interfaces/IPoint.md)

#### Returns

[`IPoint`](/auto-docs/free-layout-editor/interfaces/IPoint.md)

***

### center

`get` **center**(): [`IPoint`](/auto-docs/free-layout-editor/interfaces/IPoint.md)

#### Returns

[`IPoint`](/auto-docs/free-layout-editor/interfaces/IPoint.md)

***

### crossDistance

`get` **crossDistance**(): `number`

#### Returns

`number`

***

### left

`get` **left**(): `number`

#### Returns

`number`

***

### leftBottom

`get` **leftBottom**(): [`IPoint`](/auto-docs/free-layout-editor/interfaces/IPoint.md)

#### Returns

[`IPoint`](/auto-docs/free-layout-editor/interfaces/IPoint.md)

***

### leftCenter

`get` **leftCenter**(): [`IPoint`](/auto-docs/free-layout-editor/interfaces/IPoint.md)

#### Returns

[`IPoint`](/auto-docs/free-layout-editor/interfaces/IPoint.md)

***

### leftTop

`get` **leftTop**(): [`IPoint`](/auto-docs/free-layout-editor/interfaces/IPoint.md)

#### Returns

[`IPoint`](/auto-docs/free-layout-editor/interfaces/IPoint.md)

***

### right

`get` **right**(): `number`

#### Returns

`number`

***

### rightBottom

`get` **rightBottom**(): [`IPoint`](/auto-docs/free-layout-editor/interfaces/IPoint.md)

#### Returns

[`IPoint`](/auto-docs/free-layout-editor/interfaces/IPoint.md)

***

### rightCenter

`get` **rightCenter**(): [`IPoint`](/auto-docs/free-layout-editor/interfaces/IPoint.md)

#### Returns

[`IPoint`](/auto-docs/free-layout-editor/interfaces/IPoint.md)

***

### rightTop

`get` **rightTop**(): [`IPoint`](/auto-docs/free-layout-editor/interfaces/IPoint.md)

#### Returns

[`IPoint`](/auto-docs/free-layout-editor/interfaces/IPoint.md)

***

### top

`get` **top**(): `number`

#### Returns

`number`

***

### topCenter

`get` **topCenter**(): [`IPoint`](/auto-docs/free-layout-editor/interfaces/IPoint.md)

#### Returns

[`IPoint`](/auto-docs/free-layout-editor/interfaces/IPoint.md)

***

### EMPTY

`Static` `get` **EMPTY**(): [`Rectangle`](/auto-docs/free-layout-editor/classes/Rectangle-1.md)

A constant empty rectangle. MUST NOT modify properties!

#### Returns

[`Rectangle`](/auto-docs/free-layout-editor/classes/Rectangle-1.md)

## Methods

### ceil

**ceil**(`resolution?`, `precision?`): [`Rectangle`](/auto-docs/free-layout-editor/classes/Rectangle-1.md)

Enlarges rectangle that way its corners lie on grid

#### Parameters

| Name | Type |
| :------ | :------ |
| `resolution?` | `number` |
| `precision?` | `number` |

#### Returns

[`Rectangle`](/auto-docs/free-layout-editor/classes/Rectangle-1.md)

***

### clearSpace

**clearSpace**(): [`Rectangle`](/auto-docs/free-layout-editor/classes/Rectangle-1.md)

#### Returns

[`Rectangle`](/auto-docs/free-layout-editor/classes/Rectangle-1.md)

***

### clone

**clone**(): [`Rectangle`](/auto-docs/free-layout-editor/classes/Rectangle-1.md)

Creates a clone of this Rectangle.

#### Returns

[`Rectangle`](/auto-docs/free-layout-editor/classes/Rectangle-1.md)

a copy of the rectangle

***

### contains

**contains**(`x`, `y`): `boolean`

Checks whether the x and y coordinates given are contained within this Rectangle

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | `number` | The X coordinate of the point to test |
| `y` | `number` | The Y coordinate of the point to test |

#### Returns

`boolean`

Whether the x/y coordinates are within this Rectangle

***

### containsRectangle

**containsRectangle**(`rect`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `rect` | [`Rectangle`](/auto-docs/free-layout-editor/classes/Rectangle-1.md) |

#### Returns

`boolean`

***

### copyFrom

**copyFrom**(`rectangle`): [`Rectangle`](/auto-docs/free-layout-editor/classes/Rectangle-1.md)

Copies another rectangle to this one.

#### Parameters

| Name | Type |
| :------ | :------ |
| `rectangle` | [`Rectangle`](/auto-docs/free-layout-editor/classes/Rectangle-1.md) |

#### Returns

[`Rectangle`](/auto-docs/free-layout-editor/classes/Rectangle-1.md)

Returns itself.

***

### copyTo

**copyTo**(`rectangle`): [`Rectangle`](/auto-docs/free-layout-editor/classes/Rectangle-1.md)

Copies this rectangle to another one.

#### Parameters

| Name | Type |
| :------ | :------ |
| `rectangle` | [`Rectangle`](/auto-docs/free-layout-editor/classes/Rectangle-1.md) |

#### Returns

[`Rectangle`](/auto-docs/free-layout-editor/classes/Rectangle-1.md)

Returns given rectangle.

***

### enlarge

**enlarge**(`rectangle`): [`Rectangle`](/auto-docs/free-layout-editor/classes/Rectangle-1.md)

Enlarges this rectangle to include the passed rectangle.

#### Parameters

| Name | Type |
| :------ | :------ |
| `rectangle` | [`Rectangle`](/auto-docs/free-layout-editor/classes/Rectangle-1.md) |

#### Returns

[`Rectangle`](/auto-docs/free-layout-editor/classes/Rectangle-1.md)

***

### fit

**fit**(`rectangle`): [`Rectangle`](/auto-docs/free-layout-editor/classes/Rectangle-1.md)

Fits this rectangle around the passed one.
Intersection 交集

#### Parameters

| Name | Type |
| :------ | :------ |
| `rectangle` | [`Rectangle`](/auto-docs/free-layout-editor/classes/Rectangle-1.md) |

#### Returns

[`Rectangle`](/auto-docs/free-layout-editor/classes/Rectangle-1.md)

***

### isEqual

**isEqual**(`rect`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `rect` | [`Rectangle`](/auto-docs/free-layout-editor/classes/Rectangle-1.md) |

#### Returns

`boolean`

***

### pad

**pad**(`paddingX?`, `paddingY?`): [`Rectangle`](/auto-docs/free-layout-editor/classes/Rectangle-1.md)

Pads the rectangle making it grow in all directions.
If paddingY is omitted, both paddingX and paddingY will be set to paddingX.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `paddingX?` | `number` | The horizontal padding amount. |
| `paddingY?` | `number` | The vertical padding amount. |

#### Returns

[`Rectangle`](/auto-docs/free-layout-editor/classes/Rectangle-1.md)

***

### toStyleStr

**toStyleStr**(): `string`

#### Returns

`string`

***

### update

**update**(`fn`): [`Rectangle`](/auto-docs/free-layout-editor/classes/Rectangle-1.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | (`rect`: [`Rectangle`](/auto-docs/free-layout-editor/classes/Rectangle-1.md)) => [`Rectangle`](/auto-docs/free-layout-editor/classes/Rectangle-1.md) |

#### Returns

[`Rectangle`](/auto-docs/free-layout-editor/classes/Rectangle-1.md)

***

### withHeight

**withHeight**(`height`): [`Rectangle`](/auto-docs/free-layout-editor/classes/Rectangle-1.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `height` | `number` |

#### Returns

[`Rectangle`](/auto-docs/free-layout-editor/classes/Rectangle-1.md)

***

### withPadding

**withPadding**(`padding`): [`Rectangle`](/auto-docs/free-layout-editor/classes/Rectangle-1.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `padding` | [`PaddingSchema`](/auto-docs/free-layout-editor/interfaces/PaddingSchema-1.md) |

#### Returns

[`Rectangle`](/auto-docs/free-layout-editor/classes/Rectangle-1.md)

***

### withoutPadding

**withoutPadding**(`padding`): [`Rectangle`](/auto-docs/free-layout-editor/classes/Rectangle-1.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `padding` | [`PaddingSchema`](/auto-docs/free-layout-editor/interfaces/PaddingSchema-1.md) |

#### Returns

[`Rectangle`](/auto-docs/free-layout-editor/classes/Rectangle-1.md)
