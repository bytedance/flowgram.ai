# Variable: dagreLib

`Const` **dagreLib**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `acyclic` | { `run`: (`g`: `any`) => `void` ; `undo`: (`g`: `any`) => `void`  } |
| `acyclic.run` | (`g`: `any`) => `void` |
| `acyclic.undo` | (`g`: `any`) => `void` |
| `addBorderSegments` | (`g`: `any`) => `void` |
| `assignNodeIntersects` | (`g`: `any`) => `void` |
| `assignRankMinMax` | (`g`: `any`) => `void` |
| `buildLayoutGraph` | (`inputGraph`: `any`) => [`DagreGraph`](/auto-docs/free-auto-layout-plugin/classes/DagreGraph.md) |
| `coordinateSystem` | { `adjust`: (`g`: `any`) => `void` ; `undo`: (`g`: `any`) => `void`  } |
| `coordinateSystem.adjust` | (`g`: `any`) => `void` |
| `coordinateSystem.undo` | (`g`: `any`) => `void` |
| `fixupEdgeLabelCoords` | (`g`: `any`) => `void` |
| `injectEdgeLabelProxies` | (`g`: `any`) => `void` |
| `insertSelfEdges` | (`g`: `any`) => `void` |
| `layout` | (`g`: `any`, `opts`: `any`) => `void` |
| `makeSpaceForEdgeLabels` | (`g`: `any`) => `void` |
| `nestingGraph` | { `cleanup`: (`g`: `any`) => `void` ; `run`: (`g`: `any`) => `void`  } |
| `nestingGraph.cleanup` | (`g`: `any`) => `void` |
| `nestingGraph.run` | (`g`: `any`) => `void` |
| `normalize` | { `run`: (`g`: `any`) => `void` ; `undo`: (`g`: `any`) => `void`  } |
| `normalize.run` | (`g`: `any`) => `void` |
| `normalize.undo` | (`g`: `any`) => `void` |
| `normalizeRanks` | (`g`: `any`) => `void` |
| `order` | (`g`: `any`, `opts`: `any`) => `void` |
| `parentDummyChains` | (`g`: `any`) => `void` |
| `position` | (`g`: `any`) => `void` |
| `positionSelfEdges` | (`g`: `any`) => `void` |
| `rank` | (`g`: `any`) => `void` |
| `removeBorderNodes` | (`g`: `any`) => `void` |
| `removeEdgeLabelProxies` | (`g`: `any`) => `void` |
| `removeEmptyRanks` | (`g`: `any`) => `void` |
| `removeSelfEdges` | (`g`: `any`) => `void` |
| `reversePointsForReversedEdges` | (`g`: `any`) => `void` |
| `translateGraph` | (`g`: `any`) => `void` |
| `updateInputGraph` | (`inputGraph`: `any`, `layoutGraph`: `any`) => `void` |
| `util` | { `addBorderNode`: (`g`: `any`, `prefix`: `any`, `rank`: `any`, `order`: `any`, ...`args`: `any`) => `string` ; `addDummyNode`: (`g`: `any`, `type`: `any`, `attrs`: `any`, `name`: `any`) => `string` ; `applyWithChunking`: (`fn`: `any`, `argsArray`: `any`) => `any` ; `asNonCompoundGraph`: (`g`: `any`) => [`DagreGraph`](/auto-docs/free-auto-layout-plugin/classes/DagreGraph.md) ; `buildLayerMatrix`: (`g`: `any`) => `never`\[]\[] ; `intersectRect`: (`rect`: `any`, `point`: `any`) => { `x`: `any` ; `y`: `any`  } ; `mapValues`: (`obj`: `any`, `funcOrProp`: `any`) => {} ; `maxRank`: (`g`: `any`) => `any` ; `normalizeRanks`: (`g`: `any`) => `void` ; `notime`: (`name`: `any`, `fn`: `any`) => `any` ; `partition`: (`collection`: `any`, `fn`: `any`) => { `lhs`: `never`\[] = \[]; `rhs`: `never`\[] = \[] } ; `pick`: (`source`: `any`, `keys`: `any`) => {} ; `predecessorWeights`: (`g`: `any`) => `any` ; `range`: (`start`: `any`, `limit`: `any`, `step`: `number`) => `any`\[] ; `removeEmptyRanks`: (`g`: `any`) => `void` ; `simplify`: (`g`: `any`) => [`DagreGraph`](/auto-docs/free-auto-layout-plugin/classes/DagreGraph.md) ; `successorWeights`: (`g`: `any`) => `any` ; `time`: (`name`: `any`, `fn`: `any`) => `any` ; `uniqueId`: (`prefix`: `any`) => `string` ; `zipObject`: (`props`: `any`, `values`: `any`) => `any`  } |
| `util.addBorderNode` | (`g`: `any`, `prefix`: `any`, `rank`: `any`, `order`: `any`, ...`args`: `any`) => `string` |
| `util.addDummyNode` | (`g`: `any`, `type`: `any`, `attrs`: `any`, `name`: `any`) => `string` |
| `util.applyWithChunking` | (`fn`: `any`, `argsArray`: `any`) => `any` |
| `util.asNonCompoundGraph` | (`g`: `any`) => [`DagreGraph`](/auto-docs/free-auto-layout-plugin/classes/DagreGraph.md) |
| `util.buildLayerMatrix` | (`g`: `any`) => `never`\[]\[] |
| `util.intersectRect` | (`rect`: `any`, `point`: `any`) => { `x`: `any` ; `y`: `any`  } |
| `util.mapValues` | (`obj`: `any`, `funcOrProp`: `any`) => {} |
| `util.maxRank` | (`g`: `any`) => `any` |
| `util.normalizeRanks` | (`g`: `any`) => `void` |
| `util.notime` | (`name`: `any`, `fn`: `any`) => `any` |
| `util.partition` | (`collection`: `any`, `fn`: `any`) => { `lhs`: `never`\[] = \[]; `rhs`: `never`\[] = \[] } |
| `util.pick` | (`source`: `any`, `keys`: `any`) => {} |
| `util.predecessorWeights` | (`g`: `any`) => `any` |
| `util.range` | (`start`: `any`, `limit`: `any`, `step`: `number`) => `any`\[] |
| `util.removeEmptyRanks` | (`g`: `any`) => `void` |
| `util.simplify` | (`g`: `any`) => [`DagreGraph`](/auto-docs/free-auto-layout-plugin/classes/DagreGraph.md) |
| `util.successorWeights` | (`g`: `any`) => `any` |
| `util.time` | (`name`: `any`, `fn`: `any`) => `any` |
| `util.uniqueId` | (`prefix`: `any`) => `string` |
| `util.zipObject` | (`props`: `any`, `values`: `any`) => `any` |
