# Class: ASTNode\<JSON>

An `ASTNode` represents a fundamental unit of variable information within the system's Abstract Syntax Tree.
It can model various constructs, for example:

* **Declarations**: `const a = 1`
* **Expressions**: `a.b.c`
* **Types**: `number`, `string`, `boolean`

Here is some characteristic of ASTNode:

* **Tree-like Structure**: ASTNodes can be nested to form a tree, representing complex variable structures.
* **Extendable**: New features can be added by extending the base ASTNode class.
* **Reactive**: Changes in an ASTNode's value trigger events, enabling reactive programming patterns.
* **Serializable**: ASTNodes can be converted to and from a JSON format (ASTNodeJSON) for storage or transmission.

## Type parameters

| Name | Type |
| :------ | :------ |
| `JSON` | extends [`ASTNodeJSON`](/auto-docs/free-layout-editor/interfaces/ASTNodeJSON.md) = `any` |

## Hierarchy

* **`ASTNode`**

  ↳ [`BaseExpression`](/auto-docs/free-layout-editor/classes/BaseExpression.md)

  ↳ [`BaseType`](/auto-docs/free-layout-editor/classes/BaseType.md)

  ↳ [`BaseVariableField`](/auto-docs/free-layout-editor/classes/BaseVariableField.md)

  ↳ [`DataNode`](/auto-docs/free-layout-editor/classes/DataNode.md)

  ↳ [`ListNode`](/auto-docs/free-layout-editor/classes/ListNode.md)

  ↳ [`MapNode`](/auto-docs/free-layout-editor/classes/MapNode.md)

  ↳ [`VariableDeclarationList`](/auto-docs/free-layout-editor/classes/VariableDeclarationList.md)

## Implements

* [`Disposable`](/auto-docs/free-layout-editor/interfaces/Disposable-1.md)

## Indexable

▪ \[key: `string`]: `unknown`

## Table of contents

### Constructors

