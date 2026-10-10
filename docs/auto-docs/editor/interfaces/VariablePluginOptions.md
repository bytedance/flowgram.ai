# Interface: VariablePluginOptions

## Table of contents

### Properties

* [chainConfig](/auto-docs/editor/interfaces/VariablePluginOptions.md#chainconfig)
* [enable](/auto-docs/editor/interfaces/VariablePluginOptions.md#enable)
* [extendASTNodes](/auto-docs/editor/interfaces/VariablePluginOptions.md#extendastnodes)
* [layout](/auto-docs/editor/interfaces/VariablePluginOptions.md#layout)
* [layoutConfig](/auto-docs/editor/interfaces/VariablePluginOptions.md#layoutconfig)

## Properties

### chainConfig

`Optional` **chainConfig**: `VariableChainConfig`

Configuration for scope chain

***

### enable

`Optional` **enable**: `boolean`

***

### extendASTNodes

`Optional` **extendASTNodes**: ([`ASTNodeRegistry`](/auto-docs/editor/interfaces/ASTNodeRegistry.md)<`any`> | \[[`ASTNodeRegistry`](/auto-docs/editor/interfaces/ASTNodeRegistry.md)<`any`>] | \[[`ASTNodeRegistry`](/auto-docs/editor/interfaces/ASTNodeRegistry.md)<`any`>, `Injector`])\[]

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
