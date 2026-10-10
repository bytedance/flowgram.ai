# Class: ShortcutsRegistry

## Table of contents

### Constructors

* [constructor](/auto-docs/editor/classes/ShortcutsRegistry.md#constructor)

### Properties

* [shortcutsHandlers](/auto-docs/editor/classes/ShortcutsRegistry.md#shortcutshandlers)

### Methods

* [addHandlers](/auto-docs/editor/classes/ShortcutsRegistry.md#addhandlers)
* [addHandlersIfNotFound](/auto-docs/editor/classes/ShortcutsRegistry.md#addhandlersifnotfound)
* [has](/auto-docs/editor/classes/ShortcutsRegistry.md#has)
* [removeHandler](/auto-docs/editor/classes/ShortcutsRegistry.md#removehandler)

## Constructors

### constructor

**new ShortcutsRegistry**()

## Properties

### shortcutsHandlers

**shortcutsHandlers**: [`ShortcutsHandler`](/auto-docs/editor/interfaces/ShortcutsHandler.md)\[]

## Methods

### addHandlers

**addHandlers**(`...handlers`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...handlers` | [`ShortcutsHandler`](/auto-docs/editor/interfaces/ShortcutsHandler.md)\[] |

#### Returns

`void`

***

### addHandlersIfNotFound

**addHandlersIfNotFound**(`...handlers`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...handlers` | [`ShortcutsHandler`](/auto-docs/editor/interfaces/ShortcutsHandler.md)\[] |

#### Returns

`void`

***

### has

**has**(`commandId`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `commandId` | `string` |

#### Returns

`boolean`

***

### removeHandler

**removeHandler**(`commandId`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `commandId` | `string` |

#### Returns

`void`
