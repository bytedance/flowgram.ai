# Interface: PlaygroundDragOptions\<T>

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

* **`PlaygroundDragOptions`**

  ↳ [`PlaygroundDragEntitiesOpts`](/auto-docs/core/interfaces/PlaygroundDragEntitiesOpts.md)

## Table of contents

### Properties

* [onDrag](/auto-docs/core/interfaces/PlaygroundDragOptions.md#ondrag)
* [onDragEnd](/auto-docs/core/interfaces/PlaygroundDragOptions.md#ondragend)
* [onDragStart](/auto-docs/core/interfaces/PlaygroundDragOptions.md#ondragstart)
* [stopGlobalEventNames](/auto-docs/core/interfaces/PlaygroundDragOptions.md#stopglobaleventnames)

## Properties

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

***

### stopGlobalEventNames

`Optional` **stopGlobalEventNames**: `string`\[]
