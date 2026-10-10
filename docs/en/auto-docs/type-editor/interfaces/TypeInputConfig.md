# Interface: TypeInputConfig\<TypeSchema>

## Type parameters

| Name | Type |
| :------ | :------ |
| `TypeSchema` | extends `Partial`<`IJsonSchema`> |

## Table of contents

### Properties

* [canEnter](/en/auto-docs/type-editor/interfaces/TypeInputConfig.md#canenter)
* [getProps](/en/auto-docs/type-editor/interfaces/TypeInputConfig.md#getprops)

## Properties

### canEnter

`Optional` **canEnter**: `boolean`

***

### getProps

`Optional` **getProps**: (`typeSchema`: `TypeSchema`) => `Record`<`string`, `unknown`>

#### Type declaration

(`typeSchema`): `Record`<`string`, `unknown`>

##### Parameters

| Name | Type |
| :------ | :------ |
| `typeSchema` | `TypeSchema` |

##### Returns

`Record`<`string`, `unknown`>
