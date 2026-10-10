# Basic Usage

import { FreeLayoutSimplePreview } from '../../../../components';

<FreeLayoutSimplePreview />

## Feature Overview

Free Layout is a layout editor component provided by Flowgram.ai that allows users to create and edit flowcharts, workflows, and various node connection diagrams. Core features include:

* Free drag-and-drop node positioning
* Node connection and edge management
* Configurable node registration and custom rendering
* Built-in undo/redo history
* Plugin extension support (e.g., minimap, auto-alignment)

## Building Free Layout Editor from Scratch

This section will guide you through building a free layout editor application from scratch, demonstrating how to use the @flowgram.ai/free-layout-editor package to build an interactive workflow editor.

### 1. Environment Setup

First, we need to create a new project:

```bash
# Use the scaffolding tool to quickly create a project
npx @flowgram.ai/create-app@latest free-layout-simple

# Enter the project directory
cd free-layout-simple

# Install dependencies
npm install
```

### 2. Project Structure

After creation, the project structure is as follows:

```
free-layout-simple/
├── src/
│   ├── components/            # Components directory
│   │   ├── node-add-panel.tsx # Node addition panel
│   │   ├── tools.tsx          # Toolbar component
│   │   └── minimap.tsx        # Minimap component
│   ├── hooks/
│   │   └── use-editor-props.tsx # Editor configuration
│   ├── initial-data.ts        # Initial data definition
│   ├── node-registries.ts     # Node type registration
│   ├── editor.tsx             # Editor main component
│   ├── app.tsx                # Application entry
│   ├── index.tsx              # Render entry
│   └── index.css              # Style file
├── package.json
└── ...other configuration files
```

### 3. Development Process

#### Step 1: Define Initial Data

