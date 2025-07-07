/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { runFreeLayoutTest } from '../__mocks__/run-free-layout-test';
import { freeLayout1 } from '../__mocks__/free-layout-specs';

runFreeLayoutTest('Variable Free Layout Is Node Children Private', freeLayout1, {
  isNodeChildrenPrivate(node) {
    return false;
  },
});
