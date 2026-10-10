# Class: PlaygroundRegistry

## Table of contents

### Constructors

* [constructor](/auto-docs/core/classes/PlaygroundRegistry.md#constructor)

### Properties

* [entityManager](/auto-docs/core/classes/PlaygroundRegistry.md#entitymanager)
* [playgroundConfig](/auto-docs/core/classes/PlaygroundRegistry.md#playgroundconfig)

### Methods

* [config](/auto-docs/core/classes/PlaygroundRegistry.md#config)
* [registerEditorState](/auto-docs/core/classes/PlaygroundRegistry.md#registereditorstate)
* [registerEntity](/auto-docs/core/classes/PlaygroundRegistry.md#registerentity)
* [registerLayer](/auto-docs/core/classes/PlaygroundRegistry.md#registerlayer)

## Constructors

### constructor

**new PlaygroundRegistry**()

## Properties

### entityManager

`Readonly` **entityManager**: [`EntityManager`](/auto-docs/core/classes/EntityManager.md)

***

### playgroundConfig

`Readonly` **playgroundConfig**: [`PlaygroundConfig`](/auto-docs/core/variables/PlaygroundConfig-1.md)

## Methods

### config

**config**(`config`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `Partial`<[`PlaygroundConfig`](/auto-docs/core/variables/PlaygroundConfig-1.md)> |

#### Returns

`void`

***

### registerEditorState

**registerEditorState**(`state`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`EditorState`](/auto-docs/core/interfaces/EditorState-1.md) |

#### Returns

`void`

***

### registerEntity

**registerEntity**(`entityRegistry`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `entityRegistry` | [`EntityRegistry`](/auto-docs/core/interfaces/EntityRegistry.md)<[`Entity`](/auto-docs/core/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/core/interfaces/EntityOpts.md)>> |

#### Returns

`void`

***

### registerLayer

**registerLayer**(`layerRegistry`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `layerRegistry` | [`LayerRegistry`](/auto-docs/core/interfaces/LayerRegistry.md)<[`Layer`](/auto-docs/core/classes/Layer.md)<`any`, `any`>> |

#### Returns

`void`
