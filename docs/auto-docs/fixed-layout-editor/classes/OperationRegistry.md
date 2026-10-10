# Class: OperationRegistry

Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
SPDX-License-Identifier: MIT

## Table of contents

### Constructors

* [constructor](/auto-docs/fixed-layout-editor/classes/OperationRegistry.md#constructor)

### Methods

* [getOperationMeta](/auto-docs/fixed-layout-editor/classes/OperationRegistry.md#getoperationmeta)
* [registerOperationMeta](/auto-docs/fixed-layout-editor/classes/OperationRegistry.md#registeroperationmeta)

## Constructors

### constructor

**new OperationRegistry**()

## Methods

### getOperationMeta

**getOperationMeta**(`type`): `undefined` | [`OperationMeta`](/auto-docs/fixed-layout-editor/interfaces/OperationMeta.md)<`any`, `any`, `any`>

获取操作的元数据

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `string` | 操作类型 |

#### Returns

`undefined` | [`OperationMeta`](/auto-docs/fixed-layout-editor/interfaces/OperationMeta.md)<`any`, `any`, `any`>

操作的元数据

***

### registerOperationMeta

**registerOperationMeta**(`operationMeta`): [`Disposable`](/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md)

注册操作的元数据

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `operationMeta` | [`OperationMeta`](/auto-docs/fixed-layout-editor/interfaces/OperationMeta.md)<`any`, `any`, `any`> | 操作的元数据 |

#### Returns

[`Disposable`](/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md)

销毁函数
