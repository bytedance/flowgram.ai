# Class: BaseVariableField\<VariableMeta>

Variable Field abstract class, which is the base class for `VariableDeclaration` and `Property`

* `VariableDeclaration` is used to declare a variable in a block scope.
* `Property` is used to declare a property in an object.

## Type parameters

| Name | Type |
| :------ | :------ |
| `VariableMeta` | `any` |

## Hierarchy

* [`ASTNode`](/auto-docs/free-layout-editor/classes/ASTNode.md)<`BaseVariableFieldJSON`<`VariableMeta`>>

  ↳ **`BaseVariableField`**

  ↳↳ [`Property`](/auto-docs/free-layout-editor/classes/Property.md)

  ↳↳ [`VariableDeclaration`](/auto-docs/free-layout-editor/classes/VariableDeclaration.md)

## Table of contents

### Constructors

* [constructor](/auto-docs/free-layout-editor/classes/BaseVariableField.md#constructor)

### Properties

* [changeLocked](/auto-docs/free-layout-editor/classes/BaseVariableField.md#changelocked)
* [flags](/auto-docs/free-layout-editor/classes/BaseVariableField.md#flags)
* [key](/auto-docs/free-layout-editor/classes/BaseVariableField.md#key)
* [onDispose](/auto-docs/free-layout-editor/classes/BaseVariableField.md#ondispose)
* [opts](/auto-docs/free-layout-editor/classes/BaseVariableField.md#opts)
* [parent](/auto-docs/free-layout-editor/classes/BaseVariableField.md#parent)
* [scope](/auto-docs/free-layout-editor/classes/BaseVariableField.md#scope)
* [toDispose](/auto-docs/free-layout-editor/classes/BaseVariableField.md#todispose)
* [value$](/auto-docs/free-layout-editor/classes/BaseVariableField.md#value$)
* [kind](/auto-docs/free-layout-editor/classes/BaseVariableField.md#kind)

### Accessors

* [children](/auto-docs/free-layout-editor/classes/BaseVariableField.md#children)
* [disposed](/auto-docs/free-layout-editor/classes/BaseVariableField.md#disposed)
* [hash](/auto-docs/free-layout-editor/classes/BaseVariableField.md#hash)
* [initializer](/auto-docs/free-layout-editor/classes/BaseVariableField.md#initializer)
* [keyPath](/auto-docs/free-layout-editor/classes/BaseVariableField.md#keypath)
* [kind](/auto-docs/free-layout-editor/classes/BaseVariableField.md#kind-1)
* [meta](/auto-docs/free-layout-editor/classes/BaseVariableField.md#meta)
* [parentFields](/auto-docs/free-layout-editor/classes/BaseVariableField.md#parentfields)
* [type](/auto-docs/free-layout-editor/classes/BaseVariableField.md#type)
* [version](/auto-docs/free-layout-editor/classes/BaseVariableField.md#version)

### Methods

* [dispatchGlobalEvent](/auto-docs/free-layout-editor/classes/BaseVariableField.md#dispatchglobalevent)
* [dispose](/auto-docs/free-layout-editor/classes/BaseVariableField.md#dispose)
* [fireChange](/auto-docs/free-layout-editor/classes/BaseVariableField.md#firechange)
* [fromJSON](/auto-docs/free-layout-editor/classes/BaseVariableField.md#fromjson)
* [getByKeyPath](/auto-docs/free-layout-editor/classes/BaseVariableField.md#getbykeypath)
* [onTypeChange](/auto-docs/free-layout-editor/classes/BaseVariableField.md#ontypechange)
* [subscribe](/auto-docs/free-layout-editor/classes/BaseVariableField.md#subscribe)
* [toJSON](/auto-docs/free-layout-editor/classes/BaseVariableField.md#tojson)
* [updateInitializer](/auto-docs/free-layout-editor/classes/BaseVariableField.md#updateinitializer)
* [updateMeta](/auto-docs/free-layout-editor/classes/BaseVariableField.md#updatemeta)
* [updateType](/auto-docs/free-layout-editor/classes/BaseVariableField.md#updatetype)

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

**flags**: [`ASTNodeFlags`](/auto-docs/free-layout-editor/enums/ASTNodeFlags.md)

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

The global unique hash of the field, and will be changed when the field is updated.

#### Returns

`string`

#### Overrides

ASTNode.hash

***

### initializer

`get` **initializer**(): `undefined` | [`BaseExpression`](/auto-docs/free-layout-editor/classes/BaseExpression.md)<`any`>

Initializer of the variable field, similar to js code:
`const v = 'hello'`

with initializer, the type of field will be inferred from the initializer.

#### Returns

`undefined` | [`BaseExpression`](/auto-docs/free-layout-editor/classes/BaseExpression.md)<`any`>

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

`get` **parentFields**(): [`BaseVariableField`](/auto-docs/free-layout-editor/classes/BaseVariableField.md)<`any`>\[]

Parent variable fields, sorted from closest to farthest

#### Returns

[`BaseVariableField`](/auto-docs/free-layout-editor/classes/BaseVariableField.md)<`any`>\[]

***

### type

`get` **type**(): [`BaseType`](/auto-docs/free-layout-editor/classes/BaseType.md)<`any`>

Type of the variable field, similar to js code:
`const v: string`

#### Returns

[`BaseType`](/auto-docs/free-layout-editor/classes/BaseType.md)<`any`>

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

**fromJSON**(`json`): `void`

Deserialize the `BaseVariableFieldJSON` to the `BaseVariableField`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `json` | `Omit`<`BaseVariableFieldJSON`<`VariableMeta`>, `"key"`> | ASTJSON representation of `BaseVariableField` |

#### Returns

`void`

#### Overrides

[ASTNode](/auto-docs/free-layout-editor/classes/ASTNode.md).[fromJSON](/auto-docs/free-layout-editor/classes/ASTNode.md#fromjson)

***

### getByKeyPath

**getByKeyPath**(`keyPath`): `undefined` | [`BaseVariableField`](/auto-docs/free-layout-editor/classes/BaseVariableField.md)<`any`>

Get the variable field by keyPath, similar to js code:
`v.a.b`

#### Parameters

| Name | Type |
| :------ | :------ |
| `keyPath` | `string`\[] |

#### Returns

`undefined` | [`BaseVariableField`](/auto-docs/free-layout-editor/classes/BaseVariableField.md)<`any`>

***

### onTypeChange

**onTypeChange**(`observer`): [`Disposable`](/auto-docs/free-layout-editor/interfaces/Disposable-1.md)

Subscribe to type change of the variable field

#### Parameters

| Name | Type |
| :------ | :------ |
| `observer` | (`type`: `undefined` | [`ASTNode`](/auto-docs/free-layout-editor/classes/ASTNode.md)<`any`>) => `void` |

#### Returns

[`Disposable`](/auto-docs/free-layout-editor/interfaces/Disposable-1.md)

***

### subscribe

**subscribe**<`Data`>(`observer`, `selector?`): [`Disposable`](/auto-docs/free-layout-editor/interfaces/Disposable-1.md)

Listens for changes to the ASTNode.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Data` | [`BaseVariableField`](/auto-docs/free-layout-editor/classes/BaseVariableField.md)<`VariableMeta`> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `observer` | `ObserverOrNext`<`Data`> | The listener callback. |
| `selector?` | `SubscribeConfig`<[`BaseVariableField`](/auto-docs/free-layout-editor/classes/BaseVariableField.md)<`VariableMeta`>, `Data`> | Listens for specified data. |

#### Returns

[`Disposable`](/auto-docs/free-layout-editor/interfaces/Disposable-1.md)

#### Inherited from

[ASTNode](/auto-docs/free-layout-editor/classes/ASTNode.md).[subscribe](/auto-docs/free-layout-editor/classes/ASTNode.md#subscribe)

***

### toJSON

**toJSON**(): `BaseVariableFieldJSON`<`VariableMeta`>

Serialize the variable field to JSON

#### Returns

`BaseVariableFieldJSON`<`VariableMeta`>

ASTNodeJSON representation of `BaseVariableField`

#### Overrides

[ASTNode](/auto-docs/free-layout-editor/classes/ASTNode.md).[toJSON](/auto-docs/free-layout-editor/classes/ASTNode.md#tojson)

***

### updateInitializer

**updateInitializer**(`nextInitializer?`): `void`

Update the initializer of the variable field

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `nextInitializer?` | [`ASTNodeJSON`](/auto-docs/free-layout-editor/interfaces/ASTNodeJSON.md) | initializer ASTJSON representation of Expression |

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
