# Class: JsonSchemaTypeManager\<Schema, Registry>

## Type parameters

| Name | Type |
| :------ | :------ |
| `Schema` | extends `Partial`<[`IJsonSchema`](/en/auto-docs/json-schema/interfaces/IJsonSchema.md)> = [`IJsonSchema`](/en/auto-docs/json-schema/interfaces/IJsonSchema.md) |
| `Registry` | extends [`JsonSchemaTypeRegistry`](/en/auto-docs/json-schema/interfaces/JsonSchemaTypeRegistry.md)<`Schema`> = [`JsonSchemaTypeRegistry`](/en/auto-docs/json-schema/interfaces/JsonSchemaTypeRegistry.md)<`Schema`> |

## Hierarchy

* [`BaseTypeManager`](/en/auto-docs/json-schema/classes/BaseTypeManager.md)<`Schema`, `Registry`, [`JsonSchemaTypeManager`](/en/auto-docs/json-schema/classes/JsonSchemaTypeManager.md)<`Schema`, `Registry`>>

  ↳ **`JsonSchemaTypeManager`**

## Table of contents

### Constructors

* [constructor](/en/auto-docs/json-schema/classes/JsonSchemaTypeManager.md#constructor)

### Properties

* [onTypeRegistryChange](/en/auto-docs/json-schema/classes/JsonSchemaTypeManager.md#ontyperegistrychange)

### Methods

* [canAddField](/en/auto-docs/json-schema/classes/JsonSchemaTypeManager.md#canaddfield)
* [getAllTypeRegistries](/en/auto-docs/json-schema/classes/JsonSchemaTypeManager.md#getalltyperegistries)
* [getComplexText](/en/auto-docs/json-schema/classes/JsonSchemaTypeManager.md#getcomplextext)
* [getDefaultTypeRegistry](/en/auto-docs/json-schema/classes/JsonSchemaTypeManager.md#getdefaulttyperegistry)
* [getDefaultValue](/en/auto-docs/json-schema/classes/JsonSchemaTypeManager.md#getdefaultvalue)
* [getDisplayIcon](/en/auto-docs/json-schema/classes/JsonSchemaTypeManager.md#getdisplayicon)
* [getJsonPaths](/en/auto-docs/json-schema/classes/JsonSchemaTypeManager.md#getjsonpaths)
* [getPropertiesParent](/en/auto-docs/json-schema/classes/JsonSchemaTypeManager.md#getpropertiesparent)
* [getTypeByName](/en/auto-docs/json-schema/classes/JsonSchemaTypeManager.md#gettypebyname)
* [getTypeBySchema](/en/auto-docs/json-schema/classes/JsonSchemaTypeManager.md#gettypebyschema)
* [getTypeRegistriesWithParentType](/en/auto-docs/json-schema/classes/JsonSchemaTypeManager.md#gettyperegistrieswithparenttype)
* [getTypeSchemaDeepChildField](/en/auto-docs/json-schema/classes/JsonSchemaTypeManager.md#gettypeschemadeepchildfield)
* [getTypeSchemaProperties](/en/auto-docs/json-schema/classes/JsonSchemaTypeManager.md#gettypeschemaproperties)
* [register](/en/auto-docs/json-schema/classes/JsonSchemaTypeManager.md#register)
* [triggerChanges](/en/auto-docs/json-schema/classes/JsonSchemaTypeManager.md#triggerchanges)
* [unregister](/en/auto-docs/json-schema/classes/JsonSchemaTypeManager.md#unregister)

## Constructors

### constructor

**new JsonSchemaTypeManager**<`Schema`, `Registry`>()

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Schema` | extends `Partial`<[`IJsonSchema`](/en/auto-docs/json-schema/interfaces/IJsonSchema.md)<`string`>> = [`IJsonSchema`](/en/auto-docs/json-schema/interfaces/IJsonSchema.md)<`string`> |
| `Registry` | extends [`JsonSchemaTypeRegistry`](/en/auto-docs/json-schema/interfaces/JsonSchemaTypeRegistry.md)<`Schema`, `Registry`> = [`JsonSchemaTypeRegistry`](/en/auto-docs/json-schema/interfaces/JsonSchemaTypeRegistry.md)<`Schema`> |

#### Overrides

[BaseTypeManager](/en/auto-docs/json-schema/classes/BaseTypeManager.md).[constructor](/en/auto-docs/json-schema/classes/BaseTypeManager.md#constructor)

## Properties

### onTypeRegistryChange

**onTypeRegistryChange**: `Event`<`Registry`\[]>

#### Inherited from

[BaseTypeManager](/en/auto-docs/json-schema/classes/BaseTypeManager.md).[onTypeRegistryChange](/en/auto-docs/json-schema/classes/BaseTypeManager.md#ontyperegistrychange)

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

[BaseTypeManager](/en/auto-docs/json-schema/classes/BaseTypeManager.md).[getAllTypeRegistries](/en/auto-docs/json-schema/classes/BaseTypeManager.md#getalltyperegistries)

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

[BaseTypeManager](/en/auto-docs/json-schema/classes/BaseTypeManager.md).[getDefaultTypeRegistry](/en/auto-docs/json-schema/classes/BaseTypeManager.md#getdefaulttyperegistry)

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

[BaseTypeManager](/en/auto-docs/json-schema/classes/BaseTypeManager.md).[getTypeByName](/en/auto-docs/json-schema/classes/BaseTypeManager.md#gettypebyname)

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

[BaseTypeManager](/en/auto-docs/json-schema/classes/BaseTypeManager.md).[getTypeBySchema](/en/auto-docs/json-schema/classes/BaseTypeManager.md#gettypebyschema)

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
| `originRegistry` | `Partial`<`Registry`> | [`TypeRegistryCreator`](/en/auto-docs/json-schema/types/TypeRegistryCreator.md)<`Schema`, `Registry`, [`JsonSchemaTypeManager`](/en/auto-docs/json-schema/classes/JsonSchemaTypeManager.md)<`Schema`, `Registry`>> |

#### Returns

`void`

#### Inherited from

[BaseTypeManager](/en/auto-docs/json-schema/classes/BaseTypeManager.md).[register](/en/auto-docs/json-schema/classes/BaseTypeManager.md#register)

***

### triggerChanges

**triggerChanges**(): `void`

#### Returns

`void`

#### Inherited from

[BaseTypeManager](/en/auto-docs/json-schema/classes/BaseTypeManager.md).[triggerChanges](/en/auto-docs/json-schema/classes/BaseTypeManager.md#triggerchanges)

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

[BaseTypeManager](/en/auto-docs/json-schema/classes/BaseTypeManager.md).[unregister](/en/auto-docs/json-schema/classes/BaseTypeManager.md#unregister)
