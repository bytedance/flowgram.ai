# Interface: FlowNodeEntityConfig

Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
SPDX-License-Identifier: MIT

## Hierarchy

* [`EntityOpts`](/en/auto-docs/free-layout-editor/interfaces/EntityOpts.md)

  ↳ **`FlowNodeEntityConfig`**

## Table of contents

### Properties

* [datas](/en/auto-docs/free-layout-editor/interfaces/FlowNodeEntityConfig.md#datas)
* [document](/en/auto-docs/free-layout-editor/interfaces/FlowNodeEntityConfig.md#document)
* [entityManager](/en/auto-docs/free-layout-editor/interfaces/FlowNodeEntityConfig.md#entitymanager)
* [flowNodeType](/en/auto-docs/free-layout-editor/interfaces/FlowNodeEntityConfig.md#flownodetype)
* [id](/en/auto-docs/free-layout-editor/interfaces/FlowNodeEntityConfig.md#id)
* [meta](/en/auto-docs/free-layout-editor/interfaces/FlowNodeEntityConfig.md#meta)
* [originParent](/en/auto-docs/free-layout-editor/interfaces/FlowNodeEntityConfig.md#originparent)
* [savedInManager](/en/auto-docs/free-layout-editor/interfaces/FlowNodeEntityConfig.md#savedinmanager)

## Properties

### datas

`Optional` **datas**: { `data?`: `any` ; `registry`: [`EntityDataRegistry`](/en/auto-docs/free-layout-editor/interfaces/EntityDataRegistry.md)<[`EntityData`](/en/auto-docs/free-layout-editor/classes/EntityData.md)<`any`, {}>>  }\[]

#### Inherited from

[EntityOpts](/en/auto-docs/free-layout-editor/interfaces/EntityOpts.md).[datas](/en/auto-docs/free-layout-editor/interfaces/EntityOpts.md#datas)

***

### document

**document**: [`FlowDocument`](/en/auto-docs/free-layout-editor/classes/FlowDocument.md)<[`FlowDocumentJSON`](/en/auto-docs/free-layout-editor/types/FlowDocumentJSON.md)>

***

### entityManager

**entityManager**: [`EntityManager`](/en/auto-docs/free-layout-editor/classes/EntityManager.md)

#### Inherited from

[EntityOpts](/en/auto-docs/free-layout-editor/interfaces/EntityOpts.md).[entityManager](/en/auto-docs/free-layout-editor/interfaces/EntityOpts.md#entitymanager)

***

### flowNodeType

**flowNodeType**: [`FlowNodeType`](/en/auto-docs/free-layout-editor/types/FlowNodeType.md)

***

### id

`Optional` **id**: `string`

#### Inherited from

[EntityOpts](/en/auto-docs/free-layout-editor/interfaces/EntityOpts.md).[id](/en/auto-docs/free-layout-editor/interfaces/EntityOpts.md#id)

***

### meta

`Optional` **meta**: [`FlowNodeMeta`](/en/auto-docs/free-layout-editor/interfaces/FlowNodeMeta.md)

***

### originParent

`Optional` **originParent**: [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)

***

### savedInManager

`Optional` **savedInManager**: `boolean`

#### Inherited from

[EntityOpts](/en/auto-docs/free-layout-editor/interfaces/EntityOpts.md).[savedInManager](/en/auto-docs/free-layout-editor/interfaces/EntityOpts.md#savedinmanager)
