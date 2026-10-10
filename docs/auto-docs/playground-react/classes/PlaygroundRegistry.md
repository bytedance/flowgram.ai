# Class: PlaygroundRegistry

## Table of contents

### Constructors

* [constructor](/auto-docs/playground-react/classes/PlaygroundRegistry.md#constructor)

### Properties

* [entityManager](/auto-docs/playground-react/classes/PlaygroundRegistry.md#entitymanager)
* [playgroundConfig](/auto-docs/playground-react/classes/PlaygroundRegistry.md#playgroundconfig)

### Methods

* [config](/auto-docs/playground-react/classes/PlaygroundRegistry.md#config)
* [registerEditorState](/auto-docs/playground-react/classes/PlaygroundRegistry.md#registereditorstate)
* [registerEntity](/auto-docs/playground-react/classes/PlaygroundRegistry.md#registerentity)
* [registerLayer](/auto-docs/playground-react/classes/PlaygroundRegistry.md#registerlayer)

## Constructors

### constructor

**new PlaygroundRegistry**()

## Properties

### entityManager

`Readonly` **entityManager**: [`EntityManager`](/auto-docs/playground-react/classes/EntityManager.md)

***

### playgroundConfig

`Readonly` **playgroundConfig**: [`PlaygroundConfig`](/auto-docs/playground-react/variables/PlaygroundConfig-1.md)

## Methods

### config

**config**(`config`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `Partial`<[`PlaygroundConfig`](/auto-docs/playground-react/variables/PlaygroundConfig-1.md)> |

#### Returns

`void`

***

### registerEditorState

**registerEditorState**(`state`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`EditorState`](/auto-docs/playground-react/interfaces/EditorState-1.md) |

#### Returns

`void`

***

### registerEntity

**registerEntity**(`entityRegistry`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `entityRegistry` | [`EntityRegistry`](/auto-docs/playground-react/interfaces/EntityRegistry.md)<[`Entity`](/auto-docs/playground-react/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/playground-react/interfaces/EntityOpts.md)>> |

#### Returns

`void`

***

### registerLayer

**registerLayer**(`layerRegistry`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `layerRegistry` | [`LayerRegistry`](/auto-docs/playground-react/interfaces/LayerRegistry.md)<[`Layer`](/auto-docs/playground-react/classes/Layer.md)<`any`, `any`>> |

#### Returns

`void`
