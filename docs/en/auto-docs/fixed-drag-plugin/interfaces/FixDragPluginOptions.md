# Interface: FixDragPluginOptions\<CTX>

## Type parameters

| Name | Type |
| :------ | :------ |
| `CTX` | extends `PluginContext` = `PluginContext` |

## Table of contents

### Properties

* [canDrop](/en/auto-docs/fixed-drag-plugin/interfaces/FixDragPluginOptions.md#candrop)
* [enable](/en/auto-docs/fixed-drag-plugin/interfaces/FixDragPluginOptions.md#enable)
* [onDrop](/en/auto-docs/fixed-drag-plugin/interfaces/FixDragPluginOptions.md#ondrop)

## Properties

### canDrop

`Optional` **canDrop**: (`ctx`: `CTX`, `dropData`: `Object`) => `boolean`

#### Type declaration

(`ctx`, `dropData`): `boolean`

Check can drop

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `CTX` |
| `dropData` | `Object` |

##### Returns

`boolean`

***

### enable

`Optional` **enable**: `boolean`

***

### onDrop

`Optional` **onDrop**: (`ctx`: `CTX`, `dropData`: { `dragNodes`: `FlowNodeEntity`\[] ; `dropNode`: `FlowNodeEntity`  }) => `void`

#### Type declaration

(`ctx`, `dropData`): `void`

Callback when drag drop

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `CTX` |
| `dropData` | `Object` |
| `dropData.dragNodes` | `FlowNodeEntity`\[] |
| `dropData.dropNode` | `FlowNodeEntity` |

##### Returns

`void`
