# Interface: VariableDeclarationListJSON\<VariableMeta>

Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
SPDX-License-Identifier: MIT

## Type parameters

| Name | Type |
| :------ | :------ |
| `VariableMeta` | `any` |

## Table of contents

### Properties

* [declarations](/auto-docs/fixed-layout-editor/interfaces/VariableDeclarationListJSON.md#declarations)
* [startOrder](/auto-docs/fixed-layout-editor/interfaces/VariableDeclarationListJSON.md#startorder)

## Properties

### declarations

`Optional` **declarations**: [`VariableDeclarationJSON`](/auto-docs/fixed-layout-editor/types/VariableDeclarationJSON.md)<`VariableMeta`>\[]

`declarations` must be of type `VariableDeclaration`, so the business can omit the `kind` field.

***

### startOrder

`Optional` **startOrder**: `number`

The starting order number for variables.
