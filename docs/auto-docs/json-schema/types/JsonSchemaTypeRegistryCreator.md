# Type alias: JsonSchemaTypeRegistryCreator\<Schema, Registry, Manager>

**JsonSchemaTypeRegistryCreator**<`Schema`, `Registry`, `Manager`>: [`TypeRegistryCreator`](/auto-docs/json-schema/types/TypeRegistryCreator.md)<`Schema`, `Registry`, `Manager`>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Schema` | extends `Partial`<[`IJsonSchema`](/auto-docs/json-schema/interfaces/IJsonSchema.md)> = [`IJsonSchema`](/auto-docs/json-schema/interfaces/IJsonSchema.md) |
| `Registry` | extends [`JsonSchemaTypeRegistry`](/auto-docs/json-schema/interfaces/JsonSchemaTypeRegistry.md)<`Schema`> = [`JsonSchemaTypeRegistry`](/auto-docs/json-schema/interfaces/JsonSchemaTypeRegistry.md)<`Schema`> |
| `Manager` | extends [`JsonSchemaTypeManager`](/auto-docs/json-schema/classes/JsonSchemaTypeManager.md)<`Schema`, `Registry`> = [`JsonSchemaTypeManager`](/auto-docs/json-schema/classes/JsonSchemaTypeManager.md)<`Schema`, `Registry`> |
