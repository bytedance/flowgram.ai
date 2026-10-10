# Best Practices

import { FixedFeatureOverview } from '../../../../components';

<FixedFeatureOverview />

## Installation

```bash
npx @flowgram.ai/create-app@latest fixed-layout
```

## Source Code

https://github.com/bytedance/flowgram.ai/tree/main/apps/demo-fixed-layout

## Project Overview

### Core Tech Stack

* Frontend Framework: React 18 + TypeScript
* Build Tool: Rsbuild (a modern build tool based on Rspack)
* Styling: Less + Styled Components + CSS Variables
* UI Component Library: Semi Design (@douyinfe/semi-ui)
* State Management: Editor framework developed in-house by Flowgram
* Dependency Injection: Inversify

### Core Dependencies

* @flowgram.ai/fixed-layout-editor: Core dependency for the fixed-layout editor
* @flowgram.ai/fixed-semi-materials: Semi Design materials library
* @flowgram.ai/form-materials: Form materials library
* @flowgram.ai/group-plugin: Group plugin
* @flowgram.ai/minimap-plugin: Minimap plugin

## Code Overview

```
src/
├── app.tsx                    # Application entry component
├── editor.tsx                 # Main editor component
├── index.ts                   # Module export entry
├── initial-data.ts            # Initial data configuration
├── type.d.ts                  # Global type declarations
│
├── assets/                    # Static assets
│   ├── icon-mouse.tsx         # Mouse icon component
│   └── icon-pad.tsx           # Trackpad icon component
│
├── components/                # Common components library
│   ├── index.ts               # Components export entry
│   ├── node-list.tsx          # Node list component
│   │
│   ├── agent-adder/           # Agent adder component
│   │   └── index.tsx
│   ├── agent-label/           # Agent label component
│   │   └── index.tsx
│   ├── base-node/             # Base node component
│   │   ├── index.tsx
│   │   └── styles.tsx
│   ├── branch-adder/          # Branch adder component
│   │   ├── index.tsx
│   │   └── styles.tsx
│   ├── drag-node/             # Draggable node component
│   │   ├── index.tsx
│   │   └── styles.tsx
│   ├── node-adder/            # Node adder component
│   │   ├── index.tsx
│   │   ├── styles.tsx
│   │   └── utils.ts
│   ├── selector-box-popover/  # Selection box popover component
│   │   └── index.tsx
│   ├── sidebar/               # Sidebar components
│   │   ├── index.tsx
│   │   ├── sidebar-node-renderer.tsx
│   │   ├── sidebar-provider.tsx
│   │   └── sidebar-renderer.tsx
│   └── tools/                 # Toolbar components
│       ├── index.tsx
│       ├── styles.tsx
│       ├── fit-view.tsx       # Fit view tool
│       ├── minimap-switch.tsx # Minimap toggle
│       ├── minimap.tsx        # Minimap component
│       ├── readonly.tsx       # Readonly mode toggle
│       ├── run.tsx            # Run tool
│       ├── save.tsx           # Save tool
│       ├── switch-vertical.tsx # Vertical layout toggle
│       └── zoom-select.tsx    # Zoom selector
│
├── context/                   # React Context state management
│   ├── index.ts               # Context export entry
│   ├── node-render-context.ts # Node render context
│   └── sidebar-context.ts     # Sidebar context
│
├── form-components/           # Form components library
│   ├── index.ts               # Export entry for form components
│   ├── feedback.tsx           # Feedback component
│   │
│   ├── form-content/          # Form content components
│   │   ├── index.tsx
│   │   └── styles.tsx
│   ├── form-header/           # Form header components
│   │   ├── index.tsx
│   │   ├── styles.tsx
│   │   ├── title-input.tsx
│   │   └── utils.tsx
│   ├── form-inputs/           # Form input components
│   │   ├── index.tsx
│   │   └── styles.tsx
│   ├── form-item/             # Form item component
│   │   ├── index.css
│   │   └── index.tsx
│   ├── form-outputs/          # Form output components
│   │   ├── index.tsx
│   │   └── styles.tsx
│   └── properties-edit/       # Property editing components
│       ├── index.tsx
│       ├── property-edit.tsx
│       └── styles.tsx
│
├── hooks/                     # Custom React hooks
│   ├── index.ts               # Hooks export entry
│   ├── use-editor-props.ts    # Hook for editor properties
│   ├── use-is-sidebar.ts      # Hook for sidebar state
│   └── use-node-render-context.ts # Hook for node render context
│
├── nodes/                     # Flow node definitions
│   ├── index.ts               # Node registry
│   ├── default-form-meta.tsx  # Default form metadata
│   │
│   ├── agent/                 # Agent node type
│   │   ├── index.ts
│   │   ├── agent.ts
│   │   ├── agent-llm.ts
│   │   ├── agent-memory.ts
│   │   ├── agent-tools.ts
│   │   ├── memory.ts
│   │   └── tool.ts
│   ├── break-loop/            # Break loop node
│   │   ├── index.ts
│   │   └── form-meta.tsx
│   ├── case/                  # Case branch node
│   │   ├── index.ts
│   │   └── form-meta.tsx
│   ├── case-default/          # Default case node
│   │   ├── index.ts
│   │   └── form-meta.tsx
│   ├── catch-block/           # Exception catch block node
│   │   ├── index.ts
│   │   └── form-meta.tsx
│   ├── end/                   # End node
│   │   ├── index.ts
│   │   └── form-meta.tsx
│   ├── if/                    # Conditional node
│   │   └── index.ts
│   ├── if-block/              # Conditional block node
│   │   ├── index.ts
│   │   └── form-meta.tsx
│   ├── llm/                   # LLM node
│   │   └── index.ts
│   ├── loop/                  # Loop node
│   │   ├── index.ts
│   │   └── form-meta.tsx
│   ├── start/                 # Start node
│   │   ├── index.ts
│   │   └── form-meta.tsx
│   ├── switch/                # Switch branch node
│   │   └── index.ts
│   └── trycatch/              # Try-Catch node
│       ├── index.ts
│       └── form-meta.tsx
│
├── plugins/                   # Plugin system
│   ├── index.ts               # Plugins export entry
│   │
│   ├── clipboard-plugin/      # Clipboard plugin
│   │   └── create-clipboard-plugin.ts
│   ├── group-plugin/          # Group plugin
│   │   ├── index.ts
│   │   ├── group-box-header.tsx
│   │   ├── group-node.tsx
│   │   ├── group-note.tsx
│   │   ├── group-tools.tsx
│   │   ├── icons/
│   │   │   └── index.tsx
│   │   └── multilang-textarea-editor/ # Multi-language textarea editor
│   │       ├── index.css
│   │       ├── index.tsx
│   │       └── base-textarea.tsx
│   └── variable-panel-plugin/ # Variable panel plugin
│       ├── index.ts
│       ├── variable-panel-layer.tsx
│       ├── variable-panel-plugin.ts
│       └── components/
│           ├── full-variable-list.tsx
│           ├── global-variable-editor.tsx
│           └── variable-panel.tsx
│
├── services/                  # Services layer
│   ├── index.ts
│   └── custom-service.ts      # Custom service
│
├── shortcuts/                 # Shortcuts system
│   ├── index.ts
│   ├── constants.ts           # Shortcut constants
│   └── utils.ts               # Shortcut utilities
│
└── typings/                   # Type definitions
    ├── index.ts               # Types export entry
    ├── json-schema.ts         # JSON Schema types
    └── node.ts                # Node type definitions
```

