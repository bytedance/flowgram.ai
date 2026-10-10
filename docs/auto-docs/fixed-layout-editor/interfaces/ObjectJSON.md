# Interface: ObjectJSON\<VariableMeta>

ASTNodeJSON representation of `ObjectType`

## Type parameters

| Name | Type |
| :------ | :------ |
| `VariableMeta` | `any` |

## Table of contents

### Properties

* [properties](/auto-docs/fixed-layout-editor/interfaces/ObjectJSON.md#properties)

## Properties

### properties

`Optional` **properties**: [`PropertyJSON`](/auto-docs/fixed-layout-editor/types/PropertyJSON.md)<`VariableMeta`>\[]

The properties of the object.

The `properties` of an Object must be of type `Property`, so the business can omit the `kind` field.
