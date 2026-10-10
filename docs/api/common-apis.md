# 常用 API

## FlowDocument （自动化布局文档数据）

```ts
// 通过 hook 获取，也可以通过ctx
const doc = useService<FlowDocument>(FlowDocument)

doc.fromJSON(data) // 加载数据
doc.getAllNodes() // 获取所有节点
doc.traverseDFS(node => {}) // 深度遍历节点
doc.toJSON() // TODO 这里老版本的数据，还没优化，业务最好自己使用 traverseDFS 实现 json 转换

doc.addFromNode(targetNode, json) // 插入到指定节点的后边

doc.onNodeCreate(({ node, json }) => {}) // 监听节点创建，data 为创建时候的json数据
doc.onNodeDispose(({ node }) => {}) // 监听节点删除
```

## WorkflowDocument (自由连线布局文档数据) 继承自 FlowDocument

```ts
const doc = useService<WorkflowDocument>(WorkflowDocument)

doc.fromJSON(data) // 加载数据
doc.toJSON() // 导出数据
doc.getAllNodes() // 获取所有节点
doc.linesManager.getAllLines() // 获取所有线条

// 创建节点
doc.createWorkflowNode({ id: nanoid(), type: 'xxx', data: {}, meta: { position: { x: 0, y: 0 } } })
// 创建线条，from和to 为对应要连线的节点id， fromPort, toPort 如果为单个端口可以不指定
doc.linesManager.createLine({ from, to, fromPort, toPort })

// 监听变化，这里会监听线条和节点等事件
doc.onContentChange((e) => {

})
```

## FlowNodeEntity（节点）

```ts
node.flowNodeType // 当前节点的type类型
node.transform.bounds // 获取节点的外围矩形框, 包含 x,y,width,height
node.updateExtInfo({ title: 'xxx' }) // 设置扩展数据, 响应式会刷新节点
node.getExtInfo<T>() // 获取扩展数据
node.getNodeRegister() // 拿到当前节点的定义

node.dispose() // 删除节点

// renderData 是 节点 ui相关数据
const renderData = node.renderData
renderData.node // 当前节点的domNode
renderData.expanded // 当前节点是否展开，可以设置

// 拿到所有上游输入和输出节点（自由连线布局）
node.getData<WorkflowNodeLinesData>(WorkflowNodeLinesData).allInputNodes
node.getData<WorkflowNodeLinesData>(WorkflowNodeLinesData).allOutputNodes
```

## Playground （画布）

```ts
// 通过 hook 获取，也可以通过ctx
const playground = useService(Playground)

// 滚动到指定的节点并居中
ctx.playground.config.scrollToView({
   entities: [node]
   scrollToCenter： true
   easing: true // 缓动动画
})

// 滚动画布
ctx.playground.config.scroll({
  scrollX: 0
  scrollY: 0
})

// 适配屏幕
ctx.playground.config.fitView(
  doc.root.getData<FlowNodeTransformData>().bounds, // 需要居中的矩形框，这里拿节点根节点的大小代表最大的框
  true， // 是否缓动
  20, // padding，留出空白间距
)

// 缩放
ctx.playground.config.zoomin()
ctx.playground.config.zoomout()
ctx.playground.config.finalScale // 当前缩放比例
```

## SelectionService (选择器)

```ts
const selectionService = useService<SelectionService>()

selection.selection // 返回当前选中的节点数组，也可以修改，如选中节点 seleciton.selection = [node]

selection.onSelectionChanged(() => {}) // 监听变化
```
