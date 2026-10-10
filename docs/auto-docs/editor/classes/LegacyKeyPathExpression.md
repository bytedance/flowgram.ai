# Class: LegacyKeyPathExpression\<CustomPathJSON>

**`Deprecated`**

Use `KeyPathExpression` instead.
Represents a key path expression, which is used to reference a variable by its key path.

## Type parameters

| Name | Type |
| :------ | :------ |
| `CustomPathJSON` | extends [`ASTNodeJSON`](/auto-docs/editor/interfaces/ASTNodeJSON.md) = `KeyPathExpressionJSON` |

## Hierarchy

* [`BaseExpression`](/auto-docs/editor/classes/BaseExpression.md)<`CustomPathJSON`>

  ↳ **`LegacyKeyPathExpression`**

## Table of contents

### Constructors

* [constructor](/auto-docs/editor/classes/LegacyKeyPathExpression.md#constructor)

### Properties

* [changeLocked](/auto-docs/editor/classes/LegacyKeyPathExpression.md#changelocked)
* [flags](/auto-docs/editor/classes/LegacyKeyPathExpression.md#flags)
* [key](/auto-docs/editor/classes/LegacyKeyPathExpression.md#key)
* [onDispose](/auto-docs/editor/classes/LegacyKeyPathExpression.md#ondispose)
* [opts](/auto-docs/editor/classes/LegacyKeyPathExpression.md#opts)
* [parent](/auto-docs/editor/classes/LegacyKeyPathExpression.md#parent)
* [refs$](/auto-docs/editor/classes/LegacyKeyPathExpression.md#refs$)
* [scope](/auto-docs/editor/classes/LegacyKeyPathExpression.md#scope)
* [toDispose](/auto-docs/editor/classes/LegacyKeyPathExpression.md#todispose)
* [value$](/auto-docs/editor/classes/LegacyKeyPathExpression.md#value$)
* [kind](/auto-docs/editor/classes/LegacyKeyPathExpression.md#kind)

### Accessors

* [children](/auto-docs/editor/classes/LegacyKeyPathExpression.md#children)
* [disposed](/auto-docs/editor/classes/LegacyKeyPathExpression.md#disposed)
* [globalVariableTable](/auto-docs/editor/classes/LegacyKeyPathExpression.md#globalvariabletable)
* [hash](/auto-docs/editor/classes/LegacyKeyPathExpression.md#hash)
* [keyPath](/auto-docs/editor/classes/LegacyKeyPathExpression.md#keypath)
* [kind](/auto-docs/editor/classes/LegacyKeyPathExpression.md#kind-1)
* [parentFields](/auto-docs/editor/classes/LegacyKeyPathExpression.md#parentfields)
* [refs](/auto-docs/editor/classes/LegacyKeyPathExpression.md#refs)
* [returnType](/auto-docs/editor/classes/LegacyKeyPathExpression.md#returntype)
* [version](/auto-docs/editor/classes/LegacyKeyPathExpression.md#version)

### Methods

* [dispatchGlobalEvent](/auto-docs/editor/classes/LegacyKeyPathExpression.md#dispatchglobalevent)
* [dispose](/auto-docs/editor/classes/LegacyKeyPathExpression.md#dispose)
* [fireChange](/auto-docs/editor/classes/LegacyKeyPathExpression.md#firechange)
* [fromJSON](/auto-docs/editor/classes/LegacyKeyPathExpression.md#fromjson)
* [getRefFields](/auto-docs/editor/classes/LegacyKeyPathExpression.md#getreffields)
* [refreshRefs](/auto-docs/editor/classes/LegacyKeyPathExpression.md#refreshrefs)
* [subscribe](/auto-docs/editor/classes/LegacyKeyPathExpression.md#subscribe)
* [toJSON](/auto-docs/editor/classes/LegacyKeyPathExpression.md#tojson)

## Constructors

### constructor

**new LegacyKeyPathExpression**<`CustomPathJSON`>(`params`, `opts`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `CustomPathJSON` | extends [`ASTNodeJSON`](/auto-docs/editor/interfaces/ASTNodeJSON.md) = `KeyPathExpressionJSON` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`CreateASTParams`](/auto-docs/editor/interfaces/CreateASTParams.md) |
| `opts` | `any` |

#### Overrides

[BaseExpression](/auto-docs/editor/classes/BaseExpression.md).[constructor](/auto-docs/editor/classes/BaseExpression.md#constructor)

## Properties

### changeLocked

**changeLocked**: `boolean`

Update lock.

* When set to `true`, `fireChange` will not trigger any events.
* This is useful when multiple updates are needed, and you want to avoid multiple triggers.

#### Inherited from

[BaseExpression](/auto-docs/editor/classes/BaseExpression.md).[changeLocked](/auto-docs/editor/classes/BaseExpression.md#changelocked)

***

### flags

**flags**: [`ASTNodeFlags`](/auto-docs/editor/enums/ASTNodeFlags.md)

Node flags, used to record some flag information.

#### Inherited from

[BaseExpression](/auto-docs/editor/classes/BaseExpression.md).[flags](/auto-docs/editor/classes/BaseExpression.md#flags)

***

### key

`Readonly` **key**: `string`

The unique identifier of the ASTNode, which is **immutable**.

* Immutable: Once assigned, the key cannot be changed.
* Automatically generated if not specified, and cannot be changed as well.
* If a new key needs to be generated, the current ASTNode should be destroyed and a new ASTNode should be generated.

#### Inherited from

[BaseExpression](/auto-docs/editor/classes/BaseExpression.md).[key](/auto-docs/editor/classes/BaseExpression.md#key)

***

### onDispose

**onDispose**: [`Event`](/auto-docs/editor/interfaces/Event-1.md)<`void`>

Callback triggered upon disposal.

#### Inherited from

[BaseExpression](/auto-docs/editor/classes/BaseExpression.md).[onDispose](/auto-docs/editor/classes/BaseExpression.md#ondispose)

***

### opts

`Optional` `Readonly` **opts**: `any`

**`Deprecated`**

Get the injected options for the ASTNode.

Please use `@injectToAst(XXXService) declare xxxService: XXXService` to achieve external dependency injection.

#### Inherited from

[BaseExpression](/auto-docs/editor/classes/BaseExpression.md).[opts](/auto-docs/editor/classes/BaseExpression.md#opts)

***

### parent

`Readonly` **parent**: `undefined` | [`ASTNode`](/auto-docs/editor/classes/ASTNode.md)<`any`>

The parent ASTNode.

#### Inherited from

[BaseExpression](/auto-docs/editor/classes/BaseExpression.md).[parent](/auto-docs/editor/classes/BaseExpression.md#parent)

***

### refs$

**refs$**: `Observable`<`ExpressionRefs`>

An observable that emits the referenced variable fields when they change.

#### Inherited from

[BaseExpression](/auto-docs/editor/classes/BaseExpression.md).[refs$](/auto-docs/editor/classes/BaseExpression.md#refs$)

***

### scope

`Readonly` **scope**: [`Scope`](/auto-docs/editor/classes/Scope.md)<`Record`<`string`, `any`>>

The scope in which the ASTNode is located.

#### Inherited from

[BaseExpression](/auto-docs/editor/classes/BaseExpression.md).[scope](/auto-docs/editor/classes/BaseExpression.md#scope)

***

### toDispose

`Readonly` **toDispose**: [`DisposableCollection`](/auto-docs/editor/classes/DisposableCollection.md)

List of disposal handlers for the ASTNode.

#### Inherited from

[BaseExpression](/auto-docs/editor/classes/BaseExpression.md).[toDispose](/auto-docs/editor/classes/BaseExpression.md#todispose)

***

### value$

`Readonly` **value$**: `BehaviorSubject`<[`ASTNode`](/auto-docs/editor/classes/ASTNode.md)<`any`>>

AST node change Observable events, implemented based on RxJS.

* Emits the current ASTNode value upon subscription.
* Emits a new value whenever `fireChange` is called.

#### Inherited from

[BaseExpression](/auto-docs/editor/classes/BaseExpression.md).[value$](/auto-docs/editor/classes/BaseExpression.md#value$)

***

### kind

`Static` **kind**: `string`

The kind of the ASTNode.

#### Overrides

[BaseExpression](/auto-docs/editor/classes/BaseExpression.md).[kind](/auto-docs/editor/classes/BaseExpression.md#kind)

## Accessors

### children

`get` **children**(): [`ASTNode`](/auto-docs/editor/classes/ASTNode.md)<`any`>\[]

Gets all child ASTNodes of the current ASTNode.

#### Returns

[`ASTNode`](/auto-docs/editor/classes/ASTNode.md)<`any`>\[]

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

`get` **globalVariableTable**(): [`IVariableTable`](/auto-docs/editor/interfaces/IVariableTable.md)

Get the global variable table, which is used to access referenced variables.

#### Returns

[`IVariableTable`](/auto-docs/editor/interfaces/IVariableTable.md)

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

`get` **parentFields**(): [`BaseVariableField`](/auto-docs/editor/classes/BaseVariableField.md)<`any`>\[]

Parent variable fields, sorted from closest to farthest.

#### Returns

[`BaseVariableField`](/auto-docs/editor/classes/BaseVariableField.md)<`any`>\[]

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

`get` **returnType**(): `undefined` | [`BaseType`](/auto-docs/editor/classes/BaseType.md)<`any`>

The return type of the expression.

#### Returns

`undefined` | [`BaseType`](/auto-docs/editor/classes/BaseType.md)<`any`>

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
| `ActionType` | extends [`GlobalEventActionType`](/auto-docs/editor/interfaces/GlobalEventActionType.md)<`string`, `any`, [`ASTNode`](/auto-docs/editor/classes/ASTNode.md)<`any`>, `ActionType`> = [`GlobalEventActionType`](/auto-docs/editor/interfaces/GlobalEventActionType.md)<`string`, `any`, [`ASTNode`](/auto-docs/editor/classes/ASTNode.md)<`any`>> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `Omit`<`ActionType`, `"ast"`> | The global event. |

#### Returns

`void`

#### Inherited from

[BaseExpression](/auto-docs/editor/classes/BaseExpression.md).[dispatchGlobalEvent](/auto-docs/editor/classes/BaseExpression.md#dispatchglobalevent)

***

### dispose

**dispose**(): `void`

Disposes the ASTNode.

#### Returns

`void`

#### Inherited from

[BaseExpression](/auto-docs/editor/classes/BaseExpression.md).[dispose](/auto-docs/editor/classes/BaseExpression.md#dispose)

***

### fireChange

**fireChange**(): `void`

Triggers an update for the current node.

#### Returns

`void`

#### Inherited from

[BaseExpression](/auto-docs/editor/classes/BaseExpression.md).[fireChange](/auto-docs/editor/classes/BaseExpression.md#firechange)

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

[BaseExpression](/auto-docs/editor/classes/BaseExpression.md).[fromJSON](/auto-docs/editor/classes/BaseExpression.md#fromjson)

***

### getRefFields

**getRefFields**(): [`BaseVariableField`](/auto-docs/editor/classes/BaseVariableField.md)<`any`>\[]

Get the variable fields referenced by the expression.

#### Returns

[`BaseVariableField`](/auto-docs/editor/classes/BaseVariableField.md)<`any`>\[]

An array of referenced variable fields.

#### Overrides

[BaseExpression](/auto-docs/editor/classes/BaseExpression.md).[getRefFields](/auto-docs/editor/classes/BaseExpression.md#getreffields)

***

### refreshRefs

**refreshRefs**(): `void`

Refresh the variable references.

#### Returns

`void`

#### Inherited from

[BaseExpression](/auto-docs/editor/classes/BaseExpression.md).[refreshRefs](/auto-docs/editor/classes/BaseExpression.md#refreshrefs)

***

### subscribe

**subscribe**<`Data`>(`observer`, `selector?`): [`Disposable`](/auto-docs/editor/interfaces/Disposable-1.md)

Listens for changes to the ASTNode.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Data` | [`LegacyKeyPathExpression`](/auto-docs/editor/classes/LegacyKeyPathExpression.md)<`CustomPathJSON`> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `observer` | `ObserverOrNext`<`Data`> | The listener callback. |
| `selector?` | `SubscribeConfig`<[`LegacyKeyPathExpression`](/auto-docs/editor/classes/LegacyKeyPathExpression.md)<`CustomPathJSON`>, `Data`> | Listens for specified data. |

#### Returns

[`Disposable`](/auto-docs/editor/interfaces/Disposable-1.md)

#### Inherited from

[BaseExpression](/auto-docs/editor/classes/BaseExpression.md).[subscribe](/auto-docs/editor/classes/BaseExpression.md#subscribe)

***

### toJSON

**toJSON**(): `CustomPathJSON`

Serialize the `KeyPathExpression` to `KeyPathExpressionJSON`.

#### Returns

`CustomPathJSON`

The JSON representation of `KeyPathExpression`.

#### Overrides

[BaseExpression](/auto-docs/editor/classes/BaseExpression.md).[toJSON](/auto-docs/editor/classes/BaseExpression.md#tojson)
