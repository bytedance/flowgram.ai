# Interface: Binding\<TActivated>

[interfaces](/auto-docs/editor/modules/interfaces.md).Binding

## Type parameters

| Name | Type |
| :------ | :------ |
| `TActivated` | `unknown` |

## Hierarchy

* [`Clonable`](/auto-docs/editor/interfaces/interfaces.Clonable.md)<[`Binding`](/auto-docs/editor/interfaces/interfaces.Binding.md)<`TActivated`>>

  ↳ **`Binding`**

## Table of contents

### Properties

* [activated](/auto-docs/editor/interfaces/interfaces.Binding.md#activated)
* [cache](/auto-docs/editor/interfaces/interfaces.Binding.md#cache)
* [constraint](/auto-docs/editor/interfaces/interfaces.Binding.md#constraint)
* [dynamicValue](/auto-docs/editor/interfaces/interfaces.Binding.md#dynamicvalue)
* [factory](/auto-docs/editor/interfaces/interfaces.Binding.md#factory)
* [id](/auto-docs/editor/interfaces/interfaces.Binding.md#id)
* [implementationType](/auto-docs/editor/interfaces/interfaces.Binding.md#implementationtype)
* [moduleId](/auto-docs/editor/interfaces/interfaces.Binding.md#moduleid)
* [onActivation](/auto-docs/editor/interfaces/interfaces.Binding.md#onactivation)
* [onDeactivation](/auto-docs/editor/interfaces/interfaces.Binding.md#ondeactivation)
* [provider](/auto-docs/editor/interfaces/interfaces.Binding.md#provider)
* [scope](/auto-docs/editor/interfaces/interfaces.Binding.md#scope)
* [serviceIdentifier](/auto-docs/editor/interfaces/interfaces.Binding.md#serviceidentifier)
* [type](/auto-docs/editor/interfaces/interfaces.Binding.md#type)

### Methods

* [clone](/auto-docs/editor/interfaces/interfaces.Binding.md#clone)

## Properties

### activated

**activated**: `boolean`

***

### cache

**cache**: `null` | `TActivated` | `Promise`<`TActivated`>

***

### constraint

**constraint**: [`ConstraintFunction`](/auto-docs/editor/interfaces/interfaces.ConstraintFunction.md)

***

### dynamicValue

**dynamicValue**: `null` | [`DynamicValue`](/auto-docs/editor/types/interfaces.DynamicValue.md)<`TActivated`>

***

### factory

**factory**: `null` | [`FactoryCreator`](/auto-docs/editor/types/interfaces.FactoryCreator.md)<`unknown`, `unknown`\[], `unknown`\[]>

***

### id

**id**: `number`

***

### implementationType

**implementationType**: `null` | `TActivated` | `Newable`<`TActivated`>

***

### moduleId

**moduleId**: `number`

***

### onActivation

**onActivation**: `null` | [`BindingActivation`](/auto-docs/editor/types/interfaces.BindingActivation.md)<`TActivated`>

***

### onDeactivation

**onDeactivation**: `null` | [`BindingDeactivation`](/auto-docs/editor/types/interfaces.BindingDeactivation.md)<`TActivated`>

***

### provider

**provider**: `null` | [`ProviderCreator`](/auto-docs/editor/types/interfaces.ProviderCreator.md)<`unknown`>

***

### scope

**scope**: [`BindingScope`](/auto-docs/editor/types/interfaces.BindingScope.md)

***

### serviceIdentifier

**serviceIdentifier**: `ServiceIdentifier`<`TActivated`>

***

### type

**type**: [`BindingType`](/auto-docs/editor/types/interfaces.BindingType.md)

## Methods

### clone

**clone**(): [`Binding`](/auto-docs/editor/interfaces/interfaces.Binding.md)<`TActivated`>

#### Returns

[`Binding`](/auto-docs/editor/interfaces/interfaces.Binding.md)<`TActivated`>

#### Inherited from

[Clonable](/auto-docs/editor/interfaces/interfaces.Clonable.md).[clone](/auto-docs/editor/interfaces/interfaces.Clonable.md#clone)
