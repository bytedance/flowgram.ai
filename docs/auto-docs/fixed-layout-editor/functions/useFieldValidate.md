# Function: useFieldValidate

**useFieldValidate**(`name?`): () => `void`

Get validate method of a field with given name. the returned function could possibly do nothing if the field is not found.
The reason could be that the field is not rendered yet or the name given is wrong.

#### Parameters

| Name | Type |
| :------ | :------ |
| `name?` | `string` |

#### Returns

`fn`

(): `void`

##### Returns

`void`
