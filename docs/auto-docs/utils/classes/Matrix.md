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

* [constructor](/auto-docs/utils/classes/Matrix.md#constructor)

### Properties

* [a](/auto-docs/utils/classes/Matrix.md#a)
* [array](/auto-docs/utils/classes/Matrix.md#array)
* [b](/auto-docs/utils/classes/Matrix.md#b)
* [c](/auto-docs/utils/classes/Matrix.md#c)
* [d](/auto-docs/utils/classes/Matrix.md#d)
* [tx](/auto-docs/utils/classes/Matrix.md#tx)
* [ty](/auto-docs/utils/classes/Matrix.md#ty)

### Accessors

* [IDENTITY](/auto-docs/utils/classes/Matrix.md#identity)
* [TEMP\_MATRIX](/auto-docs/utils/classes/Matrix.md#temp_matrix)

### Methods

* [append](/auto-docs/utils/classes/Matrix.md#append)
* [apply](/auto-docs/utils/classes/Matrix.md#apply)
* [applyInverse](/auto-docs/utils/classes/Matrix.md#applyinverse)
* [clone](/auto-docs/utils/classes/Matrix.md#clone)
* [copyFrom](/auto-docs/utils/classes/Matrix.md#copyfrom)
* [copyTo](/auto-docs/utils/classes/Matrix.md#copyto)
* [decompose](/auto-docs/utils/classes/Matrix.md#decompose)
* [fromArray](/auto-docs/utils/classes/Matrix.md#fromarray)
* [identity](/auto-docs/utils/classes/Matrix.md#identity-1)
* [invert](/auto-docs/utils/classes/Matrix.md#invert)
* [isSimple](/auto-docs/utils/classes/Matrix.md#issimple)
* [prepend](/auto-docs/utils/classes/Matrix.md#prepend)
* [rotate](/auto-docs/utils/classes/Matrix.md#rotate)
* [scale](/auto-docs/utils/classes/Matrix.md#scale)
* [set](/auto-docs/utils/classes/Matrix.md#set)
* [setTransform](/auto-docs/utils/classes/Matrix.md#settransform)
* [toArray](/auto-docs/utils/classes/Matrix.md#toarray)
* [translate](/auto-docs/utils/classes/Matrix.md#translate)

## Constructors

### constructor

**new Matrix**(`a?`, `b?`, `c?`, `d?`, `tx?`, `ty?`)

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `a?` | `number` | `1` | x scale |
| `b?` | `number` | `0` | x skew |
| `c?` | `number` | `0` | y skew |
| `d?` | `number` | `1` | y scale |
| `tx?` | `number` | `0` | x translation |
| `ty?` | `number` | `0` | y translation |

## Properties

### a

**a**: `number` = `1`

x scale

***

### array

**array**: `null` | `Float32Array` = `null`

***

### b

**b**: `number` = `0`

x skew

***

### c

**c**: `number` = `0`

y skew

***

### d

**d**: `number` = `1`

y scale

***

### tx

**tx**: `number` = `0`

x translation

***

### ty

**ty**: `number` = `0`

y translation

## Accessors

### IDENTITY

`Static` `get` **IDENTITY**(): [`Matrix`](/auto-docs/utils/classes/Matrix.md)

A default (identity) matrix

#### Returns

[`Matrix`](/auto-docs/utils/classes/Matrix.md)

***

### TEMP\_MATRIX

`Static` `get` **TEMP\_MATRIX**(): [`Matrix`](/auto-docs/utils/classes/Matrix.md)

A temp matrix

#### Returns

[`Matrix`](/auto-docs/utils/classes/Matrix.md)

## Methods

### append

**append**(`matrix`): [`Matrix`](/auto-docs/utils/classes/Matrix.md)

矩阵乘法，当前矩阵 \* matrix
Appends the given Matrix to this Matrix.

#### Parameters

| Name | Type |
| :------ | :------ |
| `matrix` | [`Matrix`](/auto-docs/utils/classes/Matrix.md) |

#### Returns

[`Matrix`](/auto-docs/utils/classes/Matrix.md)

***

### apply

**apply**(`pos`, `newPos?`): [`IPoint`](/auto-docs/utils/interfaces/IPoint.md)

Get a new position with the current transformation applied.
Can be used to go from a child's coordinate space to the world coordinate space. (e.g. rendering)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pos` | [`IPoint`](/auto-docs/utils/interfaces/IPoint.md) | The origin |
| `newPos?` | [`IPoint`](/auto-docs/utils/interfaces/IPoint.md) | The point that the new position is assigned to (allowed to be same as input) |

#### Returns

[`IPoint`](/auto-docs/utils/interfaces/IPoint.md)

The new point, transformed through this matrix

***

### applyInverse

**applyInverse**(`pos`, `newPos?`): [`IPoint`](/auto-docs/utils/interfaces/IPoint.md)

Get a new position with the inverse of the current transformation applied.
Can be used to go from the world coordinate space to a child's coordinate space. (e.g. input)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pos` | [`IPoint`](/auto-docs/utils/interfaces/IPoint.md) | The origin |
| `newPos?` | [`IPoint`](/auto-docs/utils/interfaces/IPoint.md) | The point that the new position is assigned to (allowed to be same as input) |

#### Returns

[`IPoint`](/auto-docs/utils/interfaces/IPoint.md)

The new point, inverse-transformed through this matrix

***

### clone

**clone**(): [`Matrix`](/auto-docs/utils/classes/Matrix.md)

Creates a new Matrix object with the same values as this one.

#### Returns

[`Matrix`](/auto-docs/utils/classes/Matrix.md)

A copy of this matrix.

***

### copyFrom

**copyFrom**(`matrix`): [`Matrix`](/auto-docs/utils/classes/Matrix.md)

Changes the values of the matrix to be the same as the ones in given matrix

#### Parameters

| Name | Type |
| :------ | :------ |
| `matrix` | [`Matrix`](/auto-docs/utils/classes/Matrix.md) |

#### Returns

[`Matrix`](/auto-docs/utils/classes/Matrix.md)

***

### copyTo

**copyTo**(`matrix`): [`Matrix`](/auto-docs/utils/classes/Matrix.md)

Changes the values of the given matrix to be the same as the ones in this matrix

#### Parameters

| Name | Type |
| :------ | :------ |
| `matrix` | [`Matrix`](/auto-docs/utils/classes/Matrix.md) |

#### Returns

[`Matrix`](/auto-docs/utils/classes/Matrix.md)

The matrix given in parameter with its values updated.

***

### decompose

**decompose**(`transform`): [`Transform`](/auto-docs/utils/classes/Transform.md)

Decomposes the matrix (x, y, scaleX, scaleY, and rotation) and sets the properties on to a transform.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transform` | [`Transform`](/auto-docs/utils/classes/Transform.md) | The transform to apply the properties to. |

#### Returns

[`Transform`](/auto-docs/utils/classes/Transform.md)

The transform with the newly applied properties

***

### fromArray

**fromArray**(`array`): [`Matrix`](/auto-docs/utils/classes/Matrix.md)

Creates a Matrix object based on the given array. The Element to Matrix mapping order is as follows:

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `array` | `number`\[] | The array that the matrix will be populated from. |

#### Returns

[`Matrix`](/auto-docs/utils/classes/Matrix.md)

***

### identity

**identity**(): [`Matrix`](/auto-docs/utils/classes/Matrix.md)

Resets this Matrix to an identity (default) matrix.

#### Returns

[`Matrix`](/auto-docs/utils/classes/Matrix.md)

***

### invert

**invert**(): [`Matrix`](/auto-docs/utils/classes/Matrix.md)

Inverts this matrix

#### Returns

[`Matrix`](/auto-docs/utils/classes/Matrix.md)

***

### isSimple

**isSimple**(): `boolean`

未做旋转的矩阵

#### Returns

`boolean`

***

### prepend

**prepend**(`matrix`): [`Matrix`](/auto-docs/utils/classes/Matrix.md)

矩阵乘法，matrix \* 当前矩阵
Prepends the given Matrix to this Matrix.

#### Parameters

| Name | Type |
| :------ | :------ |
| `matrix` | [`Matrix`](/auto-docs/utils/classes/Matrix.md) |

#### Returns

[`Matrix`](/auto-docs/utils/classes/Matrix.md)

***

### rotate

**rotate**(`angle`): [`Matrix`](/auto-docs/utils/classes/Matrix.md)

Applies a rotation transformation to the matrix.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `angle` | `number` | The angle in radians. |

#### Returns

[`Matrix`](/auto-docs/utils/classes/Matrix.md)

***

### scale

**scale**(`x`, `y`): [`Matrix`](/auto-docs/utils/classes/Matrix.md)

Applies a scale transformation to the matrix.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | `number` | The amount to scale horizontally |
| `y` | `number` | The amount to scale vertically |

#### Returns

[`Matrix`](/auto-docs/utils/classes/Matrix.md)

***

### set

**set**(`a`, `b`, `c`, `d`, `tx`, `ty`): [`Matrix`](/auto-docs/utils/classes/Matrix.md)

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

[`Matrix`](/auto-docs/utils/classes/Matrix.md)

***

### setTransform

**setTransform**(`x`, `y`, `pivotX`, `pivotY`, `scaleX`, `scaleY`, `rotation`, `skewX`, `skewY`): [`Matrix`](/auto-docs/utils/classes/Matrix.md)

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

[`Matrix`](/auto-docs/utils/classes/Matrix.md)

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

**translate**(`x`, `y`): [`Matrix`](/auto-docs/utils/classes/Matrix.md)

Translates the matrix on the x and y.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | `number` | How much to translate x by |
| `y` | `number` | How much to translate y by |

#### Returns

[`Matrix`](/auto-docs/utils/classes/Matrix.md)
