# Class: FormManager

## Table of contents

### Constructors

* [constructor](/en/auto-docs/form-core/classes/FormManager.md#constructor)

### Properties

* [abilityRegistry](/en/auto-docs/form-core/classes/FormManager.md#abilityregistry)
* [extensionRegistryMap](/en/auto-docs/form-core/classes/FormManager.md#extensionregistrymap)
* [formContextMaker](/en/auto-docs/form-core/classes/FormManager.md#formcontextmaker)
* [onFormModelWillInit](/en/auto-docs/form-core/classes/FormManager.md#onformmodelwillinit)
* [pathManager](/en/auto-docs/form-core/classes/FormManager.md#pathmanager)
* [playgroundContext](/en/auto-docs/form-core/classes/FormManager.md#playgroundcontext)
* [setterHocs](/en/auto-docs/form-core/classes/FormManager.md#setterhocs)

### Accessors

* [components](/en/auto-docs/form-core/classes/FormManager.md#components)
* [decorators](/en/auto-docs/form-core/classes/FormManager.md#decorators)

### Methods

* [dispose](/en/auto-docs/form-core/classes/FormManager.md#dispose)
* [fireFormModelWillInit](/en/auto-docs/form-core/classes/FormManager.md#fireformmodelwillinit)
* [getAbility](/en/auto-docs/form-core/classes/FormManager.md#getability)
* [getAbilityExtension](/en/auto-docs/form-core/classes/FormManager.md#getabilityextension)
* [registerAbilities](/en/auto-docs/form-core/classes/FormManager.md#registerabilities)
* [registerAbility](/en/auto-docs/form-core/classes/FormManager.md#registerability)
* [registerAbilityExtension](/en/auto-docs/form-core/classes/FormManager.md#registerabilityextension)
* [registerSetterHoc](/en/auto-docs/form-core/classes/FormManager.md#registersetterhoc)

## Constructors

### constructor

**new FormManager**()

## Properties

### abilityRegistry

`Readonly` **abilityRegistry**: `Map`<`string`, [`FormItemAbility`](/en/auto-docs/form-core/interfaces/FormItemAbility.md)>

***

### extensionRegistryMap

`Readonly` **extensionRegistryMap**: `Map`<`string`, [`FormAbilityExtensionRegistry`](/en/auto-docs/form-core/classes/FormAbilityExtensionRegistry.md)>

***

### formContextMaker

`Readonly` **formContextMaker**: [`FormContextMaker`](/en/auto-docs/form-core/classes/FormContextMaker.md)

***

### onFormModelWillInit

`Readonly` **onFormModelWillInit**: `Event`<{ `data`: `any` ; `model`: [`FormModel`](/en/auto-docs/form-core/classes/FormModel.md)  }>

***

### pathManager

`Readonly` **pathManager**: [`FormPathService`](/en/auto-docs/form-core/classes/FormPathService.md)

***

### playgroundContext

`Readonly` **playgroundContext**: `any`

***

### setterHocs

`Readonly` **setterHocs**: [`SetterHoc`](/en/auto-docs/form-core/types/SetterHoc.md)\[] = `[]`

## Accessors

### components

`get` **components**(): `Record`<`string`, `any`>

#### Returns

`Record`<`string`, `any`>

***

### decorators

`get` **decorators**(): `Record`<`string`, `any`>

#### Returns

`Record`<`string`, `any`>

## Methods

### dispose

**dispose**(): `void`

#### Returns

`void`

***

### fireFormModelWillInit

**fireFormModelWillInit**(`model`, `data`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `model` | [`FormModel`](/en/auto-docs/form-core/classes/FormModel.md) |
| `data` | `any` |

#### Returns

`void`

***

### getAbility

**getAbility**<`ExtendAbility`>(`type`): `undefined` | [`FormItemAbility`](/en/auto-docs/form-core/interfaces/FormItemAbility.md) & `ExtendAbility`

#### Type parameters

| Name |
| :------ |
| `ExtendAbility` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |

#### Returns

`undefined` | [`FormItemAbility`](/en/auto-docs/form-core/interfaces/FormItemAbility.md) & `ExtendAbility`

***

### getAbilityExtension

**getAbilityExtension**(`abilityType`, `extensionKey`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `abilityType` | `string` |
| `extensionKey` | `string` |

#### Returns

`any`

***

### registerAbilities

**registerAbilities**(`Abilities`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `Abilities` | [`AbilityClass`](/en/auto-docs/form-core/interfaces/AbilityClass.md)\[] |

#### Returns

`void`

***

### registerAbility

**registerAbility**(`Ability`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `Ability` | [`AbilityClass`](/en/auto-docs/form-core/interfaces/AbilityClass.md) |

#### Returns

`void`

***

### registerAbilityExtension

**registerAbilityExtension**(`type`, `extension`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |
| `extension` | `any` |

#### Returns

`void`

***

### registerSetterHoc

**registerSetterHoc**(`hoc`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `hoc` | [`SetterHoc`](/en/auto-docs/form-core/types/SetterHoc.md) |

#### Returns

`void`

**`Deprecated`**

Setter Hoc and setter are no longer supported in NodeEngineV2
