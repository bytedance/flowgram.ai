# 画布引擎

## Playground

画布引擎底层会提供一套自己的坐标系, 主要由 Playground 驱动

```ts
interface Playground {
   node: HTMLDivElement // 画布挂载的dom节点
   toReactComponent() // 渲染为react 节点
   readonly: boolean // 只读模式
   config: PlaygroundConfigEntity // 包含 zoom，scroll 等画布数据
}
// hook 快速获取
const { playground } = useClientContext()
```

## Layer

:::warning P.S.

* 渲染层在底层建立了一套自己的坐标系，基于这个坐标系实现模拟滚动、缩放等逻辑，在算viewport时候节点也需要转换到该坐标系上
* 渲染按画布被拆分成多个层 (Layer)，分层设计是基于ECS的数据切割思想，不同 Layer 只监听自己想要的数据，独立渲染不干扰，Layer 可以理解为ECS的 System，即最终Entity数据消费的地方
* Layer 实现了类mobx的observer响应式动态依赖收集，数据更新会触发 autorun或render

:::

![切面编程](@/public/layer-uml.jpg)

* Layer 生命周期

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

Layer的定位其实和 Unity 游戏引擎 提供的 [MonoBehaviour](https://docs.unity3d.com/ScriptReference/MonoBehaviour.html) 类似， Unity 游戏引擎的脚本扩展都是基于这个，可以认为是最核心的设计，底层也是基于 C# 提供的反射 (Reflection) 能力的依赖注入

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

* Layer 的响应式更新

```ts
export class DemoLayer extends Layer {
    // 任意的inversify模块 的注入
    @inject(FlowDocument) document: FlowDocument
    // 监听单个Entity
    @observeEntity(SomeEntity) entity: SomeEntity
    // 监听多个Entity
    @observeEntities(SomeEntity) entities: SomeEntity[]
    // 监听 Entity的数据块（ECS - Component）变化
    @observeEntityDatas(SomeEntity, SomeEntityData) transforms: SomeEntityData[]
    autorun() {}
    render() {
      return <div></div>
    }
}
```

## FlowNodeEntity

* 节点是一颗树, 包含子节点 (blocks) 和父亲节点, 节点采用 ECS 架构

```ts
inteface FlowNodeEntity {
    id： string
    blocks: FlowNodeEntity[]
    pre?: FlowNodeEntity
    next?: FlowNodeEntity
    parent?: FlowNodeEntity
    collapsed: boolean // 是否展开
    getData(dataRegistry): NodeEntityData
    addData(dataRegistry)
}
```

## FlowNodeTransformData 节点的位置及大小数据

```ts
class FlowNodeTransformData {
    localTransform: Matrix, // 相对偏移, 只相对于同一个Block的上一个Sibling节点的偏移
    worldTransform: Matrix, // 绝对偏移, 相对于Parent和Sibling节点叠加后的偏移
    delta：Point // 居中居左偏移, 和Matrix独立，每个节点自己控制
    getSize(): Size, // 由自己(独立节点) 或者 子分支节点宽高间距计算得出
    getBounds(): Rectangle // 由worldMatix及 size 计算得出, 用于最终渲染，该范围也可用于确定高亮选中区域
    inputPoint(): Point // 输入点位置，一般是Block的第一个节点的中上位置(居中布局)
    outputPoint(): Point // 输出点位置，默认是节点中下位置，但条件分支，是由内置结束节点等具体逻辑判断得出
   // ...others
}
```

## FlowNodeRenderData 节点内容渲染数据

```ts
class FlowNodeRenderData {
  node: HTMLDivElement // 当前节点的dom
  expanded：boolean // 是否展开
  activated： boolean // 是否激活
  hidden： boolean // 是否隐藏
  // ...others
}
```

## FlowDocument

```ts
interface FLowDocument {
    root: FlowNodeEntity // 画布的根节点
    fromJSON(data): void // 导入数据
    toJSON(): FlowDocumentJSON // 导出数据
    addNode(type: string, meta: any): FlowNodeEntity // 添加节点
    travese(fn: (node: flowNodeEntity) => void, startNode = this.root) // 遍历
}
```
