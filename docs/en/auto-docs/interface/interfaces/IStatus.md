# Interface: IStatus

## Hierarchy

* [`StatusData`](/en/auto-docs/interface/interfaces/StatusData.md)

  ↳ **`IStatus`**

## Table of contents

### Properties

* [endTime](/en/auto-docs/interface/interfaces/IStatus.md#endtime)
* [id](/en/auto-docs/interface/interfaces/IStatus.md#id)
* [startTime](/en/auto-docs/interface/interfaces/IStatus.md#starttime)
* [status](/en/auto-docs/interface/interfaces/IStatus.md#status)
* [terminated](/en/auto-docs/interface/interfaces/IStatus.md#terminated)
* [timeCost](/en/auto-docs/interface/interfaces/IStatus.md#timecost)

### Methods

* [cancel](/en/auto-docs/interface/interfaces/IStatus.md#cancel)
* [export](/en/auto-docs/interface/interfaces/IStatus.md#export)
* [fail](/en/auto-docs/interface/interfaces/IStatus.md#fail)
* [process](/en/auto-docs/interface/interfaces/IStatus.md#process)
* [success](/en/auto-docs/interface/interfaces/IStatus.md#success)

## Properties

### endTime

`Optional` **endTime**: `number`

#### Inherited from

[StatusData](/en/auto-docs/interface/interfaces/StatusData.md).[endTime](/en/auto-docs/interface/interfaces/StatusData.md#endtime)

***

### id

**id**: `string`

***

### startTime

**startTime**: `number`

#### Inherited from

[StatusData](/en/auto-docs/interface/interfaces/StatusData.md).[startTime](/en/auto-docs/interface/interfaces/StatusData.md#starttime)

***

### status

**status**: [`WorkflowStatus`](/en/auto-docs/interface/enums/WorkflowStatus.md)

#### Inherited from

[StatusData](/en/auto-docs/interface/interfaces/StatusData.md).[status](/en/auto-docs/interface/interfaces/StatusData.md#status)

***

### terminated

**terminated**: `boolean`

#### Inherited from

[StatusData](/en/auto-docs/interface/interfaces/StatusData.md).[terminated](/en/auto-docs/interface/interfaces/StatusData.md#terminated)

***

### timeCost

**timeCost**: `number`

#### Inherited from

[StatusData](/en/auto-docs/interface/interfaces/StatusData.md).[timeCost](/en/auto-docs/interface/interfaces/StatusData.md#timecost)

## Methods

### cancel

**cancel**(): `void`

#### Returns

`void`

***

### export

**export**(): [`StatusData`](/en/auto-docs/interface/interfaces/StatusData.md)

#### Returns

[`StatusData`](/en/auto-docs/interface/interfaces/StatusData.md)

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
