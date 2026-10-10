# Function: createLayerTestState

[PlaygroundMockTools](/en/auto-docs/editor/modules/PlaygroundMockTools.md).createLayerTestState

**createLayerTestState**<`T`>(`layerRegistry`, `opts?`, `modules?`): [`LayerTestState`](/en/auto-docs/editor/classes/PlaygroundMockTools.LayerTestState.md)<`T`>

创建layer, 并记录layer的回调数据

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Layer`](/en/auto-docs/editor/classes/Layer.md)<`any`, `any`, `T`> = [`Layer`](/en/auto-docs/editor/classes/Layer.md)<`any`, `any`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `layerRegistry` | [`LayerRegistry`](/en/auto-docs/editor/interfaces/LayerRegistry.md)<`T`> |
| `opts?` | `any` |
| `modules?` | [`ContainerModule`](/en/auto-docs/editor/interfaces/interfaces.ContainerModule.md)\[] |

#### Returns

[`LayerTestState`](/en/auto-docs/editor/classes/PlaygroundMockTools.LayerTestState.md)<`T`>
