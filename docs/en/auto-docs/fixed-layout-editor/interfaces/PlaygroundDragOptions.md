# Interface: PlaygroundDragOptions\<T>

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

* **`PlaygroundDragOptions`**

  ↳ [`PlaygroundDragEntitiesOpts`](/en/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragEntitiesOpts.md)

## Table of contents

### Properties

* [onDrag](/en/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragOptions.md#ondrag)
* [onDragEnd](/en/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragOptions.md#ondragend)
* [onDragStart](/en/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragOptions.md#ondragstart)
* [stopGlobalEventNames](/en/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragOptions.md#stopglobaleventnames)

## Properties

### onDrag

`Optional` **onDrag**: (`e`: [`PlaygroundDragEvent`](/en/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragEvent.md), `context?`: `T`) => `void`

#### Type declaration

(`e`, `context?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `e` | [`PlaygroundDragEvent`](/en/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragEvent.md) |
| `context?` | `T` |

##### Returns

`void`

***

### onDragEnd

`Optional` **onDragEnd**: (`e`: [`PlaygroundDragEvent`](/en/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragEvent.md), `context?`: `T`) => `void`

#### Type declaration

(`e`, `context?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `e` | [`PlaygroundDragEvent`](/en/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragEvent.md) |
| `context?` | `T` |

##### Returns

`void`

***

### onDragStart

`Optional` **onDragStart**: (`e`: [`PlaygroundDragEvent`](/en/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragEvent.md), `context?`: `T`) => `void`

#### Type declaration

(`e`, `context?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `e` | [`PlaygroundDragEvent`](/en/auto-docs/fixed-layout-editor/interfaces/PlaygroundDragEvent.md) |
| `context?` | `T` |

##### Returns

`void`

***

### stopGlobalEventNames

`Optional` **stopGlobalEventNames**: `string`\[]
