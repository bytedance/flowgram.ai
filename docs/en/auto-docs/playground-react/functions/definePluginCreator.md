# Function: definePluginCreator

**definePluginCreator**<`Options`, `CTX`>(`config`): [`PluginCreator`](/en/auto-docs/playground-react/types/PluginCreator.md)<`Options`>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Options` | `Options` |
| `CTX` | extends [`PluginContext`](/en/auto-docs/playground-react/variables/PluginContext-1.md) = [`PluginContext`](/en/auto-docs/playground-react/variables/PluginContext-1.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | { `containerModules?`: `ContainerModule`\[] ; `contributionKeys?`: `ServiceIdentifier`<`unknown`>\[] ; `singleton?`: `boolean`  } & [`PluginConfig`](/en/auto-docs/playground-react/interfaces/PluginConfig.md)<`Options`, `CTX`> |

#### Returns

[`PluginCreator`](/en/auto-docs/playground-react/types/PluginCreator.md)<`Options`>
