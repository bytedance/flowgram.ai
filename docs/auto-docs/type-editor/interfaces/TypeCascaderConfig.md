# Interface: TypeCascaderConfig\<TypeSchema>

## Type parameters

| Name | Type |
| :------ | :------ |
| `TypeSchema` | extends `Partial`<`IJsonSchema`> |

## Table of contents

### Properties

* [customCascaderPanel](/auto-docs/type-editor/interfaces/TypeCascaderConfig.md#customcascaderpanel)
* [generateInitCtx](/auto-docs/type-editor/interfaces/TypeCascaderConfig.md#generateinitctx)
* [unClosePanelAfterSelect](/auto-docs/type-editor/interfaces/TypeCascaderConfig.md#unclosepanelafterselect)

## Properties

### customCascaderPanel

`Optional` **customCascaderPanel**: (`ctx`: { `onBlur?`: () => `void` ; `onChange`: (`typeSchema`: `TypeSchema`) => `void` ; `onFocus?`: () => `void` ; `typeSchema`: `TypeSchema`  }) => `Element`

#### Type declaration

(`ctx`): `Element`

自定义 CascaderPanel

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `Object` |
| `ctx.onBlur?` | () => `void` |
| `ctx.onChange` | (`typeSchema`: `TypeSchema`) => `void` |
| `ctx.onFocus?` | () => `void` |
| `ctx.typeSchema` | `TypeSchema` |

##### Returns

`Element`

***

### generateInitCtx

`Optional` **generateInitCtx**: (`typeSchema`: `TypeSchema`) => [`FlowSchemaInitCtx`](/auto-docs/type-editor/interfaces/FlowSchemaInitCtx.md)

#### Type declaration

(`typeSchema`): [`FlowSchemaInitCtx`](/auto-docs/type-editor/interfaces/FlowSchemaInitCtx.md)

获取生成 schema 的 ctx

##### Parameters

| Name | Type |
| :------ | :------ |
| `typeSchema` | `TypeSchema` |

##### Returns

[`FlowSchemaInitCtx`](/auto-docs/type-editor/interfaces/FlowSchemaInitCtx.md)

***

### unClosePanelAfterSelect

`Optional` **unClosePanelAfterSelect**: `boolean`

选中后是否不关闭面板
