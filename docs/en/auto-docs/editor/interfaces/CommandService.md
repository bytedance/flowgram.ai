# Interface: CommandService

command service 执行接口

## Hierarchy

* [`Disposable`](/en/auto-docs/editor/interfaces/Disposable-1.md)

  ↳ **`CommandService`**

## Table of contents

### Properties

* [onDidExecuteCommand](/en/auto-docs/editor/interfaces/CommandService.md#ondidexecutecommand)
* [onWillExecuteCommand](/en/auto-docs/editor/interfaces/CommandService.md#onwillexecutecommand)

### Methods

* [dispose](/en/auto-docs/editor/interfaces/CommandService.md#dispose)
* [executeCommand](/en/auto-docs/editor/interfaces/CommandService.md#executecommand)

## Properties

### onDidExecuteCommand

`Readonly` **onDidExecuteCommand**: [`Event`](/en/auto-docs/editor/interfaces/Event-1.md)<`CommandEvent`>

command 事件执行完成后触发

***

### onWillExecuteCommand

`Readonly` **onWillExecuteCommand**: [`Event`](/en/auto-docs/editor/interfaces/Event-1.md)<`CommandEvent`>

command 事件执行前触发事件

## Methods

### dispose

**dispose**(): `void`

#### Returns

`void`

#### Inherited from

[Disposable](/en/auto-docs/editor/interfaces/Disposable-1.md).[dispose](/en/auto-docs/editor/interfaces/Disposable-1.md#dispose)

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
