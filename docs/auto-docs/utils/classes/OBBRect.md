# Class: OBBRect

Oriented Bounding Box (OBB)

**`See`**

https://en.wikipedia.org/wiki/Bounding\_volume

## Table of contents

### Constructors

* [constructor](/auto-docs/utils/classes/OBBRect.md#constructor)

### Properties

* [axesX](/auto-docs/utils/classes/OBBRect.md#axesx)
* [axesY](/auto-docs/utils/classes/OBBRect.md#axesy)
* [centerPoint](/auto-docs/utils/classes/OBBRect.md#centerpoint)

### Methods

* [getProjectionRadius](/auto-docs/utils/classes/OBBRect.md#getprojectionradius)

## Constructors

### constructor

**new OBBRect**(`centerPoint`, `width`, `height`, `rotation`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `centerPoint` | [`IPoint`](/auto-docs/utils/interfaces/IPoint.md) | - |
| `width` | `number` | - |
| `height` | `number` | - |
| `rotation` | `number` | in radian |

## Properties

### axesX

`Readonly` **axesX**: `Vector2`

***

### axesY

`Readonly` **axesY**: `Vector2`

***

### centerPoint

`Readonly` **centerPoint**: `Vector2`

## Methods

### getProjectionRadius

**getProjectionRadius**(`axis`): `number`

计算投影半径

#### Parameters

| Name | Type |
| :------ | :------ |
| `axis` | `Vector2` |

#### Returns

`number`
