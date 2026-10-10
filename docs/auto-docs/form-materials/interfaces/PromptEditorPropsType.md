# Interface: PromptEditorPropsType

## Hierarchy

* `PropsType`

  ↳ **`PromptEditorPropsType`**

  ↳↳ [`PromptEditorWithInputsProps`](/auto-docs/form-materials/interfaces/PromptEditorWithInputsProps.md)

  ↳↳ [`PromptEditorWithVariablesProps`](/auto-docs/form-materials/interfaces/PromptEditorWithVariablesProps.md)

## Table of contents

### Properties

* [activeLinePlaceholder](/auto-docs/form-materials/interfaces/PromptEditorPropsType.md#activelineplaceholder)
* [children](/auto-docs/form-materials/interfaces/PromptEditorPropsType.md#children)
* [disableMarkdownHighlight](/auto-docs/form-materials/interfaces/PromptEditorPropsType.md#disablemarkdownhighlight)
* [hasError](/auto-docs/form-materials/interfaces/PromptEditorPropsType.md#haserror)
* [onChange](/auto-docs/form-materials/interfaces/PromptEditorPropsType.md#onchange)
* [options](/auto-docs/form-materials/interfaces/PromptEditorPropsType.md#options)
* [placeholder](/auto-docs/form-materials/interfaces/PromptEditorPropsType.md#placeholder)
* [readonly](/auto-docs/form-materials/interfaces/PromptEditorPropsType.md#readonly)
* [style](/auto-docs/form-materials/interfaces/PromptEditorPropsType.md#style)
* [value](/auto-docs/form-materials/interfaces/PromptEditorPropsType.md#value)

## Properties

### activeLinePlaceholder

`Optional` **activeLinePlaceholder**: `string`

#### Inherited from

PropsType.activeLinePlaceholder

***

### children

`Optional` **children**: `ReactNode`

#### Inherited from

PropsType.children

***

### disableMarkdownHighlight

`Optional` **disableMarkdownHighlight**: `boolean`

#### Inherited from

PropsType.disableMarkdownHighlight

***

### hasError

`Optional` **hasError**: `boolean`

#### Inherited from

PropsType.hasError

***

### onChange

**onChange**: (`value?`: [`IFlowTemplateValue`](/auto-docs/form-materials/interfaces/IFlowTemplateValue.md)) => `void`

#### Type declaration

(`value?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `value?` | [`IFlowTemplateValue`](/auto-docs/form-materials/interfaces/IFlowTemplateValue.md) |

##### Returns

`void`

#### Inherited from

PropsType.onChange

***

### options

`Optional` **options**: `Partial`<{ `fontSize`: `number`  } & { `placeholder`: `string` | `HTMLElement`  } & { `readOnly`: `boolean`  } & { `editable`: `boolean`  } & { `height`: `string` | `number`  } & { `minHeight`: `string` | `number`  } & { `maxHeight`: `string` | `number`  } & { `inputRules`: `InputRule`\[]  } & { `contentAttributes`: `Attrs` | (`view`: `EditorView`) => `null` | `Attrs`  }>

***

### placeholder

`Optional` **placeholder**: `string`

#### Inherited from

PropsType.placeholder

***

### readonly

`Optional` **readonly**: `boolean`

#### Inherited from

PropsType.readonly

***

### style

`Optional` **style**: `CSSProperties`

#### Inherited from

PropsType.style

***

### value

`Optional` **value**: [`IFlowTemplateValue`](/auto-docs/form-materials/interfaces/IFlowTemplateValue.md)

#### Inherited from

PropsType.value
