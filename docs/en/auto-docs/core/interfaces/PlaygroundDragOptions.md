# Interface: PlaygroundDragOptions\<T>

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

* **`PlaygroundDragOptions`**

  ↳ [`PlaygroundDragEntitiesOpts`](/en/auto-docs/core/interfaces/PlaygroundDragEntitiesOpts.md)

## Table of contents

### Properties

* [onDrag](/en/auto-docs/core/interfaces/PlaygroundDragOptions.md#ondrag)
* [onDragEnd](/en/auto-docs/core/interfaces/PlaygroundDragOptions.md#ondragend)
* [onDragStart](/en/auto-docs/core/interfaces/PlaygroundDragOptions.md#ondragstart)
* [stopGlobalEventNames](/en/auto-docs/core/interfaces/PlaygroundDragOptions.md#stopglobaleventnames)

## Properties

### onDrag

`Optional` **onDrag**: (`e`: [`PlaygroundDragEvent`](/en/auto-docs/core/interfaces/PlaygroundDragEvent.md), `context?`: `T`) => `void`

#### Type declaration

(`e`, `context?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `e` | [`PlaygroundDragEvent`](/en/auto-docs/core/interfaces/PlaygroundDragEvent.md) |
| `context?` | `T` |

##### Returns

`void`

***

### onDragEnd

`Optional` **onDragEnd**: (`e`: [`PlaygroundDragEvent`](/en/auto-docs/core/interfaces/PlaygroundDragEvent.md), `context?`: `T`) => `void`

#### Type declaration

(`e`, `context?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `e` | [`PlaygroundDragEvent`](/en/auto-docs/core/interfaces/PlaygroundDragEvent.md) |
| `context?` | `T` |

##### Returns

`void`

***

### onDragStart

`Optional` **onDragStart**: (`e`: [`PlaygroundDragEvent`](/en/auto-docs/core/interfaces/PlaygroundDragEvent.md), `context?`: `T`) => `void`

#### Type declaration

(`e`, `context?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `e` | [`PlaygroundDragEvent`](/en/auto-docs/core/interfaces/PlaygroundDragEvent.md) |
| `context?` | `T` |

##### Returns

`void`

***

### stopGlobalEventNames

`Optional` **stopGlobalEventNames**: `string`\[]
