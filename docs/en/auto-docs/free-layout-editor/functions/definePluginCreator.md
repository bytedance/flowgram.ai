# Function: definePluginCreator

**definePluginCreator**<`Options`, `CTX`>(`config`): [`PluginCreator`](/en/auto-docs/free-layout-editor/types/PluginCreator.md)<`Options`>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Options` | `Options` |
| `CTX` | extends [`PluginContext`](/en/auto-docs/free-layout-editor/variables/PluginContext-1.md) = [`PluginContext`](/en/auto-docs/free-layout-editor/variables/PluginContext-1.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | { `containerModules?`: [`ContainerModule`](/en/auto-docs/free-layout-editor/interfaces/interfaces.ContainerModule.md)\[] ; `contributionKeys?`: [`ServiceIdentifier`](/en/auto-docs/free-layout-editor/types/interfaces.ServiceIdentifier.md)<`unknown`>\[] ; `singleton?`: `boolean`  } & [`PluginConfig`](/en/auto-docs/free-layout-editor/interfaces/PluginConfig.md)<`Options`, `CTX`> |

#### Returns

[`PluginCreator`](/en/auto-docs/free-layout-editor/types/PluginCreator.md)<`Options`>
