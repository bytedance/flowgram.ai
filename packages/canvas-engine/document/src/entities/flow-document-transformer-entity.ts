/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { Emitter } from '@flowgram.ai/utils';
import { ConfigEntity, type EntityOpts } from '@flowgram.ai/core';

import type { FlowDocument } from '../flow-document';
import { FlowNodeTransformData } from '../datas';

interface FlowDocumentTransformerEntityConfig extends EntityOpts {
  document: FlowDocument;
}

/**
 * 用于通知所有 layer 更新
 */
export class FlowDocumentTransformerEntity extends ConfigEntity<
  {
    loading: boolean;
    treeVersion: number;
  },
  FlowDocumentTransformerEntityConfig
> {
  static type = 'FlowDocumentTransformerEntity';

  protected onRefreshEmitter = new Emitter<void>();

  protected lastTransformVersion = -1;

  protected lastTreeVersion = -1;

  document: FlowDocument;

  /** Fires after the render structure, transforms, and layout have been refreshed. */
  readonly onRefresh = this.onRefreshEmitter.event;

  constructor(conf: FlowDocumentTransformerEntityConfig) {
    super(conf);
    this.document = conf.document;
    this.toDispose.push(
      this.document.originTree.onTreeChange(() => {
        this.config.treeVersion += 1;
        this.fireChange();
      })
    );
    this.toDispose.push(this.onRefreshEmitter);
  }

  getDefaultConfig(): { loading: boolean; treeVersion: number } {
    return {
      loading: true,
      treeVersion: 0,
    };
  }

  get loading(): boolean {
    return this.config.loading;
  }

  set loading(loading) {
    if (this.config.loading !== loading) {
      this.config.loading = loading;
      this.fireChange();
    }
  }

  /**
   * 更新矩阵结构 (这个只有在树结构变化时候才会触发，如：添加节点、删除节点、改变位置节点)
   */
  updateTransformsTree(): void {
    // 更新 node 结构树
    this.document.renderTree.traverse((node, depth, index) => {
      const transform = node.getData<FlowNodeTransformData>(FlowNodeTransformData)!;
      // 收起时清空子节点
      if (transform.collapsed) {
        transform.transform.clearChildren();
      }
      if (node.parent) {
        transform.setParentTransform(node.parent!.getData(FlowNodeTransformData));
      }
      // 更新 index
      node.index = index;
    });
  }

  clear(): void {
    this.lastTreeVersion = -1;
    this.lastTransformVersion = -1;
  }

  isTreeDirty(): boolean {
    const transformVersion = this.entityManager.getEntityDataVersion(FlowNodeTransformData);
    const isTreeVersionChanged = this.lastTreeVersion !== this.config.treeVersion;
    const isTransformVersionChanged = this.lastTransformVersion !== transformVersion;
    return isTreeVersionChanged || isTransformVersionChanged;
  }

  /**
   * 刷新节点的相对偏移
   */
  refresh(): void {
    const transformVersion = this.entityManager.getEntityDataVersion(FlowNodeTransformData);

    const isTreeVersionChanged = this.lastTreeVersion !== this.config.treeVersion;
    const isTransformVersionChanged = this.lastTransformVersion !== transformVersion;

    this.entityManager.changeEntityLocked = true;
    if (isTreeVersionChanged) {
      this.document.renderTree.updateRenderStruct(); // 重新调整 renderTree 结构
      this.updateTransformsTree(); // 更新树结构
      this.lastTreeVersion = this.config.treeVersion;
    }

    if (isTreeVersionChanged || isTransformVersionChanged) {
      // 位置计算不需要重新触发 Layer 刷新
      this.document.layout.update(); // 更新布局
      this.lastTransformVersion = this.entityManager.getEntityDataVersion(FlowNodeTransformData);
      this.lastTreeVersion = this.config.treeVersion;
      this.onRefreshEmitter.fire();
    }

    this.entityManager.changeEntityLocked = false;
  }
}
