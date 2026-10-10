# Function: api

**api**<`Name`, `Params`, `ReturnValue`>(`name`, `handler`): `APIPluginSpec`<`Name`, `Params`, `ReturnValue`>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Name` | extends `string` |
| `Params` | extends `any`\[] |
| `ReturnValue` | `ReturnValue` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `Name` |
| `handler` | (`context`: `APIContext`) => (...`params`: `Params`) => `ReturnValue` |

#### Returns

`APIPluginSpec`<`Name`, `Params`, `ReturnValue`>
