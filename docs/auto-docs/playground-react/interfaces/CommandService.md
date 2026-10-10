# Interface: CommandService

command service 执行接口

## Hierarchy

* [`Disposable`](/auto-docs/playground-react/interfaces/Disposable-1.md)

  ↳ **`CommandService`**

## Table of contents

### Properties

* [onDidExecuteCommand](/auto-docs/playground-react/interfaces/CommandService.md#ondidexecutecommand)
* [onWillExecuteCommand](/auto-docs/playground-react/interfaces/CommandService.md#onwillexecutecommand)

### Methods

* [dispose](/auto-docs/playground-react/interfaces/CommandService.md#dispose)
* [executeCommand](/auto-docs/playground-react/interfaces/CommandService.md#executecommand)

## Properties

### onDidExecuteCommand

`Readonly` **onDidExecuteCommand**: [`Event`](/auto-docs/playground-react/interfaces/Event-1.md)<`CommandEvent`>

command 事件执行完成后触发

***

### onWillExecuteCommand

`Readonly` **onWillExecuteCommand**: [`Event`](/auto-docs/playground-react/interfaces/Event-1.md)<`CommandEvent`>

command 事件执行前触发事件

## Methods

### dispose

**dispose**(): `void`

#### Returns

`void`

#### Inherited from

[Disposable](/auto-docs/playground-react/interfaces/Disposable-1.md).[dispose](/auto-docs/playground-react/interfaces/Disposable-1.md#dispose)

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
