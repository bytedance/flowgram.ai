# Class: NodeManager

## Table of contents

### Constructors

* [constructor](/auto-docs/form-core/classes/NodeManager.md#constructor)

### Properties

* [materialRenderRegistry](/auto-docs/form-core/classes/NodeManager.md#materialrenderregistry)
* [nodeRenderHocs](/auto-docs/form-core/classes/NodeManager.md#noderenderhocs)
* [pluginRenderRegistry](/auto-docs/form-core/classes/NodeManager.md#pluginrenderregistry)

### Accessors

* [nodeErrorRender](/auto-docs/form-core/classes/NodeManager.md#nodeerrorrender)
* [nodeRenderHoc](/auto-docs/form-core/classes/NodeManager.md#noderenderhoc)

### Methods

* [getMaterialRender](/auto-docs/form-core/classes/NodeManager.md#getmaterialrender)
* [getPluginRender](/auto-docs/form-core/classes/NodeManager.md#getpluginrender)
* [registerMaterialRender](/auto-docs/form-core/classes/NodeManager.md#registermaterialrender)
* [registerNodeErrorRender](/auto-docs/form-core/classes/NodeManager.md#registernodeerrorrender)
* [registerNodeRenderHoc](/auto-docs/form-core/classes/NodeManager.md#registernoderenderhoc)
* [registerPluginRender](/auto-docs/form-core/classes/NodeManager.md#registerpluginrender)

## Constructors

### constructor

**new NodeManager**()

## Properties

### materialRenderRegistry

`Readonly` **materialRenderRegistry**: `Map`<`string`, [`Render`](/auto-docs/form-core/types/Render.md)>

***

### nodeRenderHocs

`Readonly` **nodeRenderHocs**: [`NodeRenderHoc`](/auto-docs/form-core/types/NodeRenderHoc.md)\[] = `[]`

***

### pluginRenderRegistry

`Readonly` **pluginRenderRegistry**: `Map`<`string`, [`Render`](/auto-docs/form-core/types/Render.md)>

## Accessors

### nodeErrorRender

`get` **nodeErrorRender**(): `undefined` | [`Render`](/auto-docs/form-core/types/Render.md)

#### Returns

`undefined` | [`Render`](/auto-docs/form-core/types/Render.md)

***

### nodeRenderHoc

`get` **nodeRenderHoc**(): (...`args`: `any`\[]) => `any`

#### Returns

`fn`

(`...args`): `any`

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`\[] |

##### Returns

`any`

**`See`**

\_.flow

## Methods

### getMaterialRender

**getMaterialRender**(`key`): `undefined` | [`Render`](/auto-docs/form-core/types/Render.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`undefined` | [`Render`](/auto-docs/form-core/types/Render.md)

***

### getPluginRender

**getPluginRender**(`key`): `undefined` | [`NodePluginRender`](/auto-docs/form-core/types/NodePluginRender.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`undefined` | [`NodePluginRender`](/auto-docs/form-core/types/NodePluginRender.md)

***

### registerMaterialRender

**registerMaterialRender**(`key`, `render`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `render` | [`Render`](/auto-docs/form-core/types/Render.md) |

#### Returns

`void`

***

### registerNodeErrorRender

**registerNodeErrorRender**(`render`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `render` | [`Render`](/auto-docs/form-core/types/Render.md)<[`NodeErrorRenderProps`](/auto-docs/form-core/interfaces/NodeErrorRenderProps.md)> |

#### Returns

`void`

***

### registerNodeRenderHoc

**registerNodeRenderHoc**(`hoc`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `hoc` | [`NodeRenderHoc`](/auto-docs/form-core/types/NodeRenderHoc.md) |

#### Returns

`void`

***

### registerPluginRender

**registerPluginRender**(`key`, `render`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `render` | [`NodePluginRender`](/auto-docs/form-core/types/NodePluginRender.md) |

#### Returns

`void`
