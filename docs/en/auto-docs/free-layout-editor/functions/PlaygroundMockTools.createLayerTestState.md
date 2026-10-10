# Function: createLayerTestState

[PlaygroundMockTools](/en/auto-docs/free-layout-editor/modules/PlaygroundMockTools.md).createLayerTestState

**createLayerTestState**<`T`>(`layerRegistry`, `opts?`, `modules?`): [`LayerTestState`](/en/auto-docs/free-layout-editor/classes/PlaygroundMockTools.LayerTestState.md)<`T`>

创建layer, 并记录layer的回调数据

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Layer`](/en/auto-docs/free-layout-editor/classes/Layer.md)<`any`, `any`, `T`> = [`Layer`](/en/auto-docs/free-layout-editor/classes/Layer.md)<`any`, `any`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `layerRegistry` | [`LayerRegistry`](/en/auto-docs/free-layout-editor/interfaces/LayerRegistry.md)<`T`> |
| `opts?` | `any` |
| `modules?` | [`ContainerModule`](/en/auto-docs/free-layout-editor/interfaces/interfaces.ContainerModule.md)\[] |

#### Returns

[`LayerTestState`](/en/auto-docs/free-layout-editor/classes/PlaygroundMockTools.LayerTestState.md)<`T`>
