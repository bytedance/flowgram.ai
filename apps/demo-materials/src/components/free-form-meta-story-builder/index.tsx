/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { useMemo } from 'react';

import { FormMeta, WorkflowJSON } from '@flowgram.ai/free-layout-editor';

import { FreeEditor } from '../free-editor';
import { INITIAL_DATA } from './initial-data';
import { CUSTOM_REGISTRY, DEFAULT_FORM_META, END_REGISTRY, START_REGISTRY } from './constants';

interface PropsType {
  formMeta?: FormMeta;
  initialData?: WorkflowJSON;
  customNodeFormInitialData?: Record<string, any>;
  filterEndNode?: boolean;
  filterStartNode?: boolean;
}

export function FreeFormMetaStoryBuilder(props: PropsType) {
  const {
    formMeta = DEFAULT_FORM_META,
    initialData,
    customNodeFormInitialData,
    filterEndNode = false,
    filterStartNode = false,
  } = props;

  const registries = useMemo(
    () => [
      START_REGISTRY,
      END_REGISTRY,
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
          if (node.type === 'custom') {
            return {
              ...node,
              data: {
                ...node.data,
                ...(customNodeFormInitialData || {}),
              },
            };
          }
          return node;
        }),
    ];

    const edges = [...(initialData?.edges || []), ...INITIAL_DATA.edges].filter(
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
      <FreeEditor registries={registries} initialData={initialDataWithDefault} />
    </div>
  );
}
