# Interface: GlobalEventActionType\<Type, Payload, AST>

Global event action type.

* Global event might be dispatched from `ASTNode` or `Scope`.

## Type parameters

| Name | Type |
| :------ | :------ |
| `Type` | `string` |
| `Payload` | `any` |
| `AST` | extends [`ASTNode`](/auto-docs/variable-plugin/classes/ASTNode.md) = [`ASTNode`](/auto-docs/variable-plugin/classes/ASTNode.md) |

## Table of contents

### Properties

* [ast](/auto-docs/variable-plugin/interfaces/GlobalEventActionType.md#ast)
* [payload](/auto-docs/variable-plugin/interfaces/GlobalEventActionType.md#payload)
* [type](/auto-docs/variable-plugin/interfaces/GlobalEventActionType.md#type)

## Properties

### ast

`Optional` **ast**: `AST`

***

### payload

`Optional` **payload**: `Payload`

***

### type

**type**: `Type`
