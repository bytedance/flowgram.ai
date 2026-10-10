# Interface: FlowNodeEntityConfig

## Hierarchy

* `EntityOpts`

  ↳ **`FlowNodeEntityConfig`**

## Table of contents

### Properties

* [datas](/en/auto-docs/document/interfaces/FlowNodeEntityConfig.md#datas)
* [document](/en/auto-docs/document/interfaces/FlowNodeEntityConfig.md#document)
* [entityManager](/en/auto-docs/document/interfaces/FlowNodeEntityConfig.md#entitymanager)
* [flowNodeType](/en/auto-docs/document/interfaces/FlowNodeEntityConfig.md#flownodetype)
* [id](/en/auto-docs/document/interfaces/FlowNodeEntityConfig.md#id)
* [meta](/en/auto-docs/document/interfaces/FlowNodeEntityConfig.md#meta)
* [originParent](/en/auto-docs/document/interfaces/FlowNodeEntityConfig.md#originparent)
* [savedInManager](/en/auto-docs/document/interfaces/FlowNodeEntityConfig.md#savedinmanager)

## Properties

### datas

`Optional` **datas**: { `data?`: `any` ; `registry`: `EntityDataRegistry`<`EntityData`<`any`, {}>>  }\[]

#### Inherited from

EntityOpts.datas

***

### document

**document**: [`FlowDocument`](/en/auto-docs/document/classes/FlowDocument.md)<[`FlowDocumentJSON`](/en/auto-docs/document/types/FlowDocumentJSON.md)>

***

### entityManager

**entityManager**: `EntityManager`

#### Inherited from

EntityOpts.entityManager

***

### flowNodeType

**flowNodeType**: [`FlowNodeType`](/en/auto-docs/document/types/FlowNodeType.md)

***

### id

`Optional` **id**: `string`

#### Inherited from

EntityOpts.id

***

### meta

`Optional` **meta**: [`FlowNodeMeta`](/en/auto-docs/document/interfaces/FlowNodeMeta.md)

***

### originParent

`Optional` **originParent**: [`FlowNodeEntity`](/en/auto-docs/document/classes/FlowNodeEntity-1.md)

***

### savedInManager

`Optional` **savedInManager**: `boolean`

#### Inherited from

EntityOpts.savedInManager
