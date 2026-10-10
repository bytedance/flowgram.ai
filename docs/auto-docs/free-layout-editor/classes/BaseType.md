# Class: BaseType\<JSON>

Base class for all types.

All other types should extend this class.

## Type parameters

| Name | Type |
| :------ | :------ |
| `JSON` | extends [`ASTNodeJSON`](/auto-docs/free-layout-editor/interfaces/ASTNodeJSON.md) = `any` |

## Hierarchy

* [`ASTNode`](/auto-docs/free-layout-editor/classes/ASTNode.md)<`JSON`>

  ↳ **`BaseType`**

  ↳↳ [`ArrayType`](/auto-docs/free-layout-editor/classes/ArrayType.md)

  ↳↳ [`BooleanType`](/auto-docs/free-layout-editor/classes/BooleanType.md)

  ↳↳ [`CustomType`](/auto-docs/free-layout-editor/classes/CustomType.md)

  ↳↳ [`IntegerType`](/auto-docs/free-layout-editor/classes/IntegerType.md)

  ↳↳ [`MapType`](/auto-docs/free-layout-editor/classes/MapType.md)

  ↳↳ [`NumberType`](/auto-docs/free-layout-editor/classes/NumberType.md)

  ↳↳ [`ObjectType`](/auto-docs/free-layout-editor/classes/ObjectType.md)

  ↳↳ [`StringType`](/auto-docs/free-layout-editor/classes/StringType.md)

## Table of contents

### Constructors

