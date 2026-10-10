# Interface: FreeLinesPluginOptions

## Hierarchy

* [`LinesLayerOptions`](/en/auto-docs/free-lines-plugin/interfaces/LinesLayerOptions.md)

  ↳ **`FreeLinesPluginOptions`**

## Table of contents

### Properties

* [contributions](/en/auto-docs/free-lines-plugin/interfaces/FreeLinesPluginOptions.md#contributions)
* [customLineProps](/en/auto-docs/free-lines-plugin/interfaces/FreeLinesPluginOptions.md#customlineprops)
* [defaultLineType](/en/auto-docs/free-lines-plugin/interfaces/FreeLinesPluginOptions.md#defaultlinetype)
* [defaultLineUIState](/en/auto-docs/free-lines-plugin/interfaces/FreeLinesPluginOptions.md#defaultlineuistate)
* [renderInsideLine](/en/auto-docs/free-lines-plugin/interfaces/FreeLinesPluginOptions.md#renderinsideline)
* [renderLine](/en/auto-docs/free-lines-plugin/interfaces/FreeLinesPluginOptions.md#renderline)

## Properties

### contributions

`Optional` **contributions**: `WorkflowLineRenderContributionFactory`\[]

***

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

#### Inherited from

[LinesLayerOptions](/en/auto-docs/free-lines-plugin/interfaces/LinesLayerOptions.md).[customLineProps](/en/auto-docs/free-lines-plugin/interfaces/LinesLayerOptions.md#customlineprops)

***

### defaultLineType

`Optional` **defaultLineType**: `LineRenderType`

***

### defaultLineUIState

`Optional` **defaultLineUIState**: `Partial`<`WorkflowLineUIState`>

***

### renderInsideLine

`Optional` **renderInsideLine**: `FC`<[`LineRenderProps`](/en/auto-docs/free-lines-plugin/interfaces/LineRenderProps.md)>

#### Inherited from

[LinesLayerOptions](/en/auto-docs/free-lines-plugin/interfaces/LinesLayerOptions.md).[renderInsideLine](/en/auto-docs/free-lines-plugin/interfaces/LinesLayerOptions.md#renderinsideline)

***

### renderLine

`Optional` **renderLine**: `FC`<[`LineRenderProps`](/en/auto-docs/free-lines-plugin/interfaces/LineRenderProps.md)>

#### Inherited from

[LinesLayerOptions](/en/auto-docs/free-lines-plugin/interfaces/LinesLayerOptions.md).[renderLine](/en/auto-docs/free-lines-plugin/interfaces/LinesLayerOptions.md#renderline)
