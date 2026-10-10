# Free Layout

import {
  PackageManagerTabs
  // @ts-ignore
} from '@theme';
import { CodePreview } from '@components/code-preview';
import step1 from '@components/free-examples/step-1.tsx?raw';
import step2 from '@components/free-examples/step-2.tsx?raw';
import step3 from '@components/free-examples/step-3.tsx?raw';
import step4 from '@components/free-examples/step-4.tsx?raw';
import step5App from '@components/free-examples/step-5/app.tsx?raw';
import step5InitialData from '@components/free-examples/step-5/initial-data.ts?raw';
import step5UseEditorProps from '@components/free-examples/step-5/use-editor-props.tsx?raw';
import step5NodeRender from '@components/free-examples/step-5/node-render.tsx?raw';
import step5NodeRegistries from '@components/free-examples/step-5/node-registries.tsx?raw';
import step6App from '@components/free-examples/step-6/app.tsx?raw';
import step6InitialData from '@components/free-examples/step-6/initial-data.ts?raw';
import step6UseEditorProps from '@components/free-examples/step-6/use-editor-props.tsx?raw';
import step6NodeRender from '@components/free-examples/step-6/node-render.tsx?raw';
import step6NodeRegistries from '@components/free-examples/step-6/node-registries.tsx?raw';
import step7App from '@components/free-examples/step-7/app.tsx?raw';
import step7InitialData from '@components/free-examples/step-7/initial-data.ts?raw';
import step7UseEditorProps from '@components/free-examples/step-7/use-editor-props.tsx?raw';
import step7NodeRender from '@components/free-examples/step-7/node-render.tsx?raw';
import step7NodeRegistries from '@components/free-examples/step-7/node-registries.tsx?raw';
import step7Tools from '@components/free-examples/step-7/tools.tsx?raw';
import step7AddNode from '@components/free-examples/step-7/add-node.tsx?raw';
import step7Minimap from '@components/free-examples/step-7/minimap.tsx?raw';

## Step 0: Install Dependencies

1. Install the editor package

<PackageManagerTabs
  command={{
"npm": "npm install @flowgram.ai/free-layout-editor",
"pnpm": "pnpm add @flowgram.ai/free-layout-editor",
"yarn": "yarn add @flowgram.ai/free-layout-editor",
"bun": "bun add @flowgram.ai/free-layout-editor",
}}
/>

2. Install styled-components (if not already installed)

<PackageManagerTabs
  command={{
"npm": "npm install styled-components",
"pnpm": "pnpm add styled-components",
"yarn": "yarn add styled-components",
"bun": "bun add styled-components",
}}
/>

## Step 1: Import the Canvas Component

1. Import the stylesheet to ensure basic styles are applied:
   ```tsx
   import '@flowgram.ai/free-layout-editor/index.css';
   ```

2. Use `FreeLayoutEditorProvider` to provide the editor context, and `EditorRenderer` to render the canvas:
   ```tsx
   const FlowGramApp = () => (
     <FreeLayoutEditorProvider>
       <EditorRenderer />
     </FreeLayoutEditorProvider>
   );
   ```

3. The remaining files can keep their default exports.

> Expected result: After the page loads, only a blank canvas is displayed, with no nodes or edges.

<CodePreview
  files={{
  '/App.tsx': step1
}}
/>

## Step 2: Implement and Register the Node Component

1. Import hooks and components related to node rendering:
   * `useNodeRender`: Gets the node context (such as the form).
   * `WorkflowNodeProps` & `WorkflowNodeRenderer`: Define and render the node shell.

2. Create the `NodeRender` component to customize node size and style:
   ```tsx
   const NodeRender = (props: WorkflowNodeProps) => {
     const { form } = useNodeRender();
     return (
       <WorkflowNodeRenderer
         style={{ width: 280, height: 88, background: '#fff', borderRadius: 8, ... }}
         node={props.node}
       >
         {form?.render()}
       </WorkflowNodeRenderer>
     );
   };
   ```

3. Register in `FreeLayoutEditorProvider`:
   * `materials.renderDefaultNode` specifies the default node renderer.
   * `nodeRegistries` declares available node types (e.g., `custom`).
   * `initialData` provides an initial node at position `{ x: 250, y: 100 }`.

> Expected result: A draggable, custom-styled node appears on the canvas.

