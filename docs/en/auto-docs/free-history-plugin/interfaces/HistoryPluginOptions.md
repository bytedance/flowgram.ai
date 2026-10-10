# Interface: HistoryPluginOptions\<T>

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `PluginContext` |

## Table of contents

### Properties

* [enable](/en/auto-docs/free-history-plugin/interfaces/HistoryPluginOptions.md#enable)
* [enableChangeNode](/en/auto-docs/free-history-plugin/interfaces/HistoryPluginOptions.md#enablechangenode)
* [onApply](/en/auto-docs/free-history-plugin/interfaces/HistoryPluginOptions.md#onapply)

## Properties

### enable

`Optional` **enable**: `boolean`

***

### enableChangeNode

`Optional` **enableChangeNode**: `boolean`

***

### onApply

`Optional` **onApply**: (`ctx`: `T`, `operation`: [`Operation`](/en/auto-docs/free-history-plugin/interfaces/Operation.md)<`unknown`>) => `void`

#### Type declaration

(`ctx`, `operation`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `T` |
| `operation` | [`Operation`](/en/auto-docs/free-history-plugin/interfaces/Operation.md)<`unknown`> |

##### Returns

`void`
