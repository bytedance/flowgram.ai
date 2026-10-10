# Class: FlowDownloadService

## Table of contents

### Constructors

* [constructor](/auto-docs/export-plugin/classes/FlowDownloadService.md#constructor)

### Properties

* [downloading](/auto-docs/export-plugin/classes/FlowDownloadService.md#downloading)
* [onDownloadingChange](/auto-docs/export-plugin/classes/FlowDownloadService.md#ondownloadingchange)

### Methods

* [dispose](/auto-docs/export-plugin/classes/FlowDownloadService.md#dispose)
* [download](/auto-docs/export-plugin/classes/FlowDownloadService.md#download)
* [init](/auto-docs/export-plugin/classes/FlowDownloadService.md#init)
* [setDownloading](/auto-docs/export-plugin/classes/FlowDownloadService.md#setdownloading)

## Constructors

### constructor

**new FlowDownloadService**()

## Properties

### downloading

**downloading**: `boolean` = `false`

***

### onDownloadingChange

**onDownloadingChange**: `Event`<`boolean`>

## Methods

### dispose

**dispose**(): `void`

#### Returns

`void`

***

### download

**download**(`params`): `Promise`<`void`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `WorkflowDownloadParams` |

#### Returns

`Promise`<`void`>

***

### init

**init**(`options?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `Partial`<[`DownloadServiceOptions`](/auto-docs/export-plugin/interfaces/DownloadServiceOptions.md)> |

#### Returns

`void`

***

### setDownloading

**setDownloading**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `boolean` |

#### Returns

`void`
