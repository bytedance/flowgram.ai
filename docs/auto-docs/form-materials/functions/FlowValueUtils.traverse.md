# Function: traverse

[FlowValueUtils](/auto-docs/form-materials/modules/FlowValueUtils.md).traverse

**traverse**(`value`, `options`): `Generator`<{ `path`: `string` ; `pathArr`: `string`\[] ; `value`: [`IFlowValue`](/auto-docs/form-materials/types/IFlowValue.md)  }>

Traverse all flow values in the given value

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `any` | The value to traverse |
| `options` | `Object` | The options to traverse |
| `options.includeTypes` | [`FlowValueType`](/auto-docs/form-materials/types/FlowValueType.md)\[] | - |
| `options.path?` | `string` | - |
| `options.pathArr?` | `string`\[] | - |

#### Returns

`Generator`<{ `path`: `string` ; `pathArr`: `string`\[] ; `value`: [`IFlowValue`](/auto-docs/form-materials/types/IFlowValue.md)  }>

A generator of flow values
