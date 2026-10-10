# Custom Layer

We split the canvas into multiple Layers, implementing the concept of interaction layering for better plugin management. For more details, see [Canvas Engine](/en/guide/concepts/canvas-engine.md)

1. Use `observeEntityDatas`, `observeEntities`, and `observeEntity` to monitor updates to any data module of canvas nodes
2. Use `onZoom`, `onScroll`, `onViewportChange`, etc. to monitor canvas zooming or scrolling
3. Use `render` to insert React elements into the canvas, such as drawing SVG lines

![Aspect-oriented programming](@/public/en-layer-uml.jpg)

## Creating a Layer

```tsx pure
import { FreeLayoutPluginContext, inject, injectable, FlowNodeEntity, FlowNodeTransformData, FlowNodeFormData } from '@flowgram.ai/free-layout-editor'

@injectable()
export class MyLayer extends Layer {
  @inject(FreeLayoutPluginContext) ctx: FreeLayoutPluginContext
  // Can monitor node width, height, and position changes
  @observeEntityDatas(FlowNodeEntity, FlowNodeTransformData) transformDatas: FlowNodeTransformData[];
  // Can monitor form data changes, connection data can be stored in forms
  @observeEntityDatas(FlowNodeEntity, FlowNodeFormData) formDatas: FlowNodeFormData[];
  onReady() {
    // Can also add styles
    // zIndex controls whether to overlay nodes, nodes default to 10, greater than 10 will be above nodes
    this.node.style.zIndex = 11;
  }
  onZoom(scale) {
    // Scale with canvas
    this.node.style.transform = `scale(${scale})`;
  }
  render() {
    return <div>{...}</div>
  }
}

```

## Adding to Canvas

* Through use-editor-props

```ts pure
{
  onInit: (ctx) => {
    ctx.playground.registerLayer(MyLayer)
  }
}
```

* Through plugin

```tsx pure
import { FreeLayoutPluginContext } from '@flowgram.ai/free-layout-editor'

export const createMyPlugin = definePluginCreator<{}, FreeLayoutPluginContext>({
  onInit: (ctx, opts) => {
    ctx.playground.registerLayer(MyLayer)
  },
});
```

## Layer Lifecycle Description

```ts
interface Layer {
    /**
     * Triggered during initialization
     */
    onReady?(): void;

    /**
     * Triggered when playground size changes
     */
    onResize?(size: PipelineDimension): void;

    /**
     * Triggered when playground is focused
     */
    onFocus?(): void;

    /**
     * Triggered when playground loses focus
     */
    onBlur?(): void;

    /**
     * Monitor zoom
     */
    onZoom?(scale: number): void;

    /**
     * Monitor scroll
     */
    onScroll?(scroll: { scrollX: number; scrollY: number }): void;

    /**
     * Triggered when viewport updates
     */
    onViewportChange?(): void;

    /**
     * Triggered when readonly or disabled state changes
     * @param state
     */
    onReadonlyOrDisabledChange?(state: { disabled: boolean; readonly: boolean }): void;

    /**
     * Data updates automatically trigger React render, if not provided React rendering won't be called
     */
    render?(): JSX.Element
 }
```
