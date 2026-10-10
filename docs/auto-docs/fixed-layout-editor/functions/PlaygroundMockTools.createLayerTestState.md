# Function: createLayerTestState

[PlaygroundMockTools](/auto-docs/fixed-layout-editor/modules/PlaygroundMockTools.md).createLayerTestState

**createLayerTestState**<`T`>(`layerRegistry`, `opts?`, `modules?`): [`LayerTestState`](/auto-docs/fixed-layout-editor/classes/PlaygroundMockTools.LayerTestState.md)<`T`>

创建layer, 并记录layer的回调数据

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Layer`](/auto-docs/fixed-layout-editor/classes/Layer.md)<`any`, `any`, `T`> = [`Layer`](/auto-docs/fixed-layout-editor/classes/Layer.md)<`any`, `any`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `layerRegistry` | [`LayerRegistry`](/auto-docs/fixed-layout-editor/interfaces/LayerRegistry.md)<`T`> |
| `opts?` | `any` |
| `modules?` | [`ContainerModule`](/auto-docs/fixed-layout-editor/interfaces/interfaces.ContainerModule.md)\[] |

#### Returns

[`LayerTestState`](/auto-docs/fixed-layout-editor/classes/PlaygroundMockTools.LayerTestState.md)<`T`>
