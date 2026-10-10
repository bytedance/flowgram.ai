# Canvas Engine

## Playground

The underlying canvas engine provides its own coordinate system, which is mainly driven by the Playground.

```ts
interface Playground {
   node: HTMLDivElement // The DOM node where the canvas is mounted
   toReactComponent() // Render as a React node
   readonly: boolean // Read-only mode
   config: PlaygroundConfigEntity // Contains canvas data such as zoom and scroll
}
// Quick access hook
const { playground } = useClientContext()
```

## Layer

:::warning P.S.

* The rendering layer establishes its own coordinate system at the underlying level. Based on this coordinate system, logics such as simulated scrolling and zooming are implemented. When calculating the viewport, nodes also need to be converted to this coordinate system.
* The rendering is split into multiple layers (Layer) according to the canvas. The layered design is based on the data segmentation concept of ECS. Different Layers only listen to the data they want and render independently without interference. A Layer can be understood as an ECS System, which is the final consumption place for Entity data.
* The Layer implements observer-style reactive dynamic dependency collection similar to MobX. Data updates will trigger autorun or render.
  :::

![Aspect-oriented programming](@/public/en-layer-uml.jpg)

* Layer Lifecycle

```ts
interface Layer {
    /**
     * Triggered during initialization
     */
    onReady?(): void;

    /**
     * Triggered when the size of the playground changes
     */
    onResize?(size: PipelineDimension): void;

    /**
     * Triggered when the playground gets focus
     */
    onFocus?(): void;

    /**
     * Triggered when the playground loses focus
     */
    onBlur?(): void;

    /**
     * Listen for zoom events
     */
    onZoom?(scale: number): void;

    /**
     * Listen for scroll events
     */
    onScroll?(scroll: { scrollX: number; scrollY: number }): void;

    /**
     * Triggered when the viewport is updated
     */
    onViewportChange?(): void;

    /**
     * Triggered when the readonly or disable state changes
     * @param state
     */
    onReadonlyOrDisabledChange?(state: { disabled: boolean; readonly: boolean }): void;

    /**
     * Automatically trigger React rendering when data is updated. If not provided, React rendering will not be called.
     */
    render?(): JSX.Element
 }
```

The positioning of the Layer is actually similar to the [MonoBehaviour](https://docs.unity3d.com/ScriptReference/MonoBehaviour.html) provided by the Unity game engine. The script extensions of the Unity game engine are all based on this. It can be considered the core design, and the underlying layer also relies on the dependency injection capability provided by C#'s reflection.

```c#
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
public class MyMonoBehavior : MonoBehaviour
{
    void Awake()
    {
        Debug.Log("Awake method is always called before application starts.");
    }
    void Start()
    {
        Debug.Log("Start method is always called after Awake().");
    }
    void Update()
    {
        Debug.Log("Update method is called in every frame.");
    }
}
```

* Reactive updates of the Layer

```ts
export class DemoLayer extends Layer {
    // Injection of any Inversify module
    @inject(FlowDocument) document: FlowDocument
    // Listen to a single Entity
    @observeEntity(SomeEntity) entity: SomeEntity
    // Listen to multiple Entities
    @observeEntities(SomeEntity) entities: SomeEntity[]
    // Listen to changes in the data block (ECS - Component) of an Entity
    @observeEntityDatas(SomeEntity, SomeEntityData) transforms: SomeEntityData[]
    autorun() {}
    render() {
      return <div></div>
    }
}
```

## FlowNodeEntity

* The node is a tree, containing child nodes (blocks) and a parent node. The node uses the ECS architecture.

```ts
interface FlowNodeEntity {
    id: string
    blocks: FlowNodeEntity[]
    pre?: FlowNodeEntity
    next?: FlowNodeEntity
    parent?: FlowNodeEntity
    collapsed: boolean // Whether it is expanded
    getData(dataRegistry): NodeEntityData
    addData(dataRegistry)
}
```

## FlowNodeTransformData: Position and Size Data of the Node

```ts
class FlowNodeTransformData {
    localTransform: Matrix, // Relative offset, only relative to the previous sibling node in the same block
    worldTransform: Matrix, // Absolute offset, relative to the superposition of the parent and sibling nodes
    delta: Point // Centering and left-alignment offset, independent of the matrix, controlled by each node itself
    getSize(): Size, // Calculated by the width, height, and spacing of the node itself (independent node) or its child branch nodes
    getBounds(): Rectangle // Calculated by the world matrix and size, used for final rendering. This range can also be used to determine the highlighted selection area
    inputPoint(): Point // Input point position, usually the middle-top position of the first node in the block (centered layout)
    outputPoint(): Point // Output point position, default is the middle-bottom position of the node. For conditional branches, it is determined by specific logic such as the built-in end node
   // ...others
}
```

## FlowNodeRenderData: Node Content Rendering Data

```ts
class FlowNodeRenderData {
  node: HTMLDivElement // The DOM of the current node
  expanded: boolean // Whether it is expanded
  activated: boolean // Whether it is activated
  hidden: boolean // Whether it is hidden
  // ...others
}
```

## FlowDocument

```ts
interface FlowDocument {
    root: FlowNodeEntity // The root node of the canvas
    fromJSON(data): void // Import data
    toJSON(): FlowDocumentJSON // Export data
    addNode(type: string, meta: any): FlowNodeEntity // Add a node
    traverse(fn: (node: FlowNodeEntity) => void, startNode = this.root) // Traverse
}
```
