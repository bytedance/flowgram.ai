# 基础用法

import { FreeLayoutSimplePreview } from '../../../../components';

<FreeLayoutSimplePreview />

## 功能介绍

Free Layout 是 Flowgram.ai 提供的自由布局编辑器组件，允许用户创建和编辑流程图、工作流和各种节点连接图表。核心功能包括：

* 节点自由拖拽与定位
* 节点连接与边缘管理
* 可配置的节点注册与自定义渲染
* 内置撤销/重做历史记录
* 支持插件扩展（如缩略图、自动对齐等）

## 从零构建自由布局编辑器

本节将带你从零开始构建一个自由布局编辑器应用，完整演示如何使用 @flowgram.ai/free-layout-editor 包构建一个可交互的流程编辑器。

### 1. 环境准备

首先，我们需要创建一个新的项目：

```bash
# 使用脚手架快速创建项目
npx @flowgram.ai/create-app@latest free-layout-simple

# 进入项目目录
cd free-layout-simple

# 安装依赖
npm install
```

### 2. 项目结构

创建完成后，项目结构如下：

```
free-layout-simple/
├── src/
│   ├── components/            # 组件目录
│   │   ├── node-add-panel.tsx # 节点添加面板
│   │   ├── tools.tsx          # 工具栏组件
│   │   └── minimap.tsx        # 缩略图组件
│   ├── hooks/
│   │   └── use-editor-props.tsx # 编辑器配置
│   ├── initial-data.ts        # 初始数据定义
│   ├── node-registries.ts     # 节点类型注册
│   ├── editor.tsx             # 编辑器主组件
│   ├── app.tsx                # 应用入口
│   ├── index.tsx              # 渲染入口
│   └── index.css              # 样式文件
├── package.json
└── ...其他配置文件
```

### 3. 开发流程

#### 步骤一：定义初始数据

首先，我们需要定义画布的初始数据结构，包括节点和连线：

```tsx
// src/initial-data.ts
import { WorkflowJSON } from '@flowgram.ai/free-layout-editor';

export const initialData: WorkflowJSON = {
  nodes: [
    {
      id: 'start_0',
      type: 'start',
      meta: {
        position: { x: 0, y: 0 },
      },
      data: {
        title: '开始节点',
        content: '这是开始节点'
      },
    },
    {
      id: 'node_0',
      type: 'custom',
      meta: {
        position: { x: 400, y: 0 },
      },
      data: {
        title: '自定义节点',
        content: '这是自定义节点'
      },
    },
    {
      id: 'end_0',
      type: 'end',
      meta: {
        position: { x: 800, y: 0 },
      },
      data: {
        title: '结束节点',
        content: '这是结束节点'
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
```

#### 步骤二：注册节点类型

接下来，我们需要定义不同类型节点的行为和外观：

```tsx
// src/node-registries.ts
import { WorkflowNodeRegistry } from '@flowgram.ai/free-layout-editor';

/**
 * 你可以自定义节点的注册器
 */
export const nodeRegistries: WorkflowNodeRegistry[] = [
  {
    type: 'start',
    meta: {
      isStart: true, // 开始节点标记
      deleteDisable: true, // 开始节点不能被删除
      copyDisable: true, // 开始节点不能被 copy
      defaultPorts: [{ type: 'output' }], // 定义 input 和 output 端口，开始节点只有 output 端口
    },
  },
  {
    type: 'end',
    meta: {
      deleteDisable: true,
      copyDisable: true,
      defaultPorts: [{ type: 'input' }], // 结束节点只有 input 端口
    },
  },
  {
    type: 'custom',
    meta: {},
    defaultPorts: [{ type: 'output' }, { type: 'input' }], // 普通节点有两个端口
  },
];
```

#### 步骤三：创建编辑器配置

使用 React hook 封装编辑器配置：

