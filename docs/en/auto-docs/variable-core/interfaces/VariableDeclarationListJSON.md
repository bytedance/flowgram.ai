# Interface: VariableDeclarationListJSON\<VariableMeta>

## Type parameters

| Name | Type |
| :------ | :------ |
| `VariableMeta` | `any` |

## Table of contents

### Properties

* [declarations](/en/auto-docs/variable-core/interfaces/VariableDeclarationListJSON.md#declarations)
* [startOrder](/en/auto-docs/variable-core/interfaces/VariableDeclarationListJSON.md#startorder)

## Properties

### declarations

`Optional` **declarations**: [`VariableDeclarationJSON`](/en/auto-docs/variable-core/types/VariableDeclarationJSON.md)<`VariableMeta`>\[]

`declarations` must be of type `VariableDeclaration`, so the business can omit the `kind` field.

***

### startOrder

`Optional` **startOrder**: `number`

The starting order number for variables.
