import { useLayoutEffect } from 'react';

import { useCurrentEntity } from '@flowgram.ai/free-layout-core';
import { FlowNodeTransformData } from '@flowgram.ai/document';

import { NodeSize } from './use-node-size';

export const useSyncNodeRenderSize = (nodeSize?: NodeSize) => {
  const node = useCurrentEntity();

  useLayoutEffect(() => {
    if (!nodeSize) {
      return;
    }

    // 更新DOM样式
    node.renderData.node.style.width = nodeSize.width + 'px';
    node.renderData.node.style.height = nodeSize.height + 'px';

    // 添加延迟确保DOM渲染完成后再更新数据
    // Add delay to ensure DOM rendering is complete before updating data
    requestAnimationFrame(() => {
      setTimeout(() => {
        if (!node.disposed) {
          // 触发transform数据更新，确保连线系统能感知到容器大小变化
          // Trigger transform data update to ensure line system can detect container size changes
          const transform = node.getData<FlowNodeTransformData>(FlowNodeTransformData);
          if (transform) {
            // 强制刷新bounds缓存并触发变化事件
            // Force refresh bounds cache and trigger change event
            node.clearMemoGlobal();
            node.clearMemoLocal();

            // 更新size数据以保持同步
            // Update size data to keep in sync
            transform.update({ size: { width: nodeSize.width, height: nodeSize.height } });

            // 触发变化事件
            // Trigger change event
            transform.fireChange();

            // 递归清理并更新所有父节点缓存，确保嵌套容器也能正确更新
            // Recursively clear and update all parent node caches for nested containers
            let parentNode = node.parent;
            while (parentNode) {
              parentNode.clearMemoGlobal();
              parentNode.clearMemoLocal();
              const parentTransform =
                parentNode.getData<FlowNodeTransformData>(FlowNodeTransformData);
              if (parentTransform) {
                parentTransform.fireChange();
              }
              parentNode = parentNode.parent;
            }
          }
        }
      }, 16); // 16ms延迟确保至少一帧渲染完成
    });
  }, [nodeSize?.width, nodeSize?.height]);
};
