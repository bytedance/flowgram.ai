# Class: NodeManager

## Table of contents

### Constructors

* [constructor](/en/auto-docs/form-core/classes/NodeManager.md#constructor)

### Properties

* [materialRenderRegistry](/en/auto-docs/form-core/classes/NodeManager.md#materialrenderregistry)
* [nodeRenderHocs](/en/auto-docs/form-core/classes/NodeManager.md#noderenderhocs)
* [pluginRenderRegistry](/en/auto-docs/form-core/classes/NodeManager.md#pluginrenderregistry)

### Accessors

* [nodeErrorRender](/en/auto-docs/form-core/classes/NodeManager.md#nodeerrorrender)
* [nodeRenderHoc](/en/auto-docs/form-core/classes/NodeManager.md#noderenderhoc)

### Methods

* [getMaterialRender](/en/auto-docs/form-core/classes/NodeManager.md#getmaterialrender)
* [getPluginRender](/en/auto-docs/form-core/classes/NodeManager.md#getpluginrender)
* [registerMaterialRender](/en/auto-docs/form-core/classes/NodeManager.md#registermaterialrender)
* [registerNodeErrorRender](/en/auto-docs/form-core/classes/NodeManager.md#registernodeerrorrender)
* [registerNodeRenderHoc](/en/auto-docs/form-core/classes/NodeManager.md#registernoderenderhoc)
* [registerPluginRender](/en/auto-docs/form-core/classes/NodeManager.md#registerpluginrender)

## Constructors

### constructor

**new NodeManager**()

## Properties

### materialRenderRegistry

`Readonly` **materialRenderRegistry**: `Map`<`string`, [`Render`](/en/auto-docs/form-core/types/Render.md)>

***

### nodeRenderHocs

`Readonly` **nodeRenderHocs**: [`NodeRenderHoc`](/en/auto-docs/form-core/types/NodeRenderHoc.md)\[] = `[]`

***

### pluginRenderRegistry

`Readonly` **pluginRenderRegistry**: `Map`<`string`, [`Render`](/en/auto-docs/form-core/types/Render.md)>

## Accessors

### nodeErrorRender

`get` **nodeErrorRender**(): `undefined` | [`Render`](/en/auto-docs/form-core/types/Render.md)

#### Returns

`undefined` | [`Render`](/en/auto-docs/form-core/types/Render.md)

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

**getMaterialRender**(`key`): `undefined` | [`Render`](/en/auto-docs/form-core/types/Render.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`undefined` | [`Render`](/en/auto-docs/form-core/types/Render.md)

***

### getPluginRender

**getPluginRender**(`key`): `undefined` | [`NodePluginRender`](/en/auto-docs/form-core/types/NodePluginRender.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`undefined` | [`NodePluginRender`](/en/auto-docs/form-core/types/NodePluginRender.md)

***

### registerMaterialRender

**registerMaterialRender**(`key`, `render`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `render` | [`Render`](/en/auto-docs/form-core/types/Render.md) |

#### Returns

`void`

***

### registerNodeErrorRender

**registerNodeErrorRender**(`render`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `render` | [`Render`](/en/auto-docs/form-core/types/Render.md)<[`NodeErrorRenderProps`](/en/auto-docs/form-core/interfaces/NodeErrorRenderProps.md)> |

#### Returns

`void`

***

### registerNodeRenderHoc

**registerNodeRenderHoc**(`hoc`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `hoc` | [`NodeRenderHoc`](/en/auto-docs/form-core/types/NodeRenderHoc.md) |

#### Returns

`void`

***

### registerPluginRender

**registerPluginRender**(`key`, `render`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `render` | [`NodePluginRender`](/en/auto-docs/form-core/types/NodePluginRender.md) |

#### Returns

`void`
