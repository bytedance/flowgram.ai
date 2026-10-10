# WorkflowNodeRenderer(free)

Free layout node container

## Usage

```tsx pure
import { useNodeRender, WorkflowNodeRenderer } from '@flowgram.ai/free-layout-editor';

export const BaseNode = () => {
  /**
   * Provide methods related to node rendering
   */
  const { form } = useNodeRender()
  /**
   * WorkflowNodeRenderer will add node drag events and port rendering, if you want to deeply customize it, you can refer to the source code of the component:
   * https://github.com/bytedance/flowgram.ai/blob/main/packages/client/free-layout-editor/src/components/workflow-node-renderer.tsx
   */
  return (
    <WorkflowNodeRenderer
      className="demo-free-node"
      node={props.node}
      // Optional port color customization
      portPrimaryColor="#4d53e8"        // Active state color (linked/hovered)
      portSecondaryColor="#9197f1"      // Default state color
      portErrorColor="#ff4444"          // Error state color
      portBackgroundColor="#ffffff"     // Background color
    >
      {
        // Form rendering through formMeta generation
        form?.render()
      }
    </WorkflowNodeRenderer>
  )
};
```
