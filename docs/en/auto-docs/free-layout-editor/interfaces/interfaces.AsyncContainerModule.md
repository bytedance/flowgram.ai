# Interface: AsyncContainerModule

[interfaces](/en/auto-docs/free-layout-editor/modules/interfaces.md).AsyncContainerModule

## Hierarchy

* [`ContainerModuleBase`](/en/auto-docs/free-layout-editor/interfaces/interfaces.ContainerModuleBase.md)

  ↳ **`AsyncContainerModule`**

## Implemented by

* [`AsyncContainerModule`](/en/auto-docs/free-layout-editor/classes/AsyncContainerModule.md)

## Table of contents

### Properties

* [id](/en/auto-docs/free-layout-editor/interfaces/interfaces.AsyncContainerModule.md#id)
* [registry](/en/auto-docs/free-layout-editor/interfaces/interfaces.AsyncContainerModule.md#registry)

## Properties

### id

**id**: `number`

#### Inherited from

[ContainerModuleBase](/en/auto-docs/free-layout-editor/interfaces/interfaces.ContainerModuleBase.md).[id](/en/auto-docs/free-layout-editor/interfaces/interfaces.ContainerModuleBase.md#id)

***

### registry

**registry**: (...`args`: \[bind: Bind, unbind: Unbind, isBound: IsBound, rebind: Rebind, unbindAsync: UnbindAsync, onActivation: Function, onDeactivation: Function]) => `Promise`<`void`>

#### Type declaration

(`...args`): `Promise`<`void`>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | \[bind: Bind, unbind: Unbind, isBound: IsBound, rebind: Rebind, unbindAsync: UnbindAsync, onActivation: Function, onDeactivation: Function] |

##### Returns

`Promise`<`void`>
