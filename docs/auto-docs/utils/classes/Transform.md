# Class: Transform

Transform that takes care about its versions

**`Memberof`**

PIXI

## Table of contents

### Constructors

* [constructor](/auto-docs/utils/classes/Transform.md#constructor)

### Properties

* [\_parentID](/auto-docs/utils/classes/Transform.md#_parentid)
* [\_worldID](/auto-docs/utils/classes/Transform.md#_worldid)
* [localTransform](/auto-docs/utils/classes/Transform.md#localtransform)
* [pivot](/auto-docs/utils/classes/Transform.md#pivot)
* [position](/auto-docs/utils/classes/Transform.md#position)
* [scale](/auto-docs/utils/classes/Transform.md#scale)
* [skew](/auto-docs/utils/classes/Transform.md#skew)
* [worldTransform](/auto-docs/utils/classes/Transform.md#worldtransform)
* [IDENTITY](/auto-docs/utils/classes/Transform.md#identity)

### Accessors

* [rotation](/auto-docs/utils/classes/Transform.md#rotation)

### Methods

* [setFromMatrix](/auto-docs/utils/classes/Transform.md#setfrommatrix)
* [updateLocalTransform](/auto-docs/utils/classes/Transform.md#updatelocaltransform)
* [updateTransform](/auto-docs/utils/classes/Transform.md#updatetransform)

## Constructors

### constructor

**new Transform**()

## Properties

### \_parentID

**\_parentID**: `number`

***

### \_worldID

**\_worldID**: `number`

***

### localTransform

**localTransform**: [`Matrix`](/auto-docs/utils/classes/Matrix.md)

***

### pivot

**pivot**: `ObservablePoint`<`any`>

***

### position

**position**: `ObservablePoint`<`any`>

***

### scale

**scale**: `ObservablePoint`<`any`>

***

### skew

**skew**: `ObservablePoint`<`any`>

***

### worldTransform

**worldTransform**: [`Matrix`](/auto-docs/utils/classes/Matrix.md)

***

### IDENTITY

`Static` `Readonly` **IDENTITY**: [`Transform`](/auto-docs/utils/classes/Transform.md)

A default (identity) transform

**`Static`**

**`Constant`**

**`Member`**

## Accessors

### rotation

`get` **rotation**(): `number`

The rotation of the object in radians.

#### Returns

`number`

**`Member`**

`set` **rotation**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

## Methods

### setFromMatrix

**setFromMatrix**(`matrix`): `void`

Decomposes a matrix and sets the transforms properties based on it.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `matrix` | [`Matrix`](/auto-docs/utils/classes/Matrix.md) | The matrix to decompose |

#### Returns

`void`

***

### updateLocalTransform

**updateLocalTransform**(): `void`

Updates the local transformation matrix.

#### Returns

`void`

***

### updateTransform

**updateTransform**(`parentTransform`): `void`

Updates the local and the world transformation matrices.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `parentTransform` | [`Transform`](/auto-docs/utils/classes/Transform.md) | The parent transform |

#### Returns

`void`
