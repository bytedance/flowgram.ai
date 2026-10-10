# Function: bindConfigEntity

**bindConfigEntity**(`bind`, `entityRegistry`): `void`

让 entity 可以注入到类中

#### Parameters

| Name | Type |
| :------ | :------ |
| `bind` | `Bind` |
| `entityRegistry` | `EntityRegistry`<`Entity`<`EntityOpts`>> |

#### Returns

`void`

**`Example`**

```
   class SomeClass {
     @inject(PlaygroundConfigEntity) playgroundConfig: PlaygroundConfigEntity
   }
```
