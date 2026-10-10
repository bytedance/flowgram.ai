# Interface: ISnapshot

## Table of contents

### Properties

* [data](/auto-docs/interface/interfaces/ISnapshot.md#data)
* [id](/auto-docs/interface/interfaces/ISnapshot.md#id)

### Methods

* [export](/auto-docs/interface/interfaces/ISnapshot.md#export)
* [update](/auto-docs/interface/interfaces/ISnapshot.md#update)
* [validate](/auto-docs/interface/interfaces/ISnapshot.md#validate)

## Properties

### data

**data**: `Partial`<[`SnapshotData`](/auto-docs/interface/interfaces/SnapshotData.md)>

***

### id

**id**: `string`

## Methods

### export

**export**(): [`Snapshot`](/auto-docs/interface/interfaces/Snapshot.md)

#### Returns

[`Snapshot`](/auto-docs/interface/interfaces/Snapshot.md)

***

### update

**update**(`data`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Partial`<[`SnapshotData`](/auto-docs/interface/interfaces/SnapshotData.md)> |

#### Returns

`void`

***

### validate

**validate**(): `boolean`

#### Returns

`boolean`
