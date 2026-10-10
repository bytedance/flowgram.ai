# 不使用表单

当节点引擎不开启，节点的 data 数据会存在 `node.getExtInfo` 中, 如下

```tsx pure

export const useEditorProps = () => {
  return {
    // ...
    nodeEngine: {
      enable: false, // 不开启节点引擎，则无法使用 form
    },
    history: {
      enable: true,
      enableChangeNode: false // 不再监听表单数据变化
    },
    materials: {
      /**
       * Render Node
       */
      renderDefaultNode: ({ node }: WorkflowNodeProps) => {
        return (
          <WorkflowNodeRenderer className="demo-free-node" node={node}>
            <input value={node.getExtInfo()?.title} onChange={e => node.updateExtInfo({ title: e.target.value})}/>
          </WorkflowNodeRenderer>
        );
      },
    },
    // /...
  }
}

```
