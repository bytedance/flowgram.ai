# FlowGram.AI - Demo Free Layout

Best-practice demo for free layout

## Installation

```shell
npx @flowgram.ai/create-app@latest free-layout
```

## Project Overview

### Core Tech Stack
- **Frontend framework**: React 18 + TypeScript
- **Build tool**: Rsbuild (a modern build tool based on Rspack)
- **Styling**: Less + Styled Components + CSS Variables
- **UI library**: Semi Design (@douyinfe/semi-ui)
- **State management**: Flowgram’s in-house editor framework
- **Dependency injection**: Inversify

### Core Dependencies

- **@flowgram.ai/free-layout-editor**: Core dependency for the free layout editor
- **@flowgram.ai/free-snap-plugin**: Auto-alignment and guide-lines plugin
- **@flowgram.ai/free-lines-plugin**: Connection line rendering plugin
- **@flowgram.ai/free-node-panel-plugin**: Node add-panel rendering plugin
- **@flowgram.ai/minimap-plugin**: Minimap plugin
- **@flowgram.ai/free-container-plugin**: Sub-canvas plugin
- **@flowgram.ai/free-group-plugin**: Grouping plugin
- **@flowgram.ai/form-materials**: Form materials
- **@flowgram.ai/runtime-interface**: Runtime interfaces
- **@flowgram.ai/runtime-js**: JS runtime module
- **@flowgram.ai/panel-manager-plugin**:  Sidebar panel management

## Code Guide

### Directory Structure
```
src/
├── app.tsx                  # Application entry file
├── editor.tsx               # Main editor component
├── initial-data.ts          # Initial data configuration
├── assets/                  # Static assets
├── components/              # Component library
│   ├── index.ts
│   ├── add-node/            # Add-node component
│   ├── base-node/           # Base node components
│   ├── comment/             # Comment components
│   ├── group/               # Group components
│   ├── line-add-button/     # Connection add button
│   ├── node-menu/           # Node menu
│   ├── node-panel/          # Node add panel
│   ├── selector-box-popover/ # Selection box popover
│   ├── sidebar/             # Sidebar
│   ├── testrun/             # Test-run module
│   │   ├── hooks/           # Test-run hooks
│   │   ├── node-status-bar/ # Node status bar
│   │   ├── testrun-button/  # Test-run button
│   │   ├── testrun-form/    # Test-run form
│   │   ├── testrun-json-input/ # JSON input component
│   │   └── testrun-panel/   # Test-run panel
│   └── tools/               # Utility components
├── context/                 # React Context
│   ├── node-render-context.ts # Current rendering node context
│   ├── sidebar-context        # Sidebar context
├── form-components/         # Form component library
│   ├── form-content/        # Form content
│   ├── form-header/         # Form header
│   ├── form-inputs/         # Form inputs
│   └── form-item/           # Form item
│   └── feedback.tsx         # Validation error rendering
├── hooks/
│   ├── index.ts
│   ├── use-editor-props.tsx # Editor props hook
│   ├── use-is-sidebar.ts    # Sidebar state hook
│   ├── use-node-render-context.ts # Node render context hook
│   └── use-port-click.ts    # Port click hook
├── nodes/                    # Node definitions
│   ├── index.ts
│   ├── constants.ts         # Node constants
│   ├── default-form-meta.ts # Default form metadata
│   ├── block-end/           # Block end node
│   ├── block-start/         # Block start node
│   ├── break/               # Break node
│   ├── code/                # Code node
│   ├── comment/             # Comment node
│   ├── condition/           # Condition node
│   ├── continue/            # Continue node
│   ├── end/                 # End node
│   ├── group/               # Group node
│   ├── http/                # HTTP node
│   ├── llm/                 # LLM node
│   ├── loop/                # Loop node
│   ├── start/               # Start node
│   └── variable/            # Variable node
├── plugins/                 # Plugin system
│   ├── index.ts
│   ├── context-menu-plugin/ # Right-click context menu plugin
│   ├── runtime-plugin/      # Runtime plugin
│   │   ├── client/          # Client
│   │   │   ├── browser-client/ # Browser client
│   │   │   └── server-client/  # Server client
│   │   └── runtime-service/ # Runtime service
│   └── variable-panel-plugin/ # Variable panel plugin
│       └── components/      # Variable panel components
├── services/                 # Service layer
│   ├── index.ts
│   └── custom-service.ts    # Custom service
├── shortcuts/                # Shortcuts system
│   ├── index.ts
│   ├── constants.ts         # Shortcut constants
│   ├── shortcuts.ts         # Shortcut definitions
│   ├── type.ts              # Type definitions
│   ├── collapse/            # Collapse shortcut
│   ├── copy/                # Copy shortcut
│   ├── delete/              # Delete shortcut
│   ├── expand/              # Expand shortcut
│   ├── paste/               # Paste shortcut
│   ├── select-all/          # Select-all shortcut
│   ├── zoom-in/             # Zoom-in shortcut
│   └── zoom-out/            # Zoom-out shortcut
├── styles/                   # Styles
├── typings/                  # Type definitions
│   ├── index.ts
│   ├── json-schema.ts       # JSON Schema types
│   └── node.ts              # Node type definitions
└── utils/                    # Utility functions
    ├── index.ts
    └── on-drag-line-end.ts  # Handle end of drag line
```

