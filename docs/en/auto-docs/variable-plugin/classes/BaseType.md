# Class: BaseType\<JSON>

Base class for all types.

All other types should extend this class.

## Type parameters

| Name | Type |
| :------ | :------ |
| `JSON` | extends [`ASTNodeJSON`](/en/auto-docs/variable-plugin/interfaces/ASTNodeJSON.md) = `any` |

## Hierarchy

* [`ASTNode`](/en/auto-docs/variable-plugin/classes/ASTNode.md)<`JSON`>

  ↳ **`BaseType`**

  ↳↳ [`ArrayType`](/en/auto-docs/variable-plugin/classes/ArrayType.md)

  ↳↳ [`BooleanType`](/en/auto-docs/variable-plugin/classes/BooleanType.md)

  ↳↳ [`CustomType`](/en/auto-docs/variable-plugin/classes/CustomType.md)

  ↳↳ [`IntegerType`](/en/auto-docs/variable-plugin/classes/IntegerType.md)

  ↳↳ [`MapType`](/en/auto-docs/variable-plugin/classes/MapType.md)

  ↳↳ [`NumberType`](/en/auto-docs/variable-plugin/classes/NumberType.md)

  ↳↳ [`ObjectType`](/en/auto-docs/variable-plugin/classes/ObjectType.md)

  ↳↳ [`StringType`](/en/auto-docs/variable-plugin/classes/StringType.md)

## Table of contents

### Constructors

* [constructor](/en/auto-docs/variable-plugin/classes/BaseType.md#constructor)

### Properties

* [changeLocked](/en/auto-docs/variable-plugin/classes/BaseType.md#changelocked)
* [flags](/en/auto-docs/variable-plugin/classes/BaseType.md#flags)
* [key](/en/auto-docs/variable-plugin/classes/BaseType.md#key)
* [onDispose](/en/auto-docs/variable-plugin/classes/BaseType.md#ondispose)
* [opts](/en/auto-docs/variable-plugin/classes/BaseType.md#opts)
* [parent](/en/auto-docs/variable-plugin/classes/BaseType.md#parent)
* [scope](/en/auto-docs/variable-plugin/classes/BaseType.md#scope)
* [toDispose](/en/auto-docs/variable-plugin/classes/BaseType.md#todispose)
* [value$](/en/auto-docs/variable-plugin/classes/BaseType.md#value$)
* [kind](/en/auto-docs/variable-plugin/classes/BaseType.md#kind)

### Accessors

* [children](/en/auto-docs/variable-plugin/classes/BaseType.md#children)
* [disposed](/en/auto-docs/variable-plugin/classes/BaseType.md#disposed)
* [hash](/en/auto-docs/variable-plugin/classes/BaseType.md#hash)
* [kind](/en/auto-docs/variable-plugin/classes/BaseType.md#kind-1)
* [version](/en/auto-docs/variable-plugin/classes/BaseType.md#version)

### Methods

* [dispatchGlobalEvent](/en/auto-docs/variable-plugin/classes/BaseType.md#dispatchglobalevent)
* [dispose](/en/auto-docs/variable-plugin/classes/BaseType.md#dispose)
* [fireChange](/en/auto-docs/variable-plugin/classes/BaseType.md#firechange)
* [fromJSON](/en/auto-docs/variable-plugin/classes/BaseType.md#fromjson)
* [getByKeyPath](/en/auto-docs/variable-plugin/classes/BaseType.md#getbykeypath)
* [isTypeEqual](/en/auto-docs/variable-plugin/classes/BaseType.md#istypeequal)
* [subscribe](/en/auto-docs/variable-plugin/classes/BaseType.md#subscribe)
* [toJSON](/en/auto-docs/variable-plugin/classes/BaseType.md#tojson)

## Constructors

### constructor

**new BaseType**<`JSON`>(`createParams`, `opts?`)

Constructor.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `JSON` | extends [`ASTNodeJSON`](/en/auto-docs/variable-plugin/interfaces/ASTNodeJSON.md) = `any` |

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

**flags**: `number`

Node flags, used to record some flag information.

#### Overrides

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

`Static` `Readonly` **kind**: `string`

The kind of the ASTNode.

#### Inherited from

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

`Abstract` **fromJSON**(`json`): `void`

Parses AST JSON data.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `json` | `JSON` | AST JSON data. |

#### Returns

`void`

#### Inherited from

[ASTNode](/en/auto-docs/variable-plugin/classes/ASTNode.md).[fromJSON](/en/auto-docs/variable-plugin/classes/ASTNode.md#fromjson)

***

### getByKeyPath

**getByKeyPath**(`keyPath?`): `undefined` | [`BaseVariableField`](/en/auto-docs/variable-plugin/classes/BaseVariableField.md)<`any`>

Get a variable field by key path.

This method should be implemented by drillable types.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `keyPath?` | `string`\[] | The key path to search for. |

#### Returns

`undefined` | [`BaseVariableField`](/en/auto-docs/variable-plugin/classes/BaseVariableField.md)<`any`>

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

**subscribe**<`Data`>(`observer`, `selector?`): `Disposable`

Listens for changes to the ASTNode.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Data` | [`BaseType`](/en/auto-docs/variable-plugin/classes/BaseType.md)<`JSON`> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `observer` | `ObserverOrNext`<`Data`> | The listener callback. |
| `selector?` | `SubscribeConfig`<[`BaseType`](/en/auto-docs/variable-plugin/classes/BaseType.md)<`JSON`>, `Data`> | Listens for specified data. |

#### Returns

`Disposable`

#### Inherited from

[ASTNode](/en/auto-docs/variable-plugin/classes/ASTNode.md).[subscribe](/en/auto-docs/variable-plugin/classes/ASTNode.md#subscribe)

***

### toJSON

`Abstract` **toJSON**(): `JSON`

Serializes the current ASTNode to ASTNodeJSON.

#### Returns

`JSON`

#### Inherited from

[ASTNode](/en/auto-docs/variable-plugin/classes/ASTNode.md).[toJSON](/en/auto-docs/variable-plugin/classes/ASTNode.md#tojson)
