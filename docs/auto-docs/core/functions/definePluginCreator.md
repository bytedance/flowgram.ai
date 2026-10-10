# Function: definePluginCreator

**definePluginCreator**<`Options`, `CTX`>(`config`): [`PluginCreator`](/auto-docs/core/types/PluginCreator.md)<`Options`>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Options` | `Options` |
| `CTX` | extends [`PluginContext`](/auto-docs/core/variables/PluginContext-1.md) = [`PluginContext`](/auto-docs/core/variables/PluginContext-1.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | { `containerModules?`: `ContainerModule`\[] ; `contributionKeys?`: `ServiceIdentifier`<`unknown`>\[] ; `singleton?`: `boolean`  } & [`PluginConfig`](/auto-docs/core/interfaces/PluginConfig.md)<`Options`, `CTX`> |

#### Returns

[`PluginCreator`](/auto-docs/core/types/PluginCreator.md)<`Options`>
