# Interface: PlaygroundDragEntitiesOpts\<T>

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

* [`PlaygroundDragOptions`](/auto-docs/core/interfaces/PlaygroundDragOptions.md)<`T`>

  ↳ **`PlaygroundDragEntitiesOpts`**

## Table of contents

### Properties

* [adsorbRefs](/auto-docs/core/interfaces/PlaygroundDragEntitiesOpts.md#adsorbrefs)
* [config](/auto-docs/core/interfaces/PlaygroundDragEntitiesOpts.md#config)
* [context](/auto-docs/core/interfaces/PlaygroundDragEntitiesOpts.md#context)
* [onDrag](/auto-docs/core/interfaces/PlaygroundDragEntitiesOpts.md#ondrag)
* [onDragEnd](/auto-docs/core/interfaces/PlaygroundDragEntitiesOpts.md#ondragend)
* [onDragStart](/auto-docs/core/interfaces/PlaygroundDragEntitiesOpts.md#ondragstart)
* [stopGlobalEventNames](/auto-docs/core/interfaces/PlaygroundDragEntitiesOpts.md#stopglobaleventnames)

## Properties

### adsorbRefs

`Optional` **adsorbRefs**: `Rectangle`\[]

***

### config

`Optional` **config**: [`PlaygroundConfigEntity`](/auto-docs/core/classes/PlaygroundConfigEntity.md)

***

### context

`Optional` **context**: `T`

***

### onDrag

`Optional` **onDrag**: (`e`: [`PlaygroundDragEvent`](/auto-docs/core/interfaces/PlaygroundDragEvent.md), `context?`: `T`) => `void`

#### Type declaration

(`e`, `context?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `e` | [`PlaygroundDragEvent`](/auto-docs/core/interfaces/PlaygroundDragEvent.md) |
| `context?` | `T` |

##### Returns

`void`

#### Inherited from

[PlaygroundDragOptions](/auto-docs/core/interfaces/PlaygroundDragOptions.md).[onDrag](/auto-docs/core/interfaces/PlaygroundDragOptions.md#ondrag)

***

### onDragEnd

`Optional` **onDragEnd**: (`e`: [`PlaygroundDragEvent`](/auto-docs/core/interfaces/PlaygroundDragEvent.md), `context?`: `T`) => `void`

#### Type declaration

(`e`, `context?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `e` | [`PlaygroundDragEvent`](/auto-docs/core/interfaces/PlaygroundDragEvent.md) |
| `context?` | `T` |

##### Returns

`void`

#### Inherited from

[PlaygroundDragOptions](/auto-docs/core/interfaces/PlaygroundDragOptions.md).[onDragEnd](/auto-docs/core/interfaces/PlaygroundDragOptions.md#ondragend)

***

### onDragStart

`Optional` **onDragStart**: (`e`: [`PlaygroundDragEvent`](/auto-docs/core/interfaces/PlaygroundDragEvent.md), `context?`: `T`) => `void`

#### Type declaration

(`e`, `context?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `e` | [`PlaygroundDragEvent`](/auto-docs/core/interfaces/PlaygroundDragEvent.md) |
| `context?` | `T` |

##### Returns

`void`

#### Inherited from

[PlaygroundDragOptions](/auto-docs/core/interfaces/PlaygroundDragOptions.md).[onDragStart](/auto-docs/core/interfaces/PlaygroundDragOptions.md#ondragstart)

***

### stopGlobalEventNames

`Optional` **stopGlobalEventNames**: `string`\[]

#### Inherited from

[PlaygroundDragOptions](/auto-docs/core/interfaces/PlaygroundDragOptions.md).[stopGlobalEventNames](/auto-docs/core/interfaces/PlaygroundDragOptions.md#stopglobaleventnames)
