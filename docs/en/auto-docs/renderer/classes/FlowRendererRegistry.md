# Class: FlowRendererRegistry

## Table of contents

### Constructors

* [constructor](/en/auto-docs/renderer/classes/FlowRendererRegistry.md#constructor)

### Properties

* [pipeline](/en/auto-docs/renderer/classes/FlowRendererRegistry.md#pipeline)

### Methods

* [getRendererComponent](/en/auto-docs/renderer/classes/FlowRendererRegistry.md#getrenderercomponent)
* [getText](/en/auto-docs/renderer/classes/FlowRendererRegistry.md#gettext)
* [init](/en/auto-docs/renderer/classes/FlowRendererRegistry.md#init)
* [registerLayer](/en/auto-docs/renderer/classes/FlowRendererRegistry.md#registerlayer)
* [registerLayers](/en/auto-docs/renderer/classes/FlowRendererRegistry.md#registerlayers)
* [registerReactComponent](/en/auto-docs/renderer/classes/FlowRendererRegistry.md#registerreactcomponent)
* [registerRendererComponents](/en/auto-docs/renderer/classes/FlowRendererRegistry.md#registerrenderercomponents)
* [registerText](/en/auto-docs/renderer/classes/FlowRendererRegistry.md#registertext)
* [tryToGetRendererComponent](/en/auto-docs/renderer/classes/FlowRendererRegistry.md#trytogetrenderercomponent)

## Constructors

### constructor

**new FlowRendererRegistry**()

## Properties

### pipeline

`Readonly` **pipeline**: `PipelineRegistry`

## Methods

### getRendererComponent

**getRendererComponent**(`renderKey`): [`FlowRendererComponent`](/en/auto-docs/renderer/interfaces/FlowRendererComponent.md)

TODO: support memo

#### Parameters

| Name | Type |
| :------ | :------ |
| `renderKey` | `string` |

#### Returns

[`FlowRendererComponent`](/en/auto-docs/renderer/interfaces/FlowRendererComponent.md)

***

### getText

**getText**(`textKey`): `undefined` | `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `textKey` | `string` |

#### Returns

`undefined` | `string`

***

### init

**init**(): `void`

#### Returns

`void`

***

### registerLayer

**registerLayer**<`P`>(`layerRegistry`, `options?`): `void`

根据配置注册画布

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | extends `Layer`<`any`, `any`, `P`> = `Layer`<`any`, `any`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `layerRegistry` | `LayerRegistry`<`Layer`<`any`, `any`>> |
| `options?` | `P`\[`"options"`] |

#### Returns

`void`

***

### registerLayers

**registerLayers**(`...layerRegistries`): `void`

注册画布层

#### Parameters

| Name | Type |
| :------ | :------ |
| `...layerRegistries` | `LayerRegistry`<`Layer`<`any`, `any`>>\[] |

#### Returns

`void`

***

### registerReactComponent

**registerReactComponent**(`renderKey`, `renderer`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `renderKey` | `string` |
| `renderer` | (`props`: `any`) => `any` |

#### Returns

`void`

***

### registerRendererComponents

**registerRendererComponents**(`renderKey`, `comp`): `void`

注册 组件数据

#### Parameters

| Name | Type |
| :------ | :------ |
| `renderKey` | `string` |
| `comp` | [`FlowRendererComponent`](/en/auto-docs/renderer/interfaces/FlowRendererComponent.md) |

#### Returns

`void`

***

### registerText

**registerText**(`configs`): `void`

注册文案

#### Parameters

| Name | Type |
| :------ | :------ |
| `configs` | `Record`<`string`, `string`> |

#### Returns

`void`

***

### tryToGetRendererComponent

**tryToGetRendererComponent**(`renderKey`): `undefined` | [`FlowRendererComponent`](/en/auto-docs/renderer/interfaces/FlowRendererComponent.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `renderKey` | `string` |

#### Returns

`undefined` | [`FlowRendererComponent`](/en/auto-docs/renderer/interfaces/FlowRendererComponent.md)
