# Interface: ISnapshot

## Table of contents

### Properties

* [data](/en/auto-docs/interface/interfaces/ISnapshot.md#data)
* [id](/en/auto-docs/interface/interfaces/ISnapshot.md#id)

### Methods

* [export](/en/auto-docs/interface/interfaces/ISnapshot.md#export)
* [update](/en/auto-docs/interface/interfaces/ISnapshot.md#update)
* [validate](/en/auto-docs/interface/interfaces/ISnapshot.md#validate)

## Properties

### data

**data**: `Partial`<[`SnapshotData`](/en/auto-docs/interface/interfaces/SnapshotData.md)>

***

### id

**id**: `string`

## Methods

### export

**export**(): [`Snapshot`](/en/auto-docs/interface/interfaces/Snapshot.md)

#### Returns

[`Snapshot`](/en/auto-docs/interface/interfaces/Snapshot.md)

***

### update

**update**(`data`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Partial`<[`SnapshotData`](/en/auto-docs/interface/interfaces/SnapshotData.md)> |

#### Returns

`void`

***

### validate

**validate**(): `boolean`

#### Returns

`boolean`
