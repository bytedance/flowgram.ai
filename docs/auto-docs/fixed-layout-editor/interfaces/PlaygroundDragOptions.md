# Interface: PlaygroundDragOptions\<T>

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

* **`PlaygroundDragOptions`**

  ↳ [`PlaygroundDragEntitiesOpts`](/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragEntitiesOpts.md)

## Table of contents

### Properties

* [onDrag](/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragOptions.md#ondrag)
* [onDragEnd](/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragOptions.md#ondragend)
* [onDragStart](/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragOptions.md#ondragstart)
* [stopGlobalEventNames](/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragOptions.md#stopglobaleventnames)

## Properties

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

***

### stopGlobalEventNames

`Optional` **stopGlobalEventNames**: `string`\[]
