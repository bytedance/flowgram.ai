/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { FlowNodeEntity, FlowNodeJSON, FlowNodeFormData } from '@flowgram.ai/editor';

import { FixedLayoutProps } from './fixed-layout-props';

export function fromNodeJSON(
  opts: FixedLayoutProps,
  node: FlowNodeEntity,
  json: FlowNodeJSON,
  isFirstCreate: boolean
) {
  json = opts.fromNodeJSON ? opts.fromNodeJSON(node, json, isFirstCreate) : json;
  const formData = node.getData(FlowNodeFormData)!;
  // 如果没有使用表单引擎，将 data 数据填入 extInfo
  if (!formData) {
    if (json.data) {
      node.updateExtInfo(json.data, true);
    }
  } else {
    const defaultFormMeta = opts.nodeEngine?.createDefaultFormMeta?.(node);

    const formMeta = node.getNodeRegistry()?.formMeta || defaultFormMeta;

    if (formMeta) {
      if (isFirstCreate) {
        formData.createForm(formMeta, json.data);
      } else {
        formData.updateFormValues(json.data);
      }
    }
  }
}

export function toNodeJSON(opts: FixedLayoutProps, node: FlowNodeEntity): FlowNodeJSON {
  const nodesMap: Record<string, FlowNodeJSON> = {};
  let startNodeJSON: FlowNodeJSON;
  node.document.traverse((node) => {
    const isSystemNode = node.id.startsWith('$');
    if (isSystemNode) return;
    const formData = node.getData(FlowNodeFormData);
    let formJSON =
      formData && formData.formModel && formData.formModel.initialized
        ? formData.toJSON()
        : undefined;
    let nodeJSON: FlowNodeJSON = {
      id: node.id,
      type: node.flowNodeType,
      data: formData ? formJSON : node.getExtInfo(),
      blocks: [],
    };
    if (opts.toNodeJSON) {
      nodeJSON = opts.toNodeJSON(node, nodeJSON);
    }
    if (!startNodeJSON) startNodeJSON = nodeJSON;
    let parent = node.document.originTree.getParent(node);
    if (parent && parent.id.startsWith('$')) {
      parent = parent.originParent;
    }
    const parentJSON = parent ? nodesMap[parent.id] : undefined;
    if (parentJSON) {
      parentJSON.blocks?.push(nodeJSON);
    }
    nodesMap[node.id] = nodeJSON;
  }, node);

  // @ts-ignore
  return startNodeJSON;
}