```tsx
// src/hooks/use-editor-props.tsx
import { useMemo } from 'react';
import {
  FreeLayoutProps,
  WorkflowNodeProps,
  WorkflowNodeRenderer,
  Field,
  useNodeRender,
} from '@flowgram.ai/free-layout-editor';
import { createMinimapPlugin } from '@flowgram.ai/minimap-plugin';
import { createFreeSnapPlugin } from '@flowgram.ai/free-snap-plugin';

import { nodeRegistries } from '../node-registries';
import { initialData } from '../initial-data';

export const useEditorProps = () =>
  useMemo<FreeLayoutProps>(
    () => ({
      // 启用背景网格
      background: true,
      // 非只读模式
      readonly: false,
      // 初始数据
      initialData,
      // 节点类型注册
      nodeRegistries,
      // 默认节点注册
      getNodeDefaultRegistry(type) {
        return {
          type,
          meta: {
            defaultExpanded: true,
          },
          formMeta: {
            // 节点表单渲染
            render: () => (
              <>
                <Field<string> name="title">
                  {({ field }) => <div className="demo-free-node-title">{field.value}</div>}
                </Field>
                <div className="demo-free-node-content">
                  <Field<string> name="content">
                    <input />
                  </Field>
                </div>
              </>
            ),
          },
        };
      },
      // 节点渲染
      materials: {
        renderDefaultNode: (props: WorkflowNodeProps) => {
          const { form } = useNodeRender();
          return (
            <WorkflowNodeRenderer className="demo-free-node" node={props.node}>
              {form?.render()}
            </WorkflowNodeRenderer>
          );
        },
      },
      // 内容变更回调
      onContentChange(ctx, event) {
        console.log('数据变更: ', event, ctx.document.toJSON());
      },
      // 启用节点表单引擎
      nodeEngine: {
        enable: true,
      },
      // 启用历史记录
      history: {
        enable: true,
        enableChangeNode: true, // 监听节点引擎数据变化
      },
      // 初始化回调
      onInit: (ctx) => {},
      // 渲染完成回调
      onAllLayersRendered(ctx) {
        ctx.document.fitView(false); // 适应视图
      },
      // 销毁回调
      onDispose() {
        console.log('编辑器已销毁');
      },
      // 插件配置
      plugins: () => [
        // 缩略图插件
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
        }),
        // 自动对齐插件
        createFreeSnapPlugin({
          edgeColor: '#00B2B2',
          alignColor: '#00B2B2',
          edgeLineWidth: 1,
          alignLineWidth: 1,
          alignCrossWidth: 8,
        }),
      ],
    }),
    []
  );
```

#### 步骤四：创建节点添加面板

```tsx
// src/components/node-add-panel.tsx
import React from 'react';
import { WorkflowDragService, useService } from '@flowgram.ai/free-layout-editor';

const nodeTypes = ['自定义节点1', '自定义节点2'];

export const NodeAddPanel: React.FC = () => {
  const dragService = useService<WorkflowDragService>(WorkflowDragService);

  return (
    <div className="demo-free-sidebar">
      {nodeTypes.map(nodeType => (
        <div
          key={nodeType}
          className="demo-free-card"
          onMouseDown={e => dragService.startDragCard(nodeType, e, {
            data: {
              title: nodeType,
              content: '拖拽创建的节点'
            }
          })}
        >
          {nodeType}
        </div>
      ))}
    </div>
  );
};
```

#### 步骤五：创建工具栏和缩略图

```tsx
// src/components/tools.tsx
import React from 'react';
import { useEffect, useState } from 'react';
import { usePlaygroundTools, useClientContext } from '@flowgram.ai/free-layout-editor';

export const Tools: React.FC = () => {
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

  return (
    <div
      style={{ position: 'absolute', zIndex: 10, bottom: 16, left: 226, display: 'flex', gap: 8 }}
    >
      <button onClick={() => tools.zoomin()}>ZoomIn</button>
      <button onClick={() => tools.zoomout()}>ZoomOut</button>
      <button onClick={() => tools.fitView()}>Fitview</button>
      <button onClick={() => tools.autoLayout()}>AutoLayout</button>
      <button onClick={() => history.undo()} disabled={!canUndo}>
        Undo
      </button>
      <button onClick={() => history.redo()} disabled={!canRedo}>
        Redo
      </button>
      <span>{Math.floor(tools.zoom * 100)}%</span>
    </div>
  );
};

// src/components/minimap.tsx
import { MinimapRender } from '@flowgram.ai/minimap-plugin';

export const Minimap = () => {
  return (
    <div
      style={{
        position: 'absolute',
        left: 226,
        bottom: 51,
        zIndex: 100,
        width: 198,
      }}
    >
      <MinimapRender
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
```

