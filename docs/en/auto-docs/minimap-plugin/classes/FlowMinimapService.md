# Class: FlowMinimapService

## Table of contents

### Constructors

* [constructor](/en/auto-docs/minimap-plugin/classes/FlowMinimapService.md#constructor)

### Properties

* [activated](/en/auto-docs/minimap-plugin/classes/FlowMinimapService.md#activated)
* [canvas](/en/auto-docs/minimap-plugin/classes/FlowMinimapService.md#canvas)
* [context2D](/en/auto-docs/minimap-plugin/classes/FlowMinimapService.md#context2d)
* [render](/en/auto-docs/minimap-plugin/classes/FlowMinimapService.md#render)

### Methods

* [dispose](/en/auto-docs/minimap-plugin/classes/FlowMinimapService.md#dispose)
* [init](/en/auto-docs/minimap-plugin/classes/FlowMinimapService.md#init)
* [onActive](/en/auto-docs/minimap-plugin/classes/FlowMinimapService.md#onactive)
* [setActivate](/en/auto-docs/minimap-plugin/classes/FlowMinimapService.md#setactivate)
* [setVisible](/en/auto-docs/minimap-plugin/classes/FlowMinimapService.md#setvisible)

## Constructors

### constructor

**new FlowMinimapService**()

## Properties

### activated

**activated**: `boolean`

***

### canvas

`Readonly` **canvas**: `HTMLCanvasElement`

***

### context2D

`Readonly` **context2D**: `CanvasRenderingContext2D`

***

### render

**render**: () => `void`

#### Type declaration

(): `void`

触发渲染

##### Returns

`void`

## Methods

### dispose

**dispose**(): `void`

#### Returns

`void`

***

### init

**init**(`options?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `Partial`<[`MinimapServiceOptions`](/en/auto-docs/minimap-plugin/interfaces/MinimapServiceOptions.md)> |

#### Returns

`void`

***

### onActive

**onActive**(`callback`): `Disposable`

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`activated`: `boolean`) => `void` |

#### Returns

`Disposable`

***

### setActivate

**setActivate**(`activate`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `activate` | `boolean` |

#### Returns

`void`

***

### setVisible

**setVisible**(`visible`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `visible` | `boolean` |

#### Returns

`void`
