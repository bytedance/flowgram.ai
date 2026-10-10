# Class: PlaygroundRegistry

## Table of contents

### Constructors

* [constructor](/en/auto-docs/editor/classes/PlaygroundRegistry.md#constructor)

### Properties

* [entityManager](/en/auto-docs/editor/classes/PlaygroundRegistry.md#entitymanager)
* [playgroundConfig](/en/auto-docs/editor/classes/PlaygroundRegistry.md#playgroundconfig)

### Methods

* [config](/en/auto-docs/editor/classes/PlaygroundRegistry.md#config)
* [registerEditorState](/en/auto-docs/editor/classes/PlaygroundRegistry.md#registereditorstate)
* [registerEntity](/en/auto-docs/editor/classes/PlaygroundRegistry.md#registerentity)
* [registerLayer](/en/auto-docs/editor/classes/PlaygroundRegistry.md#registerlayer)

## Constructors

### constructor

**new PlaygroundRegistry**()

## Properties

### entityManager

`Readonly` **entityManager**: [`EntityManager`](/en/auto-docs/editor/classes/EntityManager.md)

***

### playgroundConfig

`Readonly` **playgroundConfig**: [`PlaygroundConfig`](/en/auto-docs/editor/variables/PlaygroundConfig-1.md)

## Methods

### config

**config**(`config`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `Partial`<[`PlaygroundConfig`](/en/auto-docs/editor/variables/PlaygroundConfig-1.md)> |

#### Returns

`void`

***

### registerEditorState

**registerEditorState**(`state`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`EditorState`](/en/auto-docs/editor/interfaces/EditorState-1.md) |

#### Returns

`void`

***

### registerEntity

**registerEntity**(`entityRegistry`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `entityRegistry` | [`EntityRegistry`](/en/auto-docs/editor/interfaces/EntityRegistry.md)<[`Entity`](/en/auto-docs/editor/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/editor/interfaces/EntityOpts.md)>> |

#### Returns

`void`

***

### registerLayer

**registerLayer**(`layerRegistry`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `layerRegistry` | [`LayerRegistry`](/en/auto-docs/editor/interfaces/LayerRegistry.md)<[`Layer`](/en/auto-docs/editor/classes/Layer.md)<`any`, `any`>> |

#### Returns

`void`
