# Fixed Layout

import {
  PackageManagerTabs
  // @ts-ignore
} from '@theme';
import { FixedLayoutCodePreview } from '@components/code-preview';
import step1 from '@components/fixed-examples/step-1.tsx?raw';
import step2 from '@components/fixed-examples/step-2.tsx?raw';
import step3 from '@components/fixed-examples/step-3.tsx?raw';
import step4 from '@components/fixed-examples/step-4.tsx?raw';
import step5App from '@components/fixed-examples/step-5/app.tsx?raw';
import step5UseEditorProps from '@components/fixed-examples/step-5/use-editor-props.tsx?raw';
import step5InitialData from '@components/fixed-examples/step-5/initial-data.ts?raw';
import step5NodeRegistries from '@components/fixed-examples/step-5/node-registries.tsx?raw';
import step5NodeRender from '@components/fixed-examples/step-5/node-render.tsx?raw';
import step5Adder from '@components/fixed-examples/step-5/adder.tsx?raw';
import step6App from '@components/fixed-examples/step-6/app.tsx?raw';
import step6UseEditorProps from '@components/fixed-examples/step-6/use-editor-props.tsx?raw';
import step6InitialData from '@components/fixed-examples/step-6/initial-data.ts?raw';
import step6NodeRegistries from '@components/fixed-examples/step-6/node-registries.tsx?raw';
import step6NodeRender from '@components/fixed-examples/step-6/node-render.tsx?raw';
import step6Adder from '@components/fixed-examples/step-6/adder.tsx?raw';
import step7App from '@components/fixed-examples/step-7/app.tsx?raw';
import step7UseEditorProps from '@components/fixed-examples/step-7/use-editor-props.tsx?raw';
import step7InitialData from '@components/fixed-examples/step-7/initial-data.ts?raw';
import step7NodeRegistries from '@components/fixed-examples/step-7/node-registries.tsx?raw';
import step7NodeRender from '@components/fixed-examples/step-7/node-render.tsx?raw';
import step7Adder from '@components/fixed-examples/step-7/adder.tsx?raw';
import step7Tools from '@components/fixed-examples/step-7/tools.tsx?raw';
import step7Minimap from '@components/fixed-examples/step-7/minimap.tsx?raw';

## Step 0: Install Dependencies

1. Install the editor packages:

<PackageManagerTabs
  command={{
"npm": "npm install @flowgram.ai/fixed-layout-editor @flowgram.ai/fixed-semi-materials",
"pnpm": "pnpm add @flowgram.ai/fixed-layout-editor @flowgram.ai/fixed-semi-materials",
"yarn": "yarn add @flowgram.ai/fixed-layout-editor @flowgram.ai/fixed-semi-materials",
"bun": "bun add @flowgram.ai/fixed-layout-editor @flowgram.ai/fixed-semi-materials",
}}
/>

