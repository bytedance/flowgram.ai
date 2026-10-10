# Interface: CommandHandler

## Table of contents

### Methods

* [execute](/auto-docs/command/interfaces/CommandHandler.md#execute)
* [isEnabled](/auto-docs/command/interfaces/CommandHandler.md#isenabled)
* [isToggled](/auto-docs/command/interfaces/CommandHandler.md#istoggled)
* [isVisible](/auto-docs/command/interfaces/CommandHandler.md#isvisible)

## Methods

### execute

**execute**(`...args`): `any`

handler 执行函数

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`\[] |

#### Returns

`any`

***

### isEnabled

`Optional` **isEnabled**(`...args`): `boolean`

该 handler 是否可以执行

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`\[] |

#### Returns

`boolean`

***

### isToggled

`Optional` **isToggled**(`...args`): `boolean`

预留 contextMenu 用，该 handler 是否可以触发

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`\[] |

#### Returns

`boolean`

***

### isVisible

`Optional` **isVisible**(`...args`): `boolean`

预留 contextMenu 用，该 handler 是否可见

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`\[] |

#### Returns

`boolean`
