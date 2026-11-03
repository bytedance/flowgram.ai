/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { afterEach, describe, expect, it } from 'vitest';
import {
  FlowDocument,
  FlowDocumentConfigEnum,
  FlowNodeFormData,
  FormModelV2,
  Playground,
} from '@flowgram.ai/editor';

import { FlowOperationService } from '../src/types';
import { createContainer } from './create-container';

describe('fixed-layout serialization', () => {
  let container: ReturnType<typeof createContainer>;

  afterEach(() => {
    container?.get(Playground).dispose();
  });

  it.each([
    ['n1', 'n2', 'b1', 'b2'],
    ['n2', 'n1', 'b2', 'b1'],
  ])(
    'serializes dragging %s after %s before the render refresh',
    (nodeId, dropId, fromId, toId) => {
      container = createContainer({});
      const document = container.get(FlowDocument);
      document.fromJSON({
        nodes: [
          {
            id: 'split',
            type: 'dynamicSplit',
            data: { title: 'branches' },
            blocks: [
              {
                id: 'b1',
                data: { title: 'b1' },
                blocks: [{ id: 'n1', type: 'noop', data: { title: 'first' } }],
              },
              {
                id: 'b2',
                data: { title: 'b2' },
                blocks: [{ id: 'n2', type: 'noop', data: { title: 'second' } }],
              },
            ],
          },
        ],
      });
      document.transformer.refresh();
      const moving = document.getNode(nodeId)!;
      const drop = document.getNode(dropId)!;
      expect(moving.getData(FlowNodeFormData)).toBeUndefined();
      moving.updateExtInfo({ title: `updated ${nodeId}` });

      container
        .get<FlowOperationService>(FlowOperationService)
        .dragNodes({ dropNode: drop, nodes: [moving] });

      // Keep the previous render snapshot, as while a browser layer refresh is pending.
      expect(moving.parent?.id).toBe(fromId);
      expect(document.originTree.getParent(moving)?.id).toBe(toId);
      const expectedChildren = [
        {
          id: dropId,
          type: 'noop',
          data: { title: dropId === 'n1' ? 'first' : 'second' },
          blocks: [],
        },
        {
          id: nodeId,
          type: 'noop',
          data: { title: `updated ${nodeId}` },
          blocks: [],
        },
      ];
      const expectedBlocks = ['b1', 'b2'].map((id) => ({
        id,
        type: 'block',
        data: { title: id },
        blocks: id === toId ? expectedChildren : [],
      }));
      const expected = {
        nodes: [
          {
            id: 'split',
            type: 'dynamicSplit',
            data: { title: 'branches' },
            blocks: expectedBlocks,
          },
        ],
      };
      expect(document.toJSON()).toEqual(expected);
      expect(document.getNode(toId)!.toJSON()).toEqual(expectedBlocks.find((b) => b.id === toId));

      document.transformer.refresh();
      expect(moving.parent?.id).toBe(toId);
      expect(document.toJSON()).toEqual(expected);
      expect(document.getNode(toId)!.toJSON()).toEqual(expectedBlocks.find((b) => b.id === toId));
    }
  );

  it('serializes the original hierarchy when rendering refines an end branch', () => {
    container = createContainer({});
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
    expect(document.originTree.getParent(after)).toBe(document.root);
    expect(document.toJSON()).toEqual(expected);
  });

  it('preserves current form values and the custom toNodeJSON callback', () => {
    container = createContainer({
      nodeEngine: {},
      nodeRegistries: [
        {
          type: 'noop',
          formMeta: { render: () => undefined },
        },
      ],
      toNodeJSON(node, json) {
        return { ...json, data: { ...json.data, serializedId: node.id } };
      },
    });
    const document = container.get(FlowDocument);
    document.fromJSON({
      nodes: [{ id: 'form', type: 'noop', data: { title: 'initial' } }],
    });
    const node = document.getNode('form')!;
    const formModel = node.getData(FlowNodeFormData).getFormModel<FormModelV2>();
    expect(formModel.initialized).toBe(true);
    node.updateExtInfo({ title: 'extInfo' });
    formModel.setValueIn('title', 'updated');
    const expected = {
      id: 'form',
      type: 'noop',
      data: { title: 'updated', serializedId: 'form' },
      blocks: [],
    };

    expect(node.toJSON()).toEqual(expected);
    expect(document.toJSON()).toEqual({ nodes: [expected] });
    document.transformer.refresh();
    expect(document.toJSON()).toEqual({ nodes: [expected] });
  });

  it('preserves undefined data for an uninitialized form without falling back to extInfo', () => {
    container = createContainer({ nodeEngine: {} });
    const document = container.get(FlowDocument);
    document.fromJSON({
      nodes: [{ id: 'uninitialized', type: 'noop', data: { title: 'initial' } }],
    });
    const node = document.getNode('uninitialized')!;
    expect(node.getData(FlowNodeFormData).formModel.initialized).toBe(false);
    node.updateExtInfo({ title: 'extInfo' });
    const expected = {
      id: 'uninitialized',
      type: 'noop',
      data: undefined,
      blocks: [],
    };

    expect(node.toJSON()).toStrictEqual(expected);
    expect(document.toJSON()).toStrictEqual({ nodes: [expected] });
    document.transformer.refresh();
    expect(document.toJSON()).toStrictEqual({ nodes: [expected] });
  });
});
