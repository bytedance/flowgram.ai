# Interface: CommandService

command service 执行接口

## Hierarchy

* [`Disposable`](/auto-docs/editor/interfaces/Disposable-1.md)

  ↳ **`CommandService`**

## Table of contents

### Properties

* [onDidExecuteCommand](/auto-docs/editor/interfaces/CommandService.md#ondidexecutecommand)
* [onWillExecuteCommand](/auto-docs/editor/interfaces/CommandService.md#onwillexecutecommand)

### Methods

* [dispose](/auto-docs/editor/interfaces/CommandService.md#dispose)
* [executeCommand](/auto-docs/editor/interfaces/CommandService.md#executecommand)

## Properties

### onDidExecuteCommand

`Readonly` **onDidExecuteCommand**: [`Event`](/auto-docs/editor/interfaces/Event-1.md)<`CommandEvent`>

command 事件执行完成后触发

***

### onWillExecuteCommand

`Readonly` **onWillExecuteCommand**: [`Event`](/auto-docs/editor/interfaces/Event-1.md)<`CommandEvent`>

command 事件执行前触发事件

## Methods

### dispose

**dispose**(): `void`

#### Returns

`void`

#### Inherited from

[Disposable](/auto-docs/editor/interfaces/Disposable-1.md).[dispose](/auto-docs/editor/interfaces/Disposable-1.md#dispose)

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
