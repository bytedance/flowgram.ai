# Class: LoggerService

画布全局的选择器，可以放任何东西

## Implements

* [`Disposable`](/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md)

## Table of contents

### Constructors

* [constructor](/auto-docs/fixed-layout-editor/classes/LoggerService.md#constructor)

### Properties

* [onLogger](/auto-docs/fixed-layout-editor/classes/LoggerService.md#onlogger)

### Methods

* [dispose](/auto-docs/fixed-layout-editor/classes/LoggerService.md#dispose)
* [onAllLayersRendered](/auto-docs/fixed-layout-editor/classes/LoggerService.md#onalllayersrendered)
* [onFlushRequest](/auto-docs/fixed-layout-editor/classes/LoggerService.md#onflushrequest)

## Constructors

### constructor

**new LoggerService**()

## Properties

### onLogger

`Readonly` **onLogger**: [`Event`](/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<`any`>

## Methods

### dispose

**dispose**(): `void`

#### Returns

`void`

#### Implementation of

[Disposable](/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md).[dispose](/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md#dispose)

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
