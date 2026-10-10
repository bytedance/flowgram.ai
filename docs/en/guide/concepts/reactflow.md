# Comparison with ReactFlow

[Reactflow](https://reactflow.dev/) is an excellent open-source project with clear architecture and code. However, it focuses on low-level flow rendering engine architecture (Node, Edge, Handle), requiring extensive development at the upper layer to adapt to complex scenarios (such as fixed layouts, which need data modeling and layout algorithms). Advanced features are paid.

Compared to ReactFlow, FlowGram aims to provide a complete out-of-the-box solution for flow editing.

* Below are the pro paid features officially provided by ReactFlow

| Paid Features                    | Supported by FlowGram | Future Plan |
|----------------------------------|------------------------|--------------|
| Grouping                         | Supported             |              |
| redo/undo                        | Supported             |              |
| copy/paste                       | Supported             |              |
| HelpLines                        | Supported             |              |
| Custom nodes and shapes          | Supported             |              |
| Custom edges                     | Supported             |              |
| AutoLayout                       | Supported             |              |
| ForceLayout                      | Not Supported         | No           |
| Expand/Collapse                  | Supported             |              |
| Collaborative                    | Not Supported         | Yes          |
| WorkflowBuilder (Fixed Layout Example) | Supported             |              |

* ReactFlow events are bound to atomized DOM nodes and built-in, making interaction customization costly. Deep development requires understanding its source code. For example, it's difficult to select points when the canvas is zoomed out:

<table>
  <tr>
    <td>
      <div className="rs-tip">Since events are bound to SVG, it's difficult to click on elements when zoomed out</div>

      <img loading="lazy" src="/reactflow/reactflow-render.gif" />
    </td>

    <td>
      <div className="rs-tip">FlowGram's events use global mousemove monitoring and calculate positions with Threshold, allowing clicks even when zoomed out, while also supporting edge reconnection</div>

      <img loading="lazy" src="/reactflow/reactflow-interaction.gif" />
    </td>
  </tr>
</table>
