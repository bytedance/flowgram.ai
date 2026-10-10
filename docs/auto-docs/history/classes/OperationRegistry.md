# Class: OperationRegistry

## Table of contents

### Constructors

* [constructor](/auto-docs/history/classes/OperationRegistry.md#constructor)

### Methods

* [getOperationMeta](/auto-docs/history/classes/OperationRegistry.md#getoperationmeta)
* [registerOperationMeta](/auto-docs/history/classes/OperationRegistry.md#registeroperationmeta)

## Constructors

### constructor

**new OperationRegistry**()

## Methods

### getOperationMeta

**getOperationMeta**(`type`): `undefined` | [`OperationMeta`](/auto-docs/history/interfaces/OperationMeta.md)<`any`, `any`, `any`>

获取操作的元数据

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `string` | 操作类型 |

#### Returns

`undefined` | [`OperationMeta`](/auto-docs/history/interfaces/OperationMeta.md)<`any`, `any`, `any`>

操作的元数据

***

### registerOperationMeta

**registerOperationMeta**(`operationMeta`): `Disposable`

注册操作的元数据

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `operationMeta` | [`OperationMeta`](/auto-docs/history/interfaces/OperationMeta.md)<`any`, `any`, `any`> | 操作的元数据 |

#### Returns

`Disposable`

销毁函数
