# Class: MapNode

Represents a map of nodes.

## Hierarchy

* [`ASTNode`](/auto-docs/variable-plugin/classes/ASTNode.md)<[`MapNodeJSON`](/auto-docs/variable-plugin/interfaces/MapNodeJSON.md)>

  ↳ **`MapNode`**

## Table of contents

### Constructors

* [constructor](/auto-docs/variable-plugin/classes/MapNode.md#constructor)

### Properties

* [changeLocked](/auto-docs/variable-plugin/classes/MapNode.md#changelocked)
* [flags](/auto-docs/variable-plugin/classes/MapNode.md#flags)
* [key](/auto-docs/variable-plugin/classes/MapNode.md#key)
* [onDispose](/auto-docs/variable-plugin/classes/MapNode.md#ondispose)
* [opts](/auto-docs/variable-plugin/classes/MapNode.md#opts)
* [parent](/auto-docs/variable-plugin/classes/MapNode.md#parent)
* [scope](/auto-docs/variable-plugin/classes/MapNode.md#scope)
* [toDispose](/auto-docs/variable-plugin/classes/MapNode.md#todispose)
* [value$](/auto-docs/variable-plugin/classes/MapNode.md#value$)
* [kind](/auto-docs/variable-plugin/classes/MapNode.md#kind)

### Accessors

* [children](/auto-docs/variable-plugin/classes/MapNode.md#children)
* [disposed](/auto-docs/variable-plugin/classes/MapNode.md#disposed)
* [hash](/auto-docs/variable-plugin/classes/MapNode.md#hash)
* [kind](/auto-docs/variable-plugin/classes/MapNode.md#kind-1)
* [version](/auto-docs/variable-plugin/classes/MapNode.md#version)

### Methods

* [dispatchGlobalEvent](/auto-docs/variable-plugin/classes/MapNode.md#dispatchglobalevent)
* [dispose](/auto-docs/variable-plugin/classes/MapNode.md#dispose)
* [fireChange](/auto-docs/variable-plugin/classes/MapNode.md#firechange)
* [fromJSON](/auto-docs/variable-plugin/classes/MapNode.md#fromjson)
* [get](/auto-docs/variable-plugin/classes/MapNode.md#get)
* [remove](/auto-docs/variable-plugin/classes/MapNode.md#remove)
* [set](/auto-docs/variable-plugin/classes/MapNode.md#set)
* [subscribe](/auto-docs/variable-plugin/classes/MapNode.md#subscribe)
* [toJSON](/auto-docs/variable-plugin/classes/MapNode.md#tojson)

## Constructors

### constructor

**new MapNode**(`createParams`, `opts?`)

Constructor.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `createParams` | [`CreateASTParams`](/auto-docs/variable-plugin/interfaces/CreateASTParams.md) | Necessary parameters for creating an ASTNode. |
| `opts?` | `any` | - |

#### Inherited from

[ASTNode](/auto-docs/variable-plugin/classes/ASTNode.md).[constructor](/auto-docs/variable-plugin/classes/ASTNode.md#constructor)

## Properties

### changeLocked

**changeLocked**: `boolean`

Update lock.

* When set to `true`, `fireChange` will not trigger any events.
* This is useful when multiple updates are needed, and you want to avoid multiple triggers.

#### Inherited from

[ASTNode](/auto-docs/variable-plugin/classes/ASTNode.md).[changeLocked](/auto-docs/variable-plugin/classes/ASTNode.md#changelocked)

***

### flags

`Readonly` **flags**: `number`

Node flags, used to record some flag information.

#### Inherited from

[ASTNode](/auto-docs/variable-plugin/classes/ASTNode.md).[flags](/auto-docs/variable-plugin/classes/ASTNode.md#flags)

***

### key

`Readonly` **key**: `string`

The unique identifier of the ASTNode, which is **immutable**.

* Immutable: Once assigned, the key cannot be changed.
* Automatically generated if not specified, and cannot be changed as well.
* If a new key needs to be generated, the current ASTNode should be destroyed and a new ASTNode should be generated.

#### Inherited from

[ASTNode](/auto-docs/variable-plugin/classes/ASTNode.md).[key](/auto-docs/variable-plugin/classes/ASTNode.md#key)

***

### onDispose

**onDispose**: `Event`<`void`>

Callback triggered upon disposal.

#### Inherited from

[ASTNode](/auto-docs/variable-plugin/classes/ASTNode.md).[onDispose](/auto-docs/variable-plugin/classes/ASTNode.md#ondispose)

***

### opts

`Optional` `Readonly` **opts**: `any`

**`Deprecated`**

Get the injected options for the ASTNode.

Please use `@injectToAst(XXXService) declare xxxService: XXXService` to achieve external dependency injection.

#### Inherited from

[ASTNode](/auto-docs/variable-plugin/classes/ASTNode.md).[opts](/auto-docs/variable-plugin/classes/ASTNode.md#opts)

***

### parent

`Readonly` **parent**: `undefined` | [`ASTNode`](/auto-docs/variable-plugin/classes/ASTNode.md)<`any`>

The parent ASTNode.

#### Inherited from

[ASTNode](/auto-docs/variable-plugin/classes/ASTNode.md).[parent](/auto-docs/variable-plugin/classes/ASTNode.md#parent)

***

### scope

`Readonly` **scope**: [`Scope`](/auto-docs/variable-plugin/classes/Scope.md)<`Record`<`string`, `any`>>

The scope in which the ASTNode is located.

#### Inherited from

[ASTNode](/auto-docs/variable-plugin/classes/ASTNode.md).[scope](/auto-docs/variable-plugin/classes/ASTNode.md#scope)

***

### toDispose

`Readonly` **toDispose**: `DisposableCollection`

List of disposal handlers for the ASTNode.

#### Inherited from

[ASTNode](/auto-docs/variable-plugin/classes/ASTNode.md).[toDispose](/auto-docs/variable-plugin/classes/ASTNode.md#todispose)

***

### value$

`Readonly` **value$**: `BehaviorSubject`<[`ASTNode`](/auto-docs/variable-plugin/classes/ASTNode.md)<`any`>>

AST node change Observable events, implemented based on RxJS.

* Emits the current ASTNode value upon subscription.
* Emits a new value whenever `fireChange` is called.

#### Inherited from

[ASTNode](/auto-docs/variable-plugin/classes/ASTNode.md).[value$](/auto-docs/variable-plugin/classes/ASTNode.md#value$)

***

### kind

`Static` **kind**: `string`

The kind of the ASTNode.

#### Overrides

[ASTNode](/auto-docs/variable-plugin/classes/ASTNode.md).[kind](/auto-docs/variable-plugin/classes/ASTNode.md#kind)

## Accessors

### children

`get` **children**(): [`ASTNode`](/auto-docs/variable-plugin/classes/ASTNode.md)<`any`>\[]

Gets all child ASTNodes of the current ASTNode.

#### Returns

[`ASTNode`](/auto-docs/variable-plugin/classes/ASTNode.md)<`any`>\[]

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
| `ActionType` | extends [`GlobalEventActionType`](/auto-docs/variable-plugin/interfaces/GlobalEventActionType.md)<`string`, `any`, [`ASTNode`](/auto-docs/variable-plugin/classes/ASTNode.md)<`any`>, `ActionType`> = [`GlobalEventActionType`](/auto-docs/variable-plugin/interfaces/GlobalEventActionType.md)<`string`, `any`, [`ASTNode`](/auto-docs/variable-plugin/classes/ASTNode.md)<`any`>> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `Omit`<`ActionType`, `"ast"`> | The global event. |

#### Returns

`void`

#### Inherited from

[ASTNode](/auto-docs/variable-plugin/classes/ASTNode.md).[dispatchGlobalEvent](/auto-docs/variable-plugin/classes/ASTNode.md#dispatchglobalevent)

***

### dispose

**dispose**(): `void`

Disposes the ASTNode.

#### Returns

`void`

#### Inherited from

[ASTNode](/auto-docs/variable-plugin/classes/ASTNode.md).[dispose](/auto-docs/variable-plugin/classes/ASTNode.md#dispose)

***

### fireChange

**fireChange**(): `void`

Triggers an update for the current node.

#### Returns

`void`

#### Inherited from

[ASTNode](/auto-docs/variable-plugin/classes/ASTNode.md).[fireChange](/auto-docs/variable-plugin/classes/ASTNode.md#firechange)

***

### fromJSON

**fromJSON**(`json`): `void`

Deserializes the `MapNodeJSON` to the `MapNode`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `json` | [`MapNodeJSON`](/auto-docs/variable-plugin/interfaces/MapNodeJSON.md) | The `MapNodeJSON` to deserialize. |

#### Returns

`void`

#### Overrides

[ASTNode](/auto-docs/variable-plugin/classes/ASTNode.md).[fromJSON](/auto-docs/variable-plugin/classes/ASTNode.md#fromjson)

***

### get

**get**<`Node`>(`key`): `undefined` | `Node`

Get a node from the map.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Node` | extends [`ASTNode`](/auto-docs/variable-plugin/classes/ASTNode.md)<`any`, `Node`> = [`ASTNode`](/auto-docs/variable-plugin/classes/ASTNode.md)<`any`> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The key of the node. |

#### Returns

`undefined` | `Node`

The node instance if found, otherwise `undefined`.

***

### remove

**remove**(`key`): `void`

Remove a node from the map.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The key of the node. |

#### Returns

`void`

***

### set

**set**<`Node`>(`key`, `nextJSON`): `Node`

Set a node in the map.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Node` | extends [`ASTNode`](/auto-docs/variable-plugin/classes/ASTNode.md)<`any`, `Node`> = [`ASTNode`](/auto-docs/variable-plugin/classes/ASTNode.md)<`any`> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The key of the node. |
| `nextJSON` | [`ASTNodeJSON`](/auto-docs/variable-plugin/interfaces/ASTNodeJSON.md) | The JSON representation of the node. |

#### Returns

`Node`

The node instance.

***

### subscribe

**subscribe**<`Data`>(`observer`, `selector?`): `Disposable`

Listens for changes to the ASTNode.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Data` | [`MapNode`](/auto-docs/variable-plugin/classes/MapNode.md) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `observer` | `ObserverOrNext`<`Data`> | The listener callback. |
| `selector?` | `SubscribeConfig`<[`MapNode`](/auto-docs/variable-plugin/classes/MapNode.md), `Data`> | Listens for specified data. |

#### Returns

`Disposable`

#### Inherited from

[ASTNode](/auto-docs/variable-plugin/classes/ASTNode.md).[subscribe](/auto-docs/variable-plugin/classes/ASTNode.md#subscribe)

***

### toJSON

**toJSON**(): `Object`

Serialize the `MapNode` to `MapNodeJSON`.

#### Returns

`Object`

The JSON representation of `MapNode`.

| Name | Type |
| :------ | :------ |
| `kind` | [`ASTKind`](/auto-docs/variable-plugin/enums/ASTKind.md) |
| `map` | \[`string`, [`ASTNode`](/auto-docs/variable-plugin/classes/ASTNode.md)<`any`>]\[] |

#### Overrides

[ASTNode](/auto-docs/variable-plugin/classes/ASTNode.md).[toJSON](/auto-docs/variable-plugin/classes/ASTNode.md#tojson)
