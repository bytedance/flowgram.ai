# Interface: TypeEditorRef\<Mode, TypeSchema>

## Type parameters

| Name | Type |
| :------ | :------ |
| `Mode` | extends [`TypeEditorMode`](/auto-docs/type-editor/types/TypeEditorMode.md) |
| `TypeSchema` | extends `Partial`<`IJsonSchema`> |

## Table of contents

### Properties

* [getContainer](/auto-docs/type-editor/interfaces/TypeEditorRef.md#getcontainer)
* [getOperator](/auto-docs/type-editor/interfaces/TypeEditorRef.md#getoperator)
* [getService](/auto-docs/type-editor/interfaces/TypeEditorRef.md#getservice)
* [getValue](/auto-docs/type-editor/interfaces/TypeEditorRef.md#getvalue)
* [redo](/auto-docs/type-editor/interfaces/TypeEditorRef.md#redo)
* [setValue](/auto-docs/type-editor/interfaces/TypeEditorRef.md#setvalue)
* [undo](/auto-docs/type-editor/interfaces/TypeEditorRef.md#undo)

## Properties

### getContainer

**getContainer**: () => `HTMLDivElement`

#### Type declaration

(): `HTMLDivElement`

##### Returns

`HTMLDivElement`

***

### getOperator

**getOperator**: () => `TypeEditorOperationService`<`TypeSchema`>

#### Type declaration

(): `TypeEditorOperationService`<`TypeSchema`>

##### Returns

`TypeEditorOperationService`<`TypeSchema`>

***

### getService

**getService**: () => [`TypeEditorService`](/auto-docs/type-editor/classes/TypeEditorService.md)<`TypeSchema`>

#### Type declaration

(): [`TypeEditorService`](/auto-docs/type-editor/classes/TypeEditorService.md)<`TypeSchema`>

##### Returns

[`TypeEditorService`](/auto-docs/type-editor/classes/TypeEditorService.md)<`TypeSchema`>

***

### getValue

**getValue**: () => [`TypeEditorValue`](/auto-docs/type-editor/types/TypeEditorValue.md)<`Mode`, `TypeSchema`>

#### Type declaration

(): [`TypeEditorValue`](/auto-docs/type-editor/types/TypeEditorValue.md)<`Mode`, `TypeSchema`>

##### Returns

[`TypeEditorValue`](/auto-docs/type-editor/types/TypeEditorValue.md)<`Mode`, `TypeSchema`>

***

### redo

**redo**: () => `void`

#### Type declaration

(): `void`

##### Returns

`void`

***

### setValue

**setValue**: (`newVal`: [`TypeEditorValue`](/auto-docs/type-editor/types/TypeEditorValue.md)<`Mode`, `TypeSchema`>) => `void`

#### Type declaration

(`newVal`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `newVal` | [`TypeEditorValue`](/auto-docs/type-editor/types/TypeEditorValue.md)<`Mode`, `TypeSchema`> |

##### Returns

`void`

***

### undo

**undo**: () => `void`

#### Type declaration

(): `void`

##### Returns

`void`
