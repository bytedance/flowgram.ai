# Interface: VariableDeclarationListJSON\<VariableMeta>

Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
SPDX-License-Identifier: MIT

## Type parameters

| Name | Type |
| :------ | :------ |
| `VariableMeta` | `any` |

## Table of contents

### Properties

* [declarations](/en/auto-docs/variable-plugin/interfaces/VariableDeclarationListJSON.md#declarations)
* [startOrder](/en/auto-docs/variable-plugin/interfaces/VariableDeclarationListJSON.md#startorder)

## Properties

### declarations

`Optional` **declarations**: [`VariableDeclarationJSON`](/en/auto-docs/variable-plugin/types/VariableDeclarationJSON.md)<`VariableMeta`>\[]

`declarations` must be of type `VariableDeclaration`, so the business can omit the `kind` field.

***

### startOrder

`Optional` **startOrder**: `number`

The starting order number for variables.
