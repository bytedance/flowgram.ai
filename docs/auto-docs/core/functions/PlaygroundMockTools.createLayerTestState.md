# Function: createLayerTestState

[PlaygroundMockTools](/auto-docs/core/modules/PlaygroundMockTools.md).createLayerTestState

**createLayerTestState**<`T`>(`layerRegistry`, `opts?`, `modules?`): [`LayerTestState`](/auto-docs/core/classes/PlaygroundMockTools.LayerTestState.md)<`T`>

创建layer, 并记录layer的回调数据

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Layer`](/auto-docs/core/classes/Layer.md)<`any`, `any`, `T`> = [`Layer`](/auto-docs/core/classes/Layer.md)<`any`, `any`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `layerRegistry` | [`LayerRegistry`](/auto-docs/core/interfaces/LayerRegistry.md)<`T`> |
| `opts?` | `any` |
| `modules?` | `ContainerModule`\[] |

#### Returns

[`LayerTestState`](/auto-docs/core/classes/PlaygroundMockTools.LayerTestState.md)<`T`>
