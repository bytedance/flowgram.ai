# Interface: PanelManagerConfig

## Table of contents

### Properties

* [autoResize](/auto-docs/panel-manager-plugin/interfaces/PanelManagerConfig.md#autoresize)
* [bottom](/auto-docs/panel-manager-plugin/interfaces/PanelManagerConfig.md#bottom)
* [dockedBottom](/auto-docs/panel-manager-plugin/interfaces/PanelManagerConfig.md#dockedbottom)
* [dockedRight](/auto-docs/panel-manager-plugin/interfaces/PanelManagerConfig.md#dockedright)
* [factories](/auto-docs/panel-manager-plugin/interfaces/PanelManagerConfig.md#factories)
* [getPopupContainer](/auto-docs/panel-manager-plugin/interfaces/PanelManagerConfig.md#getpopupcontainer)
* [layerProps](/auto-docs/panel-manager-plugin/interfaces/PanelManagerConfig.md#layerprops)
* [resizeBarRender](/auto-docs/panel-manager-plugin/interfaces/PanelManagerConfig.md#resizebarrender)
* [right](/auto-docs/panel-manager-plugin/interfaces/PanelManagerConfig.md#right)

## Properties

### autoResize

**autoResize**: `boolean`

Resizable, and multi-panel options mutually exclusive

***

### bottom

**bottom**: `PanelConfig`

***

### dockedBottom

**dockedBottom**: `PanelConfig`

***

### dockedRight

**dockedRight**: `PanelConfig`

***

### factories

**factories**: [`PanelFactory`](/auto-docs/panel-manager-plugin/interfaces/PanelFactory.md)<`any`>\[]

***

### getPopupContainer

**getPopupContainer**: (`ctx`: `PluginContext`) => `HTMLElement`

#### Type declaration

(`ctx`): `HTMLElement`

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `PluginContext` |

##### Returns

`HTMLElement`

***

### layerProps

**layerProps**: `PanelLayerProps`

***

### resizeBarRender

**resizeBarRender**: (`__namedParameters`: { `direction?`: `"vertical"` | `"horizontal"` ; `onResize`: (`size`: `number`) => `void` ; `size`: `number`  }) => `ReactNode`

#### Type declaration

(`«destructured»`): `ReactNode`

##### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `direction?` | `"vertical"` | `"horizontal"` |
| › `onResize` | (`size`: `number`) => `void` |
| › `size` | `number` |

##### Returns

`ReactNode`

***

### right

**right**: `PanelConfig`
