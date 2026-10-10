# Function: useStartDragNode

**useStartDragNode**(): `Object`

Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
SPDX-License-Identifier: MIT

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `dragOffset` | { `x`: `number` ; `y`: `number`  } |
| `dragOffset.x` | `number` |
| `dragOffset.y` | `number` |
| `startDrag` | (`e`: { `clientX`: `number` ; `clientY`: `number`  }, `{ dragStartEntity: startEntityFromProps, dragEntities, dragJSON, isBranch, onCreateNode, }`: { `dragEntities?`: [`FlowNodeEntity`](/en/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md)\[]  } & { `dragStartEntity?`: `undefined`  } & { `dragJSON`: [`FlowNodeJSON`](/en/auto-docs/fixed-layout-editor/interfaces/FlowNodeJSON.md) ; `isBranch?`: `boolean` ; `onCreateNode`: (`json`: [`FlowNodeJSON`](/en/auto-docs/fixed-layout-editor/interfaces/FlowNodeJSON.md), `dropEntity`: [`FlowNodeEntity`](/en/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md)) => `Promise`<[`FlowNodeEntity`](/en/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md)>  } | { `dragJSON?`: `undefined` ; `isBranch?`: `undefined` ; `onCreateNode?`: `undefined`  } & { `dragStartEntity`: [`FlowNodeEntity`](/en/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md)  }, `options?`: { `disableDragScroll?`: `boolean` ; `dragOffsetX?`: `number` ; `dragOffsetY?`: `number`  }) => `Promise`<`void`> | (`e`: `any`) => `void` |