2. Install `styled-components` (if you haven't already):

<PackageManagerTabs
  command={{
"npm": "npm install styled-components",
"pnpm": "pnpm add styled-components",
"yarn": "yarn add styled-components",
"bun": "bun add styled-components",
}}
/>

## Step 1: Import the Canvas Components

1. Import the stylesheet to ensure basic styles are applied:
   ```tsx
   import '@flowgram.ai/fixed-layout-editor/index.css';
   ```

2. Use `FixedLayoutEditorProvider` to provide the editor context and `EditorRenderer` to render the canvas. Import the default Fixed Layout Semi component set via `materials.components`:
   ```tsx
   const FlowGramApp = () => (
     <FixedLayoutEditorProvider
       materials={{ components: defaultFixedSemiMaterials }}
     >
       <EditorRenderer />
     </FixedLayoutEditorProvider>
   );
   ```

3. Keep the default exports for the remaining files.

> **Expected Result:** After the page loads, only a blank canvas will be displayed, with no nodes or connections.

<FixedLayoutCodePreview
  files={{
  '/App.tsx': step1
}}
/>

## Step 2: Implement the Node Component

1. Import the necessary APIs for node rendering:
   * `useNodeRender`: A hook to get the node context (e.g., drag, hover, highlight, form).
   * `FlowNodeEntity`: The type for a node entity, used to declare the props for `NodeRender`.

2. Create the `NodeRender` component, customize the node's size and style, and integrate drag-and-drop and form rendering:
   ```tsx
   import { useNodeRender, FlowNodeEntity } from '@flowgram.ai/fixed-layout-editor';

   export const NodeRender = ({ node }: { node: FlowNodeEntity }) => {
     const { onMouseEnter, onMouseLeave, startDrag, form, dragging, activated } = useNodeRender();
     return (
       <div
         onMouseEnter={onMouseEnter}
         onMouseLeave={onMouseLeave}
         onMouseDown={(e) => { startDrag(e); e.stopPropagation(); }}
         style={{ width: 280, minHeight: 88, background: '#fff', borderRadius: 8, opacity: dragging ? 0.3 : 1, /* ... */ }}
       >
         {form?.render()}
       </div>
     );
   };
   ```

3. Register the components in `FixedLayoutEditorProvider`:
   * `materials.renderDefaultNode`: Specifies `NodeRender` as the default node renderer.
   * `nodeRegistries`: Declares the available node types (e.g., `custom`).
   * `initialData`: Provides an initial node of type `custom`.

> **Expected Result:** A draggable, custom-styled node will appear on the canvas.

<FixedLayoutCodePreview
  files={{
  '/App.tsx': step2
}}
/>

## Step 3: Customize the "Add Node" Component and "Delete Node" Button

1. Add a delete button to the node:
   * In `NodeRender`, get the `ctx` using `useClientContext()`. Call `ctx.operation.deleteNode(node)` when the button is clicked to delete the current node.
   * Remember to stop event propagation with `e.stopPropagation()` to avoid interfering with canvas selection/drag behavior.
   ```tsx
   const ctx = useClientContext();
   <button onClick={(e) => { e.stopPropagation(); ctx.operation.deleteNode(node); }}>×</button>
   ```

2. Customize the "Add Node" component, `Adder`:
   * Use `useService(FlowOperationService)` and `usePlayground()` to encapsulate the `handleAdd` method: insert a new node after the specified node and scroll it into the center of the view.
   * Switch the UI based on `hoverActivated`: display a plus sign and a larger clickable area on hover; do not display in read-only mode.
   ```tsx
   const { handleAdd } = useAddNode();
   const Adder = ({ from, hoverActivated }) => (
     <div onClick={() => handleAdd({ type: 'custom', id: `custom_${Date.now()}` }, from)}>
       {hoverActivated ? <span>+</span> : null}
     </div>
   );
   ```

3. Register `Adder` in `materials.components`:
   * Override the default "Add Node" renderer using `FlowRendererKey.ADDER`.
   ```tsx
   materials={{
     renderDefaultNode: NodeRender,
     components: { ...defaultFixedSemiMaterials, [FlowRendererKey.ADDER]: Adder },
   }}
   ```

4. Initialize data and adapt the view:
   * `initialData` provides a basic flow: `start -> custom -> end`.
   * Call `fitView` in `onAllLayersRendered` to automatically fit the canvas content:
   ```tsx
   onAllLayersRendered={(ctx) => {
     setTimeout(() => {
       ctx.playground.config.fitView(ctx.document.root.bounds.pad(30));
     }, 10);
   }}
   ```

> **Expected Result:**
>
> * The canvas will display a basic flow consisting of `start`, `custom`, and `end` nodes, with the view automatically centered/zoomed to a suitable range.
> * When hovering over an addable position, a circular plus button will appear. Clicking it will add a new `custom` node after the current node and automatically scroll to the new node.
> * A "×" delete button will be displayed in the top-right corner of each node. Clicking it will delete the node (the add component is hidden in read-only mode).

<FixedLayoutCodePreview
  files={{
  '/App.tsx': step3
}}
/>

## Step 4: Introduce Plugins

:::info

* `@flowgram.ai/minimap-plugin`: A minimap plugin that provides a small map view of the canvas.
  :::

1. Install the plugin dependency:

<PackageManagerTabs
  command={{
"npm": "npm install @flowgram.ai/minimap-plugin",
"pnpm": "pnpm add @flowgram.ai/minimap-plugin",
"yarn": "yarn add @flowgram.ai/minimap-plugin",
"bun": "bun add @flowgram.ai/minimap-plugin",
}}
/>

2. Import the plugin creation function from the corresponding package:
   * `createMinimapPlugin` is used to generate the canvas thumbnail.

3. Register the plugin in the `plugins` prop of `FixedLayoutEditorProvider`:
   ```tsx
   plugins={() => [
     createMinimapPlugin({
       enableDisplayAllNodes: true,
     })
   ]}
   ```

> **Expected Result:**
>
> * A draggable/zoomable minimap will appear in the top-right corner of the canvas. Clicking or dragging the thumbnail allows for quick navigation of the main canvas.
> * With `enableDisplayAllNodes: true`, the minimap will display all nodes, making it easy to navigate long flows.

<FixedLayoutCodePreview
  files={{
  '/App.tsx': step4
}}
/>

## Step 5: Split Files

To prevent a single file from becoming too long, we need to split the editor configuration, node rendering, initial data, etc., which were originally in one component, into separate files. This facilitates maintenance, reuse, and collaboration.

```sh
- use-editor-props.tsx # Canvas configuration (centralized management of Provider's props)
- node-render.tsx      # Node rendering (including delete button)
- initial-data.ts      # Initial data (start/custom/end)
- node-registries.tsx  # Node registration (example only registers 'custom')
- adder.tsx            # Custom "Add Node" component (adds a custom node on click)
- App.tsx              # Canvas entry point (mounts EditorRenderer)
```

**File Responsibilities:**

* `use-editor-props.tsx`: Centralizes all props for `FixedLayoutEditorProvider` (plugins, view adaptation, materials, node registration, and initial data):
  * `plugins`: Registers the minimap plugin `createMinimapPlugin({ enableDisplayAllNodes: true })`.
  * `onAllLayersRendered`: Calls `fitView` after rendering is complete to automatically fit the canvas content.
  * `materials`:
    * `renderDefaultNode`: Specifies `NodeRender` as the default node renderer.
    * `components`: Merges `defaultFixedSemiMaterials` and overrides the default adder with `[FlowRendererKey.ADDER]: Adder`.
  * `nodeRegistries` and `initialData` are imported from separate files.

* `node-render.tsx`: Defines the custom node renderer `NodeRender`, sets the node's appearance, and renders the internal form via `form?.render()`. It also provides a "×" delete button in the top-right corner (`useClientContext().operation.deleteNode(node)`).

* `initial-data.ts`: Provides the initial data for the basic flow, including `start -> custom -> end` nodes.

* `node-registries.tsx`: Declares the set of node types (the example only registers `'custom'`).

* `adder.tsx`: Implements the custom "Add Node" component `Adder`, which displays a plus sign on hover. On click, it adds a new `custom` node after the current node using `FlowOperationService.addFromNode` and calls `scrollToView` to automatically position the new node.

* `App.tsx`: The application entry point, which gets the configuration from `useEditorProps` and mounts `EditorRenderer`.

> **Expected Result:** By splitting the files, the code structure becomes clearer and responsibilities are more defined, making future extensions and team collaboration easier. The UI effect is the same as in the previous section (basic flow, delete button, and "Add Node" component are available, with a minimap and automatic view adaptation).

<FixedLayoutCodePreview
  files={{
  '/App.tsx': step5App,
  '/use-editor-props.tsx': step5UseEditorProps,
  '/initial-data.ts': step5InitialData,
  '/node-registries.tsx': step5NodeRegistries,
  '/node-render.tsx': step5NodeRender,
  '/adder.tsx': step5Adder,
}}
/>

## Step 6: Integrate Forms and History

1. Node Registration and Extension:

   * `condition`: Extended as a "branch node" via `extend: 'dynamicSplit'`, and returns default `blocks` (multiple branches) in `onAdd()`.
   * `custom`: A normal node, with default `data.title` and `data.content` set in `onAdd()`.
   * The optional `meta` configuration item can control node behavior (e.g., draggable, selectable, deletable, copyable, addable).

2. Enable Forms and History:

   In `use-editor-props.tsx`:

   * `nodeEngine.enable = true`: Enables the node engine, allowing `formMeta` to be configured for node types.
   * `history.enable = true` and `history.enableChangeNode = true`: Enable undo/redo and listen for node data changes (e.g., form field changes).
   * `history.onApply(ctx)`: Triggered after applying a history record, can be used for auto-saving (the example prints `ctx.document.toJSON()`).
   * `getNodeDefaultRegistry(type)`: Provides a default configuration for types that are not explicitly registered:
     * `meta.defaultExpanded = true`: The node's internal content area is expanded by default.
     * `formMeta.render`: Renders the form. This example uses `<Field<string> name="title">` and `<Field<string> name="content">` to display a title and an editable input box, respectively.
     ```tsx
     getNodeDefaultRegistry(type) {
       return {
         type,
         meta: { defaultExpanded: true },
         formMeta: {
           render: () => (
             <>
               <Field<string> name="title">{({ field }) => <div>{field.value}</div>}</Field>
               <Field<string> name="content">
                 <input />
               </Field>
             </>
           ),
         },
       };
     }
     ```

3. Initialize Data and Rendering:

   * In `initial-data.ts`, include a `start` node, a `condition` node with three branches (one containing `custom`, another `break`, and one empty), and an `end` node.
   * Each node carries `data.title` and `data.content`. `form?.render()` in `NodeRender` will render these form fields inside the node's shell.
   * The `Adder` component adds a `custom` node on click, with the default `title: 'New Custom Node'` and `content: 'Custom Node Content'`.

> **Expected Result:**
>
> * The canvas contains `start`, `condition` (three branches), and `end` nodes. Each node displays its `title` and `content`. You can quickly add `custom` nodes to the flow using the `Adder`.
> * Undo/redo shortcuts are available. Node movement, addition, deletion, and form input changes are included in the history. The auto-save callback in the example will be executed when history is applied.
> * The expanded area of branch nodes is open by default, making it easy to view and edit internal content.

<FixedLayoutCodePreview
  files={{
  '/App.tsx': step6App,
  '/use-editor-props.tsx': step6UseEditorProps,
  '/initial-data.ts': step6InitialData,
  '/node-registries.tsx': step6NodeRegistries,
  '/node-render.tsx': step6NodeRender,
  '/adder.tsx': step6Adder,
}}
/>

## Step 7: Create a Toolbar

1. Import the Toolbar and Minimap Components:

   * In `App.tsx`, import and render `<Tools />` and a custom `<Minimap />` at the same level as `<EditorRenderer />` inside `FixedLayoutEditorProvider`. This allows them to access the editor context and canvas operation methods.

2. Control the Canvas with Tool Methods:

   * Use `usePlaygroundTools()` to get canvas operation methods: `zoomin/zoomout`, `fitView`, `changeLayout`, etc.
   * Display the zoom ratio in real-time: read the current canvas zoom from `tools.zoom` and display it as a percentage.

3. Integrate Undo/Redo Status:

   * Use `useClientContext()` to get `history` and listen to `history.undoRedoService.onChange` to update the availability of `Undo/Redo` in the toolbar.
   * Ensure history is enabled in `use-editor-props.tsx`: `history.enable = true` and `history.enableChangeNode = true`, so that undo/redo works for node data and layout changes.

4. Customize the Minimap (Optional):

   * Use `MinimapRender` and customize the container style to fix the thumbnail in the bottom-left corner, avoiding obstruction of the main interaction area.
   * In `use-editor-props.tsx`, pass `disableLayer: true` and `canvasStyle` (`canvasWidth/canvasHeight/canvasPadding`) to the minimap plugin to get a compact thumbnail size and margin.

5. Maintain Previous Functionality:

   * `NodeRender` continues to render form fields via `form?.render()` and provide a delete button. `Adder` supports one-click addition of `custom` nodes. The `condition/custom` type registration is maintained in `node-registries.tsx`. `initial-data.ts` contains the example flow `start → condition (three branches) → end`.

> **Expected Result:**
>
> * A toolbar appears in the bottom-left corner of the screen, supporting common operations like `ZoomIn/ZoomOut`, `FitView`, `ChangeLayout`, etc., and displaying the zoom ratio in real-time. The `Undo/Redo` buttons are updated based on the history state.
> * A custom-styled minimap is also displayed in the bottom-left corner. You can click/drag the thumbnail to quickly navigate the main canvas. Combined with the toolbar, this forms a complete editing tool area for more efficient operation.

<FixedLayoutCodePreview
  files={{
  '/App.tsx': step7App,
  '/use-editor-props.tsx': step7UseEditorProps,
  '/initial-data.ts': step7InitialData,
  '/node-registries.tsx': step7NodeRegistries,
  '/node-render.tsx': step7NodeRender,
  '/adder.tsx': step7Adder,
  '/tools.tsx': step7Tools,
  '/minimap.tsx': step7Minimap,
}}
/>

## Step 8: Learn More

<div
  style={{
display: "grid",
gridTemplateColumns: "1fr 1fr",
gap: "2rem",
marginTop: "1rem",
}}
>
  <div>
    Learn more about Fixed Layout usage:

    * [Load and Save](/en/guide/fixed-layout/load.md)
    * [Nodes](/en/guide/fixed-layout/node.md)
    * [Composite Nodes](/en/guide/fixed-layout/composite-nodes.md)
  </div>

  <div>
    Learn more about FlowGram.AI features:

    * [Forms](/en/guide/form/form.md)
    * [Variables](/en/guide/variable/basic.md)
    * [Materials](/en/materials/introduction.md)
  </div>
</div>
