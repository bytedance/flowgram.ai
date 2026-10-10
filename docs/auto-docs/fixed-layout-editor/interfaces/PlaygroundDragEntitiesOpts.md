# Interface: PlaygroundDragEntitiesOpts\<T>

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

* [`PlaygroundDragOptions`](/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragOptions.md)<`T`>

  ↳ **`PlaygroundDragEntitiesOpts`**

## Table of contents

### Properties

* [adsorbRefs](/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragEntitiesOpts.md#adsorbrefs)
* [config](/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragEntitiesOpts.md#config)
* [context](/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragEntitiesOpts.md#context)
* [onDrag](/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragEntitiesOpts.md#ondrag)
* [onDragEnd](/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragEntitiesOpts.md#ondragend)
* [onDragStart](/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragEntitiesOpts.md#ondragstart)
* [stopGlobalEventNames](/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragEntitiesOpts.md#stopglobaleventnames)

## Properties

### adsorbRefs

`Optional` **adsorbRefs**: [`Rectangle`](/auto-docs/fixed-layout-editor/classes/Rectangle-1.md)\[]

***

### config

`Optional` **config**: [`PlaygroundConfigEntity`](/auto-docs/fixed-layout-editor/classes/PlaygroundConfigEntity.md)

***

### context

`Optional` **context**: `T`

***

### onDrag

`Optional` **onDrag**: (`e`: [`PlaygroundDragEvent`](/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragEvent.md), `context?`: `T`) => `void`

#### Type declaration

(`e`, `context?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `e` | [`PlaygroundDragEvent`](/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragEvent.md) |
| `context?` | `T` |

##### Returns

`void`

#### Inherited from

[PlaygroundDragOptions](/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragOptions.md).[onDrag](/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragOptions.md#ondrag)

***

### onDragEnd

`Optional` **onDragEnd**: (`e`: [`PlaygroundDragEvent`](/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragEvent.md), `context?`: `T`) => `void`

#### Type declaration

(`e`, `context?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `e` | [`PlaygroundDragEvent`](/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragEvent.md) |
| `context?` | `T` |

##### Returns

`void`

#### Inherited from

[PlaygroundDragOptions](/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragOptions.md).[onDragEnd](/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragOptions.md#ondragend)

***

### onDragStart

`Optional` **onDragStart**: (`e`: [`PlaygroundDragEvent`](/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragEvent.md), `context?`: `T`) => `void`

#### Type declaration

(`e`, `context?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `e` | [`PlaygroundDragEvent`](/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragEvent.md) |
| `context?` | `T` |

##### Returns

`void`

#### Inherited from

[PlaygroundDragOptions](/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragOptions.md).[onDragStart](/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragOptions.md#ondragstart)

***

### stopGlobalEventNames

`Optional` **stopGlobalEventNames**: `string`\[]

#### Inherited from

[PlaygroundDragOptions](/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragOptions.md).[stopGlobalEventNames](/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragOptions.md#stopglobaleventnames)
