# Interface: FormItemHooks\<T>

## Type parameters

| Name |
| :------ |
| `T` |

## Table of contents

### Properties

* [afterClone](/auto-docs/form-core/interfaces/FormItemHooks.md#afterclone)
* [onClone](/auto-docs/form-core/interfaces/FormItemHooks.md#onclone)
* [onInit](/auto-docs/form-core/interfaces/FormItemHooks.md#oninit)
* [onSubmit](/auto-docs/form-core/interfaces/FormItemHooks.md#onsubmit)
* [onValidate](/auto-docs/form-core/interfaces/FormItemHooks.md#onvalidate)

## Properties

### afterClone

`Optional` **afterClone**: (`params`: [`FormItemHookParams`](/auto-docs/form-core/interfaces/FormItemHookParams.md) & `T`) => `void`

#### Type declaration

(`params`): `void`

克隆后执行的逻辑

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`FormItemHookParams`](/auto-docs/form-core/interfaces/FormItemHookParams.md) & `T` |

##### Returns

`void`

***

### onClone

`Optional` **onClone**: (`params`: [`FormItemHookParams`](/auto-docs/form-core/interfaces/FormItemHookParams.md) & `T`) => `MaybePromise`<`void`>

#### Type declaration

(`params`): `MaybePromise`<`void`>

FormItem克隆时钩子

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`FormItemHookParams`](/auto-docs/form-core/interfaces/FormItemHookParams.md) & `T` |

##### Returns

`MaybePromise`<`void`>

***

### onInit

`Optional` **onInit**: (`params`: [`FormItemHookParams`](/auto-docs/form-core/interfaces/FormItemHookParams.md) & `T`) => `void`

#### Type declaration

(`params`): `void`

FormItem初始化钩子

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`FormItemHookParams`](/auto-docs/form-core/interfaces/FormItemHookParams.md) & `T` |

##### Returns

`void`

***

### onSubmit

`Optional` **onSubmit**: (`params`: [`FormItemHookParams`](/auto-docs/form-core/interfaces/FormItemHookParams.md) & `T`) => `void`

#### Type declaration

(`params`): `void`

FormItem提交时钩子

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`FormItemHookParams`](/auto-docs/form-core/interfaces/FormItemHookParams.md) & `T` |

##### Returns

`void`

***

### onValidate

`Optional` **onValidate**: (`params`: [`FormItemHookParams`](/auto-docs/form-core/interfaces/FormItemHookParams.md) & `T`) => `void`

#### Type declaration

(`params`): `void`

FormItem全局校验时钩子

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`FormItemHookParams`](/auto-docs/form-core/interfaces/FormItemHookParams.md) & `T` |

##### Returns

`void`
