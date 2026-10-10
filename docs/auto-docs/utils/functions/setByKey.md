# Function: setByKey

**setByKey**(`target`, `key`, `newValue`, `autoCreateObject?`, `clone?`): `any`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `target` | `any` | `undefined` |
| `key` | `string` | `undefined` |
| `newValue` | `any` | `undefined` |
| `autoCreateObject` | `boolean` | `true` |
| `clone` | `boolean` | `false` |

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
