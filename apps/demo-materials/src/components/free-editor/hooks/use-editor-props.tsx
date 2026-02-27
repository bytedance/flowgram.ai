/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { useMemo } from 'react';

import {
  FreeLayoutProps,
  WorkflowNodeProps,
  WorkflowNodeRenderer,
  useNodeRender,
  FlowNodeRegistry,
  WorkflowJSON,
  WorkflowAutoLayoutTool,
} from '@flowgram.ai/free-layout-editor';

import { createDebugPanelPlugin } from '../plugins/debug-panel-plugin';

interface EditorProps {
  registries: FlowNodeRegistry[];
  initialData: WorkflowJSON;
  plugins?: FreeLayoutProps['plugins'];
  onSave?: (data: WorkflowJSON) => void;
  transformRegistry?: (registry: FreeLayoutProps) => FreeLayoutProps;
}

function passthrough<T>(a: T) {
  return a;
}

export const useEditorProps = ({
  registries,
  initialData,
  plugins,
  onSave,
  transformRegistry = passthrough,
}: EditorProps) =>
  useMemo<FreeLayoutProps>(
    () =>
      transformRegistry({
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

        scroll: {
          enableScrollLimit: true,
        },
        /**
         * Node registries
         * 节点注册
         */
        nodeRegistries: registries,
        variableEngine: {
          enable: true,
        },
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
          };
        },
        materials: {
          /**
           * Render Node
           */
          renderDefaultNode: (props: WorkflowNodeProps) => {
            const { form } = useNodeRender();

            return (
              <WorkflowNodeRenderer
                className={`demo-free-material-node ${
                  ['block-start', 'block-end'].includes(props.node.flowNodeType as string)
                    ? 'demo-free-material-shrink-node'
                    : ''
                }`}
                node={props.node}
              >
                <div className="demo-free-material-node-wrapper" style={{ padding: 12 }}>
                  {form?.render()}
                </div>
              </WorkflowNodeRenderer>
            );
          },
        },
        /**
         * Content change
         */
        onContentChange(ctx, event) {
          console.log('Auto Save: ', event, ctx.document.toJSON());
          onSave?.(ctx.document.toJSON());
        },
        // /**
        //  * Node engine enable, you can configure formMeta in the FlowNodeRegistry
        //  */
        nodeEngine: {
          enable: true,
        },
        /**
         * Redo/Undo enable
         */
        history: {
          enable: true,
          enableChangeNode: true, // Listen Node engine data change
        },
        /**
         * Playground init
         */
        onInit: (ctx) => {},
        /**
         * Playground render
         */
        onAllLayersRendered(ctx) {
          const autoLayoutTool = ctx.get(WorkflowAutoLayoutTool);
          autoLayoutTool.handle();
          //  Fitview
          ctx.document.fitView(false);
        },
        /**
         * Playground dispose
         */
        onDispose() {
          console.log('---- Playground Dispose ----');
        },
        plugins: (ctx) => [createDebugPanelPlugin({}), ...(plugins?.(ctx) || [])],
      }),
    []
  );
