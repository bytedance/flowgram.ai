# Class: KeyPathExpression\<CustomPathJSON>

Represents a key path expression, which is used to reference a variable by its key path.

This is the V2 of `KeyPathExpression`, with the following improvements:

* `returnType` is copied to a new instance to avoid reference issues.
* Circular reference detection is introduced.

## Type parameters

| Name | Type |
| :------ | :------ |
| `CustomPathJSON` | extends [`ASTNodeJSON`](/auto-docs/fixed-layout-editor/interfaces/ASTNodeJSON.md) = [`KeyPathExpressionJSON`](/auto-docs/fixed-layout-editor/interfaces/KeyPathExpressionJSON.md) |

## Hierarchy

* [`BaseExpression`](/auto-docs/fixed-layout-editor/classes/BaseExpression.md)<`CustomPathJSON`>

  ↳ **`KeyPathExpression`**

## Table of contents

### Constructors

* [constructor](/auto-docs/fixed-layout-editor/classes/KeyPathExpression.md#constructor)

### Properties

* [\_returnType](/auto-docs/fixed-layout-editor/classes/KeyPathExpression.md#_returntype)
* [changeLocked](/auto-docs/fixed-layout-editor/classes/KeyPathExpression.md#changelocked)
* [flags](/auto-docs/fixed-layout-editor/classes/KeyPathExpression.md#flags)
* [key](/auto-docs/fixed-layout-editor/classes/KeyPathExpression.md#key)
* [onDispose](/auto-docs/fixed-layout-editor/classes/KeyPathExpression.md#ondispose)
* [opts](/auto-docs/fixed-layout-editor/classes/KeyPathExpression.md#opts)
* [parent](/auto-docs/fixed-layout-editor/classes/KeyPathExpression.md#parent)
* [refs$](/auto-docs/fixed-layout-editor/classes/KeyPathExpression.md#refs$)
* [scope](/auto-docs/fixed-layout-editor/classes/KeyPathExpression.md#scope)
* [toDispose](/auto-docs/fixed-layout-editor/classes/KeyPathExpression.md#todispose)
* [value$](/auto-docs/fixed-layout-editor/classes/KeyPathExpression.md#value$)
* [kind](/auto-docs/fixed-layout-editor/classes/KeyPathExpression.md#kind)

### Accessors

* [children](/auto-docs/fixed-layout-editor/classes/KeyPathExpression.md#children)
* [disposed](/auto-docs/fixed-layout-editor/classes/KeyPathExpression.md#disposed)
* [globalVariableTable](/auto-docs/fixed-layout-editor/classes/KeyPathExpression.md#globalvariabletable)
* [hash](/auto-docs/fixed-layout-editor/classes/KeyPathExpression.md#hash)
* [keyPath](/auto-docs/fixed-layout-editor/classes/KeyPathExpression.md#keypath)
* [kind](/auto-docs/fixed-layout-editor/classes/KeyPathExpression.md#kind-1)
* [parentFields](/auto-docs/fixed-layout-editor/classes/KeyPathExpression.md#parentfields)
* [refs](/auto-docs/fixed-layout-editor/classes/KeyPathExpression.md#refs)
* [returnType](/auto-docs/fixed-layout-editor/classes/KeyPathExpression.md#returntype)
* [version](/auto-docs/fixed-layout-editor/classes/KeyPathExpression.md#version)

### Methods

* [dispatchGlobalEvent](/auto-docs/fixed-layout-editor/classes/KeyPathExpression.md#dispatchglobalevent)
* [dispose](/auto-docs/fixed-layout-editor/classes/KeyPathExpression.md#dispose)
* [fireChange](/auto-docs/fixed-layout-editor/classes/KeyPathExpression.md#firechange)
* [fromJSON](/auto-docs/fixed-layout-editor/classes/KeyPathExpression.md#fromjson)
* [getRefFields](/auto-docs/fixed-layout-editor/classes/KeyPathExpression.md#getreffields)
* [getReturnTypeJSONByRef](/auto-docs/fixed-layout-editor/classes/KeyPathExpression.md#getreturntypejsonbyref)
* [refreshRefs](/auto-docs/fixed-layout-editor/classes/KeyPathExpression.md#refreshrefs)
* [subscribe](/auto-docs/fixed-layout-editor/classes/KeyPathExpression.md#subscribe)
* [toJSON](/auto-docs/fixed-layout-editor/classes/KeyPathExpression.md#tojson)

## Constructors

### constructor

**new KeyPathExpression**<`CustomPathJSON`>(`params`, `opts`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `CustomPathJSON` | extends [`ASTNodeJSON`](/auto-docs/fixed-layout-editor/interfaces/ASTNodeJSON.md) = [`KeyPathExpressionJSON`](/auto-docs/fixed-layout-editor/interfaces/KeyPathExpressionJSON.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`CreateASTParams`](/auto-docs/fixed-layout-editor/interfaces/CreateASTParams.md) |
| `opts` | `any` |

#### Overrides

[BaseExpression](/auto-docs/fixed-layout-editor/classes/BaseExpression.md).[constructor](/auto-docs/fixed-layout-editor/classes/BaseExpression.md#constructor)

## Properties

### \_returnType

**\_returnType**: [`BaseType`](/auto-docs/fixed-layout-editor/classes/BaseType.md)<`any`>

The return type of the expression.

A new `returnType` node is generated directly, instead of reusing the existing one, to ensure that different key paths do not point to the same field.

***

### changeLocked

**changeLocked**: `boolean`

Update lock.

* When set to `true`, `fireChange` will not trigger any events.
* This is useful when multiple updates are needed, and you want to avoid multiple triggers.

#### Inherited from

[BaseExpression](/auto-docs/fixed-layout-editor/classes/BaseExpression.md).[changeLocked](/auto-docs/fixed-layout-editor/classes/BaseExpression.md#changelocked)

***

### flags

**flags**: [`ASTNodeFlags`](/auto-docs/fixed-layout-editor/enums/ASTNodeFlags.md)

Node flags, used to record some flag information.

#### Inherited from

[BaseExpression](/auto-docs/fixed-layout-editor/classes/BaseExpression.md).[flags](/auto-docs/fixed-layout-editor/classes/BaseExpression.md#flags)

***

### key

`Readonly` **key**: `string`

The unique identifier of the ASTNode, which is **immutable**.

* Immutable: Once assigned, the key cannot be changed.
* Automatically generated if not specified, and cannot be changed as well.
* If a new key needs to be generated, the current ASTNode should be destroyed and a new ASTNode should be generated.

#### Inherited from

[BaseExpression](/auto-docs/fixed-layout-editor/classes/BaseExpression.md).[key](/auto-docs/fixed-layout-editor/classes/BaseExpression.md#key)

***

### onDispose

**onDispose**: [`Event`](/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<`void`>

Callback triggered upon disposal.

#### Inherited from

[BaseExpression](/auto-docs/fixed-layout-editor/classes/BaseExpression.md).[onDispose](/auto-docs/fixed-layout-editor/classes/BaseExpression.md#ondispose)

***

### opts

`Optional` `Readonly` **opts**: `any`

**`Deprecated`**

Get the injected options for the ASTNode.

Please use `@injectToAst(XXXService) declare xxxService: XXXService` to achieve external dependency injection.

#### Inherited from

[BaseExpression](/auto-docs/fixed-layout-editor/classes/BaseExpression.md).[opts](/auto-docs/fixed-layout-editor/classes/BaseExpression.md#opts)

***

### parent

`Readonly` **parent**: `undefined` | [`ASTNode`](/auto-docs/fixed-layout-editor/classes/ASTNode.md)<`any`>

The parent ASTNode.

#### Inherited from

[BaseExpression](/auto-docs/fixed-layout-editor/classes/BaseExpression.md).[parent](/auto-docs/fixed-layout-editor/classes/BaseExpression.md#parent)

***

### refs$

**refs$**: `Observable`<`ExpressionRefs`>

An observable that emits the referenced variable fields when they change.

#### Inherited from

[BaseExpression](/auto-docs/fixed-layout-editor/classes/BaseExpression.md).[refs$](/auto-docs/fixed-layout-editor/classes/BaseExpression.md#refs$)

***

### scope

`Readonly` **scope**: [`Scope`](/auto-docs/fixed-layout-editor/classes/Scope.md)<`Record`<`string`, `any`>>

The scope in which the ASTNode is located.

#### Inherited from

[BaseExpression](/auto-docs/fixed-layout-editor/classes/BaseExpression.md).[scope](/auto-docs/fixed-layout-editor/classes/BaseExpression.md#scope)

***

### toDispose

`Readonly` **toDispose**: [`DisposableCollection`](/auto-docs/fixed-layout-editor/classes/DisposableCollection.md)

List of disposal handlers for the ASTNode.

#### Inherited from

[BaseExpression](/auto-docs/fixed-layout-editor/classes/BaseExpression.md).[toDispose](/auto-docs/fixed-layout-editor/classes/BaseExpression.md#todispose)

***

### value$

`Readonly` **value$**: `BehaviorSubject`<[`ASTNode`](/auto-docs/fixed-layout-editor/classes/ASTNode.md)<`any`>>

AST node change Observable events, implemented based on RxJS.

* Emits the current ASTNode value upon subscription.
* Emits a new value whenever `fireChange` is called.

#### Inherited from

[BaseExpression](/auto-docs/fixed-layout-editor/classes/BaseExpression.md).[value$](/auto-docs/fixed-layout-editor/classes/BaseExpression.md#value$)

***

### kind

`Static` **kind**: `string`

The kind of the ASTNode.

#### Overrides

[BaseExpression](/auto-docs/fixed-layout-editor/classes/BaseExpression.md).[kind](/auto-docs/fixed-layout-editor/classes/BaseExpression.md#kind)

## Accessors

### children

`get` **children**(): [`ASTNode`](/auto-docs/fixed-layout-editor/classes/ASTNode.md)<`any`>\[]

Gets all child ASTNodes of the current ASTNode.

#### Returns

[`ASTNode`](/auto-docs/fixed-layout-editor/classes/ASTNode.md)<`any`>\[]

#### Inherited from

BaseExpression.children

***

### disposed

`get` **disposed**(): `boolean`

#### Returns

`boolean`

#### Inherited from

BaseExpression.disposed

***

### globalVariableTable

`get` **globalVariableTable**(): [`IVariableTable`](/auto-docs/fixed-layout-editor/interfaces/IVariableTable.md)

Get the global variable table, which is used to access referenced variables.

#### Returns

[`IVariableTable`](/auto-docs/fixed-layout-editor/interfaces/IVariableTable.md)

#### Inherited from

BaseExpression.globalVariableTable

***

### hash

`get` **hash**(): `string`

The unique hash value of the ASTNode.

* It will update when the ASTNode is updated.
* You can used to check two ASTNode are equal.

#### Returns

`string`

#### Inherited from

BaseExpression.hash

***

### keyPath

`get` **keyPath**(): `string`\[]

The key path of the variable.

#### Returns

`string`\[]

***

### kind

`get` **kind**(): `string`

The type of the ASTNode.

#### Returns

`string`

#### Inherited from

BaseExpression.kind

***

### parentFields

`get` **parentFields**(): [`BaseVariableField`](/auto-docs/fixed-layout-editor/classes/BaseVariableField.md)<`any`>\[]

Parent variable fields, sorted from closest to farthest.

#### Returns

[`BaseVariableField`](/auto-docs/fixed-layout-editor/classes/BaseVariableField.md)<`any`>\[]

#### Inherited from

BaseExpression.parentFields

***

### refs

`get` **refs**(): `ExpressionRefs`

The variable fields referenced by the expression.

#### Returns

`ExpressionRefs`

#### Inherited from

BaseExpression.refs

***

### returnType

`get` **returnType**(): [`BaseType`](/auto-docs/fixed-layout-editor/classes/BaseType.md)<`any`>

The return type of the expression.

#### Returns

[`BaseType`](/auto-docs/fixed-layout-editor/classes/BaseType.md)<`any`>

#### Overrides

BaseExpression.returnType

***

### version

`get` **version**(): `number`

The version value of the ASTNode.

* You can used to check whether ASTNode are updated.

#### Returns

`number`

#### Inherited from

BaseExpression.version

## Methods

### dispatchGlobalEvent

**dispatchGlobalEvent**<`ActionType`>(`event`): `void`

Dispatches a global event for the current ASTNode.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `ActionType` | extends [`GlobalEventActionType`](/auto-docs/fixed-layout-editor/interfaces/GlobalEventActionType.md)<`string`, `any`, [`ASTNode`](/auto-docs/fixed-layout-editor/classes/ASTNode.md)<`any`>, `ActionType`> = [`GlobalEventActionType`](/auto-docs/fixed-layout-editor/interfaces/GlobalEventActionType.md)<`string`, `any`, [`ASTNode`](/auto-docs/fixed-layout-editor/classes/ASTNode.md)<`any`>> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `Omit`<`ActionType`, `"ast"`> | The global event. |

#### Returns

`void`

#### Inherited from

[BaseExpression](/auto-docs/fixed-layout-editor/classes/BaseExpression.md).[dispatchGlobalEvent](/auto-docs/fixed-layout-editor/classes/BaseExpression.md#dispatchglobalevent)

***

### dispose

**dispose**(): `void`

Disposes the ASTNode.

#### Returns

`void`

#### Inherited from

[BaseExpression](/auto-docs/fixed-layout-editor/classes/BaseExpression.md).[dispose](/auto-docs/fixed-layout-editor/classes/BaseExpression.md#dispose)

***

### fireChange

**fireChange**(): `void`

Triggers an update for the current node.

#### Returns

`void`

#### Inherited from

[BaseExpression](/auto-docs/fixed-layout-editor/classes/BaseExpression.md).[fireChange](/auto-docs/fixed-layout-editor/classes/BaseExpression.md#firechange)

***

### fromJSON

**fromJSON**(`json`): `void`

Deserializes the `KeyPathExpressionJSON` to the `KeyPathExpression`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `json` | `CustomPathJSON` | The `KeyPathExpressionJSON` to deserialize. |

#### Returns

`void`

#### Overrides

[BaseExpression](/auto-docs/fixed-layout-editor/classes/BaseExpression.md).[fromJSON](/auto-docs/fixed-layout-editor/classes/BaseExpression.md#fromjson)

***

### getRefFields

**getRefFields**(): [`BaseVariableField`](/auto-docs/fixed-layout-editor/classes/BaseVariableField.md)<`any`>\[]

Get the variable fields referenced by the expression.

#### Returns

[`BaseVariableField`](/auto-docs/fixed-layout-editor/classes/BaseVariableField.md)<`any`>\[]

An array of referenced variable fields.

#### Overrides

[BaseExpression](/auto-docs/fixed-layout-editor/classes/BaseExpression.md).[getRefFields](/auto-docs/fixed-layout-editor/classes/BaseExpression.md#getreffields)

***

### getReturnTypeJSONByRef

**getReturnTypeJSONByRef**(`_ref`): `undefined` | [`ASTNodeJSON`](/auto-docs/fixed-layout-editor/interfaces/ASTNodeJSON.md)

Get the return type JSON by reference.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `_ref` | `undefined` | [`BaseVariableField`](/auto-docs/fixed-layout-editor/classes/BaseVariableField.md)<`any`> | The referenced variable field. |

#### Returns

`undefined` | [`ASTNodeJSON`](/auto-docs/fixed-layout-editor/interfaces/ASTNodeJSON.md)

The JSON representation of the return type.

***

### refreshRefs

**refreshRefs**(): `void`

Refresh the variable references.

#### Returns

`void`

#### Inherited from

[BaseExpression](/auto-docs/fixed-layout-editor/classes/BaseExpression.md).[refreshRefs](/auto-docs/fixed-layout-editor/classes/BaseExpression.md#refreshrefs)

***

### subscribe

**subscribe**<`Data`>(`observer`, `selector?`): [`Disposable`](/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md)

Listens for changes to the ASTNode.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Data` | [`KeyPathExpression`](/auto-docs/fixed-layout-editor/classes/KeyPathExpression.md)<`CustomPathJSON`> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `observer` | `ObserverOrNext`<`Data`> | The listener callback. |
| `selector?` | `SubscribeConfig`<[`KeyPathExpression`](/auto-docs/fixed-layout-editor/classes/KeyPathExpression.md)<`CustomPathJSON`>, `Data`> | Listens for specified data. |

#### Returns

[`Disposable`](/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md)

#### Inherited from

[BaseExpression](/auto-docs/fixed-layout-editor/classes/BaseExpression.md).[subscribe](/auto-docs/fixed-layout-editor/classes/BaseExpression.md#subscribe)

***

### toJSON

**toJSON**(): `CustomPathJSON`

Serialize the `KeyPathExpression` to `KeyPathExpressionJSON`.

#### Returns

`CustomPathJSON`

The JSON representation of `KeyPathExpression`.

#### Overrides

[BaseExpression](/auto-docs/fixed-layout-editor/classes/BaseExpression.md).[toJSON](/auto-docs/fixed-layout-editor/classes/BaseExpression.md#tojson)