<CodePreview
  files={{
  '/App.tsx': step2
}}
/>

## Step 3: Add Multiple Nodes and Edges

1. Add the `onAllLayersRendered` callback. After all layers are rendered, call `ctx.tools.fitView(false)` to make the canvas automatically fit the content.

2. Add `canDeleteNode` & `canDeleteLine` callbacks, returning `true` to allow deleting nodes and edges.

3. Extend `initialData`:
   * Add another node of the same type at position `{ x: 400, y: 0 }`.
   * Add an edge in the `edges` array to connect node `1` and node `2`.

> Expected result:
>
> • The canvas displays two connected nodes and automatically centers/zooms to fit the view.
>
> • Select any node or edge, and press the Delete key to remove it.

<CodePreview
  files={{
  '/App.tsx': step3
}}
/>

## Step 4: Import Plugins

:::info

* `@flowgram.ai/free-snap-plugin`: A node snapping plugin that aligns nodes to a grid.
* `@flowgram.ai/minimap-plugin`: A minimap plugin that provides a small map view of the canvas.

:::

1. Install plugin dependencies

<PackageManagerTabs
  command={{
"npm": "npm install @flowgram.ai/free-snap-plugin @flowgram.ai/minimap-plugin",
"pnpm": "pnpm add @flowgram.ai/free-snap-plugin @flowgram.ai/minimap-plugin",
"yarn": "yarn add @flowgram.ai/free-snap-plugin @flowgram.ai/minimap-plugin",
"bun": "bun add @flowgram.ai/free-snap-plugin @flowgram.ai/minimap-plugin",
}}
/>

2. Import the plugin creation functions from their respective packages:

* `createFreeSnapPlugin` is used for node grid snapping.
* `createMinimapPlugin` is used to generate the canvas minimap.

3. Register the plugins in the `plugins` prop of `FreeLayoutEditorProvider`:

```tsx
plugins={() => [
  createMinimapPlugin({}),
  createFreeSnapPlugin({})
]}
```

> Expected result:
>
> • A draggable and zoomable minimap appears in the upper-right corner of the canvas. Clicking or dragging the minimap allows for quick navigation of the main canvas.
>
> • When dragging a node, it will automatically snap to nearby nodes for easy alignment.

<CodePreview
  files={{
  '/App.tsx': step4
}}
/>

## Step 5: Splitting Files

To avoid having excessively long files, we need to split the editor configuration, node rendering, initial data, etc., which were originally in a single component, into separate files. This facilitates maintenance, reuse, and collaboration.

```sh
- use-editor-props.ts # Canvas configuration
- node-render.tsx # Node rendering
- initial-data.ts # Initial data
- node-registries.ts # Node configuration
- App.tsx # Canvas entry point
```

File Responsibilities

* `use-editor-props.tsx`: Manages all props for FreeLayoutEditorProvider (plugins, view fitting, materials, node registration, and initial data).
* `node-render.tsx`: Defines the custom node renderer NodeRender, responsible for its appearance and internal form rendering.
* `initial-data.ts`: Provides the initial nodes and edges. The current example includes 5 `custom` nodes and multiple connections.
* `node-registries.tsx`: Declares the set of node types (the example only registers 'custom').
* `App.tsx`: The application entry point, which gets the configuration from useEditorProps and mounts EditorRenderer.

> Expected result: By splitting the files, the code structure becomes clearer, responsibilities are more defined, and the code is easier to extend in the future.

<CodePreview
  files={{
  '/App.tsx': step5App,
  '/use-editor-props.tsx': step5UseEditorProps,
  '/initial-data.ts': step5InitialData,
  '/node-registries.tsx': step5NodeRegistries,
  '/node-render.tsx': step5NodeRender,
}}
/>

## Step 6: Integrating Forms and History

1. Node Registration and Port Configuration

* `start`: The starting node, which cannot be deleted and has only an output port by default.
* `end`: The ending node, which cannot be deleted and has only an input port by default.
* `custom`: A regular node, which has both input and output ports by default.

2. Enable Forms and History

In `useEditorProps.tsx`:

* `nodeEngine.enable = true`: Enables the node engine, allowing `formMeta` to be configured for node types.
* `history.enable = true` and `history.enableChangeNode = true`: Enable undo/redo and listen for node data changes (e.g., form changes).
* `getNodeDefaultRegistry(type)`: Provides a default configuration for types that are not explicitly registered:
  * `meta.defaultExpanded = true`: The node's internal content area is expanded by default.
  * `formMeta.render`: Renders the form. This example renders the title field using `<Field<string> name="title">`.

