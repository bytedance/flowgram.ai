# Interface: IVariableStore

## Table of contents

### Properties

* [id](/auto-docs/interface/interfaces/IVariableStore.md#id)
* [store](/auto-docs/interface/interfaces/IVariableStore.md#store)

### Methods

* [dispose](/auto-docs/interface/interfaces/IVariableStore.md#dispose)
* [getValue](/auto-docs/interface/interfaces/IVariableStore.md#getvalue)
* [init](/auto-docs/interface/interfaces/IVariableStore.md#init)
* [setParent](/auto-docs/interface/interfaces/IVariableStore.md#setparent)
* [setValue](/auto-docs/interface/interfaces/IVariableStore.md#setvalue)
* [setVariable](/auto-docs/interface/interfaces/IVariableStore.md#setvariable)

## Properties

### id

**id**: `string`

***

### store

**store**: `Map`<`string`, `Map`<`string`, [`IVariable`](/auto-docs/interface/interfaces/IVariable.md)<`Object`>>>

## Methods

### dispose

**dispose**(): `void`

#### Returns

`void`

***

### getValue

**getValue**<`T`>(`params`): `null` | [`IVariableParseResult`](/auto-docs/interface/interfaces/IVariableParseResult.md)<`T`>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `unknown` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.nodeID` | `string` |
| `params.variableKey` | `string` |
| `params.variablePath?` | `string`\[] |

#### Returns

`null` | [`IVariableParseResult`](/auto-docs/interface/interfaces/IVariableParseResult.md)<`T`>

***

### init

**init**(): `void`

#### Returns

`void`

***

### setParent

**setParent**(`parent`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parent` | [`IVariableStore`](/auto-docs/interface/interfaces/IVariableStore.md) |

#### Returns

`void`

***

### setValue

**setValue**(`params`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.nodeID` | `string` |
| `params.value` | `unknown` |
| `params.variableKey` | `string` |
| `params.variablePath?` | `string`\[] |

#### Returns

`void`

***

### setVariable

**setVariable**(`params`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | { `key`: `string` ; `nodeID`: `string` ; `value`: `unknown`  } & `VariableTypeInfo` |

#### Returns

`void`
