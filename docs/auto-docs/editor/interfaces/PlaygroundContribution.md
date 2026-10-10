# Interface: PlaygroundContribution

## Table of contents

### Methods

* [onAllLayersRendered](/auto-docs/editor/interfaces/PlaygroundContribution.md#onalllayersrendered)
* [onDispose](/auto-docs/editor/interfaces/PlaygroundContribution.md#ondispose)
* [onInit](/auto-docs/editor/interfaces/PlaygroundContribution.md#oninit)
* [onReady](/auto-docs/editor/interfaces/PlaygroundContribution.md#onready)
* [registerPlayground](/auto-docs/editor/interfaces/PlaygroundContribution.md#registerplayground)

## Methods

### onAllLayersRendered

`Optional` **onAllLayersRendered**(`playground`): `void`

所有 Layer 第一次渲染完毕后触发

#### Parameters

| Name | Type |
| :------ | :------ |
| `playground` | [`Playground`](/auto-docs/editor/classes/Playground.md)<`any`> |

#### Returns

`void`

***

### onDispose

`Optional` **onDispose**(`playground`): `void`

销毁

#### Parameters

| Name | Type |
| :------ | :------ |
| `playground` | [`Playground`](/auto-docs/editor/classes/Playground.md)<`any`> |

#### Returns

`void`

***

### onInit

`Optional` **onInit**(`playground`): `void`

初始化画布 (onReady 之前)

#### Parameters

| Name | Type |
| :------ | :------ |
| `playground` | [`Playground`](/auto-docs/editor/classes/Playground.md)<`any`> |

#### Returns

`void`

***

### onReady

`Optional` **onReady**(`playground`): `void`

初始化 entity 完毕后触发

#### Parameters

| Name | Type |
| :------ | :------ |
| `playground` | [`Playground`](/auto-docs/editor/classes/Playground.md)<`any`> |

#### Returns

`void`

***

### registerPlayground

`Optional` **registerPlayground**(`registry`): `void`

注册 Layer/Entity/Able 相关

#### Parameters

| Name | Type |
| :------ | :------ |
| `registry` | [`PlaygroundRegistry`](/auto-docs/editor/classes/PlaygroundRegistry.md) |

#### Returns

`void`

**`Deprecated`**