## Architecture Design Analysis

### Overall Architecture Pattern

This project adopts a layered architecture combined with modular design:

1. Presentation Layer

* Component layer: responsible for UI rendering and user interactions
* Tools layer: provides editor tool features

2. Business Logic Layer

* Node system: defines the behavior and properties of various flow nodes
* Plugin system: provides extensible functional modules
* Services layer: handles business logic and data operations

3. Data Layer

* Context state management: manages global application state
* Type system: ensures consistency of data structures

### Key Design Patterns

#### 1. Provider Pattern

```typescript
// The main editor component uses multiple nested Providers
<FixedLayoutEditorProvider {...editorProps}>
  <SidebarProvider>
    <EditorRenderer />
    <DemoTools />
    <SidebarRenderer />
  </SidebarProvider>
  </FixedLayoutEditorProvider>
```

Use cases:

* `FixedLayoutEditorProvider`: provides core editor features and state
* `SidebarProvider`: manages sidebar visibility and the selected node

#### 2. Registry Pattern

```typescript
export const FlowNodeRegistries: FlowNodeRegistry[] = [
  StartNodeRegistry,
  EndNodeRegistry,
  SwitchNodeRegistry,
  LLMNodeRegistry,
  // ... more node types
];
```

Advantages:

* Supports dynamic registration of node types
* Easy to extend with new node types
* Decouples node type definitions

