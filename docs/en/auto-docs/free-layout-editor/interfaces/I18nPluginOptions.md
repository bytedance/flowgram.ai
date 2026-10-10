# Interface: I18nPluginOptions

## Table of contents

### Properties

* [languages](/en/auto-docs/free-layout-editor/interfaces/I18nPluginOptions.md#languages)
* [localLanguage](/en/auto-docs/free-layout-editor/interfaces/I18nPluginOptions.md#locallanguage)
* [locale](/en/auto-docs/free-layout-editor/interfaces/I18nPluginOptions.md#locale)
* [missingStrictMode](/en/auto-docs/free-layout-editor/interfaces/I18nPluginOptions.md#missingstrictmode)
* [onLanguageChange](/en/auto-docs/free-layout-editor/interfaces/I18nPluginOptions.md#onlanguagechange)

## Properties

### languages

`Optional` **languages**: [`I18nLanguage`](/en/auto-docs/free-layout-editor/interfaces/I18nLanguage.md)\[] | `Record`<`string`, `Record`<`string`, `any`>>

***

### localLanguage

`Optional` **localLanguage**: `string`

use `locale` instead

**`Deprecated`**

***

### locale

`Optional` **locale**: `string`

***

### missingStrictMode

`Optional` **missingStrictMode**: `boolean`

if missingStrictMode is true
expect(I18n.t('Unknown')).toEqual('\[missing "en-US.Unknown" translation]')
else
expect(I18n.t('Unknown')).toEqual('Unknown')

***

### onLanguageChange

`Optional` **onLanguageChange**: (`languageId`: `string`) => `void`

#### Type declaration

(`languageId`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `languageId` | `string` |

##### Returns

`void`
