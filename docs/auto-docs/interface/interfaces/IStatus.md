# Interface: IStatus

## Hierarchy

* [`StatusData`](/auto-docs/interface/interfaces/StatusData.md)

  ↳ **`IStatus`**

## Table of contents

### Properties

* [endTime](/auto-docs/interface/interfaces/IStatus.md#endtime)
* [id](/auto-docs/interface/interfaces/IStatus.md#id)
* [startTime](/auto-docs/interface/interfaces/IStatus.md#starttime)
* [status](/auto-docs/interface/interfaces/IStatus.md#status)
* [terminated](/auto-docs/interface/interfaces/IStatus.md#terminated)
* [timeCost](/auto-docs/interface/interfaces/IStatus.md#timecost)

### Methods

* [cancel](/auto-docs/interface/interfaces/IStatus.md#cancel)
* [export](/auto-docs/interface/interfaces/IStatus.md#export)
* [fail](/auto-docs/interface/interfaces/IStatus.md#fail)
* [process](/auto-docs/interface/interfaces/IStatus.md#process)
* [success](/auto-docs/interface/interfaces/IStatus.md#success)

## Properties

### endTime

`Optional` **endTime**: `number`

#### Inherited from

[StatusData](/auto-docs/interface/interfaces/StatusData.md).[endTime](/auto-docs/interface/interfaces/StatusData.md#endtime)

***

### id

**id**: `string`

***

### startTime

**startTime**: `number`

#### Inherited from

[StatusData](/auto-docs/interface/interfaces/StatusData.md).[startTime](/auto-docs/interface/interfaces/StatusData.md#starttime)

***

### status

**status**: [`WorkflowStatus`](/auto-docs/interface/enums/WorkflowStatus.md)

#### Inherited from

[StatusData](/auto-docs/interface/interfaces/StatusData.md).[status](/auto-docs/interface/interfaces/StatusData.md#status)

***

### terminated

**terminated**: `boolean`

#### Inherited from

[StatusData](/auto-docs/interface/interfaces/StatusData.md).[terminated](/auto-docs/interface/interfaces/StatusData.md#terminated)

***

### timeCost

**timeCost**: `number`

#### Inherited from

[StatusData](/auto-docs/interface/interfaces/StatusData.md).[timeCost](/auto-docs/interface/interfaces/StatusData.md#timecost)

## Methods

### cancel

**cancel**(): `void`

#### Returns

`void`

***

### export

**export**(): [`StatusData`](/auto-docs/interface/interfaces/StatusData.md)

#### Returns

[`StatusData`](/auto-docs/interface/interfaces/StatusData.md)

***

### fail

**fail**(): `void`

#### Returns

`void`

***

### process

**process**(): `void`

#### Returns

`void`

***

### success

**success**(): `void`

#### Returns

`void`
