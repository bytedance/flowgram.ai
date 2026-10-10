# Interface: ModuleActivationStore

[interfaces](/auto-docs/editor/modules/interfaces.md).ModuleActivationStore

## Hierarchy

* [`Clonable`](/auto-docs/editor/interfaces/interfaces.Clonable.md)<[`ModuleActivationStore`](/auto-docs/editor/interfaces/interfaces.ModuleActivationStore.md)>

  ↳ **`ModuleActivationStore`**

## Table of contents

### Methods

* [addActivation](/auto-docs/editor/interfaces/interfaces.ModuleActivationStore.md#addactivation)
* [addDeactivation](/auto-docs/editor/interfaces/interfaces.ModuleActivationStore.md#adddeactivation)
* [clone](/auto-docs/editor/interfaces/interfaces.ModuleActivationStore.md#clone)
* [remove](/auto-docs/editor/interfaces/interfaces.ModuleActivationStore.md#remove)

## Methods

### addActivation

**addActivation**<`T`>(`moduleId`, `serviceIdentifier`, `onActivation`): `void`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `moduleId` | `number` |
| `serviceIdentifier` | `ServiceIdentifier`<`T`> |
| `onActivation` | [`BindingActivation`](/auto-docs/editor/types/interfaces.BindingActivation.md)<`T`> |

#### Returns

`void`

***

### addDeactivation

**addDeactivation**<`T`>(`moduleId`, `serviceIdentifier`, `onDeactivation`): `void`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `moduleId` | `number` |
| `serviceIdentifier` | `ServiceIdentifier`<`T`> |
| `onDeactivation` | [`BindingDeactivation`](/auto-docs/editor/types/interfaces.BindingDeactivation.md)<`T`> |

#### Returns

`void`

***

### clone

**clone**(): [`ModuleActivationStore`](/auto-docs/editor/interfaces/interfaces.ModuleActivationStore.md)

#### Returns

[`ModuleActivationStore`](/auto-docs/editor/interfaces/interfaces.ModuleActivationStore.md)

#### Inherited from

[Clonable](/auto-docs/editor/interfaces/interfaces.Clonable.md).[clone](/auto-docs/editor/interfaces/interfaces.Clonable.md#clone)

***

### remove

**remove**(`moduleId`): [`ModuleActivationHandlers`](/auto-docs/editor/interfaces/interfaces.ModuleActivationHandlers.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `moduleId` | `number` |

#### Returns

[`ModuleActivationHandlers`](/auto-docs/editor/interfaces/interfaces.ModuleActivationHandlers.md)
