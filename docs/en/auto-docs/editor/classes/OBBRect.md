# Class: OBBRect

Oriented Bounding Box (OBB)

**`See`**

https://en.wikipedia.org/wiki/Bounding\_volume

## Table of contents

### Constructors

* [constructor](/en/auto-docs/editor/classes/OBBRect.md#constructor)

### Properties

* [axesX](/en/auto-docs/editor/classes/OBBRect.md#axesx)
* [axesY](/en/auto-docs/editor/classes/OBBRect.md#axesy)
* [centerPoint](/en/auto-docs/editor/classes/OBBRect.md#centerpoint)

### Methods

* [getProjectionRadius](/en/auto-docs/editor/classes/OBBRect.md#getprojectionradius)

## Constructors

### constructor

**new OBBRect**(`centerPoint`, `width`, `height`, `rotation`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `centerPoint` | [`IPoint`](/en/auto-docs/editor/interfaces/IPoint.md) | - |
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
