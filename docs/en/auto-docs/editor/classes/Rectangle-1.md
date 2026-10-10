# Class: Rectangle

Rectangle object is an area defined by its position, as indicated by its top-left corner
point (x, y) and by its width and its height.

## Table of contents

### Constructors

* [constructor](/en/auto-docs/editor/classes/Rectangle-1.md#constructor)

### Properties

* [height](/en/auto-docs/editor/classes/Rectangle-1.md#height)
* [type](/en/auto-docs/editor/classes/Rectangle-1.md#type)
* [width](/en/auto-docs/editor/classes/Rectangle-1.md#width)
* [x](/en/auto-docs/editor/classes/Rectangle-1.md#x)
* [y](/en/auto-docs/editor/classes/Rectangle-1.md#y)

### Accessors

* [bottom](/en/auto-docs/editor/classes/Rectangle-1.md#bottom)
* [bottomCenter](/en/auto-docs/editor/classes/Rectangle-1.md#bottomcenter)
* [center](/en/auto-docs/editor/classes/Rectangle-1.md#center)
* [crossDistance](/en/auto-docs/editor/classes/Rectangle-1.md#crossdistance)
* [left](/en/auto-docs/editor/classes/Rectangle-1.md#left)
* [leftBottom](/en/auto-docs/editor/classes/Rectangle-1.md#leftbottom)
* [leftCenter](/en/auto-docs/editor/classes/Rectangle-1.md#leftcenter)
* [leftTop](/en/auto-docs/editor/classes/Rectangle-1.md#lefttop)
* [right](/en/auto-docs/editor/classes/Rectangle-1.md#right)
* [rightBottom](/en/auto-docs/editor/classes/Rectangle-1.md#rightbottom)
* [rightCenter](/en/auto-docs/editor/classes/Rectangle-1.md#rightcenter)
* [rightTop](/en/auto-docs/editor/classes/Rectangle-1.md#righttop)
* [top](/en/auto-docs/editor/classes/Rectangle-1.md#top)
* [topCenter](/en/auto-docs/editor/classes/Rectangle-1.md#topcenter)
* [EMPTY](/en/auto-docs/editor/classes/Rectangle-1.md#empty)

### Methods

* [ceil](/en/auto-docs/editor/classes/Rectangle-1.md#ceil)
* [clearSpace](/en/auto-docs/editor/classes/Rectangle-1.md#clearspace)
* [clone](/en/auto-docs/editor/classes/Rectangle-1.md#clone)
* [contains](/en/auto-docs/editor/classes/Rectangle-1.md#contains)
* [containsRectangle](/en/auto-docs/editor/classes/Rectangle-1.md#containsrectangle)
* [copyFrom](/en/auto-docs/editor/classes/Rectangle-1.md#copyfrom)
* [copyTo](/en/auto-docs/editor/classes/Rectangle-1.md#copyto)
* [enlarge](/en/auto-docs/editor/classes/Rectangle-1.md#enlarge)
* [fit](/en/auto-docs/editor/classes/Rectangle-1.md#fit)
* [isEqual](/en/auto-docs/editor/classes/Rectangle-1.md#isequal)
* [pad](/en/auto-docs/editor/classes/Rectangle-1.md#pad)
* [toStyleStr](/en/auto-docs/editor/classes/Rectangle-1.md#tostylestr)
* [update](/en/auto-docs/editor/classes/Rectangle-1.md#update)
* [withHeight](/en/auto-docs/editor/classes/Rectangle-1.md#withheight)
* [withPadding](/en/auto-docs/editor/classes/Rectangle-1.md#withpadding)
* [withoutPadding](/en/auto-docs/editor/classes/Rectangle-1.md#withoutpadding)

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

`Readonly` **type**: [`RECT`](/en/auto-docs/editor/enums/SHAPES.md#rect) = `SHAPES.RECT`

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

`get` **bottomCenter**(): [`IPoint`](/en/auto-docs/editor/interfaces/IPoint.md)

#### Returns

[`IPoint`](/en/auto-docs/editor/interfaces/IPoint.md)

***

### center

`get` **center**(): [`IPoint`](/en/auto-docs/editor/interfaces/IPoint.md)

#### Returns

[`IPoint`](/en/auto-docs/editor/interfaces/IPoint.md)

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

`get` **leftBottom**(): [`IPoint`](/en/auto-docs/editor/interfaces/IPoint.md)

#### Returns

[`IPoint`](/en/auto-docs/editor/interfaces/IPoint.md)

***

### leftCenter

`get` **leftCenter**(): [`IPoint`](/en/auto-docs/editor/interfaces/IPoint.md)

#### Returns

[`IPoint`](/en/auto-docs/editor/interfaces/IPoint.md)

***

### leftTop

`get` **leftTop**(): [`IPoint`](/en/auto-docs/editor/interfaces/IPoint.md)

#### Returns

[`IPoint`](/en/auto-docs/editor/interfaces/IPoint.md)

***

### right

`get` **right**(): `number`

#### Returns

`number`

***

### rightBottom

`get` **rightBottom**(): [`IPoint`](/en/auto-docs/editor/interfaces/IPoint.md)

#### Returns

[`IPoint`](/en/auto-docs/editor/interfaces/IPoint.md)

***

### rightCenter

`get` **rightCenter**(): [`IPoint`](/en/auto-docs/editor/interfaces/IPoint.md)

#### Returns

[`IPoint`](/en/auto-docs/editor/interfaces/IPoint.md)

***

### rightTop

`get` **rightTop**(): [`IPoint`](/en/auto-docs/editor/interfaces/IPoint.md)

#### Returns

[`IPoint`](/en/auto-docs/editor/interfaces/IPoint.md)

***

### top

`get` **top**(): `number`

#### Returns

`number`

***

### topCenter

`get` **topCenter**(): [`IPoint`](/en/auto-docs/editor/interfaces/IPoint.md)

#### Returns

[`IPoint`](/en/auto-docs/editor/interfaces/IPoint.md)

***

### EMPTY

`Static` `get` **EMPTY**(): [`Rectangle`](/en/auto-docs/editor/classes/Rectangle-1.md)

A constant empty rectangle. MUST NOT modify properties!

#### Returns

[`Rectangle`](/en/auto-docs/editor/classes/Rectangle-1.md)

## Methods

### ceil

**ceil**(`resolution?`, `precision?`): [`Rectangle`](/en/auto-docs/editor/classes/Rectangle-1.md)

Enlarges rectangle that way its corners lie on grid

#### Parameters

| Name | Type |
| :------ | :------ |
| `resolution?` | `number` |
| `precision?` | `number` |

#### Returns

[`Rectangle`](/en/auto-docs/editor/classes/Rectangle-1.md)

***

### clearSpace

**clearSpace**(): [`Rectangle`](/en/auto-docs/editor/classes/Rectangle-1.md)

#### Returns

[`Rectangle`](/en/auto-docs/editor/classes/Rectangle-1.md)

***

### clone

**clone**(): [`Rectangle`](/en/auto-docs/editor/classes/Rectangle-1.md)

Creates a clone of this Rectangle.

#### Returns

[`Rectangle`](/en/auto-docs/editor/classes/Rectangle-1.md)

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
| `rect` | [`Rectangle`](/en/auto-docs/editor/classes/Rectangle-1.md) |

#### Returns

`boolean`

***

### copyFrom

**copyFrom**(`rectangle`): [`Rectangle`](/en/auto-docs/editor/classes/Rectangle-1.md)

Copies another rectangle to this one.

#### Parameters

| Name | Type |
| :------ | :------ |
| `rectangle` | [`Rectangle`](/en/auto-docs/editor/classes/Rectangle-1.md) |

#### Returns

[`Rectangle`](/en/auto-docs/editor/classes/Rectangle-1.md)

Returns itself.

***

### copyTo

**copyTo**(`rectangle`): [`Rectangle`](/en/auto-docs/editor/classes/Rectangle-1.md)

Copies this rectangle to another one.

#### Parameters

| Name | Type |
| :------ | :------ |
| `rectangle` | [`Rectangle`](/en/auto-docs/editor/classes/Rectangle-1.md) |

#### Returns

[`Rectangle`](/en/auto-docs/editor/classes/Rectangle-1.md)

Returns given rectangle.

***

### enlarge

**enlarge**(`rectangle`): [`Rectangle`](/en/auto-docs/editor/classes/Rectangle-1.md)

Enlarges this rectangle to include the passed rectangle.

#### Parameters

| Name | Type |
| :------ | :------ |
| `rectangle` | [`Rectangle`](/en/auto-docs/editor/classes/Rectangle-1.md) |

#### Returns

[`Rectangle`](/en/auto-docs/editor/classes/Rectangle-1.md)

***

### fit

**fit**(`rectangle`): [`Rectangle`](/en/auto-docs/editor/classes/Rectangle-1.md)

Fits this rectangle around the passed one.
Intersection 交集

#### Parameters

| Name | Type |
| :------ | :------ |
| `rectangle` | [`Rectangle`](/en/auto-docs/editor/classes/Rectangle-1.md) |

#### Returns

[`Rectangle`](/en/auto-docs/editor/classes/Rectangle-1.md)

***

### isEqual

**isEqual**(`rect`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `rect` | [`Rectangle`](/en/auto-docs/editor/classes/Rectangle-1.md) |

#### Returns

`boolean`

***

### pad

**pad**(`paddingX?`, `paddingY?`): [`Rectangle`](/en/auto-docs/editor/classes/Rectangle-1.md)

Pads the rectangle making it grow in all directions.
If paddingY is omitted, both paddingX and paddingY will be set to paddingX.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `paddingX?` | `number` | The horizontal padding amount. |
| `paddingY?` | `number` | The vertical padding amount. |

#### Returns

[`Rectangle`](/en/auto-docs/editor/classes/Rectangle-1.md)

***

### toStyleStr

**toStyleStr**(): `string`

#### Returns

`string`

***

### update

**update**(`fn`): [`Rectangle`](/en/auto-docs/editor/classes/Rectangle-1.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | (`rect`: [`Rectangle`](/en/auto-docs/editor/classes/Rectangle-1.md)) => [`Rectangle`](/en/auto-docs/editor/classes/Rectangle-1.md) |

#### Returns

[`Rectangle`](/en/auto-docs/editor/classes/Rectangle-1.md)

***

### withHeight

**withHeight**(`height`): [`Rectangle`](/en/auto-docs/editor/classes/Rectangle-1.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `height` | `number` |

#### Returns

[`Rectangle`](/en/auto-docs/editor/classes/Rectangle-1.md)

***

### withPadding

**withPadding**(`padding`): [`Rectangle`](/en/auto-docs/editor/classes/Rectangle-1.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `padding` | [`PaddingSchema`](/en/auto-docs/editor/interfaces/PaddingSchema-1.md) |

#### Returns

[`Rectangle`](/en/auto-docs/editor/classes/Rectangle-1.md)

***

### withoutPadding

**withoutPadding**(`padding`): [`Rectangle`](/en/auto-docs/editor/classes/Rectangle-1.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `padding` | [`PaddingSchema`](/en/auto-docs/editor/interfaces/PaddingSchema-1.md) |

#### Returns

[`Rectangle`](/en/auto-docs/editor/classes/Rectangle-1.md)
