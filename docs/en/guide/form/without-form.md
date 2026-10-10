# Without Form

When the node engine is disabled, the node's data will be stored in `node.getExtInfo`, as shown below

```tsx pure

export const useEditorProps = () => {
  return {
    // ...
    nodeEngine: {
      enable: false, // Node engine disabled, form cannot be used
    },
    history: {
      enable: true,
      enableChangeNode: false // No longer monitor form data changes
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
