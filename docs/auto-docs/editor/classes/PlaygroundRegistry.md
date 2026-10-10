# Class: PlaygroundRegistry

## Table of contents

### Constructors

* [constructor](/auto-docs/editor/classes/PlaygroundRegistry.md#constructor)

### Properties

* [entityManager](/auto-docs/editor/classes/PlaygroundRegistry.md#entitymanager)
* [playgroundConfig](/auto-docs/editor/classes/PlaygroundRegistry.md#playgroundconfig)

### Methods

* [config](/auto-docs/editor/classes/PlaygroundRegistry.md#config)
* [registerEditorState](/auto-docs/editor/classes/PlaygroundRegistry.md#registereditorstate)
* [registerEntity](/auto-docs/editor/classes/PlaygroundRegistry.md#registerentity)
* [registerLayer](/auto-docs/editor/classes/PlaygroundRegistry.md#registerlayer)

## Constructors

### constructor

**new PlaygroundRegistry**()

## Properties

### entityManager

`Readonly` **entityManager**: [`EntityManager`](/auto-docs/editor/classes/EntityManager.md)

***

### playgroundConfig

`Readonly` **playgroundConfig**: [`PlaygroundConfig`](/auto-docs/editor/variables/PlaygroundConfig-1.md)

## Methods

### config

**config**(`config`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `Partial`<[`PlaygroundConfig`](/auto-docs/editor/variables/PlaygroundConfig-1.md)> |

#### Returns

`void`

***

### registerEditorState

**registerEditorState**(`state`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`EditorState`](/auto-docs/editor/interfaces/EditorState-1.md) |

#### Returns

`void`

***

### registerEntity

**registerEntity**(`entityRegistry`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `entityRegistry` | [`EntityRegistry`](/auto-docs/editor/interfaces/EntityRegistry.md)<[`Entity`](/auto-docs/editor/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/editor/interfaces/EntityOpts.md)>> |

#### Returns

`void`

***

### registerLayer

**registerLayer**(`layerRegistry`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `layerRegistry` | [`LayerRegistry`](/auto-docs/editor/interfaces/LayerRegistry.md)<[`Layer`](/auto-docs/editor/classes/Layer.md)<`any`, `any`>> |

#### Returns

`void`
