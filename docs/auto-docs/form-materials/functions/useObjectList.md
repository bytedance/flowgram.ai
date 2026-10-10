# Function: useObjectList

**useObjectList**<`ValueType`>(`«destructured»`): `Object`

#### Type parameters

| Name |
| :------ |
| `ValueType` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `onChange` | (`value?`: `ObjectType`<`ValueType`>) => `void` |
| › `sortIndexKey?` | `string` | (`item`: `undefined` | `ValueType`) => `string` |
| › `value?` | `ObjectType`<`ValueType`> |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `add` | (`defaultValue?`: `ValueType`) => `void` |
| `list` | `ListItem`<`ValueType`>\[] |
| `remove` | (`itemId`: `string`) => `void` |
| `updateKey` | (`itemId`: `string`, `key`: `string`) => `void` |
| `updateValue` | (`itemId`: `string`, `value`: `ValueType`) => `void` |
