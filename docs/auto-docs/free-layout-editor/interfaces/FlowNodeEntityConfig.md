# Interface: FlowNodeEntityConfig

Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
SPDX-License-Identifier: MIT

## Hierarchy

* [`EntityOpts`](/auto-docs/free-layout-editor/interfaces/EntityOpts.md)

  ↳ **`FlowNodeEntityConfig`**

## Table of contents

### Properties

* [datas](/auto-docs/free-layout-editor/interfaces/FlowNodeEntityConfig.md#datas)
* [document](/auto-docs/free-layout-editor/interfaces/FlowNodeEntityConfig.md#document)
* [entityManager](/auto-docs/free-layout-editor/interfaces/FlowNodeEntityConfig.md#entitymanager)
* [flowNodeType](/auto-docs/free-layout-editor/interfaces/FlowNodeEntityConfig.md#flownodetype)
* [id](/auto-docs/free-layout-editor/interfaces/FlowNodeEntityConfig.md#id)
* [meta](/auto-docs/free-layout-editor/interfaces/FlowNodeEntityConfig.md#meta)
* [originParent](/auto-docs/free-layout-editor/interfaces/FlowNodeEntityConfig.md#originparent)
* [savedInManager](/auto-docs/free-layout-editor/interfaces/FlowNodeEntityConfig.md#savedinmanager)

## Properties

### datas

`Optional` **datas**: { `data?`: `any` ; `registry`: [`EntityDataRegistry`](/auto-docs/free-layout-editor/interfaces/EntityDataRegistry.md)<[`EntityData`](/auto-docs/free-layout-editor/classes/EntityData.md)<`any`, {}>>  }\[]

#### Inherited from

[EntityOpts](/auto-docs/free-layout-editor/interfaces/EntityOpts.md).[datas](/auto-docs/free-layout-editor/interfaces/EntityOpts.md#datas)

***

### document

**document**: [`FlowDocument`](/auto-docs/free-layout-editor/classes/FlowDocument.md)<[`FlowDocumentJSON`](/auto-docs/free-layout-editor/types/FlowDocumentJSON.md)>

***

### entityManager

**entityManager**: [`EntityManager`](/auto-docs/free-layout-editor/classes/EntityManager.md)

#### Inherited from

[EntityOpts](/auto-docs/free-layout-editor/interfaces/EntityOpts.md).[entityManager](/auto-docs/free-layout-editor/interfaces/EntityOpts.md#entitymanager)

***

### flowNodeType

**flowNodeType**: [`FlowNodeType`](/auto-docs/free-layout-editor/types/FlowNodeType.md)

***

### id

`Optional` **id**: `string`

#### Inherited from

[EntityOpts](/auto-docs/free-layout-editor/interfaces/EntityOpts.md).[id](/auto-docs/free-layout-editor/interfaces/EntityOpts.md#id)

***

### meta

`Optional` **meta**: [`FlowNodeMeta`](/auto-docs/free-layout-editor/interfaces/FlowNodeMeta.md)

***

### originParent

`Optional` **originParent**: [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)

***

### savedInManager

`Optional` **savedInManager**: `boolean`

#### Inherited from

[EntityOpts](/auto-docs/free-layout-editor/interfaces/EntityOpts.md).[savedInManager](/auto-docs/free-layout-editor/interfaces/EntityOpts.md#savedinmanager)
