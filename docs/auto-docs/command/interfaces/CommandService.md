# Interface: CommandService

command service 执行接口

## Hierarchy

* `Disposable`

  ↳ **`CommandService`**

## Table of contents

### Properties

* [onDidExecuteCommand](/auto-docs/command/interfaces/CommandService.md#ondidexecutecommand)
* [onWillExecuteCommand](/auto-docs/command/interfaces/CommandService.md#onwillexecutecommand)

### Methods

* [dispose](/auto-docs/command/interfaces/CommandService.md#dispose)
* [executeCommand](/auto-docs/command/interfaces/CommandService.md#executecommand)

## Properties

### onDidExecuteCommand

`Readonly` **onDidExecuteCommand**: `Event`<`CommandEvent`>

command 事件执行完成后触发

***

### onWillExecuteCommand

`Readonly` **onWillExecuteCommand**: `Event`<`CommandEvent`>

command 事件执行前触发事件

## Methods

### dispose

**dispose**(): `void`

#### Returns

`void`

#### Inherited from

Disposable.dispose

***

### executeCommand

**executeCommand**<`T`>(`command`, `...args`): `Promise`<`undefined` | `T`>

执行 command

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `command` | `string` |
| `...args` | `any`\[] |

#### Returns

`Promise`<`undefined` | `T`>
