# Class: LoggerService

画布全局的选择器，可以放任何东西

## Implements

* [`Disposable`](/en/auto-docs/playground-react/interfaces/Disposable-1.md)

## Table of contents

### Constructors

* [constructor](/en/auto-docs/playground-react/classes/LoggerService.md#constructor)

### Properties

* [onLogger](/en/auto-docs/playground-react/classes/LoggerService.md#onlogger)

### Methods

* [dispose](/en/auto-docs/playground-react/classes/LoggerService.md#dispose)
* [onAllLayersRendered](/en/auto-docs/playground-react/classes/LoggerService.md#onalllayersrendered)
* [onFlushRequest](/en/auto-docs/playground-react/classes/LoggerService.md#onflushrequest)

## Constructors

### constructor

**new LoggerService**()

## Properties

### onLogger

`Readonly` **onLogger**: [`Event`](/en/auto-docs/playground-react/interfaces/Event-1.md)<`any`>

## Methods

### dispose

**dispose**(): `void`

#### Returns

`void`

#### Implementation of

[Disposable](/en/auto-docs/playground-react/interfaces/Disposable-1.md).[dispose](/en/auto-docs/playground-react/interfaces/Disposable-1.md#dispose)

***

### onAllLayersRendered

**onAllLayersRendered**(): `void`

#### Returns

`void`

***

### onFlushRequest

**onFlushRequest**(`renderFrameInterval`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `renderFrameInterval` | `number` |

#### Returns

`void`
