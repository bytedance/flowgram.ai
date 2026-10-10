# Interface: PlaygroundContribution

## Table of contents

### Methods

* [onAllLayersRendered](/en/auto-docs/free-layout-editor/interfaces/PlaygroundContribution.md#onalllayersrendered)
* [onDispose](/en/auto-docs/free-layout-editor/interfaces/PlaygroundContribution.md#ondispose)
* [onInit](/en/auto-docs/free-layout-editor/interfaces/PlaygroundContribution.md#oninit)
* [onReady](/en/auto-docs/free-layout-editor/interfaces/PlaygroundContribution.md#onready)
* [registerPlayground](/en/auto-docs/free-layout-editor/interfaces/PlaygroundContribution.md#registerplayground)

## Methods

### onAllLayersRendered

`Optional` **onAllLayersRendered**(`playground`): `void`

所有 Layer 第一次渲染完毕后触发

#### Parameters

| Name | Type |
| :------ | :------ |
| `playground` | [`Playground`](/en/auto-docs/free-layout-editor/classes/Playground.md)<`any`> |

#### Returns

`void`

***

### onDispose

`Optional` **onDispose**(`playground`): `void`

销毁

#### Parameters

| Name | Type |
| :------ | :------ |
| `playground` | [`Playground`](/en/auto-docs/free-layout-editor/classes/Playground.md)<`any`> |

#### Returns

`void`

***

### onInit

`Optional` **onInit**(`playground`): `void`

初始化画布 (onReady 之前)

#### Parameters

| Name | Type |
| :------ | :------ |
| `playground` | [`Playground`](/en/auto-docs/free-layout-editor/classes/Playground.md)<`any`> |

#### Returns

`void`

***

### onReady

`Optional` **onReady**(`playground`): `void`

初始化 entity 完毕后触发

#### Parameters

| Name | Type |
| :------ | :------ |
| `playground` | [`Playground`](/en/auto-docs/free-layout-editor/classes/Playground.md)<`any`> |

#### Returns

`void`

***

### registerPlayground

`Optional` **registerPlayground**(`registry`): `void`

注册 Layer/Entity/Able 相关

#### Parameters

| Name | Type |
| :------ | :------ |
| `registry` | [`PlaygroundRegistry`](/en/auto-docs/free-layout-editor/classes/PlaygroundRegistry.md) |

#### Returns

`void`

**`Deprecated`**
