# Interface: NextArgs\<T>

[interfaces](/auto-docs/fixed-layout-editor/modules/interfaces.md).NextArgs

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `unknown` |

## Table of contents

### Properties

* [avoidConstraints](/auto-docs/fixed-layout-editor/interfaces/interfaces.NextArgs.md#avoidconstraints)
* [contextInterceptor](/auto-docs/fixed-layout-editor/interfaces/interfaces.NextArgs.md#contextinterceptor)
* [isMultiInject](/auto-docs/fixed-layout-editor/interfaces/interfaces.NextArgs.md#ismultiinject)
* [isOptional](/auto-docs/fixed-layout-editor/interfaces/interfaces.NextArgs.md#isoptional)
* [key](/auto-docs/fixed-layout-editor/interfaces/interfaces.NextArgs.md#key)
* [serviceIdentifier](/auto-docs/fixed-layout-editor/interfaces/interfaces.NextArgs.md#serviceidentifier)
* [targetType](/auto-docs/fixed-layout-editor/interfaces/interfaces.NextArgs.md#targettype)
* [value](/auto-docs/fixed-layout-editor/interfaces/interfaces.NextArgs.md#value)

## Properties

### avoidConstraints

**avoidConstraints**: `boolean`

***

### contextInterceptor

**contextInterceptor**: (`contexts`: [`Context`](/auto-docs/fixed-layout-editor/interfaces/interfaces.Context.md)) => [`Context`](/auto-docs/fixed-layout-editor/interfaces/interfaces.Context.md)

#### Type declaration

(`contexts`): [`Context`](/auto-docs/fixed-layout-editor/interfaces/interfaces.Context.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `contexts` | [`Context`](/auto-docs/fixed-layout-editor/interfaces/interfaces.Context.md) |

##### Returns

[`Context`](/auto-docs/fixed-layout-editor/interfaces/interfaces.Context.md)

***

### isMultiInject

**isMultiInject**: `boolean`

***

### isOptional

`Optional` **isOptional**: `boolean`

***

### key

`Optional` **key**: `string` | `number` | `symbol`

***

### serviceIdentifier

**serviceIdentifier**: [`ServiceIdentifier`](/auto-docs/fixed-layout-editor/types/interfaces.ServiceIdentifier.md)<`T`>

***

### targetType

**targetType**: [`TargetType`](/auto-docs/fixed-layout-editor/types/interfaces.TargetType.md)

***

### value

`Optional` **value**: `unknown`
