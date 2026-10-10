# Function: getByKey

**getByKey**(`target`, `key`): `any` | `undefined`

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `any` |
| `key` | `string` |

#### Returns

`any` | `undefined`

**`Example`**

```ts
const obj = {
   position: {
     x: 0
     y: 0
   }
 }
 getByKey(ob, 'position.x') // 0
```
