# Interface: ISnapshotCenter

## Table of contents

### Properties

* [id](/auto-docs/interface/interfaces/ISnapshotCenter.md#id)

### Methods

* [create](/auto-docs/interface/interfaces/ISnapshotCenter.md#create)
* [dispose](/auto-docs/interface/interfaces/ISnapshotCenter.md#dispose)
* [export](/auto-docs/interface/interfaces/ISnapshotCenter.md#export)
* [exportAll](/auto-docs/interface/interfaces/ISnapshotCenter.md#exportall)
* [init](/auto-docs/interface/interfaces/ISnapshotCenter.md#init)

## Properties

### id

**id**: `string`

## Methods

### create

**create**(`snapshot`): [`ISnapshot`](/auto-docs/interface/interfaces/ISnapshot.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `snapshot` | `Partial`<[`SnapshotData`](/auto-docs/interface/interfaces/SnapshotData.md)> |

#### Returns

[`ISnapshot`](/auto-docs/interface/interfaces/ISnapshot.md)

***

### dispose

**dispose**(): `void`

#### Returns

`void`

***

### export

**export**(): `Record`<`string`, [`Snapshot`](/auto-docs/interface/interfaces/Snapshot.md)\[]>

#### Returns

`Record`<`string`, [`Snapshot`](/auto-docs/interface/interfaces/Snapshot.md)\[]>

***

### exportAll

**exportAll**(): [`Snapshot`](/auto-docs/interface/interfaces/Snapshot.md)\[]

#### Returns

[`Snapshot`](/auto-docs/interface/interfaces/Snapshot.md)\[]

***

### init

**init**(): `void`

#### Returns

`void`
