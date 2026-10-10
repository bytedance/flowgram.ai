# Interface: PlaygroundContainerFactory

## Table of contents

### Properties

* [createChild](/en/auto-docs/fixed-layout-editor/interfaces/PlaygroundContainerFactory.md#createchild)
* [get](/en/auto-docs/fixed-layout-editor/interfaces/PlaygroundContainerFactory.md#get)
* [getAll](/en/auto-docs/fixed-layout-editor/interfaces/PlaygroundContainerFactory.md#getall)

## Properties

### createChild

**createChild**: () => [`Container`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md)

#### Type declaration

(): [`Container`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md)

##### Returns

[`Container`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md)

***

### get

**get**: \<T>(`serviceIdentifier`: `ServiceIdentifier`<`T`>) => `T`

#### Type declaration

<`T`>(`serviceIdentifier`): `T`

##### Type parameters

| Name |
| :------ |
| `T` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `serviceIdentifier` | `ServiceIdentifier`<`T`> |

##### Returns

`T`

***

### getAll

**getAll**: \<T>(`serviceIdentifier`: `ServiceIdentifier`<`T`>, `options?`: [`GetAllOptions`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.GetAllOptions.md)) => `T`\[]

#### Type declaration

<`T`>(`serviceIdentifier`, `options?`): `T`\[]

##### Type parameters

| Name |
| :------ |
| `T` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `serviceIdentifier` | `ServiceIdentifier`<`T`> |
| `options?` | [`GetAllOptions`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.GetAllOptions.md) |

##### Returns

`T`\[]
