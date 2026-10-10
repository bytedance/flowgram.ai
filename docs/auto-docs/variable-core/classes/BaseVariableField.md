# Class: BaseVariableField\<VariableMeta>

Variable Field abstract class, which is the base class for `VariableDeclaration` and `Property`

* `VariableDeclaration` is used to declare a variable in a block scope.
* `Property` is used to declare a property in an object.

## Type parameters

| Name | Type |
| :------ | :------ |
| `VariableMeta` | `any` |

## Hierarchy

* [`ASTNode`](/auto-docs/variable-core/classes/ASTNode.md)<`BaseVariableFieldJSON`<`VariableMeta`>>

  ↳ **`BaseVariableField`**

  ↳↳ [`VariableDeclaration`](/auto-docs/variable-core/classes/VariableDeclaration.md)

  ↳↳ [`Property`](/auto-docs/variable-core/classes/Property.md)

## Table of contents

### Constructors

* [constructor](/auto-docs/variable-core/classes/BaseVariableField.md#constructor)

### Properties

* [changeLocked](/auto-docs/variable-core/classes/BaseVariableField.md#changelocked)
* [flags](/auto-docs/variable-core/classes/BaseVariableField.md#flags)
* [key](/auto-docs/variable-core/classes/BaseVariableField.md#key)
* [onDispose](/auto-docs/variable-core/classes/BaseVariableField.md#ondispose)
* [opts](/auto-docs/variable-core/classes/BaseVariableField.md#opts)
* [parent](/auto-docs/variable-core/classes/BaseVariableField.md#parent)
* [scope](/auto-docs/variable-core/classes/BaseVariableField.md#scope)
* [toDispose](/auto-docs/variable-core/classes/BaseVariableField.md#todispose)
* [value$](/auto-docs/variable-core/classes/BaseVariableField.md#value$)
* [kind](/auto-docs/variable-core/classes/BaseVariableField.md#kind)

### Accessors

* [children](/auto-docs/variable-core/classes/BaseVariableField.md#children)
* [disposed](/auto-docs/variable-core/classes/BaseVariableField.md#disposed)
* [hash](/auto-docs/variable-core/classes/BaseVariableField.md#hash)
* [initializer](/auto-docs/variable-core/classes/BaseVariableField.md#initializer)
* [keyPath](/auto-docs/variable-core/classes/BaseVariableField.md#keypath)
* [kind](/auto-docs/variable-core/classes/BaseVariableField.md#kind-1)
* [meta](/auto-docs/variable-core/classes/BaseVariableField.md#meta)
* [parentFields](/auto-docs/variable-core/classes/BaseVariableField.md#parentfields)
* [type](/auto-docs/variable-core/classes/BaseVariableField.md#type)
* [version](/auto-docs/variable-core/classes/BaseVariableField.md#version)

### Methods

* [dispatchGlobalEvent](/auto-docs/variable-core/classes/BaseVariableField.md#dispatchglobalevent)
* [dispose](/auto-docs/variable-core/classes/BaseVariableField.md#dispose)
* [fireChange](/auto-docs/variable-core/classes/BaseVariableField.md#firechange)
* [fromJSON](/auto-docs/variable-core/classes/BaseVariableField.md#fromjson)
* [getByKeyPath](/auto-docs/variable-core/classes/BaseVariableField.md#getbykeypath)
* [onTypeChange](/auto-docs/variable-core/classes/BaseVariableField.md#ontypechange)
* [subscribe](/auto-docs/variable-core/classes/BaseVariableField.md#subscribe)
* [toJSON](/auto-docs/variable-core/classes/BaseVariableField.md#tojson)
* [updateInitializer](/auto-docs/variable-core/classes/BaseVariableField.md#updateinitializer)
* [updateMeta](/auto-docs/variable-core/classes/BaseVariableField.md#updatemeta)
* [updateType](/auto-docs/variable-core/classes/BaseVariableField.md#updatetype)

## Constructors

### constructor

**new BaseVariableField**<`VariableMeta`>(`createParams`, `opts?`)

Constructor.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `VariableMeta` | `any` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `createParams` | [`CreateASTParams`](/auto-docs/variable-core/interfaces/CreateASTParams.md) | Necessary parameters for creating an ASTNode. |
| `opts?` | `any` | - |

#### Inherited from

[ASTNode](/auto-docs/variable-core/classes/ASTNode.md).[constructor](/auto-docs/variable-core/classes/ASTNode.md#constructor)

## Properties

### changeLocked

**changeLocked**: `boolean` = `false`

Update lock.

* When set to `true`, `fireChange` will not trigger any events.
* This is useful when multiple updates are needed, and you want to avoid multiple triggers.

#### Inherited from

[ASTNode](/auto-docs/variable-core/classes/ASTNode.md).[changeLocked](/auto-docs/variable-core/classes/ASTNode.md#changelocked)

***

### flags

**flags**: [`ASTNodeFlags`](/auto-docs/variable-core/enums/ASTNodeFlags.md) = `ASTNodeFlags.VariableField`

Node flags, used to record some flag information.

#### Overrides

[ASTNode](/auto-docs/variable-core/classes/ASTNode.md).[flags](/auto-docs/variable-core/classes/ASTNode.md#flags)

***

### key

`Readonly` **key**: `string`

The unique identifier of the ASTNode, which is **immutable**.

* Immutable: Once assigned, the key cannot be changed.
* Automatically generated if not specified, and cannot be changed as well.
* If a new key needs to be generated, the current ASTNode should be destroyed and a new ASTNode should be generated.

#### Inherited from

[ASTNode](/auto-docs/variable-core/classes/ASTNode.md).[key](/auto-docs/variable-core/classes/ASTNode.md#key)

***

### onDispose

**onDispose**: `Event`<`void`>

Callback triggered upon disposal.

#### Inherited from

[ASTNode](/auto-docs/variable-core/classes/ASTNode.md).[onDispose](/auto-docs/variable-core/classes/ASTNode.md#ondispose)

***

### opts

`Optional` `Readonly` **opts**: `any`

**`Deprecated`**

Get the injected options for the ASTNode.

Please use `@injectToAst(XXXService) declare xxxService: XXXService` to achieve external dependency injection.

#### Inherited from

[ASTNode](/auto-docs/variable-core/classes/ASTNode.md).[opts](/auto-docs/variable-core/classes/ASTNode.md#opts)

***

### parent

`Readonly` **parent**: `undefined` | [`ASTNode`](/auto-docs/variable-core/classes/ASTNode.md)<`any`>

The parent ASTNode.

#### Inherited from

[ASTNode](/auto-docs/variable-core/classes/ASTNode.md).[parent](/auto-docs/variable-core/classes/ASTNode.md#parent)

***

### scope

`Readonly` **scope**: [`Scope`](/auto-docs/variable-core/classes/Scope.md)<`Record`<`string`, `any`>>

The scope in which the ASTNode is located.

#### Inherited from

[ASTNode](/auto-docs/variable-core/classes/ASTNode.md).[scope](/auto-docs/variable-core/classes/ASTNode.md#scope)

***

### toDispose

`Readonly` **toDispose**: `DisposableCollection`

List of disposal handlers for the ASTNode.

#### Inherited from

[ASTNode](/auto-docs/variable-core/classes/ASTNode.md).[toDispose](/auto-docs/variable-core/classes/ASTNode.md#todispose)

***

### value$

`Readonly` **value$**: `BehaviorSubject`<[`ASTNode`](/auto-docs/variable-core/classes/ASTNode.md)<`any`>>

AST node change Observable events, implemented based on RxJS.

* Emits the current ASTNode value upon subscription.
* Emits a new value whenever `fireChange` is called.

#### Inherited from

[ASTNode](/auto-docs/variable-core/classes/ASTNode.md).[value$](/auto-docs/variable-core/classes/ASTNode.md#value$)

***

### kind

`Static` `Readonly` **kind**: `string`

The kind of the ASTNode.

#### Inherited from

[ASTNode](/auto-docs/variable-core/classes/ASTNode.md).[kind](/auto-docs/variable-core/classes/ASTNode.md#kind)

## Accessors

### children

`get` **children**(): [`ASTNode`](/auto-docs/variable-core/classes/ASTNode.md)<`any`>\[]

Gets all child ASTNodes of the current ASTNode.

#### Returns

[`ASTNode`](/auto-docs/variable-core/classes/ASTNode.md)<`any`>\[]

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

The global unique hash of the field, and will be changed when the field is updated.

#### Returns

`string`

#### Overrides

ASTNode.hash

***

### initializer

`get` **initializer**(): `undefined` | [`BaseExpression`](/auto-docs/variable-core/classes/BaseExpression.md)<`any`>

Initializer of the variable field, similar to js code:
`const v = 'hello'`

with initializer, the type of field will be inferred from the initializer.

#### Returns

`undefined` | [`BaseExpression`](/auto-docs/variable-core/classes/BaseExpression.md)<`any`>

***

### keyPath

`get` **keyPath**(): `string`\[]

KeyPath of the variable field, sorted from farthest to closest

#### Returns

`string`\[]

***

### kind

`get` **kind**(): `string`

The type of the ASTNode.

#### Returns

`string`

#### Inherited from

ASTNode.kind

***

### meta

`get` **meta**(): `VariableMeta`

Metadata of the variable field, you cans store information like `title`, `icon`, etc.

#### Returns

`VariableMeta`

***

### parentFields

`get` **parentFields**(): [`BaseVariableField`](/auto-docs/variable-core/classes/BaseVariableField.md)<`any`>\[]

Parent variable fields, sorted from closest to farthest

#### Returns

[`BaseVariableField`](/auto-docs/variable-core/classes/BaseVariableField.md)<`any`>\[]

***

### type

`get` **type**(): [`BaseType`](/auto-docs/variable-core/classes/BaseType.md)<`any`>

Type of the variable field, similar to js code:
`const v: string`

#### Returns

[`BaseType`](/auto-docs/variable-core/classes/BaseType.md)<`any`>

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
| `ActionType` | extends [`GlobalEventActionType`](/auto-docs/variable-core/interfaces/GlobalEventActionType.md)<`string`, `any`, [`ASTNode`](/auto-docs/variable-core/classes/ASTNode.md)<`any`>, `ActionType`> = [`GlobalEventActionType`](/auto-docs/variable-core/interfaces/GlobalEventActionType.md)<`string`, `any`, [`ASTNode`](/auto-docs/variable-core/classes/ASTNode.md)<`any`>> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `Omit`<`ActionType`, `"ast"`> | The global event. |

#### Returns

`void`

#### Inherited from

[ASTNode](/auto-docs/variable-core/classes/ASTNode.md).[dispatchGlobalEvent](/auto-docs/variable-core/classes/ASTNode.md#dispatchglobalevent)

***

### dispose

**dispose**(): `void`

Disposes the ASTNode.

#### Returns

`void`

#### Inherited from

[ASTNode](/auto-docs/variable-core/classes/ASTNode.md).[dispose](/auto-docs/variable-core/classes/ASTNode.md#dispose)

***

### fireChange

**fireChange**(): `void`

Triggers an update for the current node.

#### Returns

`void`

#### Inherited from

[ASTNode](/auto-docs/variable-core/classes/ASTNode.md).[fireChange](/auto-docs/variable-core/classes/ASTNode.md#firechange)

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

#### Overrides

[ASTNode](/auto-docs/variable-core/classes/ASTNode.md).[fromJSON](/auto-docs/variable-core/classes/ASTNode.md#fromjson)

***

### getByKeyPath

**getByKeyPath**(`keyPath`): `undefined` | [`BaseVariableField`](/auto-docs/variable-core/classes/BaseVariableField.md)<`any`>

Get the variable field by keyPath, similar to js code:
`v.a.b`

#### Parameters

| Name | Type |
| :------ | :------ |
| `keyPath` | `string`\[] |

#### Returns

`undefined` | [`BaseVariableField`](/auto-docs/variable-core/classes/BaseVariableField.md)<`any`>

***

### onTypeChange

**onTypeChange**(`observer`): `Disposable`

Subscribe to type change of the variable field

#### Parameters

| Name | Type |
| :------ | :------ |
| `observer` | (`type`: `undefined` | [`ASTNode`](/auto-docs/variable-core/classes/ASTNode.md)<`any`>) => `void` |

#### Returns

`Disposable`

***

### subscribe

**subscribe**<`Data`>(`observer`, `selector?`): `Disposable`

Listens for changes to the ASTNode.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Data` | [`BaseVariableField`](/auto-docs/variable-core/classes/BaseVariableField.md)<`VariableMeta`> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `observer` | `ObserverOrNext`<`Data`> | The listener callback. |
| `selector` | `SubscribeConfig`<[`BaseVariableField`](/auto-docs/variable-core/classes/BaseVariableField.md)<`VariableMeta`>, `Data`> | Listens for specified data. |

#### Returns

`Disposable`

#### Inherited from

[ASTNode](/auto-docs/variable-core/classes/ASTNode.md).[subscribe](/auto-docs/variable-core/classes/ASTNode.md#subscribe)

***

### toJSON

**toJSON**(): `BaseVariableFieldJSON`<`VariableMeta`>

Serialize the variable field to JSON

#### Returns

`BaseVariableFieldJSON`<`VariableMeta`>

ASTNodeJSON representation of `BaseVariableField`

#### Overrides

[ASTNode](/auto-docs/variable-core/classes/ASTNode.md).[toJSON](/auto-docs/variable-core/classes/ASTNode.md#tojson)

***

### updateInitializer

**updateInitializer**(`nextInitializer?`): `void`

Update the initializer of the variable field

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `nextInitializer?` | [`ASTNodeJSON`](/auto-docs/variable-core/interfaces/ASTNodeJSON.md) | initializer ASTJSON representation of Expression |

#### Returns

`void`

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
