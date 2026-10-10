# Function: schemaToAST

[JsonSchemaUtils](/en/auto-docs/form-antd-materials/modules/JsonSchemaUtils.md).schemaToAST

**schemaToAST**(`jsonSchema`): `ASTNodeJSON` | `undefined`

Converts a JSON schema to an Abstract Syntax Tree (AST) representation.
This function recursively processes the JSON schema and creates corresponding AST nodes.

For more information on JSON Schema, refer to the official documentation:
https://json-schema.org/

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `jsonSchema` | [`IJsonSchema`](/en/auto-docs/form-antd-materials/interfaces/IJsonSchema.md)<`string`> | The JSON schema to convert. |

#### Returns

`ASTNodeJSON` | `undefined`

An AST node representing the JSON schema, or undefined if the schema type is not recognized.
