# Interface: SelectBoxPluginOptions

## Hierarchy

* `FlowSelectorBoundsLayerOptions`

* `FlowSelectorBoxOptions`

  ↳ **`SelectBoxPluginOptions`**

## Table of contents

### Properties

* [CustomBoundsRenderer](/en/auto-docs/select-box-plugin/interfaces/SelectBoxPluginOptions.md#customboundsrenderer)
* [SelectorBoxPopover](/en/auto-docs/select-box-plugin/interfaces/SelectBoxPluginOptions.md#selectorboxpopover)
* [backgroundClassName](/en/auto-docs/select-box-plugin/interfaces/SelectBoxPluginOptions.md#backgroundclassname)
* [boundsPadding](/en/auto-docs/select-box-plugin/interfaces/SelectBoxPluginOptions.md#boundspadding)
* [canSelect](/en/auto-docs/select-box-plugin/interfaces/SelectBoxPluginOptions.md#canselect)
* [disableBackground](/en/auto-docs/select-box-plugin/interfaces/SelectBoxPluginOptions.md#disablebackground)
* [enable](/en/auto-docs/select-box-plugin/interfaces/SelectBoxPluginOptions.md#enable)
* [foregroundClassName](/en/auto-docs/select-box-plugin/interfaces/SelectBoxPluginOptions.md#foregroundclassname)
* [ignoreChildrenLength](/en/auto-docs/select-box-plugin/interfaces/SelectBoxPluginOptions.md#ignorechildrenlength)
* [ignoreOneSelect](/en/auto-docs/select-box-plugin/interfaces/SelectBoxPluginOptions.md#ignoreoneselect)

## Properties

### CustomBoundsRenderer

`Optional` **CustomBoundsRenderer**: `FC`<[`SelectorBoxPopoverProps`](/en/auto-docs/select-box-plugin/interfaces/SelectorBoxPopoverProps.md)>

#### Inherited from

FlowSelectorBoundsLayerOptions.CustomBoundsRenderer

***

### SelectorBoxPopover

`Optional` **SelectorBoxPopover**: `FC`<[`SelectorBoxPopoverProps`](/en/auto-docs/select-box-plugin/interfaces/SelectorBoxPopoverProps.md)>

#### Inherited from

FlowSelectorBoundsLayerOptions.SelectorBoxPopover

***

### backgroundClassName

`Optional` **backgroundClassName**: `string`

#### Inherited from

FlowSelectorBoundsLayerOptions.backgroundClassName

***

### boundsPadding

`Optional` **boundsPadding**: `number`

#### Inherited from

FlowSelectorBoundsLayerOptions.boundsPadding

***

### canSelect

`Optional` **canSelect**: (`e`: `MouseEvent`, `entity`: `SelectorBoxConfigEntity`) => `boolean`

#### Type declaration

(`e`, `entity`): `boolean`

默认不提供则为点击空白地方可以框选

##### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `MouseEvent` |
| `entity` | `SelectorBoxConfigEntity` |

##### Returns

`boolean`

#### Inherited from

FlowSelectorBoxOptions.canSelect

***

### disableBackground

`Optional` **disableBackground**: `boolean`

#### Inherited from

FlowSelectorBoundsLayerOptions.disableBackground

***

### enable

`Optional` **enable**: `boolean`

***

### foregroundClassName

`Optional` **foregroundClassName**: `string`

#### Inherited from

FlowSelectorBoundsLayerOptions.foregroundClassName

***

### ignoreChildrenLength

`Optional` **ignoreChildrenLength**: `boolean`

#### Inherited from

FlowSelectorBoundsLayerOptions.ignoreChildrenLength

***

### ignoreOneSelect

`Optional` **ignoreOneSelect**: `boolean`

#### Inherited from

FlowSelectorBoundsLayerOptions.ignoreOneSelect
