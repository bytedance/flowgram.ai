# Interface: EditorState

编辑态

## Table of contents

### Properties

* [cancelMode](/auto-docs/fixed-layout-editor/interfaces/EditorState-1.md#cancelmode)
* [cursor](/auto-docs/fixed-layout-editor/interfaces/EditorState-1.md#cursor)
* [disableSelector](/auto-docs/fixed-layout-editor/interfaces/EditorState-1.md#disableselector)
* [disabled](/auto-docs/fixed-layout-editor/interfaces/EditorState-1.md#disabled)
* [handle](/auto-docs/fixed-layout-editor/interfaces/EditorState-1.md#handle)
* [id](/auto-docs/fixed-layout-editor/interfaces/EditorState-1.md#id)
* [onEsc](/auto-docs/fixed-layout-editor/interfaces/EditorState-1.md#onesc)
* [shortcut](/auto-docs/fixed-layout-editor/interfaces/EditorState-1.md#shortcut)
* [shortcutAutoEsc](/auto-docs/fixed-layout-editor/interfaces/EditorState-1.md#shortcutautoesc)
* [shortcutWorksOnlyOnStateChanged](/auto-docs/fixed-layout-editor/interfaces/EditorState-1.md#shortcutworksonlyonstatechanged)

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

`Optional` **disabled**: `boolean` | (`config`: [`PlaygroundConfigEntity`](/auto-docs/fixed-layout-editor/classes/PlaygroundConfigEntity.md)) => `boolean`

***

### handle

`Optional` **handle**: (`config`: [`PlaygroundConfigEntity`](/auto-docs/fixed-layout-editor/classes/PlaygroundConfigEntity.md), `e?`: [`EditorStateChangeEvent`](/auto-docs/fixed-layout-editor/interfaces/EditorStateChangeEvent.md)) => `void`

#### Type declaration

(`config`, `e?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`PlaygroundConfigEntity`](/auto-docs/fixed-layout-editor/classes/PlaygroundConfigEntity.md) |
| `e?` | [`EditorStateChangeEvent`](/auto-docs/fixed-layout-editor/interfaces/EditorStateChangeEvent.md) |

##### Returns

`void`

***

### id

**id**: `string`

***

### onEsc

`Optional` **onEsc**: (`config`: [`PlaygroundConfigEntity`](/auto-docs/fixed-layout-editor/classes/PlaygroundConfigEntity.md), `e?`: `KeyboardEvent`) => `void`

#### Type declaration

(`config`, `e?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`PlaygroundConfigEntity`](/auto-docs/fixed-layout-editor/classes/PlaygroundConfigEntity.md) |
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