First, we need to define the canvas's initial data structure, including nodes and connections:

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
        title: 'Start Node',
        content: 'This is a start node'
      },
    },
    {
      id: 'node_0',
      type: 'custom',
      meta: {
        position: { x: 400, y: 0 },
      },
      data: {
        title: 'Custom Node',
        content: 'This is a custom node'
      },
    },
    {
      id: 'end_0',
      type: 'end',
      meta: {
        position: { x: 800, y: 0 },
      },
      data: {
        title: 'End Node',
        content: 'This is an end node'
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

#### Step 2: Register Node Types

Next, we need to define the behavior and appearance of different types of nodes:

```tsx
// src/node-registries.ts
import { WorkflowNodeRegistry } from '@flowgram.ai/free-layout-editor';

/**
 * You can customize your own node registry
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
    meta: {},
    defaultPorts: [{ type: 'output' }, { type: 'input' }], // A normal node has two ports
  },
];
```

#### Step 3: Create Editor Configuration

Use React hook to encapsulate editor configuration:

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
      // Enable background grid
      background: true,
      // Non-readonly mode
      readonly: false,
      // Initial data
      initialData,
      // Node type registration
      nodeRegistries,
      // Default node registration
      getNodeDefaultRegistry(type) {
        return {
          type,
          meta: {
            defaultExpanded: true,
          },
          formMeta: {
            // Node form rendering
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
      // Node rendering
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
      // Content change callback
      onContentChange(ctx, event) {
        console.log('Data Change: ', event, ctx.document.toJSON());
      },
      // Enable node form engine
      nodeEngine: {
        enable: true,
      },
      // Enable history record
      history: {
        enable: true,
        enableChangeNode: true, // Listen for node engine data changes
      },
      // Initialization callback
      onInit: (ctx) => {},
      // Render completion callback
      onAllLayersRendered(ctx) {
        ctx.document.fitView(false); // Fit view
      },
      // Destruction callback
      onDispose() {
        console.log('Editor has been destroyed');
      },
      // Plugin configuration
      plugins: () => [
        // Minimap plugin
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
        // Auto-alignment plugin
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

#### Step 4: Create Node Addition Panel

```tsx
// src/components/node-add-panel.tsx
import React from 'react';
import { WorkflowDragService, useService } from '@flowgram.ai/free-layout-editor';

const nodeTypes = ['Custom Node 1', 'Custom Node 2'];

export const NodeAddPanel: React.FC = () => {
  const dragService = useService<WorkflowDragService>(WorkflowDragService);

  return (
    <div className="demo-free-sidebar">
      {nodeTypes.map(nodeType => (
        <div
          key={nodeType}
          className="demo-free-card"
          onMouseDown={e => dragService.startDragCard('custom', e, {
            data: {
              title: nodeType,
              content: 'Node created by dragging'
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

#### Step 5: Create Toolbar and Minimap

```tsx
import React from 'react';
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

#### Step 6: Assemble Editor Main Component

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

#### Step 7: Create Application Entry

```tsx
// src/app.tsx
import React from 'react';
import ReactDOM from 'react-dom';

import { Editor } from './editor';

ReactDOM.render(<Editor />, document.getElementById('root'))
```

#### Step 8: Add Styles

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

### 4. Run the Project

After completing the above steps, you can run the project to see the effect:

```bash
npm run dev
```

The project will start locally, usually accessible at http://localhost:3000.

## Core Concepts

### 1. Data Structure

Free Layout uses a standardized data structure to describe nodes and connections:

```tsx
// Workflow data structure
const initialData: WorkflowJSON = {
  // Node definitions
  nodes: [
    {
      id: 'start_0',        // Unique node ID
      type: 'start',        // Node type (corresponding to registration in nodeRegistries)
      meta: {
        position: { x: 0, y: 0 }, // Node position
      },
      data: {
        title: 'Start',     // Node data (customizable)
        content: 'Start content'
      },
    },
    // More nodes...
  ],
  // Edge definitions
  edges: [
    {
      sourceNodeID: 'start_0', // Source node ID
      targetNodeID: 'node_0',  // Target node ID
    },
    // More edges...
  ],
};
```

### 2. Node Registration

Use `nodeRegistries` to define the behavior and appearance of different types of nodes:

```tsx
// Node registration
import { WorkflowNodeRegistry } from '@flowgram.ai/free-layout-editor';

export const nodeRegistries: WorkflowNodeRegistry[] = [
  // Start node definition
  {
    type: 'start',
    meta: {
      isStart: true, // Mark as start
      deleteDisable: true, // The start node cannot be deleted
      copyDisable: true, // The start node cannot be copied
      defaultPorts: [{ type: 'output' }], // Used to define the input and output ports, the start node only has the output port
    },
  },
  // More node types...
];
```

### 3. Editor Components

```tsx
// Core editor container and renderer
import {
  FreeLayoutEditorProvider,
  EditorRenderer
} from '@flowgram.ai/free-layout-editor';

// Editor configuration example
const editorProps = {
  background: true,       // Enable background grid
  readonly: false,        // Non-readonly mode, allow editing
  initialData: {...},     // Initial data: definition of nodes and edges
  nodeRegistries: [...],  // Node type registration
  nodeEngine: {
    enable: true,         // Enable node form engine
  },
  history: {
    enable: true,         // Enable history record
    enableChangeNode: true, // Listen for node data changes
  }
};

// Complete editor rendering
<FreeLayoutEditorProvider {...editorProps}>
  <div className="container">
    <NodeAddPanel />              {/* Node addition panel */}
    <EditorRenderer />            {/* Core editor rendering area */}
    <Tools />                     {/* Toolbar */}
    <Minimap />                   {/* Minimap */}
  </div>
</FreeLayoutEditorProvider>
```

### 4. Core Hook Functions

In components, you can use various hook functions to get and manipulate the editor:

```tsx
// Get drag service
const dragService = useService<WorkflowDragService>(WorkflowDragService);
// Start dragging node
dragService.startDragCard('nodeType', event, { data: {...} });

// Get editor context
const { document, playground } = useClientContext();
// Manipulate canvas
document.fitView();                 // Fit view
playground.config.zoomin();               // Zoom canvas
document.fromJSON(newData);         // Update data
```

### 5. Plugin Extensions

Free Layout supports extending functionality through the plugin mechanism:

```tsx
plugins: () => [
  // Minimap plugin
  createMinimapPlugin({
    canvasStyle: {
      canvasWidth: 180,
      canvasHeight: 100,
      canvasBackground: 'rgba(245, 245, 245, 1)',
    }
  }),
  // Auto-alignment plugin
  createFreeSnapPlugin({
    edgeColor: '#00B2B2',     // Alignment line color
    alignColor: '#00B2B2',    // Guide line color
    edgeLineWidth: 1,         // Line width
  }),
],
```

## Installation

```bash
npx @flowgram.ai/create-app@latest free-layout-simple
```

## Source Code

https://github.com/bytedance/flowgram.ai/tree/main/apps/demo-free-layout-simple
