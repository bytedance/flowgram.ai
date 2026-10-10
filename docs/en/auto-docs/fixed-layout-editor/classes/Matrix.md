# Class: Matrix

The PIXIJS Matrix as a class makes it a lot faster.

Here is a representation of it:

```js
| a | c | tx|
| b | d | ty|
| 0 | 0 | 1 |
// default:
| 1 | 0 | 0 |
| 0 | 1 | 0 |
| 0 | 0 | 1 |
```

## Table of contents

### Constructors

* [constructor](/en/auto-docs/fixed-layout-editor/classes/Matrix.md#constructor)

### Properties

* [a](/en/auto-docs/fixed-layout-editor/classes/Matrix.md#a)
* [array](/en/auto-docs/fixed-layout-editor/classes/Matrix.md#array)
* [b](/en/auto-docs/fixed-layout-editor/classes/Matrix.md#b)
* [c](/en/auto-docs/fixed-layout-editor/classes/Matrix.md#c)
* [d](/en/auto-docs/fixed-layout-editor/classes/Matrix.md#d)
* [tx](/en/auto-docs/fixed-layout-editor/classes/Matrix.md#tx)
* [ty](/en/auto-docs/fixed-layout-editor/classes/Matrix.md#ty)

### Accessors

* [IDENTITY](/en/auto-docs/fixed-layout-editor/classes/Matrix.md#identity)
* [TEMP\_MATRIX](/en/auto-docs/fixed-layout-editor/classes/Matrix.md#temp_matrix)

### Methods

* [append](/en/auto-docs/fixed-layout-editor/classes/Matrix.md#append)
* [apply](/en/auto-docs/fixed-layout-editor/classes/Matrix.md#apply)
* [applyInverse](/en/auto-docs/fixed-layout-editor/classes/Matrix.md#applyinverse)
* [clone](/en/auto-docs/fixed-layout-editor/classes/Matrix.md#clone)
* [copyFrom](/en/auto-docs/fixed-layout-editor/classes/Matrix.md#copyfrom)
* [copyTo](/en/auto-docs/fixed-layout-editor/classes/Matrix.md#copyto)
* [decompose](/en/auto-docs/fixed-layout-editor/classes/Matrix.md#decompose)
* [fromArray](/en/auto-docs/fixed-layout-editor/classes/Matrix.md#fromarray)
* [identity](/en/auto-docs/fixed-layout-editor/classes/Matrix.md#identity-1)
* [invert](/en/auto-docs/fixed-layout-editor/classes/Matrix.md#invert)
* [isSimple](/en/auto-docs/fixed-layout-editor/classes/Matrix.md#issimple)
* [prepend](/en/auto-docs/fixed-layout-editor/classes/Matrix.md#prepend)
* [rotate](/en/auto-docs/fixed-layout-editor/classes/Matrix.md#rotate)
* [scale](/en/auto-docs/fixed-layout-editor/classes/Matrix.md#scale)
* [set](/en/auto-docs/fixed-layout-editor/classes/Matrix.md#set)
* [setTransform](/en/auto-docs/fixed-layout-editor/classes/Matrix.md#settransform)
* [toArray](/en/auto-docs/fixed-layout-editor/classes/Matrix.md#toarray)
* [translate](/en/auto-docs/fixed-layout-editor/classes/Matrix.md#translate)

## Constructors

### constructor

**new Matrix**(`a?`, `b?`, `c?`, `d?`, `tx?`, `ty?`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `a?` | `number` | x scale |
| `b?` | `number` | x skew |
| `c?` | `number` | y skew |
| `d?` | `number` | y scale |
| `tx?` | `number` | x translation |
| `ty?` | `number` | y translation |

## Properties

### a

**a**: `number`

***

### array

**array**: `null` | `Float32Array`

***

### b

**b**: `number`

***

### c

**c**: `number`

***

### d

**d**: `number`

***

### tx

**tx**: `number`

***

### ty

**ty**: `number`

## Accessors

### IDENTITY

`Static` `get` **IDENTITY**(): [`Matrix`](/en/auto-docs/fixed-layout-editor/classes/Matrix.md)

A default (identity) matrix

#### Returns

[`Matrix`](/en/auto-docs/fixed-layout-editor/classes/Matrix.md)

***

### TEMP\_MATRIX

`Static` `get` **TEMP\_MATRIX**(): [`Matrix`](/en/auto-docs/fixed-layout-editor/classes/Matrix.md)

A temp matrix

#### Returns

[`Matrix`](/en/auto-docs/fixed-layout-editor/classes/Matrix.md)

## Methods

### append

**append**(`matrix`): [`Matrix`](/en/auto-docs/fixed-layout-editor/classes/Matrix.md)

矩阵乘法，当前矩阵 \* matrix
Appends the given Matrix to this Matrix.

#### Parameters

| Name | Type |
| :------ | :------ |
| `matrix` | [`Matrix`](/en/auto-docs/fixed-layout-editor/classes/Matrix.md) |

#### Returns

[`Matrix`](/en/auto-docs/fixed-layout-editor/classes/Matrix.md)

***

### apply

**apply**(`pos`, `newPos?`): [`IPoint`](/en/auto-docs/fixed-layout-editor/interfaces/IPoint.md)

Get a new position with the current transformation applied.
Can be used to go from a child's coordinate space to the world coordinate space. (e.g. rendering)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pos` | [`IPoint`](/en/auto-docs/fixed-layout-editor/interfaces/IPoint.md) | The origin |
| `newPos?` | [`IPoint`](/en/auto-docs/fixed-layout-editor/interfaces/IPoint.md) | The point that the new position is assigned to (allowed to be same as input) |

#### Returns

[`IPoint`](/en/auto-docs/fixed-layout-editor/interfaces/IPoint.md)

The new point, transformed through this matrix

***

### applyInverse

**applyInverse**(`pos`, `newPos?`): [`IPoint`](/en/auto-docs/fixed-layout-editor/interfaces/IPoint.md)

Get a new position with the inverse of the current transformation applied.
Can be used to go from the world coordinate space to a child's coordinate space. (e.g. input)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pos` | [`IPoint`](/en/auto-docs/fixed-layout-editor/interfaces/IPoint.md) | The origin |
| `newPos?` | [`IPoint`](/en/auto-docs/fixed-layout-editor/interfaces/IPoint.md) | The point that the new position is assigned to (allowed to be same as input) |

#### Returns

[`IPoint`](/en/auto-docs/fixed-layout-editor/interfaces/IPoint.md)

The new point, inverse-transformed through this matrix

***

### clone

**clone**(): [`Matrix`](/en/auto-docs/fixed-layout-editor/classes/Matrix.md)

Creates a new Matrix object with the same values as this one.

#### Returns

[`Matrix`](/en/auto-docs/fixed-layout-editor/classes/Matrix.md)

A copy of this matrix.

***

### copyFrom

**copyFrom**(`matrix`): [`Matrix`](/en/auto-docs/fixed-layout-editor/classes/Matrix.md)

Changes the values of the matrix to be the same as the ones in given matrix

#### Parameters

| Name | Type |
| :------ | :------ |
| `matrix` | [`Matrix`](/en/auto-docs/fixed-layout-editor/classes/Matrix.md) |

#### Returns

[`Matrix`](/en/auto-docs/fixed-layout-editor/classes/Matrix.md)

***

### copyTo

**copyTo**(`matrix`): [`Matrix`](/en/auto-docs/fixed-layout-editor/classes/Matrix.md)

Changes the values of the given matrix to be the same as the ones in this matrix

#### Parameters

| Name | Type |
| :------ | :------ |
| `matrix` | [`Matrix`](/en/auto-docs/fixed-layout-editor/classes/Matrix.md) |

#### Returns

[`Matrix`](/en/auto-docs/fixed-layout-editor/classes/Matrix.md)

The matrix given in parameter with its values updated.

***

### decompose

**decompose**(`transform`): [`Transform`](/en/auto-docs/fixed-layout-editor/classes/Transform.md)

Decomposes the matrix (x, y, scaleX, scaleY, and rotation) and sets the properties on to a transform.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transform` | [`Transform`](/en/auto-docs/fixed-layout-editor/classes/Transform.md) | The transform to apply the properties to. |

#### Returns

[`Transform`](/en/auto-docs/fixed-layout-editor/classes/Transform.md)

The transform with the newly applied properties

***

### fromArray

**fromArray**(`array`): [`Matrix`](/en/auto-docs/fixed-layout-editor/classes/Matrix.md)

Creates a Matrix object based on the given array. The Element to Matrix mapping order is as follows:

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `array` | `number`\[] | The array that the matrix will be populated from. |

#### Returns

[`Matrix`](/en/auto-docs/fixed-layout-editor/classes/Matrix.md)

***

### identity

**identity**(): [`Matrix`](/en/auto-docs/fixed-layout-editor/classes/Matrix.md)

Resets this Matrix to an identity (default) matrix.

#### Returns

[`Matrix`](/en/auto-docs/fixed-layout-editor/classes/Matrix.md)

***

### invert

**invert**(): [`Matrix`](/en/auto-docs/fixed-layout-editor/classes/Matrix.md)

Inverts this matrix

#### Returns

[`Matrix`](/en/auto-docs/fixed-layout-editor/classes/Matrix.md)

***

### isSimple

**isSimple**(): `boolean`

未做旋转的矩阵

#### Returns

`boolean`

***

### prepend

**prepend**(`matrix`): [`Matrix`](/en/auto-docs/fixed-layout-editor/classes/Matrix.md)

矩阵乘法，matrix \* 当前矩阵
Prepends the given Matrix to this Matrix.

#### Parameters

| Name | Type |
| :------ | :------ |
| `matrix` | [`Matrix`](/en/auto-docs/fixed-layout-editor/classes/Matrix.md) |

#### Returns

[`Matrix`](/en/auto-docs/fixed-layout-editor/classes/Matrix.md)

***

### rotate

**rotate**(`angle`): [`Matrix`](/en/auto-docs/fixed-layout-editor/classes/Matrix.md)

Applies a rotation transformation to the matrix.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `angle` | `number` | The angle in radians. |

#### Returns

[`Matrix`](/en/auto-docs/fixed-layout-editor/classes/Matrix.md)

***

### scale

**scale**(`x`, `y`): [`Matrix`](/en/auto-docs/fixed-layout-editor/classes/Matrix.md)

Applies a scale transformation to the matrix.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | `number` | The amount to scale horizontally |
| `y` | `number` | The amount to scale vertically |

#### Returns

[`Matrix`](/en/auto-docs/fixed-layout-editor/classes/Matrix.md)

***

### set

**set**(`a`, `b`, `c`, `d`, `tx`, `ty`): [`Matrix`](/en/auto-docs/fixed-layout-editor/classes/Matrix.md)

sets the matrix properties

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `a` | `number` | Matrix component |
| `b` | `number` | Matrix component |
| `c` | `number` | Matrix component |
| `d` | `number` | Matrix component |
| `tx` | `number` | Matrix component |
| `ty` | `number` | Matrix component |

#### Returns

[`Matrix`](/en/auto-docs/fixed-layout-editor/classes/Matrix.md)

***

### setTransform

**setTransform**(`x`, `y`, `pivotX`, `pivotY`, `scaleX`, `scaleY`, `rotation`, `skewX`, `skewY`): [`Matrix`](/en/auto-docs/fixed-layout-editor/classes/Matrix.md)

Sets the matrix based on all the available properties

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | `number` | Position on the x axis |
| `y` | `number` | Position on the y axis |
| `pivotX` | `number` | Pivot on the x axis |
| `pivotY` | `number` | Pivot on the y axis |
| `scaleX` | `number` | Scale on the x axis |
| `scaleY` | `number` | Scale on the y axis |
| `rotation` | `number` | Rotation in radians |
| `skewX` | `number` | Skew on the x axis |
| `skewY` | `number` | Skew on the y axis |

#### Returns

[`Matrix`](/en/auto-docs/fixed-layout-editor/classes/Matrix.md)

***

### toArray

**toArray**(`transpose`, `out?`): `Float32Array`

Creates an array from the current Matrix object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transpose` | `boolean` | Whether we need to transpose the matrix or not |
| `out?` | `Float32Array` | - |

#### Returns

`Float32Array`

the newly created array which contains the matrix

***

### translate

**translate**(`x`, `y`): [`Matrix`](/en/auto-docs/fixed-layout-editor/classes/Matrix.md)

Translates the matrix on the x and y.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | `number` | How much to translate x by |
| `y` | `number` | How much to translate y by |

#### Returns

[`Matrix`](/en/auto-docs/fixed-layout-editor/classes/Matrix.md)
