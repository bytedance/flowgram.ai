# Class: VariableDeclaration\<VariableMeta>

`VariableDeclaration` is a variable field that represents a variable declaration.

## Type parameters

| Name | Type |
| :------ | :------ |
| `VariableMeta` | `any` |

## Hierarchy

* [`BaseVariableField`](/auto-docs/free-layout-editor/classes/BaseVariableField.md)<`VariableMeta`>

  ↳ **`VariableDeclaration`**

## Table of contents

### Constructors

* [constructor](/auto-docs/free-layout-editor/classes/VariableDeclaration.md#constructor)

### Properties

* [changeLocked](/auto-docs/free-layout-editor/classes/VariableDeclaration.md#changelocked)
* [flags](/auto-docs/free-layout-editor/classes/VariableDeclaration.md#flags)
* [key](/auto-docs/free-layout-editor/classes/VariableDeclaration.md#key)
* [onDispose](/auto-docs/free-layout-editor/classes/VariableDeclaration.md#ondispose)
* [opts](/auto-docs/free-layout-editor/classes/VariableDeclaration.md#opts)
* [parent](/auto-docs/free-layout-editor/classes/VariableDeclaration.md#parent)
* [scope](/auto-docs/free-layout-editor/classes/VariableDeclaration.md#scope)
* [toDispose](/auto-docs/free-layout-editor/classes/VariableDeclaration.md#todispose)
* [value$](/auto-docs/free-layout-editor/classes/VariableDeclaration.md#value$)
* [kind](/auto-docs/free-layout-editor/classes/VariableDeclaration.md#kind)

### Accessors

* [children](/auto-docs/free-layout-editor/classes/VariableDeclaration.md#children)
* [disposed](/auto-docs/free-layout-editor/classes/VariableDeclaration.md#disposed)
* [hash](/auto-docs/free-layout-editor/classes/VariableDeclaration.md#hash)
* [initializer](/auto-docs/free-layout-editor/classes/VariableDeclaration.md#initializer)
* [keyPath](/auto-docs/free-layout-editor/classes/VariableDeclaration.md#keypath)
* [kind](/auto-docs/free-layout-editor/classes/VariableDeclaration.md#kind-1)
* [meta](/auto-docs/free-layout-editor/classes/VariableDeclaration.md#meta)
* [order](/auto-docs/free-layout-editor/classes/VariableDeclaration.md#order)
* [parentFields](/auto-docs/free-layout-editor/classes/VariableDeclaration.md#parentfields)
* [type](/auto-docs/free-layout-editor/classes/VariableDeclaration.md#type)
* [version](/auto-docs/free-layout-editor/classes/VariableDeclaration.md#version)

### Methods

* [dispatchGlobalEvent](/auto-docs/free-layout-editor/classes/VariableDeclaration.md#dispatchglobalevent)
* [dispose](/auto-docs/free-layout-editor/classes/VariableDeclaration.md#dispose)
* [fireChange](/auto-docs/free-layout-editor/classes/VariableDeclaration.md#firechange)
* [fromJSON](/auto-docs/free-layout-editor/classes/VariableDeclaration.md#fromjson)
* [getByKeyPath](/auto-docs/free-layout-editor/classes/VariableDeclaration.md#getbykeypath)
* [onTypeChange](/auto-docs/free-layout-editor/classes/VariableDeclaration.md#ontypechange)
* [subscribe](/auto-docs/free-layout-editor/classes/VariableDeclaration.md#subscribe)
* [toJSON](/auto-docs/free-layout-editor/classes/VariableDeclaration.md#tojson)
* [updateInitializer](/auto-docs/free-layout-editor/classes/VariableDeclaration.md#updateinitializer)
* [updateMeta](/auto-docs/free-layout-editor/classes/VariableDeclaration.md#updatemeta)
* [updateOrder](/auto-docs/free-layout-editor/classes/VariableDeclaration.md#updateorder)
* [updateType](/auto-docs/free-layout-editor/classes/VariableDeclaration.md#updatetype)

## Constructors

### constructor

**new VariableDeclaration**<`VariableMeta`>(`params`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `VariableMeta` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`CreateASTParams`](/auto-docs/free-layout-editor/interfaces/CreateASTParams.md) |

#### Overrides

[BaseVariableField](/auto-docs/free-layout-editor/classes/BaseVariableField.md).[constructor](/auto-docs/free-layout-editor/classes/BaseVariableField.md#constructor)

## Properties

### changeLocked

**changeLocked**: `boolean`

Update lock.

* When set to `true`, `fireChange` will not trigger any events.
* This is useful when multiple updates are needed, and you want to avoid multiple triggers.

#### Inherited from

[BaseVariableField](/auto-docs/free-layout-editor/classes/BaseVariableField.md).[changeLocked](/auto-docs/free-layout-editor/classes/BaseVariableField.md#changelocked)

***

### flags

**flags**: [`ASTNodeFlags`](/auto-docs/free-layout-editor/enums/ASTNodeFlags.md)

Node flags, used to record some flag information.

#### Inherited from

[BaseVariableField](/auto-docs/free-layout-editor/classes/BaseVariableField.md).[flags](/auto-docs/free-layout-editor/classes/BaseVariableField.md#flags)

***

### key

`Readonly` **key**: `string`

The unique identifier of the ASTNode, which is **immutable**.

* Immutable: Once assigned, the key cannot be changed.
* Automatically generated if not specified, and cannot be changed as well.
* If a new key needs to be generated, the current ASTNode should be destroyed and a new ASTNode should be generated.

#### Inherited from

[BaseVariableField](/auto-docs/free-layout-editor/classes/BaseVariableField.md).[key](/auto-docs/free-layout-editor/classes/BaseVariableField.md#key)

***

### onDispose

**onDispose**: [`Event`](/auto-docs/free-layout-editor/interfaces/Event-1.md)<`void`>

Callback triggered upon disposal.

#### Inherited from

[BaseVariableField](/auto-docs/free-layout-editor/classes/BaseVariableField.md).[onDispose](/auto-docs/free-layout-editor/classes/BaseVariableField.md#ondispose)

***

### opts

`Optional` `Readonly` **opts**: `any`

**`Deprecated`**

Get the injected options for the ASTNode.

Please use `@injectToAst(XXXService) declare xxxService: XXXService` to achieve external dependency injection.

#### Inherited from

[BaseVariableField](/auto-docs/free-layout-editor/classes/BaseVariableField.md).[opts](/auto-docs/free-layout-editor/classes/BaseVariableField.md#opts)

***

### parent

`Readonly` **parent**: `undefined` | [`ASTNode`](/auto-docs/free-layout-editor/classes/ASTNode.md)<`any`>

The parent ASTNode.

#### Inherited from

[BaseVariableField](/auto-docs/free-layout-editor/classes/BaseVariableField.md).[parent](/auto-docs/free-layout-editor/classes/BaseVariableField.md#parent)

***

### scope

`Readonly` **scope**: [`Scope`](/auto-docs/free-layout-editor/classes/Scope.md)<`Record`<`string`, `any`>>

The scope in which the ASTNode is located.

#### Inherited from

[BaseVariableField](/auto-docs/free-layout-editor/classes/BaseVariableField.md).[scope](/auto-docs/free-layout-editor/classes/BaseVariableField.md#scope)

***

### toDispose

`Readonly` **toDispose**: [`DisposableCollection`](/auto-docs/free-layout-editor/classes/DisposableCollection.md)

List of disposal handlers for the ASTNode.

#### Inherited from

[BaseVariableField](/auto-docs/free-layout-editor/classes/BaseVariableField.md).[toDispose](/auto-docs/free-layout-editor/classes/BaseVariableField.md#todispose)

***

### value$

`Readonly` **value$**: `BehaviorSubject`<[`ASTNode`](/auto-docs/free-layout-editor/classes/ASTNode.md)<`any`>>

AST node change Observable events, implemented based on RxJS.

* Emits the current ASTNode value upon subscription.
* Emits a new value whenever `fireChange` is called.

#### Inherited from

[BaseVariableField](/auto-docs/free-layout-editor/classes/BaseVariableField.md).[value$](/auto-docs/free-layout-editor/classes/BaseVariableField.md#value$)

***

### kind

`Static` **kind**: `string`

The kind of the ASTNode.

#### Overrides

[BaseVariableField](/auto-docs/free-layout-editor/classes/BaseVariableField.md).[kind](/auto-docs/free-layout-editor/classes/BaseVariableField.md#kind)

## Accessors

### children

`get` **children**(): [`ASTNode`](/auto-docs/free-layout-editor/classes/ASTNode.md)<`any`>\[]

Gets all child ASTNodes of the current ASTNode.

#### Returns

[`ASTNode`](/auto-docs/free-layout-editor/classes/ASTNode.md)<`any`>\[]

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

`get` **initializer**(): `undefined` | [`BaseExpression`](/auto-docs/free-layout-editor/classes/BaseExpression.md)<`any`>

Initializer of the variable field, similar to js code:
`const v = 'hello'`

with initializer, the type of field will be inferred from the initializer.

#### Returns

`undefined` | [`BaseExpression`](/auto-docs/free-layout-editor/classes/BaseExpression.md)<`any`>

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

### order

`get` **order**(): `number`

Variable sorting order, which is used to sort variables in `scope.outputs.variables`

#### Returns

`number`

***

### parentFields

`get` **parentFields**(): [`BaseVariableField`](/auto-docs/free-layout-editor/classes/BaseVariableField.md)<`any`>\[]

Parent variable fields, sorted from closest to farthest

#### Returns

[`BaseVariableField`](/auto-docs/free-layout-editor/classes/BaseVariableField.md)<`any`>\[]

#### Inherited from

BaseVariableField.parentFields

***

### type

`get` **type**(): [`BaseType`](/auto-docs/free-layout-editor/classes/BaseType.md)<`any`>

Type of the variable field, similar to js code:
`const v: string`

#### Returns

[`BaseType`](/auto-docs/free-layout-editor/classes/BaseType.md)<`any`>

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
| `ActionType` | extends [`GlobalEventActionType`](/auto-docs/free-layout-editor/interfaces/GlobalEventActionType.md)<`string`, `any`, [`ASTNode`](/auto-docs/free-layout-editor/classes/ASTNode.md)<`any`>, `ActionType`> = [`GlobalEventActionType`](/auto-docs/free-layout-editor/interfaces/GlobalEventActionType.md)<`string`, `any`, [`ASTNode`](/auto-docs/free-layout-editor/classes/ASTNode.md)<`any`>> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `Omit`<`ActionType`, `"ast"`> | The global event. |

#### Returns

`void`

#### Inherited from

[BaseVariableField](/auto-docs/free-layout-editor/classes/BaseVariableField.md).[dispatchGlobalEvent](/auto-docs/free-layout-editor/classes/BaseVariableField.md#dispatchglobalevent)

***

### dispose

**dispose**(): `void`

Disposes the ASTNode.

#### Returns

`void`

#### Inherited from

[BaseVariableField](/auto-docs/free-layout-editor/classes/BaseVariableField.md).[dispose](/auto-docs/free-layout-editor/classes/BaseVariableField.md#dispose)

***

### fireChange

**fireChange**(): `void`

Triggers an update for the current node.

#### Returns

`void`

#### Inherited from

[BaseVariableField](/auto-docs/free-layout-editor/classes/BaseVariableField.md).[fireChange](/auto-docs/free-layout-editor/classes/BaseVariableField.md#firechange)

***

### fromJSON

**fromJSON**(`«destructured»`): `void`

Deserialize the `VariableDeclarationJSON` to the `VariableDeclaration`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Omit`<[`VariableDeclarationJSON`](/auto-docs/free-layout-editor/types/VariableDeclarationJSON.md)<`VariableMeta`>, `"key"`> |

#### Returns

`void`

#### Overrides

[BaseVariableField](/auto-docs/free-layout-editor/classes/BaseVariableField.md).[fromJSON](/auto-docs/free-layout-editor/classes/BaseVariableField.md#fromjson)

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

#### Inherited from

[BaseVariableField](/auto-docs/free-layout-editor/classes/BaseVariableField.md).[getByKeyPath](/auto-docs/free-layout-editor/classes/BaseVariableField.md#getbykeypath)

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

#### Inherited from

[BaseVariableField](/auto-docs/free-layout-editor/classes/BaseVariableField.md).[onTypeChange](/auto-docs/free-layout-editor/classes/BaseVariableField.md#ontypechange)

***

### subscribe

**subscribe**<`Data`>(`observer`, `selector?`): [`Disposable`](/auto-docs/free-layout-editor/interfaces/Disposable-1.md)

Listens for changes to the ASTNode.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Data` | [`VariableDeclaration`](/auto-docs/free-layout-editor/classes/VariableDeclaration.md)<`VariableMeta`> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `observer` | `ObserverOrNext`<`Data`> | The listener callback. |
| `selector?` | `SubscribeConfig`<[`VariableDeclaration`](/auto-docs/free-layout-editor/classes/VariableDeclaration.md)<`VariableMeta`>, `Data`> | Listens for specified data. |

#### Returns

[`Disposable`](/auto-docs/free-layout-editor/interfaces/Disposable-1.md)

#### Inherited from

[BaseVariableField](/auto-docs/free-layout-editor/classes/BaseVariableField.md).[subscribe](/auto-docs/free-layout-editor/classes/BaseVariableField.md#subscribe)

***

### toJSON

**toJSON**(): [`VariableDeclarationJSON`](/auto-docs/free-layout-editor/types/VariableDeclarationJSON.md)<`VariableMeta`>

Serialize the `VariableDeclaration` to `VariableDeclarationJSON`.

#### Returns

[`VariableDeclarationJSON`](/auto-docs/free-layout-editor/types/VariableDeclarationJSON.md)<`VariableMeta`>

The JSON representation of `VariableDeclaration`.

#### Overrides

[BaseVariableField](/auto-docs/free-layout-editor/classes/BaseVariableField.md).[toJSON](/auto-docs/free-layout-editor/classes/BaseVariableField.md#tojson)

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

#### Inherited from

[BaseVariableField](/auto-docs/free-layout-editor/classes/BaseVariableField.md).[updateInitializer](/auto-docs/free-layout-editor/classes/BaseVariableField.md#updateinitializer)

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

[BaseVariableField](/auto-docs/free-layout-editor/classes/BaseVariableField.md).[updateMeta](/auto-docs/free-layout-editor/classes/BaseVariableField.md#updatemeta)

***

### updateOrder

**updateOrder**(`order?`): `void`

Update the sorting order of the variable declaration.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `order?` | `number` | Variable sorting order. Default is 0. |

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

#### Inherited from

[BaseVariableField](/auto-docs/free-layout-editor/classes/BaseVariableField.md).[updateType](/auto-docs/free-layout-editor/classes/BaseVariableField.md#updatetype)
