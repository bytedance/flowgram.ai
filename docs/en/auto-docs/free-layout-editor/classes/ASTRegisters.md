# Class: ASTRegisters

Register the AST node to the engine.

## Table of contents

### Constructors

* [constructor](/en/auto-docs/free-layout-editor/classes/ASTRegisters.md#constructor)

### Methods

* [createAST](/en/auto-docs/free-layout-editor/classes/ASTRegisters.md#createast)
* [getASTRegistryByKind](/en/auto-docs/free-layout-editor/classes/ASTRegisters.md#getastregistrybykind)
* [registerAST](/en/auto-docs/free-layout-editor/classes/ASTRegisters.md#registerast)

## Constructors

### constructor

**new ASTRegisters**()

Core AST node registration.

## Methods

### createAST

**createAST**<`ReturnNode`>(`json`, `«destructured»`): `ReturnNode`

Creates an AST node.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `ReturnNode` | extends [`ASTNode`](/en/auto-docs/free-layout-editor/classes/ASTNode.md)<`any`, `ReturnNode`> = [`ASTNode`](/en/auto-docs/free-layout-editor/classes/ASTNode.md)<`any`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `json` | [`ASTNodeJSON`](/en/auto-docs/free-layout-editor/interfaces/ASTNodeJSON.md) |
| `«destructured»` | [`CreateASTParams`](/en/auto-docs/free-layout-editor/interfaces/CreateASTParams.md) |

#### Returns

`ReturnNode`

***

### getASTRegistryByKind

**getASTRegistryByKind**(`kind`): `undefined` | [`ASTNodeRegistry`](/en/auto-docs/free-layout-editor/interfaces/ASTNodeRegistry.md)<`any`>

Gets the node Registry by AST node type.

#### Parameters

| Name | Type |
| :------ | :------ |
| `kind` | `string` |

#### Returns

`undefined` | [`ASTNodeRegistry`](/en/auto-docs/free-layout-editor/interfaces/ASTNodeRegistry.md)<`any`>

***

### registerAST

**registerAST**(`ASTNode`, `injector?`): `void`

Registers an AST node.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ASTNode` | [`ASTNodeRegistry`](/en/auto-docs/free-layout-editor/interfaces/ASTNodeRegistry.md)<`any`> |  |
| `injector?` | `DataInjector` | **`Deprecated`** Please use `@injectToAst(XXXService) declare xxxService: XXXService` to achieve external dependency injection. |

#### Returns

`void`
