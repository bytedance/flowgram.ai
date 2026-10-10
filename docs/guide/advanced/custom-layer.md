# 自定义 Layer

我们将画布拆分成多个 Layer，实现交互分层的思想，便于插件化管理，详细见 [画布引擎](/guide/concepts/canvas-engine.md)

1. 通过 `observeEntityDatas` `observeEntities` `observeEntity` 监听画布节点任意数据模块的更新
2. 通过 `onZoom` `onScroll` `onViewportChange` 等监听画布的缩放或者滚动
3. 通过 `render` 往画布中插入 react 元素, 如绘制 svg 线条

![Layer](@/public/layer-uml.jpg)

## 创建 Layer

```tsx pure
import { FreeLayoutPluginContext, inject, injectable, FlowNodeEntity, FlowNodeTransformData, FlowNodeFormData } from '@flowgram.ai/free-layout-editor'

@injectable()
export class MyLayer extends Layer {
  @inject(FreeLayoutPluginContext) ctx: FreeLayoutPluginContext
  // 可以监听节点的宽高位置变化
  @observeEntityDatas(FlowNodeEntity, FlowNodeTransformData) transformDatas: FlowNodeTransformData[];
  // 可以监听表单数据变化，连线数据可以存在表单里
  @observeEntityDatas(FlowNodeEntity, FlowNodeFormData) formDatas: FlowNodeFormData[];
  onReady() {
    // 也可以添加样式
    // zIndex可以控制是否要盖在节点, 节点默认是 10，大于 10 则在节点上边
    this.node.style.zIndex = 11;
  }
  onZoom(scale) {
    // 跟着画布缩放
    this.node.style.transform = `scale(${scale})`;
  }
  render() {
    return <div>{...}</div>
  }
}

```

## 加入到画布

* 通过 use-editor-props

```ts pure
{
  onInit: (ctx) => {
    ctx.playground.registerLayer(MyLayer)
  }
}
```

* 通过插件添加

```tsx pure
import { FreeLayoutPluginContext } from '@flowgram.ai/free-layout-editor'

export const createMyPlugin = definePluginCreator<{}, FreeLayoutPluginContext>({
  onInit: (ctx, opts) => {
    ctx.playground.registerLayer(MyLayer)
  },
});
```

## Layer 生命周期说明

```ts
interface Layer {
    /**
     * 初始化时候触发
     */
    onReady?(): void;

    /**
     * playground 大小变化时候会触发
     */
    onResize?(size: PipelineDimension): void;

    /**
     * playground focus 时候触发
     */
    onFocus?(): void;

    /**
     * playground blur 时候触发
     */
    onBlur?(): void;

    /**
     * 监听缩放
     */
    onZoom?(scale: number): void;

    /**
     * 监听滚动
     */
    onScroll?(scroll: { scrollX: number; scrollY: number }): void;

    /**
     * viewport 更新触发
     */
    onViewportChange?(): void;

    /**
     * readonly 或 disable 状态变化
     * @param state
     */
    onReadonlyOrDisabledChange?(state: { disabled: boolean; readonly: boolean }): void;

    /**
   * 数据更新自动触发react render，如果不提供则不会调用react渲染
   */
    render?(): JSX.Element
 }
```
