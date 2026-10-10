# Function: arrayUnion

**arrayUnion**(`arr`): `any`\[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `arr` | `any`\[] |

#### Returns

`any`\[]

**`See`**

https://stackoverflow.com/a/9229821
export function arrayUnion(arr: any\[]): any\[] {
return \[...new Set(arr)]
}
