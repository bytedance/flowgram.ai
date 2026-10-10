# Class: FlowDocumentConfig

用于文档扩展配置

## Table of contents

### Constructors

* [constructor](/en/auto-docs/fixed-layout-editor/classes/FlowDocumentConfig.md#constructor)

### Properties

* [onChange](/en/auto-docs/fixed-layout-editor/classes/FlowDocumentConfig.md#onchange)

### Methods

* [get](/en/auto-docs/fixed-layout-editor/classes/FlowDocumentConfig.md#get)
* [registerConfigs](/en/auto-docs/fixed-layout-editor/classes/FlowDocumentConfig.md#registerconfigs)
* [set](/en/auto-docs/fixed-layout-editor/classes/FlowDocumentConfig.md#set)

## Constructors

### constructor

**new FlowDocumentConfig**(`_data?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `_data?` | `Record`<`string`, `any`> |

## Properties

### onChange

`Readonly` **onChange**: [`Event`](/en/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<`string`>

## Methods

### get

**get**(`key`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`any`

***

### registerConfigs

**registerConfigs**(`config`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `Record`<`string`, `any`> |

#### Returns

`void`

***

### set

**set**(`key`, `value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `value` | `any` |

#### Returns

`void`
