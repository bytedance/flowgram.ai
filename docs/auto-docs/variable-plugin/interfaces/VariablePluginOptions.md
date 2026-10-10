# Interface: VariablePluginOptions

## Table of contents

### Properties

* [chainConfig](/auto-docs/variable-plugin/interfaces/VariablePluginOptions.md#chainconfig)
* [enable](/auto-docs/variable-plugin/interfaces/VariablePluginOptions.md#enable)
* [extendASTNodes](/auto-docs/variable-plugin/interfaces/VariablePluginOptions.md#extendastnodes)
* [layout](/auto-docs/variable-plugin/interfaces/VariablePluginOptions.md#layout)
* [layoutConfig](/auto-docs/variable-plugin/interfaces/VariablePluginOptions.md#layoutconfig)

## Properties

### chainConfig

`Optional` **chainConfig**: `VariableChainConfig`

Configuration for scope chain

***

### enable

`Optional` **enable**: `boolean`

***

### extendASTNodes

`Optional` **extendASTNodes**: ([`ASTNodeRegistry`](/auto-docs/variable-plugin/interfaces/ASTNodeRegistry.md)<`any`> | \[[`ASTNodeRegistry`](/auto-docs/variable-plugin/interfaces/ASTNodeRegistry.md)<`any`>] | \[[`ASTNodeRegistry`](/auto-docs/variable-plugin/interfaces/ASTNodeRegistry.md)<`any`>, `Injector`])\[]

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
