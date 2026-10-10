# Function: event

**event**<`Name`, `Params`>(`name`, `handler`): `EventPluginSpec`<`Name`, `Params`>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Name` | extends `string` |
| `Params` | `Params` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `Name` |
| `handler` | (`update`: `ViewUpdate`) => typeof [`EVENT_SILENT`](/auto-docs/coze-editor/variables/EVENT_SILENT.md) | `Params` |

#### Returns

`EventPluginSpec`<`Name`, `Params`>
