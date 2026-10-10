# Interface: MaterialsPluginOptions

## Table of contents

### Properties

* [components](/en/auto-docs/materials-plugin/interfaces/MaterialsPluginOptions.md#components)
* [renderDefaultNode](/en/auto-docs/materials-plugin/interfaces/MaterialsPluginOptions.md#renderdefaultnode)
* [renderNodes](/en/auto-docs/materials-plugin/interfaces/MaterialsPluginOptions.md#rendernodes)
* [renderTexts](/en/auto-docs/materials-plugin/interfaces/MaterialsPluginOptions.md#rendertexts)

## Properties

### components

`Optional` **components**: `Record`<`string`, [`MaterialReactComponent`](/en/auto-docs/materials-plugin/types/MaterialReactComponent.md)<`any`>>

注册特定的 UI 组件

***

### renderDefaultNode

`Optional` **renderDefaultNode**: [`MaterialReactComponent`](/en/auto-docs/materials-plugin/types/MaterialReactComponent.md)<`any`>

默认节点渲染

***

### renderNodes

`Optional` **renderNodes**: `Record`<`string`, [`MaterialReactComponent`](/en/auto-docs/materials-plugin/types/MaterialReactComponent.md)<`any`>>

注册特定的节点渲染组件

***

### renderTexts

`Optional` **renderTexts**: `Record`<`string`, `string`>

注册渲染的文字
