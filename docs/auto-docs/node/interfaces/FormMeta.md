# Interface: FormMeta\<TValues>

## Type parameters

| Name | Type |
| :------ | :------ |
| `TValues` | `any` |

## Table of contents

### Properties

* [defaultValues](/auto-docs/node/interfaces/FormMeta.md#defaultvalues)
* [effect](/auto-docs/node/interfaces/FormMeta.md#effect)
* [formatOnInit](/auto-docs/node/interfaces/FormMeta.md#formatoninit)
* [formatOnSubmit](/auto-docs/node/interfaces/FormMeta.md#formatonsubmit)
* [plugins](/auto-docs/node/interfaces/FormMeta.md#plugins)
* [render](/auto-docs/node/interfaces/FormMeta.md#render)
* [validate](/auto-docs/node/interfaces/FormMeta.md#validate)
* [validateTrigger](/auto-docs/node/interfaces/FormMeta.md#validatetrigger)

## Properties

### defaultValues

`Optional` **defaultValues**: `TValues` | (`context`: `NodeFormContext`) => `TValues`

Form data's complete default value. it will not be sent to formatOnInit, but used directly as form's value when needed.

***

### effect

`Optional` **effect**: `Record`<`string`, [`EffectOptions`](/auto-docs/node/types/EffectOptions.md)\[]>

Form data's effects. It's a key value map, where the key is a pattern of data's path (or field name), the value is an array of effect configuration.

***

### formatOnInit

`Optional` **formatOnInit**: (`value`: `any`, `context`: `NodeFormContext`) => `any`

#### Type declaration

(`value`, `context`): `any`

This function is to format the value when initiate the form, the returned value will be used as the initial value of the form.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `any` | value input to node as initialValue. |
| `context` | `NodeFormContext` |  |

##### Returns

`any`

***

### formatOnSubmit

`Optional` **formatOnSubmit**: (`value`: `any`, `context`: `NodeFormContext`) => `any`

#### Type declaration

(`value`, `context`): `any`

This function is to format the value when FormModel.toJSON is called, the returned value will be used as the final value to be saved .

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `any` | value sent by form before format. |
| `context` | `NodeFormContext` |  |

##### Returns

`any`

***

### plugins

`Optional` **plugins**: [`FormPlugin`](/auto-docs/node/classes/FormPlugin.md)<`any`>\[]

Form's plugins

***

### render

**render**: (`props`: `FormRenderProps`<`any`>) => `ReactElement`<`any`, `string` | `JSXElementConstructor`<`any`>>

#### Type declaration

(`props`): `ReactElement`<`any`, `string` | `JSXElementConstructor`<`any`>>

The render method of the node form content. <Form /> is already integrated, so you don't need to wrap your components with <Form />

##### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `FormRenderProps`<`any`> |

##### Returns

`ReactElement`<`any`, `string` | `JSXElementConstructor`<`any`>>

***

### validate

`Optional` **validate**: `Record`<`string`, [`Validate`](/auto-docs/node/types/Validate.md)<`any`, `any`>> | (`values`: `TValues`, `ctx`: `NodeFormContext`) => `Record`<`string`, [`Validate`](/auto-docs/node/types/Validate.md)<`any`, `any`>>

Form data's validation rules. It's a key value map, where the key is a pattern of data's path (or field name), the value is a validate function.

***

### validateTrigger

`Optional` **validateTrigger**: `ValidateTrigger`

When to trigger the validation.
