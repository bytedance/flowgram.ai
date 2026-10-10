# Function: multiInject

**multiInject**<`T`>(`serviceIdentifier`): (`target`: `DecoratorTarget`<`unknown`>, `targetKey?`: `string` | `symbol`, `indexOrPropertyDescriptor?`: `number` | `TypedPropertyDescriptor`<`T`>) => `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `unknown` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceIdentifier` | [`ServiceIdentifier`](/auto-docs/free-layout-editor/types/interfaces.ServiceIdentifier.md)<`T`> | `LazyServiceIdentifier`<`T`> |

#### Returns

`fn`

(`target`, `targetKey?`, `indexOrPropertyDescriptor?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `DecoratorTarget`<`unknown`> |
| `targetKey?` | `string` | `symbol` |
| `indexOrPropertyDescriptor?` | `number` | `TypedPropertyDescriptor`<`T`> |

##### Returns

`void`
