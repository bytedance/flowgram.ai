# Interface: Request

[interfaces](/auto-docs/editor/modules/interfaces.md).Request

## Table of contents

### Properties

* [bindings](/auto-docs/editor/interfaces/interfaces.Request.md#bindings)
* [childRequests](/auto-docs/editor/interfaces/interfaces.Request.md#childrequests)
* [id](/auto-docs/editor/interfaces/interfaces.Request.md#id)
* [parentContext](/auto-docs/editor/interfaces/interfaces.Request.md#parentcontext)
* [parentRequest](/auto-docs/editor/interfaces/interfaces.Request.md#parentrequest)
* [requestScope](/auto-docs/editor/interfaces/interfaces.Request.md#requestscope)
* [serviceIdentifier](/auto-docs/editor/interfaces/interfaces.Request.md#serviceidentifier)
* [target](/auto-docs/editor/interfaces/interfaces.Request.md#target)

### Methods

* [addChildRequest](/auto-docs/editor/interfaces/interfaces.Request.md#addchildrequest)

## Properties

### bindings

**bindings**: [`Binding`](/auto-docs/editor/interfaces/interfaces.Binding.md)<`unknown`>\[]

***

### childRequests

**childRequests**: [`Request`](/auto-docs/editor/interfaces/interfaces.Request.md)\[]

***

### id

**id**: `number`

***

### parentContext

**parentContext**: [`Context`](/auto-docs/editor/interfaces/interfaces.Context.md)

***

### parentRequest

**parentRequest**: `null` | [`Request`](/auto-docs/editor/interfaces/interfaces.Request.md)

***

### requestScope

**requestScope**: `null` | [`RequestScope`](/auto-docs/editor/types/interfaces.RequestScope.md)

***

### serviceIdentifier

**serviceIdentifier**: `ServiceIdentifier`

***

### target

**target**: `LegacyTarget`

## Methods

### addChildRequest

**addChildRequest**(`serviceIdentifier`, `bindings`, `target`): [`Request`](/auto-docs/editor/interfaces/interfaces.Request.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceIdentifier` | `ServiceIdentifier` |
| `bindings` | [`Binding`](/auto-docs/editor/interfaces/interfaces.Binding.md)<`unknown`> | [`Binding`](/auto-docs/editor/interfaces/interfaces.Binding.md)<`unknown`>\[] |
| `target` | `LegacyTarget` |

#### Returns

[`Request`](/auto-docs/editor/interfaces/interfaces.Request.md)
