# Type alias: JsonSchemaTypeRegistryCreator\<Schema, Registry, Manager>

**JsonSchemaTypeRegistryCreator**<`Schema`, `Registry`, `Manager`>: [`TypeRegistryCreator`](/en/auto-docs/json-schema/types/TypeRegistryCreator.md)<`Schema`, `Registry`, `Manager`>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Schema` | extends `Partial`<[`IJsonSchema`](/en/auto-docs/json-schema/interfaces/IJsonSchema.md)> = [`IJsonSchema`](/en/auto-docs/json-schema/interfaces/IJsonSchema.md) |
| `Registry` | extends [`JsonSchemaTypeRegistry`](/en/auto-docs/json-schema/interfaces/JsonSchemaTypeRegistry.md)<`Schema`> = [`JsonSchemaTypeRegistry`](/en/auto-docs/json-schema/interfaces/JsonSchemaTypeRegistry.md)<`Schema`> |
| `Manager` | extends [`JsonSchemaTypeManager`](/en/auto-docs/json-schema/classes/JsonSchemaTypeManager.md)<`Schema`, `Registry`> = [`JsonSchemaTypeManager`](/en/auto-docs/json-schema/classes/JsonSchemaTypeManager.md)<`Schema`, `Registry`> |
