# Class: WorkflowLinesManager

线条管理

## Table of contents

### Constructors

* [constructor](/auto-docs/free-layout-core/classes/WorkflowLinesManager.md#constructor)

### Properties

* [contributionFactories](/auto-docs/free-layout-core/classes/WorkflowLinesManager.md#contributionfactories)
* [hoverService](/auto-docs/free-layout-core/classes/WorkflowLinesManager.md#hoverservice)
* [isDrawing](/auto-docs/free-layout-core/classes/WorkflowLinesManager.md#isdrawing)
* [onAvailableLinesChange](/auto-docs/free-layout-core/classes/WorkflowLinesManager.md#onavailablelineschange)
* [onForceUpdate](/auto-docs/free-layout-core/classes/WorkflowLinesManager.md#onforceupdate)
* [options](/auto-docs/free-layout-core/classes/WorkflowLinesManager.md#options)
* [selectService](/auto-docs/free-layout-core/classes/WorkflowLinesManager.md#selectservice)

### Accessors

* [disposed](/auto-docs/free-layout-core/classes/WorkflowLinesManager.md#disposed)
* [lineColor](/auto-docs/free-layout-core/classes/WorkflowLinesManager.md#linecolor)
* [lineType](/auto-docs/free-layout-core/classes/WorkflowLinesManager.md#linetype)

### Methods

* [canAddLine](/auto-docs/free-layout-core/classes/WorkflowLinesManager.md#canaddline)
* [canRemove](/auto-docs/free-layout-core/classes/WorkflowLinesManager.md#canremove)
* [canReset](/auto-docs/free-layout-core/classes/WorkflowLinesManager.md#canreset)
* [createLine](/auto-docs/free-layout-core/classes/WorkflowLinesManager.md#createline)
* [dispose](/auto-docs/free-layout-core/classes/WorkflowLinesManager.md#dispose)
* [forceUpdate](/auto-docs/free-layout-core/classes/WorkflowLinesManager.md#forceupdate)
* [getAllAvailableLines](/auto-docs/free-layout-core/classes/WorkflowLinesManager.md#getallavailablelines)
* [getAllLines](/auto-docs/free-layout-core/classes/WorkflowLinesManager.md#getalllines)
* [getCloseInLineFromMousePos](/auto-docs/free-layout-core/classes/WorkflowLinesManager.md#getcloseinlinefrommousepos)
* [getLine](/auto-docs/free-layout-core/classes/WorkflowLinesManager.md#getline)
* [getLineById](/auto-docs/free-layout-core/classes/WorkflowLinesManager.md#getlinebyid)
* [getLineColor](/auto-docs/free-layout-core/classes/WorkflowLinesManager.md#getlinecolor)
* [getLinesByPortId](/auto-docs/free-layout-core/classes/WorkflowLinesManager.md#getlinesbyportid)
* [getNodeFromMousePos](/auto-docs/free-layout-core/classes/WorkflowLinesManager.md#getnodefrommousepos)
* [getPortById](/auto-docs/free-layout-core/classes/WorkflowLinesManager.md#getportbyid)
* [getPortFromMousePos](/auto-docs/free-layout-core/classes/WorkflowLinesManager.md#getportfrommousepos)
* [hasLine](/auto-docs/free-layout-core/classes/WorkflowLinesManager.md#hasline)
* [init](/auto-docs/free-layout-core/classes/WorkflowLinesManager.md#init)
* [isDisabledLine](/auto-docs/free-layout-core/classes/WorkflowLinesManager.md#isdisabledline)
* [isErrorLine](/auto-docs/free-layout-core/classes/WorkflowLinesManager.md#iserrorline)
* [isFlowingLine](/auto-docs/free-layout-core/classes/WorkflowLinesManager.md#isflowingline)
* [isHideArrowLine](/auto-docs/free-layout-core/classes/WorkflowLinesManager.md#ishidearrowline)
* [isReverseLine](/auto-docs/free-layout-core/classes/WorkflowLinesManager.md#isreverseline)
* [rebindLinePorts](/auto-docs/free-layout-core/classes/WorkflowLinesManager.md#rebindlineports)
* [registerContribution](/auto-docs/free-layout-core/classes/WorkflowLinesManager.md#registercontribution)
* [replaceLine](/auto-docs/free-layout-core/classes/WorkflowLinesManager.md#replaceline)
* [setDefaultUIState](/auto-docs/free-layout-core/classes/WorkflowLinesManager.md#setdefaultuistate)
* [setLineClassName](/auto-docs/free-layout-core/classes/WorkflowLinesManager.md#setlineclassname)
* [setLineRenderType](/auto-docs/free-layout-core/classes/WorkflowLinesManager.md#setlinerendertype)
* [switchLineType](/auto-docs/free-layout-core/classes/WorkflowLinesManager.md#switchlinetype)
* [toJSON](/auto-docs/free-layout-core/classes/WorkflowLinesManager.md#tojson)

## Constructors

### constructor

**new WorkflowLinesManager**()

## Properties

### contributionFactories

`Readonly` **contributionFactories**: [`WorkflowLineRenderContributionFactory`](/auto-docs/free-layout-core/types/WorkflowLineRenderContributionFactory.md)\[] = `[]`

***

### hoverService

**hoverService**: [`WorkflowHoverService`](/auto-docs/free-layout-core/classes/WorkflowHoverService.md)

***

### isDrawing

**isDrawing**: `boolean` = `false`

是否在调整线条

***

### onAvailableLinesChange

`Readonly` **onAvailableLinesChange**: `Event`<[`WorkflowContentChangeEvent`](/auto-docs/free-layout-core/interfaces/WorkflowContentChangeEvent.md)>

有效的线条被添加或者删除时候触发，未连上的线条不算

***

### onForceUpdate

`Readonly` **onForceUpdate**: `Event`<`void`>

强制渲染 lines

***

### options

`Readonly` **options**: [`WorkflowDocumentOptions`](/auto-docs/free-layout-core/variables/WorkflowDocumentOptions-1.md)

***

### selectService

**selectService**: [`WorkflowSelectService`](/auto-docs/free-layout-core/classes/WorkflowSelectService.md)

## Accessors

### disposed

`get` **disposed**(): `boolean`

#### Returns

`boolean`

***

### lineColor

`get` **lineColor**(): [`LineColor`](/auto-docs/free-layout-core/interfaces/LineColor.md)

#### Returns

[`LineColor`](/auto-docs/free-layout-core/interfaces/LineColor.md)

***

### lineType

`get` **lineType**(): [`LineRenderType`](/auto-docs/free-layout-core/types/LineRenderType.md)

#### Returns

[`LineRenderType`](/auto-docs/free-layout-core/types/LineRenderType.md)

## Methods

### canAddLine

**canAddLine**(`fromPort`, `toPort`, `silent?`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `fromPort` | [`WorkflowPortEntity`](/auto-docs/free-layout-core/classes/WorkflowPortEntity.md) |
| `toPort` | [`WorkflowPortEntity`](/auto-docs/free-layout-core/classes/WorkflowPortEntity.md) |
| `silent?` | `boolean` |

#### Returns

`boolean`

***

### canRemove

**canRemove**(`line`, `newLineInfo?`, `silent?`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `line` | [`WorkflowLineEntity`](/auto-docs/free-layout-core/classes/WorkflowLineEntity.md) |
| `newLineInfo?` | `Required`<`Omit`<[`WorkflowLinePortInfo`](/auto-docs/free-layout-core/interfaces/WorkflowLinePortInfo.md), `"data"`>> |
| `silent?` | `boolean` |

#### Returns

`boolean`

***

### canReset

**canReset**(`oldLine`, `newLineInfo`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `oldLine` | [`WorkflowLineEntity`](/auto-docs/free-layout-core/classes/WorkflowLineEntity.md) |
| `newLineInfo` | `Required`<[`WorkflowLinePortInfo`](/auto-docs/free-layout-core/interfaces/WorkflowLinePortInfo.md)> |

#### Returns

`boolean`

***

### createLine

**createLine**(`options`): `undefined` | [`WorkflowLineEntity`](/auto-docs/free-layout-core/classes/WorkflowLineEntity.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | { `drawingFrom?`: [`LinePoint`](/auto-docs/free-layout-core/interfaces/LinePoint.md) ; `drawingTo?`: [`LinePoint`](/auto-docs/free-layout-core/interfaces/LinePoint.md) ; `key?`: `string`  } & [`WorkflowLinePortInfo`](/auto-docs/free-layout-core/interfaces/WorkflowLinePortInfo.md) |

#### Returns

`undefined` | [`WorkflowLineEntity`](/auto-docs/free-layout-core/classes/WorkflowLineEntity.md)

***

### dispose

**dispose**(): `void`

#### Returns

`void`

***

### forceUpdate

**forceUpdate**(): `void`

#### Returns

`void`

***

### getAllAvailableLines

**getAllAvailableLines**(): [`WorkflowLineEntity`](/auto-docs/free-layout-core/classes/WorkflowLineEntity.md)\[]

#### Returns

[`WorkflowLineEntity`](/auto-docs/free-layout-core/classes/WorkflowLineEntity.md)\[]

***

### getAllLines

**getAllLines**(): [`WorkflowLineEntity`](/auto-docs/free-layout-core/classes/WorkflowLineEntity.md)\[]

#### Returns

[`WorkflowLineEntity`](/auto-docs/free-layout-core/classes/WorkflowLineEntity.md)\[]

***

### getCloseInLineFromMousePos

**getCloseInLineFromMousePos**(`mousePos`, `minDistance?`): `undefined` | [`WorkflowLineEntity`](/auto-docs/free-layout-core/classes/WorkflowLineEntity.md)

获取线条中距离鼠标位置最近的线条和距离

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `mousePos` | `IPoint` | `undefined` | 鼠标位置 |
| `minDistance` | `number` | `LINE_HOVER_DISTANCE` | 最小检测距离 |

#### Returns

`undefined` | [`WorkflowLineEntity`](/auto-docs/free-layout-core/classes/WorkflowLineEntity.md)

距离鼠标位置最近的线条 以及距离

***

### getLine

**getLine**(`portInfo`): `undefined` | [`WorkflowLineEntity`](/auto-docs/free-layout-core/classes/WorkflowLineEntity.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `portInfo` | `Omit`<[`WorkflowLinePortInfo`](/auto-docs/free-layout-core/interfaces/WorkflowLinePortInfo.md), `"data"`> |

#### Returns

`undefined` | [`WorkflowLineEntity`](/auto-docs/free-layout-core/classes/WorkflowLineEntity.md)

***

### getLineById

**getLineById**(`id`): `undefined` | [`WorkflowLineEntity`](/auto-docs/free-layout-core/classes/WorkflowLineEntity.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`undefined` | [`WorkflowLineEntity`](/auto-docs/free-layout-core/classes/WorkflowLineEntity.md)

***

### getLineColor

**getLineColor**(`line`): `undefined` | `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `line` | [`WorkflowLineEntity`](/auto-docs/free-layout-core/classes/WorkflowLineEntity.md) |

#### Returns

`undefined` | `string`

***

### getLinesByPortId

**getLinesByPortId**(`portId`): [`WorkflowLineEntity`](/auto-docs/free-layout-core/classes/WorkflowLineEntity.md)\[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `portId` | `string` |

#### Returns

[`WorkflowLineEntity`](/auto-docs/free-layout-core/classes/WorkflowLineEntity.md)\[]

***

### getNodeFromMousePos

**getNodeFromMousePos**(`pos`): `undefined` | `FlowNodeEntity`

根据鼠标位置找到 node

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pos` | `IPoint` | 鼠标位置 |

#### Returns

`undefined` | `FlowNodeEntity`

***

### getPortById

**getPortById**(`portId`): `undefined` | [`WorkflowPortEntity`](/auto-docs/free-layout-core/classes/WorkflowPortEntity.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `portId` | `string` |

#### Returns

`undefined` | [`WorkflowPortEntity`](/auto-docs/free-layout-core/classes/WorkflowPortEntity.md)

***

### getPortFromMousePos

**getPortFromMousePos**(`pos`, `portType?`): `undefined` | [`WorkflowPortEntity`](/auto-docs/free-layout-core/classes/WorkflowPortEntity.md)

根据鼠标位置找到 port

#### Parameters

| Name | Type |
| :------ | :------ |
| `pos` | `IPoint` |
| `portType?` | [`WorkflowPortType`](/auto-docs/free-layout-core/types/WorkflowPortType.md) |

#### Returns

`undefined` | [`WorkflowPortEntity`](/auto-docs/free-layout-core/classes/WorkflowPortEntity.md)

***

### hasLine

**hasLine**(`portInfo`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `portInfo` | `Omit`<[`WorkflowLinePortInfo`](/auto-docs/free-layout-core/interfaces/WorkflowLinePortInfo.md), `"data"`> |

#### Returns

`boolean`

***

### init

**init**(`doc`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `doc` | [`WorkflowDocument`](/auto-docs/free-layout-core/classes/WorkflowDocument.md) |

#### Returns

`void`

***

### isDisabledLine

**isDisabledLine**(`line`, `defaultValue?`): `boolean`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `line` | [`WorkflowLineEntity`](/auto-docs/free-layout-core/classes/WorkflowLineEntity.md) | `undefined` |
| `defaultValue` | `boolean` | `false` |

#### Returns

`boolean`

***

### isErrorLine

**isErrorLine**(`fromPort?`, `toPort?`, `defaultValue?`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `fromPort?` | [`WorkflowPortEntity`](/auto-docs/free-layout-core/classes/WorkflowPortEntity.md) |
| `toPort?` | [`WorkflowPortEntity`](/auto-docs/free-layout-core/classes/WorkflowPortEntity.md) |
| `defaultValue?` | `boolean` |

#### Returns

`boolean`

***

### isFlowingLine

**isFlowingLine**(`line`, `defaultValue?`): `boolean`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `line` | [`WorkflowLineEntity`](/auto-docs/free-layout-core/classes/WorkflowLineEntity.md) | `undefined` |
| `defaultValue` | `boolean` | `false` |

#### Returns

`boolean`

***

### isHideArrowLine

**isHideArrowLine**(`line`, `defaultValue?`): `boolean`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `line` | [`WorkflowLineEntity`](/auto-docs/free-layout-core/classes/WorkflowLineEntity.md) | `undefined` |
| `defaultValue` | `boolean` | `false` |

#### Returns

`boolean`

***

### isReverseLine

**isReverseLine**(`line`, `defaultValue?`): `boolean`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `line` | [`WorkflowLineEntity`](/auto-docs/free-layout-core/classes/WorkflowLineEntity.md) | `undefined` |
| `defaultValue` | `boolean` | `false` |

#### Returns

`boolean`

***

### rebindLinePorts

**rebindLinePorts**(`line`, `prevInfo?`, `nextInfo?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `line` | [`WorkflowLineEntity`](/auto-docs/free-layout-core/classes/WorkflowLineEntity.md) |
| `prevInfo?` | [`WorkflowLineInfo`](/auto-docs/free-layout-core/interfaces/WorkflowLineInfo.md) |
| `nextInfo?` | [`WorkflowLineInfo`](/auto-docs/free-layout-core/interfaces/WorkflowLineInfo.md) |

#### Returns

`void`

***

### registerContribution

**registerContribution**(`factory`): [`WorkflowLinesManager`](/auto-docs/free-layout-core/classes/WorkflowLinesManager.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `factory` | [`WorkflowLineRenderContributionFactory`](/auto-docs/free-layout-core/types/WorkflowLineRenderContributionFactory.md) |

#### Returns

[`WorkflowLinesManager`](/auto-docs/free-layout-core/classes/WorkflowLinesManager.md)

***

### replaceLine

**replaceLine**(`oldPortInfo`, `newPortInfo`): [`WorkflowLineEntity`](/auto-docs/free-layout-core/classes/WorkflowLineEntity.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `oldPortInfo` | `Omit`<[`WorkflowLinePortInfo`](/auto-docs/free-layout-core/interfaces/WorkflowLinePortInfo.md), `"data"`> |
| `newPortInfo` | `Omit`<[`WorkflowLinePortInfo`](/auto-docs/free-layout-core/interfaces/WorkflowLinePortInfo.md), `"data"`> |

#### Returns

[`WorkflowLineEntity`](/auto-docs/free-layout-core/classes/WorkflowLineEntity.md)

***

### setDefaultUIState

**setDefaultUIState**(`defaultUIState`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `defaultUIState` | `Partial`<[`WorkflowLineUIState`](/auto-docs/free-layout-core/interfaces/WorkflowLineUIState.md)> |

#### Returns

`void`

***

### setLineClassName

**setLineClassName**(`line`): `undefined` | `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `line` | [`WorkflowLineEntity`](/auto-docs/free-layout-core/classes/WorkflowLineEntity.md) |

#### Returns

`undefined` | `string`

***

### setLineRenderType

**setLineRenderType**(`line`): `undefined` | [`LineRenderType`](/auto-docs/free-layout-core/types/LineRenderType.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `line` | [`WorkflowLineEntity`](/auto-docs/free-layout-core/classes/WorkflowLineEntity.md) |

#### Returns

`undefined` | [`LineRenderType`](/auto-docs/free-layout-core/types/LineRenderType.md)

***

### switchLineType

**switchLineType**(`newType?`): [`LineRenderType`](/auto-docs/free-layout-core/types/LineRenderType.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `newType?` | [`LineRenderType`](/auto-docs/free-layout-core/types/LineRenderType.md) |

#### Returns

[`LineRenderType`](/auto-docs/free-layout-core/types/LineRenderType.md)

***

### toJSON

**toJSON**(): [`WorkflowEdgeJSON`](/auto-docs/free-layout-core/interfaces/WorkflowEdgeJSON.md)\[]

#### Returns

[`WorkflowEdgeJSON`](/auto-docs/free-layout-core/interfaces/WorkflowEdgeJSON.md)\[]
