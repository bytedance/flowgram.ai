# Interface: FlowTransitionLabel

## Table of contents

### Properties

* [labelId](/auto-docs/editor/interfaces/FlowTransitionLabel.md#labelid)
* [offset](/auto-docs/editor/interfaces/FlowTransitionLabel.md#offset)
* [origin](/auto-docs/editor/interfaces/FlowTransitionLabel.md#origin)
* [props](/auto-docs/editor/interfaces/FlowTransitionLabel.md#props)
* [renderKey](/auto-docs/editor/interfaces/FlowTransitionLabel.md#renderkey)
* [rotate](/auto-docs/editor/interfaces/FlowTransitionLabel.md#rotate)
* [type](/auto-docs/editor/interfaces/FlowTransitionLabel.md#type)
* [width](/auto-docs/editor/interfaces/FlowTransitionLabel.md#width)

## Properties

### labelId

`Optional` **labelId**: `string`

***

### offset

**offset**: [`IPoint`](/auto-docs/editor/interfaces/IPoint.md)

***

### origin

`Optional` **origin**: \[`number`, `number`]

Anchor point for positioning, relative to the label's bounding box
重心偏移量，相对于标签边界框

Format: \[x, y] / 格式：\[x, y]
Default Value: \[0.5, 0.5] indicates center / 默认值：\[0.5, 0.5] 表示居中

***

### props

`Optional` **props**: `Record`<`string`, `any`>

***

### renderKey

`Optional` **renderKey**: `string`

***

### rotate

`Optional` **rotate**: `string`

***

### type

**type**: [`FlowTransitionLabelEnum`](/auto-docs/editor/enums/FlowTransitionLabelEnum.md)

***

### width

`Optional` **width**: `number`
