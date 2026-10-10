# Interface: VariablePluginOptions

## Table of contents

### Properties

* [chainConfig](/en/auto-docs/free-layout-editor/interfaces/VariablePluginOptions.md#chainconfig)
* [enable](/en/auto-docs/free-layout-editor/interfaces/VariablePluginOptions.md#enable)
* [extendASTNodes](/en/auto-docs/free-layout-editor/interfaces/VariablePluginOptions.md#extendastnodes)
* [layout](/en/auto-docs/free-layout-editor/interfaces/VariablePluginOptions.md#layout)
* [layoutConfig](/en/auto-docs/free-layout-editor/interfaces/VariablePluginOptions.md#layoutconfig)

## Properties

### chainConfig

`Optional` **chainConfig**: `VariableChainConfig`

Configuration for scope chain

***

### enable

`Optional` **enable**: `boolean`

***

### extendASTNodes

`Optional` **extendASTNodes**: ([`ASTNodeRegistry`](/en/auto-docs/free-layout-editor/interfaces/ASTNodeRegistry.md)<`any`> | \[[`ASTNodeRegistry`](/en/auto-docs/free-layout-editor/interfaces/ASTNodeRegistry.md)<`any`>] | \[[`ASTNodeRegistry`](/en/auto-docs/free-layout-editor/interfaces/ASTNodeRegistry.md)<`any`>, `Injector`])\[]

Custom Extends ASTNode

***

### layout

`Optional` **layout**: `"fixed"` | `"free"`

Layout method

***

### layoutConfig

`Optional` **layoutConfig**: `VariableChainConfig`

**`Deprecated`**

use chainConfig instead
