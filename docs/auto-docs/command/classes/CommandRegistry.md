# Class: CommandRegistry

## Implements

* [`CommandService`](/auto-docs/command/variables/CommandService-1.md)

## Table of contents

### Constructors

* [constructor](/auto-docs/command/classes/CommandRegistry.md#constructor)

### Properties

* [onDidExecuteCommand](/auto-docs/command/classes/CommandRegistry.md#ondidexecutecommand)
* [onWillExecuteCommand](/auto-docs/command/classes/CommandRegistry.md#onwillexecutecommand)

### Accessors

* [commandIds](/auto-docs/command/classes/CommandRegistry.md#commandids)
* [commands](/auto-docs/command/classes/CommandRegistry.md#commands)

### Methods

* [dispose](/auto-docs/command/classes/CommandRegistry.md#dispose)
* [executeCommand](/auto-docs/command/classes/CommandRegistry.md#executecommand)
* [getActiveHandler](/auto-docs/command/classes/CommandRegistry.md#getactivehandler)
* [getAllHandlers](/auto-docs/command/classes/CommandRegistry.md#getallhandlers)
* [getCommand](/auto-docs/command/classes/CommandRegistry.md#getcommand)
* [getToggledHandler](/auto-docs/command/classes/CommandRegistry.md#gettoggledhandler)
* [getVisibleHandler](/auto-docs/command/classes/CommandRegistry.md#getvisiblehandler)
* [init](/auto-docs/command/classes/CommandRegistry.md#init)
* [isEnabled](/auto-docs/command/classes/CommandRegistry.md#isenabled)
* [isToggled](/auto-docs/command/classes/CommandRegistry.md#istoggled)
* [isVisible](/auto-docs/command/classes/CommandRegistry.md#isvisible)
* [registerCommand](/auto-docs/command/classes/CommandRegistry.md#registercommand)
* [registerHandler](/auto-docs/command/classes/CommandRegistry.md#registerhandler)
* [unregisterCommand](/auto-docs/command/classes/CommandRegistry.md#unregistercommand)
* [updateCommand](/auto-docs/command/classes/CommandRegistry.md#updatecommand)

## Constructors

### constructor

**new CommandRegistry**()

## Properties

### onDidExecuteCommand

`Readonly` **onDidExecuteCommand**: `Event`<`CommandEvent`>

#### Implementation of

CommandService.onDidExecuteCommand

***

### onWillExecuteCommand

`Readonly` **onWillExecuteCommand**: `Event`<`CommandEvent`>

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

`get` **commands**(): [`Command`](/auto-docs/command/interfaces/Command-1.md)\[]

当前所有 command

#### Returns

[`Command`](/auto-docs/command/interfaces/Command-1.md)\[]

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

**getActiveHandler**(`commandId`, `...args`): `undefined` | [`CommandHandler`](/auto-docs/command/interfaces/CommandHandler.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `commandId` | `string` |
| `...args` | `any`\[] |

#### Returns

`undefined` | [`CommandHandler`](/auto-docs/command/interfaces/CommandHandler.md)

***

### getAllHandlers

**getAllHandlers**(`commandId`): [`CommandHandler`](/auto-docs/command/interfaces/CommandHandler.md)\[]

获取 command 对应的所有 handler

#### Parameters

| Name | Type |
| :------ | :------ |
| `commandId` | `string` |

#### Returns

[`CommandHandler`](/auto-docs/command/interfaces/CommandHandler.md)\[]

***

### getCommand

**getCommand**(`id`): `undefined` | [`Command`](/auto-docs/command/interfaces/Command-1.md)

获取 command

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`undefined` | [`Command`](/auto-docs/command/interfaces/Command-1.md)

***

### getToggledHandler

**getToggledHandler**(`commandId`, `...args`): `undefined` | [`CommandHandler`](/auto-docs/command/interfaces/CommandHandler.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `commandId` | `string` |
| `...args` | `any`\[] |

#### Returns

`undefined` | [`CommandHandler`](/auto-docs/command/interfaces/CommandHandler.md)

***

### getVisibleHandler

**getVisibleHandler**(`commandId`, `...args`): `undefined` | [`CommandHandler`](/auto-docs/command/interfaces/CommandHandler.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `commandId` | `string` |
| `...args` | `any`\[] |

#### Returns

`undefined` | [`CommandHandler`](/auto-docs/command/interfaces/CommandHandler.md)

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

**registerCommand**(`id`, `handler?`): `Disposable`

registerCommand

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `handler?` | [`CommandHandler`](/auto-docs/command/interfaces/CommandHandler.md) |

#### Returns

`Disposable`

**registerCommand**(`command`, `handler?`): `Disposable`

#### Parameters

| Name | Type |
| :------ | :------ |
| `command` | [`Command`](/auto-docs/command/interfaces/Command-1.md) |
| `handler?` | [`CommandHandler`](/auto-docs/command/interfaces/CommandHandler.md) |

#### Returns

`Disposable`

***

### registerHandler

**registerHandler**(`commandId`, `handler`): `Disposable`

注册 handler

#### Parameters

| Name | Type |
| :------ | :------ |
| `commandId` | `string` |
| `handler` | [`CommandHandler`](/auto-docs/command/interfaces/CommandHandler.md) |

#### Returns

`Disposable`

***

### unregisterCommand

**unregisterCommand**(`command`): `void`

unregisterCommand

#### Parameters

| Name | Type |
| :------ | :------ |
| `command` | [`Command`](/auto-docs/command/interfaces/Command-1.md) |

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
| `command` | `Partial`<`Omit`<[`Command`](/auto-docs/command/interfaces/Command-1.md), `"id"`>> |

#### Returns

`void`
