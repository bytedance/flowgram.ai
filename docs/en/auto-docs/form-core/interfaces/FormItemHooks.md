# Interface: FormItemHooks\<T>

## Type parameters

| Name |
| :------ |
| `T` |

## Table of contents

### Properties

* [afterClone](/en/auto-docs/form-core/interfaces/FormItemHooks.md#afterclone)
* [onClone](/en/auto-docs/form-core/interfaces/FormItemHooks.md#onclone)
* [onInit](/en/auto-docs/form-core/interfaces/FormItemHooks.md#oninit)
* [onSubmit](/en/auto-docs/form-core/interfaces/FormItemHooks.md#onsubmit)
* [onValidate](/en/auto-docs/form-core/interfaces/FormItemHooks.md#onvalidate)

## Properties

### afterClone

`Optional` **afterClone**: (`params`: [`FormItemHookParams`](/en/auto-docs/form-core/interfaces/FormItemHookParams.md) & `T`) => `void`

#### Type declaration

(`params`): `void`

克隆后执行的逻辑

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`FormItemHookParams`](/en/auto-docs/form-core/interfaces/FormItemHookParams.md) & `T` |

##### Returns

`void`

***

### onClone

`Optional` **onClone**: (`params`: [`FormItemHookParams`](/en/auto-docs/form-core/interfaces/FormItemHookParams.md) & `T`) => `MaybePromise`<`void`>

#### Type declaration

(`params`): `MaybePromise`<`void`>

FormItem克隆时钩子

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`FormItemHookParams`](/en/auto-docs/form-core/interfaces/FormItemHookParams.md) & `T` |

##### Returns

`MaybePromise`<`void`>

***

### onInit

`Optional` **onInit**: (`params`: [`FormItemHookParams`](/en/auto-docs/form-core/interfaces/FormItemHookParams.md) & `T`) => `void`

#### Type declaration

(`params`): `void`

FormItem初始化钩子

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`FormItemHookParams`](/en/auto-docs/form-core/interfaces/FormItemHookParams.md) & `T` |

##### Returns

`void`

***

### onSubmit

`Optional` **onSubmit**: (`params`: [`FormItemHookParams`](/en/auto-docs/form-core/interfaces/FormItemHookParams.md) & `T`) => `void`

#### Type declaration

(`params`): `void`

FormItem提交时钩子

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`FormItemHookParams`](/en/auto-docs/form-core/interfaces/FormItemHookParams.md) & `T` |

##### Returns

`void`

***

### onValidate

`Optional` **onValidate**: (`params`: [`FormItemHookParams`](/en/auto-docs/form-core/interfaces/FormItemHookParams.md) & `T`) => `void`

#### Type declaration

(`params`): `void`

FormItem全局校验时钩子

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`FormItemHookParams`](/en/auto-docs/form-core/interfaces/FormItemHookParams.md) & `T` |

##### Returns

`void`
