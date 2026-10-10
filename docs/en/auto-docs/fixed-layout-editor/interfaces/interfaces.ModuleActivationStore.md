# Interface: ModuleActivationStore

[interfaces](/en/auto-docs/fixed-layout-editor/modules/interfaces.md).ModuleActivationStore

## Hierarchy

* [`Clonable`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Clonable.md)<[`ModuleActivationStore`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.ModuleActivationStore.md)>

  ↳ **`ModuleActivationStore`**

## Table of contents

### Methods

* [addActivation](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.ModuleActivationStore.md#addactivation)
* [addDeactivation](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.ModuleActivationStore.md#adddeactivation)
* [clone](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.ModuleActivationStore.md#clone)
* [remove](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.ModuleActivationStore.md#remove)

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
| `onActivation` | [`BindingActivation`](/en/auto-docs/fixed-layout-editor/types/interfaces.BindingActivation.md)<`T`> |

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
| `onDeactivation` | [`BindingDeactivation`](/en/auto-docs/fixed-layout-editor/types/interfaces.BindingDeactivation.md)<`T`> |

#### Returns

`void`

***

### clone

**clone**(): [`ModuleActivationStore`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.ModuleActivationStore.md)

#### Returns

[`ModuleActivationStore`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.ModuleActivationStore.md)

#### Inherited from

[Clonable](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Clonable.md).[clone](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Clonable.md#clone)

***

### remove

**remove**(`moduleId`): [`ModuleActivationHandlers`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.ModuleActivationHandlers.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `moduleId` | `number` |

#### Returns

[`ModuleActivationHandlers`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.ModuleActivationHandlers.md)
