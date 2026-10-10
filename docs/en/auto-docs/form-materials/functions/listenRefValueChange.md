# Function: listenRefValueChange

**listenRefValueChange**(`cb`): `EffectOptions`\[]

Example:
const formMeta = {
effect: {
'inputsValues.\*': listenRefValueChange(({ name, variable, form }) => {
const schema = JsonSchemaUtils.astToSchema(variable?.type);
form.setValueIn(`${name}.schema`, schema);
})
}
}

#### Parameters

| Name | Type |
| :------ | :------ |
| `cb` | (`props`: `EffectFuncProps`<[`IFlowRefValue`](/en/auto-docs/form-materials/interfaces/IFlowRefValue.md), `any`> & { `variable?`: `BaseVariableField`<`any`>  }) => `void` |

#### Returns

`EffectOptions`\[]
