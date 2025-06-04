import {
  FlowLayoutDefault,
  FlowNodeBaseType,
  type FlowNodeEntity,
  type FlowNodeJSON,
  type FlowNodeRegistry,
} from '@flowgram.ai/document';

import {
  CatchBlockRegistry,
  CatchInlineBlocksRegistry,
  MainInlineBlocksRegistry,
  TryBlockRegistry,
  TryCatchSpacings,
  TryCatchTypeEnum,
  TrySlotRegistry,
} from './try-catch-extends';

/**
 * try catch 节点
 */
export const TryCatchRegistry: FlowNodeRegistry = {
  type: 'tryCatch',
  meta: {
    hidden: true,
    inlineSpacingAfter: TryCatchSpacings.INLINE_SPACING_BOTTOM,
  },
  /**
   * 结构
   * tryCatch
   *    - tryCatchIcon
   *    - mainInlineBlocks
   *        - tryBlock // try 分支
   *          - trySlot // 空节点用来占位，try 分支一开始没有节点
   *        - catchInlineBlocks
   *            - catchBlock // catch 分支 1
   *              - blockOrderIcon
   *              - node1
   *            - catchBlock // catch 分支 2
   *              - blockOrderIcon
   *              - node 2
   * @param node
   * @param json
   */
  onCreate(node: FlowNodeEntity, json: FlowNodeJSON) {
    const { document } = node;
    const [tryBlock, ...catchBlocks] = json.blocks || [];
    const addedNodes: FlowNodeEntity[] = [];
    const tryCatchIconNode = document.addNode({
      id: `$tryCatchIcon$${node.id}`,
      type: FlowNodeBaseType.BLOCK_ICON,
      originParent: node,
      parent: node,
    });
    const mainBlockNode = document.addNode({
      id: `$mainInlineBlocks$${node.id}`,
      type: TryCatchTypeEnum.MAIN_INLINE_BLOCKS,
      originParent: node,
      parent: node,
    });
    const tryBlockNode = document.addNode({
      id: tryBlock.id,
      type: tryBlock.type || TryCatchTypeEnum.TRY_BLOCK,
      originParent: node,
      parent: mainBlockNode,
      data: tryBlock.data,
    });
    const trySlotNode = document.addNode({
      id: `$trySlot$${tryBlock.id}`,
      hidden: true,
      type: TryCatchTypeEnum.TRY_SLOT, // 占位节点
      originParent: node,
      parent: tryBlockNode,
    });
    const catchInlineBlocksNode = document.addNode({
      id: `$catchInlineBlocks$${node.id}`,
      type: TryCatchTypeEnum.CATCH_INLINE_BLOCKS,
      originParent: node,
      parent: mainBlockNode,
    });
    addedNodes.push(
      tryCatchIconNode,
      mainBlockNode,
      tryBlockNode,
      trySlotNode,
      catchInlineBlocksNode
    );
    (tryBlock.blocks || []).forEach((blockData) => {
      document.addNode(
        {
          ...blockData,
          parent: tryBlockNode,
        },
        addedNodes
      );
    });
    catchBlocks.forEach((blockData) => {
      document.addBlock(node, blockData, addedNodes);
    });
    return addedNodes;
  },
  /**
   * 添加 catch 分支
   * @param node
   * @param blockData
   * @param addedNodes
   */
  onBlockChildCreate(node, blockData, addedNodes) {
    const parent = node.document.getNode(`$catchInlineBlocks$${node.id}`);
    const block = node.document.addNode({
      id: blockData.id,
      type: blockData.type || TryCatchTypeEnum.CATCH_BLOCK,
      originParent: node,
      parent,
      data: blockData.data,
    });
    // 分支开始节点
    const blockOrderIcon = node.document.addNode({
      id: `$blockOrderIcon$${blockData.id}`,
      type: FlowNodeBaseType.BLOCK_ORDER_ICON,
      originParent: node,
      parent: block,
    });
    if (blockData.blocks) {
      node.document.addBlocksAsChildren(block, blockData.blocks || [], addedNodes);
    }
    addedNodes?.push(block, blockOrderIcon);
    return block;
  },
  getInputPoint(transform) {
    const tryCatchIcon = transform.firstChild!;
    // 使用图标的 inputPoint
    return tryCatchIcon.inputPoint;
  },
  getOutputPoint(transform, layout) {
    const isVertical = FlowLayoutDefault.isVertical(layout);
    const tryCatchIcon = transform.firstChild!;
    if (isVertical) {
      return {
        x: tryCatchIcon.inputPoint.x,
        y: transform.bounds.bottom,
      };
    }
    return {
      x: transform.bounds.right,
      y: tryCatchIcon.inputPoint.y,
    };
  },
  /**
   * tryCatch 子节点配置
   */
  extendChildRegistries: [
    /**
     * icon 节点
     */
    {
      type: FlowNodeBaseType.BLOCK_ICON,
      meta: {
        spacing: TryCatchSpacings.INLINE_SPACING_TOP,
      },
      getLabels() {
        return [];
      },
    },
    MainInlineBlocksRegistry,
    CatchInlineBlocksRegistry,
    TryBlockRegistry,
    CatchBlockRegistry,
    TrySlotRegistry,
  ],
};
