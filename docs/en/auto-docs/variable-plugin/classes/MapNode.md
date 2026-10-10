# Class: MapNode

Represents a map of nodes.

## Hierarchy

* [`ASTNode`](/en/auto-docs/variable-plugin/classes/ASTNode.md)<[`MapNodeJSON`](/en/auto-docs/variable-plugin/interfaces/MapNodeJSON.md)>

  ↳ **`MapNode`**

## Table of contents

### Constructors

* [constructor](/en/auto-docs/variable-plugin/classes/MapNode.md#constructor)

### Properties

* [changeLocked](/en/auto-docs/variable-plugin/classes/MapNode.md#changelocked)
* [flags](/en/auto-docs/variable-plugin/classes/MapNode.md#flags)
* [key](/en/auto-docs/variable-plugin/classes/MapNode.md#key)
* [onDispose](/en/auto-docs/variable-plugin/classes/MapNode.md#ondispose)
* [opts](/en/auto-docs/variable-plugin/classes/MapNode.md#opts)
* [parent](/en/auto-docs/variable-plugin/classes/MapNode.md#parent)
* [scope](/en/auto-docs/variable-plugin/classes/MapNode.md#scope)
* [toDispose](/en/auto-docs/variable-plugin/classes/MapNode.md#todispose)
* [value$](/en/auto-docs/variable-plugin/classes/MapNode.md#value$)
* [kind](/en/auto-docs/variable-plugin/classes/MapNode.md#kind)

### Accessors

* [children](/en/auto-docs/variable-plugin/classes/MapNode.md#children)
* [disposed](/en/auto-docs/variable-plugin/classes/MapNode.md#disposed)
* [hash](/en/auto-docs/variable-plugin/classes/MapNode.md#hash)
* [kind](/en/auto-docs/variable-plugin/classes/MapNode.md#kind-1)
* [version](/en/auto-docs/variable-plugin/classes/MapNode.md#version)

### Methods

* [dispatchGlobalEvent](/en/auto-docs/variable-plugin/classes/MapNode.md#dispatchglobalevent)
* [dispose](/en/auto-docs/variable-plugin/classes/MapNode.md#dispose)
* [fireChange](/en/auto-docs/variable-plugin/classes/MapNode.md#firechange)
* [fromJSON](/en/auto-docs/variable-plugin/classes/MapNode.md#fromjson)
* [get](/en/auto-docs/variable-plugin/classes/MapNode.md#get)
* [remove](/en/auto-docs/variable-plugin/classes/MapNode.md#remove)
* [set](/en/auto-docs/variable-plugin/classes/MapNode.md#set)
* [subscribe](/en/auto-docs/variable-plugin/classes/MapNode.md#subscribe)
* [toJSON](/en/auto-docs/variable-plugin/classes/MapNode.md#tojson)

## Constructors

### constructor

**new MapNode**(`createParams`, `opts?`)

Constructor.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `createParams` | [`CreateASTParams`](/en/auto-docs/variable-plugin/interfaces/CreateASTParams.md) | Necessary parameters for creating an ASTNode. |
| `opts?` | `any` | - |

#### Inherited from

[ASTNode](/en/auto-docs/variable-plugin/classes/ASTNode.md).[constructor](/en/auto-docs/variable-plugin/classes/ASTNode.md#constructor)

## Properties

### changeLocked

**changeLocked**: `boolean`

Update lock.

* When set to `true`, `fireChange` will not trigger any events.
* This is useful when multiple updates are needed, and you want to avoid multiple triggers.

#### Inherited from

[ASTNode](/en/auto-docs/variable-plugin/classes/ASTNode.md).[changeLocked](/en/auto-docs/variable-plugin/classes/ASTNode.md#changelocked)

***

### flags

`Readonly` **flags**: `number`

Node flags, used to record some flag information.

#### Inherited from

[ASTNode](/en/auto-docs/variable-plugin/classes/ASTNode.md).[flags](/en/auto-docs/variable-plugin/classes/ASTNode.md#flags)

***

### key

`Readonly` **key**: `string`

The unique identifier of the ASTNode, which is **immutable**.

* Immutable: Once assigned, the key cannot be changed.
* Automatically generated if not specified, and cannot be changed as well.
* If a new key needs to be generated, the current ASTNode should be destroyed and a new ASTNode should be generated.

#### Inherited from

[ASTNode](/en/auto-docs/variable-plugin/classes/ASTNode.md).[key](/en/auto-docs/variable-plugin/classes/ASTNode.md#key)

***

### onDispose

**onDispose**: `Event`<`void`>

Callback triggered upon disposal.

#### Inherited from

[ASTNode](/en/auto-docs/variable-plugin/classes/ASTNode.md).[onDispose](/en/auto-docs/variable-plugin/classes/ASTNode.md#ondispose)

***

### opts

`Optional` `Readonly` **opts**: `any`

**`Deprecated`**

Get the injected options for the ASTNode.

Please use `@injectToAst(XXXService) declare xxxService: XXXService` to achieve external dependency injection.

#### Inherited from

[ASTNode](/en/auto-docs/variable-plugin/classes/ASTNode.md).[opts](/en/auto-docs/variable-plugin/classes/ASTNode.md#opts)

***

### parent

`Readonly` **parent**: `undefined` | [`ASTNode`](/en/auto-docs/variable-plugin/classes/ASTNode.md)<`any`>

The parent ASTNode.

#### Inherited from

[ASTNode](/en/auto-docs/variable-plugin/classes/ASTNode.md).[parent](/en/auto-docs/variable-plugin/classes/ASTNode.md#parent)

***

### scope

`Readonly` **scope**: [`Scope`](/en/auto-docs/variable-plugin/classes/Scope.md)<`Record`<`string`, `any`>>

The scope in which the ASTNode is located.

#### Inherited from

[ASTNode](/en/auto-docs/variable-plugin/classes/ASTNode.md).[scope](/en/auto-docs/variable-plugin/classes/ASTNode.md#scope)

***

### toDispose

`Readonly` **toDispose**: `DisposableCollection`

List of disposal handlers for the ASTNode.

#### Inherited from

[ASTNode](/en/auto-docs/variable-plugin/classes/ASTNode.md).[toDispose](/en/auto-docs/variable-plugin/classes/ASTNode.md#todispose)

***

### value$

`Readonly` **value$**: `BehaviorSubject`<[`ASTNode`](/en/auto-docs/variable-plugin/classes/ASTNode.md)<`any`>>

AST node change Observable events, implemented based on RxJS.

* Emits the current ASTNode value upon subscription.
* Emits a new value whenever `fireChange` is called.

#### Inherited from

[ASTNode](/en/auto-docs/variable-plugin/classes/ASTNode.md).[value$](/en/auto-docs/variable-plugin/classes/ASTNode.md#value$)

***

### kind

`Static` **kind**: `string`

The kind of the ASTNode.

#### Overrides

[ASTNode](/en/auto-docs/variable-plugin/classes/ASTNode.md).[kind](/en/auto-docs/variable-plugin/classes/ASTNode.md#kind)

## Accessors

### children

`get` **children**(): [`ASTNode`](/en/auto-docs/variable-plugin/classes/ASTNode.md)<`any`>\[]

Gets all child ASTNodes of the current ASTNode.

#### Returns

[`ASTNode`](/en/auto-docs/variable-plugin/classes/ASTNode.md)<`any`>\[]

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
| `ActionType` | extends [`GlobalEventActionType`](/en/auto-docs/variable-plugin/interfaces/GlobalEventActionType.md)<`string`, `any`, [`ASTNode`](/en/auto-docs/variable-plugin/classes/ASTNode.md)<`any`>, `ActionType`> = [`GlobalEventActionType`](/en/auto-docs/variable-plugin/interfaces/GlobalEventActionType.md)<`string`, `any`, [`ASTNode`](/en/auto-docs/variable-plugin/classes/ASTNode.md)<`any`>> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `Omit`<`ActionType`, `"ast"`> | The global event. |

#### Returns

`void`

#### Inherited from

[ASTNode](/en/auto-docs/variable-plugin/classes/ASTNode.md).[dispatchGlobalEvent](/en/auto-docs/variable-plugin/classes/ASTNode.md#dispatchglobalevent)

***

### dispose

**dispose**(): `void`

Disposes the ASTNode.

#### Returns

`void`

#### Inherited from

[ASTNode](/en/auto-docs/variable-plugin/classes/ASTNode.md).[dispose](/en/auto-docs/variable-plugin/classes/ASTNode.md#dispose)

***

### fireChange

**fireChange**(): `void`

Triggers an update for the current node.

#### Returns

`void`

#### Inherited from

[ASTNode](/en/auto-docs/variable-plugin/classes/ASTNode.md).[fireChange](/en/auto-docs/variable-plugin/classes/ASTNode.md#firechange)

***

### fromJSON

**fromJSON**(`json`): `void`

Deserializes the `MapNodeJSON` to the `MapNode`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `json` | [`MapNodeJSON`](/en/auto-docs/variable-plugin/interfaces/MapNodeJSON.md) | The `MapNodeJSON` to deserialize. |

#### Returns

`void`

#### Overrides

[ASTNode](/en/auto-docs/variable-plugin/classes/ASTNode.md).[fromJSON](/en/auto-docs/variable-plugin/classes/ASTNode.md#fromjson)

***

### get

**get**<`Node`>(`key`): `undefined` | `Node`

Get a node from the map.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Node` | extends [`ASTNode`](/en/auto-docs/variable-plugin/classes/ASTNode.md)<`any`, `Node`> = [`ASTNode`](/en/auto-docs/variable-plugin/classes/ASTNode.md)<`any`> |

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
| `Node` | extends [`ASTNode`](/en/auto-docs/variable-plugin/classes/ASTNode.md)<`any`, `Node`> = [`ASTNode`](/en/auto-docs/variable-plugin/classes/ASTNode.md)<`any`> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The key of the node. |
| `nextJSON` | [`ASTNodeJSON`](/en/auto-docs/variable-plugin/interfaces/ASTNodeJSON.md) | The JSON representation of the node. |

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
| `Data` | [`MapNode`](/en/auto-docs/variable-plugin/classes/MapNode.md) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `observer` | `ObserverOrNext`<`Data`> | The listener callback. |
| `selector?` | `SubscribeConfig`<[`MapNode`](/en/auto-docs/variable-plugin/classes/MapNode.md), `Data`> | Listens for specified data. |

#### Returns

`Disposable`

#### Inherited from

[ASTNode](/en/auto-docs/variable-plugin/classes/ASTNode.md).[subscribe](/en/auto-docs/variable-plugin/classes/ASTNode.md#subscribe)

***

### toJSON

**toJSON**(): `Object`

Serialize the `MapNode` to `MapNodeJSON`.

#### Returns

`Object`

The JSON representation of `MapNode`.

| Name | Type |
| :------ | :------ |
| `kind` | [`ASTKind`](/en/auto-docs/variable-plugin/enums/ASTKind.md) |
| `map` | \[`string`, [`ASTNode`](/en/auto-docs/variable-plugin/classes/ASTNode.md)<`any`>]\[] |

#### Overrides

[ASTNode](/en/auto-docs/variable-plugin/classes/ASTNode.md).[toJSON](/en/auto-docs/variable-plugin/classes/ASTNode.md#tojson)
