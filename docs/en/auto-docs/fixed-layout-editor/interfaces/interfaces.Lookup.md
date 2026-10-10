# Interface: Lookup\<T>

[interfaces](/en/auto-docs/fixed-layout-editor/modules/interfaces.md).Lookup

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

* [`Clonable`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Clonable.md)<[`Lookup`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Lookup.md)<`T`>>

  ↳ **`Lookup`**

## Table of contents

### Methods

* [add](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Lookup.md#add)
* [clone](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Lookup.md#clone)
* [get](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Lookup.md#get)
* [getMap](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Lookup.md#getmap)
* [hasKey](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Lookup.md#haskey)
* [remove](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Lookup.md#remove)
* [removeByCondition](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Lookup.md#removebycondition)
* [removeIntersection](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Lookup.md#removeintersection)
* [traverse](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Lookup.md#traverse)

## Methods

### add

**add**(`serviceIdentifier`, `value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceIdentifier` | `ServiceIdentifier` |
| `value` | `T` |

#### Returns

`void`

***

### clone

**clone**(): [`Lookup`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Lookup.md)<`T`>

#### Returns

[`Lookup`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Lookup.md)<`T`>

#### Overrides

[Clonable](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Clonable.md).[clone](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Clonable.md#clone)

***

### get

**get**(`serviceIdentifier`): `T`\[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceIdentifier` | `ServiceIdentifier` |

#### Returns

`T`\[]

***

### getMap

**getMap**(): `Map`<[`ServiceIdentifier`](/en/auto-docs/fixed-layout-editor/types/interfaces.ServiceIdentifier.md)<`unknown`>, `T`\[]>

#### Returns

`Map`<[`ServiceIdentifier`](/en/auto-docs/fixed-layout-editor/types/interfaces.ServiceIdentifier.md)<`unknown`>, `T`\[]>

***

### hasKey

**hasKey**(`serviceIdentifier`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceIdentifier` | `ServiceIdentifier` |

#### Returns

`boolean`

***

### remove

**remove**(`serviceIdentifier`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceIdentifier` | [`ServiceIdentifier`](/en/auto-docs/fixed-layout-editor/types/interfaces.ServiceIdentifier.md)<`unknown`> |

#### Returns

`void`

***

### removeByCondition

**removeByCondition**(`condition`): `T`\[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `condition` | (`item`: `T`) => `boolean` |

#### Returns

`T`\[]

***

### removeIntersection

**removeIntersection**(`lookup`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `lookup` | [`Lookup`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Lookup.md)<`T`> |

#### Returns

`void`

***

### traverse

**traverse**(`func`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `func` | (`key`: [`ServiceIdentifier`](/en/auto-docs/fixed-layout-editor/types/interfaces.ServiceIdentifier.md)<`unknown`>, `value`: `T`\[]) => `void` |

#### Returns

`void`
