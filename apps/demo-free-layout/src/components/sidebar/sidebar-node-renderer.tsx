import { useNodeRender, FlowNodeEntity } from '@flowgram.ai/free-layout-editor';

import { NodeRenderContext } from '../../context';

export function SidebarNodeRenderer(props: { node: FlowNodeEntity }) {
  const { node } = props;
  const nodeRender = useNodeRender(node);

  return (
    <NodeRenderContext.Provider value={nodeRender}>
      {nodeRender.form?.render()}
    </NodeRenderContext.Provider>
  );
}
