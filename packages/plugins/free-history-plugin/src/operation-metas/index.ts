/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { resetLayoutOperationMeta } from './reset-layout';
import { moveChildNodesOperationMeta } from './move-child-nodes';
import { dragNodesOperationMeta } from './drag-nodes';
import { deleteNodeOperationMeta } from './delete-node';
import { deleteLineOperationMeta } from './delete-line';
import { changeLineDataOperationMeta } from './change-line-data';
import { addNodeOperationMeta } from './add-node';
import { addLineOperationMeta } from './add-line';

export const operationMetas = [
  addLineOperationMeta,
  deleteLineOperationMeta,
  addNodeOperationMeta,
  deleteNodeOperationMeta,
  resetLayoutOperationMeta,
  dragNodesOperationMeta,
  moveChildNodesOperationMeta,
  changeLineDataOperationMeta,
];
