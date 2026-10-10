# Class: PlaygroundRegistry

## Table of contents

### Constructors

* [constructor](/en/auto-docs/core/classes/PlaygroundRegistry.md#constructor)

### Properties

* [entityManager](/en/auto-docs/core/classes/PlaygroundRegistry.md#entitymanager)
* [playgroundConfig](/en/auto-docs/core/classes/PlaygroundRegistry.md#playgroundconfig)

### Methods

* [config](/en/auto-docs/core/classes/PlaygroundRegistry.md#config)
* [registerEditorState](/en/auto-docs/core/classes/PlaygroundRegistry.md#registereditorstate)
* [registerEntity](/en/auto-docs/core/classes/PlaygroundRegistry.md#registerentity)
* [registerLayer](/en/auto-docs/core/classes/PlaygroundRegistry.md#registerlayer)

## Constructors

### constructor

**new PlaygroundRegistry**()

## Properties

### entityManager

`Readonly` **entityManager**: [`EntityManager`](/en/auto-docs/core/classes/EntityManager.md)

***

### playgroundConfig

`Readonly` **playgroundConfig**: [`PlaygroundConfig`](/en/auto-docs/core/variables/PlaygroundConfig-1.md)

## Methods

### config

**config**(`config`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `Partial`<[`PlaygroundConfig`](/en/auto-docs/core/variables/PlaygroundConfig-1.md)> |

#### Returns

`void`

***

### registerEditorState

**registerEditorState**(`state`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`EditorState`](/en/auto-docs/core/interfaces/EditorState-1.md) |

#### Returns

`void`

***

### registerEntity

**registerEntity**(`entityRegistry`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `entityRegistry` | [`EntityRegistry`](/en/auto-docs/core/interfaces/EntityRegistry.md)<[`Entity`](/en/auto-docs/core/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/core/interfaces/EntityOpts.md)>> |

#### Returns

`void`

***

### registerLayer

**registerLayer**(`layerRegistry`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `layerRegistry` | [`LayerRegistry`](/en/auto-docs/core/interfaces/LayerRegistry.md)<[`Layer`](/en/auto-docs/core/classes/Layer.md)<`any`, `any`>> |

#### Returns

`void`
