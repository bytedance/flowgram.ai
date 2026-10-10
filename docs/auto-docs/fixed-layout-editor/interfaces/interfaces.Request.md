# Interface: Request

[interfaces](/auto-docs/fixed-layout-editor/modules/interfaces.md).Request

## Table of contents

### Properties

* [bindings](/auto-docs/fixed-layout-editor/interfaces/interfaces.Request.md#bindings)
* [childRequests](/auto-docs/fixed-layout-editor/interfaces/interfaces.Request.md#childrequests)
* [id](/auto-docs/fixed-layout-editor/interfaces/interfaces.Request.md#id)
* [parentContext](/auto-docs/fixed-layout-editor/interfaces/interfaces.Request.md#parentcontext)
* [parentRequest](/auto-docs/fixed-layout-editor/interfaces/interfaces.Request.md#parentrequest)
* [requestScope](/auto-docs/fixed-layout-editor/interfaces/interfaces.Request.md#requestscope)
* [serviceIdentifier](/auto-docs/fixed-layout-editor/interfaces/interfaces.Request.md#serviceidentifier)
* [target](/auto-docs/fixed-layout-editor/interfaces/interfaces.Request.md#target)

### Methods

* [addChildRequest](/auto-docs/fixed-layout-editor/interfaces/interfaces.Request.md#addchildrequest)

## Properties

### bindings

**bindings**: [`Binding`](/auto-docs/fixed-layout-editor/interfaces/interfaces.Binding.md)<`unknown`>\[]

***

### childRequests

**childRequests**: [`Request`](/auto-docs/fixed-layout-editor/interfaces/interfaces.Request.md)\[]

***

### id

**id**: `number`

***

### parentContext

**parentContext**: [`Context`](/auto-docs/fixed-layout-editor/interfaces/interfaces.Context.md)

***

### parentRequest

**parentRequest**: `null` | [`Request`](/auto-docs/fixed-layout-editor/interfaces/interfaces.Request.md)

***

### requestScope

**requestScope**: `null` | [`RequestScope`](/auto-docs/fixed-layout-editor/types/interfaces.RequestScope.md)

***

### serviceIdentifier

**serviceIdentifier**: `ServiceIdentifier`

***

### target

**target**: `LegacyTarget`

## Methods

### addChildRequest

**addChildRequest**(`serviceIdentifier`, `bindings`, `target`): [`Request`](/auto-docs/fixed-layout-editor/interfaces/interfaces.Request.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceIdentifier` | `ServiceIdentifier` |
| `bindings` | [`Binding`](/auto-docs/fixed-layout-editor/interfaces/interfaces.Binding.md)<`unknown`> | [`Binding`](/auto-docs/fixed-layout-editor/interfaces/interfaces.Binding.md)<`unknown`>\[] |
| `target` | `LegacyTarget` |

#### Returns

[`Request`](/auto-docs/fixed-layout-editor/interfaces/interfaces.Request.md)
