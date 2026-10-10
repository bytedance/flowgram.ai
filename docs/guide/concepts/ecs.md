# ECS

## 为什么需要 ECS

:::warning ECS （Entity-Component-System）
适合解耦大的数据对象，常用于游戏，游戏的每个角色（Entity）数据都非常庞大，需要拆分成如物理引擎相关数据、皮肤相关、角色属性等 (多个 Component)，供不同的子系统（System）消费。流程的数据结构复杂，很适合用ECS做拆解

:::

<img loading="lazy" className="invert-img" src="/ecs.png" />

## 方案对比

我们对比两个数据方案：

### 1. ReduxStore 方案

```jsx pure
const store = () => ({
  nodes: [{
    position: any
    form: any
    data3: any

  }],
  edges: []
})

function Playground() {
  const { nodes } = useStore(store)

  return nodes.map(node => <Node data={node} />)
}
```

优点：

* 中心化数据管理使用简单

缺点：

* 中心化数据管理无法精确更新，带来性能瓶颈
* 扩展性差，节点新增一个数据，都耦合到一个 大JSON 里

### 2. ECS 方案

备注：

* NodeData 对应的是 ECS - Component
* Layer 对应 ECS - System

```jsx pure

/**
  *  画布文档数据
  */
class FlowDocument {
  /**
*  * 节点数据定义, 节点创建时候会把数据实例化
    */
  nodeDefines: [
    NodePositionData,
    NodeFormData,
    NodeLineData
  ]
  nodeEntities: Entity[] = []
}

/**
 *  节点
 */
class FlowNodeEntity {
  id: string // 只有id 不带数据
  getData: (dataId: string) => EntityData
}

// 渲染线条
class LinesLayer {
  /**
   *  内部通过 node.getData(NodeLineData) 获取对应的数据，下同
   */
  @observeEntityData(FlowNodeEntity, NodeLineData) lines: NodeLineData[]
  render() {
    // 渲染线条
    return this.lines.map(line => <Line data={line} />)
  }
}

// 渲染节点位置
class NodePositionsLayer {
  @observeEntityData(FlowNodeEntity, NodePositionData) positions: NodePositionData[]
  render() {
    // 渲染位置及排版
  }
}

// 渲染节点表单
class  NodeFormsLayer {
  @observeEntityData(FlowNodeEntity, NodeFormData) contents: NodeFormData[]
  render() {
    // 渲染节点内容
  }
}


/**
 * 画布实例，通过 Layer 分层渲染
 */
class Playground {
  layers: [
    LinesLayer, // 线条渲染
    NodePositionsLayer, // 位置渲染
    NodeFormsLayer // 内容渲染
  ]，
  render() {
    // 画布分层渲染
    return this.layers.map(layer => layer.render())
  }
}
```

优点：

* 节点数据拆开来单独控制渲染，性能可做到精确更新
* 扩展性强，新增一个节点数据，则新增一个 XXXData + XXXLayer

缺点：

* 有一定学习成本
