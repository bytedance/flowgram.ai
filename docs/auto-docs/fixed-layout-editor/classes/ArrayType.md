# Class: ArrayType

Represents an array type.

## Hierarchy

* [`BaseType`](/auto-docs/fixed-layout-editor/classes/BaseType.md)<`ArrayJSON`>

  ↳ **`ArrayType`**

## Table of contents

### Constructors

* [constructor](/auto-docs/fixed-layout-editor/classes/ArrayType.md#constructor)

### Properties

* [changeLocked](/auto-docs/fixed-layout-editor/classes/ArrayType.md#changelocked)
* [flags](/auto-docs/fixed-layout-editor/classes/ArrayType.md#flags)
* [items](/auto-docs/fixed-layout-editor/classes/ArrayType.md#items)
* [key](/auto-docs/fixed-layout-editor/classes/ArrayType.md#key)
* [onDispose](/auto-docs/fixed-layout-editor/classes/ArrayType.md#ondispose)
* [opts](/auto-docs/fixed-layout-editor/classes/ArrayType.md#opts)
* [parent](/auto-docs/fixed-layout-editor/classes/ArrayType.md#parent)
* [scope](/auto-docs/fixed-layout-editor/classes/ArrayType.md#scope)
* [toDispose](/auto-docs/fixed-layout-editor/classes/ArrayType.md#todispose)
* [value$](/auto-docs/fixed-layout-editor/classes/ArrayType.md#value$)
* [kind](/auto-docs/fixed-layout-editor/classes/ArrayType.md#kind)

### Accessors

* [canDrilldownItems](/auto-docs/fixed-layout-editor/classes/ArrayType.md#candrilldownitems)
* [children](/auto-docs/fixed-layout-editor/classes/ArrayType.md#children)
* [disposed](/auto-docs/fixed-layout-editor/classes/ArrayType.md#disposed)
* [hash](/auto-docs/fixed-layout-editor/classes/ArrayType.md#hash)
* [kind](/auto-docs/fixed-layout-editor/classes/ArrayType.md#kind-1)
* [version](/auto-docs/fixed-layout-editor/classes/ArrayType.md#version)

### Methods

* [dispatchGlobalEvent](/auto-docs/fixed-layout-editor/classes/ArrayType.md#dispatchglobalevent)
* [dispose](/auto-docs/fixed-layout-editor/classes/ArrayType.md#dispose)
* [fireChange](/auto-docs/fixed-layout-editor/classes/ArrayType.md#firechange)
* [fromJSON](/auto-docs/fixed-layout-editor/classes/ArrayType.md#fromjson)
* [getByKeyPath](/auto-docs/fixed-layout-editor/classes/ArrayType.md#getbykeypath)
* [isTypeEqual](/auto-docs/fixed-layout-editor/classes/ArrayType.md#istypeequal)
* [subscribe](/auto-docs/fixed-layout-editor/classes/ArrayType.md#subscribe)
* [toJSON](/auto-docs/fixed-layout-editor/classes/ArrayType.md#tojson)

## Constructors

### constructor

**new ArrayType**(`createParams`, `opts?`)

Constructor.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `createParams` | [`CreateASTParams`](/auto-docs/fixed-layout-editor/interfaces/CreateASTParams.md) | Necessary parameters for creating an ASTNode. |
| `opts?` | `any` | - |

#### Inherited from

[BaseType](/auto-docs/fixed-layout-editor/classes/BaseType.md).[constructor](/auto-docs/fixed-layout-editor/classes/BaseType.md#constructor)

## Properties

### changeLocked

**changeLocked**: `boolean`

Update lock.

* When set to `true`, `fireChange` will not trigger any events.
* This is useful when multiple updates are needed, and you want to avoid multiple triggers.

#### Inherited from

[BaseType](/auto-docs/fixed-layout-editor/classes/BaseType.md).[changeLocked](/auto-docs/fixed-layout-editor/classes/BaseType.md#changelocked)

***

### flags

**flags**: [`ASTNodeFlags`](/auto-docs/fixed-layout-editor/enums/ASTNodeFlags.md)

Node flags, used to record some flag information.

#### Overrides

[BaseType](/auto-docs/fixed-layout-editor/classes/BaseType.md).[flags](/auto-docs/fixed-layout-editor/classes/BaseType.md#flags)

***

### items

**items**: [`BaseType`](/auto-docs/fixed-layout-editor/classes/BaseType.md)<`any`>

The type of the items in the array.

***

### key

`Readonly` **key**: `string`

The unique identifier of the ASTNode, which is **immutable**.

* Immutable: Once assigned, the key cannot be changed.
* Automatically generated if not specified, and cannot be changed as well.
* If a new key needs to be generated, the current ASTNode should be destroyed and a new ASTNode should be generated.

#### Inherited from

[BaseType](/auto-docs/fixed-layout-editor/classes/BaseType.md).[key](/auto-docs/fixed-layout-editor/classes/BaseType.md#key)

***

### onDispose

**onDispose**: [`Event`](/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<`void`>

Callback triggered upon disposal.

#### Inherited from

[BaseType](/auto-docs/fixed-layout-editor/classes/BaseType.md).[onDispose](/auto-docs/fixed-layout-editor/classes/BaseType.md#ondispose)

***

### opts

`Optional` `Readonly` **opts**: `any`

**`Deprecated`**

Get the injected options for the ASTNode.

Please use `@injectToAst(XXXService) declare xxxService: XXXService` to achieve external dependency injection.

#### Inherited from

[BaseType](/auto-docs/fixed-layout-editor/classes/BaseType.md).[opts](/auto-docs/fixed-layout-editor/classes/BaseType.md#opts)

***

### parent

`Readonly` **parent**: `undefined` | [`ASTNode`](/auto-docs/fixed-layout-editor/classes/ASTNode.md)<`any`>

The parent ASTNode.

#### Inherited from

[BaseType](/auto-docs/fixed-layout-editor/classes/BaseType.md).[parent](/auto-docs/fixed-layout-editor/classes/BaseType.md#parent)

***

### scope

`Readonly` **scope**: [`Scope`](/auto-docs/fixed-layout-editor/classes/Scope.md)<`Record`<`string`, `any`>>

The scope in which the ASTNode is located.

#### Inherited from

[BaseType](/auto-docs/fixed-layout-editor/classes/BaseType.md).[scope](/auto-docs/fixed-layout-editor/classes/BaseType.md#scope)

***

### toDispose

`Readonly` **toDispose**: [`DisposableCollection`](/auto-docs/fixed-layout-editor/classes/DisposableCollection.md)

List of disposal handlers for the ASTNode.

#### Inherited from

[BaseType](/auto-docs/fixed-layout-editor/classes/BaseType.md).[toDispose](/auto-docs/fixed-layout-editor/classes/BaseType.md#todispose)

***

### value$

`Readonly` **value$**: `BehaviorSubject`<[`ASTNode`](/auto-docs/fixed-layout-editor/classes/ASTNode.md)<`any`>>

AST node change Observable events, implemented based on RxJS.

* Emits the current ASTNode value upon subscription.
* Emits a new value whenever `fireChange` is called.

#### Inherited from

[BaseType](/auto-docs/fixed-layout-editor/classes/BaseType.md).[value$](/auto-docs/fixed-layout-editor/classes/BaseType.md#value$)

***

### kind

`Static` **kind**: `string`

The kind of the ASTNode.

#### Overrides

[BaseType](/auto-docs/fixed-layout-editor/classes/BaseType.md).[kind](/auto-docs/fixed-layout-editor/classes/BaseType.md#kind)

## Accessors

### canDrilldownItems

`get` **canDrilldownItems**(): `boolean`

Whether the items type can be drilled down.

#### Returns

`boolean`

***

### children

`get` **children**(): [`ASTNode`](/auto-docs/fixed-layout-editor/classes/ASTNode.md)<`any`>\[]

Gets all child ASTNodes of the current ASTNode.

#### Returns

[`ASTNode`](/auto-docs/fixed-layout-editor/classes/ASTNode.md)<`any`>\[]

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
| `ActionType` | extends [`GlobalEventActionType`](/auto-docs/fixed-layout-editor/interfaces/GlobalEventActionType.md)<`string`, `any`, [`ASTNode`](/auto-docs/fixed-layout-editor/classes/ASTNode.md)<`any`>, `ActionType`> = [`GlobalEventActionType`](/auto-docs/fixed-layout-editor/interfaces/GlobalEventActionType.md)<`string`, `any`, [`ASTNode`](/auto-docs/fixed-layout-editor/classes/ASTNode.md)<`any`>> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `Omit`<`ActionType`, `"ast"`> | The global event. |

#### Returns

`void`

#### Inherited from

[BaseType](/auto-docs/fixed-layout-editor/classes/BaseType.md).[dispatchGlobalEvent](/auto-docs/fixed-layout-editor/classes/BaseType.md#dispatchglobalevent)

***

### dispose

**dispose**(): `void`

Disposes the ASTNode.

#### Returns

`void`

#### Inherited from

[BaseType](/auto-docs/fixed-layout-editor/classes/BaseType.md).[dispose](/auto-docs/fixed-layout-editor/classes/BaseType.md#dispose)

***

### fireChange

**fireChange**(): `void`

Triggers an update for the current node.

#### Returns

`void`

#### Inherited from

[BaseType](/auto-docs/fixed-layout-editor/classes/BaseType.md).[fireChange](/auto-docs/fixed-layout-editor/classes/BaseType.md#firechange)

***

### fromJSON

**fromJSON**(`json`): `void`

Deserializes the `ArrayJSON` to the `ArrayType`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `json` | `ArrayJSON` | The `ArrayJSON` to deserialize. |

#### Returns

`void`

#### Overrides

[BaseType](/auto-docs/fixed-layout-editor/classes/BaseType.md).[fromJSON](/auto-docs/fixed-layout-editor/classes/BaseType.md#fromjson)

***

### getByKeyPath

**getByKeyPath**(`keyPath`): `undefined` | [`BaseVariableField`](/auto-docs/fixed-layout-editor/classes/BaseVariableField.md)<`any`>

Get a variable field by key path.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `keyPath` | `string`\[] | The key path to search for. |

#### Returns

`undefined` | [`BaseVariableField`](/auto-docs/fixed-layout-editor/classes/BaseVariableField.md)<`any`>

The variable field if found, otherwise `undefined`.

#### Overrides

[BaseType](/auto-docs/fixed-layout-editor/classes/BaseType.md).[getByKeyPath](/auto-docs/fixed-layout-editor/classes/BaseType.md#getbykeypath)

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

[BaseType](/auto-docs/fixed-layout-editor/classes/BaseType.md).[isTypeEqual](/auto-docs/fixed-layout-editor/classes/BaseType.md#istypeequal)

***

### subscribe

**subscribe**<`Data`>(`observer`, `selector?`): [`Disposable`](/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md)

Listens for changes to the ASTNode.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Data` | [`ArrayType`](/auto-docs/fixed-layout-editor/classes/ArrayType.md) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `observer` | `ObserverOrNext`<`Data`> | The listener callback. |
| `selector?` | `SubscribeConfig`<[`ArrayType`](/auto-docs/fixed-layout-editor/classes/ArrayType.md), `Data`> | Listens for specified data. |

#### Returns

[`Disposable`](/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md)

#### Inherited from

[BaseType](/auto-docs/fixed-layout-editor/classes/BaseType.md).[subscribe](/auto-docs/fixed-layout-editor/classes/BaseType.md#subscribe)

***

### toJSON

**toJSON**(): `Object`

Serialize the `ArrayType` to `ArrayJSON`

#### Returns

`Object`

The JSON representation of `ArrayType`.

| Name | Type |
| :------ | :------ |
| `items` | `any` |
| `kind` | [`ASTKind`](/auto-docs/fixed-layout-editor/enums/ASTKind.md) |

#### Overrides

[BaseType](/auto-docs/fixed-layout-editor/classes/BaseType.md).[toJSON](/auto-docs/fixed-layout-editor/classes/BaseType.md#tojson)
