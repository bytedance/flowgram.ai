# Class: PlaygroundRegistry

## Table of contents

### Constructors

* [constructor](/en/auto-docs/playground-react/classes/PlaygroundRegistry.md#constructor)

### Properties

* [entityManager](/en/auto-docs/playground-react/classes/PlaygroundRegistry.md#entitymanager)
* [playgroundConfig](/en/auto-docs/playground-react/classes/PlaygroundRegistry.md#playgroundconfig)

### Methods

* [config](/en/auto-docs/playground-react/classes/PlaygroundRegistry.md#config)
* [registerEditorState](/en/auto-docs/playground-react/classes/PlaygroundRegistry.md#registereditorstate)
* [registerEntity](/en/auto-docs/playground-react/classes/PlaygroundRegistry.md#registerentity)
* [registerLayer](/en/auto-docs/playground-react/classes/PlaygroundRegistry.md#registerlayer)

## Constructors

### constructor

**new PlaygroundRegistry**()

## Properties

### entityManager

`Readonly` **entityManager**: [`EntityManager`](/en/auto-docs/playground-react/classes/EntityManager.md)

***

### playgroundConfig

`Readonly` **playgroundConfig**: [`PlaygroundConfig`](/en/auto-docs/playground-react/variables/PlaygroundConfig-1.md)

## Methods

### config

**config**(`config`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `Partial`<[`PlaygroundConfig`](/en/auto-docs/playground-react/variables/PlaygroundConfig-1.md)> |

#### Returns

`void`

***

### registerEditorState

**registerEditorState**(`state`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`EditorState`](/en/auto-docs/playground-react/interfaces/EditorState-1.md) |

#### Returns

`void`

***

### registerEntity

**registerEntity**(`entityRegistry`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `entityRegistry` | [`EntityRegistry`](/en/auto-docs/playground-react/interfaces/EntityRegistry.md)<[`Entity`](/en/auto-docs/playground-react/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/playground-react/interfaces/EntityOpts.md)>> |

#### Returns

`void`

***

### registerLayer

**registerLayer**(`layerRegistry`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `layerRegistry` | [`LayerRegistry`](/en/auto-docs/playground-react/interfaces/LayerRegistry.md)<[`Layer`](/en/auto-docs/playground-react/classes/Layer.md)<`any`, `any`>> |

#### Returns

`void`
