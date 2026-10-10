# Interface: HistoryPluginOptions\<T>

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | [`PluginContext`](/auto-docs/fixed-layout-editor/variables/PluginContext-1.md) |

## Hierarchy

* **`HistoryPluginOptions`**

  ↳ [`FixedHistoryPluginOptions`](/auto-docs/fixed-layout-editor/interfaces/FixedHistoryPluginOptions.md)

## Table of contents

### Properties

* [enable](/auto-docs/fixed-layout-editor/interfaces/HistoryPluginOptions.md#enable)
* [enableChangeNode](/auto-docs/fixed-layout-editor/interfaces/HistoryPluginOptions.md#enablechangenode)
* [onApply](/auto-docs/fixed-layout-editor/interfaces/HistoryPluginOptions.md#onapply)

## Properties

### enable

`Optional` **enable**: `boolean`

***

### enableChangeNode

`Optional` **enableChangeNode**: `boolean`

***

### onApply

`Optional` **onApply**: (`ctx`: `T`, `operation`: [`Operation`](/auto-docs/fixed-layout-editor/interfaces/Operation.md)<`unknown`>) => `void`

#### Type declaration

(`ctx`, `operation`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `T` |
| `operation` | [`Operation`](/auto-docs/fixed-layout-editor/interfaces/Operation.md)<`unknown`> |

##### Returns

`void`
