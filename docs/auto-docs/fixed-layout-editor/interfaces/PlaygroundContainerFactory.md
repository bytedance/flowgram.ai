# Interface: PlaygroundContainerFactory

## Table of contents

### Properties

* [createChild](/auto-docs/fixed-layout-editor/interfaces/PlaygroundContainerFactory.md#createchild)
* [get](/auto-docs/fixed-layout-editor/interfaces/PlaygroundContainerFactory.md#get)
* [getAll](/auto-docs/fixed-layout-editor/interfaces/PlaygroundContainerFactory.md#getall)

## Properties

### createChild

**createChild**: () => [`Container`](/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md)

#### Type declaration

(): [`Container`](/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md)

##### Returns

[`Container`](/auto-docs/fixed-layout-editor/interfaces/interfaces.Container.md)

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

**getAll**: \<T>(`serviceIdentifier`: `ServiceIdentifier`<`T`>, `options?`: [`GetAllOptions`](/auto-docs/fixed-layout-editor/interfaces/interfaces.GetAllOptions.md)) => `T`\[]

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
| `options?` | [`GetAllOptions`](/auto-docs/fixed-layout-editor/interfaces/interfaces.GetAllOptions.md) |

##### Returns

`T`\[]
