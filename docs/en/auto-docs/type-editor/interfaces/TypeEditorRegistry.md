# Interface: TypeEditorRegistry\<TypeSchema>

## Type parameters

| Name | Type |
| :------ | :------ |
| `TypeSchema` | extends `Partial`<`IJsonSchema`> |

## Hierarchy

* `unknown`<`TypeSchema`>

  ↳ **`TypeEditorRegistry`**

## Table of contents

### Properties

* [childrenDefaultEditable](/en/auto-docs/type-editor/interfaces/TypeEditorRegistry.md#childrendefaulteditable)
* [childrenValueEditable](/en/auto-docs/type-editor/interfaces/TypeEditorRegistry.md#childrenvalueeditable)
* [customChildOptionValue](/en/auto-docs/type-editor/interfaces/TypeEditorRegistry.md#customchildoptionvalue)
* [customDisabled](/en/auto-docs/type-editor/interfaces/TypeEditorRegistry.md#customdisabled)
* [deFormatDefault](/en/auto-docs/type-editor/interfaces/TypeEditorRegistry.md#deformatdefault)
* [defaultEditable](/en/auto-docs/type-editor/interfaces/TypeEditorRegistry.md#defaulteditable)
* [formatDefault](/en/auto-docs/type-editor/interfaces/TypeEditorRegistry.md#formatdefault)
* [getInputNode](/en/auto-docs/type-editor/interfaces/TypeEditorRegistry.md#getinputnode)
* [getItemTypes](/en/auto-docs/type-editor/interfaces/TypeEditorRegistry.md#getitemtypes)
* [typeCascaderConfig](/en/auto-docs/type-editor/interfaces/TypeEditorRegistry.md#typecascaderconfig)
* [typeInputConfig](/en/auto-docs/type-editor/interfaces/TypeEditorRegistry.md#typeinputconfig)

## Properties

### childrenDefaultEditable

`Optional` **childrenDefaultEditable**: (`type`: `TypeSchema`) => `string` | `true`

#### Type declaration

(`type`): `string` | `true`

子字段是否可以编辑 default

##### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `TypeSchema` |

##### Returns

`string` | `true`

***

### childrenValueEditable

`Optional` **childrenValueEditable**: (`type`: `TypeSchema`) => `string` | `true`

#### Type declaration

(`type`): `string` | `true`

子字段是否可以编辑 default

##### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `TypeSchema` |

##### Returns

`string` | `true`

***

### customChildOptionValue

`Optional` **customChildOptionValue**: () => `string`\[]

#### Type declaration

(): `string`\[]

自定义生成子类型的 optionValue

##### Returns

`string`\[]

***

### customDisabled

`Optional` **customDisabled**: (`ctx`: { `level`: `number` ; `parentType`: `string` ; `parentTypes`: `string`\[]  }) => `string`

#### Type declaration

(`ctx`): `string`

自定义 disabled

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `Object` |
| `ctx.level` | `number` |
| `ctx.parentType` | `string` |
| `ctx.parentTypes` | `string`\[] |

##### Returns

`string`

***

### deFormatDefault

`Optional` **deFormatDefault**: (`val`: `any`) => `any`

#### Type declaration

(`val`): `any`

##### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `any` |

##### Returns

`any`

***

### defaultEditable

`Optional` **defaultEditable**: `string` | `true`

当前字段是否支持 default

***

### formatDefault

`Optional` **formatDefault**: (`val`: `any`, `type`: `IJsonSchema`) => `IJsonSchema`

#### Type declaration

(`val`, `type`): `IJsonSchema`

从默认值上下文

##### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `any` |
| `type` | `IJsonSchema` |

##### Returns

`IJsonSchema`

***

### getInputNode

`Optional` **getInputNode**: (`ctx`: [`TypeInputContext`](/en/auto-docs/type-editor/interfaces/TypeInputContext.md)<`TypeSchema`>) => `Element`

#### Type declaration

(`ctx`): `Element`

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`TypeInputContext`](/en/auto-docs/type-editor/interfaces/TypeInputContext.md)<`TypeSchema`> |

##### Returns

`Element`

***

### getItemTypes

`Optional` **getItemTypes**: (`ctx`: { `level`: `number` ; `parentTypes?`: `string`\[]  }) => { `disabled?`: `string` ; `type`: `string`  }\[]

#### Type declaration

(`ctx`): { `disabled?`: `string` ; `type`: `string`  }\[]

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `Object` |
| `ctx.level` | `number` |
| `ctx.parentTypes?` | `string`\[] |

##### Returns

{ `disabled?`: `string` ; `type`: `string`  }\[]

**`Deprecated`**

api 已废弃，能力仍保留，请优先使用或定义 getSupportedItemTypes

***

### typeCascaderConfig

`Optional` **typeCascaderConfig**: [`TypeCascaderConfig`](/en/auto-docs/type-editor/interfaces/TypeCascaderConfig.md)<`TypeSchema`>

typeCascader 设置

***

### typeInputConfig

`Optional` **typeInputConfig**: [`TypeInputConfig`](/en/auto-docs/type-editor/interfaces/TypeInputConfig.md)<`TypeSchema`>

typeInput 设置
