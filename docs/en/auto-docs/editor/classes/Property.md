# Class: Property\<VariableMeta>

`Property` is a variable field that represents a property of a `ObjectType`.

## Type parameters

| Name | Type |
| :------ | :------ |
| `VariableMeta` | `any` |

## Hierarchy

* [`BaseVariableField`](/en/auto-docs/editor/classes/BaseVariableField.md)<`VariableMeta`>

  ↳ **`Property`**

## Table of contents

### Constructors

* [constructor](/en/auto-docs/editor/classes/Property.md#constructor)

### Properties

* [changeLocked](/en/auto-docs/editor/classes/Property.md#changelocked)
* [flags](/en/auto-docs/editor/classes/Property.md#flags)
* [key](/en/auto-docs/editor/classes/Property.md#key)
* [onDispose](/en/auto-docs/editor/classes/Property.md#ondispose)
* [opts](/en/auto-docs/editor/classes/Property.md#opts)
* [parent](/en/auto-docs/editor/classes/Property.md#parent)
* [scope](/en/auto-docs/editor/classes/Property.md#scope)
* [toDispose](/en/auto-docs/editor/classes/Property.md#todispose)
* [value$](/en/auto-docs/editor/classes/Property.md#value$)
* [kind](/en/auto-docs/editor/classes/Property.md#kind)

### Accessors

* [children](/en/auto-docs/editor/classes/Property.md#children)
* [disposed](/en/auto-docs/editor/classes/Property.md#disposed)
* [hash](/en/auto-docs/editor/classes/Property.md#hash)
* [initializer](/en/auto-docs/editor/classes/Property.md#initializer)
* [keyPath](/en/auto-docs/editor/classes/Property.md#keypath)
* [kind](/en/auto-docs/editor/classes/Property.md#kind-1)
* [meta](/en/auto-docs/editor/classes/Property.md#meta)
* [parentFields](/en/auto-docs/editor/classes/Property.md#parentfields)
* [type](/en/auto-docs/editor/classes/Property.md#type)
* [version](/en/auto-docs/editor/classes/Property.md#version)

### Methods

* [dispatchGlobalEvent](/en/auto-docs/editor/classes/Property.md#dispatchglobalevent)
* [dispose](/en/auto-docs/editor/classes/Property.md#dispose)
* [fireChange](/en/auto-docs/editor/classes/Property.md#firechange)
* [fromJSON](/en/auto-docs/editor/classes/Property.md#fromjson)
* [getByKeyPath](/en/auto-docs/editor/classes/Property.md#getbykeypath)
* [onTypeChange](/en/auto-docs/editor/classes/Property.md#ontypechange)
* [subscribe](/en/auto-docs/editor/classes/Property.md#subscribe)
* [toJSON](/en/auto-docs/editor/classes/Property.md#tojson)
* [updateInitializer](/en/auto-docs/editor/classes/Property.md#updateinitializer)
* [updateMeta](/en/auto-docs/editor/classes/Property.md#updatemeta)
* [updateType](/en/auto-docs/editor/classes/Property.md#updatetype)

## Constructors

### constructor

**new Property**<`VariableMeta`>(`createParams`, `opts?`)

Constructor.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `VariableMeta` | `any` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `createParams` | [`CreateASTParams`](/en/auto-docs/editor/interfaces/CreateASTParams.md) | Necessary parameters for creating an ASTNode. |
| `opts?` | `any` | - |

#### Inherited from

[BaseVariableField](/en/auto-docs/editor/classes/BaseVariableField.md).[constructor](/en/auto-docs/editor/classes/BaseVariableField.md#constructor)

## Properties

### changeLocked

**changeLocked**: `boolean`

Update lock.

* When set to `true`, `fireChange` will not trigger any events.
* This is useful when multiple updates are needed, and you want to avoid multiple triggers.

#### Inherited from

[BaseVariableField](/en/auto-docs/editor/classes/BaseVariableField.md).[changeLocked](/en/auto-docs/editor/classes/BaseVariableField.md#changelocked)

***

### flags

**flags**: [`ASTNodeFlags`](/en/auto-docs/editor/enums/ASTNodeFlags.md)

Node flags, used to record some flag information.

#### Inherited from

[BaseVariableField](/en/auto-docs/editor/classes/BaseVariableField.md).[flags](/en/auto-docs/editor/classes/BaseVariableField.md#flags)

***

### key

`Readonly` **key**: `string`

The unique identifier of the ASTNode, which is **immutable**.

* Immutable: Once assigned, the key cannot be changed.
* Automatically generated if not specified, and cannot be changed as well.
* If a new key needs to be generated, the current ASTNode should be destroyed and a new ASTNode should be generated.

#### Inherited from

[BaseVariableField](/en/auto-docs/editor/classes/BaseVariableField.md).[key](/en/auto-docs/editor/classes/BaseVariableField.md#key)

***

### onDispose

**onDispose**: [`Event`](/en/auto-docs/editor/interfaces/Event-1.md)<`void`>

Callback triggered upon disposal.

#### Inherited from

[BaseVariableField](/en/auto-docs/editor/classes/BaseVariableField.md).[onDispose](/en/auto-docs/editor/classes/BaseVariableField.md#ondispose)

***

### opts

`Optional` `Readonly` **opts**: `any`

**`Deprecated`**

Get the injected options for the ASTNode.

Please use `@injectToAst(XXXService) declare xxxService: XXXService` to achieve external dependency injection.

#### Inherited from

[BaseVariableField](/en/auto-docs/editor/classes/BaseVariableField.md).[opts](/en/auto-docs/editor/classes/BaseVariableField.md#opts)

***

### parent

`Readonly` **parent**: `undefined` | [`ASTNode`](/en/auto-docs/editor/classes/ASTNode.md)<`any`>

The parent ASTNode.

#### Inherited from

[BaseVariableField](/en/auto-docs/editor/classes/BaseVariableField.md).[parent](/en/auto-docs/editor/classes/BaseVariableField.md#parent)

***

### scope

`Readonly` **scope**: [`Scope`](/en/auto-docs/editor/classes/Scope.md)<`Record`<`string`, `any`>>

The scope in which the ASTNode is located.

#### Inherited from

[BaseVariableField](/en/auto-docs/editor/classes/BaseVariableField.md).[scope](/en/auto-docs/editor/classes/BaseVariableField.md#scope)

***

### toDispose

`Readonly` **toDispose**: [`DisposableCollection`](/en/auto-docs/editor/classes/DisposableCollection.md)

List of disposal handlers for the ASTNode.

#### Inherited from

[BaseVariableField](/en/auto-docs/editor/classes/BaseVariableField.md).[toDispose](/en/auto-docs/editor/classes/BaseVariableField.md#todispose)

***

### value$

`Readonly` **value$**: `BehaviorSubject`<[`ASTNode`](/en/auto-docs/editor/classes/ASTNode.md)<`any`>>

AST node change Observable events, implemented based on RxJS.

* Emits the current ASTNode value upon subscription.
* Emits a new value whenever `fireChange` is called.

#### Inherited from

[BaseVariableField](/en/auto-docs/editor/classes/BaseVariableField.md).[value$](/en/auto-docs/editor/classes/BaseVariableField.md#value$)

***

### kind

`Static` **kind**: `string`

The kind of the ASTNode.

#### Overrides

[BaseVariableField](/en/auto-docs/editor/classes/BaseVariableField.md).[kind](/en/auto-docs/editor/classes/BaseVariableField.md#kind)

## Accessors

### children

`get` **children**(): [`ASTNode`](/en/auto-docs/editor/classes/ASTNode.md)<`any`>\[]

Gets all child ASTNodes of the current ASTNode.

#### Returns

[`ASTNode`](/en/auto-docs/editor/classes/ASTNode.md)<`any`>\[]

#### Inherited from

BaseVariableField.children

***

### disposed

`get` **disposed**(): `boolean`

#### Returns

`boolean`

#### Inherited from

BaseVariableField.disposed

***

### hash

`get` **hash**(): `string`

The global unique hash of the field, and will be changed when the field is updated.

#### Returns

`string`

#### Inherited from

BaseVariableField.hash

***

### initializer

`get` **initializer**(): `undefined` | [`BaseExpression`](/en/auto-docs/editor/classes/BaseExpression.md)<`any`>

Initializer of the variable field, similar to js code:
`const v = 'hello'`

with initializer, the type of field will be inferred from the initializer.

#### Returns

`undefined` | [`BaseExpression`](/en/auto-docs/editor/classes/BaseExpression.md)<`any`>

#### Inherited from

BaseVariableField.initializer

***

### keyPath

`get` **keyPath**(): `string`\[]

KeyPath of the variable field, sorted from farthest to closest

#### Returns

`string`\[]

#### Inherited from

BaseVariableField.keyPath

***

### kind

`get` **kind**(): `string`

The type of the ASTNode.

#### Returns

`string`

#### Inherited from

BaseVariableField.kind

***

### meta

`get` **meta**(): `VariableMeta`

Metadata of the variable field, you cans store information like `title`, `icon`, etc.

#### Returns

`VariableMeta`

#### Inherited from

BaseVariableField.meta

***

### parentFields

`get` **parentFields**(): [`BaseVariableField`](/en/auto-docs/editor/classes/BaseVariableField.md)<`any`>\[]

Parent variable fields, sorted from closest to farthest

#### Returns

[`BaseVariableField`](/en/auto-docs/editor/classes/BaseVariableField.md)<`any`>\[]

#### Inherited from

BaseVariableField.parentFields

***

### type

`get` **type**(): [`BaseType`](/en/auto-docs/editor/classes/BaseType.md)<`any`>

Type of the variable field, similar to js code:
`const v: string`

#### Returns

[`BaseType`](/en/auto-docs/editor/classes/BaseType.md)<`any`>

#### Inherited from

BaseVariableField.type

***

### version

`get` **version**(): `number`

The version value of the ASTNode.

* You can used to check whether ASTNode are updated.

#### Returns

`number`

#### Inherited from

BaseVariableField.version

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

[BaseVariableField](/en/auto-docs/editor/classes/BaseVariableField.md).[dispatchGlobalEvent](/en/auto-docs/editor/classes/BaseVariableField.md#dispatchglobalevent)

***

### dispose

**dispose**(): `void`

Disposes the ASTNode.

#### Returns

`void`

#### Inherited from

[BaseVariableField](/en/auto-docs/editor/classes/BaseVariableField.md).[dispose](/en/auto-docs/editor/classes/BaseVariableField.md#dispose)

***

### fireChange

**fireChange**(): `void`

Triggers an update for the current node.

#### Returns

`void`

#### Inherited from

[BaseVariableField](/en/auto-docs/editor/classes/BaseVariableField.md).[fireChange](/en/auto-docs/editor/classes/BaseVariableField.md#firechange)

***

### fromJSON

**fromJSON**(`json`): `void`

Deserialize the `BaseVariableFieldJSON` to the `BaseVariableField`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `json` | `Omit`<`BaseVariableFieldJSON`<`VariableMeta`>, `"key"`> | ASTJSON representation of `BaseVariableField` |

#### Returns

`void`

#### Inherited from

[BaseVariableField](/en/auto-docs/editor/classes/BaseVariableField.md).[fromJSON](/en/auto-docs/editor/classes/BaseVariableField.md#fromjson)

***

### getByKeyPath

**getByKeyPath**(`keyPath`): `undefined` | [`BaseVariableField`](/en/auto-docs/editor/classes/BaseVariableField.md)<`any`>

Get the variable field by keyPath, similar to js code:
`v.a.b`

#### Parameters

| Name | Type |
| :------ | :------ |
| `keyPath` | `string`\[] |

#### Returns

`undefined` | [`BaseVariableField`](/en/auto-docs/editor/classes/BaseVariableField.md)<`any`>

#### Inherited from

[BaseVariableField](/en/auto-docs/editor/classes/BaseVariableField.md).[getByKeyPath](/en/auto-docs/editor/classes/BaseVariableField.md#getbykeypath)

***

### onTypeChange

**onTypeChange**(`observer`): [`Disposable`](/en/auto-docs/editor/interfaces/Disposable-1.md)

Subscribe to type change of the variable field

#### Parameters

| Name | Type |
| :------ | :------ |
| `observer` | (`type`: `undefined` | [`ASTNode`](/en/auto-docs/editor/classes/ASTNode.md)<`any`>) => `void` |

#### Returns

[`Disposable`](/en/auto-docs/editor/interfaces/Disposable-1.md)

#### Inherited from

[BaseVariableField](/en/auto-docs/editor/classes/BaseVariableField.md).[onTypeChange](/en/auto-docs/editor/classes/BaseVariableField.md#ontypechange)

***

### subscribe

**subscribe**<`Data`>(`observer`, `selector?`): [`Disposable`](/en/auto-docs/editor/interfaces/Disposable-1.md)

Listens for changes to the ASTNode.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Data` | [`Property`](/en/auto-docs/editor/classes/Property.md)<`VariableMeta`> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `observer` | `ObserverOrNext`<`Data`> | The listener callback. |
| `selector?` | `SubscribeConfig`<[`Property`](/en/auto-docs/editor/classes/Property.md)<`VariableMeta`>, `Data`> | Listens for specified data. |

#### Returns

[`Disposable`](/en/auto-docs/editor/interfaces/Disposable-1.md)

#### Inherited from

[BaseVariableField](/en/auto-docs/editor/classes/BaseVariableField.md).[subscribe](/en/auto-docs/editor/classes/BaseVariableField.md#subscribe)

***

### toJSON

**toJSON**(): `BaseVariableFieldJSON`<`VariableMeta`>

Serialize the variable field to JSON

#### Returns

`BaseVariableFieldJSON`<`VariableMeta`>

ASTNodeJSON representation of `BaseVariableField`

#### Inherited from

[BaseVariableField](/en/auto-docs/editor/classes/BaseVariableField.md).[toJSON](/en/auto-docs/editor/classes/BaseVariableField.md#tojson)

***

### updateInitializer

**updateInitializer**(`nextInitializer?`): `void`

Update the initializer of the variable field

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `nextInitializer?` | [`ASTNodeJSON`](/en/auto-docs/editor/interfaces/ASTNodeJSON.md) | initializer ASTJSON representation of Expression |

#### Returns

`void`

#### Inherited from

[BaseVariableField](/en/auto-docs/editor/classes/BaseVariableField.md).[updateInitializer](/en/auto-docs/editor/classes/BaseVariableField.md#updateinitializer)

***

### updateMeta

**updateMeta**(`nextMeta`): `void`

Update the meta data of the variable field

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `nextMeta` | `VariableMeta` | meta data of the variable field |

#### Returns

`void`

#### Inherited from

[BaseVariableField](/en/auto-docs/editor/classes/BaseVariableField.md).[updateMeta](/en/auto-docs/editor/classes/BaseVariableField.md#updatemeta)

***

### updateType

**updateType**(`type`): `void`

Update the type of the variable field

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `undefined` | `ASTNodeJSONOrKind` | type ASTJSON representation of Type |

#### Returns

`void`

#### Inherited from

[BaseVariableField](/en/auto-docs/editor/classes/BaseVariableField.md).[updateType](/en/auto-docs/editor/classes/BaseVariableField.md#updatetype)