### Key Directory Functions

#### 1. `/components` - Component Library
- **base-node**: Base rendering components for all nodes
- **testrun**: Complete test-run module, including status bar, form, and panel
- **sidebar**: Sidebar components providing tools and property panels
- **node-panel**: Node add panel with drag-to-add capability

#### 2. `/nodes` - Node System
Each node type has its own directory, including:
- Node registration (`index.ts`)
- Form metadata (`form-meta.ts`)
- Node-specific components and logic

#### 3. `/plugins` - Plugin System
- **runtime-plugin**: Supports both browser and server modes
- **context-menu-plugin**: Right-click context menu
- **variable-panel-plugin**: Variable management panel

#### 4. `/shortcuts` - Shortcuts System
Complete keyboard shortcut support, including:
- Basic actions: copy, paste, delete, select-all
- View actions: zoom-in, zoom-out, collapse, expand
- Each shortcut has its own implementation module

## Application Architecture

### Core Design Patterns

#### 1. Plugin Architecture
Highly modular plugin system; each feature is an independent plugin:

```typescript
plugins: () => [
  createFreeLinesPlugin({ renderInsideLine: LineAddButton }),
  createMinimapPlugin({ /* config */ }),
  createFreeSnapPlugin({ /* alignment config */ }),
  createFreeNodePanelPlugin({ renderer: NodePanel }),
  createContainerNodePlugin({}),
  createFreeGroupPlugin({ groupNodeRender: GroupNodeRender }),
  createContextMenuPlugin({}),
  createRuntimePlugin({ mode: 'browser' }),
  createVariablePanelPlugin({})
]
```

#### 2. Node Registry Pattern
Manage different workflow node types via a registry:

```typescript
export const nodeRegistries: FlowNodeRegistry[] = [
  ConditionNodeRegistry,    // Condition node
  StartNodeRegistry,        // Start node
  EndNodeRegistry,          // End node
  LLMNodeRegistry,          // LLM node
  LoopNodeRegistry,         // Loop node
  CommentNodeRegistry,      // Comment node
  HTTPNodeRegistry,         // HTTP node
  CodeNodeRegistry,         // Code node
  // ... more node types
];
```

#### 3. Dependency Injection
Use Inversify for service DI:

```typescript
onBind: ({ bind }) => {
  bind(CustomService).toSelf().inSingletonScope();
}
```

## Core Features

### 1. Editor Configuration System

`useEditorProps` is the configuration center of the editor:

```typescript
export function useEditorProps(
  initialData: FlowDocumentJSON,
  nodeRegistries: FlowNodeRegistry[]
): FreeLayoutProps {
  return useMemo<FreeLayoutProps>(() => ({
    background: true,                    // Background grid
    readonly: false,                     // Readonly mode
    initialData,                         // Initial data
    nodeRegistries,                      // Node registries

    // Core feature configs
    playground: { preventGlobalGesture: true /* Prevent Mac browser swipe gestures */ },
    nodeEngine: { enable: true },
    variableEngine: { enable: true },
    history: { enable: true, enableChangeNode: true },

    // Business rules
    canAddLine: (ctx, fromPort, toPort) => { /* Connection rules */ },
    canDeleteLine: (ctx, line) => { /* Line deletion rules */ },
    canDeleteNode: (ctx, node) => { /* Node deletion rules */ },
    canDropToNode: (ctx, params) => { /* Drag-and-drop rules */ },

    // Plugins
    plugins: () => [/* Plugin list */],

    // Events
    onContentChange: debounce((ctx, event) => { /* Auto save */ }, 1000),
    onInit: (ctx) => { /* Initialization */ },
    onAllLayersRendered: (ctx) => { /* After render */ }
  }), []);
}
```

