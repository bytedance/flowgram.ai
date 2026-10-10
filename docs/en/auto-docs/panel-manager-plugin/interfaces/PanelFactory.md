# Interface: PanelFactory\<T>

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `any` |

## Table of contents

### Properties

* [allowDuplicates](/en/auto-docs/panel-manager-plugin/interfaces/PanelFactory.md#allowduplicates)
* [defaultSize](/en/auto-docs/panel-manager-plugin/interfaces/PanelFactory.md#defaultsize)
* [fullscreen](/en/auto-docs/panel-manager-plugin/interfaces/PanelFactory.md#fullscreen)
* [keepDOM](/en/auto-docs/panel-manager-plugin/interfaces/PanelFactory.md#keepdom)
* [key](/en/auto-docs/panel-manager-plugin/interfaces/PanelFactory.md#key)
* [maxSize](/en/auto-docs/panel-manager-plugin/interfaces/PanelFactory.md#maxsize)
* [minSize](/en/auto-docs/panel-manager-plugin/interfaces/PanelFactory.md#minsize)
* [render](/en/auto-docs/panel-manager-plugin/interfaces/PanelFactory.md#render)
* [resize](/en/auto-docs/panel-manager-plugin/interfaces/PanelFactory.md#resize)
* [style](/en/auto-docs/panel-manager-plugin/interfaces/PanelFactory.md#style)

## Properties

### allowDuplicates

`Optional` **allowDuplicates**: `boolean`

Allows multiple panels with the same key to be rendered simultaneously

***

### defaultSize

**defaultSize**: `number`

***

### fullscreen

`Optional` **fullscreen**: `boolean`

***

### keepDOM

`Optional` **keepDOM**: `boolean`

***

### key

**key**: `string`

***

### maxSize

`Optional` **maxSize**: `number`

***

### minSize

`Optional` **minSize**: `number`

***

### render

**render**: (`props`: `T`) => `ReactNode`

#### Type declaration

(`props`): `ReactNode`

##### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `T` |

##### Returns

`ReactNode`

***

### resize

`Optional` **resize**: `boolean`

***

### style

`Optional` **style**: `CSSProperties`
