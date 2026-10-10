# Class: VariableDeclarationList

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

## Hierarchy

* [`ASTNode`](/en/auto-docs/fixed-layout-editor/classes/ASTNode.md)<[`VariableDeclarationListJSON`](/en/auto-docs/fixed-layout-editor/interfaces/VariableDeclarationListJSON.md)>

  ↳ **`VariableDeclarationList`**

## Table of contents

### Constructors

* [constructor](/en/auto-docs/fixed-layout-editor/classes/VariableDeclarationList.md#constructor)

### Properties

* [changeLocked](/en/auto-docs/fixed-layout-editor/classes/VariableDeclarationList.md#changelocked)
* [declarationTable](/en/auto-docs/fixed-layout-editor/classes/VariableDeclarationList.md#declarationtable)
* [declarations](/en/auto-docs/fixed-layout-editor/classes/VariableDeclarationList.md#declarations)
* [flags](/en/auto-docs/fixed-layout-editor/classes/VariableDeclarationList.md#flags)
* [key](/en/auto-docs/fixed-layout-editor/classes/VariableDeclarationList.md#key)
* [onDispose](/en/auto-docs/fixed-layout-editor/classes/VariableDeclarationList.md#ondispose)
* [opts](/en/auto-docs/fixed-layout-editor/classes/VariableDeclarationList.md#opts)
* [parent](/en/auto-docs/fixed-layout-editor/classes/VariableDeclarationList.md#parent)
* [scope](/en/auto-docs/fixed-layout-editor/classes/VariableDeclarationList.md#scope)
* [toDispose](/en/auto-docs/fixed-layout-editor/classes/VariableDeclarationList.md#todispose)
* [value$](/en/auto-docs/fixed-layout-editor/classes/VariableDeclarationList.md#value$)
* [kind](/en/auto-docs/fixed-layout-editor/classes/VariableDeclarationList.md#kind)

### Accessors

* [children](/en/auto-docs/fixed-layout-editor/classes/VariableDeclarationList.md#children)
* [disposed](/en/auto-docs/fixed-layout-editor/classes/VariableDeclarationList.md#disposed)
* [hash](/en/auto-docs/fixed-layout-editor/classes/VariableDeclarationList.md#hash)
* [kind](/en/auto-docs/fixed-layout-editor/classes/VariableDeclarationList.md#kind-1)
* [version](/en/auto-docs/fixed-layout-editor/classes/VariableDeclarationList.md#version)

### Methods

* [dispatchGlobalEvent](/en/auto-docs/fixed-layout-editor/classes/VariableDeclarationList.md#dispatchglobalevent)
* [dispose](/en/auto-docs/fixed-layout-editor/classes/VariableDeclarationList.md#dispose)
* [fireChange](/en/auto-docs/fixed-layout-editor/classes/VariableDeclarationList.md#firechange)
* [fromJSON](/en/auto-docs/fixed-layout-editor/classes/VariableDeclarationList.md#fromjson)
* [subscribe](/en/auto-docs/fixed-layout-editor/classes/VariableDeclarationList.md#subscribe)
* [toJSON](/en/auto-docs/fixed-layout-editor/classes/VariableDeclarationList.md#tojson)

## Constructors

### constructor

**new VariableDeclarationList**(`createParams`, `opts?`)

Constructor.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `createParams` | [`CreateASTParams`](/en/auto-docs/fixed-layout-editor/interfaces/CreateASTParams.md) | Necessary parameters for creating an ASTNode. |
| `opts?` | `any` | - |

#### Inherited from

[ASTNode](/en/auto-docs/fixed-layout-editor/classes/ASTNode.md).[constructor](/en/auto-docs/fixed-layout-editor/classes/ASTNode.md#constructor)

## Properties

### changeLocked

**changeLocked**: `boolean`

Update lock.

* When set to `true`, `fireChange` will not trigger any events.
* This is useful when multiple updates are needed, and you want to avoid multiple triggers.

#### Inherited from

[ASTNode](/en/auto-docs/fixed-layout-editor/classes/ASTNode.md).[changeLocked](/en/auto-docs/fixed-layout-editor/classes/ASTNode.md#changelocked)

***

### declarationTable

**declarationTable**: `Map`<`string`, [`VariableDeclaration`](/en/auto-docs/fixed-layout-editor/classes/VariableDeclaration.md)<`any`>>

Map of variable declarations, keyed by variable name.

***

### declarations

**declarations**: [`VariableDeclaration`](/en/auto-docs/fixed-layout-editor/classes/VariableDeclaration.md)<`any`>\[]

Variable declarations, sorted by `order`.

***

### flags

`Readonly` **flags**: `number`

Node flags, used to record some flag information.

#### Inherited from

[ASTNode](/en/auto-docs/fixed-layout-editor/classes/ASTNode.md).[flags](/en/auto-docs/fixed-layout-editor/classes/ASTNode.md#flags)

***

### key

`Readonly` **key**: `string`

The unique identifier of the ASTNode, which is **immutable**.

* Immutable: Once assigned, the key cannot be changed.
* Automatically generated if not specified, and cannot be changed as well.
* If a new key needs to be generated, the current ASTNode should be destroyed and a new ASTNode should be generated.

#### Inherited from

[ASTNode](/en/auto-docs/fixed-layout-editor/classes/ASTNode.md).[key](/en/auto-docs/fixed-layout-editor/classes/ASTNode.md#key)

***

### onDispose

**onDispose**: [`Event`](/en/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<`void`>

Callback triggered upon disposal.

#### Inherited from

[ASTNode](/en/auto-docs/fixed-layout-editor/classes/ASTNode.md).[onDispose](/en/auto-docs/fixed-layout-editor/classes/ASTNode.md#ondispose)

***

### opts

`Optional` `Readonly` **opts**: `any`

**`Deprecated`**

Get the injected options for the ASTNode.

Please use `@injectToAst(XXXService) declare xxxService: XXXService` to achieve external dependency injection.

#### Inherited from

[ASTNode](/en/auto-docs/fixed-layout-editor/classes/ASTNode.md).[opts](/en/auto-docs/fixed-layout-editor/classes/ASTNode.md#opts)

***

### parent

`Readonly` **parent**: `undefined` | [`ASTNode`](/en/auto-docs/fixed-layout-editor/classes/ASTNode.md)<`any`>

The parent ASTNode.

#### Inherited from

[ASTNode](/en/auto-docs/fixed-layout-editor/classes/ASTNode.md).[parent](/en/auto-docs/fixed-layout-editor/classes/ASTNode.md#parent)

***

### scope

`Readonly` **scope**: [`Scope`](/en/auto-docs/fixed-layout-editor/classes/Scope.md)<`Record`<`string`, `any`>>

The scope in which the ASTNode is located.

#### Inherited from

[ASTNode](/en/auto-docs/fixed-layout-editor/classes/ASTNode.md).[scope](/en/auto-docs/fixed-layout-editor/classes/ASTNode.md#scope)

***

### toDispose

`Readonly` **toDispose**: [`DisposableCollection`](/en/auto-docs/fixed-layout-editor/classes/DisposableCollection.md)

List of disposal handlers for the ASTNode.

#### Inherited from

[ASTNode](/en/auto-docs/fixed-layout-editor/classes/ASTNode.md).[toDispose](/en/auto-docs/fixed-layout-editor/classes/ASTNode.md#todispose)

***

### value$

`Readonly` **value$**: `BehaviorSubject`<[`ASTNode`](/en/auto-docs/fixed-layout-editor/classes/ASTNode.md)<`any`>>

AST node change Observable events, implemented based on RxJS.

* Emits the current ASTNode value upon subscription.
* Emits a new value whenever `fireChange` is called.

#### Inherited from

[ASTNode](/en/auto-docs/fixed-layout-editor/classes/ASTNode.md).[value$](/en/auto-docs/fixed-layout-editor/classes/ASTNode.md#value$)

***

### kind

`Static` **kind**: `string`

The kind of the ASTNode.

#### Overrides

[ASTNode](/en/auto-docs/fixed-layout-editor/classes/ASTNode.md).[kind](/en/auto-docs/fixed-layout-editor/classes/ASTNode.md#kind)

## Accessors

### children

`get` **children**(): [`ASTNode`](/en/auto-docs/fixed-layout-editor/classes/ASTNode.md)<`any`>\[]

Gets all child ASTNodes of the current ASTNode.

#### Returns

[`ASTNode`](/en/auto-docs/fixed-layout-editor/classes/ASTNode.md)<`any`>\[]

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
| `ActionType` | extends [`GlobalEventActionType`](/en/auto-docs/fixed-layout-editor/interfaces/GlobalEventActionType.md)<`string`, `any`, [`ASTNode`](/en/auto-docs/fixed-layout-editor/classes/ASTNode.md)<`any`>, `ActionType`> = [`GlobalEventActionType`](/en/auto-docs/fixed-layout-editor/interfaces/GlobalEventActionType.md)<`string`, `any`, [`ASTNode`](/en/auto-docs/fixed-layout-editor/classes/ASTNode.md)<`any`>> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `Omit`<`ActionType`, `"ast"`> | The global event. |

#### Returns

`void`

#### Inherited from

[ASTNode](/en/auto-docs/fixed-layout-editor/classes/ASTNode.md).[dispatchGlobalEvent](/en/auto-docs/fixed-layout-editor/classes/ASTNode.md#dispatchglobalevent)

***

### dispose

**dispose**(): `void`

Disposes the ASTNode.

#### Returns

`void`

#### Inherited from

[ASTNode](/en/auto-docs/fixed-layout-editor/classes/ASTNode.md).[dispose](/en/auto-docs/fixed-layout-editor/classes/ASTNode.md#dispose)

***

### fireChange

**fireChange**(): `void`

Triggers an update for the current node.

#### Returns

`void`

#### Inherited from

[ASTNode](/en/auto-docs/fixed-layout-editor/classes/ASTNode.md).[fireChange](/en/auto-docs/fixed-layout-editor/classes/ASTNode.md#firechange)

***

### fromJSON

**fromJSON**(`«destructured»`): `void`

Deserialize the `VariableDeclarationListJSON` to the `VariableDeclarationList`.

* VariableDeclarationListChangeAction will be dispatched after deserialization.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`VariableDeclarationListJSON`](/en/auto-docs/fixed-layout-editor/interfaces/VariableDeclarationListJSON.md)<`any`> |

#### Returns

`void`

#### Overrides

[ASTNode](/en/auto-docs/fixed-layout-editor/classes/ASTNode.md).[fromJSON](/en/auto-docs/fixed-layout-editor/classes/ASTNode.md#fromjson)

***

### subscribe

**subscribe**<`Data`>(`observer`, `selector?`): [`Disposable`](/en/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md)

Listens for changes to the ASTNode.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Data` | [`VariableDeclarationList`](/en/auto-docs/fixed-layout-editor/classes/VariableDeclarationList.md) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `observer` | `ObserverOrNext`<`Data`> | The listener callback. |
| `selector?` | `SubscribeConfig`<[`VariableDeclarationList`](/en/auto-docs/fixed-layout-editor/classes/VariableDeclarationList.md), `Data`> | Listens for specified data. |

#### Returns

[`Disposable`](/en/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md)

#### Inherited from

[ASTNode](/en/auto-docs/fixed-layout-editor/classes/ASTNode.md).[subscribe](/en/auto-docs/fixed-layout-editor/classes/ASTNode.md#subscribe)

***

### toJSON

**toJSON**(): `Object`

Serialize the `VariableDeclarationList` to the `VariableDeclarationListJSON`.

#### Returns

`Object`

ASTJSON representation of `VariableDeclarationList`

| Name | Type |
| :------ | :------ |
| `declarations` | [`VariableDeclarationJSON`](/en/auto-docs/fixed-layout-editor/types/VariableDeclarationJSON.md)<`any`>\[] |
| `kind` | [`ASTKind`](/en/auto-docs/fixed-layout-editor/enums/ASTKind.md) |

#### Overrides

[ASTNode](/en/auto-docs/fixed-layout-editor/classes/ASTNode.md).[toJSON](/en/auto-docs/fixed-layout-editor/classes/ASTNode.md#tojson)
