import { useCallback, useContext, useEffect, useMemo } from 'react';

import {
  PlaygroundEntityContext,
  useRefresh,
  useClientContext,
} from '@flowgram.ai/free-layout-editor';
import { SideSheet } from '@douyinfe/semi-ui';

import { FlowNodeMeta } from '../../typings';
import { SidebarContext, IsSidebarContext } from '../../context';
import { SidebarNodeRenderer } from './sidebar-node-renderer';

export const SidebarRenderer = () => {
  const { nodeId, setNodeId } = useContext(SidebarContext);
  const { selection, playground, document } = useClientContext();
  const refresh = useRefresh();
  const handleClose = useCallback(() => {
    setNodeId(undefined);
  }, []);
  const node = nodeId ? document.getNode(nodeId) : undefined;
  /**
   * Listen readonly
   */
  useEffect(() => {
    const disposable = playground.config.onReadonlyOrDisabledChange(() => {
      handleClose();
      refresh();
    });
    return () => disposable.dispose();
  }, [playground]);
  /**
   * Listen selection
   */
  useEffect(() => {
    const toDispose = selection.onSelectionChanged(() => {
      /**
       * 如果没有选中任何节点，则自动关闭侧边栏
       * If no node is selected, the sidebar is automatically closed
       */
      if (selection.selection.length === 0) {
        handleClose();
      } else if (selection.selection.length === 1 && selection.selection[0] !== node) {
        handleClose();
      }
    });
    return () => toDispose.dispose();
  }, [selection, handleClose, node]);
  /**
   * Close when node disposed
   */
  useEffect(() => {
    if (node) {
      const toDispose = node.onDispose(() => {
        setNodeId(undefined);
      });
      return () => toDispose.dispose();
    }
    return () => {};
  }, [node]);

  const visible = useMemo(() => {
    if (!node) {
      return false;
    }
    const { disableSideBar = false } = node.getNodeMeta<FlowNodeMeta>();
    return !disableSideBar;
  }, [node]);

  if (playground.config.readonly) {
    return null;
  }
  /**
   * Add "key" to rerender the sidebar when the node changes
   */
  const content = node ? (
    <PlaygroundEntityContext.Provider key={node.id} value={node}>
      <SidebarNodeRenderer node={node} />
    </PlaygroundEntityContext.Provider>
  ) : null;

  return (
    <SideSheet mask={false} visible={visible} onCancel={handleClose}>
      <IsSidebarContext.Provider value={true}>{content}</IsSidebarContext.Provider>
    </SideSheet>
  );
};
