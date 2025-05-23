import { useMemo } from 'react';

import { createMinimapPlugin } from '@flowgram.ai/minimap-plugin';
import { defaultFixedSemiMaterials } from '@flowgram.ai/fixed-semi-materials';
import {
  Field,
  type FixedLayoutProps,
  FlowDocumentJSON,
  FlowNodeRegistry,
  FlowRendererKey,
  FlowTextKey,
} from '@flowgram.ai/fixed-layout-editor';

import { NodeAdder } from '../components/node-adder';
import { BranchAdder } from '../components/branch-adder';
import { BaseNode } from '../components/base-node';

/** semi materials */

export function useEditorProps(
  initialData: FlowDocumentJSON, // 初始化数据
  nodeRegistries: FlowNodeRegistry[] // 节点定义
): FixedLayoutProps {
  return useMemo<FixedLayoutProps>(
    () => ({
      /**
       * Whether to enable the background
       */
      background: true,
      /**
       * Whether it is read-only or not, the node cannot be dragged in read-only mode
       */
      readonly: false,
      /**
       * Initial data
       * 初始化数据
       */
      initialData,
      /**
       * 画布节点定义
       */
      nodeRegistries,
      /**
       * Get the default node registry, which will be merged with the 'nodeRegistries'
       * 提供默认的节点注册，这个会和 nodeRegistries 做合并
       */
      getNodeDefaultRegistry(type) {
        return {
          type,
          meta: {
            defaultExpanded: true,
          },
          formMeta: {
            /**
             * Render form
             */
            render: () => (
              <>
                <Field<string> name="title">
                  {({ field }) => <div className="demo-fixed-node-title">{field.value}</div>}
                </Field>
                <div className="demo-fixed-node-content">
                  <Field<string> name="content">
                    <input />
                  </Field>
                </div>
              </>
            ),
          },
        };
      },
      /**
       * Materials, components can be customized based on the key
       * @see https://github.com/bytedance/flowgram.ai/blob/main/packages/materials/fixed-semi-materials/src/components/index.tsx
       * 可以通过 key 自定义 UI 组件
       */
      materials: {
        renderNodes: {
          ...defaultFixedSemiMaterials,
          /**
           * Components can be customized based on key business-side requirements.
           * 这里可以根据 key 业务侧定制组件
           */
          [FlowRendererKey.ADDER]: NodeAdder,
          [FlowRendererKey.BRANCH_ADDER]: BranchAdder,
          // [FlowRendererKey.DRAG_NODE]: DragNode,
        },
        renderDefaultNode: BaseNode, // 节点渲染
        renderTexts: {
          [FlowTextKey.LOOP_END_TEXT]: 'loop end',
          [FlowTextKey.LOOP_TRAVERSE_TEXT]: 'looping',
        },
      },
      /**
       * Node engine enable, you can configure formMeta in the FlowNodeRegistry
       */
      nodeEngine: {
        enable: true,
      },
      history: {
        enable: true,
        enableChangeNode: true, // Listen Node engine data change
        onApply(ctx, opt) {
          // Listen change to trigger auto save
          console.log('auto save: ', ctx.document.toJSON(), opt);
        },
      },
      /**
       * Playground init
       * 画布初始化
       */
      onInit: (ctx) => {
        /**
         * Data can also be dynamically loaded via fromJSON
         * 也可以通过 fromJSON 动态加载数据
         */
        // ctx.document.fromJSON(initialData)
        console.log('---- Playground Init ----');
      },
      /**
       * Playground render
       */
      onAllLayersRendered: (ctx) => {
        setTimeout(() => {
          ctx.playground.config.fitView(ctx.document.root.bounds.pad(30));
        }, 10);
      },
      /**
       * Playground dispose
       * 画布销毁
       */
      onDispose: () => {
        console.log('---- Playground Dispose ----');
      },
      /**
       * 节点数据转换, 由 ctx.document.fromJSON 调用
       * Node data transformation, called by ctx.document.fromJSON
       * @param node
       * @param json
       */
      fromNodeJSON(node, json) {
        return json;
      },
      /**
       * 节点数据转换, 由 ctx.document.toJSON 调用
       * Node data transformation, called by ctx.document.toJSON
       * @param node
       * @param json
       */
      toNodeJSON(node, json) {
        return json;
      },
      plugins: () => [
        /**
         * Minimap plugin
         * 缩略图插件
         */
        createMinimapPlugin({
          disableLayer: true,
          enableDisplayAllNodes: true,
          canvasStyle: {
            canvasWidth: 182,
            canvasHeight: 102,
            canvasPadding: 50,
            canvasBackground: 'rgba(245, 245, 245, 1)',
            canvasBorderRadius: 10,
            viewportBackground: 'rgba(235, 235, 235, 1)',
            viewportBorderRadius: 4,
            viewportBorderColor: 'rgba(201, 201, 201, 1)',
            viewportBorderWidth: 1,
            viewportBorderDashLength: 2,
            nodeColor: 'rgba(255, 255, 255, 1)',
            nodeBorderRadius: 2,
            nodeBorderWidth: 0.145,
            nodeBorderColor: 'rgba(6, 7, 9, 0.10)',
            overlayColor: 'rgba(255, 255, 255, 0)',
          },
          inactiveDebounceTime: 1,
        }),
      ],
    }),
    []
  );
}
