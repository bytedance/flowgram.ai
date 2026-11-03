/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { describe, expect, it } from 'vitest';

import { FlowDocument, FlowDocumentConfigEnum, FlowOperationBaseService } from '../src';
import { createDocumentContainer } from './flow-document-container.mock';

describe('flow-document serialization', () => {
  it.each([
    ['n1', 'n2', 'b1', 'b2'],
    ['n2', 'n1', 'b2', 'b1'],
  ])(
    'serializes dragging %s after %s before the render refresh',
    (nodeId, dropId, fromId, toId) => {
      const container = createDocumentContainer();
      const document = container.get(FlowDocument);
      document.fromJSON({
        nodes: [
          {
            id: 'split',
            type: 'dynamicSplit',
            blocks: [
              { id: 'b1', blocks: [{ id: 'n1', type: 'noop', data: { title: 'first' } }] },
              { id: 'b2', blocks: [{ id: 'n2', type: 'noop', data: { title: 'second' } }] },
            ],
          },
        ],
      });
      document.transformer.refresh();
      const moving = document.getNode(nodeId)!;
      const drop = document.getNode(dropId)!;
      const movingJSON = moving.toJSON();
      const dropJSON = drop.toJSON();
      let parentAtRefresh: string | undefined;
      const refreshSubscription = document.onRefresh(() => {
        if (document.originTree.getParent(moving)?.id === toId) {
          parentAtRefresh = moving.parent?.id;
        }
      });

      container.get(FlowOperationBaseService).dragNodes({ dropNode: drop, nodes: [moving] });

      // Keep the previous render snapshot, as while a browser layer refresh is pending.
      expect(moving.parent?.id).toBe(fromId);
      expect(document.originTree.getParent(moving)?.id).toBe(toId);
      const expectedBlocks = ['b1', 'b2'].map((id) => ({
        id,
        type: 'block',
        ...(id === toId ? { blocks: [dropJSON, movingJSON] } : {}),
      }));
      const expected = {
        nodes: [{ id: 'split', type: 'dynamicSplit', blocks: expectedBlocks }],
      };
      expect(document.toJSON()).toEqual(expected);
      expect(document.getNode(toId)!.toJSON()).toEqual(expectedBlocks.find((b) => b.id === toId));

      document.transformer.refresh();
      refreshSubscription.dispose();
      expect(parentAtRefresh).toBe(toId);
      expect(document.toJSON()).toEqual(expected);
    }
  );

  it('serializes the original hierarchy when rendering refines an end branch', () => {
    const container = createDocumentContainer();
    const document = container.get(FlowDocument);
    document.config.set(FlowDocumentConfigEnum.END_NODES_REFINE_BRANCH, true);
    document.fromJSON({
      nodes: [
        {
          id: 'split',
          type: 'dynamicSplit',
          blocks: [
            { id: 'ended', blocks: [{ id: 'end', type: 'end', meta: { isNodeEnd: true } }] },
            { id: 'continuing', blocks: [{ id: 'noop', type: 'noop' }] },
          ],
        },
        { id: 'after', type: 'noop' },
      ],
    });
    const expected = document.toJSON();

    document.transformer.refresh();

    const after = document.getNode('after')!;
    expect(after.parent?.id).toBe('continuing');
    expect(document.originTree.getParent(after)).toBe(document.root);
    expect(document.toJSON()).toEqual(expected);

    document.getNode('continuing')!.collapsed = true;
    document.transformer.refresh();
    expect(document.toJSON()).toEqual(expected);
  });
});
