/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';

import { WorkflowNodeType } from '@/nodes';

import { TodoWriteRender } from './todo-write-render';
import { GenericNodeRender } from './generic-node-render';
import { AskUserQuestionRender } from './ask-user-question-render';

export const createNodeRender = (nodeType: WorkflowNodeType) => {
  const NodeRender: React.FC<{ args: any; result?: any }> = ({ args, result }) => (
    <GenericNodeRender args={args} result={result} nodeType={nodeType} />
  );
  return NodeRender;
};

export { AskUserQuestionRender, TodoWriteRender, GenericNodeRender };