* [constructor](/auto-docs/free-layout-editor/classes/BaseType.md#constructor)

### Properties

* [changeLocked](/auto-docs/free-layout-editor/classes/BaseType.md#changelocked)
* [flags](/auto-docs/free-layout-editor/classes/BaseType.md#flags)
* [key](/auto-docs/free-layout-editor/classes/BaseType.md#key)
* [onDispose](/auto-docs/free-layout-editor/classes/BaseType.md#ondispose)
* [opts](/auto-docs/free-layout-editor/classes/BaseType.md#opts)
* [parent](/auto-docs/free-layout-editor/classes/BaseType.md#parent)
* [scope](/auto-docs/free-layout-editor/classes/BaseType.md#scope)
* [toDispose](/auto-docs/free-layout-editor/classes/BaseType.md#todispose)
* [value$](/auto-docs/free-layout-editor/classes/BaseType.md#value$)
* [kind](/auto-docs/free-layout-editor/classes/BaseType.md#kind)

### Accessors

* [children](/auto-docs/free-layout-editor/classes/BaseType.md#children)
* [disposed](/auto-docs/free-layout-editor/classes/BaseType.md#disposed)
* [hash](/auto-docs/free-layout-editor/classes/BaseType.md#hash)
* [kind](/auto-docs/free-layout-editor/classes/BaseType.md#kind-1)
* [version](/auto-docs/free-layout-editor/classes/BaseType.md#version)

### Methods

* [dispatchGlobalEvent](/auto-docs/free-layout-editor/classes/BaseType.md#dispatchglobalevent)
* [dispose](/auto-docs/free-layout-editor/classes/BaseType.md#dispose)
* [fireChange](/auto-docs/free-layout-editor/classes/BaseType.md#firechange)
* [fromJSON](/auto-docs/free-layout-editor/classes/BaseType.md#fromjson)
* [getByKeyPath](/auto-docs/free-layout-editor/classes/BaseType.md#getbykeypath)
* [isTypeEqual](/auto-docs/free-layout-editor/classes/BaseType.md#istypeequal)
* [subscribe](/auto-docs/free-layout-editor/classes/BaseType.md#subscribe)
* [toJSON](/auto-docs/free-layout-editor/classes/BaseType.md#tojson)

## Constructors

### constructor

**new BaseType**<`JSON`>(`createParams`, `opts?`)

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

#### Inherited from

[ASTNode](/auto-docs/free-layout-editor/classes/ASTNode.md).[constructor](/auto-docs/free-layout-editor/classes/ASTNode.md#constructor)

## Properties

### changeLocked

**changeLocked**: `boolean`

Update lock.

* When set to `true`, `fireChange` will not trigger any events.
* This is useful when multiple updates are needed, and you want to avoid multiple triggers.

#### Inherited from

[ASTNode](/auto-docs/free-layout-editor/classes/ASTNode.md).[changeLocked](/auto-docs/free-layout-editor/classes/ASTNode.md#changelocked)

***

### flags

**flags**: `number`

Node flags, used to record some flag information.

#### Overrides

[ASTNode](/auto-docs/free-layout-editor/classes/ASTNode.md).[flags](/auto-docs/free-layout-editor/classes/ASTNode.md#flags)

***

### key

`Readonly` **key**: `string`

The unique identifier of the ASTNode, which is **immutable**.

* Immutable: Once assigned, the key cannot be changed.
* Automatically generated if not specified, and cannot be changed as well.
* If a new key needs to be generated, the current ASTNode should be destroyed and a new ASTNode should be generated.

#### Inherited from

[ASTNode](/auto-docs/free-layout-editor/classes/ASTNode.md).[key](/auto-docs/free-layout-editor/classes/ASTNode.md#key)

***

### onDispose

**onDispose**: [`Event`](/auto-docs/free-layout-editor/interfaces/Event-1.md)<`void`>

Callback triggered upon disposal.

#### Inherited from

[ASTNode](/auto-docs/free-layout-editor/classes/ASTNode.md).[onDispose](/auto-docs/free-layout-editor/classes/ASTNode.md#ondispose)

***

### opts

`Optional` `Readonly` **opts**: `any`

**`Deprecated`**

Get the injected options for the ASTNode.

Please use `@injectToAst(XXXService) declare xxxService: XXXService` to achieve external dependency injection.

#### Inherited from

[ASTNode](/auto-docs/free-layout-editor/classes/ASTNode.md).[opts](/auto-docs/free-layout-editor/classes/ASTNode.md#opts)

***

### parent

`Readonly` **parent**: `undefined` | [`ASTNode`](/auto-docs/free-layout-editor/classes/ASTNode.md)<`any`>

The parent ASTNode.

#### Inherited from

[ASTNode](/auto-docs/free-layout-editor/classes/ASTNode.md).[parent](/auto-docs/free-layout-editor/classes/ASTNode.md#parent)

***

### scope

`Readonly` **scope**: [`Scope`](/auto-docs/free-layout-editor/classes/Scope.md)<`Record`<`string`, `any`>>

The scope in which the ASTNode is located.

#### Inherited from

[ASTNode](/auto-docs/free-layout-editor/classes/ASTNode.md).[scope](/auto-docs/free-layout-editor/classes/ASTNode.md#scope)

***

### toDispose

`Readonly` **toDispose**: [`DisposableCollection`](/auto-docs/free-layout-editor/classes/DisposableCollection.md)

List of disposal handlers for the ASTNode.

#### Inherited from

[ASTNode](/auto-docs/free-layout-editor/classes/ASTNode.md).[toDispose](/auto-docs/free-layout-editor/classes/ASTNode.md#todispose)

***

### value$

`Readonly` **value$**: `BehaviorSubject`<[`ASTNode`](/auto-docs/free-layout-editor/classes/ASTNode.md)<`any`>>

AST node change Observable events, implemented based on RxJS.

* Emits the current ASTNode value upon subscription.
* Emits a new value whenever `fireChange` is called.

#### Inherited from

[ASTNode](/auto-docs/free-layout-editor/classes/ASTNode.md).[value$](/auto-docs/free-layout-editor/classes/ASTNode.md#value$)

***

### kind

`Static` `Readonly` **kind**: `string`

The kind of the ASTNode.

#### Inherited from

[ASTNode](/auto-docs/free-layout-editor/classes/ASTNode.md).[kind](/auto-docs/free-layout-editor/classes/ASTNode.md#kind)

## Accessors

### children

`get` **children**(): [`ASTNode`](/auto-docs/free-layout-editor/classes/ASTNode.md)<`any`>\[]

Gets all child ASTNodes of the current ASTNode.

#### Returns

[`ASTNode`](/auto-docs/free-layout-editor/classes/ASTNode.md)<`any`>\[]

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
| `ActionType` | extends [`GlobalEventActionType`](/auto-docs/free-layout-editor/interfaces/GlobalEventActionType.md)<`string`, `any`, [`ASTNode`](/auto-docs/free-layout-editor/classes/ASTNode.md)<`any`>, `ActionType`> = [`GlobalEventActionType`](/auto-docs/free-layout-editor/interfaces/GlobalEventActionType.md)<`string`, `any`, [`ASTNode`](/auto-docs/free-layout-editor/classes/ASTNode.md)<`any`>> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `Omit`<`ActionType`, `"ast"`> | The global event. |

#### Returns

`void`

#### Inherited from

[ASTNode](/auto-docs/free-layout-editor/classes/ASTNode.md).[dispatchGlobalEvent](/auto-docs/free-layout-editor/classes/ASTNode.md#dispatchglobalevent)

***

### dispose

**dispose**(): `void`

Disposes the ASTNode.

#### Returns

`void`

#### Inherited from

[ASTNode](/auto-docs/free-layout-editor/classes/ASTNode.md).[dispose](/auto-docs/free-layout-editor/classes/ASTNode.md#dispose)

***

### fireChange

**fireChange**(): `void`

Triggers an update for the current node.

#### Returns

`void`

#### Inherited from

[ASTNode](/auto-docs/free-layout-editor/classes/ASTNode.md).[fireChange](/auto-docs/free-layout-editor/classes/ASTNode.md#firechange)

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

[ASTNode](/auto-docs/free-layout-editor/classes/ASTNode.md).[fromJSON](/auto-docs/free-layout-editor/classes/ASTNode.md#fromjson)

***

### getByKeyPath

**getByKeyPath**(`keyPath?`): `undefined` | [`BaseVariableField`](/auto-docs/free-layout-editor/classes/BaseVariableField.md)<`any`>

Get a variable field by key path.

This method should be implemented by drillable types.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `keyPath?` | `string`\[] | The key path to search for. |

#### Returns

`undefined` | [`BaseVariableField`](/auto-docs/free-layout-editor/classes/BaseVariableField.md)<`any`>

The variable field if found, otherwise `undefined`.

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

***

### subscribe

**subscribe**<`Data`>(`observer`, `selector?`): [`Disposable`](/auto-docs/free-layout-editor/interfaces/Disposable-1.md)

Listens for changes to the ASTNode.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Data` | [`BaseType`](/auto-docs/free-layout-editor/classes/BaseType.md)<`JSON`> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `observer` | `ObserverOrNext`<`Data`> | The listener callback. |
| `selector?` | `SubscribeConfig`<[`BaseType`](/auto-docs/free-layout-editor/classes/BaseType.md)<`JSON`>, `Data`> | Listens for specified data. |

#### Returns

[`Disposable`](/auto-docs/free-layout-editor/interfaces/Disposable-1.md)

#### Inherited from

[ASTNode](/auto-docs/free-layout-editor/classes/ASTNode.md).[subscribe](/auto-docs/free-layout-editor/classes/ASTNode.md#subscribe)

***

### toJSON

`Abstract` **toJSON**(): `JSON`

Serializes the current ASTNode to ASTNodeJSON.

#### Returns

`JSON`

#### Inherited from

[ASTNode](/auto-docs/free-layout-editor/classes/ASTNode.md).[toJSON](/auto-docs/free-layout-editor/classes/ASTNode.md#tojson)
