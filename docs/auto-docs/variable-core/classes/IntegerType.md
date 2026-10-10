# Class: IntegerType

Represents an integer type.

## Hierarchy

* [`BaseType`](/auto-docs/variable-core/classes/BaseType.md)

  ↳ **`IntegerType`**

## Table of contents

### Constructors

* [constructor](/auto-docs/variable-core/classes/IntegerType.md#constructor)

### Properties

* [changeLocked](/auto-docs/variable-core/classes/IntegerType.md#changelocked)
* [flags](/auto-docs/variable-core/classes/IntegerType.md#flags)
* [key](/auto-docs/variable-core/classes/IntegerType.md#key)
* [onDispose](/auto-docs/variable-core/classes/IntegerType.md#ondispose)
* [opts](/auto-docs/variable-core/classes/IntegerType.md#opts)
* [parent](/auto-docs/variable-core/classes/IntegerType.md#parent)
* [scope](/auto-docs/variable-core/classes/IntegerType.md#scope)
* [toDispose](/auto-docs/variable-core/classes/IntegerType.md#todispose)
* [value$](/auto-docs/variable-core/classes/IntegerType.md#value$)
* [kind](/auto-docs/variable-core/classes/IntegerType.md#kind)

### Accessors

* [children](/auto-docs/variable-core/classes/IntegerType.md#children)
* [disposed](/auto-docs/variable-core/classes/IntegerType.md#disposed)
* [hash](/auto-docs/variable-core/classes/IntegerType.md#hash)
* [kind](/auto-docs/variable-core/classes/IntegerType.md#kind-1)
* [version](/auto-docs/variable-core/classes/IntegerType.md#version)

### Methods

* [dispatchGlobalEvent](/auto-docs/variable-core/classes/IntegerType.md#dispatchglobalevent)
* [dispose](/auto-docs/variable-core/classes/IntegerType.md#dispose)
* [fireChange](/auto-docs/variable-core/classes/IntegerType.md#firechange)
* [fromJSON](/auto-docs/variable-core/classes/IntegerType.md#fromjson)
* [getByKeyPath](/auto-docs/variable-core/classes/IntegerType.md#getbykeypath)
* [isTypeEqual](/auto-docs/variable-core/classes/IntegerType.md#istypeequal)
* [subscribe](/auto-docs/variable-core/classes/IntegerType.md#subscribe)
* [toJSON](/auto-docs/variable-core/classes/IntegerType.md#tojson)

## Constructors

### constructor

**new IntegerType**(`createParams`, `opts?`)

Constructor.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `createParams` | [`CreateASTParams`](/auto-docs/variable-core/interfaces/CreateASTParams.md) | Necessary parameters for creating an ASTNode. |
| `opts?` | `any` | - |

#### Inherited from

[BaseType](/auto-docs/variable-core/classes/BaseType.md).[constructor](/auto-docs/variable-core/classes/BaseType.md#constructor)

## Properties

### changeLocked

**changeLocked**: `boolean` = `false`

Update lock.

* When set to `true`, `fireChange` will not trigger any events.
* This is useful when multiple updates are needed, and you want to avoid multiple triggers.

#### Inherited from

[BaseType](/auto-docs/variable-core/classes/BaseType.md).[changeLocked](/auto-docs/variable-core/classes/BaseType.md#changelocked)

***

### flags

**flags**: [`ASTNodeFlags`](/auto-docs/variable-core/enums/ASTNodeFlags.md) = `ASTNodeFlags.BasicType`

Node flags, used to record some flag information.

#### Overrides

[BaseType](/auto-docs/variable-core/classes/BaseType.md).[flags](/auto-docs/variable-core/classes/BaseType.md#flags)

***

### key

`Readonly` **key**: `string`

The unique identifier of the ASTNode, which is **immutable**.

* Immutable: Once assigned, the key cannot be changed.
* Automatically generated if not specified, and cannot be changed as well.
* If a new key needs to be generated, the current ASTNode should be destroyed and a new ASTNode should be generated.

#### Inherited from

[BaseType](/auto-docs/variable-core/classes/BaseType.md).[key](/auto-docs/variable-core/classes/BaseType.md#key)

***

### onDispose

**onDispose**: `Event`<`void`>

Callback triggered upon disposal.

#### Inherited from

[BaseType](/auto-docs/variable-core/classes/BaseType.md).[onDispose](/auto-docs/variable-core/classes/BaseType.md#ondispose)

***

### opts

`Optional` `Readonly` **opts**: `any`

**`Deprecated`**

Get the injected options for the ASTNode.

Please use `@injectToAst(XXXService) declare xxxService: XXXService` to achieve external dependency injection.

#### Inherited from

[BaseType](/auto-docs/variable-core/classes/BaseType.md).[opts](/auto-docs/variable-core/classes/BaseType.md#opts)

***

### parent

`Readonly` **parent**: `undefined` | [`ASTNode`](/auto-docs/variable-core/classes/ASTNode.md)<`any`>

The parent ASTNode.

#### Inherited from

[BaseType](/auto-docs/variable-core/classes/BaseType.md).[parent](/auto-docs/variable-core/classes/BaseType.md#parent)

***

### scope

`Readonly` **scope**: [`Scope`](/auto-docs/variable-core/classes/Scope.md)<`Record`<`string`, `any`>>

The scope in which the ASTNode is located.

#### Inherited from

[BaseType](/auto-docs/variable-core/classes/BaseType.md).[scope](/auto-docs/variable-core/classes/BaseType.md#scope)

***

### toDispose

`Readonly` **toDispose**: `DisposableCollection`

List of disposal handlers for the ASTNode.

#### Inherited from

[BaseType](/auto-docs/variable-core/classes/BaseType.md).[toDispose](/auto-docs/variable-core/classes/BaseType.md#todispose)

***

### value$

`Readonly` **value$**: `BehaviorSubject`<[`ASTNode`](/auto-docs/variable-core/classes/ASTNode.md)<`any`>>

AST node change Observable events, implemented based on RxJS.

* Emits the current ASTNode value upon subscription.
* Emits a new value whenever `fireChange` is called.

#### Inherited from

[BaseType](/auto-docs/variable-core/classes/BaseType.md).[value$](/auto-docs/variable-core/classes/BaseType.md#value$)

***

### kind

`Static` **kind**: `string` = `ASTKind.Integer`

The kind of the ASTNode.

#### Overrides

[BaseType](/auto-docs/variable-core/classes/BaseType.md).[kind](/auto-docs/variable-core/classes/BaseType.md#kind)

## Accessors

### children

`get` **children**(): [`ASTNode`](/auto-docs/variable-core/classes/ASTNode.md)<`any`>\[]

Gets all child ASTNodes of the current ASTNode.

#### Returns

[`ASTNode`](/auto-docs/variable-core/classes/ASTNode.md)<`any`>\[]

#### Inherited from

BaseType.children

***

### disposed

`get` **disposed**(): `boolean`

#### Returns

`boolean`

#### Inherited from

BaseType.disposed

***

### hash

`get` **hash**(): `string`

The unique hash value of the ASTNode.

* It will update when the ASTNode is updated.
* You can used to check two ASTNode are equal.

#### Returns

`string`

#### Inherited from

BaseType.hash

***

### kind

`get` **kind**(): `string`

The type of the ASTNode.

#### Returns

`string`

#### Inherited from

BaseType.kind

***

### version

`get` **version**(): `number`

The version value of the ASTNode.

* You can used to check whether ASTNode are updated.

#### Returns

`number`

#### Inherited from

BaseType.version

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

[BaseType](/auto-docs/variable-core/classes/BaseType.md).[dispatchGlobalEvent](/auto-docs/variable-core/classes/BaseType.md#dispatchglobalevent)

***

### dispose

**dispose**(): `void`

Disposes the ASTNode.

#### Returns

`void`

#### Inherited from

[BaseType](/auto-docs/variable-core/classes/BaseType.md).[dispose](/auto-docs/variable-core/classes/BaseType.md#dispose)

***

### fireChange

**fireChange**(): `void`

Triggers an update for the current node.

#### Returns

`void`

#### Inherited from

[BaseType](/auto-docs/variable-core/classes/BaseType.md).[fireChange](/auto-docs/variable-core/classes/BaseType.md#firechange)

***

### fromJSON

**fromJSON**(): `void`

Deserializes the `IntegerJSON` to the `IntegerType`.

#### Returns

`void`

#### Overrides

[BaseType](/auto-docs/variable-core/classes/BaseType.md).[fromJSON](/auto-docs/variable-core/classes/BaseType.md#fromjson)

***

### getByKeyPath

**getByKeyPath**(`keyPath?`): `undefined` | [`BaseVariableField`](/auto-docs/variable-core/classes/BaseVariableField.md)<`any`>

Get a variable field by key path.

This method should be implemented by drillable types.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `keyPath` | `string`\[] | `[]` | The key path to search for. |

#### Returns

`undefined` | [`BaseVariableField`](/auto-docs/variable-core/classes/BaseVariableField.md)<`any`>

The variable field if found, otherwise `undefined`.

#### Inherited from

[BaseType](/auto-docs/variable-core/classes/BaseType.md).[getByKeyPath](/auto-docs/variable-core/classes/BaseType.md#getbykeypath)

***

### isTypeEqual

**isTypeEqual**(`targetTypeJSONOrKind?`): `boolean`

Check if the current type is equal to the target type.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `targetTypeJSONOrKind?` | `ASTNodeJSONOrKind` | The type to compare with. |

#### Returns

`boolean`

`true` if the types are equal, `false` otherwise.

#### Inherited from

[BaseType](/auto-docs/variable-core/classes/BaseType.md).[isTypeEqual](/auto-docs/variable-core/classes/BaseType.md#istypeequal)

***

### subscribe

**subscribe**<`Data`>(`observer`, `selector?`): `Disposable`

Listens for changes to the ASTNode.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Data` | [`IntegerType`](/auto-docs/variable-core/classes/IntegerType.md) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `observer` | `ObserverOrNext`<`Data`> | The listener callback. |
| `selector` | `SubscribeConfig`<[`IntegerType`](/auto-docs/variable-core/classes/IntegerType.md), `Data`> | Listens for specified data. |

#### Returns

`Disposable`

#### Inherited from

[BaseType](/auto-docs/variable-core/classes/BaseType.md).[subscribe](/auto-docs/variable-core/classes/BaseType.md#subscribe)

***

### toJSON

**toJSON**(): `Object`

Serializes the current ASTNode to ASTNodeJSON.

#### Returns

`Object`

#### Overrides

[BaseType](/auto-docs/variable-core/classes/BaseType.md).[toJSON](/auto-docs/variable-core/classes/BaseType.md#tojson)
