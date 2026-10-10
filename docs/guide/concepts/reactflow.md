# 对比 ReactFlow

[Reactflow](https://reactflow.dev/) 是很优秀的开源项目，架构及代码清晰，但偏流程渲染引擎的底层架构 (Node、Edge、Handle)，需要在上层开发大量功能才能适配复杂场景(如 固定布局，需要对数据建模写布局算法), 高级功能收费。

相比 Reactflow，FlowGram 的目标是提供流程编辑一整套开箱即用的解决方案。

* 下边是 Reactflow 官方提供的 pro 收费能力

| 付费功能                         | FlowGram 是否支持 | 未来计划支持 |
|----------------------------------|------------------------|--------------|
| 分组                             | 支持                   |              |
| redo/undo                        | 支持                   |              |
| copy/paste                       | 支持                   |              |
| HelpLines 辅助线                | 支持                   |              |
| 自定义节点及形状                 | 支持                   |              |
| 自定义线条                       | 支持                   |              |
| AutoLayout，自动布局整理         | 支持                   |              |
| ForceLayout，节点排斥效果        | 不支持                 | No           |
| Expand/Collapse                  | 支持                   |              |
| Collaborative 多人协同           | 不支持                 | Yes          |
| WorkflowBuilder 相当于固定布局完整案例 | 支持                   |              |

* Reactflow 事件都是绑定在原子化的 dom 节点上，且内置，交互定制成本高，需要理解它的源码才能深度开发，如下，在画布缩放很小时候无法选到点位

<table>
  <tr>
    <td>
      <div className="rs-tip">由于 事件是绑定在 svg 上，svg 在缩放后很容易点不到</div>

      <img loading="lazy" src="/reactflow/reactflow-render.gif" />
    </td>

    <td>
      <div className="rs-tip">FlowGram 的事件是一种全局监听 mousemove 变化，并通过计算及 Threshold  大致确定位置，即使缩放很小也能点到, 同时支持线条重连</div>

      <img loading="lazy" src="/reactflow/reactflow-interaction.gif" />
    </td>
  </tr>
</table>
