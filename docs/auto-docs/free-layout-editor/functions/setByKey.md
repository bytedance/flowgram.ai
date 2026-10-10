# Function: setByKey

**setByKey**(`target`, `key`, `newValue`, `autoCreateObject?`, `clone?`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `any` |
| `key` | `string` |
| `newValue` | `any` |
| `autoCreateObject?` | `boolean` |
| `clone?` | `boolean` |

#### Returns

`any`

**`Example`**

```ts
const obj = {
   position: {
     x: 0
     y: 0
   }
 }
 setByKey(ob, 'position.x', 100) // true
 setByKey(obj, 'size.width', 100) // false
 setBeyKey(obj, 'size.width', 100, true) // true
```
