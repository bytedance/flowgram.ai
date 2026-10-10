# Class: BaseExpression\<JSON>

Base class for all expressions.

All other expressions should extend this class.

## Type parameters

| Name | Type |
| :------ | :------ |
| `JSON` | extends [`ASTNodeJSON`](/en/auto-docs/editor/interfaces/ASTNodeJSON.md) = `any` |

## Hierarchy

* [`ASTNode`](/en/auto-docs/editor/classes/ASTNode.md)<`JSON`>

  ↳ **`BaseExpression`**

  ↳↳ [`EnumerateExpression`](/en/auto-docs/editor/classes/EnumerateExpression.md)

  ↳↳ [`KeyPathExpression`](/en/auto-docs/editor/classes/KeyPathExpression.md)

  ↳↳ [`LegacyKeyPathExpression`](/en/auto-docs/editor/classes/LegacyKeyPathExpression.md)

  ↳↳ [`WrapArrayExpression`](/en/auto-docs/editor/classes/WrapArrayExpression.md)

## Table of contents

### Constructors

* [constructor](/en/auto-docs/editor/classes/BaseExpression.md#constructor)

### Properties

* [changeLocked](/en/auto-docs/editor/classes/BaseExpression.md#changelocked)
* [flags](/en/auto-docs/editor/classes/BaseExpression.md#flags)
* [key](/en/auto-docs/editor/classes/BaseExpression.md#key)
* [onDispose](/en/auto-docs/editor/classes/BaseExpression.md#ondispose)
* [opts](/en/auto-docs/editor/classes/BaseExpression.md#opts)
* [parent](/en/auto-docs/editor/classes/BaseExpression.md#parent)
* [refs$](/en/auto-docs/editor/classes/BaseExpression.md#refs$)
* [returnType](/en/auto-docs/editor/classes/BaseExpression.md#returntype)
* [scope](/en/auto-docs/editor/classes/BaseExpression.md#scope)
* [toDispose](/en/auto-docs/editor/classes/BaseExpression.md#todispose)
* [value$](/en/auto-docs/editor/classes/BaseExpression.md#value$)
* [kind](/en/auto-docs/editor/classes/BaseExpression.md#kind)

### Accessors

* [children](/en/auto-docs/editor/classes/BaseExpression.md#children)
* [disposed](/en/auto-docs/editor/classes/BaseExpression.md#disposed)
* [globalVariableTable](/en/auto-docs/editor/classes/BaseExpression.md#globalvariabletable)
* [hash](/en/auto-docs/editor/classes/BaseExpression.md#hash)
* [kind](/en/auto-docs/editor/classes/BaseExpression.md#kind-1)
* [parentFields](/en/auto-docs/editor/classes/BaseExpression.md#parentfields)
* [refs](/en/auto-docs/editor/classes/BaseExpression.md#refs)
* [version](/en/auto-docs/editor/classes/BaseExpression.md#version)

### Methods

* [dispatchGlobalEvent](/en/auto-docs/editor/classes/BaseExpression.md#dispatchglobalevent)
* [dispose](/en/auto-docs/editor/classes/BaseExpression.md#dispose)
* [fireChange](/en/auto-docs/editor/classes/BaseExpression.md#firechange)
* [fromJSON](/en/auto-docs/editor/classes/BaseExpression.md#fromjson)
* [getRefFields](/en/auto-docs/editor/classes/BaseExpression.md#getreffields)
* [refreshRefs](/en/auto-docs/editor/classes/BaseExpression.md#refreshrefs)
* [subscribe](/en/auto-docs/editor/classes/BaseExpression.md#subscribe)
* [toJSON](/en/auto-docs/editor/classes/BaseExpression.md#tojson)

## Constructors

### constructor

**new BaseExpression**<`JSON`>(`params`, `opts?`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `JSON` | extends [`ASTNodeJSON`](/en/auto-docs/editor/interfaces/ASTNodeJSON.md) = `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`CreateASTParams`](/en/auto-docs/editor/interfaces/CreateASTParams.md) |
| `opts?` | `any` |

#### Overrides

[ASTNode](/en/auto-docs/editor/classes/ASTNode.md).[constructor](/en/auto-docs/editor/classes/ASTNode.md#constructor)

## Properties

### changeLocked

**changeLocked**: `boolean`

Update lock.

* When set to `true`, `fireChange` will not trigger any events.
* This is useful when multiple updates are needed, and you want to avoid multiple triggers.

#### Inherited from

[ASTNode](/en/auto-docs/editor/classes/ASTNode.md).[changeLocked](/en/auto-docs/editor/classes/ASTNode.md#changelocked)

***

### flags

**flags**: [`ASTNodeFlags`](/en/auto-docs/editor/enums/ASTNodeFlags.md)

Node flags, used to record some flag information.

#### Overrides

[ASTNode](/en/auto-docs/editor/classes/ASTNode.md).[flags](/en/auto-docs/editor/classes/ASTNode.md#flags)

***

### key

`Readonly` **key**: `string`

The unique identifier of the ASTNode, which is **immutable**.

* Immutable: Once assigned, the key cannot be changed.
* Automatically generated if not specified, and cannot be changed as well.
* If a new key needs to be generated, the current ASTNode should be destroyed and a new ASTNode should be generated.

#### Inherited from

[ASTNode](/en/auto-docs/editor/classes/ASTNode.md).[key](/en/auto-docs/editor/classes/ASTNode.md#key)

***

### onDispose

**onDispose**: [`Event`](/en/auto-docs/editor/interfaces/Event-1.md)<`void`>

Callback triggered upon disposal.

#### Inherited from

[ASTNode](/en/auto-docs/editor/classes/ASTNode.md).[onDispose](/en/auto-docs/editor/classes/ASTNode.md#ondispose)

***

### opts

`Optional` `Readonly` **opts**: `any`

**`Deprecated`**

Get the injected options for the ASTNode.

Please use `@injectToAst(XXXService) declare xxxService: XXXService` to achieve external dependency injection.

#### Inherited from

[ASTNode](/en/auto-docs/editor/classes/ASTNode.md).[opts](/en/auto-docs/editor/classes/ASTNode.md#opts)

***

### parent

`Readonly` **parent**: `undefined` | [`ASTNode`](/en/auto-docs/editor/classes/ASTNode.md)<`any`>

The parent ASTNode.

#### Inherited from

[ASTNode](/en/auto-docs/editor/classes/ASTNode.md).[parent](/en/auto-docs/editor/classes/ASTNode.md#parent)

***

### refs$

**refs$**: `Observable`<`ExpressionRefs`>

An observable that emits the referenced variable fields when they change.

***

### returnType

`Abstract` **returnType**: `undefined` | [`BaseType`](/en/auto-docs/editor/classes/BaseType.md)<`any`>

The return type of the expression.

***

### scope

`Readonly` **scope**: [`Scope`](/en/auto-docs/editor/classes/Scope.md)<`Record`<`string`, `any`>>

The scope in which the ASTNode is located.

#### Inherited from

[ASTNode](/en/auto-docs/editor/classes/ASTNode.md).[scope](/en/auto-docs/editor/classes/ASTNode.md#scope)

***

### toDispose

`Readonly` **toDispose**: [`DisposableCollection`](/en/auto-docs/editor/classes/DisposableCollection.md)

List of disposal handlers for the ASTNode.

#### Inherited from

[ASTNode](/en/auto-docs/editor/classes/ASTNode.md).[toDispose](/en/auto-docs/editor/classes/ASTNode.md#todispose)

***

### value$

`Readonly` **value$**: `BehaviorSubject`<[`ASTNode`](/en/auto-docs/editor/classes/ASTNode.md)<`any`>>

AST node change Observable events, implemented based on RxJS.

* Emits the current ASTNode value upon subscription.
* Emits a new value whenever `fireChange` is called.

#### Inherited from

[ASTNode](/en/auto-docs/editor/classes/ASTNode.md).[value$](/en/auto-docs/editor/classes/ASTNode.md#value$)

***

### kind

`Static` `Readonly` **kind**: `string`

The kind of the ASTNode.

#### Inherited from

[ASTNode](/en/auto-docs/editor/classes/ASTNode.md).[kind](/en/auto-docs/editor/classes/ASTNode.md#kind)

## Accessors

### children

`get` **children**(): [`ASTNode`](/en/auto-docs/editor/classes/ASTNode.md)<`any`>\[]

Gets all child ASTNodes of the current ASTNode.

#### Returns

[`ASTNode`](/en/auto-docs/editor/classes/ASTNode.md)<`any`>\[]

#### Inherited from

ASTNode.children

***

### disposed

`get` **disposed**(): `boolean`

#### Returns

`boolean`

#### Inherited from

ASTNode.disposed

***

### globalVariableTable

`get` **globalVariableTable**(): [`IVariableTable`](/en/auto-docs/editor/interfaces/IVariableTable.md)

Get the global variable table, which is used to access referenced variables.

#### Returns

[`IVariableTable`](/en/auto-docs/editor/interfaces/IVariableTable.md)

***

### hash

`get` **hash**(): `string`

The unique hash value of the ASTNode.

* It will update when the ASTNode is updated.
* You can used to check two ASTNode are equal.

#### Returns

`string`

#### Inherited from

ASTNode.hash

***

### kind

`get` **kind**(): `string`

The type of the ASTNode.

#### Returns

`string`

#### Inherited from

ASTNode.kind

***

### parentFields

`get` **parentFields**(): [`BaseVariableField`](/en/auto-docs/editor/classes/BaseVariableField.md)<`any`>\[]

Parent variable fields, sorted from closest to farthest.

#### Returns

[`BaseVariableField`](/en/auto-docs/editor/classes/BaseVariableField.md)<`any`>\[]

***

### refs

`get` **refs**(): `ExpressionRefs`

The variable fields referenced by the expression.

#### Returns

`ExpressionRefs`

***

### version

`get` **version**(): `number`

The version value of the ASTNode.

* You can used to check whether ASTNode are updated.

#### Returns

`number`

#### Inherited from

ASTNode.version

## Methods

### dispatchGlobalEvent

**dispatchGlobalEvent**<`ActionType`>(`event`): `void`

Dispatches a global event for the current ASTNode.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `ActionType` | extends [`GlobalEventActionType`](/en/auto-docs/editor/interfaces/GlobalEventActionType.md)<`string`, `any`, [`ASTNode`](/en/auto-docs/editor/classes/ASTNode.md)<`any`>, `ActionType`> = [`GlobalEventActionType`](/en/auto-docs/editor/interfaces/GlobalEventActionType.md)<`string`, `any`, [`ASTNode`](/en/auto-docs/editor/classes/ASTNode.md)<`any`>> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `Omit`<`ActionType`, `"ast"`> | The global event. |

#### Returns

`void`

#### Inherited from

[ASTNode](/en/auto-docs/editor/classes/ASTNode.md).[dispatchGlobalEvent](/en/auto-docs/editor/classes/ASTNode.md#dispatchglobalevent)

***

### dispose

**dispose**(): `void`

Disposes the ASTNode.

#### Returns

`void`

#### Inherited from

[ASTNode](/en/auto-docs/editor/classes/ASTNode.md).[dispose](/en/auto-docs/editor/classes/ASTNode.md#dispose)

***

### fireChange

**fireChange**(): `void`

Triggers an update for the current node.

#### Returns

`void`

#### Inherited from

[ASTNode](/en/auto-docs/editor/classes/ASTNode.md).[fireChange](/en/auto-docs/editor/classes/ASTNode.md#firechange)

***

### fromJSON

`Abstract` **fromJSON**(`json`): `void`

Parses AST JSON data.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `json` | `JSON` | AST JSON data. |

#### Returns

`void`

#### Inherited from

[ASTNode](/en/auto-docs/editor/classes/ASTNode.md).[fromJSON](/en/auto-docs/editor/classes/ASTNode.md#fromjson)

***

### getRefFields

`Abstract` **getRefFields**(): `ExpressionRefs`

Get the variable fields referenced by the expression.

This method should be implemented by subclasses.

#### Returns

`ExpressionRefs`

An array of referenced variable fields.

***

### refreshRefs

**refreshRefs**(): `void`

Refresh the variable references.

#### Returns

`void`

***

### subscribe

**subscribe**<`Data`>(`observer`, `selector?`): [`Disposable`](/en/auto-docs/editor/interfaces/Disposable-1.md)

Listens for changes to the ASTNode.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Data` | [`BaseExpression`](/en/auto-docs/editor/classes/BaseExpression.md)<`JSON`> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `observer` | `ObserverOrNext`<`Data`> | The listener callback. |
| `selector?` | `SubscribeConfig`<[`BaseExpression`](/en/auto-docs/editor/classes/BaseExpression.md)<`JSON`>, `Data`> | Listens for specified data. |

#### Returns

[`Disposable`](/en/auto-docs/editor/interfaces/Disposable-1.md)

#### Inherited from

[ASTNode](/en/auto-docs/editor/classes/ASTNode.md).[subscribe](/en/auto-docs/editor/classes/ASTNode.md#subscribe)

***

### toJSON

`Abstract` **toJSON**(): `JSON`

Serializes the current ASTNode to ASTNodeJSON.

#### Returns

`JSON`

#### Inherited from

[ASTNode](/en/auto-docs/editor/classes/ASTNode.md).[toJSON](/en/auto-docs/editor/classes/ASTNode.md#tojson)
