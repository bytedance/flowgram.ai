# Function: listenRefSchemaChange

**listenRefSchemaChange**(`cb`): `EffectOptions`\[]

Example:
const formMeta = {
effect: {
'inputsValues.\*': listenRefSchemaChange(({ name, schema, form }) => {
form.setValueIn(`${name}.schema`, schema);
})
}
}

#### Parameters

| Name | Type |
| :------ | :------ |
| `cb` | (`props`: `EffectFuncProps`<[`IFlowRefValue`](/auto-docs/form-materials/interfaces/IFlowRefValue.md), `any`> & { `schema?`: [`IJsonSchema`](/auto-docs/form-materials/interfaces/IJsonSchema.md)<`string`>  }) => `void` |

#### Returns

`EffectOptions`\[]
