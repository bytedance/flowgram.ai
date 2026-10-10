# Class: CommandRegistry

## Implements

* [`CommandService`](/auto-docs/fixed-layout-editor/variables/CommandService-1.md)

## Table of contents

### Constructors

* [constructor](/auto-docs/fixed-layout-editor/classes/CommandRegistry.md#constructor)

### Properties

* [onDidExecuteCommand](/auto-docs/fixed-layout-editor/classes/CommandRegistry.md#ondidexecutecommand)
* [onWillExecuteCommand](/auto-docs/fixed-layout-editor/classes/CommandRegistry.md#onwillexecutecommand)

### Accessors

* [commandIds](/auto-docs/fixed-layout-editor/classes/CommandRegistry.md#commandids)
* [commands](/auto-docs/fixed-layout-editor/classes/CommandRegistry.md#commands)

### Methods

* [dispose](/auto-docs/fixed-layout-editor/classes/CommandRegistry.md#dispose)
* [executeCommand](/auto-docs/fixed-layout-editor/classes/CommandRegistry.md#executecommand)
* [getActiveHandler](/auto-docs/fixed-layout-editor/classes/CommandRegistry.md#getactivehandler)
* [getAllHandlers](/auto-docs/fixed-layout-editor/classes/CommandRegistry.md#getallhandlers)
* [getCommand](/auto-docs/fixed-layout-editor/classes/CommandRegistry.md#getcommand)
* [getToggledHandler](/auto-docs/fixed-layout-editor/classes/CommandRegistry.md#gettoggledhandler)
* [getVisibleHandler](/auto-docs/fixed-layout-editor/classes/CommandRegistry.md#getvisiblehandler)
* [init](/auto-docs/fixed-layout-editor/classes/CommandRegistry.md#init)
* [isEnabled](/auto-docs/fixed-layout-editor/classes/CommandRegistry.md#isenabled)
* [isToggled](/auto-docs/fixed-layout-editor/classes/CommandRegistry.md#istoggled)
* [isVisible](/auto-docs/fixed-layout-editor/classes/CommandRegistry.md#isvisible)
* [registerCommand](/auto-docs/fixed-layout-editor/classes/CommandRegistry.md#registercommand)
* [registerHandler](/auto-docs/fixed-layout-editor/classes/CommandRegistry.md#registerhandler)
* [unregisterCommand](/auto-docs/fixed-layout-editor/classes/CommandRegistry.md#unregistercommand)
* [updateCommand](/auto-docs/fixed-layout-editor/classes/CommandRegistry.md#updatecommand)

## Constructors

### constructor

**new CommandRegistry**()

## Properties

### onDidExecuteCommand

`Readonly` **onDidExecuteCommand**: [`Event`](/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<`CommandEvent`>

#### Implementation of

CommandService.onDidExecuteCommand

***

### onWillExecuteCommand

`Readonly` **onWillExecuteCommand**: [`Event`](/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<`CommandEvent`>

#### Implementation of

CommandService.onWillExecuteCommand

## Accessors

### commandIds

`get` **commandIds**(): `string`\[]

当前所有 commandid

#### Returns

`string`\[]

***

### commands

`get` **commands**(): [`Command`](/auto-docs/fixed-layout-editor/interfaces/Command-1.md)\[]

当前所有 command

#### Returns

[`Command`](/auto-docs/fixed-layout-editor/interfaces/Command-1.md)\[]

## Methods

### dispose

**dispose**(): `void`

#### Returns

`void`

#### Implementation of

CommandService.dispose

***

### executeCommand

**executeCommand**<`T`>(`commandId`, `...args`): `Promise`<`undefined` | `T`>

执行 command，会先判断是否可以执行，不会重复执行

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `commandId` | `string` |
| `...args` | `any`\[] |

#### Returns

`Promise`<`undefined` | `T`>

#### Implementation of

CommandService.executeCommand

***

### getActiveHandler

**getActiveHandler**(`commandId`, `...args`): `undefined` | `CommandHandler`

#### Parameters

| Name | Type |
| :------ | :------ |
| `commandId` | `string` |
| `...args` | `any`\[] |

#### Returns

`undefined` | `CommandHandler`

***

### getAllHandlers

**getAllHandlers**(`commandId`): `CommandHandler`\[]

获取 command 对应的所有 handler

#### Parameters

| Name | Type |
| :------ | :------ |
| `commandId` | `string` |

#### Returns

`CommandHandler`\[]

***

### getCommand

**getCommand**(`id`): `undefined` | [`Command`](/auto-docs/fixed-layout-editor/interfaces/Command-1.md)

获取 command

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`undefined` | [`Command`](/auto-docs/fixed-layout-editor/interfaces/Command-1.md)

***

### getToggledHandler

**getToggledHandler**(`commandId`, `...args`): `undefined` | `CommandHandler`

#### Parameters

| Name | Type |
| :------ | :------ |
| `commandId` | `string` |
| `...args` | `any`\[] |

#### Returns

`undefined` | `CommandHandler`

***

### getVisibleHandler

**getVisibleHandler**(`commandId`, `...args`): `undefined` | `CommandHandler`

#### Parameters

| Name | Type |
| :------ | :------ |
| `commandId` | `string` |
| `...args` | `any`\[] |

#### Returns

`undefined` | `CommandHandler`

***

### init

**init**(): `void`

#### Returns

`void`

***

### isEnabled

**isEnabled**(`command`, `...args`): `boolean`

command 是否可用

#### Parameters

| Name | Type |
| :------ | :------ |
| `command` | `string` |
| `...args` | `any`\[] |

#### Returns

`boolean`

***

### isToggled

**isToggled**(`command`, `...args`): `boolean`

预留 contextMenu 用，该 handler 是否可以触发

#### Parameters

| Name | Type |
| :------ | :------ |
| `command` | `string` |
| `...args` | `any`\[] |

#### Returns

`boolean`

***

### isVisible

**isVisible**(`command`, `...args`): `boolean`

预留 contextMenu 用，该 handler 是否可见

#### Parameters

| Name | Type |
| :------ | :------ |
| `command` | `string` |
| `...args` | `any`\[] |

#### Returns

`boolean`

***

### registerCommand

**registerCommand**(`id`, `handler?`): [`Disposable`](/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md)

registerCommand

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `handler?` | `CommandHandler` |

#### Returns

[`Disposable`](/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md)

**registerCommand**(`command`, `handler?`): [`Disposable`](/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `command` | [`Command`](/auto-docs/fixed-layout-editor/interfaces/Command-1.md) |
| `handler?` | `CommandHandler` |

#### Returns

[`Disposable`](/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md)

***

### registerHandler

**registerHandler**(`commandId`, `handler`): [`Disposable`](/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md)

注册 handler

#### Parameters

| Name | Type |
| :------ | :------ |
| `commandId` | `string` |
| `handler` | `CommandHandler` |

#### Returns

[`Disposable`](/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md)

***

### unregisterCommand

**unregisterCommand**(`command`): `void`

unregisterCommand

#### Parameters

| Name | Type |
| :------ | :------ |
| `command` | [`Command`](/auto-docs/fixed-layout-editor/interfaces/Command-1.md) |

#### Returns

`void`

**unregisterCommand**(`id`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`void`

***

### updateCommand

**updateCommand**(`id`, `command`): `void`

更新 command

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `command` | `Partial`<`Omit`<[`Command`](/auto-docs/fixed-layout-editor/interfaces/Command-1.md), `"id"`>> |

#### Returns

`void`
