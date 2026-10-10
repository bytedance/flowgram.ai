# Playground

画布实例

[> API Detail](https://flowgram.ai/auto-docs/core/classes/Playground.html)

```ts pure
const ctx = useClientContext()

console.log(ctx.playground)

```

## config

画布配置, 提供 zoom、scroll 等状态

[> API Detail](https://flowgram.ai/auto-docs/core/classes/PlaygroundConfigEntity.html)

### updateConfig

* zoom `number` 当前缩放比例
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

节点适应画布窗口, 需要传入节点的 bounds

```ts pure
/**
 * 适应大小
 * @param bounds {Rectangle} 目标大小
 * @param easing {number} 是否开启动画，默认开启
 * @param padding {number} 边界空白
 */
ctx.playground.config.fitView(node.bounds, true, 10)
```

### scrollToView

指定节点位置并滚动到画布可见区域, 如果位置已经在可见区域则不会滚动，除非加上 `scrollToCenter` 强制滚动

```ts pure

/**
 * 详细参数说明
 * @param opts {PlaygroundConfigRevealOpts}
**/
interface PlaygroundConfigRevealOpts {
  entities?: Entity[]
  position?: PositionSchema // 滚动到指定位置，并居中
  bounds?: Rectangle // 滚动的 bounds
  scrollDelta?: PositionSchema
  zoom?: number // 需要缩放的比例
  easing?: boolean // 是否开启缓动，默认开启
  easingDuration?: number // 默认 500 ms
  scrollToCenter?: boolean // 是否强制滚动到中心
}

ctx.playground.config.scrollToView({
  bounds: ctx.document.getNode('start').bounds,
})
```

### zoomin

放大画布

### zoomout

缩小画布

### getPoseFromMouseEvent

将浏览器鼠标位置转成画布坐标系

```ts pure

const pos: { x: number, y: number } = ctx.playground.config.getPoseFromMouseEvent(domMouseEvent)

```

### scroll

滚动画布, 需要传入滚动位置, 以及是否平滑滚动, 滚动时间

```ts pure
ctx.playground.config.scroll({ scrollX: 100, scrollY: 100 }, true, 300)
```

### isViewportVisible

判断当前节点是否在视窗以内

```ts pure
ctx.playground.config.isViewportVisible(node.bounds)
```
