/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { lazy } from 'react';

import { createInjectMaterial } from '@/shared';

export const EditorVariableTree = createInjectMaterial(
  lazy(() =>
    import('./extensions/variable-tree').then((module) => ({ default: module.VariableTree }))
  ),
  {
    renderKey: 'EditorVariableTree',
  }
);

export const EditorVariableTagInject = createInjectMaterial(
  lazy(() =>
    import('./extensions/variable-tag').then((module) => ({ default: module.VariableTagInject }))
  ),
  {
    renderKey: 'EditorVariableTagInject',
  }
);

export const EditorInputsTree = createInjectMaterial(
  lazy(() => import('./extensions/inputs-tree').then((module) => ({ default: module.InputsTree }))),
  {
    renderKey: 'EditorInputsTree',
  }
);
