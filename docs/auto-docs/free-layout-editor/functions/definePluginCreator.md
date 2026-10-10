# Function: definePluginCreator

**definePluginCreator**<`Options`, `CTX`>(`config`): [`PluginCreator`](/auto-docs/free-layout-editor/types/PluginCreator.md)<`Options`>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Options` | `Options` |
| `CTX` | extends [`PluginContext`](/auto-docs/free-layout-editor/variables/PluginContext-1.md) = [`PluginContext`](/auto-docs/free-layout-editor/variables/PluginContext-1.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | { `containerModules?`: [`ContainerModule`](/auto-docs/free-layout-editor/interfaces/interfaces.ContainerModule.md)\[] ; `contributionKeys?`: [`ServiceIdentifier`](/auto-docs/free-layout-editor/types/interfaces.ServiceIdentifier.md)<`unknown`>\[] ; `singleton?`: `boolean`  } & [`PluginConfig`](/auto-docs/free-layout-editor/interfaces/PluginConfig.md)<`Options`, `CTX`> |

#### Returns

[`PluginCreator`](/auto-docs/free-layout-editor/types/PluginCreator.md)<`Options`>
