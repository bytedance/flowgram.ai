# Class: JsonSchemaTypeManager\<Schema, Registry>

## Type parameters

| Name | Type |
| :------ | :------ |
| `Schema` | extends `Partial`<[`IJsonSchema`](/auto-docs/json-schema/interfaces/IJsonSchema.md)> = [`IJsonSchema`](/auto-docs/json-schema/interfaces/IJsonSchema.md) |
| `Registry` | extends [`JsonSchemaTypeRegistry`](/auto-docs/json-schema/interfaces/JsonSchemaTypeRegistry.md)<`Schema`> = [`JsonSchemaTypeRegistry`](/auto-docs/json-schema/interfaces/JsonSchemaTypeRegistry.md)<`Schema`> |

## Hierarchy

* [`BaseTypeManager`](/auto-docs/json-schema/classes/BaseTypeManager.md)<`Schema`, `Registry`, [`JsonSchemaTypeManager`](/auto-docs/json-schema/classes/JsonSchemaTypeManager.md)<`Schema`, `Registry`>>

  ↳ **`JsonSchemaTypeManager`**

## Table of contents

### Constructors

* [constructor](/auto-docs/json-schema/classes/JsonSchemaTypeManager.md#constructor)

### Properties

* [onTypeRegistryChange](/auto-docs/json-schema/classes/JsonSchemaTypeManager.md#ontyperegistrychange)

### Methods

* [canAddField](/auto-docs/json-schema/classes/JsonSchemaTypeManager.md#canaddfield)
* [getAllTypeRegistries](/auto-docs/json-schema/classes/JsonSchemaTypeManager.md#getalltyperegistries)
* [getComplexText](/auto-docs/json-schema/classes/JsonSchemaTypeManager.md#getcomplextext)
* [getDefaultTypeRegistry](/auto-docs/json-schema/classes/JsonSchemaTypeManager.md#getdefaulttyperegistry)
* [getDefaultValue](/auto-docs/json-schema/classes/JsonSchemaTypeManager.md#getdefaultvalue)
* [getDisplayIcon](/auto-docs/json-schema/classes/JsonSchemaTypeManager.md#getdisplayicon)
* [getJsonPaths](/auto-docs/json-schema/classes/JsonSchemaTypeManager.md#getjsonpaths)
* [getPropertiesParent](/auto-docs/json-schema/classes/JsonSchemaTypeManager.md#getpropertiesparent)
* [getTypeByName](/auto-docs/json-schema/classes/JsonSchemaTypeManager.md#gettypebyname)
* [getTypeBySchema](/auto-docs/json-schema/classes/JsonSchemaTypeManager.md#gettypebyschema)
* [getTypeRegistriesWithParentType](/auto-docs/json-schema/classes/JsonSchemaTypeManager.md#gettyperegistrieswithparenttype)
* [getTypeSchemaDeepChildField](/auto-docs/json-schema/classes/JsonSchemaTypeManager.md#gettypeschemadeepchildfield)
* [getTypeSchemaProperties](/auto-docs/json-schema/classes/JsonSchemaTypeManager.md#gettypeschemaproperties)
* [register](/auto-docs/json-schema/classes/JsonSchemaTypeManager.md#register)
* [triggerChanges](/auto-docs/json-schema/classes/JsonSchemaTypeManager.md#triggerchanges)
* [unregister](/auto-docs/json-schema/classes/JsonSchemaTypeManager.md#unregister)

## Constructors

### constructor

**new JsonSchemaTypeManager**<`Schema`, `Registry`>()

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Schema` | extends `Partial`<[`IJsonSchema`](/auto-docs/json-schema/interfaces/IJsonSchema.md)<`string`>> = [`IJsonSchema`](/auto-docs/json-schema/interfaces/IJsonSchema.md)<`string`> |
| `Registry` | extends [`JsonSchemaTypeRegistry`](/auto-docs/json-schema/interfaces/JsonSchemaTypeRegistry.md)<`Schema`, `Registry`> = [`JsonSchemaTypeRegistry`](/auto-docs/json-schema/interfaces/JsonSchemaTypeRegistry.md)<`Schema`> |

#### Overrides

[BaseTypeManager](/auto-docs/json-schema/classes/BaseTypeManager.md).[constructor](/auto-docs/json-schema/classes/BaseTypeManager.md#constructor)

## Properties

### onTypeRegistryChange

**onTypeRegistryChange**: `Event`<`Registry`\[]>

#### Inherited from

[BaseTypeManager](/auto-docs/json-schema/classes/BaseTypeManager.md).[onTypeRegistryChange](/auto-docs/json-schema/classes/BaseTypeManager.md#ontyperegistrychange)

## Methods

### canAddField

**canAddField**(`type`): `undefined` | `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `Schema` |

#### Returns

`undefined` | `boolean`

***

### getAllTypeRegistries

**getAllTypeRegistries**(): `Registry`\[]

获取全量的 TypeRegistries

#### Returns

`Registry`\[]

#### Inherited from

[BaseTypeManager](/auto-docs/json-schema/classes/BaseTypeManager.md).[getAllTypeRegistries](/auto-docs/json-schema/classes/BaseTypeManager.md#getalltyperegistries)

***

### getComplexText

**getComplexText**(`type`): `string`

Get the plain text display string of the type schema, for example:
Array\<Array<String>>, Map\<String, Number>

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `Schema` |

#### Returns

`string`

***

### getDefaultTypeRegistry

**getDefaultTypeRegistry**(): `undefined` | `Registry`

#### Returns

`undefined` | `Registry`

#### Inherited from

[BaseTypeManager](/auto-docs/json-schema/classes/BaseTypeManager.md).[getDefaultTypeRegistry](/auto-docs/json-schema/classes/BaseTypeManager.md#getdefaulttyperegistry)

***

### getDefaultValue

**getDefaultValue**(`type`): `unknown`

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `Schema` |

#### Returns

`unknown`

***

### getDisplayIcon

**getDisplayIcon**(`type`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `Schema` |

#### Returns

`Element`

***

### getJsonPaths

**getJsonPaths**(`type`): `undefined` | `string`\[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `Schema` |

#### Returns

`undefined` | `string`\[]

***

### getPropertiesParent

**getPropertiesParent**(`type`): `undefined` | `Schema`

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `Schema` |

#### Returns

`undefined` | `Schema`

***

### getTypeByName

**getTypeByName**(`typeName`): `undefined` | `Registry`

#### Parameters

| Name | Type |
| :------ | :------ |
| `typeName` | `string` |

#### Returns

`undefined` | `Registry`

#### Inherited from

[BaseTypeManager](/auto-docs/json-schema/classes/BaseTypeManager.md).[getTypeByName](/auto-docs/json-schema/classes/BaseTypeManager.md#gettypebyname)

***

### getTypeBySchema

**getTypeBySchema**(`type`): `undefined` | `Registry`

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `Schema` |

#### Returns

`undefined` | `Registry`

#### Inherited from

[BaseTypeManager](/auto-docs/json-schema/classes/BaseTypeManager.md).[getTypeBySchema](/auto-docs/json-schema/classes/BaseTypeManager.md#gettypebyschema)

***

### getTypeRegistriesWithParentType

**getTypeRegistriesWithParentType**(`parentType?`): `Registry`\[]

Get TypeRegistries based on the current parentType

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `parentType` | `string` | `''` |

#### Returns

`Registry`\[]

***

### getTypeSchemaDeepChildField

**getTypeSchemaDeepChildField**(`type`): `Schema`

Get the deepest child field of a field
Array\<Array<String>> -> String

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `Schema` |

#### Returns

`Schema`

***

### getTypeSchemaProperties

**getTypeSchemaProperties**(`type`): `undefined` | `Record`<`string`, `Schema`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `Schema` |

#### Returns

`undefined` | `Record`<`string`, `Schema`>

***

### register

**register**(`originRegistry`): `void`

注册 TypeRegistry

#### Parameters

| Name | Type |
| :------ | :------ |
| `originRegistry` | `Partial`<`Registry`> | [`TypeRegistryCreator`](/auto-docs/json-schema/types/TypeRegistryCreator.md)<`Schema`, `Registry`, [`JsonSchemaTypeManager`](/auto-docs/json-schema/classes/JsonSchemaTypeManager.md)<`Schema`, `Registry`>> |

#### Returns

`void`

#### Inherited from

[BaseTypeManager](/auto-docs/json-schema/classes/BaseTypeManager.md).[register](/auto-docs/json-schema/classes/BaseTypeManager.md#register)

***

### triggerChanges

**triggerChanges**(): `void`

#### Returns

`void`

#### Inherited from

[BaseTypeManager](/auto-docs/json-schema/classes/BaseTypeManager.md).[triggerChanges](/auto-docs/json-schema/classes/BaseTypeManager.md#triggerchanges)

***

### unregister

**unregister**(`type`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |

#### Returns

`void`

#### Inherited from

[BaseTypeManager](/auto-docs/json-schema/classes/BaseTypeManager.md).[unregister](/auto-docs/json-schema/classes/BaseTypeManager.md#unregister)
