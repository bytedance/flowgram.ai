# Playground

Canvas instance

[> API Detail](https://flowgram.ai/auto-docs/core/classes/Playground.html)

```ts pure
const ctx = useClientContext()

console.log(ctx.playground)

```

## config

Canvas configuration, provides zoom, scroll, etc.

[> API Detail](https://flowgram.ai/auto-docs/core/classes/PlaygroundConfigEntity.html)

### updateConfig

* zoom `number` Current zoom ratio
* scrollX
* scrollY
* minZoom
* maxZoom
* readonly
* disabled
* width
* height

```ts pure
// get current config state
ctx.playground.config.config.zoom
ctx.playground.config.config.readonly

// updateConfig
ctx.playground.config.updateConfig({
  zoom: 0.8,
  minZoom: 0.1,
  maxZoom: 2,
  readonly: true
})
```

### fitView

Node fit canvas window, need to pass in the node's bounds

```ts pure
/**
 * Fit size
 * @param bounds {Rectangle} Target size
 * @param easing {number} Whether to start animation, default is true
 * @param padding {number} Boundary padding
 */
ctx.playground.config.fitView(node.bounds, true, 10)
```

### scrollToView

Specify the node position and scroll to the canvas visible area, if the position is already in the visible area, it will not scroll unless `scrollToCenter` is forced to scroll

```ts pure

/**
 * Detailed parameter description
 * @param opts {PlaygroundConfigRevealOpts}
**/
interface PlaygroundConfigRevealOpts {
  entities?: Entity[]
  position?: PositionSchema // Scroll to the specified position and center
  bounds?: Rectangle // Scroll bounds
  scrollDelta?: PositionSchema
  zoom?: number // Need to scale the ratio
  easing?: boolean // Whether to start animation, default is true
  easingDuration?: number // Default 500 ms
  scrollToCenter?: boolean // Whether to force scroll to center
}

ctx.playground.config.scrollToView({
  bounds: ctx.document.getNode('start').bounds,
})
```

### zoomin

Zoom In

### zoomout

Zoom Out

### getPoseFromMouseEvent

Convert browser mouse position to canvas coordinate system

```ts pure

const pos: { x: number, y: number } = ctx.playground.config.getPoseFromMouseEvent(domMouseEvent)

```

### scroll

Scroll canvas, need to pass in the scroll position, and whether to smooth scroll, scroll time

```ts pure
ctx.playground.config.scroll({ scrollX: 100, scrollY: 100 }, true, 300)
```

### isViewportVisible

Determine whether the current node is within the viewport

```ts pure
ctx.playground.config.isViewportVisible(node.bounds)
```
