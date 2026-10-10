# useNodeRender

提供节点渲染相关的方法, 返回结果的 form 等价于 [getNodeForm](/api/utils/get-node-form.md)

## 固定布局

* Return: [NodeRenderReturnType](https://flowgram.ai/auto-docs/fixed-layout-editor/interfaces/NodeRenderReturnType.html)

```tsx pure

import { FlowNodeEntity, useNodeRender } from '@flowgram.ai/fixed-layout-editor';

export const BaseNode = ({ node }: { node: FlowNodeEntity }) => {
  /**
   * 提供节点渲染相关的方法
   */
  const nodeRender = useNodeRender();
  /**
   * 只有在节点引擎开启时候才能使用表单
   */
  const form = nodeRender.form;

  return (
    <div
      className="demo-fixed-node"
      /*
       * onMouseEnter 加到固定布局节点主要是为了监听 分支线条的 hover 高亮
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
         * 用于精确控制分支节点的样式
         * isBlockIcon: 整个 condition 分支的 头部节点
         * isBlockOrderIcon: 分支的第一个节点
         */
        ...(nodeRender.isBlockOrderIcon || nodeRender.isBlockIcon ? { width: 260 } : {}),
      }}
    >
      {form?.render()}
    </div>
  );
};

```

## 自由布局

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
