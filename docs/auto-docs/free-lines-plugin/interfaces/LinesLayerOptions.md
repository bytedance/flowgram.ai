# Interface: LinesLayerOptions

## Hierarchy

* **`LinesLayerOptions`**

  ↳ [`FreeLinesPluginOptions`](/auto-docs/free-lines-plugin/interfaces/FreeLinesPluginOptions.md)

## Table of contents

### Properties

* [customLineProps](/auto-docs/free-lines-plugin/interfaces/LinesLayerOptions.md#customlineprops)
* [renderInsideLine](/auto-docs/free-lines-plugin/interfaces/LinesLayerOptions.md#renderinsideline)
* [renderLine](/auto-docs/free-lines-plugin/interfaces/LinesLayerOptions.md#renderline)

## Properties

### customLineProps

`Optional` **customLineProps**: (`line`: `WorkflowLineEntity`, `oldProps`: [`LineRenderProps`](/auto-docs/free-lines-plugin/interfaces/LineRenderProps.md)) => [`LineRenderProps`](/auto-docs/free-lines-plugin/interfaces/LineRenderProps.md)

#### Type declaration

(`line`, `oldProps`): [`LineRenderProps`](/auto-docs/free-lines-plugin/interfaces/LineRenderProps.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `line` | `WorkflowLineEntity` |
| `oldProps` | [`LineRenderProps`](/auto-docs/free-lines-plugin/interfaces/LineRenderProps.md) |

##### Returns

[`LineRenderProps`](/auto-docs/free-lines-plugin/interfaces/LineRenderProps.md)

***

### renderInsideLine

`Optional` **renderInsideLine**: `FC`<[`LineRenderProps`](/auto-docs/free-lines-plugin/interfaces/LineRenderProps.md)>

***

### renderLine

`Optional` **renderLine**: `FC`<[`LineRenderProps`](/auto-docs/free-lines-plugin/interfaces/LineRenderProps.md)>
