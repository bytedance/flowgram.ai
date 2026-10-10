# Interface: CodeEditorPropsType

## Hierarchy

* `PropsWithChildren`<{}>

  ↳ **`CodeEditorPropsType`**

## Table of contents

### Properties

* [activeLinePlaceholder](/en/auto-docs/form-materials/interfaces/CodeEditorPropsType.md#activelineplaceholder)
* [children](/en/auto-docs/form-materials/interfaces/CodeEditorPropsType.md#children)
* [languageId](/en/auto-docs/form-materials/interfaces/CodeEditorPropsType.md#languageid)
* [mini](/en/auto-docs/form-materials/interfaces/CodeEditorPropsType.md#mini)
* [onChange](/en/auto-docs/form-materials/interfaces/CodeEditorPropsType.md#onchange)
* [options](/en/auto-docs/form-materials/interfaces/CodeEditorPropsType.md#options)
* [placeholder](/en/auto-docs/form-materials/interfaces/CodeEditorPropsType.md#placeholder)
* [readonly](/en/auto-docs/form-materials/interfaces/CodeEditorPropsType.md#readonly)
* [theme](/en/auto-docs/form-materials/interfaces/CodeEditorPropsType.md#theme)
* [value](/en/auto-docs/form-materials/interfaces/CodeEditorPropsType.md#value)

## Properties

### activeLinePlaceholder

`Optional` **activeLinePlaceholder**: `string`

***

### children

`Optional` **children**: `ReactNode`

#### Inherited from

React.PropsWithChildren.children

***

### languageId

**languageId**: `"json"` | `"python"` | `"typescript"` | `"shell"` | `"sql"`

***

### mini

`Optional` **mini**: `boolean`

***

### onChange

`Optional` **onChange**: (`value`: `string`) => `void`

#### Type declaration

(`value`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

##### Returns

`void`

***

### options

`Optional` **options**: `Partial`<{ `fontSize`: `number`  } & { `placeholder`: `string` | `HTMLElement`  } & { `readOnly`: `boolean`  } & { `editable`: `boolean`  } & { `lineWrapping`: `boolean`  } & { `height`: `string` | `number`  } & { `minHeight`: `string` | `number`  } & { `maxHeight`: `string` | `number`  } & { `tabSize`: `number`  } & { `scrollBeyondLastLine`: `boolean`  } & { `uri`: `string`  } & { `theme`: `string`  } & { `languageId`: `string`  } & { `transformer`: `Transformer`  } & { `overlayScrollbar`: `unknown`  } & { `lineNumbersGutter`: `unknown`  } & { `foldGutter`: `unknown`  } & { `colorizeBrackets`: `unknown`  }>

***

### placeholder

`Optional` **placeholder**: `string`

***

### readonly

`Optional` **readonly**: `boolean`

***

### theme

`Optional` **theme**: `"dark"` | `"light"`

***

### value

`Optional` **value**: `string`
