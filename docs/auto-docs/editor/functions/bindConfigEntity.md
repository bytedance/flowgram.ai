# Function: bindConfigEntity

**bindConfigEntity**(`bind`, `entityRegistry`): `void`

让 entity 可以注入到类中

#### Parameters

| Name | Type |
| :------ | :------ |
| `bind` | [`Bind`](/auto-docs/editor/types/interfaces.Bind.md) |
| `entityRegistry` | [`EntityRegistry`](/auto-docs/editor/interfaces/EntityRegistry.md)<[`Entity`](/auto-docs/editor/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/editor/interfaces/EntityOpts.md)>> |

#### Returns

`void`

**`Example`**

```
   class SomeClass {
     @inject(PlaygroundConfigEntity) playgroundConfig: PlaygroundConfigEntity
   }
```
