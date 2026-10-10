# Interface: TypeEditorRef\<Mode, TypeSchema>

## Type parameters

| Name | Type |
| :------ | :------ |
| `Mode` | extends [`TypeEditorMode`](/en/auto-docs/type-editor/types/TypeEditorMode.md) |
| `TypeSchema` | extends `Partial`<`IJsonSchema`> |

## Table of contents

### Properties

* [getContainer](/en/auto-docs/type-editor/interfaces/TypeEditorRef.md#getcontainer)
* [getOperator](/en/auto-docs/type-editor/interfaces/TypeEditorRef.md#getoperator)
* [getService](/en/auto-docs/type-editor/interfaces/TypeEditorRef.md#getservice)
* [getValue](/en/auto-docs/type-editor/interfaces/TypeEditorRef.md#getvalue)
* [redo](/en/auto-docs/type-editor/interfaces/TypeEditorRef.md#redo)
* [setValue](/en/auto-docs/type-editor/interfaces/TypeEditorRef.md#setvalue)
* [undo](/en/auto-docs/type-editor/interfaces/TypeEditorRef.md#undo)

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

**getService**: () => [`TypeEditorService`](/en/auto-docs/type-editor/classes/TypeEditorService.md)<`TypeSchema`>

#### Type declaration

(): [`TypeEditorService`](/en/auto-docs/type-editor/classes/TypeEditorService.md)<`TypeSchema`>

##### Returns

[`TypeEditorService`](/en/auto-docs/type-editor/classes/TypeEditorService.md)<`TypeSchema`>

***

### getValue

**getValue**: () => [`TypeEditorValue`](/en/auto-docs/type-editor/types/TypeEditorValue.md)<`Mode`, `TypeSchema`>

#### Type declaration

(): [`TypeEditorValue`](/en/auto-docs/type-editor/types/TypeEditorValue.md)<`Mode`, `TypeSchema`>

##### Returns

[`TypeEditorValue`](/en/auto-docs/type-editor/types/TypeEditorValue.md)<`Mode`, `TypeSchema`>

***

### redo

**redo**: () => `void`

#### Type declaration

(): `void`

##### Returns

`void`

***

### setValue

**setValue**: (`newVal`: [`TypeEditorValue`](/en/auto-docs/type-editor/types/TypeEditorValue.md)<`Mode`, `TypeSchema`>) => `void`

#### Type declaration

(`newVal`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `newVal` | [`TypeEditorValue`](/en/auto-docs/type-editor/types/TypeEditorValue.md)<`Mode`, `TypeSchema`> |

##### Returns

`void`

***

### undo

**undo**: () => `void`

#### Type declaration

(): `void`

##### Returns

`void`
