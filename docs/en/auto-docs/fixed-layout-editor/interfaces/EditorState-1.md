# Interface: EditorState

编辑态

## Table of contents

### Properties

* [cancelMode](/en/auto-docs/fixed-layout-editor/interfaces/EditorState-1.md#cancelmode)
* [cursor](/en/auto-docs/fixed-layout-editor/interfaces/EditorState-1.md#cursor)
* [disableSelector](/en/auto-docs/fixed-layout-editor/interfaces/EditorState-1.md#disableselector)
* [disabled](/en/auto-docs/fixed-layout-editor/interfaces/EditorState-1.md#disabled)
* [handle](/en/auto-docs/fixed-layout-editor/interfaces/EditorState-1.md#handle)
* [id](/en/auto-docs/fixed-layout-editor/interfaces/EditorState-1.md#id)
* [onEsc](/en/auto-docs/fixed-layout-editor/interfaces/EditorState-1.md#onesc)
* [shortcut](/en/auto-docs/fixed-layout-editor/interfaces/EditorState-1.md#shortcut)
* [shortcutAutoEsc](/en/auto-docs/fixed-layout-editor/interfaces/EditorState-1.md#shortcutautoesc)
* [shortcutWorksOnlyOnStateChanged](/en/auto-docs/fixed-layout-editor/interfaces/EditorState-1.md#shortcutworksonlyonstatechanged)

## Properties

### cancelMode

**cancelMode**: `"esc"` | `"once"` | `"hold"`

***

### cursor

`Optional` **cursor**: `string`

***

### disableSelector

`Optional` **disableSelector**: `boolean`

***

### disabled

`Optional` **disabled**: `boolean` | (`config`: [`PlaygroundConfigEntity`](/en/auto-docs/fixed-layout-editor/classes/PlaygroundConfigEntity.md)) => `boolean`

***

### handle

`Optional` **handle**: (`config`: [`PlaygroundConfigEntity`](/en/auto-docs/fixed-layout-editor/classes/PlaygroundConfigEntity.md), `e?`: [`EditorStateChangeEvent`](/en/auto-docs/fixed-layout-editor/interfaces/EditorStateChangeEvent.md)) => `void`

#### Type declaration

(`config`, `e?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`PlaygroundConfigEntity`](/en/auto-docs/fixed-layout-editor/classes/PlaygroundConfigEntity.md) |
| `e?` | [`EditorStateChangeEvent`](/en/auto-docs/fixed-layout-editor/interfaces/EditorStateChangeEvent.md) |

##### Returns

`void`

***

### id

**id**: `string`

***

### onEsc

`Optional` **onEsc**: (`config`: [`PlaygroundConfigEntity`](/en/auto-docs/fixed-layout-editor/classes/PlaygroundConfigEntity.md), `e?`: `KeyboardEvent`) => `void`

#### Type declaration

(`config`, `e?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`PlaygroundConfigEntity`](/en/auto-docs/fixed-layout-editor/classes/PlaygroundConfigEntity.md) |
| `e?` | `KeyboardEvent` |

##### Returns

`void`

***

### shortcut

`Optional` **shortcut**: `string`

***

### shortcutAutoEsc

`Optional` **shortcutAutoEsc**: `boolean`

***

### shortcutWorksOnlyOnStateChanged

`Optional` **shortcutWorksOnlyOnStateChanged**: `boolean`
