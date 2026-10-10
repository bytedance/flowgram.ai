# Class: PanelManager

## Table of contents

### Constructors

* [constructor](/en/auto-docs/panel-manager-plugin/classes/PanelManager.md#constructor)

### Properties

* [config](/en/auto-docs/panel-manager-plugin/classes/PanelManager.md#config)
* [createPanel](/en/auto-docs/panel-manager-plugin/classes/PanelManager.md#createpanel)
* [onPanelsChange](/en/auto-docs/panel-manager-plugin/classes/PanelManager.md#onpanelschange)
* [panelRegistry](/en/auto-docs/panel-manager-plugin/classes/PanelManager.md#panelregistry)

### Methods

* [close](/en/auto-docs/panel-manager-plugin/classes/PanelManager.md#close)
* [dispose](/en/auto-docs/panel-manager-plugin/classes/PanelManager.md#dispose)
* [getAreaConfig](/en/auto-docs/panel-manager-plugin/classes/PanelManager.md#getareaconfig)
* [getPanels](/en/auto-docs/panel-manager-plugin/classes/PanelManager.md#getpanels)
* [init](/en/auto-docs/panel-manager-plugin/classes/PanelManager.md#init)
* [open](/en/auto-docs/panel-manager-plugin/classes/PanelManager.md#open)
* [register](/en/auto-docs/panel-manager-plugin/classes/PanelManager.md#register)

## Constructors

### constructor

**new PanelManager**()

## Properties

### config

`Readonly` **config**: [`PanelManagerConfig`](/en/auto-docs/panel-manager-plugin/variables/PanelManagerConfig-1.md)

***

### createPanel

`Readonly` **createPanel**: `PanelEntityFactory`

***

### onPanelsChange

**onPanelsChange**: `Event`<`void`>

***

### panelRegistry

`Readonly` **panelRegistry**: `Map`<`string`, [`PanelFactory`](/en/auto-docs/panel-manager-plugin/interfaces/PanelFactory.md)<`any`>>

## Methods

### close

**close**(`key?`): `void`

close panel

#### Parameters

| Name | Type |
| :------ | :------ |
| `key?` | `string` |

#### Returns

`void`

***

### dispose

**dispose**(): `void`

#### Returns

`void`

***

### getAreaConfig

**getAreaConfig**(`area`): `PanelConfig`

#### Parameters

| Name | Type |
| :------ | :------ |
| `area` | [`Area`](/en/auto-docs/panel-manager-plugin/types/Area.md) |

#### Returns

`PanelConfig`

***

### getPanels

**getPanels**(`area?`): `PanelEntity`\[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `area?` | [`Area`](/en/auto-docs/panel-manager-plugin/types/Area.md) |

#### Returns

`PanelEntity`\[]

***

### init

**init**(): `void`

#### Returns

`void`

***

### open

**open**(`key`, `area?`, `options?`): `void`

open panel

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `key` | `string` | `undefined` |
| `area` | [`Area`](/en/auto-docs/panel-manager-plugin/types/Area.md) | `'right'` |
| `options?` | `PanelEntityConfig`<`any`> | `undefined` |

#### Returns

`void`

***

### register

**register**<`T`>(`factory`): `void`

registry panel factory

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `unknown` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `factory` | [`PanelFactory`](/en/auto-docs/panel-manager-plugin/interfaces/PanelFactory.md)<`T`> |

#### Returns

`void`
