# Interface: BackgroundLayerOptions

## Table of contents

### Properties

* [backgroundColor](/en/auto-docs/background-plugin/interfaces/BackgroundLayerOptions.md#backgroundcolor)
* [dotColor](/en/auto-docs/background-plugin/interfaces/BackgroundLayerOptions.md#dotcolor)
* [dotFillColor](/en/auto-docs/background-plugin/interfaces/BackgroundLayerOptions.md#dotfillcolor)
* [dotOpacity](/en/auto-docs/background-plugin/interfaces/BackgroundLayerOptions.md#dotopacity)
* [dotSize](/en/auto-docs/background-plugin/interfaces/BackgroundLayerOptions.md#dotsize)
* [gridSize](/en/auto-docs/background-plugin/interfaces/BackgroundLayerOptions.md#gridsize)
* [logo](/en/auto-docs/background-plugin/interfaces/BackgroundLayerOptions.md#logo)

## Properties

### backgroundColor

`Optional` **backgroundColor**: `string`

背景颜色，默认透明

***

### dotColor

`Optional` **dotColor**: `string`

点的颜色，默认 "#eceeef"

***

### dotFillColor

`Optional` **dotFillColor**: `string`

点的填充颜色，默认与stroke颜色相同

***

### dotOpacity

`Optional` **dotOpacity**: `number`

点的透明度，默认 0.5

***

### dotSize

`Optional` **dotSize**: `number`

点的大小，默认 1px

***

### gridSize

`Optional` **gridSize**: `number`

网格间距，默认 20px

***

### logo

`Optional` **logo**: `Object`

Logo 配置

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `color?` | `string` | Logo 颜色（仅文本），默认 "#cccccc" |
| `fontFamily?` | `string` | Logo 字体家族（仅文本），默认 'Arial, sans-serif' |
| `fontSize?` | `number` | Logo 字体大小（仅文本），默认根据 size 计算 |
| `fontWeight?` | `number` | `"normal"` | `"bold"` | `"lighter"` | Logo 字体粗细（仅文本），默认 'normal' |
| `imageUrl?` | `string` | Logo 图片 URL |
| `neumorphism?` | { `darkShadowColor?`: `string` ; `enabled?`: `boolean` ; `intensity?`: `number` ; `lightShadowColor?`: `string` ; `raised?`: `boolean` ; `shadowBlur?`: `number` ; `shadowOffset?`: `number` ; `textColor?`: `string`  } | 新拟态（Neumorphism）效果配置 |
| `neumorphism.darkShadowColor?` | `string` | 暗色阴影颜色，默认自动计算（背景色的暗色版本） |
| `neumorphism.enabled?` | `boolean` | 是否启用新拟态效果，默认 false |
| `neumorphism.intensity?` | `number` | 效果强度（0-1），影响阴影的透明度，默认 0.3 |
| `neumorphism.lightShadowColor?` | `string` | 亮色阴影颜色，默认自动计算（背景色的亮色版本） |
| `neumorphism.raised?` | `boolean` | 凸起效果（true）还是凹陷效果（false），默认 true |
| `neumorphism.shadowBlur?` | `number` | 阴影模糊半径，默认 12 |
| `neumorphism.shadowOffset?` | `number` | 阴影偏移距离，默认 6 |
| `neumorphism.textColor?` | `string` | 主要文字颜色，应该与背景色接近，默认自动计算 |
| `offset?` | { `x`: `number` ; `y`: `number`  } | 自定义偏移 |
| `offset.x` | `number` | - |
| `offset.y` | `number` | - |
| `opacity?` | `number` | Logo 透明度，默认 0.1 |
| `position?` | `"center"` | `"top-left"` | `"top-right"` | `"bottom-left"` | `"bottom-right"` | Logo 位置，默认 'center' |
| `size?` | `number` | `"small"` | `"medium"` | `"large"` | Logo 大小，默认 'medium' |
| `text?` | `string` | Logo 文本内容 |
