# Class: FlowMinimapService

## Table of contents

### Constructors

* [constructor](/auto-docs/minimap-plugin/classes/FlowMinimapService.md#constructor)

### Properties

* [activated](/auto-docs/minimap-plugin/classes/FlowMinimapService.md#activated)
* [canvas](/auto-docs/minimap-plugin/classes/FlowMinimapService.md#canvas)
* [context2D](/auto-docs/minimap-plugin/classes/FlowMinimapService.md#context2d)
* [render](/auto-docs/minimap-plugin/classes/FlowMinimapService.md#render)

### Methods

* [dispose](/auto-docs/minimap-plugin/classes/FlowMinimapService.md#dispose)
* [init](/auto-docs/minimap-plugin/classes/FlowMinimapService.md#init)
* [onActive](/auto-docs/minimap-plugin/classes/FlowMinimapService.md#onactive)
* [setActivate](/auto-docs/minimap-plugin/classes/FlowMinimapService.md#setactivate)
* [setVisible](/auto-docs/minimap-plugin/classes/FlowMinimapService.md#setvisible)

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
| `options?` | `Partial`<[`MinimapServiceOptions`](/auto-docs/minimap-plugin/interfaces/MinimapServiceOptions.md)> |

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
