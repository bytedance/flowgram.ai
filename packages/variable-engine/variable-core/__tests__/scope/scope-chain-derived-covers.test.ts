/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { vi, describe, test, expect } from 'vitest';

import { VariableEngine } from '../../src';
import { getContainer } from '../../__mocks__/container';

vi.mock('nanoid', () => {
  let mockId = 0;
  return {
    nanoid: () => 'mocked-id-' + mockId++,
  };
});

describe('scope chain derives covers from deps', () => {
  const container = getContainer();
  const variableEngine = container.get(VariableEngine);

  const globalScope = variableEngine.createScope('global');
  const plainScope = variableEngine.createScope('plain');
  const cycle1 = variableEngine.createScope('cycle1');
  const cycle2 = variableEngine.createScope('cycle2');
  const cycle3 = variableEngine.createScope('cycle3');

  test('global covers all scopes that depend on it', () => {
    expect(globalScope.coverScopes.map((_scope) => _scope.id)).toEqual(['plain']);
  });

  test('cycle scopes derive covers symmetrically from deps', () => {
    expect(cycle1.depScopes.map((_scope) => _scope.id)).toEqual(['cycle2', 'cycle3']);
    expect(cycle1.coverScopes.map((_scope) => _scope.id)).toEqual(['cycle2', 'cycle3']);
    expect(cycle2.coverScopes.map((_scope) => _scope.id)).toEqual(['cycle1', 'cycle3']);
    expect(cycle3.coverScopes.map((_scope) => _scope.id)).toEqual(['cycle1', 'cycle2']);
    expect(plainScope.coverScopes).toEqual([]);
  });
});
