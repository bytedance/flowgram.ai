# Class: FlushLayerMessage

## Hierarchy

* `ConflatableMessage`

  ↳ **`FlushLayerMessage`**

## Table of contents

### Constructors

* [constructor](/en/auto-docs/editor/classes/FlushLayerMessage.md#constructor)

### Properties

* [isConflatable](/en/auto-docs/editor/classes/FlushLayerMessage.md#isconflatable)
* [layer](/en/auto-docs/editor/classes/FlushLayerMessage.md#layer)
* [type](/en/auto-docs/editor/classes/FlushLayerMessage.md#type)

### Methods

* [conflate](/en/auto-docs/editor/classes/FlushLayerMessage.md#conflate)

## Constructors

### constructor

**new FlushLayerMessage**(`layer`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `layer` | [`Layer`](/en/auto-docs/editor/classes/Layer.md)<`any`, `any`> |

#### Overrides

ConflatableMessage.constructor

## Properties

### isConflatable

`Readonly` **isConflatable**: `boolean`

Test whether the message is conflatable.

#### Notes

This property is always `true`.

#### Inherited from

ConflatableMessage.isConflatable

***

### layer

`Readonly` **layer**: [`Layer`](/en/auto-docs/editor/classes/Layer.md)<`any`, `any`>

***

### type

`Readonly` **type**: `string`

The type of the message.

#### Notes

The `type` of a message should be related directly to its actual
runtime type. This means that `type` can and will be used to cast
the message to the relevant derived `Message` subtype.

#### Inherited from

ConflatableMessage.type

## Methods

### conflate

**conflate**(`other`): `boolean`

Conflate this message with another message of the same `type`.

#### Notes

This method always returns `true`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `other` | `ConflatableMessage` |

#### Returns

`boolean`

#### Inherited from

ConflatableMessage.conflate
