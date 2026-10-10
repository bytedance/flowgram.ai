# Class: ShortcutsRegistry

## Table of contents

### Constructors

* [constructor](/en/auto-docs/shortcuts-plugin/classes/ShortcutsRegistry.md#constructor)

### Properties

* [shortcutsHandlers](/en/auto-docs/shortcuts-plugin/classes/ShortcutsRegistry.md#shortcutshandlers)

### Methods

* [addHandlers](/en/auto-docs/shortcuts-plugin/classes/ShortcutsRegistry.md#addhandlers)
* [addHandlersIfNotFound](/en/auto-docs/shortcuts-plugin/classes/ShortcutsRegistry.md#addhandlersifnotfound)
* [has](/en/auto-docs/shortcuts-plugin/classes/ShortcutsRegistry.md#has)
* [removeHandler](/en/auto-docs/shortcuts-plugin/classes/ShortcutsRegistry.md#removehandler)

## Constructors

### constructor

**new ShortcutsRegistry**()

## Properties

### shortcutsHandlers

**shortcutsHandlers**: [`ShortcutsHandler`](/en/auto-docs/shortcuts-plugin/interfaces/ShortcutsHandler.md)\[] = `[]`

## Methods

### addHandlers

**addHandlers**(`...handlers`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...handlers` | [`ShortcutsHandler`](/en/auto-docs/shortcuts-plugin/interfaces/ShortcutsHandler.md)\[] |

#### Returns

`void`

***

### addHandlersIfNotFound

**addHandlersIfNotFound**(`...handlers`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...handlers` | [`ShortcutsHandler`](/en/auto-docs/shortcuts-plugin/interfaces/ShortcutsHandler.md)\[] |

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
