# Interface: JsonSchemaTypeRegistry\<Schema>

TypeRegistry based on IJsonSchema

## Type parameters

| Name | Type |
| :------ | :------ |
| `Schema` | extends `Partial`<[`IJsonSchema`](/auto-docs/json-schema/interfaces/IJsonSchema.md)> = [`IJsonSchema`](/auto-docs/json-schema/interfaces/IJsonSchema.md) |

## Hierarchy

* [`BaseTypeRegistry`](/auto-docs/json-schema/interfaces/BaseTypeRegistry.md)

  ↳ **`JsonSchemaTypeRegistry`**

## Table of contents

### Properties

* [arrayIcon](/auto-docs/json-schema/interfaces/JsonSchemaTypeRegistry.md#arrayicon)
* [canAddField](/auto-docs/json-schema/interfaces/JsonSchemaTypeRegistry.md#canaddfield)
* [container](/auto-docs/json-schema/interfaces/JsonSchemaTypeRegistry.md#container)
* [customComplexText](/auto-docs/json-schema/interfaces/JsonSchemaTypeRegistry.md#customcomplextext)
* [extend](/auto-docs/json-schema/interfaces/JsonSchemaTypeRegistry.md#extend)
* [getDefaultSchema](/auto-docs/json-schema/interfaces/JsonSchemaTypeRegistry.md#getdefaultschema)
* [getDefaultValue](/auto-docs/json-schema/interfaces/JsonSchemaTypeRegistry.md#getdefaultvalue)
* [getDisplayIcon](/auto-docs/json-schema/interfaces/JsonSchemaTypeRegistry.md#getdisplayicon)
* [getDisplayLabel](/auto-docs/json-schema/interfaces/JsonSchemaTypeRegistry.md#getdisplaylabel)
* [getDisplayText](/auto-docs/json-schema/interfaces/JsonSchemaTypeRegistry.md#getdisplaytext)
* [getItemType](/auto-docs/json-schema/interfaces/JsonSchemaTypeRegistry.md#getitemtype)
* [getJsonPaths](/auto-docs/json-schema/interfaces/JsonSchemaTypeRegistry.md#getjsonpaths)
* [getPropertiesParent](/auto-docs/json-schema/interfaces/JsonSchemaTypeRegistry.md#getpropertiesparent)
* [getStringValueByTypeSchema](/auto-docs/json-schema/interfaces/JsonSchemaTypeRegistry.md#getstringvaluebytypeschema)
* [getSupportedItemTypes](/auto-docs/json-schema/interfaces/JsonSchemaTypeRegistry.md#getsupporteditemtypes)
* [getTypeSchemaByStringValue](/auto-docs/json-schema/interfaces/JsonSchemaTypeRegistry.md#gettypeschemabystringvalue)
* [getTypeSchemaProperties](/auto-docs/json-schema/interfaces/JsonSchemaTypeRegistry.md#gettypeschemaproperties)
* [getValueText](/auto-docs/json-schema/interfaces/JsonSchemaTypeRegistry.md#getvaluetext)
* [icon](/auto-docs/json-schema/interfaces/JsonSchemaTypeRegistry.md#icon)
* [label](/auto-docs/json-schema/interfaces/JsonSchemaTypeRegistry.md#label)
* [onInit](/auto-docs/json-schema/interfaces/JsonSchemaTypeRegistry.md#oninit)
* [parentType](/auto-docs/json-schema/interfaces/JsonSchemaTypeRegistry.md#parenttype)
* [type](/auto-docs/json-schema/interfaces/JsonSchemaTypeRegistry.md#type)

## Properties

### arrayIcon

`Optional` **arrayIcon**: `Element`

The icon displayed when this type is used as an array item

***

### canAddField

**canAddField**: (`typeSchema`: `Schema`) => `boolean`

#### Type declaration

(`typeSchema`): `boolean`

Whether to allow adding fields, such as object

##### Parameters

| Name | Type |
| :------ | :------ |
| `typeSchema` | `Schema` |

##### Returns

`boolean`

***

### container

**container**: `boolean`

Whether it is a container type

***

### customComplexText

`Optional` **customComplexText**: (`typeSchema`: `Schema`) => `string`

#### Type declaration

(`typeSchema`): `string`

The complexText of a custom type
For example, Array<string>, can be modified

##### Parameters

| Name | Type |
| :------ | :------ |
| `typeSchema` | `Schema` |

##### Returns

`string`

***

### extend

`Optional` **extend**: `string`

The inherited type. If there is an inheritance, the definition of this type will use the inherited type definition,
and the new definition will override the inherited definition.

#### Inherited from

[BaseTypeRegistry](/auto-docs/json-schema/interfaces/BaseTypeRegistry.md).[extend](/auto-docs/json-schema/interfaces/BaseTypeRegistry.md#extend)

***

### getDefaultSchema

**getDefaultSchema**: () => `Schema`

#### Type declaration

(): `Schema`

Generate default Schema

##### Returns

`Schema`

***

### getDefaultValue

**getDefaultValue**: () => `unknown`

#### Type declaration

(): `unknown`

Get the default value

##### Returns

`unknown`

***

### getDisplayIcon

**getDisplayIcon**: (`typeSchema`: `Schema`) => `Element`

#### Type declaration

(`typeSchema`): `Element`

Get the display icon, and the composite icon of the array is also processed

##### Parameters

| Name | Type |
| :------ | :------ |
| `typeSchema` | `Schema` |

##### Returns

`Element`

***

### getDisplayLabel

**getDisplayLabel**: (`typeSchema`: `Schema`) => `Element`

#### Type declaration

(`typeSchema`): `Element`

Get the display label

##### Parameters

| Name | Type |
| :------ | :------ |
| `typeSchema` | `Schema` |

##### Returns

`Element`

***

### getDisplayText

**getDisplayText**: (`typeSchema`: `Schema`) => `undefined` | `string`

#### Type declaration

(`typeSchema`): `undefined` | `string`

Get the display text

##### Parameters

| Name | Type |
| :------ | :------ |
| `typeSchema` | `Schema` |

##### Returns

`undefined` | `string`

***

### getItemType

`Optional` **getItemType**: (`typeSchema`: `Schema`) => `undefined` | `Schema`

#### Type declaration

(`typeSchema`): `undefined` | `Schema`

Get the sub-type

##### Parameters

| Name | Type |
| :------ | :------ |
| `typeSchema` | `Schema` |

##### Returns

`undefined` | `Schema`

***

### getJsonPaths

**getJsonPaths**: (`typeSchema`: `Schema`) => `string`\[]

#### Type declaration

(`typeSchema`): `string`\[]

Get the json path of a certain type in the flow schema
For example
{ type: "object", properties: { name: { type: "string" } } }
-> \['properties', 'name']
{ type: "array", items: { type: "string" } }
->\['items']

##### Parameters

| Name | Type |
| :------ | :------ |
| `typeSchema` | `Schema` |

##### Returns

`string`\[]

***

### getPropertiesParent

**getPropertiesParent**: (`typeSchema`: `Schema`) => `undefined` | `Schema`

#### Type declaration

(`typeSchema`): `undefined` | `Schema`

Get the parent node of the sub-field
object is itself
array<object> is items
map<object> is additionalProperties

##### Parameters

| Name | Type |
| :------ | :------ |
| `typeSchema` | `Schema` |

##### Returns

`undefined` | `Schema`

***

### getStringValueByTypeSchema

`Optional` **getStringValueByTypeSchema**: (`optionValue`: `Schema`) => `undefined` | `string`

#### Type declaration

(`optionValue`): `undefined` | `string`

Get the string value, for example
{ type: "array", items: { type: "string" } }
The value is "array-string"

The use case is that in some UI components, a string value needs to be generated

##### Parameters

| Name | Type |
| :------ | :------ |
| `optionValue` | `Schema` |

##### Returns

`undefined` | `string`

***

### getSupportedItemTypes

`Optional` **getSupportedItemTypes**: (`ctx`: { `level`: `number` ; `parentTypes?`: `string`\[]  }) => { `disabled?`: `string` ; `type`: `string`  }\[]

#### Type declaration

(`ctx`): { `disabled?`: `string` ; `type`: `string`  }\[]

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `Object` |
| `ctx.level` | `number` |
| `ctx.parentTypes?` | `string`\[] |

##### Returns

{ `disabled?`: `string` ; `type`: `string`  }\[]

***

### getTypeSchemaByStringValue

`Optional` **getTypeSchemaByStringValue**: (`type`: `string`) => `Schema`

#### Type declaration

(`type`): `Schema`

Restore the string value to typeSchema
"array-string" is restored to
{ type: "array", items: { type: "string" } }

##### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |

##### Returns

`Schema`

***

### getTypeSchemaProperties

**getTypeSchemaProperties**: (`typeSchema`: `Schema`) => `undefined` | `Record`<`string`, `Schema`>

#### Type declaration

(`typeSchema`): `undefined` | `Record`<`string`, `Schema`>

Get sub-properties

##### Parameters

| Name | Type |
| :------ | :------ |
| `typeSchema` | `Schema` |

##### Returns

`undefined` | `Record`<`string`, `Schema`>

***

### getValueText

**getValueText**: (`value?`: `unknown`) => `string`

#### Type declaration

(`value?`): `string`

Get the display text based on the value

##### Parameters

| Name | Type |
| :------ | :------ |
| `value?` | `unknown` |

##### Returns

`string`

***

### icon

**icon**: `Element`

The icon of this type

***

### label

**label**: `string`

The display text of this type, not including the icon

***

### onInit

`Optional` **onInit**: () => `void`

#### Type declaration

(): `void`

onInit initialization logic, which is called at the appropriate time externally to register data into the type system

##### Returns

`void`

***

### parentType

`Optional` **parentType**: `string`\[]

Supported parent types. Some types can only appear as subtypes in type selection, but not as basic types.

***

### type

**type**: `string`

type reference

#### Inherited from

[BaseTypeRegistry](/auto-docs/json-schema/interfaces/BaseTypeRegistry.md).[type](/auto-docs/json-schema/interfaces/BaseTypeRegistry.md#type)
