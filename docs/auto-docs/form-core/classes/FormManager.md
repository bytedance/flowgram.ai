# Class: FormManager

## Table of contents

### Constructors

* [constructor](/auto-docs/form-core/classes/FormManager.md#constructor)

### Properties

* [abilityRegistry](/auto-docs/form-core/classes/FormManager.md#abilityregistry)
* [extensionRegistryMap](/auto-docs/form-core/classes/FormManager.md#extensionregistrymap)
* [formContextMaker](/auto-docs/form-core/classes/FormManager.md#formcontextmaker)
* [onFormModelWillInit](/auto-docs/form-core/classes/FormManager.md#onformmodelwillinit)
* [pathManager](/auto-docs/form-core/classes/FormManager.md#pathmanager)
* [playgroundContext](/auto-docs/form-core/classes/FormManager.md#playgroundcontext)
* [setterHocs](/auto-docs/form-core/classes/FormManager.md#setterhocs)

### Accessors

* [components](/auto-docs/form-core/classes/FormManager.md#components)
* [decorators](/auto-docs/form-core/classes/FormManager.md#decorators)

### Methods

* [dispose](/auto-docs/form-core/classes/FormManager.md#dispose)
* [fireFormModelWillInit](/auto-docs/form-core/classes/FormManager.md#fireformmodelwillinit)
* [getAbility](/auto-docs/form-core/classes/FormManager.md#getability)
* [getAbilityExtension](/auto-docs/form-core/classes/FormManager.md#getabilityextension)
* [registerAbilities](/auto-docs/form-core/classes/FormManager.md#registerabilities)
* [registerAbility](/auto-docs/form-core/classes/FormManager.md#registerability)
* [registerAbilityExtension](/auto-docs/form-core/classes/FormManager.md#registerabilityextension)
* [registerSetterHoc](/auto-docs/form-core/classes/FormManager.md#registersetterhoc)

## Constructors

### constructor

**new FormManager**()

## Properties

### abilityRegistry

`Readonly` **abilityRegistry**: `Map`<`string`, [`FormItemAbility`](/auto-docs/form-core/interfaces/FormItemAbility.md)>

***

### extensionRegistryMap

`Readonly` **extensionRegistryMap**: `Map`<`string`, [`FormAbilityExtensionRegistry`](/auto-docs/form-core/classes/FormAbilityExtensionRegistry.md)>

***

### formContextMaker

`Readonly` **formContextMaker**: [`FormContextMaker`](/auto-docs/form-core/classes/FormContextMaker.md)

***

### onFormModelWillInit

`Readonly` **onFormModelWillInit**: `Event`<{ `data`: `any` ; `model`: [`FormModel`](/auto-docs/form-core/classes/FormModel.md)  }>

***

### pathManager

`Readonly` **pathManager**: [`FormPathService`](/auto-docs/form-core/classes/FormPathService.md)

***

### playgroundContext

`Readonly` **playgroundContext**: `any`

***

### setterHocs

`Readonly` **setterHocs**: [`SetterHoc`](/auto-docs/form-core/types/SetterHoc.md)\[] = `[]`

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
| `model` | [`FormModel`](/auto-docs/form-core/classes/FormModel.md) |
| `data` | `any` |

#### Returns

`void`

***

### getAbility

**getAbility**<`ExtendAbility`>(`type`): `undefined` | [`FormItemAbility`](/auto-docs/form-core/interfaces/FormItemAbility.md) & `ExtendAbility`

#### Type parameters

| Name |
| :------ |
| `ExtendAbility` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |

#### Returns

`undefined` | [`FormItemAbility`](/auto-docs/form-core/interfaces/FormItemAbility.md) & `ExtendAbility`

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
| `Abilities` | [`AbilityClass`](/auto-docs/form-core/interfaces/AbilityClass.md)\[] |

#### Returns

`void`

***

### registerAbility

**registerAbility**(`Ability`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `Ability` | [`AbilityClass`](/auto-docs/form-core/interfaces/AbilityClass.md) |

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
| `hoc` | [`SetterHoc`](/auto-docs/form-core/types/SetterHoc.md) |

#### Returns

`void`

**`Deprecated`**

Setter Hoc and setter are no longer supported in NodeEngineV2
