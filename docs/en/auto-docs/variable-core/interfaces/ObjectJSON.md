# Interface: ObjectJSON\<VariableMeta>

ASTNodeJSON representation of `ObjectType`

## Type parameters

| Name | Type |
| :------ | :------ |
| `VariableMeta` | `any` |

## Table of contents

### Properties

* [properties](/en/auto-docs/variable-core/interfaces/ObjectJSON.md#properties)

## Properties

### properties

`Optional` **properties**: [`PropertyJSON`](/en/auto-docs/variable-core/types/PropertyJSON.md)<`VariableMeta`>\[]

The properties of the object.

The `properties` of an Object must be of type `Property`, so the business can omit the `kind` field.
