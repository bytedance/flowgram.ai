# Class: PlaygroundRegistry

## Table of contents

### Constructors

* [constructor](/auto-docs/free-layout-editor/classes/PlaygroundRegistry.md#constructor)

### Properties

* [entityManager](/auto-docs/free-layout-editor/classes/PlaygroundRegistry.md#entitymanager)
* [playgroundConfig](/auto-docs/free-layout-editor/classes/PlaygroundRegistry.md#playgroundconfig)

### Methods

* [config](/auto-docs/free-layout-editor/classes/PlaygroundRegistry.md#config)
* [registerEditorState](/auto-docs/free-layout-editor/classes/PlaygroundRegistry.md#registereditorstate)
* [registerEntity](/auto-docs/free-layout-editor/classes/PlaygroundRegistry.md#registerentity)
* [registerLayer](/auto-docs/free-layout-editor/classes/PlaygroundRegistry.md#registerlayer)

## Constructors

### constructor

**new PlaygroundRegistry**()

## Properties

### entityManager

`Readonly` **entityManager**: [`EntityManager`](/auto-docs/free-layout-editor/classes/EntityManager.md)

***

### playgroundConfig

`Readonly` **playgroundConfig**: [`PlaygroundConfig`](/auto-docs/free-layout-editor/variables/PlaygroundConfig-1.md)

## Methods

### config

**config**(`config`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `Partial`<[`PlaygroundConfig`](/auto-docs/free-layout-editor/variables/PlaygroundConfig-1.md)> |

#### Returns

`void`

***

### registerEditorState

**registerEditorState**(`state`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`EditorState`](/auto-docs/free-layout-editor/interfaces/EditorState-1.md) |

#### Returns

`void`

***

### registerEntity

**registerEntity**(`entityRegistry`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `entityRegistry` | [`EntityRegistry`](/auto-docs/free-layout-editor/interfaces/EntityRegistry.md)<[`Entity`](/auto-docs/free-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/free-layout-editor/interfaces/EntityOpts.md)>> |

#### Returns

`void`

***

### registerLayer

**registerLayer**(`layerRegistry`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `layerRegistry` | [`LayerRegistry`](/auto-docs/free-layout-editor/interfaces/LayerRegistry.md)<[`Layer`](/auto-docs/free-layout-editor/classes/Layer.md)<`any`, `any`>> |

#### Returns

`void`
