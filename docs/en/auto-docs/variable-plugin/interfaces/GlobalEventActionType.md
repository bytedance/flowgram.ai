# Interface: GlobalEventActionType\<Type, Payload, AST>

Global event action type.

* Global event might be dispatched from `ASTNode` or `Scope`.

## Type parameters

| Name | Type |
| :------ | :------ |
| `Type` | `string` |
| `Payload` | `any` |
| `AST` | extends [`ASTNode`](/en/auto-docs/variable-plugin/classes/ASTNode.md) = [`ASTNode`](/en/auto-docs/variable-plugin/classes/ASTNode.md) |

## Table of contents

### Properties

* [ast](/en/auto-docs/variable-plugin/interfaces/GlobalEventActionType.md#ast)
* [payload](/en/auto-docs/variable-plugin/interfaces/GlobalEventActionType.md#payload)
* [type](/en/auto-docs/variable-plugin/interfaces/GlobalEventActionType.md#type)

## Properties

### ast

`Optional` **ast**: `AST`

***

### payload

`Optional` **payload**: `Payload`

***

### type

**type**: `Type`
