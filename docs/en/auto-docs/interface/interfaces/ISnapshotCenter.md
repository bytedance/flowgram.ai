# Interface: ISnapshotCenter

## Table of contents

### Properties

* [id](/en/auto-docs/interface/interfaces/ISnapshotCenter.md#id)

### Methods

* [create](/en/auto-docs/interface/interfaces/ISnapshotCenter.md#create)
* [dispose](/en/auto-docs/interface/interfaces/ISnapshotCenter.md#dispose)
* [export](/en/auto-docs/interface/interfaces/ISnapshotCenter.md#export)
* [exportAll](/en/auto-docs/interface/interfaces/ISnapshotCenter.md#exportall)
* [init](/en/auto-docs/interface/interfaces/ISnapshotCenter.md#init)

## Properties

### id

**id**: `string`

## Methods

### create

**create**(`snapshot`): [`ISnapshot`](/en/auto-docs/interface/interfaces/ISnapshot.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `snapshot` | `Partial`<[`SnapshotData`](/en/auto-docs/interface/interfaces/SnapshotData.md)> |

#### Returns

[`ISnapshot`](/en/auto-docs/interface/interfaces/ISnapshot.md)

***

### dispose

**dispose**(): `void`

#### Returns

`void`

***

### export

**export**(): `Record`<`string`, [`Snapshot`](/en/auto-docs/interface/interfaces/Snapshot.md)\[]>

#### Returns

`Record`<`string`, [`Snapshot`](/en/auto-docs/interface/interfaces/Snapshot.md)\[]>

***

### exportAll

**exportAll**(): [`Snapshot`](/en/auto-docs/interface/interfaces/Snapshot.md)\[]

#### Returns

[`Snapshot`](/en/auto-docs/interface/interfaces/Snapshot.md)\[]

***

### init

**init**(): `void`

#### Returns

`void`
