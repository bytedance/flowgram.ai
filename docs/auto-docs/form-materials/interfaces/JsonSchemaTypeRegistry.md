# Interface: JsonSchemaTypeRegistry\<Value>

## Type parameters

| Name | Type |
| :------ | :------ |
| `Value` | `any` |

## Hierarchy

* `JsonSchemaTypeRegistry`

  ↳ **`JsonSchemaTypeRegistry`**

## Table of contents

### Properties

* [ConstantRenderer](/auto-docs/form-materials/interfaces/JsonSchemaTypeRegistry.md#constantrenderer)
* [arrayIcon](/auto-docs/form-materials/interfaces/JsonSchemaTypeRegistry.md#arrayicon)
* [canAddField](/auto-docs/form-materials/interfaces/JsonSchemaTypeRegistry.md#canaddfield)
* [conditionRule](/auto-docs/form-materials/interfaces/JsonSchemaTypeRegistry.md#conditionrule)
* [container](/auto-docs/form-materials/interfaces/JsonSchemaTypeRegistry.md#container)
* [customComplexText](/auto-docs/form-materials/interfaces/JsonSchemaTypeRegistry.md#customcomplextext)
* [extend](/auto-docs/form-materials/interfaces/JsonSchemaTypeRegistry.md#extend)
* [getDefaultSchema](/auto-docs/form-materials/interfaces/JsonSchemaTypeRegistry.md#getdefaultschema)
* [getDefaultValue](/auto-docs/form-materials/interfaces/JsonSchemaTypeRegistry.md#getdefaultvalue)
* [getDisplayIcon](/auto-docs/form-materials/interfaces/JsonSchemaTypeRegistry.md#getdisplayicon)
* [getDisplayLabel](/auto-docs/form-materials/interfaces/JsonSchemaTypeRegistry.md#getdisplaylabel)
* [getDisplayText](/auto-docs/form-materials/interfaces/JsonSchemaTypeRegistry.md#getdisplaytext)
* [getItemType](/auto-docs/form-materials/interfaces/JsonSchemaTypeRegistry.md#getitemtype)
* [getJsonPaths](/auto-docs/form-materials/interfaces/JsonSchemaTypeRegistry.md#getjsonpaths)
* [getPropertiesParent](/auto-docs/form-materials/interfaces/JsonSchemaTypeRegistry.md#getpropertiesparent)
* [getStringValueByTypeSchema](/auto-docs/form-materials/interfaces/JsonSchemaTypeRegistry.md#getstringvaluebytypeschema)
* [getSupportedItemTypes](/auto-docs/form-materials/interfaces/JsonSchemaTypeRegistry.md#getsupporteditemtypes)
* [getTypeSchemaByStringValue](/auto-docs/form-materials/interfaces/JsonSchemaTypeRegistry.md#gettypeschemabystringvalue)
* [getTypeSchemaProperties](/auto-docs/form-materials/interfaces/JsonSchemaTypeRegistry.md#gettypeschemaproperties)
* [getValueText](/auto-docs/form-materials/interfaces/JsonSchemaTypeRegistry.md#getvaluetext)
* [icon](/auto-docs/form-materials/interfaces/JsonSchemaTypeRegistry.md#icon)
* [label](/auto-docs/form-materials/interfaces/JsonSchemaTypeRegistry.md#label)
* [onInit](/auto-docs/form-materials/interfaces/JsonSchemaTypeRegistry.md#oninit)
* [parentType](/auto-docs/form-materials/interfaces/JsonSchemaTypeRegistry.md#parenttype)
* [type](/auto-docs/form-materials/interfaces/JsonSchemaTypeRegistry.md#type)

## Properties

### ConstantRenderer

**ConstantRenderer**: `FC`<[`ConstantRendererProps`](/auto-docs/form-materials/interfaces/ConstantRendererProps.md)<`Value`>>

Render Constant Input

***

### arrayIcon

`Optional` **arrayIcon**: `Element`

The icon displayed when this type is used as an array item

#### Overrides

OriginJsonSchemaTypeRegistry.arrayIcon

***

### canAddField

**canAddField**: (`typeSchema`: [`IJsonSchema`](/auto-docs/form-materials/interfaces/IJsonSchema.md)<`string`>) => `boolean`

#### Type declaration

(`typeSchema`): `boolean`

Whether to allow adding fields, such as object

##### Parameters

| Name | Type |
| :------ | :------ |
| `typeSchema` | [`IJsonSchema`](/auto-docs/form-materials/interfaces/IJsonSchema.md)<`string`> |

##### Returns

`boolean`

#### Inherited from

OriginJsonSchemaTypeRegistry.canAddField

***

### conditionRule

`Optional` **conditionRule**: [`IConditionRuleFactory`](/auto-docs/form-materials/types/IConditionRuleFactory.md) | [`IConditionRule`](/auto-docs/form-materials/types/IConditionRule.md)

Condition Rules

***

### container

**container**: `boolean`

Whether it is a container type

#### Inherited from

OriginJsonSchemaTypeRegistry.container

***

### customComplexText

`Optional` **customComplexText**: (`typeSchema`: [`IJsonSchema`](/auto-docs/form-materials/interfaces/IJsonSchema.md)<`string`>) => `string`

#### Type declaration

(`typeSchema`): `string`

The complexText of a custom type
For example, Array<string>, can be modified

##### Parameters

| Name | Type |
| :------ | :------ |
| `typeSchema` | [`IJsonSchema`](/auto-docs/form-materials/interfaces/IJsonSchema.md)<`string`> |

##### Returns

`string`

#### Inherited from

OriginJsonSchemaTypeRegistry.customComplexText

***

### extend

`Optional` **extend**: `string`

The inherited type. If there is an inheritance, the definition of this type will use the inherited type definition,
and the new definition will override the inherited definition.

#### Inherited from

OriginJsonSchemaTypeRegistry.extend

***

### getDefaultSchema

**getDefaultSchema**: () => [`IJsonSchema`](/auto-docs/form-materials/interfaces/IJsonSchema.md)<`string`>

#### Type declaration

(): [`IJsonSchema`](/auto-docs/form-materials/interfaces/IJsonSchema.md)<`string`>

Generate default Schema

##### Returns

[`IJsonSchema`](/auto-docs/form-materials/interfaces/IJsonSchema.md)<`string`>

#### Inherited from

OriginJsonSchemaTypeRegistry.getDefaultSchema

***

### getDefaultValue

**getDefaultValue**: () => `unknown`

#### Type declaration

(): `unknown`

Get the default value

##### Returns

`unknown`

#### Inherited from

OriginJsonSchemaTypeRegistry.getDefaultValue

***

### getDisplayIcon

**getDisplayIcon**: (`typeSchema`: [`IJsonSchema`](/auto-docs/form-materials/interfaces/IJsonSchema.md)<`string`>) => `Element`

#### Type declaration

(`typeSchema`): `Element`

Get the display icon, and the composite icon of the array is also processed

##### Parameters

| Name | Type |
| :------ | :------ |
| `typeSchema` | [`IJsonSchema`](/auto-docs/form-materials/interfaces/IJsonSchema.md)<`string`> |

##### Returns

`Element`

#### Inherited from

OriginJsonSchemaTypeRegistry.getDisplayIcon

***

### getDisplayLabel

**getDisplayLabel**: (`typeSchema`: [`IJsonSchema`](/auto-docs/form-materials/interfaces/IJsonSchema.md)<`string`>) => `Element`

#### Type declaration

(`typeSchema`): `Element`

Get the display label

##### Parameters

| Name | Type |
| :------ | :------ |
| `typeSchema` | [`IJsonSchema`](/auto-docs/form-materials/interfaces/IJsonSchema.md)<`string`> |

##### Returns

`Element`

#### Inherited from

OriginJsonSchemaTypeRegistry.getDisplayLabel

***

### getDisplayText

**getDisplayText**: (`typeSchema`: [`IJsonSchema`](/auto-docs/form-materials/interfaces/IJsonSchema.md)<`string`>) => `undefined` | `string`

#### Type declaration

(`typeSchema`): `undefined` | `string`

Get the display text

##### Parameters

| Name | Type |
| :------ | :------ |
| `typeSchema` | [`IJsonSchema`](/auto-docs/form-materials/interfaces/IJsonSchema.md)<`string`> |

##### Returns

`undefined` | `string`

#### Inherited from

OriginJsonSchemaTypeRegistry.getDisplayText

***

### getItemType

`Optional` **getItemType**: (`typeSchema`: [`IJsonSchema`](/auto-docs/form-materials/interfaces/IJsonSchema.md)<`string`>) => `undefined` | [`IJsonSchema`](/auto-docs/form-materials/interfaces/IJsonSchema.md)<`string`>

#### Type declaration

(`typeSchema`): `undefined` | [`IJsonSchema`](/auto-docs/form-materials/interfaces/IJsonSchema.md)<`string`>

Get the sub-type

##### Parameters

| Name | Type |
| :------ | :------ |
| `typeSchema` | [`IJsonSchema`](/auto-docs/form-materials/interfaces/IJsonSchema.md)<`string`> |

##### Returns

`undefined` | [`IJsonSchema`](/auto-docs/form-materials/interfaces/IJsonSchema.md)<`string`>

#### Inherited from

OriginJsonSchemaTypeRegistry.getItemType

***

### getJsonPaths

**getJsonPaths**: (`typeSchema`: [`IJsonSchema`](/auto-docs/form-materials/interfaces/IJsonSchema.md)<`string`>) => `string`\[]

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
| `typeSchema` | [`IJsonSchema`](/auto-docs/form-materials/interfaces/IJsonSchema.md)<`string`> |

##### Returns

`string`\[]

#### Inherited from

OriginJsonSchemaTypeRegistry.getJsonPaths

***

### getPropertiesParent

**getPropertiesParent**: (`typeSchema`: [`IJsonSchema`](/auto-docs/form-materials/interfaces/IJsonSchema.md)<`string`>) => `undefined` | [`IJsonSchema`](/auto-docs/form-materials/interfaces/IJsonSchema.md)<`string`>

#### Type declaration

(`typeSchema`): `undefined` | [`IJsonSchema`](/auto-docs/form-materials/interfaces/IJsonSchema.md)<`string`>

Get the parent node of the sub-field
object is itself
array<object> is items
map<object> is additionalProperties

##### Parameters

| Name | Type |
| :------ | :------ |
| `typeSchema` | [`IJsonSchema`](/auto-docs/form-materials/interfaces/IJsonSchema.md)<`string`> |

##### Returns

`undefined` | [`IJsonSchema`](/auto-docs/form-materials/interfaces/IJsonSchema.md)<`string`>

#### Inherited from

OriginJsonSchemaTypeRegistry.getPropertiesParent

***

### getStringValueByTypeSchema

`Optional` **getStringValueByTypeSchema**: (`optionValue`: [`IJsonSchema`](/auto-docs/form-materials/interfaces/IJsonSchema.md)<`string`>) => `undefined` | `string`

#### Type declaration

(`optionValue`): `undefined` | `string`

Get the string value, for example
{ type: "array", items: { type: "string" } }
The value is "array-string"

The use case is that in some UI components, a string value needs to be generated

##### Parameters

| Name | Type |
| :------ | :------ |
| `optionValue` | [`IJsonSchema`](/auto-docs/form-materials/interfaces/IJsonSchema.md)<`string`> |

##### Returns

`undefined` | `string`

#### Inherited from

OriginJsonSchemaTypeRegistry.getStringValueByTypeSchema

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

#### Inherited from

OriginJsonSchemaTypeRegistry.getSupportedItemTypes

***

### getTypeSchemaByStringValue

`Optional` **getTypeSchemaByStringValue**: (`type`: `string`) => [`IJsonSchema`](/auto-docs/form-materials/interfaces/IJsonSchema.md)<`string`>

#### Type declaration

(`type`): [`IJsonSchema`](/auto-docs/form-materials/interfaces/IJsonSchema.md)<`string`>

Restore the string value to typeSchema
"array-string" is restored to
{ type: "array", items: { type: "string" } }

##### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |

##### Returns

[`IJsonSchema`](/auto-docs/form-materials/interfaces/IJsonSchema.md)<`string`>

#### Inherited from

OriginJsonSchemaTypeRegistry.getTypeSchemaByStringValue

***

### getTypeSchemaProperties

**getTypeSchemaProperties**: (`typeSchema`: [`IJsonSchema`](/auto-docs/form-materials/interfaces/IJsonSchema.md)<`string`>) => `undefined` | `Record`<`string`, [`IJsonSchema`](/auto-docs/form-materials/interfaces/IJsonSchema.md)<`string`>>

#### Type declaration

(`typeSchema`): `undefined` | `Record`<`string`, [`IJsonSchema`](/auto-docs/form-materials/interfaces/IJsonSchema.md)<`string`>>

Get sub-properties

##### Parameters

| Name | Type |
| :------ | :------ |
| `typeSchema` | [`IJsonSchema`](/auto-docs/form-materials/interfaces/IJsonSchema.md)<`string`> |

##### Returns

`undefined` | `Record`<`string`, [`IJsonSchema`](/auto-docs/form-materials/interfaces/IJsonSchema.md)<`string`>>

#### Inherited from

OriginJsonSchemaTypeRegistry.getTypeSchemaProperties

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

#### Inherited from

OriginJsonSchemaTypeRegistry.getValueText

***

### icon

**icon**: `Element`

The icon of this type

#### Inherited from

OriginJsonSchemaTypeRegistry.icon

***

### label

**label**: `string`

The display text of this type, not including the icon

#### Inherited from

OriginJsonSchemaTypeRegistry.label

***

### onInit

`Optional` **onInit**: () => `void`

#### Type declaration

(): `void`

onInit initialization logic, which is called at the appropriate time externally to register data into the type system

##### Returns

`void`

#### Inherited from

OriginJsonSchemaTypeRegistry.onInit

***

### parentType

`Optional` **parentType**: `string`\[]

Supported parent types. Some types can only appear as subtypes in type selection, but not as basic types.

#### Inherited from

OriginJsonSchemaTypeRegistry.parentType

***

### type

**type**: `string`

type reference

#### Inherited from

OriginJsonSchemaTypeRegistry.type
