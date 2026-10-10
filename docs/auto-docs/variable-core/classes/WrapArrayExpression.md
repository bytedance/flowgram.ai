# Class: WrapArrayExpression

Represents a wrap expression, which wraps an expression with an array.

## Hierarchy

* [`BaseExpression`](/auto-docs/variable-core/classes/BaseExpression.md)<[`WrapArrayExpressionJSON`](/auto-docs/variable-core/interfaces/WrapArrayExpressionJSON.md)>

  ↳ **`WrapArrayExpression`**

## Table of contents

### Constructors

* [constructor](/auto-docs/variable-core/classes/WrapArrayExpression.md#constructor)

### Properties

* [changeLocked](/auto-docs/variable-core/classes/WrapArrayExpression.md#changelocked)
* [flags](/auto-docs/variable-core/classes/WrapArrayExpression.md#flags)
* [key](/auto-docs/variable-core/classes/WrapArrayExpression.md#key)
* [onDispose](/auto-docs/variable-core/classes/WrapArrayExpression.md#ondispose)
* [opts](/auto-docs/variable-core/classes/WrapArrayExpression.md#opts)
* [parent](/auto-docs/variable-core/classes/WrapArrayExpression.md#parent)
* [refs$](/auto-docs/variable-core/classes/WrapArrayExpression.md#refs$)
* [scope](/auto-docs/variable-core/classes/WrapArrayExpression.md#scope)
* [toDispose](/auto-docs/variable-core/classes/WrapArrayExpression.md#todispose)
* [value$](/auto-docs/variable-core/classes/WrapArrayExpression.md#value$)
* [kind](/auto-docs/variable-core/classes/WrapArrayExpression.md#kind)

### Accessors

* [children](/auto-docs/variable-core/classes/WrapArrayExpression.md#children)
* [disposed](/auto-docs/variable-core/classes/WrapArrayExpression.md#disposed)
* [globalVariableTable](/auto-docs/variable-core/classes/WrapArrayExpression.md#globalvariabletable)
* [hash](/auto-docs/variable-core/classes/WrapArrayExpression.md#hash)
* [kind](/auto-docs/variable-core/classes/WrapArrayExpression.md#kind-1)
* [parentFields](/auto-docs/variable-core/classes/WrapArrayExpression.md#parentfields)
* [refs](/auto-docs/variable-core/classes/WrapArrayExpression.md#refs)
* [returnType](/auto-docs/variable-core/classes/WrapArrayExpression.md#returntype)
* [version](/auto-docs/variable-core/classes/WrapArrayExpression.md#version)
* [wrapFor](/auto-docs/variable-core/classes/WrapArrayExpression.md#wrapfor)

### Methods

* [dispatchGlobalEvent](/auto-docs/variable-core/classes/WrapArrayExpression.md#dispatchglobalevent)
* [dispose](/auto-docs/variable-core/classes/WrapArrayExpression.md#dispose)
* [fireChange](/auto-docs/variable-core/classes/WrapArrayExpression.md#firechange)
* [fromJSON](/auto-docs/variable-core/classes/WrapArrayExpression.md#fromjson)
* [getRefFields](/auto-docs/variable-core/classes/WrapArrayExpression.md#getreffields)
* [refreshRefs](/auto-docs/variable-core/classes/WrapArrayExpression.md#refreshrefs)
* [refreshReturnType](/auto-docs/variable-core/classes/WrapArrayExpression.md#refreshreturntype)
* [subscribe](/auto-docs/variable-core/classes/WrapArrayExpression.md#subscribe)
* [toJSON](/auto-docs/variable-core/classes/WrapArrayExpression.md#tojson)

## Constructors

### constructor

**new WrapArrayExpression**(`params`, `opts?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`CreateASTParams`](/auto-docs/variable-core/interfaces/CreateASTParams.md) |
| `opts?` | `any` |

#### Inherited from

[BaseExpression](/auto-docs/variable-core/classes/BaseExpression.md).[constructor](/auto-docs/variable-core/classes/BaseExpression.md#constructor)

## Properties

### changeLocked

**changeLocked**: `boolean` = `false`

Update lock.

* When set to `true`, `fireChange` will not trigger any events.
* This is useful when multiple updates are needed, and you want to avoid multiple triggers.

#### Inherited from

[BaseExpression](/auto-docs/variable-core/classes/BaseExpression.md).[changeLocked](/auto-docs/variable-core/classes/BaseExpression.md#changelocked)

***

### flags

**flags**: [`ASTNodeFlags`](/auto-docs/variable-core/enums/ASTNodeFlags.md) = `ASTNodeFlags.Expression`

Node flags, used to record some flag information.

#### Inherited from

[BaseExpression](/auto-docs/variable-core/classes/BaseExpression.md).[flags](/auto-docs/variable-core/classes/BaseExpression.md#flags)

***

### key

`Readonly` **key**: `string`

The unique identifier of the ASTNode, which is **immutable**.

* Immutable: Once assigned, the key cannot be changed.
* Automatically generated if not specified, and cannot be changed as well.
* If a new key needs to be generated, the current ASTNode should be destroyed and a new ASTNode should be generated.

#### Inherited from

[BaseExpression](/auto-docs/variable-core/classes/BaseExpression.md).[key](/auto-docs/variable-core/classes/BaseExpression.md#key)

***

### onDispose

**onDispose**: `Event`<`void`>

Callback triggered upon disposal.

#### Inherited from

[BaseExpression](/auto-docs/variable-core/classes/BaseExpression.md).[onDispose](/auto-docs/variable-core/classes/BaseExpression.md#ondispose)

***

### opts

`Optional` `Readonly` **opts**: `any`

**`Deprecated`**

Get the injected options for the ASTNode.

Please use `@injectToAst(XXXService) declare xxxService: XXXService` to achieve external dependency injection.

#### Inherited from

[BaseExpression](/auto-docs/variable-core/classes/BaseExpression.md).[opts](/auto-docs/variable-core/classes/BaseExpression.md#opts)

***

### parent

`Readonly` **parent**: `undefined` | [`ASTNode`](/auto-docs/variable-core/classes/ASTNode.md)<`any`>

The parent ASTNode.

#### Inherited from

[BaseExpression](/auto-docs/variable-core/classes/BaseExpression.md).[parent](/auto-docs/variable-core/classes/BaseExpression.md#parent)

***

### refs$

**refs$**: `Observable`<`ExpressionRefs`>

An observable that emits the referenced variable fields when they change.

#### Inherited from

[BaseExpression](/auto-docs/variable-core/classes/BaseExpression.md).[refs$](/auto-docs/variable-core/classes/BaseExpression.md#refs$)

***

### scope

`Readonly` **scope**: [`Scope`](/auto-docs/variable-core/classes/Scope.md)<`Record`<`string`, `any`>>

The scope in which the ASTNode is located.

#### Inherited from

[BaseExpression](/auto-docs/variable-core/classes/BaseExpression.md).[scope](/auto-docs/variable-core/classes/BaseExpression.md#scope)

***

### toDispose

`Readonly` **toDispose**: `DisposableCollection`

List of disposal handlers for the ASTNode.

#### Inherited from

[BaseExpression](/auto-docs/variable-core/classes/BaseExpression.md).[toDispose](/auto-docs/variable-core/classes/BaseExpression.md#todispose)

***

### value$

`Readonly` **value$**: `BehaviorSubject`<[`ASTNode`](/auto-docs/variable-core/classes/ASTNode.md)<`any`>>

AST node change Observable events, implemented based on RxJS.

* Emits the current ASTNode value upon subscription.
* Emits a new value whenever `fireChange` is called.

#### Inherited from

[BaseExpression](/auto-docs/variable-core/classes/BaseExpression.md).[value$](/auto-docs/variable-core/classes/BaseExpression.md#value$)

***

### kind

`Static` **kind**: `string` = `ASTKind.WrapArrayExpression`

The kind of the ASTNode.

#### Overrides

[BaseExpression](/auto-docs/variable-core/classes/BaseExpression.md).[kind](/auto-docs/variable-core/classes/BaseExpression.md#kind)

## Accessors

### children

`get` **children**(): [`ASTNode`](/auto-docs/variable-core/classes/ASTNode.md)<`any`>\[]

Gets all child ASTNodes of the current ASTNode.

#### Returns

[`ASTNode`](/auto-docs/variable-core/classes/ASTNode.md)<`any`>\[]

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

`get` **globalVariableTable**(): [`IVariableTable`](/auto-docs/variable-core/interfaces/IVariableTable.md)

Get the global variable table, which is used to access referenced variables.

#### Returns

[`IVariableTable`](/auto-docs/variable-core/interfaces/IVariableTable.md)

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

### kind

`get` **kind**(): `string`

The type of the ASTNode.

#### Returns

`string`

#### Inherited from

BaseExpression.kind

***

### parentFields

`get` **parentFields**(): [`BaseVariableField`](/auto-docs/variable-core/classes/BaseVariableField.md)<`any`>\[]

Parent variable fields, sorted from closest to farthest.

#### Returns

[`BaseVariableField`](/auto-docs/variable-core/classes/BaseVariableField.md)<`any`>\[]

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

`get` **returnType**(): `undefined` | [`BaseType`](/auto-docs/variable-core/classes/BaseType.md)<`any`>

The return type of the expression.

#### Returns

`undefined` | [`BaseType`](/auto-docs/variable-core/classes/BaseType.md)<`any`>

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

***

### wrapFor

`get` **wrapFor**(): `undefined` | [`BaseExpression`](/auto-docs/variable-core/classes/BaseExpression.md)<`any`>

The expression to be wrapped.

#### Returns

`undefined` | [`BaseExpression`](/auto-docs/variable-core/classes/BaseExpression.md)<`any`>

## Methods

### dispatchGlobalEvent

**dispatchGlobalEvent**<`ActionType`>(`event`): `void`

Dispatches a global event for the current ASTNode.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `ActionType` | extends [`GlobalEventActionType`](/auto-docs/variable-core/interfaces/GlobalEventActionType.md)<`string`, `any`, [`ASTNode`](/auto-docs/variable-core/classes/ASTNode.md)<`any`>, `ActionType`> = [`GlobalEventActionType`](/auto-docs/variable-core/interfaces/GlobalEventActionType.md)<`string`, `any`, [`ASTNode`](/auto-docs/variable-core/classes/ASTNode.md)<`any`>> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `Omit`<`ActionType`, `"ast"`> | The global event. |

#### Returns

`void`

#### Inherited from

[BaseExpression](/auto-docs/variable-core/classes/BaseExpression.md).[dispatchGlobalEvent](/auto-docs/variable-core/classes/BaseExpression.md#dispatchglobalevent)

***

### dispose

**dispose**(): `void`

Disposes the ASTNode.

#### Returns

`void`

#### Inherited from

[BaseExpression](/auto-docs/variable-core/classes/BaseExpression.md).[dispose](/auto-docs/variable-core/classes/BaseExpression.md#dispose)

***

### fireChange

**fireChange**(): `void`

Triggers an update for the current node.

#### Returns

`void`

#### Inherited from

[BaseExpression](/auto-docs/variable-core/classes/BaseExpression.md).[fireChange](/auto-docs/variable-core/classes/BaseExpression.md#firechange)

***

### fromJSON

**fromJSON**(`json`): `void`

Deserializes the `WrapArrayExpressionJSON` to the `WrapArrayExpression`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `json` | [`WrapArrayExpressionJSON`](/auto-docs/variable-core/interfaces/WrapArrayExpressionJSON.md) | The `WrapArrayExpressionJSON` to deserialize. |

#### Returns

`void`

#### Overrides

[BaseExpression](/auto-docs/variable-core/classes/BaseExpression.md).[fromJSON](/auto-docs/variable-core/classes/BaseExpression.md#fromjson)

***

### getRefFields

**getRefFields**(): \[]

Get the variable fields referenced by the expression.

#### Returns

\[]

An empty array, as this expression does not reference any variables.

#### Overrides

[BaseExpression](/auto-docs/variable-core/classes/BaseExpression.md).[getRefFields](/auto-docs/variable-core/classes/BaseExpression.md#getreffields)

***

### refreshRefs

**refreshRefs**(): `void`

Refresh the variable references.

#### Returns

`void`

#### Inherited from

[BaseExpression](/auto-docs/variable-core/classes/BaseExpression.md).[refreshRefs](/auto-docs/variable-core/classes/BaseExpression.md#refreshrefs)

***

### refreshReturnType

**refreshReturnType**(): `void`

Refresh the return type of the expression.

#### Returns

`void`

***

### subscribe

**subscribe**<`Data`>(`observer`, `selector?`): `Disposable`

Listens for changes to the ASTNode.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Data` | [`WrapArrayExpression`](/auto-docs/variable-core/classes/WrapArrayExpression.md) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `observer` | `ObserverOrNext`<`Data`> | The listener callback. |
| `selector` | `SubscribeConfig`<[`WrapArrayExpression`](/auto-docs/variable-core/classes/WrapArrayExpression.md), `Data`> | Listens for specified data. |

#### Returns

`Disposable`

#### Inherited from

[BaseExpression](/auto-docs/variable-core/classes/BaseExpression.md).[subscribe](/auto-docs/variable-core/classes/BaseExpression.md#subscribe)

***

### toJSON

**toJSON**(): `Object`

Serialize the `WrapArrayExpression` to `WrapArrayExpressionJSON`.

#### Returns

`Object`

The JSON representation of `WrapArrayExpression`.

| Name | Type |
| :------ | :------ |
| `kind` | [`ASTKind`](/auto-docs/variable-core/enums/ASTKind.md) |
| `wrapFor` | `any` |

#### Overrides

[BaseExpression](/auto-docs/variable-core/classes/BaseExpression.md).[toJSON](/auto-docs/variable-core/classes/BaseExpression.md#tojson)
