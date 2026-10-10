# Class: NodeEngineContext

NodeEngineContext 在 Node Engine 中为全局单例, 它的作用是让Node之间共享数据。
context 分为内置context(如 readonly) 和 自定义context(业务可以按需注入)

## Table of contents

### Constructors

* [constructor](/auto-docs/form-core/classes/NodeEngineContext.md#constructor)

### Properties

* [onChange](/auto-docs/form-core/classes/NodeEngineContext.md#onchange)
* [onChangeEmitter](/auto-docs/form-core/classes/NodeEngineContext.md#onchangeemitter)
* [DEFAULT\_JSON](/auto-docs/form-core/classes/NodeEngineContext.md#default_json)
* [DEFAULT\_READONLY](/auto-docs/form-core/classes/NodeEngineContext.md#default_readonly)

### Accessors

* [json](/auto-docs/form-core/classes/NodeEngineContext.md#json)
* [readonly](/auto-docs/form-core/classes/NodeEngineContext.md#readonly)

## Constructors

### constructor

**new NodeEngineContext**()

## Properties

### onChange

`Readonly` **onChange**: `Event`<[`NodeEngineContext`](/auto-docs/form-core/classes/NodeEngineContext.md)>

***

### onChangeEmitter

`Readonly` **onChangeEmitter**: `Emitter`<[`NodeEngineContext`](/auto-docs/form-core/classes/NodeEngineContext.md)>

***

### DEFAULT\_JSON

`Static` **DEFAULT\_JSON**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `readonly` | `boolean` |

***

### DEFAULT\_READONLY

`Static` **DEFAULT\_READONLY**: `boolean` = `false`

## Accessors

### json

`get` **json**(): [`INodeEngineContext`](/auto-docs/form-core/interfaces/INodeEngineContext.md)

#### Returns

[`INodeEngineContext`](/auto-docs/form-core/interfaces/INodeEngineContext.md)

***

### readonly

`get` **readonly**(): `boolean`

#### Returns

`boolean`

`set` **readonly**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `boolean` |

#### Returns

`void`
