# Interface: PlaygroundDragEntitiesOpts\<T>

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

* [`PlaygroundDragOptions`](/auto-docs/free-layout-editor/interfaces/PlaygroundDragOptions.md)<`T`>

  ↳ **`PlaygroundDragEntitiesOpts`**

## Table of contents

### Properties

* [adsorbRefs](/auto-docs/free-layout-editor/interfaces/PlaygroundDragEntitiesOpts.md#adsorbrefs)
* [config](/auto-docs/free-layout-editor/interfaces/PlaygroundDragEntitiesOpts.md#config)
* [context](/auto-docs/free-layout-editor/interfaces/PlaygroundDragEntitiesOpts.md#context)
* [onDrag](/auto-docs/free-layout-editor/interfaces/PlaygroundDragEntitiesOpts.md#ondrag)
* [onDragEnd](/auto-docs/free-layout-editor/interfaces/PlaygroundDragEntitiesOpts.md#ondragend)
* [onDragStart](/auto-docs/free-layout-editor/interfaces/PlaygroundDragEntitiesOpts.md#ondragstart)
* [stopGlobalEventNames](/auto-docs/free-layout-editor/interfaces/PlaygroundDragEntitiesOpts.md#stopglobaleventnames)

## Properties

### adsorbRefs

`Optional` **adsorbRefs**: [`Rectangle`](/auto-docs/free-layout-editor/classes/Rectangle-1.md)\[]

***

### config

`Optional` **config**: [`PlaygroundConfigEntity`](/auto-docs/free-layout-editor/classes/PlaygroundConfigEntity.md)

***

### context

`Optional` **context**: `T`

***

### onDrag

`Optional` **onDrag**: (`e`: [`PlaygroundDragEvent`](/auto-docs/free-layout-editor/interfaces/PlaygroundDragEvent.md), `context?`: `T`) => `void`

#### Type declaration

(`e`, `context?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `e` | [`PlaygroundDragEvent`](/auto-docs/free-layout-editor/interfaces/PlaygroundDragEvent.md) |
| `context?` | `T` |

##### Returns

`void`

#### Inherited from

[PlaygroundDragOptions](/auto-docs/free-layout-editor/interfaces/PlaygroundDragOptions.md).[onDrag](/auto-docs/free-layout-editor/interfaces/PlaygroundDragOptions.md#ondrag)

***

### onDragEnd

`Optional` **onDragEnd**: (`e`: [`PlaygroundDragEvent`](/auto-docs/free-layout-editor/interfaces/PlaygroundDragEvent.md), `context?`: `T`) => `void`

#### Type declaration

(`e`, `context?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `e` | [`PlaygroundDragEvent`](/auto-docs/free-layout-editor/interfaces/PlaygroundDragEvent.md) |
| `context?` | `T` |

##### Returns

`void`

#### Inherited from

[PlaygroundDragOptions](/auto-docs/free-layout-editor/interfaces/PlaygroundDragOptions.md).[onDragEnd](/auto-docs/free-layout-editor/interfaces/PlaygroundDragOptions.md#ondragend)

***

### onDragStart

`Optional` **onDragStart**: (`e`: [`PlaygroundDragEvent`](/auto-docs/free-layout-editor/interfaces/PlaygroundDragEvent.md), `context?`: `T`) => `void`

#### Type declaration

(`e`, `context?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `e` | [`PlaygroundDragEvent`](/auto-docs/free-layout-editor/interfaces/PlaygroundDragEvent.md) |
| `context?` | `T` |

##### Returns

`void`

#### Inherited from

[PlaygroundDragOptions](/auto-docs/free-layout-editor/interfaces/PlaygroundDragOptions.md).[onDragStart](/auto-docs/free-layout-editor/interfaces/PlaygroundDragOptions.md#ondragstart)

***

### stopGlobalEventNames

`Optional` **stopGlobalEventNames**: `string`\[]

#### Inherited from

[PlaygroundDragOptions](/auto-docs/free-layout-editor/interfaces/PlaygroundDragOptions.md).[stopGlobalEventNames](/auto-docs/free-layout-editor/interfaces/PlaygroundDragOptions.md#stopglobaleventnames)
