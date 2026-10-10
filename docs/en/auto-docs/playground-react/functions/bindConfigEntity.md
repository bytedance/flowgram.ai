# Function: bindConfigEntity

**bindConfigEntity**(`bind`, `entityRegistry`): `void`

让 entity 可以注入到类中

#### Parameters

| Name | Type |
| :------ | :------ |
| `bind` | `Bind` |
| `entityRegistry` | [`EntityRegistry`](/en/auto-docs/playground-react/interfaces/EntityRegistry.md)<[`Entity`](/en/auto-docs/playground-react/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/playground-react/interfaces/EntityOpts.md)>> |

#### Returns

`void`

**`Example`**

```
   class SomeClass {
     @inject(PlaygroundConfigEntity) playgroundConfig: PlaygroundConfigEntity
   }
```
