# 复合节点

复合节点由多个节点组合，并支持自定义线条，如 分支节点、Loop 节点、TryCatch 节点:

## 使用

```ts pure title="node-registries.ts"

import { FlowNodeRegistry  } from '@flowgram.ai/fixed-layout-editor';

/**
 * 节点注册
 */
export const nodeRegistries: FlowNodeRegistry[] = [
  {
    type: 'yourCustomNodeType',
    extend: 'dynamicSplit',
  },
];

```

## 内置的复合节点

<div className="rs-tip">
  <a className="rs-link" target="_blank" href="https://github.com/bytedance/flowgram.ai/tree/main/packages/canvas-engine/fixed-layout-core/src/activities">
    Source Code
  </a>
</div>

import { CompositeNodesPreview } from '../../../../components';

<CompositeNodesPreview />
