/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

export * from './add-from-node';
import { ungroupOperationMeta } from './ungroup';
import { moveNodesOperationMeta } from './move-nodes';
import { moveChildNodesOperationMeta } from './move-child-nodes';
import { moveBlockOperationMeta } from './move-block';
import { deleteNodesOperationMeta } from './delete-nodes';
import { deleteNodeOperationMeta } from './delete-node';
import { deleteFromNodeOperationMeta } from './delete-from-node';
import { deleteChildNodeOperationMeta } from './delete-child-node';
import { deleteBlockOperationMeta } from './delete-block';
import { createGroupOperationMeta } from './create-group';
import { addNodesOperationMeta } from './add-nodes';
import { addNodeOperationMeta } from './add-node';
import { addFromNodeOperationMeta } from './add-from-node';
import { addChildNodeOperationMeta } from './add-child-node';
import { addBlockOperationMeta } from './add-block';

export const operationMetas = [
  deleteFromNodeOperationMeta,
  addFromNodeOperationMeta,
  addBlockOperationMeta,
  deleteBlockOperationMeta,
  createGroupOperationMeta,
  ungroupOperationMeta,
  moveNodesOperationMeta,
  deleteNodesOperationMeta,
  addNodesOperationMeta,
  moveBlockOperationMeta,
  addChildNodeOperationMeta,
  deleteChildNodeOperationMeta,
  moveChildNodesOperationMeta,
  addNodeOperationMeta,
  deleteNodeOperationMeta,
];
