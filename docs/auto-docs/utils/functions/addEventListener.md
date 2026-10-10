# Function: addEventListener

**addEventListener**<`K`>(`element`, `type`, `listener`, `useCapture?`): [`Disposable`](/auto-docs/utils/interfaces/Disposable-1.md)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof `HTMLElementEventMap` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | `HTMLElement` |
| `type` | `K` |
| `listener` | `EventListenerOrEventListenerObject`<`K`> |
| `useCapture?` | `boolean` |

#### Returns

[`Disposable`](/auto-docs/utils/interfaces/Disposable-1.md)
