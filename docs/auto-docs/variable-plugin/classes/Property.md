# Class: Property\<VariableMeta>

`Property` is a variable field that represents a property of a `ObjectType`.

## Type parameters

| Name | Type |
| :------ | :------ |
| `VariableMeta` | `any` |

## Hierarchy

* [`BaseVariableField`](/auto-docs/variable-plugin/classes/BaseVariableField.md)<`VariableMeta`>

  ↳ **`Property`**

## Table of contents

### Constructors

* [constructor](/auto-docs/variable-plugin/classes/Property.md#constructor)

### Properties

* [changeLocked](/auto-docs/variable-plugin/classes/Property.md#changelocked)
* [flags](/auto-docs/variable-plugin/classes/Property.md#flags)
* [key](/auto-docs/variable-plugin/classes/Property.md#key)
* [onDispose](/auto-docs/variable-plugin/classes/Property.md#ondispose)
* [opts](/auto-docs/variable-plugin/classes/Property.md#opts)
* [parent](/auto-docs/variable-plugin/classes/Property.md#parent)
* [scope](/auto-docs/variable-plugin/classes/Property.md#scope)
* [toDispose](/auto-docs/variable-plugin/classes/Property.md#todispose)
* [value$](/auto-docs/variable-plugin/classes/Property.md#value$)
* [kind](/auto-docs/variable-plugin/classes/Property.md#kind)

### Accessors

* [children](/auto-docs/variable-plugin/classes/Property.md#children)
* [disposed](/auto-docs/variable-plugin/classes/Property.md#disposed)
* [hash](/auto-docs/variable-plugin/classes/Property.md#hash)
* [initializer](/auto-docs/variable-plugin/classes/Property.md#initializer)
* [keyPath](/auto-docs/variable-plugin/classes/Property.md#keypath)
* [kind](/auto-docs/variable-plugin/classes/Property.md#kind-1)
* [meta](/auto-docs/variable-plugin/classes/Property.md#meta)
* [parentFields](/auto-docs/variable-plugin/classes/Property.md#parentfields)
* [type](/auto-docs/variable-plugin/classes/Property.md#type)
* [version](/auto-docs/variable-plugin/classes/Property.md#version)

### Methods

* [dispatchGlobalEvent](/auto-docs/variable-plugin/classes/Property.md#dispatchglobalevent)
* [dispose](/auto-docs/variable-plugin/classes/Property.md#dispose)
* [fireChange](/auto-docs/variable-plugin/classes/Property.md#firechange)
* [fromJSON](/auto-docs/variable-plugin/classes/Property.md#fromjson)
* [getByKeyPath](/auto-docs/variable-plugin/classes/Property.md#getbykeypath)
* [onTypeChange](/auto-docs/variable-plugin/classes/Property.md#ontypechange)
* [subscribe](/auto-docs/variable-plugin/classes/Property.md#subscribe)
* [toJSON](/auto-docs/variable-plugin/classes/Property.md#tojson)
* [updateInitializer](/auto-docs/variable-plugin/classes/Property.md#updateinitializer)
* [updateMeta](/auto-docs/variable-plugin/classes/Property.md#updatemeta)
* [updateType](/auto-docs/variable-plugin/classes/Property.md#updatetype)

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
| `createParams` | [`CreateASTParams`](/auto-docs/variable-plugin/interfaces/CreateASTParams.md) | Necessary parameters for creating an ASTNode. |
| `opts?` | `any` | - |

#### Inherited from

[BaseVariableField](/auto-docs/variable-plugin/classes/BaseVariableField.md).[constructor](/auto-docs/variable-plugin/classes/BaseVariableField.md#constructor)

## Properties

### changeLocked

**changeLocked**: `boolean`

Update lock.

* When set to `true`, `fireChange` will not trigger any events.
* This is useful when multiple updates are needed, and you want to avoid multiple triggers.

#### Inherited from

[BaseVariableField](/auto-docs/variable-plugin/classes/BaseVariableField.md).[changeLocked](/auto-docs/variable-plugin/classes/BaseVariableField.md#changelocked)

***

### flags

**flags**: [`ASTNodeFlags`](/auto-docs/variable-plugin/enums/ASTNodeFlags.md)

Node flags, used to record some flag information.

#### Inherited from

[BaseVariableField](/auto-docs/variable-plugin/classes/BaseVariableField.md).[flags](/auto-docs/variable-plugin/classes/BaseVariableField.md#flags)

***

### key

`Readonly` **key**: `string`

The unique identifier of the ASTNode, which is **immutable**.

* Immutable: Once assigned, the key cannot be changed.
* Automatically generated if not specified, and cannot be changed as well.
* If a new key needs to be generated, the current ASTNode should be destroyed and a new ASTNode should be generated.

#### Inherited from

[BaseVariableField](/auto-docs/variable-plugin/classes/BaseVariableField.md).[key](/auto-docs/variable-plugin/classes/BaseVariableField.md#key)

***

### onDispose

**onDispose**: `Event`<`void`>

Callback triggered upon disposal.

#### Inherited from

[BaseVariableField](/auto-docs/variable-plugin/classes/BaseVariableField.md).[onDispose](/auto-docs/variable-plugin/classes/BaseVariableField.md#ondispose)

***

### opts

`Optional` `Readonly` **opts**: `any`

**`Deprecated`**

Get the injected options for the ASTNode.

Please use `@injectToAst(XXXService) declare xxxService: XXXService` to achieve external dependency injection.

#### Inherited from

[BaseVariableField](/auto-docs/variable-plugin/classes/BaseVariableField.md).[opts](/auto-docs/variable-plugin/classes/BaseVariableField.md#opts)

***

### parent

`Readonly` **parent**: `undefined` | [`ASTNode`](/auto-docs/variable-plugin/classes/ASTNode.md)<`any`>

The parent ASTNode.

#### Inherited from

[BaseVariableField](/auto-docs/variable-plugin/classes/BaseVariableField.md).[parent](/auto-docs/variable-plugin/classes/BaseVariableField.md#parent)

***

### scope

`Readonly` **scope**: [`Scope`](/auto-docs/variable-plugin/classes/Scope.md)<`Record`<`string`, `any`>>

The scope in which the ASTNode is located.

#### Inherited from

[BaseVariableField](/auto-docs/variable-plugin/classes/BaseVariableField.md).[scope](/auto-docs/variable-plugin/classes/BaseVariableField.md#scope)

***

### toDispose

`Readonly` **toDispose**: `DisposableCollection`

List of disposal handlers for the ASTNode.

#### Inherited from

[BaseVariableField](/auto-docs/variable-plugin/classes/BaseVariableField.md).[toDispose](/auto-docs/variable-plugin/classes/BaseVariableField.md#todispose)

***

### value$

`Readonly` **value$**: `BehaviorSubject`<[`ASTNode`](/auto-docs/variable-plugin/classes/ASTNode.md)<`any`>>

AST node change Observable events, implemented based on RxJS.

* Emits the current ASTNode value upon subscription.
* Emits a new value whenever `fireChange` is called.

#### Inherited from

[BaseVariableField](/auto-docs/variable-plugin/classes/BaseVariableField.md).[value$](/auto-docs/variable-plugin/classes/BaseVariableField.md#value$)

***

### kind

`Static` **kind**: `string`

The kind of the ASTNode.

#### Overrides

[BaseVariableField](/auto-docs/variable-plugin/classes/BaseVariableField.md).[kind](/auto-docs/variable-plugin/classes/BaseVariableField.md#kind)

## Accessors

### children

`get` **children**(): [`ASTNode`](/auto-docs/variable-plugin/classes/ASTNode.md)<`any`>\[]

Gets all child ASTNodes of the current ASTNode.

#### Returns

[`ASTNode`](/auto-docs/variable-plugin/classes/ASTNode.md)<`any`>\[]

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

`get` **initializer**(): `undefined` | [`BaseExpression`](/auto-docs/variable-plugin/classes/BaseExpression.md)<`any`>

Initializer of the variable field, similar to js code:
`const v = 'hello'`

with initializer, the type of field will be inferred from the initializer.

#### Returns

`undefined` | [`BaseExpression`](/auto-docs/variable-plugin/classes/BaseExpression.md)<`any`>

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

`get` **parentFields**(): [`BaseVariableField`](/auto-docs/variable-plugin/classes/BaseVariableField.md)<`any`>\[]

Parent variable fields, sorted from closest to farthest

#### Returns

[`BaseVariableField`](/auto-docs/variable-plugin/classes/BaseVariableField.md)<`any`>\[]

#### Inherited from

BaseVariableField.parentFields

***

### type

`get` **type**(): [`BaseType`](/auto-docs/variable-plugin/classes/BaseType.md)<`any`>

Type of the variable field, similar to js code:
`const v: string`

#### Returns

[`BaseType`](/auto-docs/variable-plugin/classes/BaseType.md)<`any`>

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
| `ActionType` | extends [`GlobalEventActionType`](/auto-docs/variable-plugin/interfaces/GlobalEventActionType.md)<`string`, `any`, [`ASTNode`](/auto-docs/variable-plugin/classes/ASTNode.md)<`any`>, `ActionType`> = [`GlobalEventActionType`](/auto-docs/variable-plugin/interfaces/GlobalEventActionType.md)<`string`, `any`, [`ASTNode`](/auto-docs/variable-plugin/classes/ASTNode.md)<`any`>> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `Omit`<`ActionType`, `"ast"`> | The global event. |

#### Returns

`void`

#### Inherited from

[BaseVariableField](/auto-docs/variable-plugin/classes/BaseVariableField.md).[dispatchGlobalEvent](/auto-docs/variable-plugin/classes/BaseVariableField.md#dispatchglobalevent)

***

### dispose

**dispose**(): `void`

Disposes the ASTNode.

#### Returns

`void`

#### Inherited from

[BaseVariableField](/auto-docs/variable-plugin/classes/BaseVariableField.md).[dispose](/auto-docs/variable-plugin/classes/BaseVariableField.md#dispose)

***

### fireChange

**fireChange**(): `void`

Triggers an update for the current node.

#### Returns

`void`

#### Inherited from

[BaseVariableField](/auto-docs/variable-plugin/classes/BaseVariableField.md).[fireChange](/auto-docs/variable-plugin/classes/BaseVariableField.md#firechange)

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

[BaseVariableField](/auto-docs/variable-plugin/classes/BaseVariableField.md).[fromJSON](/auto-docs/variable-plugin/classes/BaseVariableField.md#fromjson)

***

### getByKeyPath

**getByKeyPath**(`keyPath`): `undefined` | [`BaseVariableField`](/auto-docs/variable-plugin/classes/BaseVariableField.md)<`any`>

Get the variable field by keyPath, similar to js code:
`v.a.b`

#### Parameters

| Name | Type |
| :------ | :------ |
| `keyPath` | `string`\[] |

#### Returns

`undefined` | [`BaseVariableField`](/auto-docs/variable-plugin/classes/BaseVariableField.md)<`any`>

#### Inherited from

[BaseVariableField](/auto-docs/variable-plugin/classes/BaseVariableField.md).[getByKeyPath](/auto-docs/variable-plugin/classes/BaseVariableField.md#getbykeypath)

***

### onTypeChange

**onTypeChange**(`observer`): `Disposable`

Subscribe to type change of the variable field

#### Parameters

| Name | Type |
| :------ | :------ |
| `observer` | (`type`: `undefined` | [`ASTNode`](/auto-docs/variable-plugin/classes/ASTNode.md)<`any`>) => `void` |

#### Returns

`Disposable`

#### Inherited from

[BaseVariableField](/auto-docs/variable-plugin/classes/BaseVariableField.md).[onTypeChange](/auto-docs/variable-plugin/classes/BaseVariableField.md#ontypechange)

***

### subscribe

**subscribe**<`Data`>(`observer`, `selector?`): `Disposable`

Listens for changes to the ASTNode.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Data` | [`Property`](/auto-docs/variable-plugin/classes/Property.md)<`VariableMeta`> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `observer` | `ObserverOrNext`<`Data`> | The listener callback. |
| `selector?` | `SubscribeConfig`<[`Property`](/auto-docs/variable-plugin/classes/Property.md)<`VariableMeta`>, `Data`> | Listens for specified data. |

#### Returns

`Disposable`

#### Inherited from

[BaseVariableField](/auto-docs/variable-plugin/classes/BaseVariableField.md).[subscribe](/auto-docs/variable-plugin/classes/BaseVariableField.md#subscribe)

***

### toJSON

**toJSON**(): `BaseVariableFieldJSON`<`VariableMeta`>

Serialize the variable field to JSON

#### Returns

`BaseVariableFieldJSON`<`VariableMeta`>

ASTNodeJSON representation of `BaseVariableField`

#### Inherited from

[BaseVariableField](/auto-docs/variable-plugin/classes/BaseVariableField.md).[toJSON](/auto-docs/variable-plugin/classes/BaseVariableField.md#tojson)

***

### updateInitializer

**updateInitializer**(`nextInitializer?`): `void`

Update the initializer of the variable field

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `nextInitializer?` | [`ASTNodeJSON`](/auto-docs/variable-plugin/interfaces/ASTNodeJSON.md) | initializer ASTJSON representation of Expression |

#### Returns

`void`

#### Inherited from

[BaseVariableField](/auto-docs/variable-plugin/classes/BaseVariableField.md).[updateInitializer](/auto-docs/variable-plugin/classes/BaseVariableField.md#updateinitializer)

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

[BaseVariableField](/auto-docs/variable-plugin/classes/BaseVariableField.md).[updateMeta](/auto-docs/variable-plugin/classes/BaseVariableField.md#updatemeta)

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

[BaseVariableField](/auto-docs/variable-plugin/classes/BaseVariableField.md).[updateType](/auto-docs/variable-plugin/classes/BaseVariableField.md#updatetype)
