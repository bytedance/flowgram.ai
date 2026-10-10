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

* [`ASTNode`](/auto-docs/variable-plugin/classes/ASTNode.md)<[`VariableDeclarationListJSON`](/auto-docs/variable-plugin/interfaces/VariableDeclarationListJSON.md)>

  ↳ **`VariableDeclarationList`**

## Table of contents

### Constructors

* [constructor](/auto-docs/variable-plugin/classes/VariableDeclarationList.md#constructor)

### Properties

* [changeLocked](/auto-docs/variable-plugin/classes/VariableDeclarationList.md#changelocked)
* [declarationTable](/auto-docs/variable-plugin/classes/VariableDeclarationList.md#declarationtable)
* [declarations](/auto-docs/variable-plugin/classes/VariableDeclarationList.md#declarations)
* [flags](/auto-docs/variable-plugin/classes/VariableDeclarationList.md#flags)
* [key](/auto-docs/variable-plugin/classes/VariableDeclarationList.md#key)
* [onDispose](/auto-docs/variable-plugin/classes/VariableDeclarationList.md#ondispose)
* [opts](/auto-docs/variable-plugin/classes/VariableDeclarationList.md#opts)
* [parent](/auto-docs/variable-plugin/classes/VariableDeclarationList.md#parent)
* [scope](/auto-docs/variable-plugin/classes/VariableDeclarationList.md#scope)
* [toDispose](/auto-docs/variable-plugin/classes/VariableDeclarationList.md#todispose)
* [value$](/auto-docs/variable-plugin/classes/VariableDeclarationList.md#value$)
* [kind](/auto-docs/variable-plugin/classes/VariableDeclarationList.md#kind)

### Accessors

* [children](/auto-docs/variable-plugin/classes/VariableDeclarationList.md#children)
* [disposed](/auto-docs/variable-plugin/classes/VariableDeclarationList.md#disposed)
* [hash](/auto-docs/variable-plugin/classes/VariableDeclarationList.md#hash)
* [kind](/auto-docs/variable-plugin/classes/VariableDeclarationList.md#kind-1)
* [version](/auto-docs/variable-plugin/classes/VariableDeclarationList.md#version)

### Methods

* [dispatchGlobalEvent](/auto-docs/variable-plugin/classes/VariableDeclarationList.md#dispatchglobalevent)
* [dispose](/auto-docs/variable-plugin/classes/VariableDeclarationList.md#dispose)
* [fireChange](/auto-docs/variable-plugin/classes/VariableDeclarationList.md#firechange)
* [fromJSON](/auto-docs/variable-plugin/classes/VariableDeclarationList.md#fromjson)
* [subscribe](/auto-docs/variable-plugin/classes/VariableDeclarationList.md#subscribe)
* [toJSON](/auto-docs/variable-plugin/classes/VariableDeclarationList.md#tojson)

## Constructors

### constructor

**new VariableDeclarationList**(`createParams`, `opts?`)

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

### declarationTable

**declarationTable**: `Map`<`string`, [`VariableDeclaration`](/auto-docs/variable-plugin/classes/VariableDeclaration.md)<`any`>>

Map of variable declarations, keyed by variable name.

***

### declarations

**declarations**: [`VariableDeclaration`](/auto-docs/variable-plugin/classes/VariableDeclaration.md)<`any`>\[]

Variable declarations, sorted by `order`.

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

**fromJSON**(`«destructured»`): `void`

Deserialize the `VariableDeclarationListJSON` to the `VariableDeclarationList`.

* VariableDeclarationListChangeAction will be dispatched after deserialization.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`VariableDeclarationListJSON`](/auto-docs/variable-plugin/interfaces/VariableDeclarationListJSON.md)<`any`> |

#### Returns

`void`

#### Overrides

[ASTNode](/auto-docs/variable-plugin/classes/ASTNode.md).[fromJSON](/auto-docs/variable-plugin/classes/ASTNode.md#fromjson)

***

### subscribe

**subscribe**<`Data`>(`observer`, `selector?`): `Disposable`

Listens for changes to the ASTNode.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Data` | [`VariableDeclarationList`](/auto-docs/variable-plugin/classes/VariableDeclarationList.md) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `observer` | `ObserverOrNext`<`Data`> | The listener callback. |
| `selector?` | `SubscribeConfig`<[`VariableDeclarationList`](/auto-docs/variable-plugin/classes/VariableDeclarationList.md), `Data`> | Listens for specified data. |

#### Returns

`Disposable`

#### Inherited from

[ASTNode](/auto-docs/variable-plugin/classes/ASTNode.md).[subscribe](/auto-docs/variable-plugin/classes/ASTNode.md#subscribe)

***

### toJSON

**toJSON**(): `Object`

Serialize the `VariableDeclarationList` to the `VariableDeclarationListJSON`.

#### Returns

`Object`

ASTJSON representation of `VariableDeclarationList`

| Name | Type |
| :------ | :------ |
| `declarations` | [`VariableDeclarationJSON`](/auto-docs/variable-plugin/types/VariableDeclarationJSON.md)<`any`>\[] |
| `kind` | [`ASTKind`](/auto-docs/variable-plugin/enums/ASTKind.md) |

#### Overrides

[ASTNode](/auto-docs/variable-plugin/classes/ASTNode.md).[toJSON](/auto-docs/variable-plugin/classes/ASTNode.md#tojson)
