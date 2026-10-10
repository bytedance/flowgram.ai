# Interface: NextArgs\<T>

[interfaces](/en/auto-docs/fixed-layout-editor/modules/interfaces.md).NextArgs

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `unknown` |

## Table of contents

### Properties

* [avoidConstraints](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.NextArgs.md#avoidconstraints)
* [contextInterceptor](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.NextArgs.md#contextinterceptor)
* [isMultiInject](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.NextArgs.md#ismultiinject)
* [isOptional](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.NextArgs.md#isoptional)
* [key](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.NextArgs.md#key)
* [serviceIdentifier](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.NextArgs.md#serviceidentifier)
* [targetType](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.NextArgs.md#targettype)
* [value](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.NextArgs.md#value)

## Properties

### avoidConstraints

**avoidConstraints**: `boolean`

***

### contextInterceptor

**contextInterceptor**: (`contexts`: [`Context`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Context.md)) => [`Context`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Context.md)

#### Type declaration

(`contexts`): [`Context`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Context.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `contexts` | [`Context`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Context.md) |

##### Returns

[`Context`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Context.md)

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

**serviceIdentifier**: [`ServiceIdentifier`](/en/auto-docs/fixed-layout-editor/types/interfaces.ServiceIdentifier.md)<`T`>

***

### targetType

**targetType**: [`TargetType`](/en/auto-docs/fixed-layout-editor/types/interfaces.TargetType.md)

***

### value

`Optional` **value**: `unknown`