#### 3. Plugin Pattern

```typescript
plugins: () => [
  createMinimapPlugin({...}),
  createGroupPlugin({...}),
  createClipboardPlugin(),
  createVariablePanelPlugin({}),
]
```

Plugin system highlights:

* Minimap plugin: provides a canvas minimap
* Group plugin: supports node grouping and management
* Clipboard plugin: enables copy and paste
* Variable panel plugin: provides a UI for variable management

#### 4. Factory Pattern

Widely used in node creation and configuration:

```typescript
getNodeDefaultRegistry(type) {
  return {
    type,
    meta: {
      defaultExpanded: true,
    },
  };
}
```

#### 5. Observer Pattern

Implemented via the history system:

```typescript
history: {
  enable: true,
  enableChangeNode: true,
  onApply: debounce((ctx, opt) => {
    console.log('auto save: ', ctx.document.toJSON());
  }, 100),
}
```

#### 6. Strategy Pattern

Reflected in the materials system:

```typescript
materials: {
  components: {
    ...defaultFixedSemiMaterials,
    [FlowRendererKey.ADDER]: NodeAdder,
    [FlowRendererKey.BRANCH_ADDER]: BranchAdder,
    // Different render strategies can be swapped by key
  }
}
```

### State Management Architecture

#### Context System Design

The project uses multiple dedicated Contexts to manage different domains of state:

1. SidebarContext: manages sidebar state

```typescript
export const SidebarContext = React.createContext<{
  visible: boolean;
  nodeId?: string;
  setNodeId: (node: string | undefined) => void;
}>({ visible: false, setNodeId: () => {} });
```

2. NodeRenderContext: manages state related to node rendering
3. IsSidebarContext: simple boolean state

#### Custom Hooks

* `useEditorProps`: centralizes all editor configuration props
* `useIsSidebar`: determines whether the current environment is the sidebar
* `useNodeRenderContext`: gets the node render context

### Component Architecture

#### Component Layering

1. Base components

* `BaseNode`: base rendering component for all nodes
* `DragNode`: node component in drag state

2. Functional components

* Adders: `NodeAdder`, `BranchAdder`, `AgentAdder`
* Tools: zoom, save, run, and other utilities

3. Container components

* `Sidebar`: sidebar container and its subcomponents
* `Tools`: toolbar container

### Data Flow Architecture

#### Initial Data Structure

The project defines a complete initial flow dataset, including examples of multiple node types:

* Start node: entry point of the flow, defines output parameters
* Agent node: contains LLM, Memory, and Tools subcomponents
* LLM node: large language model processing node
* Switch node: conditional branch node
* Loop node: loop processing node
* TryCatch node: exception handling node
* End node: end of the flow

#### Data Transformation Mechanism

```typescript
fromNodeJSON(node, json) {
  return json; // Transform logic on data import
},
toNodeJSON(node, json) {
  return json; // Transform logic on data export
}
```
