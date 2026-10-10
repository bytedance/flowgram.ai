# useNodeRender

Provides methods related to node rendering, and the form returned is equivalent to [getNodeForm](/en/api/utils/get-node-form.md)

## Fixed Layout

* Return: [NodeRenderReturnType](https://flowgram.ai/auto-docs/fixed-layout-editor/interfaces/NodeRenderReturnType.html)

```tsx pure

import { FlowNodeEntity, useNodeRender } from '@flowgram.ai/fixed-layout-editor';

export const BaseNode = ({ node }: { node: FlowNodeEntity }) => {
  /**
   * Provides methods related to node rendering
   */
  const nodeRender = useNodeRender();
  /**
   * Only available when the node engine is enabled
   */
  const form = nodeRender.form;

  return (
    <div
      className="demo-fixed-node"
      /*
       * Adding onMouseEnter to the fixed layout node is mainly to monitor the hover highlight of the branch line
       **/
      onMouseEnter={nodeRender.onMouseEnter}
      onMouseLeave={nodeRender.onMouseLeave}
      onMouseDown={e => {
        // trigger drag node
        nodeRender.startDrag(e);
        e.stopPropagation();
      }}
      style={{
        /**
         * Used to precisely control the style of the branch node
         * isBlockIcon: The header node of the entire condition branch
         * isBlockOrderIcon: The first node of the branch
         */
        ...(nodeRender.isBlockOrderIcon || nodeRender.isBlockIcon ? { width: 260 } : {}),
      }}
    >
      {form?.render()}
    </div>
  );
};

```

## Free Layout

* Return: [NodeRenderReturnType](https://flowgram.ai/auto-docs/free-layout-core/interfaces/NodeRenderReturnType.html)

```tsx pure
import { WorkflowNodeRenderer, useNodeRender } from '@flowgram.ai/free-layout-editor';
export const BaseNode = () => {
  const { form, node } = useNodeRender()
  return (
    <WorkflowNodeRenderer className="demo-free-node" node={node}>
      {form?.render()}
    </WorkflowNodeRenderer>
  )
}

```
