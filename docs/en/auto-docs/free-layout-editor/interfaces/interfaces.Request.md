# Interface: Request

[interfaces](/en/auto-docs/free-layout-editor/modules/interfaces.md).Request

## Table of contents

### Properties

* [bindings](/en/auto-docs/free-layout-editor/interfaces/interfaces.Request.md#bindings)
* [childRequests](/en/auto-docs/free-layout-editor/interfaces/interfaces.Request.md#childrequests)
* [id](/en/auto-docs/free-layout-editor/interfaces/interfaces.Request.md#id)
* [parentContext](/en/auto-docs/free-layout-editor/interfaces/interfaces.Request.md#parentcontext)
* [parentRequest](/en/auto-docs/free-layout-editor/interfaces/interfaces.Request.md#parentrequest)
* [requestScope](/en/auto-docs/free-layout-editor/interfaces/interfaces.Request.md#requestscope)
* [serviceIdentifier](/en/auto-docs/free-layout-editor/interfaces/interfaces.Request.md#serviceidentifier)
* [target](/en/auto-docs/free-layout-editor/interfaces/interfaces.Request.md#target)

### Methods

* [addChildRequest](/en/auto-docs/free-layout-editor/interfaces/interfaces.Request.md#addchildrequest)

## Properties

### bindings

**bindings**: [`Binding`](/en/auto-docs/free-layout-editor/interfaces/interfaces.Binding.md)<`unknown`>\[]

***

### childRequests

**childRequests**: [`Request`](/en/auto-docs/free-layout-editor/interfaces/interfaces.Request.md)\[]

***

### id

**id**: `number`

***

### parentContext

**parentContext**: [`Context`](/en/auto-docs/free-layout-editor/interfaces/interfaces.Context.md)

***

### parentRequest

**parentRequest**: `null` | [`Request`](/en/auto-docs/free-layout-editor/interfaces/interfaces.Request.md)

***

### requestScope

**requestScope**: `null` | [`RequestScope`](/en/auto-docs/free-layout-editor/types/interfaces.RequestScope.md)

***

### serviceIdentifier

**serviceIdentifier**: `ServiceIdentifier`

***

### target

**target**: `LegacyTarget`

## Methods

### addChildRequest

**addChildRequest**(`serviceIdentifier`, `bindings`, `target`): [`Request`](/en/auto-docs/free-layout-editor/interfaces/interfaces.Request.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceIdentifier` | `ServiceIdentifier` |
| `bindings` | [`Binding`](/en/auto-docs/free-layout-editor/interfaces/interfaces.Binding.md)<`unknown`> | [`Binding`](/en/auto-docs/free-layout-editor/interfaces/interfaces.Binding.md)<`unknown`>\[] |
| `target` | `LegacyTarget` |

#### Returns

[`Request`](/en/auto-docs/free-layout-editor/interfaces/interfaces.Request.md)
