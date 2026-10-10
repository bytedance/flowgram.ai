# Class: ObjectType

Represents an object type.

## Hierarchy

* [`BaseType`](/en/auto-docs/free-layout-editor/classes/BaseType.md)<[`ObjectJSON`](/en/auto-docs/free-layout-editor/interfaces/ObjectJSON.md)>

  ↳ **`ObjectType`**

## Table of contents

### Constructors

* [constructor](/en/auto-docs/free-layout-editor/classes/ObjectType.md#constructor)

### Properties

* [changeLocked](/en/auto-docs/free-layout-editor/classes/ObjectType.md#changelocked)
* [flags](/en/auto-docs/free-layout-editor/classes/ObjectType.md#flags)
* [key](/en/auto-docs/free-layout-editor/classes/ObjectType.md#key)
* [onDispose](/en/auto-docs/free-layout-editor/classes/ObjectType.md#ondispose)
* [opts](/en/auto-docs/free-layout-editor/classes/ObjectType.md#opts)
* [parent](/en/auto-docs/free-layout-editor/classes/ObjectType.md#parent)
* [properties](/en/auto-docs/free-layout-editor/classes/ObjectType.md#properties)
* [propertyTable](/en/auto-docs/free-layout-editor/classes/ObjectType.md#propertytable)
* [scope](/en/auto-docs/free-layout-editor/classes/ObjectType.md#scope)
* [toDispose](/en/auto-docs/free-layout-editor/classes/ObjectType.md#todispose)
* [value$](/en/auto-docs/free-layout-editor/classes/ObjectType.md#value$)
* [kind](/en/auto-docs/free-layout-editor/classes/ObjectType.md#kind)

### Accessors

* [children](/en/auto-docs/free-layout-editor/classes/ObjectType.md#children)
* [disposed](/en/auto-docs/free-layout-editor/classes/ObjectType.md#disposed)
* [hash](/en/auto-docs/free-layout-editor/classes/ObjectType.md#hash)
* [kind](/en/auto-docs/free-layout-editor/classes/ObjectType.md#kind-1)
* [version](/en/auto-docs/free-layout-editor/classes/ObjectType.md#version)

### Methods

* [dispatchGlobalEvent](/en/auto-docs/free-layout-editor/classes/ObjectType.md#dispatchglobalevent)
* [dispose](/en/auto-docs/free-layout-editor/classes/ObjectType.md#dispose)
* [fireChange](/en/auto-docs/free-layout-editor/classes/ObjectType.md#firechange)
* [fromJSON](/en/auto-docs/free-layout-editor/classes/ObjectType.md#fromjson)
* [getByKeyPath](/en/auto-docs/free-layout-editor/classes/ObjectType.md#getbykeypath)
* [isTypeEqual](/en/auto-docs/free-layout-editor/classes/ObjectType.md#istypeequal)
* [subscribe](/en/auto-docs/free-layout-editor/classes/ObjectType.md#subscribe)
* [toJSON](/en/auto-docs/free-layout-editor/classes/ObjectType.md#tojson)

## Constructors

### constructor

**new ObjectType**(`createParams`, `opts?`)

Constructor.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `createParams` | [`CreateASTParams`](/en/auto-docs/free-layout-editor/interfaces/CreateASTParams.md) | Necessary parameters for creating an ASTNode. |
| `opts?` | `any` | - |

#### Inherited from

[BaseType](/en/auto-docs/free-layout-editor/classes/BaseType.md).[constructor](/en/auto-docs/free-layout-editor/classes/BaseType.md#constructor)

## Properties

### changeLocked

**changeLocked**: `boolean`

Update lock.

* When set to `true`, `fireChange` will not trigger any events.
* This is useful when multiple updates are needed, and you want to avoid multiple triggers.

#### Inherited from

[BaseType](/en/auto-docs/free-layout-editor/classes/BaseType.md).[changeLocked](/en/auto-docs/free-layout-editor/classes/BaseType.md#changelocked)

***

### flags

**flags**: [`ASTNodeFlags`](/en/auto-docs/free-layout-editor/enums/ASTNodeFlags.md)

Node flags, used to record some flag information.

#### Overrides

[BaseType](/en/auto-docs/free-layout-editor/classes/BaseType.md).[flags](/en/auto-docs/free-layout-editor/classes/BaseType.md#flags)

***

### key

`Readonly` **key**: `string`

The unique identifier of the ASTNode, which is **immutable**.

* Immutable: Once assigned, the key cannot be changed.
* Automatically generated if not specified, and cannot be changed as well.
* If a new key needs to be generated, the current ASTNode should be destroyed and a new ASTNode should be generated.

#### Inherited from

[BaseType](/en/auto-docs/free-layout-editor/classes/BaseType.md).[key](/en/auto-docs/free-layout-editor/classes/BaseType.md#key)

***

### onDispose

**onDispose**: [`Event`](/en/auto-docs/free-layout-editor/interfaces/Event-1.md)<`void`>

Callback triggered upon disposal.

#### Inherited from

[BaseType](/en/auto-docs/free-layout-editor/classes/BaseType.md).[onDispose](/en/auto-docs/free-layout-editor/classes/BaseType.md#ondispose)

***

### opts

`Optional` `Readonly` **opts**: `any`

**`Deprecated`**

Get the injected options for the ASTNode.

Please use `@injectToAst(XXXService) declare xxxService: XXXService` to achieve external dependency injection.

#### Inherited from

[BaseType](/en/auto-docs/free-layout-editor/classes/BaseType.md).[opts](/en/auto-docs/free-layout-editor/classes/BaseType.md#opts)

***

### parent

`Readonly` **parent**: `undefined` | [`ASTNode`](/en/auto-docs/free-layout-editor/classes/ASTNode.md)<`any`>

The parent ASTNode.

#### Inherited from

[BaseType](/en/auto-docs/free-layout-editor/classes/BaseType.md).[parent](/en/auto-docs/free-layout-editor/classes/BaseType.md#parent)

***

### properties

**properties**: [`Property`](/en/auto-docs/free-layout-editor/classes/Property.md)<`any`>\[]

An array of `Property` instances.

***

### propertyTable

**propertyTable**: `Map`<`string`, [`Property`](/en/auto-docs/free-layout-editor/classes/Property.md)<`any`>>

A map of property keys to `Property` instances.

***

### scope

`Readonly` **scope**: [`Scope`](/en/auto-docs/free-layout-editor/classes/Scope.md)<`Record`<`string`, `any`>>

The scope in which the ASTNode is located.

#### Inherited from

[BaseType](/en/auto-docs/free-layout-editor/classes/BaseType.md).[scope](/en/auto-docs/free-layout-editor/classes/BaseType.md#scope)

***

### toDispose

`Readonly` **toDispose**: [`DisposableCollection`](/en/auto-docs/free-layout-editor/classes/DisposableCollection.md)

List of disposal handlers for the ASTNode.

#### Inherited from

[BaseType](/en/auto-docs/free-layout-editor/classes/BaseType.md).[toDispose](/en/auto-docs/free-layout-editor/classes/BaseType.md#todispose)

***

### value$

`Readonly` **value$**: `BehaviorSubject`<[`ASTNode`](/en/auto-docs/free-layout-editor/classes/ASTNode.md)<`any`>>

AST node change Observable events, implemented based on RxJS.

* Emits the current ASTNode value upon subscription.
* Emits a new value whenever `fireChange` is called.

#### Inherited from

[BaseType](/en/auto-docs/free-layout-editor/classes/BaseType.md).[value$](/en/auto-docs/free-layout-editor/classes/BaseType.md#value$)

***

### kind

`Static` **kind**: `string`

The kind of the ASTNode.

#### Overrides

[BaseType](/en/auto-docs/free-layout-editor/classes/BaseType.md).[kind](/en/auto-docs/free-layout-editor/classes/BaseType.md#kind)

## Accessors

### children

`get` **children**(): [`ASTNode`](/en/auto-docs/free-layout-editor/classes/ASTNode.md)<`any`>\[]

Gets all child ASTNodes of the current ASTNode.

#### Returns

[`ASTNode`](/en/auto-docs/free-layout-editor/classes/ASTNode.md)<`any`>\[]

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
| `ActionType` | extends [`GlobalEventActionType`](/en/auto-docs/free-layout-editor/interfaces/GlobalEventActionType.md)<`string`, `any`, [`ASTNode`](/en/auto-docs/free-layout-editor/classes/ASTNode.md)<`any`>, `ActionType`> = [`GlobalEventActionType`](/en/auto-docs/free-layout-editor/interfaces/GlobalEventActionType.md)<`string`, `any`, [`ASTNode`](/en/auto-docs/free-layout-editor/classes/ASTNode.md)<`any`>> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `Omit`<`ActionType`, `"ast"`> | The global event. |

#### Returns

`void`

#### Inherited from

[BaseType](/en/auto-docs/free-layout-editor/classes/BaseType.md).[dispatchGlobalEvent](/en/auto-docs/free-layout-editor/classes/BaseType.md#dispatchglobalevent)

***

### dispose

**dispose**(): `void`

Disposes the ASTNode.

#### Returns

`void`

#### Inherited from

[BaseType](/en/auto-docs/free-layout-editor/classes/BaseType.md).[dispose](/en/auto-docs/free-layout-editor/classes/BaseType.md#dispose)

***

### fireChange

**fireChange**(): `void`

Triggers an update for the current node.

#### Returns

`void`

#### Inherited from

[BaseType](/en/auto-docs/free-layout-editor/classes/BaseType.md).[fireChange](/en/auto-docs/free-layout-editor/classes/BaseType.md#firechange)

***

### fromJSON

**fromJSON**(`json`): `void`

Deserializes the `ObjectJSON` to the `ObjectType`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `json` | [`ObjectJSON`](/en/auto-docs/free-layout-editor/interfaces/ObjectJSON.md)<`any`> | The `ObjectJSON` to deserialize. |

#### Returns

`void`

#### Overrides

[BaseType](/en/auto-docs/free-layout-editor/classes/BaseType.md).[fromJSON](/en/auto-docs/free-layout-editor/classes/BaseType.md#fromjson)

***

### getByKeyPath

**getByKeyPath**(`keyPath`): `undefined` | [`Property`](/en/auto-docs/free-layout-editor/classes/Property.md)<`any`>

Get a variable field by key path.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `keyPath` | `string`\[] | The key path to search for. |

#### Returns

`undefined` | [`Property`](/en/auto-docs/free-layout-editor/classes/Property.md)<`any`>

The variable field if found, otherwise `undefined`.

#### Overrides

[BaseType](/en/auto-docs/free-layout-editor/classes/BaseType.md).[getByKeyPath](/en/auto-docs/free-layout-editor/classes/BaseType.md#getbykeypath)

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

#### Overrides

[BaseType](/en/auto-docs/free-layout-editor/classes/BaseType.md).[isTypeEqual](/en/auto-docs/free-layout-editor/classes/BaseType.md#istypeequal)

***

### subscribe

**subscribe**<`Data`>(`observer`, `selector?`): [`Disposable`](/en/auto-docs/free-layout-editor/interfaces/Disposable-1.md)

Listens for changes to the ASTNode.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Data` | [`ObjectType`](/en/auto-docs/free-layout-editor/classes/ObjectType.md) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `observer` | `ObserverOrNext`<`Data`> | The listener callback. |
| `selector?` | `SubscribeConfig`<[`ObjectType`](/en/auto-docs/free-layout-editor/classes/ObjectType.md), `Data`> | Listens for specified data. |

#### Returns

[`Disposable`](/en/auto-docs/free-layout-editor/interfaces/Disposable-1.md)

#### Inherited from

[BaseType](/en/auto-docs/free-layout-editor/classes/BaseType.md).[subscribe](/en/auto-docs/free-layout-editor/classes/BaseType.md#subscribe)

***

### toJSON

**toJSON**(): `Object`

Serialize the `ObjectType` to `ObjectJSON`.

#### Returns

`Object`

The JSON representation of `ObjectType`.

| Name | Type |
| :------ | :------ |
| `properties` | `BaseVariableFieldJSON`<`any`>\[] |

#### Overrides

[BaseType](/en/auto-docs/free-layout-editor/classes/BaseType.md).[toJSON](/en/auto-docs/free-layout-editor/classes/BaseType.md#tojson)
