# Interface: LinesLayerOptions

## Hierarchy

* **`LinesLayerOptions`**

  ↳ [`FreeLinesPluginOptions`](/en/auto-docs/free-lines-plugin/interfaces/FreeLinesPluginOptions.md)

## Table of contents

### Properties

* [customLineProps](/en/auto-docs/free-lines-plugin/interfaces/LinesLayerOptions.md#customlineprops)
* [renderInsideLine](/en/auto-docs/free-lines-plugin/interfaces/LinesLayerOptions.md#renderinsideline)
* [renderLine](/en/auto-docs/free-lines-plugin/interfaces/LinesLayerOptions.md#renderline)

## Properties

### customLineProps

`Optional` **customLineProps**: (`line`: `WorkflowLineEntity`, `oldProps`: [`LineRenderProps`](/en/auto-docs/free-lines-plugin/interfaces/LineRenderProps.md)) => [`LineRenderProps`](/en/auto-docs/free-lines-plugin/interfaces/LineRenderProps.md)

#### Type declaration

(`line`, `oldProps`): [`LineRenderProps`](/en/auto-docs/free-lines-plugin/interfaces/LineRenderProps.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `line` | `WorkflowLineEntity` |
| `oldProps` | [`LineRenderProps`](/en/auto-docs/free-lines-plugin/interfaces/LineRenderProps.md) |

##### Returns

[`LineRenderProps`](/en/auto-docs/free-lines-plugin/interfaces/LineRenderProps.md)

***

### renderInsideLine

`Optional` **renderInsideLine**: `FC`<[`LineRenderProps`](/en/auto-docs/free-lines-plugin/interfaces/LineRenderProps.md)>

***

### renderLine

`Optional` **renderLine**: `FC`<[`LineRenderProps`](/en/auto-docs/free-lines-plugin/interfaces/LineRenderProps.md)>
