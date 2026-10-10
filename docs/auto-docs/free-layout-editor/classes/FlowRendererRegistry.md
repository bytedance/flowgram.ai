# Class: FlowRendererRegistry

## Table of contents

### Constructors

* [constructor](/auto-docs/free-layout-editor/classes/FlowRendererRegistry.md#constructor)

### Properties

* [pipeline](/auto-docs/free-layout-editor/classes/FlowRendererRegistry.md#pipeline)

### Methods

* [getRendererComponent](/auto-docs/free-layout-editor/classes/FlowRendererRegistry.md#getrenderercomponent)
* [getText](/auto-docs/free-layout-editor/classes/FlowRendererRegistry.md#gettext)
* [init](/auto-docs/free-layout-editor/classes/FlowRendererRegistry.md#init)
* [registerLayer](/auto-docs/free-layout-editor/classes/FlowRendererRegistry.md#registerlayer)
* [registerLayers](/auto-docs/free-layout-editor/classes/FlowRendererRegistry.md#registerlayers)
* [registerReactComponent](/auto-docs/free-layout-editor/classes/FlowRendererRegistry.md#registerreactcomponent)
* [registerRendererComponents](/auto-docs/free-layout-editor/classes/FlowRendererRegistry.md#registerrenderercomponents)
* [registerText](/auto-docs/free-layout-editor/classes/FlowRendererRegistry.md#registertext)
* [tryToGetRendererComponent](/auto-docs/free-layout-editor/classes/FlowRendererRegistry.md#trytogetrenderercomponent)

## Constructors

### constructor

**new FlowRendererRegistry**()

## Properties

### pipeline

`Readonly` **pipeline**: [`PipelineRegistry`](/auto-docs/free-layout-editor/classes/PipelineRegistry.md)

## Methods

### getRendererComponent

**getRendererComponent**(`renderKey`): [`FlowRendererComponent`](/auto-docs/free-layout-editor/interfaces/FlowRendererComponent.md)

TODO: support memo

#### Parameters

| Name | Type |
| :------ | :------ |
| `renderKey` | `string` |

#### Returns

[`FlowRendererComponent`](/auto-docs/free-layout-editor/interfaces/FlowRendererComponent.md)

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
| `P` | extends [`Layer`](/auto-docs/free-layout-editor/classes/Layer.md)<`any`, `any`, `P`> = [`Layer`](/auto-docs/free-layout-editor/classes/Layer.md)<`any`, `any`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `layerRegistry` | [`LayerRegistry`](/auto-docs/free-layout-editor/interfaces/LayerRegistry.md)<[`Layer`](/auto-docs/free-layout-editor/classes/Layer.md)<`any`, `any`>> |
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
| `...layerRegistries` | [`LayerRegistry`](/auto-docs/free-layout-editor/interfaces/LayerRegistry.md)<[`Layer`](/auto-docs/free-layout-editor/classes/Layer.md)<`any`, `any`>>\[] |

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
| `comp` | [`FlowRendererComponent`](/auto-docs/free-layout-editor/interfaces/FlowRendererComponent.md) |

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

**tryToGetRendererComponent**(`renderKey`): `undefined` | [`FlowRendererComponent`](/auto-docs/free-layout-editor/interfaces/FlowRendererComponent.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `renderKey` | `string` |

#### Returns

`undefined` | [`FlowRendererComponent`](/auto-docs/free-layout-editor/interfaces/FlowRendererComponent.md)
