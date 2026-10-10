# Interface: PlaygroundLayerOptions

## Hierarchy

* [`LayerOptions`](/en/auto-docs/core/variables/LayerOptions-1.md)

  ↳ **`PlaygroundLayerOptions`**

## Table of contents

### Properties

* [hoverService](/en/auto-docs/core/interfaces/PlaygroundLayerOptions.md#hoverservice)
* [ineractiveType](/en/auto-docs/core/interfaces/PlaygroundLayerOptions.md#ineractivetype)
* [preventGlobalGesture](/en/auto-docs/core/interfaces/PlaygroundLayerOptions.md#preventglobalgesture)

## Properties

### hoverService

`Optional` **hoverService**: `Object`

悬浮服务

#### Type declaration

| Name | Type |
| :------ | :------ |
| `clearHovered` | () => `void` |
| `isSomeHovered` | () => `boolean` |
| `updateHoverPosition` | (`position`: [`PositionSchema`](/en/auto-docs/core/interfaces/PositionSchema.md), `target?`: `HTMLElement`) => `void` |

***

### ineractiveType

`Optional` **ineractiveType**: [`PlaygroundInteractiveType`](/en/auto-docs/core/types/PlaygroundInteractiveType.md)

***

### preventGlobalGesture

`Optional` **preventGlobalGesture**: `boolean`

阻止浏览器默认的手势（苹果触摸板），包含：放大缩小、左右滑动翻页，默认为 false
