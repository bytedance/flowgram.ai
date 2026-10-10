# Interface: Binding\<TActivated>

[interfaces](/auto-docs/free-layout-editor/modules/interfaces.md).Binding

## Type parameters

| Name | Type |
| :------ | :------ |
| `TActivated` | `unknown` |

## Hierarchy

* [`Clonable`](/auto-docs/free-layout-editor/interfaces/interfaces.Clonable.md)<[`Binding`](/auto-docs/free-layout-editor/interfaces/interfaces.Binding.md)<`TActivated`>>

  ↳ **`Binding`**

## Table of contents

### Properties

* [activated](/auto-docs/free-layout-editor/interfaces/interfaces.Binding.md#activated)
* [cache](/auto-docs/free-layout-editor/interfaces/interfaces.Binding.md#cache)
* [constraint](/auto-docs/free-layout-editor/interfaces/interfaces.Binding.md#constraint)
* [dynamicValue](/auto-docs/free-layout-editor/interfaces/interfaces.Binding.md#dynamicvalue)
* [factory](/auto-docs/free-layout-editor/interfaces/interfaces.Binding.md#factory)
* [id](/auto-docs/free-layout-editor/interfaces/interfaces.Binding.md#id)
* [implementationType](/auto-docs/free-layout-editor/interfaces/interfaces.Binding.md#implementationtype)
* [moduleId](/auto-docs/free-layout-editor/interfaces/interfaces.Binding.md#moduleid)
* [onActivation](/auto-docs/free-layout-editor/interfaces/interfaces.Binding.md#onactivation)
* [onDeactivation](/auto-docs/free-layout-editor/interfaces/interfaces.Binding.md#ondeactivation)
* [provider](/auto-docs/free-layout-editor/interfaces/interfaces.Binding.md#provider)
* [scope](/auto-docs/free-layout-editor/interfaces/interfaces.Binding.md#scope)
* [serviceIdentifier](/auto-docs/free-layout-editor/interfaces/interfaces.Binding.md#serviceidentifier)
* [type](/auto-docs/free-layout-editor/interfaces/interfaces.Binding.md#type)

### Methods

* [clone](/auto-docs/free-layout-editor/interfaces/interfaces.Binding.md#clone)

## Properties

### activated

**activated**: `boolean`

***

### cache

**cache**: `null` | `TActivated` | `Promise`<`TActivated`>

***

### constraint

**constraint**: [`ConstraintFunction`](/auto-docs/free-layout-editor/interfaces/interfaces.ConstraintFunction.md)

***

### dynamicValue

**dynamicValue**: `null` | [`DynamicValue`](/auto-docs/free-layout-editor/types/interfaces.DynamicValue.md)<`TActivated`>

***

### factory

**factory**: `null` | [`FactoryCreator`](/auto-docs/free-layout-editor/types/interfaces.FactoryCreator.md)<`unknown`, `unknown`\[], `unknown`\[]>

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

**onActivation**: `null` | [`BindingActivation`](/auto-docs/free-layout-editor/types/interfaces.BindingActivation.md)<`TActivated`>

***

### onDeactivation

**onDeactivation**: `null` | [`BindingDeactivation`](/auto-docs/free-layout-editor/types/interfaces.BindingDeactivation.md)<`TActivated`>

***

### provider

**provider**: `null` | [`ProviderCreator`](/auto-docs/free-layout-editor/types/interfaces.ProviderCreator.md)<`unknown`>

***

### scope

**scope**: [`BindingScope`](/auto-docs/free-layout-editor/types/interfaces.BindingScope.md)

***

### serviceIdentifier

**serviceIdentifier**: `ServiceIdentifier`<`TActivated`>

***

### type

**type**: [`BindingType`](/auto-docs/free-layout-editor/types/interfaces.BindingType.md)

## Methods

### clone

**clone**(): [`Binding`](/auto-docs/free-layout-editor/interfaces/interfaces.Binding.md)<`TActivated`>

#### Returns

[`Binding`](/auto-docs/free-layout-editor/interfaces/interfaces.Binding.md)<`TActivated`>

#### Inherited from

[Clonable](/auto-docs/free-layout-editor/interfaces/interfaces.Clonable.md).[clone](/auto-docs/free-layout-editor/interfaces/interfaces.Clonable.md#clone)