#### 步骤六：组装编辑器主组件

```tsx
// src/editor.tsx
import { EditorRenderer, FreeLayoutEditorProvider } from '@flowgram.ai/free-layout-editor';

import { useEditorProps } from './hooks/use-editor-props';
import { Tools } from './components/tools';
import { NodeAddPanel } from './components/node-add-panel';
import { Minimap } from './components/minimap';
import '@flowgram.ai/free-layout-editor/index.css';
import './index.css';

export const Editor = () => {
  const editorProps = useEditorProps();
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
  );
};
```

#### 步骤七：创建应用入口

```tsx
// src/app.tsx
import React from 'react';
import ReactDOM from 'react-dom';

import { Editor } from './editor';

ReactDOM.render(<Editor />, document.getElementById('root'))
```

#### 步骤八：添加样式

```css
/* src/index.css */
.demo-free-node {
    display: flex;
    min-width: 300px;
    min-height: 100px;
    flex-direction: column;
    align-items: flex-start;
    box-sizing: border-box;
    border-radius: 8px;
    border: 1px solid var(--light-usage-border-color-border, rgba(28, 31, 35, 0.08));
    background: #fff;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
}

.demo-free-node-title {
    background-color: #93bfe2;
    width: 100%;
    border-radius: 8px 8px 0 0;
    padding: 4px 12px;
}
.demo-free-node-content {
    padding: 4px 12px;
    flex-grow: 1;
    width: 100%;
}
.demo-free-node::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    background-color: white;
    border-radius: 7px;
}

.demo-free-node:hover:before {
    -webkit-filter: drop-shadow(0 0 1px rgba(0, 0, 0, 0.3)) drop-shadow(0 4px 14px rgba(0, 0, 0, 0.1));
    filter: drop-shadow(0 0 1px rgba(0, 0, 0, 0.3)) drop-shadow(0 4px 14px rgba(0, 0, 0, 0.1));
}

.demo-free-node.activated:before,
.demo-free-node.selected:before {
    outline: 2px solid var(--light-usage-primary-color-primary, #4d53e8);
    -webkit-filter: drop-shadow(0 0 1px rgba(0, 0, 0, 0.3)) drop-shadow(0 4px 14px rgba(0, 0, 0, 0.1));
    filter: drop-shadow(0 0 1px rgba(0, 0, 0, 0.3)) drop-shadow(0 4px 14px rgba(0, 0, 0, 0.1));
}

.demo-free-sidebar {
    height: 100%;
    overflow-y: auto;
    padding: 12px 16px 0;
    box-sizing: border-box;
    background: #f7f7fa;
    border-right: 1px solid rgba(29, 28, 35, 0.08);
}

.demo-free-right-top-panel {
    position: fixed;
    right: 10px;
    top: 70px;
    width: 300px;
    z-index: 999;
}

.demo-free-card {
    width: 140px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 6px 8px 0 rgba(28, 31, 35, 0.03);
    cursor: -webkit-grab;
    cursor: grab;
    line-height: 16px;
    margin-bottom: 12px;
    overflow: hidden;
    padding: 16px;
    position: relative;
    color: black;
}

.demo-free-layout {
    display: flex;
    flex-direction: row;
    flex-grow: 1;
}

.demo-free-editor {
    flex-grow: 1;
    position: relative;
    height: 100%;
}

.demo-free-container {
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
}

```

### 4. 运行项目

