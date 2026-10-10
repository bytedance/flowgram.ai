# Interface: PlaygroundLayerOptions

## Hierarchy

* [`LayerOptions`](/auto-docs/playground-react/variables/LayerOptions-1.md)

  ↳ **`PlaygroundLayerOptions`**

## Table of contents

### Properties

* [hoverService](/auto-docs/playground-react/interfaces/PlaygroundLayerOptions.md#hoverservice)
* [ineractiveType](/auto-docs/playground-react/interfaces/PlaygroundLayerOptions.md#ineractivetype)
* [preventGlobalGesture](/auto-docs/playground-react/interfaces/PlaygroundLayerOptions.md#preventglobalgesture)

## Properties

### hoverService

`Optional` **hoverService**: `Object`

悬浮服务

#### Type declaration

| Name | Type |
| :------ | :------ |
| `clearHovered` | () => `void` |
| `isSomeHovered` | () => `boolean` |
| `updateHoverPosition` | (`position`: [`PositionSchema`](/auto-docs/playground-react/interfaces/PositionSchema.md), `target?`: `HTMLElement`) => `void` |

***

### ineractiveType

`Optional` **ineractiveType**: [`PlaygroundInteractiveType`](/auto-docs/playground-react/types/PlaygroundInteractiveType.md)

***

### preventGlobalGesture

`Optional` **preventGlobalGesture**: `boolean`

阻止浏览器默认的手势（苹果触摸板），包含：放大缩小、左右滑动翻页，默认为 false