* [constructor](/auto-docs/free-layout-editor/classes/ASTNode.md#constructor)

### Properties

* [changeLocked](/auto-docs/free-layout-editor/classes/ASTNode.md#changelocked)
* [flags](/auto-docs/free-layout-editor/classes/ASTNode.md#flags)
* [key](/auto-docs/free-layout-editor/classes/ASTNode.md#key)
* [onDispose](/auto-docs/free-layout-editor/classes/ASTNode.md#ondispose)
* [opts](/auto-docs/free-layout-editor/classes/ASTNode.md#opts)
* [parent](/auto-docs/free-layout-editor/classes/ASTNode.md#parent)
* [scope](/auto-docs/free-layout-editor/classes/ASTNode.md#scope)
* [toDispose](/auto-docs/free-layout-editor/classes/ASTNode.md#todispose)
* [value$](/auto-docs/free-layout-editor/classes/ASTNode.md#value$)
* [kind](/auto-docs/free-layout-editor/classes/ASTNode.md#kind)

### Accessors

* [children](/auto-docs/free-layout-editor/classes/ASTNode.md#children)
* [disposed](/auto-docs/free-layout-editor/classes/ASTNode.md#disposed)
* [hash](/auto-docs/free-layout-editor/classes/ASTNode.md#hash)
* [kind](/auto-docs/free-layout-editor/classes/ASTNode.md#kind-1)
* [version](/auto-docs/free-layout-editor/classes/ASTNode.md#version)

### Methods

* [dispatchGlobalEvent](/auto-docs/free-layout-editor/classes/ASTNode.md#dispatchglobalevent)
* [dispose](/auto-docs/free-layout-editor/classes/ASTNode.md#dispose)
* [fireChange](/auto-docs/free-layout-editor/classes/ASTNode.md#firechange)
* [fromJSON](/auto-docs/free-layout-editor/classes/ASTNode.md#fromjson)
* [subscribe](/auto-docs/free-layout-editor/classes/ASTNode.md#subscribe)
* [toJSON](/auto-docs/free-layout-editor/classes/ASTNode.md#tojson)

## Constructors

### constructor

**new ASTNode**<`JSON`>(`createParams`, `opts?`)

Constructor.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `JSON` | extends [`ASTNodeJSON`](/auto-docs/free-layout-editor/interfaces/ASTNodeJSON.md) = `any` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `createParams` | [`CreateASTParams`](/auto-docs/free-layout-editor/interfaces/CreateASTParams.md) | Necessary parameters for creating an ASTNode. |
| `opts?` | `any` | - |

## Properties

### changeLocked

**changeLocked**: `boolean`

Update lock.

* When set to `true`, `fireChange` will not trigger any events.
* This is useful when multiple updates are needed, and you want to avoid multiple triggers.

***

### flags

`Readonly` **flags**: `number`

Node flags, used to record some flag information.

***

### key

`Readonly` **key**: `string`

The unique identifier of the ASTNode, which is **immutable**.

* Immutable: Once assigned, the key cannot be changed.
* Automatically generated if not specified, and cannot be changed as well.
* If a new key needs to be generated, the current ASTNode should be destroyed and a new ASTNode should be generated.

***

### onDispose

**onDispose**: [`Event`](/auto-docs/free-layout-editor/interfaces/Event-1.md)<`void`>

Callback triggered upon disposal.

***

### opts

`Optional` `Readonly` **opts**: `any`

**`Deprecated`**

Get the injected options for the ASTNode.

Please use `@injectToAst(XXXService) declare xxxService: XXXService` to achieve external dependency injection.

***

### parent

`Readonly` **parent**: `undefined` | [`ASTNode`](/auto-docs/free-layout-editor/classes/ASTNode.md)<`any`>

The parent ASTNode.

***

### scope

`Readonly` **scope**: [`Scope`](/auto-docs/free-layout-editor/classes/Scope.md)<`Record`<`string`, `any`>>

The scope in which the ASTNode is located.

***

### toDispose

`Readonly` **toDispose**: [`DisposableCollection`](/auto-docs/free-layout-editor/classes/DisposableCollection.md)

List of disposal handlers for the ASTNode.

***

### value$

`Readonly` **value$**: `BehaviorSubject`<[`ASTNode`](/auto-docs/free-layout-editor/classes/ASTNode.md)<`any`>>

AST node change Observable events, implemented based on RxJS.

* Emits the current ASTNode value upon subscription.
* Emits a new value whenever `fireChange` is called.

***

### kind

`Static` `Readonly` **kind**: `string`

The kind of the ASTNode.

## Accessors

### children

`get` **children**(): [`ASTNode`](/auto-docs/free-layout-editor/classes/ASTNode.md)<`any`>\[]

Gets all child ASTNodes of the current ASTNode.

#### Returns

[`ASTNode`](/auto-docs/free-layout-editor/classes/ASTNode.md)<`any`>\[]

***

### disposed

`get` **disposed**(): `boolean`

#### Returns

`boolean`

***

### hash

`get` **hash**(): `string`

The unique hash value of the ASTNode.

* It will update when the ASTNode is updated.
* You can used to check two ASTNode are equal.

#### Returns

`string`

***

### kind

`get` **kind**(): `string`

The type of the ASTNode.

#### Returns

`string`

***

### version

`get` **version**(): `number`

The version value of the ASTNode.

* You can used to check whether ASTNode are updated.

#### Returns

`number`

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

***

### dispose

**dispose**(): `void`

Disposes the ASTNode.

#### Returns

`void`

#### Implementation of

[Disposable](/auto-docs/free-layout-editor/interfaces/Disposable-1.md).[dispose](/auto-docs/free-layout-editor/interfaces/Disposable-1.md#dispose)

***

### fireChange

**fireChange**(): `void`

Triggers an update for the current node.

#### Returns

`void`

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

***

### subscribe

**subscribe**<`Data`>(`observer`, `selector?`): [`Disposable`](/auto-docs/free-layout-editor/interfaces/Disposable-1.md)

Listens for changes to the ASTNode.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Data` | [`ASTNode`](/auto-docs/free-layout-editor/classes/ASTNode.md)<`JSON`> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `observer` | `ObserverOrNext`<`Data`> | The listener callback. |
| `selector?` | `SubscribeConfig`<[`ASTNode`](/auto-docs/free-layout-editor/classes/ASTNode.md)<`JSON`>, `Data`> | Listens for specified data. |

#### Returns

[`Disposable`](/auto-docs/free-layout-editor/interfaces/Disposable-1.md)

***

### toJSON

`Abstract` **toJSON**(): `JSON`

Serializes the current ASTNode to ASTNodeJSON.

#### Returns

`JSON`