完成上述步骤后，你可以运行项目查看效果：

```bash
npm run dev
```

项目将在本地启动，通常访问 http://localhost:3000 即可看到效果。

## 核心概念

### 1. 数据结构

Free Layout 使用标准化的数据结构来描述节点和连接：

```tsx
// 工作流数据结构
const initialData: WorkflowJSON = {
  // 节点定义
  nodes: [
    {
      id: 'start_0',        // 节点唯一ID
      type: 'start',        // 节点类型（对应 nodeRegistries 中的注册）
      meta: {
        position: { x: 0, y: 0 }, // 节点位置
      },
      data: {
        title: 'Start',     // 节点数据（可自定义）
        content: 'Start content'
      },
    },
    // 更多节点...
  ],
  // 连线定义
  edges: [
    {
      sourceNodeID: 'start_0', // 源节点ID
      targetNodeID: 'node_0',  // 目标节点ID
    },
    // 更多连线...
  ],
};
```

### 2. 节点注册

使用 `nodeRegistries` 定义不同类型节点的行为和外观：

```tsx
// 节点注册
import { WorkflowNodeRegistry } from '@flowgram.ai/free-layout-editor';

export const nodeRegistries: WorkflowNodeRegistry[] = [
  // 开始节点定义
  {
    type: 'start',
    meta: {
      isStart: true, // Mark as start
      deleteDisable: true, // The start node cannot be deleted
      copyDisable: true, // The start node cannot be copied
      defaultPorts: [{ type: 'output' }], // Used to define the input and output ports, the start node only has the output port
    },
  },
  // 更多节点类型...
];
```

### 3. 编辑器组件

```tsx
// 核心编辑器容器与渲染器
import {
  FreeLayoutEditorProvider,
  EditorRenderer
} from '@flowgram.ai/free-layout-editor';

// 编辑器配置示例
const editorProps = {
  background: true,       // 启用背景网格
  readonly: false,        // 非只读模式，允许编辑
  initialData: {...},     // 初始化数据：节点和边的定义
  nodeRegistries: [...],  // 节点类型注册
  nodeEngine: {
    enable: true,         // 启用节点表单引擎
  },
  history: {
    enable: true,         // 启用历史记录
    enableChangeNode: true, // 监听节点数据变化
  }
};

// 完整编辑器渲染
<FreeLayoutEditorProvider {...editorProps}>
  <div className="container">
    <NodeAddPanel />              {/* 节点添加面板 */}
    <EditorRenderer />            {/* 核心编辑器渲染区域 */}
    <Tools />                     {/* 工具栏 */}
    <Minimap />                   {/* 缩略图 */}
  </div>
</FreeLayoutEditorProvider>
```

### 4. 核心钩子函数

在组件中可以使用多种钩子函数获取和操作编辑器：

```tsx
// 获取拖拽服务
const dragService = useService<WorkflowDragService>(WorkflowDragService);
// 开始拖拽节点
dragService.startDragCard('nodeType', event, { data: {...} });

// 获取编辑器上下文
const { document, playground } = useClientContext();
// 操作画布
document.fitView();                 // 适应视图
playground.config.zoomin();               // 缩放画布
document.fromJSON(newData);         // 更新数据
```

### 5. 插件扩展

Free Layout 支持通过插件机制扩展功能：

```tsx
plugins: () => [
  // 缩略图插件
  createMinimapPlugin({
    canvasStyle: {
      canvasWidth: 180,
      canvasHeight: 100,
      canvasBackground: 'rgba(245, 245, 245, 1)',
    }
  }),
  // 自动对齐插件
  createFreeSnapPlugin({
    edgeColor: '#00B2B2',     // 对齐线颜色
    alignColor: '#00B2B2',    // 辅助线颜色
    edgeLineWidth: 1,         // 线宽
  }),
],
```

## 安装

```bash
npx @flowgram.ai/create-app@latest free-layout-simple
```

## 源码

https://github.com/bytedance/flowgram.ai/tree/main/apps/demo-free-layout-simple
