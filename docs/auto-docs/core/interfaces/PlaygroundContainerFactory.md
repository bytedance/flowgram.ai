# Interface: PlaygroundContainerFactory

## Table of contents

### Properties

* [createChild](/auto-docs/core/interfaces/PlaygroundContainerFactory.md#createchild)
* [get](/auto-docs/core/interfaces/PlaygroundContainerFactory.md#get)
* [getAll](/auto-docs/core/interfaces/PlaygroundContainerFactory.md#getall)

## Properties

### createChild

**createChild**: () => `Container`

#### Type declaration

(): `Container`

##### Returns

`Container`

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

**getAll**: \<T>(`serviceIdentifier`: `ServiceIdentifier`<`T`>, `options?`: `GetAllOptions`) => `T`\[]

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
| `options?` | `GetAllOptions` |

##### Returns

`T`\[]
