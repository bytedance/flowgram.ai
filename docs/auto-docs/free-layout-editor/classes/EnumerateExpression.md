# Class: EnumerateExpression

Represents an enumeration expression, which iterates over a list and returns the type of the enumerated variable.

## Hierarchy

* [`BaseExpression`](/auto-docs/free-layout-editor/classes/BaseExpression.md)<[`EnumerateExpressionJSON`](/auto-docs/free-layout-editor/interfaces/EnumerateExpressionJSON.md)>

  ↳ **`EnumerateExpression`**

## Table of contents

### Constructors

* [constructor](/auto-docs/free-layout-editor/classes/EnumerateExpression.md#constructor)

### Properties

* [changeLocked](/auto-docs/free-layout-editor/classes/EnumerateExpression.md#changelocked)
* [flags](/auto-docs/free-layout-editor/classes/EnumerateExpression.md#flags)
* [key](/auto-docs/free-layout-editor/classes/EnumerateExpression.md#key)
* [onDispose](/auto-docs/free-layout-editor/classes/EnumerateExpression.md#ondispose)
* [opts](/auto-docs/free-layout-editor/classes/EnumerateExpression.md#opts)
* [parent](/auto-docs/free-layout-editor/classes/EnumerateExpression.md#parent)
* [refs$](/auto-docs/free-layout-editor/classes/EnumerateExpression.md#refs$)
* [scope](/auto-docs/free-layout-editor/classes/EnumerateExpression.md#scope)
* [toDispose](/auto-docs/free-layout-editor/classes/EnumerateExpression.md#todispose)
* [value$](/auto-docs/free-layout-editor/classes/EnumerateExpression.md#value$)
* [kind](/auto-docs/free-layout-editor/classes/EnumerateExpression.md#kind)

### Accessors

* [children](/auto-docs/free-layout-editor/classes/EnumerateExpression.md#children)
* [disposed](/auto-docs/free-layout-editor/classes/EnumerateExpression.md#disposed)
* [enumerateFor](/auto-docs/free-layout-editor/classes/EnumerateExpression.md#enumeratefor)
* [globalVariableTable](/auto-docs/free-layout-editor/classes/EnumerateExpression.md#globalvariabletable)
* [hash](/auto-docs/free-layout-editor/classes/EnumerateExpression.md#hash)
* [kind](/auto-docs/free-layout-editor/classes/EnumerateExpression.md#kind-1)
* [parentFields](/auto-docs/free-layout-editor/classes/EnumerateExpression.md#parentfields)
* [refs](/auto-docs/free-layout-editor/classes/EnumerateExpression.md#refs)
* [returnType](/auto-docs/free-layout-editor/classes/EnumerateExpression.md#returntype)
* [version](/auto-docs/free-layout-editor/classes/EnumerateExpression.md#version)

### Methods

* [dispatchGlobalEvent](/auto-docs/free-layout-editor/classes/EnumerateExpression.md#dispatchglobalevent)
* [dispose](/auto-docs/free-layout-editor/classes/EnumerateExpression.md#dispose)
* [fireChange](/auto-docs/free-layout-editor/classes/EnumerateExpression.md#firechange)
* [fromJSON](/auto-docs/free-layout-editor/classes/EnumerateExpression.md#fromjson)
* [getRefFields](/auto-docs/free-layout-editor/classes/EnumerateExpression.md#getreffields)
* [refreshRefs](/auto-docs/free-layout-editor/classes/EnumerateExpression.md#refreshrefs)
* [subscribe](/auto-docs/free-layout-editor/classes/EnumerateExpression.md#subscribe)
* [toJSON](/auto-docs/free-layout-editor/classes/EnumerateExpression.md#tojson)

## Constructors

### constructor

**new EnumerateExpression**(`params`, `opts?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`CreateASTParams`](/auto-docs/free-layout-editor/interfaces/CreateASTParams.md) |
| `opts?` | `any` |

#### Inherited from

[BaseExpression](/auto-docs/free-layout-editor/classes/BaseExpression.md).[constructor](/auto-docs/free-layout-editor/classes/BaseExpression.md#constructor)

## Properties

### changeLocked

**changeLocked**: `boolean`

Update lock.

* When set to `true`, `fireChange` will not trigger any events.
* This is useful when multiple updates are needed, and you want to avoid multiple triggers.

#### Inherited from

[BaseExpression](/auto-docs/free-layout-editor/classes/BaseExpression.md).[changeLocked](/auto-docs/free-layout-editor/classes/BaseExpression.md#changelocked)

***

### flags

**flags**: [`ASTNodeFlags`](/auto-docs/free-layout-editor/enums/ASTNodeFlags.md)

Node flags, used to record some flag information.

#### Inherited from

[BaseExpression](/auto-docs/free-layout-editor/classes/BaseExpression.md).[flags](/auto-docs/free-layout-editor/classes/BaseExpression.md#flags)

***

### key

`Readonly` **key**: `string`

The unique identifier of the ASTNode, which is **immutable**.

* Immutable: Once assigned, the key cannot be changed.
* Automatically generated if not specified, and cannot be changed as well.
* If a new key needs to be generated, the current ASTNode should be destroyed and a new ASTNode should be generated.

#### Inherited from

[BaseExpression](/auto-docs/free-layout-editor/classes/BaseExpression.md).[key](/auto-docs/free-layout-editor/classes/BaseExpression.md#key)

***

### onDispose

**onDispose**: [`Event`](/auto-docs/free-layout-editor/interfaces/Event-1.md)<`void`>

Callback triggered upon disposal.

#### Inherited from

[BaseExpression](/auto-docs/free-layout-editor/classes/BaseExpression.md).[onDispose](/auto-docs/free-layout-editor/classes/BaseExpression.md#ondispose)

***

### opts

`Optional` `Readonly` **opts**: `any`

**`Deprecated`**

Get the injected options for the ASTNode.

Please use `@injectToAst(XXXService) declare xxxService: XXXService` to achieve external dependency injection.

#### Inherited from

[BaseExpression](/auto-docs/free-layout-editor/classes/BaseExpression.md).[opts](/auto-docs/free-layout-editor/classes/BaseExpression.md#opts)

***

### parent

`Readonly` **parent**: `undefined` | [`ASTNode`](/auto-docs/free-layout-editor/classes/ASTNode.md)<`any`>

The parent ASTNode.

#### Inherited from

[BaseExpression](/auto-docs/free-layout-editor/classes/BaseExpression.md).[parent](/auto-docs/free-layout-editor/classes/BaseExpression.md#parent)

***

### refs$

**refs$**: `Observable`<`ExpressionRefs`>

An observable that emits the referenced variable fields when they change.

#### Inherited from

[BaseExpression](/auto-docs/free-layout-editor/classes/BaseExpression.md).[refs$](/auto-docs/free-layout-editor/classes/BaseExpression.md#refs$)

***

### scope

`Readonly` **scope**: [`Scope`](/auto-docs/free-layout-editor/classes/Scope.md)<`Record`<`string`, `any`>>

The scope in which the ASTNode is located.

#### Inherited from

[BaseExpression](/auto-docs/free-layout-editor/classes/BaseExpression.md).[scope](/auto-docs/free-layout-editor/classes/BaseExpression.md#scope)

***

### toDispose

`Readonly` **toDispose**: [`DisposableCollection`](/auto-docs/free-layout-editor/classes/DisposableCollection.md)

List of disposal handlers for the ASTNode.

#### Inherited from

[BaseExpression](/auto-docs/free-layout-editor/classes/BaseExpression.md).[toDispose](/auto-docs/free-layout-editor/classes/BaseExpression.md#todispose)

***

### value$

`Readonly` **value$**: `BehaviorSubject`<[`ASTNode`](/auto-docs/free-layout-editor/classes/ASTNode.md)<`any`>>

AST node change Observable events, implemented based on RxJS.

* Emits the current ASTNode value upon subscription.
* Emits a new value whenever `fireChange` is called.

#### Inherited from

[BaseExpression](/auto-docs/free-layout-editor/classes/BaseExpression.md).[value$](/auto-docs/free-layout-editor/classes/BaseExpression.md#value$)

***

### kind

`Static` **kind**: `string`

The kind of the ASTNode.

#### Overrides

[BaseExpression](/auto-docs/free-layout-editor/classes/BaseExpression.md).[kind](/auto-docs/free-layout-editor/classes/BaseExpression.md#kind)

## Accessors

### children

`get` **children**(): [`ASTNode`](/auto-docs/free-layout-editor/classes/ASTNode.md)<`any`>\[]

Gets all child ASTNodes of the current ASTNode.

#### Returns

[`ASTNode`](/auto-docs/free-layout-editor/classes/ASTNode.md)<`any`>\[]

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

`get` **enumerateFor**(): `undefined` | [`BaseExpression`](/auto-docs/free-layout-editor/classes/BaseExpression.md)<`any`>

The expression to be enumerated.

#### Returns

`undefined` | [`BaseExpression`](/auto-docs/free-layout-editor/classes/BaseExpression.md)<`any`>

***

### globalVariableTable

`get` **globalVariableTable**(): [`IVariableTable`](/auto-docs/free-layout-editor/interfaces/IVariableTable.md)

Get the global variable table, which is used to access referenced variables.

#### Returns

[`IVariableTable`](/auto-docs/free-layout-editor/interfaces/IVariableTable.md)

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

`get` **parentFields**(): [`BaseVariableField`](/auto-docs/free-layout-editor/classes/BaseVariableField.md)<`any`>\[]

Parent variable fields, sorted from closest to farthest.

#### Returns

[`BaseVariableField`](/auto-docs/free-layout-editor/classes/BaseVariableField.md)<`any`>\[]

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

`get` **returnType**(): `undefined` | [`BaseType`](/auto-docs/free-layout-editor/classes/BaseType.md)<`any`>

The return type of the expression.

#### Returns

`undefined` | [`BaseType`](/auto-docs/free-layout-editor/classes/BaseType.md)<`any`>

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
| `ActionType` | extends [`GlobalEventActionType`](/auto-docs/free-layout-editor/interfaces/GlobalEventActionType.md)<`string`, `any`, [`ASTNode`](/auto-docs/free-layout-editor/classes/ASTNode.md)<`any`>, `ActionType`> = [`GlobalEventActionType`](/auto-docs/free-layout-editor/interfaces/GlobalEventActionType.md)<`string`, `any`, [`ASTNode`](/auto-docs/free-layout-editor/classes/ASTNode.md)<`any`>> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `Omit`<`ActionType`, `"ast"`> | The global event. |

#### Returns

`void`

#### Inherited from

[BaseExpression](/auto-docs/free-layout-editor/classes/BaseExpression.md).[dispatchGlobalEvent](/auto-docs/free-layout-editor/classes/BaseExpression.md#dispatchglobalevent)

***

### dispose

**dispose**(): `void`

Disposes the ASTNode.

#### Returns

`void`

#### Inherited from

[BaseExpression](/auto-docs/free-layout-editor/classes/BaseExpression.md).[dispose](/auto-docs/free-layout-editor/classes/BaseExpression.md#dispose)

***

### fireChange

**fireChange**(): `void`

Triggers an update for the current node.

#### Returns

`void`

#### Inherited from

[BaseExpression](/auto-docs/free-layout-editor/classes/BaseExpression.md).[fireChange](/auto-docs/free-layout-editor/classes/BaseExpression.md#firechange)

***

### fromJSON

**fromJSON**(`json`): `void`

Deserializes the `EnumerateExpressionJSON` to the `EnumerateExpression`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `json` | [`EnumerateExpressionJSON`](/auto-docs/free-layout-editor/interfaces/EnumerateExpressionJSON.md) | The `EnumerateExpressionJSON` to deserialize. |

#### Returns

`void`

#### Overrides

[BaseExpression](/auto-docs/free-layout-editor/classes/BaseExpression.md).[fromJSON](/auto-docs/free-layout-editor/classes/BaseExpression.md#fromjson)

***

### getRefFields

**getRefFields**(): \[]

Get the variable fields referenced by the expression.

#### Returns

\[]

An empty array, as this expression does not reference any variables.

#### Overrides

[BaseExpression](/auto-docs/free-layout-editor/classes/BaseExpression.md).[getRefFields](/auto-docs/free-layout-editor/classes/BaseExpression.md#getreffields)

***

### refreshRefs

**refreshRefs**(): `void`

Refresh the variable references.

#### Returns

`void`

#### Inherited from

[BaseExpression](/auto-docs/free-layout-editor/classes/BaseExpression.md).[refreshRefs](/auto-docs/free-layout-editor/classes/BaseExpression.md#refreshrefs)

***

### subscribe

**subscribe**<`Data`>(`observer`, `selector?`): [`Disposable`](/auto-docs/free-layout-editor/interfaces/Disposable-1.md)

Listens for changes to the ASTNode.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Data` | [`EnumerateExpression`](/auto-docs/free-layout-editor/classes/EnumerateExpression.md) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `observer` | `ObserverOrNext`<`Data`> | The listener callback. |
| `selector?` | `SubscribeConfig`<[`EnumerateExpression`](/auto-docs/free-layout-editor/classes/EnumerateExpression.md), `Data`> | Listens for specified data. |

#### Returns

[`Disposable`](/auto-docs/free-layout-editor/interfaces/Disposable-1.md)

#### Inherited from

[BaseExpression](/auto-docs/free-layout-editor/classes/BaseExpression.md).[subscribe](/auto-docs/free-layout-editor/classes/BaseExpression.md#subscribe)

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
| `kind` | [`ASTKind`](/auto-docs/free-layout-editor/enums/ASTKind.md) |

#### Overrides

[BaseExpression](/auto-docs/free-layout-editor/classes/BaseExpression.md).[toJSON](/auto-docs/free-layout-editor/classes/BaseExpression.md#tojson)
