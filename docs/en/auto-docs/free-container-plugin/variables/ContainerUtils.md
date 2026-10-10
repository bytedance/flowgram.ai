# Variable: ContainerUtils

`Const` **ContainerUtils**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `adjustSubNodePosition` | (`params`: { `containerNode`: `FlowNodeEntity` ; `containerPadding`: `PaddingSchema` ; `targetNode`: `FlowNodeEntity`  }) => `IPoint` |
| `getCollisionTransform` | (`params`: { `document`: `WorkflowDocument` ; `targetPoint?`: `PositionSchema` ; `targetRect?`: `Rectangle` ; `transforms`: `FlowNodeTransformData`\[] ; `withPadding?`: `boolean`  }) => `undefined` | `FlowNodeTransformData` |
| `getContainerTransforms` | (`allNodes`: `FlowNodeEntity`\[]) => `FlowNodeTransformData`\[] |
| `isContainer` | (`node?`: `FlowNodeEntity`) => `boolean` |
| `nextFrame` | () => `Promise`<`void`> |
