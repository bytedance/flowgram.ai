/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import type { ReactNode } from 'react';

export interface TreeNodeData<VariableMeta = any> {
  value: string | number;
  title: string;
  disabled?: boolean;
  disableCheckbox?: boolean;
  selectable?: boolean;
  checkable?: boolean;
  children?: TreeNodeData[];
  icon?: ReactNode;
  key: string;
  keyPath: string[];
  rootMeta?: VariableMeta;
  isRoot?: boolean;
}
