# Interface: PlaygroundDragEntitiesOpts\<T>

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

* [`PlaygroundDragOptions`](/auto-docs/playground-react/interfaces/PlaygroundDragOptions.md)<`T`>

  ↳ **`PlaygroundDragEntitiesOpts`**

## Table of contents

### Properties

* [adsorbRefs](/auto-docs/playground-react/interfaces/PlaygroundDragEntitiesOpts.md#adsorbrefs)
* [config](/auto-docs/playground-react/interfaces/PlaygroundDragEntitiesOpts.md#config)
* [context](/auto-docs/playground-react/interfaces/PlaygroundDragEntitiesOpts.md#context)
* [onDrag](/auto-docs/playground-react/interfaces/PlaygroundDragEntitiesOpts.md#ondrag)
* [onDragEnd](/auto-docs/playground-react/interfaces/PlaygroundDragEntitiesOpts.md#ondragend)
* [onDragStart](/auto-docs/playground-react/interfaces/PlaygroundDragEntitiesOpts.md#ondragstart)
* [stopGlobalEventNames](/auto-docs/playground-react/interfaces/PlaygroundDragEntitiesOpts.md#stopglobaleventnames)

## Properties

### adsorbRefs

`Optional` **adsorbRefs**: `Rectangle`\[]

***

### config

`Optional` **config**: [`PlaygroundConfigEntity`](/auto-docs/playground-react/classes/PlaygroundConfigEntity.md)

***

### context

`Optional` **context**: `T`

***

### onDrag

`Optional` **onDrag**: (`e`: [`PlaygroundDragEvent`](/auto-docs/playground-react/interfaces/PlaygroundDragEvent.md), `context?`: `T`) => `void`

#### Type declaration

(`e`, `context?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `e` | [`PlaygroundDragEvent`](/auto-docs/playground-react/interfaces/PlaygroundDragEvent.md) |
| `context?` | `T` |

##### Returns

`void`

#### Inherited from

[PlaygroundDragOptions](/auto-docs/playground-react/interfaces/PlaygroundDragOptions.md).[onDrag](/auto-docs/playground-react/interfaces/PlaygroundDragOptions.md#ondrag)

***

### onDragEnd

`Optional` **onDragEnd**: (`e`: [`PlaygroundDragEvent`](/auto-docs/playground-react/interfaces/PlaygroundDragEvent.md), `context?`: `T`) => `void`

#### Type declaration

(`e`, `context?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `e` | [`PlaygroundDragEvent`](/auto-docs/playground-react/interfaces/PlaygroundDragEvent.md) |
| `context?` | `T` |

##### Returns

`void`

#### Inherited from

[PlaygroundDragOptions](/auto-docs/playground-react/interfaces/PlaygroundDragOptions.md).[onDragEnd](/auto-docs/playground-react/interfaces/PlaygroundDragOptions.md#ondragend)

***

### onDragStart

`Optional` **onDragStart**: (`e`: [`PlaygroundDragEvent`](/auto-docs/playground-react/interfaces/PlaygroundDragEvent.md), `context?`: `T`) => `void`

#### Type declaration

(`e`, `context?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `e` | [`PlaygroundDragEvent`](/auto-docs/playground-react/interfaces/PlaygroundDragEvent.md) |
| `context?` | `T` |

##### Returns

`void`

#### Inherited from

[PlaygroundDragOptions](/auto-docs/playground-react/interfaces/PlaygroundDragOptions.md).[onDragStart](/auto-docs/playground-react/interfaces/PlaygroundDragOptions.md#ondragstart)

***

### stopGlobalEventNames

`Optional` **stopGlobalEventNames**: `string`\[]

#### Inherited from

[PlaygroundDragOptions](/auto-docs/playground-react/interfaces/PlaygroundDragOptions.md).[stopGlobalEventNames](/auto-docs/playground-react/interfaces/PlaygroundDragOptions.md#stopglobaleventnames)
