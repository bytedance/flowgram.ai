"use strict";(self.webpackChunk_flowgram_ai_docs=self.webpackChunk_flowgram_ai_docs||[]).push([["965955"],{156973:function(e,o,t){t.d(o,{C1:()=>c,zQ:()=>x,U2:()=>s,tt:()=>h,Ph:()=>E,DJ:()=>l});var r=t("110239"),n=t("908600"),i=t("225716"),d=t("372957");let a=e=>{let{files:o,children:t,previewStyle:a,dependencies:s,editorStyle:l}=e,c=(0,i.e7)(),u=(0,n.useMemo)(()=>c?"dark":"light",[c]);return(0,r.jsxs)(d.oT,{template:"react",theme:u,customSetup:{dependencies:s},files:o,onChange:e=>{console.log("debugger",e)},children:[(0,r.jsx)(d.sp,{style:a,children:t}),(0,r.jsx)(d.sp,{children:(0,r.jsx)(d._V,{style:l,readOnly:!0})})]})};t("496286");let s=n.lazy(()=>Promise.all([t.e("386212"),t.e("680310"),t.e("196011"),t.e("939813"),t.e("713076"),t.e("399067"),t.e("319584")]).then(t.bind(t,116681)).then(e=>({default:e.DemoFixedLayout})));t("523705");let l=n.lazy(()=>Promise.all([t.e("386212"),t.e("680310"),t.e("196011"),t.e("737443"),t.e("713076"),t.e("493876"),t.e("120807")]).then(t.bind(t,373596)).then(e=>({default:e.DemoFreeLayout}))),c=n.lazy(()=>Promise.all([t.e("386212"),t.e("680310"),t.e("737443"),t.e("713076"),t.e("493876"),t.e("737080")]).then(t.bind(t,596255)).then(e=>({default:e.DemoFreeLayout}))),u={code:`import {
  EditorRenderer,
  FreeLayoutEditorProvider,
} from '@flowgram.ai/free-layout-editor';

import { NodeAddPanel } from './components/node-add-panel';
import { Tools } from './components/tools'
import { Minimap } from './components/minimap'
import { useEditorProps } from './hooks/use-editor-props'
import '@flowgram.ai/free-layout-editor/index.css';
import './index.css';

export const Editor = () => {
  const editorProps = useEditorProps()
  return (
    <FreeLayoutEditorProvider {...editorProps}>
      <div className="demo-free-container">
        <div className="demo-free-layout">
          <NodeAddPanel />
          <EditorRenderer className="demo-free-editor" />
        </div>
        <Tools />
        <Minimap />
      </div>
    </FreeLayoutEditorProvider>
  )
};
  `,active:!0},p=`import { WorkflowJSON } from '@flowgram.ai/free-layout-editor';

export const initialData: WorkflowJSON = {
  nodes: [
    {
      id: 'start_0',
      type: 'start',
      meta: {
        position: { x: 0, y: 0 },
      },
      data: {
        title: 'Start',
        content: 'Start content'
      },
    },
    {
      id: 'node_0',
      type: 'custom',
      meta: {
        position: { x: 400, y: 0 },
      },
      data: {
        title: 'Custom',
        content: 'Custom node content'
      },
    },
    {
      id: 'end_0',
      type: 'end',
      meta: {
        position: { x: 800, y: 0 },
      },
      data: {
        title: 'End',
        content: 'End content'
      },
    },
  ],
  edges: [
    {
      sourceNodeID: 'start_0',
      targetNodeID: 'node_0',
    },
    {
      sourceNodeID: 'node_0',
      targetNodeID: 'end_0',
    },
  ],
};


`,m=`import React from 'react';

import { WorkflowDragService, useService } from '@flowgram.ai/free-layout-editor';

const cardkeys = ['Node1', 'Node2'];

export const NodeAddPanel: React.FC = props => {
  const startDragSerivce = useService<WorkflowDragService>(WorkflowDragService);

  return (
    <div className="demo-free-sidebar">
      {cardkeys.map(nodeType => (
        <div
          key={nodeType}
          className="demo-free-card"
          onMouseDown={e => startDragSerivce.startDragCard(nodeType, e, {
            data: {
              title: \`New \${nodeType}\`,
              content: 'xxxx'
            }
          })}
        >
          {nodeType}
        </div>
      ))}
    </div>
  );
};
`,f=`import { useMemo } from 'react';

import {
  FreeLayoutProps,
  WorkflowNodeProps,
  WorkflowNodeRenderer,
  Field,
  useNodeRender
} from '@flowgram.ai/free-layout-editor';
import { createMinimapPlugin } from '@flowgram.ai/minimap-plugin';
import { createFreeSnapPlugin } from '@flowgram.ai/free-snap-plugin';

import { initialData } from '../initial-data';
import { nodeRegistries } from '../node-registries'

export const useEditorProps = () => useMemo<FreeLayoutProps>(
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
       * Node registries
       * 节点注册
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
            render: () => <>
                <Field<string> name="title">
                  {({ field }) => <div className="demo-free-node-title">{field.value}</div>}
                </Field>
                <div className="demo-free-node-content">
                  <Field<string> name="content">
                    <input />
                  </Field>
                </div>
              </>
          }
        };
      },
      materials: {
        /**
         * Render Node
         */
        renderDefaultNode: (props: WorkflowNodeProps) => {
          const { form } = useNodeRender()
          return (
            <WorkflowNodeRenderer className="demo-free-node" node={props.node}>
              {form?.render()}
            </WorkflowNodeRenderer>
          )
        },
      },
      /**
       * Content change
       */
      onContentChange(ctx, event) {
        // console.log('Auto Save: ', event, ctx.document.toJSON());
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
      onInit: ctx => {},
      /**
       * Playground render
       */
      onAllLayersRendered(ctx) {
        //  Fitview
        ctx.document.fitView(false);
      },
      /**
       * Playground dispose
       */
      onDispose() {
        console.log('---- Playground Dispose ----');
      },
      plugins: () => [
        /**
         * Minimap plugin
         * 缩略图插件
         */
        createMinimapPlugin({
          disableLayer: true,
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
        /**
         * Snap plugin
         * 自动对齐及辅助线插件
         */
        createFreeSnapPlugin({
          edgeColor: '#00B2B2',
          alignColor: '#00B2B2',
          edgeLineWidth: 1,
          alignLineWidth: 1,
          alignCrossWidth: 8,
        }),
      ]
    }),
    [],
  );

`,g=`import { WorkflowNodeRegistry } from '@flowgram.ai/free-layout-editor';

/**
 * You can customize your own node registry
 * 你可以自定义节点的注册器
 */
export const nodeRegistries: WorkflowNodeRegistry[] = [
  {
    type: 'start',
    meta: {
      isStart: true, // Mark as start
      deleteDisable: true, // The start node cannot be deleted
      copyDisable: true, // The start node cannot be copied
      defaultPorts: [{ type: 'output' }], // Used to define the input and output ports, the start node only has the output port
    },
  },
  {
    type: 'end',
    meta: {
      deleteDisable: true,
      copyDisable: true,
      defaultPorts: [{ type: 'input' }],
    },
  },
  {
    type: 'custom',
    meta: {
    },
    defaultPorts: [{ type: 'output' }, { type: 'input' }], // A normal node has two ports
  },
];

`,y=`import { useEffect, useState } from 'react'
import { usePlaygroundTools, useClientContext } from '@flowgram.ai/free-layout-editor';

export function Tools() {
  const { history } = useClientContext();
  const tools = usePlaygroundTools();
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  useEffect(() => {
    const disposable = history.undoRedoService.onChange(() => {
      setCanUndo(history.canUndo());
      setCanRedo(history.canRedo());
    });
    return () => disposable.dispose();
  }, [history]);

  return <div style={{ position: 'absolute', zIndex: 10, bottom: 16, left: 226, display: 'flex', gap: 8 }}>
    <button onClick={() => tools.zoomin()}>ZoomIn</button>
    <button onClick={() => tools.zoomout()}>ZoomOut</button>
    <button onClick={() => tools.fitView()}>Fitview</button>
    <button onClick={() => tools.autoLayout()}>AutoLayout</button>
    <button onClick={() => history.undo()} disabled={!canUndo}>Undo</button>
    <button onClick={() => history.redo()} disabled={!canRedo}>Redo</button>
    <span>{Math.floor(tools.zoom * 100)}%</span>
  </div>
}
`,b=`import { FlowMinimapService, MinimapRender } from '@flowgram.ai/minimap-plugin';
import { useService } from '@flowgram.ai/free-layout-editor';


export const Minimap = () => {
  const minimapService = useService(FlowMinimapService);
  return (
    <div
      style={{
        position: 'absolute',
        left: 226,
        bottom: 51,
        zIndex: 100,
        width: 182,
      }}
    >
      <MinimapRender
        service={minimapService}
        containerStyles={{
          pointerEvents: 'auto',
          position: 'relative',
          top: 'unset',
          right: 'unset',
          bottom: 'unset',
          left: 'unset',
        }}
        inactiveStyle={{
          opacity: 1,
          scale: 1,
          translateX: 0,
          translateY: 0,
        }}
      />
    </div>
  );
};

`,h=()=>(0,r.jsx)(a,{files:{"index.tsx":u,"use-editor-props.tsx":f,"initial-data.ts":p,"node-registries.ts":g,"node-add-panel.tsx":m,"tools.tsx":y,"minimap.tsx":b},previewStyle:{height:500},editorStyle:{height:500},children:(0,r.jsx)(c,{})}),x=n.lazy(()=>Promise.all([t.e("386212"),t.e("680310"),t.e("196011"),t.e("713076"),t.e("399067"),t.e("339398")]).then(t.bind(t,848553)).then(e=>({default:e.DemoFixedLayout}))),v={code:`import { FixedLayoutEditorProvider, EditorRenderer } from '@flowgram.ai/fixed-layout-editor';

import '@flowgram.ai/fixed-layout-editor/index.css';
import './index.css'

import { useEditorProps } from './use-editor-props';
import { initialData } from './initial-data'
import { nodeRegistries } from './node-registries'
import { Tools } from './tools'
import { Minimap } from './minimap'

export const Editor = () => {
  const editorProps = useEditorProps(initialData, nodeRegistries);
  return (
    <FixedLayoutEditorProvider {...editorProps}>
      <div className="demo-fixed-container">
        <EditorRenderer>{/* add child panel here */}</EditorRenderer>
      </div>
      <Tools />
      <Minimap />
    </FixedLayoutEditorProvider>
  );
}`,active:!0},w=`.demo-fixed-node {
  align-items: flex-start;
  background-color: #fff;
  border: 1px solid rgba(6, 7, 9, 0.15);
  border-radius: 8px;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.04), 0 4px 12px 0 rgba(0, 0, 0, 0.02);
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  width: 360px;
  transition: all 0.3s ease;
}

.demo-fixed-node-title {
  background-color: #93bfe2;
  width: 100%;
  border-radius: 8px 8px 0 0;
  padding: 4px 12px;
}
.demo-fixed-node-content {
  padding: 16px;
  flex-grow: 1;
  width: 100%;
}

.demo-fixed-adder {
  width: 28px;
  height: 18px;
  background: rgb(187, 191, 196);
  display: flex;
  border-radius: 9px;
  justify-content: space-evenly;
  align-items: center;
  color: #fff;
  font-size: 10px;
  font-weight: bold;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      width: 12px;
      height: 12px;
    }
  }
}

.demo-fixed-adder.activated {
  background: #82A7FC
}

.demo-fixed-adder.isHorizontal {
  transform: rotate(90deg);
}


.gedit-playground * {
  box-sizing: border-box;
}`,N=`import { FlowDocumentJSON } from '@flowgram.ai/fixed-layout-editor';

/**
 * 配置流程数据，数据为 blocks 嵌套的格式
 */
export const initialData: FlowDocumentJSON = {
  nodes: [
    // 开始节点
    {
      id: 'start_0',
      type: 'start',
      data: {
        title: 'Start',
        content: 'start content'
      },
      blocks: [],
    },
    // 分支节点
    {
      id: 'condition_0',
      type: 'condition',
      data: {
        title: 'Condition'
      },
      blocks: [
        {
          id: 'branch_0',
          type: 'block',
          data: {
            title: 'Branch 0',
            content: 'branch 1 content'
          },
          blocks: [
            {
              id: 'custom_0',
              type: 'custom',
              data: {
                title: 'Custom',
                content: 'custrom content'
              },
            },
          ],
        },
        {
          id: 'branch_1',
          type: 'block',
          data: {
            title: 'Branch 1',
            content: 'branch 1 content'
          },
          blocks: [],
        },
      ],
    },
    // 结束节点
    {
      id: 'end_0',
      type: 'end',
      data: {
        title: 'End',
        content: 'end content'
      },
    },
  ],
};`,R=`import { FlowNodeRegistry } from '@flowgram.ai/fixed-layout-editor';
import { nanoid } from 'nanoid';

/**
 * 自定义节点注册
 */
export const nodeRegistries: FlowNodeRegistry[] = [
  {
    /**
     * 自定义节点类型
     */
    type: 'condition',
    /**
     * 自定义节点扩展:
     *  - loop: 扩展为循环节点
     *  - start: 扩展为开始节点
     *  - dynamicSplit: 扩展为分支节点
     *  - end: 扩展为结束节点
     *  - tryCatch: 扩展为 tryCatch 节点
     *  - default: 扩展为普通节点 (默认)
     */
    extend: 'dynamicSplit',
    /**
     * 节点配置信息
     */
    meta: {
      // isStart: false, // 是否为开始节点
      // isNodeEnd: false, // 是否为结束节点，结束节点后边无法再添加节点
      // draggable: false, // 是否可拖拽，如开始节点和结束节点无法拖拽
      // selectable: false, // 触发器等开始节点不能被框选
      // deleteDisable: true, // 禁止删除
      // copyDisable: true, // 禁止copy
      // addDisable: true, // 禁止添加
    },
    onAdd() {
      return {
        id: \`condition_\${nanoid(5)}\`,
        type: 'condition',
        data: {
          title: 'Condition',
        },
        blocks: [
          {
            id: nanoid(5),
            type: 'block',
            data: {
              title: 'If_0',
            },
          },
          {
            id: nanoid(5),
            type: 'block',
            data: {
              title: 'If_1',
            },
          },
        ],
      };
    },
  },
  {
    type: 'custom',
    meta: {},
    onAdd() {
      return {
        id: \`custom_\${nanoid(5)}\`,
        type: 'custom',
        data: {
          title: 'Custom',
          content: 'this is custom content'
        }
      }
    }
  }
];`,C=`import { useMemo } from 'react';

import { defaultFixedSemiMaterials } from '@flowgram.ai/fixed-semi-materials';
import { createMinimapPlugin } from '@flowgram.ai/minimap-plugin';
import {
  type FixedLayoutProps,
  FlowDocumentJSON,
  FlowNodeRegistry,
  FlowTextKey,
  Field,
  FlowRendererKey,
} from '@flowgram.ai/fixed-layout-editor';

import { BaseNode } from './base-node'
import { BranchAdder } from './branch-adder'
import { NodeAdder } from '../components/node-adder';

/** semi materials */

export function useEditorProps(
  initialData: FlowDocumentJSON, // 初始化数据
  nodeRegistries: FlowNodeRegistry[], // 节点定义
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
            render: () => <>
              <Field<string> name="title">
                {({ field }) => <div className="demo-fixed-node-title">{field.value}</div>}
              </Field>
              <div className="demo-fixed-node-content">
                <Field<string> name="content">
                  <input />
                </Field>
              </div>
            </>
          }
        };
      },
      /**
       * Materials, components can be customized based on the key
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
          // console.log('auto save: ', ctx.document.toJSON(), opt);
        },
      },
      /**
       * 画布初始化
       */
      onInit: ctx => {
        /**
         * Data can also be dynamically loaded via fromJSON
         * 也可以通过 fromJSON 动态加载数据
         */
        // ctx.document.fromJSON(initialData)
        console.log('---- Playground Init ----');
      },
      /**
       * 画布销毁
       */
      onDispose: () => {
        console.log('---- Playground Dispose ----');
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
    [],
  );
}
`,k=`import { FlowNodeEntity, useNodeRender } from '@flowgram.ai/fixed-layout-editor';

export const BaseNode = ({ node }: { node: FlowNodeEntity }) => {
  /**
   * Provides methods related to node rendering
   * 提供节点渲染相关的方法
   */
  const nodeRender = useNodeRender();
  /**
   * It can only be used when nodeEngine is enabled
   * 只有在节点引擎开启时候才能使用表单
   */
  const form = nodeRender.form;

  return (
    <div
      className="demo-fixed-node"
      onMouseEnter={nodeRender.onMouseEnter}
      onMouseLeave={nodeRender.onMouseLeave}
      onMouseDown={e => {
        // trigger drag node
        nodeRender.startDrag(e);
        e.stopPropagation();
      }}
      style={{
        ...(nodeRender.isBlockOrderIcon || nodeRender.isBlockIcon ? { width: 260 } : {}),
      }}
    >
      {form?.render()}
    </div>
  );
};
`,D=`import { type FlowNodeEntity, useClientContext } from '@flowgram.ai/fixed-layout-editor';
import { IconPlus } from '@douyinfe/semi-icons';
import { nanoid } from 'nanoid';


interface PropsType {
  activated?: boolean;
  node: FlowNodeEntity;
}


export function BranchAdder(props: PropsType) {
  const { activated, node } = props;
  const nodeData = node.firstChild!.renderData;
  const ctx = useClientContext();
  const { operation, playground } = ctx;
  const { isVertical } = node;

  function addBranch() {
    const block = operation.addBlock(node, {
      id: \`branch_\${nanoid(5)}\`,
      type: 'block',
      data: {
        title: 'New Branch',
        content: ''
      }
    });

    setTimeout(() => {
      playground.scrollToView({
        bounds: block.bounds,
        scrollToCenter: true,
      });
    }, 10);
  }
  if (playground.config.readonlyOrDisabled) return null;

  const className = [
    'demo-fixed-adder',
    isVertical ? '' : 'isHorizontal',
    activated ? 'activated' : ''
  ].join(' ');

  return (
    <div
      className={className}
      onMouseEnter={() => nodeData?.toggleMouseEnter()}
      onMouseLeave={() => nodeData?.toggleMouseLeave()}
    >
      <div
        onClick={() => {
          addBranch();
        }}
        aria-hidden="true"
        style={{ flexGrow: 1, textAlign: 'center' }}
      >
        <IconPlus />
      </div>
    </div>
  );
}
`,S=`import { FlowMinimapService, MinimapRender } from '@flowgram.ai/minimap-plugin';
import { useService } from '@flowgram.ai/fixed-layout-editor';


export const Minimap = () => {
  const minimapService = useService(FlowMinimapService);
  return (
    <div
      style={{
        position: 'absolute',
        left: 16,
        bottom: 51,
        zIndex: 100,
        width: 182,
      }}
    >
      <MinimapRender
        service={minimapService}
        containerStyles={{
          pointerEvents: 'auto',
          position: 'relative',
          top: 'unset',
          right: 'unset',
          bottom: 'unset',
          left: 'unset',
        }}
        inactiveStyle={{
          opacity: 1,
          scale: 1,
          translateX: 0,
          translateY: 0,
        }}
      />
    </div>
  );
};
`,P=`import { FlowNodeEntity, FlowOperationService, useClientContext, usePlayground, useService } from "@flowgram.ai/fixed-layout-editor"

import { Dropdown } from '@douyinfe/semi-ui'

import { IconPlusCircle } from "@douyinfe/semi-icons";
import { nodeRegistries } from '../node-registries';

export const NodeAdder = (props: {
  from: FlowNodeEntity;
  to?: FlowNodeEntity;
  hoverActivated: boolean;
}) => {
  const { from, hoverActivated } = props;
  const playground = usePlayground();
  const context = useClientContext();
  const flowOperationService = useService(FlowOperationService) as FlowOperationService;

  const add = (addProps: any) => {
    const blocks = addProps.blocks ? addProps.blocks : undefined;
    const block = flowOperationService.addFromNode(from, {
      ...addProps,
      blocks,
    });
    setTimeout(() => {
      playground.scrollToView({
        bounds: block.bounds,
        scrollToCenter: true,
      });
    }, 10);
  };

  if (playground.config.readonlyOrDisabled) return null;

  return (
    <Dropdown
      render={
        <Dropdown.Menu>
          {nodeRegistries.map(registry => <Dropdown.Item onClick={() => {
            const props = registry?.onAdd(context, from);
            add(props);
          }}>{registry.type}</Dropdown.Item>)}
        </Dropdown.Menu>
      }
    >
      <div
        style={{
          width: hoverActivated ? 15 : 6,
          height: hoverActivated ? 15 : 6,
          backgroundColor: 'rgb(143, 149, 158)',
          color: '#fff',
          borderRadius: '50%',
          cursor: 'pointer'
        }}
      >
        {hoverActivated ?
          <IconPlusCircle
            style={{
              color: '#3370ff',
              backgroundColor: '#fff',
              borderRadius: 15
            }}
          /> : null
        }
      </div>
    </Dropdown>
  );
}
`,F=`import { useEffect, useState } from 'react'
import { usePlaygroundTools, useClientContext } from '@flowgram.ai/fixed-layout-editor';

export function Tools() {
  const { history } = useClientContext();
  const tools = usePlaygroundTools();
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  useEffect(() => {
    const disposable = history.undoRedoService.onChange(() => {
      setCanUndo(history.canUndo());
      setCanRedo(history.canRedo());
    });
    return () => disposable.dispose();
  }, [history]);

  return <div style={{ position: 'absolute', zIndex: 10, bottom: 16, left: 16, display: 'flex', gap: 8 }}>
    <button onClick={() => tools.zoomin()}>ZoomIn</button>
    <button onClick={() => tools.zoomout()}>ZoomOut</button>
    <button onClick={() => tools.fitView()}>Fitview</button>
    <button onClick={() => tools.changeLayout()}>ChangeLayout</button>
    <button onClick={() => history.undo()} disabled={!canUndo}>Undo</button>
    <button onClick={() => history.redo()} disabled={!canRedo}>Redo</button>
    <span>{Math.floor(tools.zoom * 100)}%</span>
  </div>
}
`,E=()=>(0,r.jsx)(a,{files:{"App.js":`import React from 'react';
      import { Editor } from './index.tsx';
      const App = () => {
        return <Editor />
      }
        export default App;`,"index.tsx":v,"index.css":w,"initial-data.ts":N,"node-registries.ts":R,"use-editor-props.tsx":C,"base-node.tsx":k,"branch-adder.tsx":D,"minimap.tsx":S,"node-adder.tsx":P,"tools.tsx":F},previewStyle:{height:500},editorStyle:{height:500},children:(0,r.jsx)(x,{})})}}]);