3. Initialize Data and Rendering

* In `initial-data.ts`, set `data.title` for each node (e.g., `Start Node`, `Custom Node A/B/C`, `End Node`).
* `form?.render()` in `NodeRender` will render the form content into the node shell, displaying the title of each node.

> Expected result:
>
> • The canvas contains `start`, multiple `custom`, and `end` nodes, with connections matching the initial data.
>
> • Each node displays its `title`; selecting a node can expand it to show more form fields and interactions.
>
> • Undo/redo shortcuts are available and can be verified by deleting or moving nodes.

<CodePreview
  activeFile="/use-editor-props.tsx"
  files={{
  '/App.tsx': step6App,
  '/use-editor-props.tsx': step6UseEditorProps,
  '/initial-data.ts': step6InitialData,
  '/node-registries.tsx': step6NodeRegistries,
  '/node-render.tsx': step6NodeRender,
}}
/>

## Step 7: Creating a Toolbar

1. Import the Toolbar Component

* In `App.tsx`, import `<Tools />` and place it at the same level as `<EditorRenderer />` inside `FreeLayoutEditorProvider`, allowing it to access the editor context and tool methods.

2. Control the Canvas with Tool Methods

* Use `usePlaygroundTools()` to get canvas manipulation methods: `zoomin/zoomout`, `fitView`, `autoLayout`, `switchLineType`, etc.
* Switch edge style: Use `switchLineType` to toggle between `LineType.BEZIER` and `LineType.LINE_CHART`.
* Display real-time zoom ratio: Read `tools.zoom` to show the current canvas zoom percentage.

3. Integrate Undo/Redo State

* Use `useClientContext()` to get `history` and listen to `history.undoRedoService.onChange` to update the state of the `canUndo/canRedo` buttons.
* In `use-editor-props.tsx`, ensure history is enabled: `history.enable = true` and `history.enableChangeNode = true`, so that undo/redo works for node data changes.

5. Extend Components (Optional)

* Minimap: Pin the minimap to the bottom-right corner by customizing the `MinimapRender` container style to improve navigation efficiency.
* AddNode: Provides a button to quickly add a new node. It uses `WorkflowDocument.createWorkflowNodeByType` to create and select a node in the center of the canvas.

> Expected result:
>
> • A toolbar appears in the bottom-right corner of the page, supporting common operations like Zoom In/Zoom Out, Fit View, Auto Layout, and displaying the real-time zoom ratio.
>
> • The edge style can be switched (Bezier/Polyline), and the undo/redo buttons are automatically enabled/disabled based on the history state.
>
> • Combined with the Minimap and AddNode components, it forms a complete editing tool area for more efficient operation.

<CodePreview
  activeFile="/tools.tsx"
  files={{
  '/App.tsx': step7App,
  '/use-editor-props.tsx': step7UseEditorProps,
  '/initial-data.ts': step7InitialData,
  '/node-registries.tsx': step7NodeRegistries,
  '/tools.tsx': step7Tools,
  '/add-node.tsx': step7AddNode,
  '/minimap.tsx': step7Minimap,
  '/node-render.tsx': step7NodeRender,
}}
/>

## Step 8: Learn More

Click to learn more about [Free Layout Usage](/en/guide/free-layout/load.md)

<div
  style={{
display: "grid",
gridTemplateColumns: "1fr 1fr",
gap: "2rem",
marginTop: "1rem",
}}
>
  <div>
    Learn more about Free Layout:

    * [Loading and Saving](/en/guide/free-layout/load.md)
    * [Nodes](/en/guide/free-layout/node.md)
    * [Lines](/en/guide/free-layout/line.md)
    * [Ports](/en/guide/free-layout/port.md)
    * [Sub-canvas](/en/guide/free-layout/sub-canvas.md)
  </div>

  <div>
    Learn more about other FlowGram.AI features:

    * [Form](/en/guide/form/form.md)
    * [Variable](/en/guide/variable/basic.md)
    * [Materials](/en/materials/introduction.md)
    * [Runtime](/en/guide/runtime/introduction.md)
  </div>
</div>
