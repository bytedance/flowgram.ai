# Class: FlowNodeVariableData

Manages variable data for a flow node, including public and private scopes.

## Hierarchy

* [`EntityData`](/auto-docs/fixed-layout-editor/classes/EntityData.md)

  ↳ **`FlowNodeVariableData`**

## Table of contents

### Constructors

* [constructor](/auto-docs/fixed-layout-editor/classes/FlowNodeVariableData.md#constructor)

### Properties

* [entity](/auto-docs/fixed-layout-editor/classes/FlowNodeVariableData.md#entity)
* [onDataChange](/auto-docs/fixed-layout-editor/classes/FlowNodeVariableData.md#ondatachange)
* [onWillChange](/auto-docs/fixed-layout-editor/classes/FlowNodeVariableData.md#onwillchange)
* [opts](/auto-docs/fixed-layout-editor/classes/FlowNodeVariableData.md#opts)
* [toDispose](/auto-docs/fixed-layout-editor/classes/FlowNodeVariableData.md#todispose)
* [variableEngine](/auto-docs/fixed-layout-editor/classes/FlowNodeVariableData.md#variableengine)
* [type](/auto-docs/fixed-layout-editor/classes/FlowNodeVariableData.md#type)

### Accessors

* [allScopes](/auto-docs/fixed-layout-editor/classes/FlowNodeVariableData.md#allscopes)
* [changeLocked](/auto-docs/fixed-layout-editor/classes/FlowNodeVariableData.md#changelocked)
* [data](/auto-docs/fixed-layout-editor/classes/FlowNodeVariableData.md#data)
* [disposed](/auto-docs/fixed-layout-editor/classes/FlowNodeVariableData.md#disposed)
* [onDispose](/auto-docs/fixed-layout-editor/classes/FlowNodeVariableData.md#ondispose)
* [private](/auto-docs/fixed-layout-editor/classes/FlowNodeVariableData.md#private)
* [public](/auto-docs/fixed-layout-editor/classes/FlowNodeVariableData.md#public)
* [type](/auto-docs/fixed-layout-editor/classes/FlowNodeVariableData.md#type-1)
* [version](/auto-docs/fixed-layout-editor/classes/FlowNodeVariableData.md#version)

### Methods

* [checkChanged](/auto-docs/fixed-layout-editor/classes/FlowNodeVariableData.md#checkchanged)
* [clearPrivateVar](/auto-docs/fixed-layout-editor/classes/FlowNodeVariableData.md#clearprivatevar)
* [clearVar](/auto-docs/fixed-layout-editor/classes/FlowNodeVariableData.md#clearvar)
* [dispose](/auto-docs/fixed-layout-editor/classes/FlowNodeVariableData.md#dispose)
* [fireChange](/auto-docs/fixed-layout-editor/classes/FlowNodeVariableData.md#firechange)
* [fireWillChange](/auto-docs/fixed-layout-editor/classes/FlowNodeVariableData.md#firewillchange)
* [fromJSON](/auto-docs/fixed-layout-editor/classes/FlowNodeVariableData.md#fromjson)
* [fullyUpdate](/auto-docs/fixed-layout-editor/classes/FlowNodeVariableData.md#fullyupdate)
* [getByKeyPath](/auto-docs/fixed-layout-editor/classes/FlowNodeVariableData.md#getbykeypath)
* [getByKeyPathInPrivate](/auto-docs/fixed-layout-editor/classes/FlowNodeVariableData.md#getbykeypathinprivate)
* [getDefaultData](/auto-docs/fixed-layout-editor/classes/FlowNodeVariableData.md#getdefaultdata)
* [getPrivateVar](/auto-docs/fixed-layout-editor/classes/FlowNodeVariableData.md#getprivatevar)
* [getVar](/auto-docs/fixed-layout-editor/classes/FlowNodeVariableData.md#getvar)
* [initPrivate](/auto-docs/fixed-layout-editor/classes/FlowNodeVariableData.md#initprivate)
* [setPrivateVar](/auto-docs/fixed-layout-editor/classes/FlowNodeVariableData.md#setprivatevar)
* [setVar](/auto-docs/fixed-layout-editor/classes/FlowNodeVariableData.md#setvar)
* [toJSON](/auto-docs/fixed-layout-editor/classes/FlowNodeVariableData.md#tojson)
* [update](/auto-docs/fixed-layout-editor/classes/FlowNodeVariableData.md#update)

## Constructors

### constructor

**new FlowNodeVariableData**(`entity`, `opts`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`FlowNodeEntity`](/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md) |
| `opts` | `Options` |

#### Overrides

[EntityData](/auto-docs/fixed-layout-editor/classes/EntityData.md).[constructor](/auto-docs/fixed-layout-editor/classes/EntityData.md#constructor)

## Properties

### entity

**entity**: [`FlowNodeEntity`](/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md)

#### Overrides

[EntityData](/auto-docs/fixed-layout-editor/classes/EntityData.md).[entity](/auto-docs/fixed-layout-editor/classes/EntityData.md#entity)

***

### onDataChange

`Readonly` **onDataChange**: [`Event`](/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<[`EntityData`](/auto-docs/fixed-layout-editor/classes/EntityData.md)<`any`, {}>>

修改后触发

#### Inherited from

[EntityData](/auto-docs/fixed-layout-editor/classes/EntityData.md).[onDataChange](/auto-docs/fixed-layout-editor/classes/EntityData.md#ondatachange)

***

### onWillChange

`Readonly` **onWillChange**: [`Event`](/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<[`EntityData`](/auto-docs/fixed-layout-editor/classes/EntityData.md)<`any`, {}>>

修改前触发

#### Inherited from

[EntityData](/auto-docs/fixed-layout-editor/classes/EntityData.md).[onWillChange](/auto-docs/fixed-layout-editor/classes/EntityData.md#onwillchange)

***

### opts

`Readonly` **opts**: `Options`

#### Overrides

[EntityData](/auto-docs/fixed-layout-editor/classes/EntityData.md).[opts](/auto-docs/fixed-layout-editor/classes/EntityData.md#opts)

***

### toDispose

`Readonly` **toDispose**: [`DisposableCollection`](/auto-docs/fixed-layout-editor/classes/DisposableCollection.md)

#### Inherited from

[EntityData](/auto-docs/fixed-layout-editor/classes/EntityData.md).[toDispose](/auto-docs/fixed-layout-editor/classes/EntityData.md#todispose)

***

### variableEngine

`Readonly` **variableEngine**: [`VariableEngine`](/auto-docs/fixed-layout-editor/classes/VariableEngine.md)

***

### type

`Static` **type**: `string`

#### Overrides

[EntityData](/auto-docs/fixed-layout-editor/classes/EntityData.md).[type](/auto-docs/fixed-layout-editor/classes/EntityData.md#type)

## Accessors

### allScopes

`get` **allScopes**(): [`FlowNodeScope`](/auto-docs/fixed-layout-editor/interfaces/FlowNodeScope.md)\[]

An array containing all scopes (public and private) of the node.

#### Returns

[`FlowNodeScope`](/auto-docs/fixed-layout-editor/interfaces/FlowNodeScope.md)\[]

***

### changeLocked

`get` **changeLocked**(): `boolean`

#### Returns

`boolean`

#### Inherited from

EntityData.changeLocked

`set` **changeLocked**(`p`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `p` | `boolean` |

#### Returns

`void`

#### Inherited from

EntityData.changeLocked

***

### data

`get` **data**(): `DATA`

当前数据

#### Returns

`DATA`

#### Inherited from

EntityData.data

***

### disposed

`get` **disposed**(): `boolean`

#### Returns

`boolean`

#### Inherited from

EntityData.disposed

***

### onDispose

`get` **onDispose**(): [`Event`](/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<`void`>

#### Returns

[`Event`](/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<`void`>

#### Inherited from

EntityData.onDispose

***

### private

`get` **private**(): `undefined` | [`FlowNodeScope`](/auto-docs/fixed-layout-editor/interfaces/FlowNodeScope.md)

The private scope of the node.

#### Returns

`undefined` | [`FlowNodeScope`](/auto-docs/fixed-layout-editor/interfaces/FlowNodeScope.md)

***

### public

`get` **public**(): [`FlowNodeScope`](/auto-docs/fixed-layout-editor/interfaces/FlowNodeScope.md)

The public scope of the node.

#### Returns

[`FlowNodeScope`](/auto-docs/fixed-layout-editor/interfaces/FlowNodeScope.md)

***

### type

`get` **type**(): `string`

data 类型

#### Returns

`string`

#### Inherited from

EntityData.type

***

### version

`get` **version**(): `number`

#### Returns

`number`

#### Inherited from

EntityData.version

## Methods

### checkChanged

**checkChanged**(`newProps`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `newProps` | `any` |

#### Returns

`boolean`

**`Deprecated`**

检测属性是否更改，默认采用浅比较

#### Inherited from

[EntityData](/auto-docs/fixed-layout-editor/classes/EntityData.md).[checkChanged](/auto-docs/fixed-layout-editor/classes/EntityData.md#checkchanged)

***

### clearPrivateVar

**clearPrivateVar**(`key?`): `undefined` | `void`

Clears a variable from the private AST (Abstract Syntax Tree) by key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key?` | `string` | The key of the variable to clear. Defaults to 'outputs'. |

#### Returns

`undefined` | `void`

The updated AST node.

***

### clearVar

**clearVar**(`key?`): `void`

Clears a variable from the public AST (Abstract Syntax Tree) by key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key?` | `string` | The key of the variable to clear. Defaults to 'outputs'. |

#### Returns

`void`

The updated AST node.

***

### dispose

**dispose**(): `void`

#### Returns

`void`

#### Inherited from

[EntityData](/auto-docs/fixed-layout-editor/classes/EntityData.md).[dispose](/auto-docs/fixed-layout-editor/classes/EntityData.md#dispose)

***

### fireChange

**fireChange**(): `void`

#### Returns

`void`

#### Inherited from

[EntityData](/auto-docs/fixed-layout-editor/classes/EntityData.md).[fireChange](/auto-docs/fixed-layout-editor/classes/EntityData.md#firechange)

***

### fireWillChange

**fireWillChange**(): `void`

#### Returns

`void`

#### Inherited from

[EntityData](/auto-docs/fixed-layout-editor/classes/EntityData.md).[fireWillChange](/auto-docs/fixed-layout-editor/classes/EntityData.md#firewillchange)

***

### fromJSON

**fromJSON**(`data`): `void`

还原数据

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `object` |

#### Returns

`void`

#### Inherited from

[EntityData](/auto-docs/fixed-layout-editor/classes/EntityData.md).[fromJSON](/auto-docs/fixed-layout-editor/classes/EntityData.md#fromjson)

***

### fullyUpdate

**fullyUpdate**(`props`): `void`

更新全量数据

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `any` |

#### Returns

`void`

#### Inherited from

[EntityData](/auto-docs/fixed-layout-editor/classes/EntityData.md).[fullyUpdate](/auto-docs/fixed-layout-editor/classes/EntityData.md#fullyupdate)

***

### getByKeyPath

**getByKeyPath**(`keyPath`): `undefined` | [`BaseVariableField`](/auto-docs/fixed-layout-editor/classes/BaseVariableField.md)<`any`>

Find a variable field by key path in the public scope by scope chain.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `keyPath` | `string`\[] | The key path of the variable field. |

#### Returns

`undefined` | [`BaseVariableField`](/auto-docs/fixed-layout-editor/classes/BaseVariableField.md)<`any`>

The variable field, or undefined if not found.

***

### getByKeyPathInPrivate

**getByKeyPathInPrivate**(`keyPath`): `undefined` | [`BaseVariableField`](/auto-docs/fixed-layout-editor/classes/BaseVariableField.md)<`any`>

Find a variable field by key path in the private scope by scope chain.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `keyPath` | `string`\[] | The key path of the variable field. |

#### Returns

`undefined` | [`BaseVariableField`](/auto-docs/fixed-layout-editor/classes/BaseVariableField.md)<`any`>

The variable field, or undefined if not found.

***

### getDefaultData

**getDefaultData**(): `Object`

初始化数据

#### Returns

`Object`

#### Overrides

[EntityData](/auto-docs/fixed-layout-editor/classes/EntityData.md).[getDefaultData](/auto-docs/fixed-layout-editor/classes/EntityData.md#getdefaultdata)

***

### getPrivateVar

**getPrivateVar**(`key?`): `undefined` | [`ASTNode`](/auto-docs/fixed-layout-editor/classes/ASTNode.md)<`any`>

Retrieves a variable from the private AST (Abstract Syntax Tree) by key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key?` | `string` | The key of the variable to retrieve. Defaults to 'outputs'. |

#### Returns

`undefined` | [`ASTNode`](/auto-docs/fixed-layout-editor/classes/ASTNode.md)<`any`>

The value of the variable, or undefined if not found.

***

### getVar

**getVar**(`key?`): `undefined` | [`ASTNode`](/auto-docs/fixed-layout-editor/classes/ASTNode.md)<`any`>

Retrieves a variable from the public AST (Abstract Syntax Tree) by key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key?` | `string` | The key of the variable to retrieve. Defaults to 'outputs'. |

#### Returns

`undefined` | [`ASTNode`](/auto-docs/fixed-layout-editor/classes/ASTNode.md)<`any`>

The value of the variable, or undefined if not found.

***

### initPrivate

**initPrivate**(): [`FlowNodeScope`](/auto-docs/fixed-layout-editor/interfaces/FlowNodeScope.md)

Initializes and returns the private scope for the node.
If the private scope already exists, it returns the existing one.

#### Returns

[`FlowNodeScope`](/auto-docs/fixed-layout-editor/interfaces/FlowNodeScope.md)

The private scope of the node.

***

### setPrivateVar

**setPrivateVar**(`key`, `json`): [`ASTNode`](/auto-docs/fixed-layout-editor/classes/ASTNode.md)<`any`>

Sets a variable in the private AST (Abstract Syntax Tree) with the given key and JSON value.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The key under which the variable will be stored. |
| `json` | [`ASTNodeJSON`](/auto-docs/fixed-layout-editor/interfaces/ASTNodeJSON.md) | The JSON value to store. |

#### Returns

[`ASTNode`](/auto-docs/fixed-layout-editor/classes/ASTNode.md)<`any`>

The updated AST node.

**setPrivateVar**(`json`): [`ASTNode`](/auto-docs/fixed-layout-editor/classes/ASTNode.md)<`any`>

Sets a variable in the private AST (Abstract Syntax Tree) with the default key 'outputs'.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `json` | [`ASTNodeJSON`](/auto-docs/fixed-layout-editor/interfaces/ASTNodeJSON.md) | The JSON value to store. |

#### Returns

[`ASTNode`](/auto-docs/fixed-layout-editor/classes/ASTNode.md)<`any`>

The updated AST node.

***

### setVar

**setVar**(`key`, `json`): [`ASTNode`](/auto-docs/fixed-layout-editor/classes/ASTNode.md)<`any`>

Sets a variable in the public AST (Abstract Syntax Tree) with the given key and JSON value.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The key under which the variable will be stored. |
| `json` | [`ASTNodeJSON`](/auto-docs/fixed-layout-editor/interfaces/ASTNodeJSON.md) | The JSON value to store. |

#### Returns

[`ASTNode`](/auto-docs/fixed-layout-editor/classes/ASTNode.md)<`any`>

The updated AST node.

**setVar**(`json`): [`ASTNode`](/auto-docs/fixed-layout-editor/classes/ASTNode.md)<`any`>

Sets a variable in the public AST (Abstract Syntax Tree) with the default key 'outputs'.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `json` | [`ASTNodeJSON`](/auto-docs/fixed-layout-editor/interfaces/ASTNodeJSON.md) | The JSON value to store. |

#### Returns

[`ASTNode`](/auto-docs/fixed-layout-editor/classes/ASTNode.md)<`any`>

The updated AST node.

***

### toJSON

**toJSON**(): `any`

存储数据，一般在关闭浏览器后需要暂时存到 localStorage

#### Returns

`any`

#### Inherited from

[EntityData](/auto-docs/fixed-layout-editor/classes/EntityData.md).[toJSON](/auto-docs/fixed-layout-editor/classes/EntityData.md#tojson)

***

### update

**update**(`props`, `value?`): `void`

更新单个数据

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `any` |
| `value?` | `any` |

#### Returns

`void`

#### Inherited from

[EntityData](/auto-docs/fixed-layout-editor/classes/EntityData.md).[update](/auto-docs/fixed-layout-editor/classes/EntityData.md#update)