### 2. Node Type System

The app supports multiple workflow node types:

```typescript
export enum WorkflowNodeType {
  Start = 'start',           // Start node
  End = 'end',               // End node
  LLM = 'llm',               // Large language model node
  HTTP = 'http',             // HTTP request node
  Code = 'code',             // Code execution node
  Variable = 'variable',     // Variable node
  Condition = 'condition',   // Conditional node
  Loop = 'loop',             // Loop node
  BlockStart = 'block-start', // Sub-canvas start node
  BlockEnd = 'block-end',    // Sub-canvas end node
  Comment = 'comment',       // Comment node
  Continue = 'continue',     // Continue node
  Break = 'break',           // Break node
}
```

Each node follows a unified registration pattern:

```typescript
export const StartNodeRegistry: FlowNodeRegistry = {
  type: WorkflowNodeType.Start,
  meta: {
    isStart: true,
    deleteDisable: true,        // Not deletable
    copyDisable: true,          // Not copyable
    nodePanelVisible: false,    // Hidden in node panel
    defaultPorts: [{ type: 'output' }],
    size: { width: 360, height: 211 }
  },
  info: {
    icon: iconStart,
    description: 'The starting node of the workflow, used to set up information needed to launch the workflow.'
  },
  formMeta,                     // Form configuration
  canAdd() { return false; }    // Disallow multiple start nodes
};
```

### 3. Plugin Architecture

App features are modularized via the plugin system:

#### Core Plugin List
1. **FreeLinesPlugin** - Connection rendering and interaction
2. **MinimapPlugin** - Minimap navigation
3. **FreeSnapPlugin** - Auto-alignment and guide-lines
4. **FreeNodePanelPlugin** - Node add panel
5. **ContainerNodePlugin** - Container nodes (e.g., loop nodes)
6. **FreeGroupPlugin** - Node grouping
7. **ContextMenuPlugin** - Right-click context menu
8. **RuntimePlugin** - Workflow runtime
9. **VariablePanelPlugin** - Variable management panel

### 4. Runtime System

Two run modes are supported:

```typescript
createRuntimePlugin({
  mode: 'browser',              // Browser mode
  // mode: 'server',            // Server mode
  // serverConfig: {
  //   domain: 'localhost',
  //   port: 4000,
  //   protocol: 'http',
  // },
})
```

## Design Philosophy and Advantages

### 1. Highly Modular
- **Plugin architecture**: Each feature is an independent plugin, easy to extend and maintain
- **Node registry system**: Add new node types without changing core code
- **Componentized UI**: Highly reusable components with clear responsibilities

### 2. Type Safety
- **Full TypeScript support**: End-to-end type safety from configuration to runtime
- **JSON Schema integration**: Node data validated by schemas
- **Strongly typed plugin interfaces**: Clear type constraints for plugin development

### 3. User Experience
- **Real-time preview**: Run and debug workflows live
- **Rich interactions**: Dragging, zooming, snapping, shortcuts for a complete editing experience
- **Visual feedback**: Minimap, status indicators, line animations

### 4. Extensibility
- **Open plugin system**: Third parties can easily develop custom plugins
- **Flexible node system**: Custom node types and form configurations supported
- **Multiple runtimes**: Both browser and server modes

### 5. Performance
- **On-demand loading**: Components and plugins support lazy loading
- **Debounce**: Performance optimizations for high-frequency operations like auto-save

## Technical Highlights

### 1. In-house Editor Framework
Based on `@flowgram.ai/free-layout-editor`, providing:
- Free-layout canvas system
- Full undo/redo functionality
- Lifecycle management for nodes and connections
- Variable engine and expression system

### 2. Advanced Build Configuration
Using Rsbuild as the build tool:

```typescript
export default defineConfig({
  plugins: [pluginReact(), pluginLess()],
  source: {
    entry: { index: './src/app.tsx' },
    decorators: { version: 'legacy' }  // Enable decorators
  },
  tools: {
    rspack: {
      ignoreWarnings: [/Critical dependency/]  // Ignore specific warnings
    }
  }
});
```

### 3. Internationalization
Built-in multilingual support:

```typescript
i18n: {
  locale: navigator.language,
  languages: {
    'zh-CN': {
      'Never Remind': '不再提示',
      'Hold {{key}} to drag node out': '按住 {{key}} 可以将节点拖出',
    },
    'en-US': {},
  }
}
```

