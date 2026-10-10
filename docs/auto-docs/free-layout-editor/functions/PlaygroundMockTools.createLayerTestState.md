# Function: createLayerTestState

[PlaygroundMockTools](/auto-docs/free-layout-editor/modules/PlaygroundMockTools.md).createLayerTestState

**createLayerTestState**<`T`>(`layerRegistry`, `opts?`, `modules?`): [`LayerTestState`](/auto-docs/free-layout-editor/classes/PlaygroundMockTools.LayerTestState.md)<`T`>

创建layer, 并记录layer的回调数据

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Layer`](/auto-docs/free-layout-editor/classes/Layer.md)<`any`, `any`, `T`> = [`Layer`](/auto-docs/free-layout-editor/classes/Layer.md)<`any`, `any`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `layerRegistry` | [`LayerRegistry`](/auto-docs/free-layout-editor/interfaces/LayerRegistry.md)<`T`> |
| `opts?` | `any` |
| `modules?` | [`ContainerModule`](/auto-docs/free-layout-editor/interfaces/interfaces.ContainerModule.md)\[] |

#### Returns

[`LayerTestState`](/auto-docs/free-layout-editor/classes/PlaygroundMockTools.LayerTestState.md)<`T`>
