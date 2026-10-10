# Interface: HistoryPluginOptions\<T>

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `PluginContext` |

## Table of contents

### Properties

* [enable](/auto-docs/free-history-plugin/interfaces/HistoryPluginOptions.md#enable)
* [enableChangeNode](/auto-docs/free-history-plugin/interfaces/HistoryPluginOptions.md#enablechangenode)
* [onApply](/auto-docs/free-history-plugin/interfaces/HistoryPluginOptions.md#onapply)

## Properties

### enable

`Optional` **enable**: `boolean`

***

### enableChangeNode

`Optional` **enableChangeNode**: `boolean`

***

### onApply

`Optional` **onApply**: (`ctx`: `T`, `operation`: [`Operation`](/auto-docs/free-history-plugin/interfaces/Operation.md)<`unknown`>) => `void`

#### Type declaration

(`ctx`, `operation`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `T` |
| `operation` | [`Operation`](/auto-docs/free-history-plugin/interfaces/Operation.md)<`unknown`> |

##### Returns

`void`
