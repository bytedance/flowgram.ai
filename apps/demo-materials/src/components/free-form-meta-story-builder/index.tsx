/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { useMemo } from 'react';

import { cloneDeep } from 'lodash-es';
import {
  FormMeta,
  FreeLayoutProps,
  WorkflowJSON,
  WorkflowNodeJSON,
} from '@flowgram.ai/free-layout-editor';

import { FreeEditor } from '../free-editor';
import { insertNodesInEdges } from './utils';
import { INITIAL_DATA } from './initial-data';
import {
  CUSTOM_REGISTRY,
  DEFAULT_FORM_META,
  END_REGISTRY,
  START_REGISTRY,
  BLOCK_START_REGISTRY,
  BLOCK_END_REGISTRY,
  VARIABLE_REGISTRY,
} from './constants';

type NodeId = string;
interface PropsType {
  formMeta?: FormMeta;
  initialData?: WorkflowJSON;
  filterEndNode?: boolean;
  filterStartNode?: boolean;
  addNodeBeforeCustom?: WorkflowNodeJSON[];
  addNodeAfterCustom?: WorkflowNodeJSON[];
  transformInitialNode?: Record<NodeId, (node: WorkflowNodeJSON) => WorkflowNodeJSON>;
  plugins?: FreeLayoutProps['plugins'];
  transformRegistry?: (registry: FreeLayoutProps) => FreeLayoutProps;
}

export function FreeFormMetaStoryBuilder(props: PropsType) {
  const {
    formMeta = DEFAULT_FORM_META,
    initialData,
    filterEndNode = false,
    filterStartNode = false,
    addNodeBeforeCustom,
    addNodeAfterCustom,
    transformInitialNode,
    transformRegistry,
    plugins,
  } = props;

  const registries = useMemo(
    () => [
      START_REGISTRY,
      END_REGISTRY,
      BLOCK_START_REGISTRY,
      BLOCK_END_REGISTRY,
      VARIABLE_REGISTRY,
      {
        ...CUSTOM_REGISTRY,
        formMeta: {
          ...formMeta,
        },
      },
    ],
    [formMeta]
  );

  const initialDataWithDefault = useMemo(() => {
    const nodes = [
      ...(initialData?.nodes || []),
      ...(addNodeBeforeCustom || []),
      ...(addNodeAfterCustom || []),
      ...INITIAL_DATA.nodes
        .filter((node) => !initialData?.nodes?.find((item) => item.id === node.id))
        .filter((node) => {
          if (node.type === 'start') {
            return !filterStartNode;
          }
          if (node.type === 'end') {
            return !filterEndNode;
          }
          return true;
        })
        .map((node) => {
          if (transformInitialNode?.[node.id]) {
            return transformInitialNode[node.id](cloneDeep(node));
          }
          return node;
        }),
    ];

    let edges = [...(initialData?.edges || []), ...INITIAL_DATA.edges];

    if (addNodeBeforeCustom?.length) {
      edges = [
        ...insertNodesInEdges(
          addNodeBeforeCustom,
          edges.filter((edge) => edge.targetNodeID === 'custom_0')
        ).newEdges,
        ...edges.filter((edge) => edge.targetNodeID !== 'custom_0'),
      ];
    }

    if (addNodeAfterCustom?.length) {
      edges = [
        ...insertNodesInEdges(
          addNodeAfterCustom,
          edges.filter((edge) => edge.sourceNodeID === 'custom_0')
        ).newEdges,
        ...edges.filter((edge) => edge.sourceNodeID !== 'custom_0'),
      ];
    }

    // remove edges that connected to non-existent nodes
    edges = [...(initialData?.edges || []), ...INITIAL_DATA.edges].filter(
      (edge) =>
        nodes.find((_node) => _node.id === edge.sourceNodeID) ||
        nodes.find((_node) => _node.id === edge.targetNodeID)
    );

    return {
      nodes,
      edges,
    };
  }, [initialData, filterEndNode, filterStartNode]);

  return (
    <div>
      <FreeEditor
        registries={registries}
        initialData={initialDataWithDefault}
        plugins={plugins}
        transformRegistry={transformRegistry}
      />
    </div>
  );
}
