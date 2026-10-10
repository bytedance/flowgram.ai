# Class: EnumerateExpression

Represents an enumeration expression, which iterates over a list and returns the type of the enumerated variable.

## Hierarchy

* [`BaseExpression`](/en/auto-docs/free-layout-editor/classes/BaseExpression.md)<[`EnumerateExpressionJSON`](/en/auto-docs/free-layout-editor/interfaces/EnumerateExpressionJSON.md)>

  ↳ **`EnumerateExpression`**

## Table of contents

### Constructors

* [constructor](/en/auto-docs/free-layout-editor/classes/EnumerateExpression.md#constructor)

### Properties

* [changeLocked](/en/auto-docs/free-layout-editor/classes/EnumerateExpression.md#changelocked)
* [flags](/en/auto-docs/free-layout-editor/classes/EnumerateExpression.md#flags)
* [key](/en/auto-docs/free-layout-editor/classes/EnumerateExpression.md#key)
* [onDispose](/en/auto-docs/free-layout-editor/classes/EnumerateExpression.md#ondispose)
* [opts](/en/auto-docs/free-layout-editor/classes/EnumerateExpression.md#opts)
* [parent](/en/auto-docs/free-layout-editor/classes/EnumerateExpression.md#parent)
* [refs$](/en/auto-docs/free-layout-editor/classes/EnumerateExpression.md#refs$)
* [scope](/en/auto-docs/free-layout-editor/classes/EnumerateExpression.md#scope)
* [toDispose](/en/auto-docs/free-layout-editor/classes/EnumerateExpression.md#todispose)
* [value$](/en/auto-docs/free-layout-editor/classes/EnumerateExpression.md#value$)
* [kind](/en/auto-docs/free-layout-editor/classes/EnumerateExpression.md#kind)

### Accessors

* [children](/en/auto-docs/free-layout-editor/classes/EnumerateExpression.md#children)
* [disposed](/en/auto-docs/free-layout-editor/classes/EnumerateExpression.md#disposed)
* [enumerateFor](/en/auto-docs/free-layout-editor/classes/EnumerateExpression.md#enumeratefor)
* [globalVariableTable](/en/auto-docs/free-layout-editor/classes/EnumerateExpression.md#globalvariabletable)
* [hash](/en/auto-docs/free-layout-editor/classes/EnumerateExpression.md#hash)
* [kind](/en/auto-docs/free-layout-editor/classes/EnumerateExpression.md#kind-1)
* [parentFields](/en/auto-docs/free-layout-editor/classes/EnumerateExpression.md#parentfields)
* [refs](/en/auto-docs/free-layout-editor/classes/EnumerateExpression.md#refs)
* [returnType](/en/auto-docs/free-layout-editor/classes/EnumerateExpression.md#returntype)
* [version](/en/auto-docs/free-layout-editor/classes/EnumerateExpression.md#version)

### Methods

* [dispatchGlobalEvent](/en/auto-docs/free-layout-editor/classes/EnumerateExpression.md#dispatchglobalevent)
* [dispose](/en/auto-docs/free-layout-editor/classes/EnumerateExpression.md#dispose)
* [fireChange](/en/auto-docs/free-layout-editor/classes/EnumerateExpression.md#firechange)
* [fromJSON](/en/auto-docs/free-layout-editor/classes/EnumerateExpression.md#fromjson)
* [getRefFields](/en/auto-docs/free-layout-editor/classes/EnumerateExpression.md#getreffields)
* [refreshRefs](/en/auto-docs/free-layout-editor/classes/EnumerateExpression.md#refreshrefs)
* [subscribe](/en/auto-docs/free-layout-editor/classes/EnumerateExpression.md#subscribe)
* [toJSON](/en/auto-docs/free-layout-editor/classes/EnumerateExpression.md#tojson)

## Constructors

### constructor

**new EnumerateExpression**(`params`, `opts?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`CreateASTParams`](/en/auto-docs/free-layout-editor/interfaces/CreateASTParams.md) |
| `opts?` | `any` |

#### Inherited from

[BaseExpression](/en/auto-docs/free-layout-editor/classes/BaseExpression.md).[constructor](/en/auto-docs/free-layout-editor/classes/BaseExpression.md#constructor)

## Properties

### changeLocked

**changeLocked**: `boolean`

Update lock.

* When set to `true`, `fireChange` will not trigger any events.
* This is useful when multiple updates are needed, and you want to avoid multiple triggers.

#### Inherited from

[BaseExpression](/en/auto-docs/free-layout-editor/classes/BaseExpression.md).[changeLocked](/en/auto-docs/free-layout-editor/classes/BaseExpression.md#changelocked)

***

### flags

**flags**: [`ASTNodeFlags`](/en/auto-docs/free-layout-editor/enums/ASTNodeFlags.md)

Node flags, used to record some flag information.

#### Inherited from

[BaseExpression](/en/auto-docs/free-layout-editor/classes/BaseExpression.md).[flags](/en/auto-docs/free-layout-editor/classes/BaseExpression.md#flags)

***

### key

`Readonly` **key**: `string`

The unique identifier of the ASTNode, which is **immutable**.

* Immutable: Once assigned, the key cannot be changed.
* Automatically generated if not specified, and cannot be changed as well.
* If a new key needs to be generated, the current ASTNode should be destroyed and a new ASTNode should be generated.

#### Inherited from

[BaseExpression](/en/auto-docs/free-layout-editor/classes/BaseExpression.md).[key](/en/auto-docs/free-layout-editor/classes/BaseExpression.md#key)

***

### onDispose

**onDispose**: [`Event`](/en/auto-docs/free-layout-editor/interfaces/Event-1.md)<`void`>

Callback triggered upon disposal.

#### Inherited from

[BaseExpression](/en/auto-docs/free-layout-editor/classes/BaseExpression.md).[onDispose](/en/auto-docs/free-layout-editor/classes/BaseExpression.md#ondispose)

***

### opts

`Optional` `Readonly` **opts**: `any`

**`Deprecated`**

Get the injected options for the ASTNode.

Please use `@injectToAst(XXXService) declare xxxService: XXXService` to achieve external dependency injection.

#### Inherited from

[BaseExpression](/en/auto-docs/free-layout-editor/classes/BaseExpression.md).[opts](/en/auto-docs/free-layout-editor/classes/BaseExpression.md#opts)

***

### parent

`Readonly` **parent**: `undefined` | [`ASTNode`](/en/auto-docs/free-layout-editor/classes/ASTNode.md)<`any`>

The parent ASTNode.

#### Inherited from

[BaseExpression](/en/auto-docs/free-layout-editor/classes/BaseExpression.md).[parent](/en/auto-docs/free-layout-editor/classes/BaseExpression.md#parent)

***

### refs$

**refs$**: `Observable`<`ExpressionRefs`>

An observable that emits the referenced variable fields when they change.

#### Inherited from

[BaseExpression](/en/auto-docs/free-layout-editor/classes/BaseExpression.md).[refs$](/en/auto-docs/free-layout-editor/classes/BaseExpression.md#refs$)

***

### scope

`Readonly` **scope**: [`Scope`](/en/auto-docs/free-layout-editor/classes/Scope.md)<`Record`<`string`, `any`>>

The scope in which the ASTNode is located.

#### Inherited from

[BaseExpression](/en/auto-docs/free-layout-editor/classes/BaseExpression.md).[scope](/en/auto-docs/free-layout-editor/classes/BaseExpression.md#scope)

***

### toDispose

`Readonly` **toDispose**: [`DisposableCollection`](/en/auto-docs/free-layout-editor/classes/DisposableCollection.md)

List of disposal handlers for the ASTNode.

#### Inherited from

[BaseExpression](/en/auto-docs/free-layout-editor/classes/BaseExpression.md).[toDispose](/en/auto-docs/free-layout-editor/classes/BaseExpression.md#todispose)

***

### value$

`Readonly` **value$**: `BehaviorSubject`<[`ASTNode`](/en/auto-docs/free-layout-editor/classes/ASTNode.md)<`any`>>

AST node change Observable events, implemented based on RxJS.

* Emits the current ASTNode value upon subscription.
* Emits a new value whenever `fireChange` is called.

#### Inherited from

[BaseExpression](/en/auto-docs/free-layout-editor/classes/BaseExpression.md).[value$](/en/auto-docs/free-layout-editor/classes/BaseExpression.md#value$)

***

### kind

`Static` **kind**: `string`

The kind of the ASTNode.

#### Overrides

[BaseExpression](/en/auto-docs/free-layout-editor/classes/BaseExpression.md).[kind](/en/auto-docs/free-layout-editor/classes/BaseExpression.md#kind)

## Accessors

### children

`get` **children**(): [`ASTNode`](/en/auto-docs/free-layout-editor/classes/ASTNode.md)<`any`>\[]

Gets all child ASTNodes of the current ASTNode.

#### Returns

[`ASTNode`](/en/auto-docs/free-layout-editor/classes/ASTNode.md)<`any`>\[]

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

### enumerateFor

`get` **enumerateFor**(): `undefined` | [`BaseExpression`](/en/auto-docs/free-layout-editor/classes/BaseExpression.md)<`any`>

The expression to be enumerated.

#### Returns

`undefined` | [`BaseExpression`](/en/auto-docs/free-layout-editor/classes/BaseExpression.md)<`any`>

***

### globalVariableTable

`get` **globalVariableTable**(): [`IVariableTable`](/en/auto-docs/free-layout-editor/interfaces/IVariableTable.md)

Get the global variable table, which is used to access referenced variables.

#### Returns

[`IVariableTable`](/en/auto-docs/free-layout-editor/interfaces/IVariableTable.md)

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

`get` **parentFields**(): [`BaseVariableField`](/en/auto-docs/free-layout-editor/classes/BaseVariableField.md)<`any`>\[]

Parent variable fields, sorted from closest to farthest.

#### Returns

[`BaseVariableField`](/en/auto-docs/free-layout-editor/classes/BaseVariableField.md)<`any`>\[]

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

`get` **returnType**(): `undefined` | [`BaseType`](/en/auto-docs/free-layout-editor/classes/BaseType.md)<`any`>

The return type of the expression.

#### Returns

`undefined` | [`BaseType`](/en/auto-docs/free-layout-editor/classes/BaseType.md)<`any`>

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
| `ActionType` | extends [`GlobalEventActionType`](/en/auto-docs/free-layout-editor/interfaces/GlobalEventActionType.md)<`string`, `any`, [`ASTNode`](/en/auto-docs/free-layout-editor/classes/ASTNode.md)<`any`>, `ActionType`> = [`GlobalEventActionType`](/en/auto-docs/free-layout-editor/interfaces/GlobalEventActionType.md)<`string`, `any`, [`ASTNode`](/en/auto-docs/free-layout-editor/classes/ASTNode.md)<`any`>> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `Omit`<`ActionType`, `"ast"`> | The global event. |

#### Returns

`void`

#### Inherited from

[BaseExpression](/en/auto-docs/free-layout-editor/classes/BaseExpression.md).[dispatchGlobalEvent](/en/auto-docs/free-layout-editor/classes/BaseExpression.md#dispatchglobalevent)

***

### dispose

**dispose**(): `void`

Disposes the ASTNode.

#### Returns

`void`

#### Inherited from

[BaseExpression](/en/auto-docs/free-layout-editor/classes/BaseExpression.md).[dispose](/en/auto-docs/free-layout-editor/classes/BaseExpression.md#dispose)

***

### fireChange

**fireChange**(): `void`

Triggers an update for the current node.

#### Returns

`void`

#### Inherited from

[BaseExpression](/en/auto-docs/free-layout-editor/classes/BaseExpression.md).[fireChange](/en/auto-docs/free-layout-editor/classes/BaseExpression.md#firechange)

***

### fromJSON

**fromJSON**(`json`): `void`

Deserializes the `EnumerateExpressionJSON` to the `EnumerateExpression`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `json` | [`EnumerateExpressionJSON`](/en/auto-docs/free-layout-editor/interfaces/EnumerateExpressionJSON.md) | The `EnumerateExpressionJSON` to deserialize. |

#### Returns

`void`

#### Overrides

[BaseExpression](/en/auto-docs/free-layout-editor/classes/BaseExpression.md).[fromJSON](/en/auto-docs/free-layout-editor/classes/BaseExpression.md#fromjson)

***

### getRefFields

**getRefFields**(): \[]

Get the variable fields referenced by the expression.

#### Returns

\[]

An empty array, as this expression does not reference any variables.

#### Overrides

[BaseExpression](/en/auto-docs/free-layout-editor/classes/BaseExpression.md).[getRefFields](/en/auto-docs/free-layout-editor/classes/BaseExpression.md#getreffields)

***

### refreshRefs

**refreshRefs**(): `void`

Refresh the variable references.

#### Returns

`void`

#### Inherited from

[BaseExpression](/en/auto-docs/free-layout-editor/classes/BaseExpression.md).[refreshRefs](/en/auto-docs/free-layout-editor/classes/BaseExpression.md#refreshrefs)

***

### subscribe

**subscribe**<`Data`>(`observer`, `selector?`): [`Disposable`](/en/auto-docs/free-layout-editor/interfaces/Disposable-1.md)

Listens for changes to the ASTNode.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Data` | [`EnumerateExpression`](/en/auto-docs/free-layout-editor/classes/EnumerateExpression.md) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `observer` | `ObserverOrNext`<`Data`> | The listener callback. |
| `selector?` | `SubscribeConfig`<[`EnumerateExpression`](/en/auto-docs/free-layout-editor/classes/EnumerateExpression.md), `Data`> | Listens for specified data. |

#### Returns

[`Disposable`](/en/auto-docs/free-layout-editor/interfaces/Disposable-1.md)

#### Inherited from

[BaseExpression](/en/auto-docs/free-layout-editor/classes/BaseExpression.md).[subscribe](/en/auto-docs/free-layout-editor/classes/BaseExpression.md#subscribe)

***

### toJSON

**toJSON**(): `Object`

Serialize the `EnumerateExpression` to `EnumerateExpressionJSON`.

#### Returns

`Object`

The JSON representation of `EnumerateExpression`.

| Name | Type |
| :------ | :------ |
| `enumerateFor` | `any` |
| `kind` | [`ASTKind`](/en/auto-docs/free-layout-editor/enums/ASTKind.md) |

#### Overrides

[BaseExpression](/en/auto-docs/free-layout-editor/classes/BaseExpression.md).[toJSON](/en/auto-docs/free-layout-editor/classes/BaseExpression.md#tojson)
