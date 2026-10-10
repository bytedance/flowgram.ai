# Interface: FlowNodeEntityConfig

## Hierarchy

* `EntityOpts`

  ↳ **`FlowNodeEntityConfig`**

## Table of contents

### Properties

* [datas](/auto-docs/document/interfaces/FlowNodeEntityConfig.md#datas)
* [document](/auto-docs/document/interfaces/FlowNodeEntityConfig.md#document)
* [entityManager](/auto-docs/document/interfaces/FlowNodeEntityConfig.md#entitymanager)
* [flowNodeType](/auto-docs/document/interfaces/FlowNodeEntityConfig.md#flownodetype)
* [id](/auto-docs/document/interfaces/FlowNodeEntityConfig.md#id)
* [meta](/auto-docs/document/interfaces/FlowNodeEntityConfig.md#meta)
* [originParent](/auto-docs/document/interfaces/FlowNodeEntityConfig.md#originparent)
* [savedInManager](/auto-docs/document/interfaces/FlowNodeEntityConfig.md#savedinmanager)

## Properties

### datas

`Optional` **datas**: { `data?`: `any` ; `registry`: `EntityDataRegistry`<`EntityData`<`any`, {}>>  }\[]

#### Inherited from

EntityOpts.datas

***

### document

**document**: [`FlowDocument`](/auto-docs/document/classes/FlowDocument.md)<[`FlowDocumentJSON`](/auto-docs/document/types/FlowDocumentJSON.md)>

***

### entityManager

**entityManager**: `EntityManager`

#### Inherited from

EntityOpts.entityManager

***

### flowNodeType

**flowNodeType**: [`FlowNodeType`](/auto-docs/document/types/FlowNodeType.md)

***

### id

`Optional` **id**: `string`

#### Inherited from

EntityOpts.id

***

### meta

`Optional` **meta**: [`FlowNodeMeta`](/auto-docs/document/interfaces/FlowNodeMeta.md)

***

### originParent

`Optional` **originParent**: [`FlowNodeEntity`](/auto-docs/document/classes/FlowNodeEntity-1.md)

***

### savedInManager

`Optional` **savedInManager**: `boolean`

#### Inherited from

EntityOpts.savedInManager
