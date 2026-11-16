/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { ScopeChain, Scope } from '../src';

/**
 * 规则：
 * - Global 覆盖所有 Scope，所有 Scope 依赖 Global
 * - 存在环路：cycle1 -> cycle2 -> cycle3 -> cycle1
 */

export class MockScopeChain extends ScopeChain {
  getDeps(scope: Scope): Scope[] {
    const res: Scope[] = [];
    if (scope.id === 'global') {
      return [];
    }

    const global = this.variableEngine.getScopeById('global');
    if (global) {
      res.push(global);
    }

    // 模拟循环依赖场景
    if (String(scope.id).startsWith('cycle')) {
      return this.variableEngine
        .getAllScopes()
        .filter((_scope) => String(_scope.id).startsWith('cycle') && _scope.id !== scope.id);
    }

    return res;
  }

  getCovers(scope: Scope): Scope[] {
    return this.getCoversFromDeps(scope);
  }

  sortAll(): Scope[] {
    return this.variableEngine.getAllScopes();
  }
}
