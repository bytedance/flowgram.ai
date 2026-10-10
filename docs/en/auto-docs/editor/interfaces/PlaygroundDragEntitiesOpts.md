# Interface: PlaygroundDragEntitiesOpts\<T>

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

* [`PlaygroundDragOptions`](/en/auto-docs/editor/interfaces/PlaygroundDragOptions.md)<`T`>

  ↳ **`PlaygroundDragEntitiesOpts`**

## Table of contents

### Properties

* [adsorbRefs](/en/auto-docs/editor/interfaces/PlaygroundDragEntitiesOpts.md#adsorbrefs)
* [config](/en/auto-docs/editor/interfaces/PlaygroundDragEntitiesOpts.md#config)
* [context](/en/auto-docs/editor/interfaces/PlaygroundDragEntitiesOpts.md#context)
* [onDrag](/en/auto-docs/editor/interfaces/PlaygroundDragEntitiesOpts.md#ondrag)
* [onDragEnd](/en/auto-docs/editor/interfaces/PlaygroundDragEntitiesOpts.md#ondragend)
* [onDragStart](/en/auto-docs/editor/interfaces/PlaygroundDragEntitiesOpts.md#ondragstart)
* [stopGlobalEventNames](/en/auto-docs/editor/interfaces/PlaygroundDragEntitiesOpts.md#stopglobaleventnames)

## Properties

### adsorbRefs

`Optional` **adsorbRefs**: [`Rectangle`](/en/auto-docs/editor/classes/Rectangle-1.md)\[]

***

### config

`Optional` **config**: [`PlaygroundConfigEntity`](/en/auto-docs/editor/classes/PlaygroundConfigEntity.md)

***

### context

`Optional` **context**: `T`

***

### onDrag

`Optional` **onDrag**: (`e`: [`PlaygroundDragEvent`](/en/auto-docs/editor/interfaces/PlaygroundDragEvent.md), `context?`: `T`) => `void`

#### Type declaration

(`e`, `context?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `e` | [`PlaygroundDragEvent`](/en/auto-docs/editor/interfaces/PlaygroundDragEvent.md) |
| `context?` | `T` |

##### Returns

`void`

#### Inherited from

[PlaygroundDragOptions](/en/auto-docs/editor/interfaces/PlaygroundDragOptions.md).[onDrag](/en/auto-docs/editor/interfaces/PlaygroundDragOptions.md#ondrag)

***

### onDragEnd

`Optional` **onDragEnd**: (`e`: [`PlaygroundDragEvent`](/en/auto-docs/editor/interfaces/PlaygroundDragEvent.md), `context?`: `T`) => `void`

#### Type declaration

(`e`, `context?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `e` | [`PlaygroundDragEvent`](/en/auto-docs/editor/interfaces/PlaygroundDragEvent.md) |
| `context?` | `T` |

##### Returns

`void`

#### Inherited from

[PlaygroundDragOptions](/en/auto-docs/editor/interfaces/PlaygroundDragOptions.md).[onDragEnd](/en/auto-docs/editor/interfaces/PlaygroundDragOptions.md#ondragend)

***

### onDragStart

`Optional` **onDragStart**: (`e`: [`PlaygroundDragEvent`](/en/auto-docs/editor/interfaces/PlaygroundDragEvent.md), `context?`: `T`) => `void`

#### Type declaration

(`e`, `context?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `e` | [`PlaygroundDragEvent`](/en/auto-docs/editor/interfaces/PlaygroundDragEvent.md) |
| `context?` | `T` |

##### Returns

`void`

#### Inherited from

[PlaygroundDragOptions](/en/auto-docs/editor/interfaces/PlaygroundDragOptions.md).[onDragStart](/en/auto-docs/editor/interfaces/PlaygroundDragOptions.md#ondragstart)

***

### stopGlobalEventNames

`Optional` **stopGlobalEventNames**: `string`\[]

#### Inherited from

[PlaygroundDragOptions](/en/auto-docs/editor/interfaces/PlaygroundDragOptions.md).[stopGlobalEventNames](/en/auto-docs/editor/interfaces/PlaygroundDragOptions.md#stopglobaleventnames)
