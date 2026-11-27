/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { Rectangle } from '@flowgram.ai/utils';
import { FlowDocument, FlowNodeRenderData, FlowNodeTransformData } from '@flowgram.ai/document';
import { EntityManager } from '@flowgram.ai/core';

import { FlowSelectConfigEntity } from '../../src/entities/flow-select-config-entity';
import { FLOW_SELECTED_NODES } from '../../__mocks__/flow-selected-nodes.mock';
import { createDocumentContainer } from '../../__mocks__/flow-document-container.mock';

describe('flow-select-config-entity', () => {
  let document: FlowDocument;
  let configEntity: FlowSelectConfigEntity;
  let transformVisibles: FlowNodeTransformData[] = [];
  beforeEach(() => {
    const container = createDocumentContainer();
    document = container.get(FlowDocument);
    configEntity = container.get(EntityManager).getEntity(FlowSelectConfigEntity, true)!;
    document.fromJSON(FLOW_SELECTED_NODES);
    document.transformer.refresh();
    transformVisibles = document
      .getRenderDatas(FlowNodeTransformData, false)
      .filter((transform) => {
        const { entity } = transform;
        if (entity.originParent) {
          return entity.getNodeMeta().selectable && entity.originParent.getNodeMeta().selectable;
        }
        return entity.getNodeMeta().selectable;
      });
  });
  it('base', () => {
    expect(configEntity.selectedNodes.length).toEqual(0);
    expect(configEntity.getSelectedBounds().width).toEqual(0);
    const node = document.getNode('createRecord_47e8fe1dfc3')!;
    configEntity.selectedNodes = [node];
    expect(configEntity.selectedNodes.map((n) => n.id)).toEqual(['createRecord_47e8fe1dfc3']);
    expect(configEntity.getSelectedBounds().width).toEqual(300);
    configEntity.clearSelectedNodes();
    expect(configEntity.getSelectedBounds().width).toEqual(0);
  });
  it('select from bounds', () => {
    const bounds = new Rectangle(-150, 630, 300, 80);
    configEntity.selectFromBounds(bounds, transformVisibles);
    expect(configEntity.selectedNodes.map((n) => n.id)).toEqual(['exclusiveSplit_30baf8b1da0']);
  });

  it('activates the selectable child hit by the box when its origin parent is unselectable', () => {
    const child = document.getNode('createRecord_47e8fe1dfc3')!;
    const parent = document.getNode('exclusiveSplit_30baf8b1da0')!;
    const transform = child.getData(FlowNodeTransformData)!;
    child.originParent = parent;
    const parentMeta = vi.spyOn(parent, 'getNodeMeta').mockReturnValue({
      ...parent.getNodeMeta(),
      selectable: false,
    });
    try {
      configEntity.selectFromBounds(transform.bounds, [transform]);
      expect(configEntity.selectedNodes.map((node) => node.id)).toEqual([child.id]);
      expect(child.getData(FlowNodeRenderData)!.activated).toBe(true);
      expect(parent.getData(FlowNodeRenderData)!.activated).toBeFalsy();
    } finally {
      parentMeta.mockRestore();
    }
  });
});
