# Class: Transform

Transform that takes care about its versions

**`Memberof`**

PIXI

## Table of contents

### Constructors

* [constructor](/en/auto-docs/free-layout-editor/classes/Transform.md#constructor)

### Properties

* [\_parentID](/en/auto-docs/free-layout-editor/classes/Transform.md#_parentid)
* [\_worldID](/en/auto-docs/free-layout-editor/classes/Transform.md#_worldid)
* [localTransform](/en/auto-docs/free-layout-editor/classes/Transform.md#localtransform)
* [pivot](/en/auto-docs/free-layout-editor/classes/Transform.md#pivot)
* [position](/en/auto-docs/free-layout-editor/classes/Transform.md#position)
* [scale](/en/auto-docs/free-layout-editor/classes/Transform.md#scale)
* [skew](/en/auto-docs/free-layout-editor/classes/Transform.md#skew)
* [worldTransform](/en/auto-docs/free-layout-editor/classes/Transform.md#worldtransform)
* [IDENTITY](/en/auto-docs/free-layout-editor/classes/Transform.md#identity)

### Accessors

* [rotation](/en/auto-docs/free-layout-editor/classes/Transform.md#rotation)

### Methods

* [setFromMatrix](/en/auto-docs/free-layout-editor/classes/Transform.md#setfrommatrix)
* [updateLocalTransform](/en/auto-docs/free-layout-editor/classes/Transform.md#updatelocaltransform)
* [updateTransform](/en/auto-docs/free-layout-editor/classes/Transform.md#updatetransform)

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

**localTransform**: [`Matrix`](/en/auto-docs/free-layout-editor/classes/Matrix.md)

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

**worldTransform**: [`Matrix`](/en/auto-docs/free-layout-editor/classes/Matrix.md)

***

### IDENTITY

`Static` `Readonly` **IDENTITY**: [`Transform`](/en/auto-docs/free-layout-editor/classes/Transform.md)

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
| `matrix` | [`Matrix`](/en/auto-docs/free-layout-editor/classes/Matrix.md) | The matrix to decompose |

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
| `parentTransform` | [`Transform`](/en/auto-docs/free-layout-editor/classes/Transform.md) | The parent transform |

#### Returns

`void`
