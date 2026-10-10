# Class: OperationRegistry

Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
SPDX-License-Identifier: MIT

## Table of contents

### Constructors

* [constructor](/en/auto-docs/free-history-plugin/classes/OperationRegistry.md#constructor)

### Methods

* [getOperationMeta](/en/auto-docs/free-history-plugin/classes/OperationRegistry.md#getoperationmeta)
* [registerOperationMeta](/en/auto-docs/free-history-plugin/classes/OperationRegistry.md#registeroperationmeta)

## Constructors

### constructor

**new OperationRegistry**()

## Methods

### getOperationMeta

**getOperationMeta**(`type`): `undefined` | [`OperationMeta`](/en/auto-docs/free-history-plugin/interfaces/OperationMeta.md)<`any`, `any`, `any`>

获取操作的元数据

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `string` | 操作类型 |

#### Returns

`undefined` | [`OperationMeta`](/en/auto-docs/free-history-plugin/interfaces/OperationMeta.md)<`any`, `any`, `any`>

操作的元数据

***

### registerOperationMeta

**registerOperationMeta**(`operationMeta`): `Disposable`

注册操作的元数据

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `operationMeta` | [`OperationMeta`](/en/auto-docs/free-history-plugin/interfaces/OperationMeta.md)<`any`, `any`, `any`> | 操作的元数据 |

#### Returns

`Disposable`

销毁函数
