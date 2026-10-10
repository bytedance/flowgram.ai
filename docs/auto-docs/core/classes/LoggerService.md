# Class: LoggerService

画布全局的选择器，可以放任何东西

## Implements

* `Disposable`

## Table of contents

### Constructors

* [constructor](/auto-docs/core/classes/LoggerService.md#constructor)

### Properties

* [onLogger](/auto-docs/core/classes/LoggerService.md#onlogger)

### Methods

* [dispose](/auto-docs/core/classes/LoggerService.md#dispose)
* [onAllLayersRendered](/auto-docs/core/classes/LoggerService.md#onalllayersrendered)
* [onFlushRequest](/auto-docs/core/classes/LoggerService.md#onflushrequest)

## Constructors

### constructor

**new LoggerService**()

## Properties

### onLogger

`Readonly` **onLogger**: `Event`<`any`>

## Methods

### dispose

**dispose**(): `void`

#### Returns

`void`

#### Implementation of

Disposable.dispose

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
