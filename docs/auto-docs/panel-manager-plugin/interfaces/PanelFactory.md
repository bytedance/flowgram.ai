# Interface: PanelFactory\<T>

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `any` |

## Table of contents

### Properties

* [allowDuplicates](/auto-docs/panel-manager-plugin/interfaces/PanelFactory.md#allowduplicates)
* [defaultSize](/auto-docs/panel-manager-plugin/interfaces/PanelFactory.md#defaultsize)
* [fullscreen](/auto-docs/panel-manager-plugin/interfaces/PanelFactory.md#fullscreen)
* [keepDOM](/auto-docs/panel-manager-plugin/interfaces/PanelFactory.md#keepdom)
* [key](/auto-docs/panel-manager-plugin/interfaces/PanelFactory.md#key)
* [maxSize](/auto-docs/panel-manager-plugin/interfaces/PanelFactory.md#maxsize)
* [minSize](/auto-docs/panel-manager-plugin/interfaces/PanelFactory.md#minsize)
* [render](/auto-docs/panel-manager-plugin/interfaces/PanelFactory.md#render)
* [resize](/auto-docs/panel-manager-plugin/interfaces/PanelFactory.md#resize)
* [style](/auto-docs/panel-manager-plugin/interfaces/PanelFactory.md#style)

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
