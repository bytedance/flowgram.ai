# Interface: WorkflowLineUIState

## Table of contents

### Properties

* [className](/auto-docs/free-layout-core/interfaces/WorkflowLineUIState.md#classname)
* [curvature](/auto-docs/free-layout-core/interfaces/WorkflowLineUIState.md#curvature)
* [disabled](/auto-docs/free-layout-core/interfaces/WorkflowLineUIState.md#disabled)
* [flowing](/auto-docs/free-layout-core/interfaces/WorkflowLineUIState.md#flowing)
* [hasError](/auto-docs/free-layout-core/interfaces/WorkflowLineUIState.md#haserror)
* [hideArrow](/auto-docs/free-layout-core/interfaces/WorkflowLineUIState.md#hidearrow)
* [highlightColor](/auto-docs/free-layout-core/interfaces/WorkflowLineUIState.md#highlightcolor)
* [lockedColor](/auto-docs/free-layout-core/interfaces/WorkflowLineUIState.md#lockedcolor)
* [reverse](/auto-docs/free-layout-core/interfaces/WorkflowLineUIState.md#reverse)
* [shrink](/auto-docs/free-layout-core/interfaces/WorkflowLineUIState.md#shrink)
* [strokeWidth](/auto-docs/free-layout-core/interfaces/WorkflowLineUIState.md#strokewidth)
* [strokeWidthSelected](/auto-docs/free-layout-core/interfaces/WorkflowLineUIState.md#strokewidthselected)
* [style](/auto-docs/free-layout-core/interfaces/WorkflowLineUIState.md#style)

## Properties

### className

`Optional` **className**: `string`

React className

***

### curvature

**curvature**: `number`

曲率
only for Bezier,

**`Default`**

```ts
0.25
```

***

### disabled

**disabled**: `boolean`

禁用

***

### flowing

**flowing**: `boolean`

流动

***

### hasError

**hasError**: `boolean`

是否出错

***

### hideArrow

**hideArrow**: `boolean`

隐藏箭头

***

### highlightColor

**highlightColor**: `string`

**`Deprecated`**

use `lockedColor` instead

***

### lockedColor

**lockedColor**: `string`

Line locked color

***

### reverse

**reverse**: `boolean`

箭头反转

***

### shrink

**shrink**: `number`

收缩

**`Default`**

```ts
10
```

***

### strokeWidth

`Optional` **strokeWidth**: `number`

线条宽度

**`Default`**

```ts
2
```

***

### strokeWidthSelected

`Optional` **strokeWidthSelected**: `number`

选中后的线条宽度

**`Default`**

```ts
3
```

***

### style

`Optional` **style**: `CSSProperties`

React style
