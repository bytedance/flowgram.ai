# Interface: FreeLinesPluginOptions

## Hierarchy

* [`LinesLayerOptions`](/auto-docs/free-lines-plugin/interfaces/LinesLayerOptions.md)

  ↳ **`FreeLinesPluginOptions`**

## Table of contents

### Properties

* [contributions](/auto-docs/free-lines-plugin/interfaces/FreeLinesPluginOptions.md#contributions)
* [customLineProps](/auto-docs/free-lines-plugin/interfaces/FreeLinesPluginOptions.md#customlineprops)
* [defaultLineType](/auto-docs/free-lines-plugin/interfaces/FreeLinesPluginOptions.md#defaultlinetype)
* [defaultLineUIState](/auto-docs/free-lines-plugin/interfaces/FreeLinesPluginOptions.md#defaultlineuistate)
* [renderInsideLine](/auto-docs/free-lines-plugin/interfaces/FreeLinesPluginOptions.md#renderinsideline)
* [renderLine](/auto-docs/free-lines-plugin/interfaces/FreeLinesPluginOptions.md#renderline)

## Properties

### contributions

`Optional` **contributions**: `WorkflowLineRenderContributionFactory`\[]

***

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

#### Inherited from

[LinesLayerOptions](/auto-docs/free-lines-plugin/interfaces/LinesLayerOptions.md).[customLineProps](/auto-docs/free-lines-plugin/interfaces/LinesLayerOptions.md#customlineprops)

***

### defaultLineType

`Optional` **defaultLineType**: `LineRenderType`

***

### defaultLineUIState

`Optional` **defaultLineUIState**: `Partial`<`WorkflowLineUIState`>

***

### renderInsideLine

`Optional` **renderInsideLine**: `FC`<[`LineRenderProps`](/auto-docs/free-lines-plugin/interfaces/LineRenderProps.md)>

#### Inherited from

[LinesLayerOptions](/auto-docs/free-lines-plugin/interfaces/LinesLayerOptions.md).[renderInsideLine](/auto-docs/free-lines-plugin/interfaces/LinesLayerOptions.md#renderinsideline)

***

### renderLine

`Optional` **renderLine**: `FC`<[`LineRenderProps`](/auto-docs/free-lines-plugin/interfaces/LineRenderProps.md)>

#### Inherited from

[LinesLayerOptions](/auto-docs/free-lines-plugin/interfaces/LinesLayerOptions.md).[renderLine](/auto-docs/free-lines-plugin/interfaces/LinesLayerOptions.md#renderline)
