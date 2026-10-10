# Class: ListNode

Represents a list of nodes.

## Hierarchy

* [`ASTNode`](/en/auto-docs/editor/classes/ASTNode.md)<[`ListNodeJSON`](/en/auto-docs/editor/interfaces/ListNodeJSON.md)>

  ↳ **`ListNode`**

## Table of contents

### Constructors

* [constructor](/en/auto-docs/editor/classes/ListNode.md#constructor)

### Properties

* [changeLocked](/en/auto-docs/editor/classes/ListNode.md#changelocked)
* [flags](/en/auto-docs/editor/classes/ListNode.md#flags)
* [key](/en/auto-docs/editor/classes/ListNode.md#key)
* [onDispose](/en/auto-docs/editor/classes/ListNode.md#ondispose)
* [opts](/en/auto-docs/editor/classes/ListNode.md#opts)
* [parent](/en/auto-docs/editor/classes/ListNode.md#parent)
* [scope](/en/auto-docs/editor/classes/ListNode.md#scope)
* [toDispose](/en/auto-docs/editor/classes/ListNode.md#todispose)
* [value$](/en/auto-docs/editor/classes/ListNode.md#value$)
* [kind](/en/auto-docs/editor/classes/ListNode.md#kind)

### Accessors

* [children](/en/auto-docs/editor/classes/ListNode.md#children)
* [disposed](/en/auto-docs/editor/classes/ListNode.md#disposed)
* [hash](/en/auto-docs/editor/classes/ListNode.md#hash)
* [kind](/en/auto-docs/editor/classes/ListNode.md#kind-1)
* [list](/en/auto-docs/editor/classes/ListNode.md#list)
* [version](/en/auto-docs/editor/classes/ListNode.md#version)

### Methods

* [dispatchGlobalEvent](/en/auto-docs/editor/classes/ListNode.md#dispatchglobalevent)
* [dispose](/en/auto-docs/editor/classes/ListNode.md#dispose)
* [fireChange](/en/auto-docs/editor/classes/ListNode.md#firechange)
* [fromJSON](/en/auto-docs/editor/classes/ListNode.md#fromjson)
* [subscribe](/en/auto-docs/editor/classes/ListNode.md#subscribe)
* [toJSON](/en/auto-docs/editor/classes/ListNode.md#tojson)

## Constructors

### constructor

**new ListNode**(`createParams`, `opts?`)

Constructor.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `createParams` | [`CreateASTParams`](/en/auto-docs/editor/interfaces/CreateASTParams.md) | Necessary parameters for creating an ASTNode. |
| `opts?` | `any` | - |

#### Inherited from

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

`Readonly` **flags**: `number`

Node flags, used to record some flag information.

#### Inherited from

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

`Static` **kind**: `string`

The kind of the ASTNode.

#### Overrides

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

### list

`get` **list**(): [`ASTNode`](/en/auto-docs/editor/classes/ASTNode.md)<`any`>\[]

The list of nodes.

#### Returns

[`ASTNode`](/en/auto-docs/editor/classes/ASTNode.md)<`any`>\[]

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

**fromJSON**(`json`): `void`

Deserializes the `ListNodeJSON` to the `ListNode`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `json` | [`ListNodeJSON`](/en/auto-docs/editor/interfaces/ListNodeJSON.md) | The `ListNodeJSON` to deserialize. |

#### Returns

`void`

#### Overrides

[ASTNode](/en/auto-docs/editor/classes/ASTNode.md).[fromJSON](/en/auto-docs/editor/classes/ASTNode.md#fromjson)

***

### subscribe

**subscribe**<`Data`>(`observer`, `selector?`): [`Disposable`](/en/auto-docs/editor/interfaces/Disposable-1.md)

Listens for changes to the ASTNode.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Data` | [`ListNode`](/en/auto-docs/editor/classes/ListNode.md) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `observer` | `ObserverOrNext`<`Data`> | The listener callback. |
| `selector?` | `SubscribeConfig`<[`ListNode`](/en/auto-docs/editor/classes/ListNode.md), `Data`> | Listens for specified data. |

#### Returns

[`Disposable`](/en/auto-docs/editor/interfaces/Disposable-1.md)

#### Inherited from

[ASTNode](/en/auto-docs/editor/classes/ASTNode.md).[subscribe](/en/auto-docs/editor/classes/ASTNode.md#subscribe)

***

### toJSON

**toJSON**(): `Object`

Serialize the `ListNode` to `ListNodeJSON`.

#### Returns

`Object`

The JSON representation of `ListNode`.

| Name | Type |
| :------ | :------ |
| `kind` | [`ASTKind`](/en/auto-docs/editor/enums/ASTKind.md) |
| `list` | `any`\[] |

#### Overrides

[ASTNode](/en/auto-docs/editor/classes/ASTNode.md).[toJSON](/en/auto-docs/editor/classes/ASTNode.md#tojson)
