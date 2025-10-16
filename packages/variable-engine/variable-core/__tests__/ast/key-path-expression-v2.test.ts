/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { vi, describe, test, expect } from 'vitest';

import { getParentFields } from '../../src/ast/utils/variable-field';
import { ASTKind, VariableEngine, VariableDeclaration, ASTFactory } from '../../src';
import { getContainer } from '../../__mocks__/container';

const {
  createVariableDeclaration,
  createObject,
  createProperty,
  createString,
  createNumber,
  createKeyPathExpression,
  createArray,
  createEnumerateExpression,
} = ASTFactory;

vi.mock('nanoid', () => {
  let mockId = 0;
  return {
    nanoid: () => 'mocked-id-' + mockId++,
  };
});

/**
 * 测试通过表达式生成的变量
 */
describe('test Key Path Expression V2', () => {
  const container = getContainer();
  const variableEngine = container.get(VariableEngine);
  const globalScope = variableEngine.createScope('global');
  const testScope = variableEngine.createScope('test');

  const globalTestVariable = globalScope.ast.set<VariableDeclaration>(
    'test',
    createVariableDeclaration({
      key: 'source',
      type: createObject({
        properties: [
          createProperty({
            key: 'a',
            type: createString(),
          }),
          createProperty({
            key: 'b',
            type: createNumber(),
          }),
        ],
      }),
    })
  );

  test('init const test_key_path = source.a', () => {
    const variableByKeyPath = testScope.ast.set<VariableDeclaration>(
      'variableByKeyPath',
      createVariableDeclaration({
        key: 'test_key_path',
        initializer: createKeyPathExpression({
          keyPath: ['source', 'a'],
        }),
      })
    )!;

    expect(variableByKeyPath.initializer?.kind).toEqual(ASTKind.KeyPathExpression);
    expect(variableByKeyPath.initializer?.refs.map((_ref) => _ref?.key)).toEqual(['a']);
    // variableByKeyPath 的类型重新建立了实例，其父节点为当前节点
    expect(getParentFields(variableByKeyPath.type).map((_field) => _field?.key)).toEqual([
      'test_key_path',
    ]);
    expect(variableByKeyPath.type.toJSON()).toEqual({ kind: ASTKind.String });
    expect(variableByKeyPath.toJSON()).toMatchSnapshot();
  });

  test('subscribe variable changes by expression', () => {
    // const variableByKeyPath = source.a;
    const variableByKeyPath = testScope.output.getVariableByKey('test_key_path')!;

    let typeChangeTimes = 0;
    variableByKeyPath.onTypeChange((type) => {
      typeChangeTimes++;
      expect([typeChangeTimes, type?.toJSON()]).toMatchSnapshot();
    });

    // source.a 发生变化时，则响应更新变量
    // source.a -> boolean
    globalTestVariable.getByKeyPath(['a'])?.updateType(ASTKind.Boolean);
    expect(variableByKeyPath.type.toJSON()).toEqual({ kind: ASTKind.Boolean });
    expect(typeChangeTimes).toBe(1);

    // 改成引用 source.b，响应更新变量
    // const variableByKeyPath = source.b;
    variableByKeyPath.updateInitializer({
      kind: ASTKind.KeyPathExpression,
      keyPath: ['source', 'b'],
    });
    expect(variableByKeyPath.type.toJSON()).toEqual({ kind: ASTKind.Number });
    expect(typeChangeTimes).toBe(2);

    // source.b 被删除，变量类型变为空
    globalTestVariable.type.fromJSON({
      properties: [
        {
          key: 'a',
          type: ASTKind.String,
        },
      ],
    });

    expect(variableByKeyPath.type).toBeUndefined();
    expect(typeChangeTimes).toBe(3);

    // source.b 加回来，变量类型变回来且触发表达式更新
    globalTestVariable.type.fromJSON(
      createObject({
        properties: [
          createProperty({ key: 'a', type: createString() }),
          createProperty({ key: 'b', type: createNumber() }),
        ],
      })
    );
    expect(variableByKeyPath.type.toJSON()).toEqual({ kind: ASTKind.Number });
    expect(typeChangeTimes).toBe(4);

    // 改成 EnumerateExpression
    variableByKeyPath.updateInitializer(
      createEnumerateExpression({
        enumerateFor: createKeyPathExpression({
          keyPath: ['source', 'b'],
        }),
      })
    );
    expect(variableByKeyPath.type).toBeUndefined();
    expect(variableByKeyPath.initializer?.refs).toEqual([]);
    variableByKeyPath.initializer?.refreshRefs();
    expect(variableByKeyPath.initializer?.refs).toEqual([]);
    expect(typeChangeTimes).toBe(5);

    // 数组下钻，类型也会更新
    globalTestVariable.type.fromJSON(
      createObject({
        properties: [
          createProperty({
            key: 'b',
            type: createArray({
              items: createNumber(),
            }),
          }),
        ],
      })
    );
    expect(variableByKeyPath.type.toJSON()).toEqual({ kind: ASTKind.Number });
    expect(typeChangeTimes).toBe(6);
    expect(variableByKeyPath.toJSON()).toMatchSnapshot();

    // 原作用域删除，显示为空类型
    globalScope.dispose();
    expect(variableByKeyPath.scope.depScopes.map((_scope) => _scope.id)).toEqual([]);
    expect(variableByKeyPath.type).toBeUndefined();
    expect(typeChangeTimes).toBe(7);
  });

  const cycle1 = variableEngine.createScope('cycle1');
  const cycle2 = variableEngine.createScope('cycle2');
  const cycle3 = variableEngine.createScope('cycle3');

  test('cycle scope with normal refs', () => {
    const cycle1Var = cycle1.ast.set<VariableDeclaration>(
      'var',
      createVariableDeclaration({
        key: 'cycle1_var',
        type: createObject({
          properties: [
            createProperty({
              key: 'a',
              type: createArray({
                items: createString(),
              }),
            }),
          ],
        }),
      })
    );

    const cycle2Var = cycle2.ast.set<VariableDeclaration>(
      'var',
      createVariableDeclaration({
        key: 'cycle2_var',
        initializer: createEnumerateExpression({
          enumerateFor: createKeyPathExpression({
            keyPath: ['cycle1_var', 'a'],
          }),
        }),
      })
    );

    const cycle3Var = cycle3.ast.set<VariableDeclaration>(
      'var',
      createVariableDeclaration({
        key: 'cycle3_var',
        initializer: createKeyPathExpression({
          keyPath: ['cycle2_var'],
        }),
      })
    );

    expect(cycle1Var.type.toJSON()).toEqual({
      kind: ASTKind.Object,
      properties: [
        {
          kind: ASTKind.Property,
          key: 'a',
          type: {
            kind: ASTKind.Array,
            items: { kind: ASTKind.String },
          },
        },
      ],
    });
    expect(cycle2Var.type.toJSON()).toEqual({
      kind: ASTKind.String,
    });
    expect(cycle3Var.type.toJSON()).toEqual({
      kind: ASTKind.String,
    });
  });

  test('cycle scope with child ref', () => {
    const cycle1Var = cycle1.ast.get('var')! as VariableDeclaration;
    const cycle2Var = cycle2.ast.get('var')! as VariableDeclaration;
    const cycle3Var = cycle3.ast.get('var')! as VariableDeclaration;

    cycle1Var.fromJSON({
      type: createObject({
        properties: [
          createProperty({
            key: 'a',
            type: createArray({
              items: createString(),
            }),
          }),
          createProperty({
            key: 'b',
            initializer: createKeyPathExpression({
              keyPath: ['cycle3_var'],
            }),
          }),
        ],
      }),
    });

    expect(cycle1Var.type.toJSON()).toEqual({
      kind: ASTKind.Object,
      properties: [
        {
          kind: ASTKind.Property,
          key: 'a',
          type: {
            kind: ASTKind.Array,
            items: { kind: ASTKind.String },
          },
        },
        {
          kind: ASTKind.Property,
          key: 'b',
          initializer: {
            kind: ASTKind.KeyPathExpression,
            keyPath: ['cycle3_var'],
          },
          type: {
            kind: ASTKind.String,
          },
        },
      ],
    });
    expect(cycle2Var.type.toJSON()).toEqual({
      kind: ASTKind.String,
    });
    expect(cycle3Var.type.toJSON()).toEqual({
      kind: ASTKind.String,
    });
  });

  test('cycle scope with cycle ref', () => {
    const cycle1Var = cycle1.ast.get('var')! as VariableDeclaration;
    const cycle2Var = cycle2.ast.get('var')! as VariableDeclaration;
    const cycle3Var = cycle3.ast.get('var')! as VariableDeclaration;

    cycle1Var.fromJSON({
      type: createObject({
        properties: [
          createProperty({
            key: 'a',
            initializer: createKeyPathExpression({
              keyPath: ['cycle3_var'],
            }),
          }),
          createProperty({
            key: 'b',
            initializer: createKeyPathExpression({
              keyPath: ['cycle3_var'],
            }),
          }),
        ],
      }),
    });

    expect(cycle1Var.type.toJSON()).toEqual({
      kind: ASTKind.Object,
      properties: [
        {
          kind: ASTKind.Property,
          key: 'a',
          initializer: {
            kind: ASTKind.KeyPathExpression,
            keyPath: ['cycle3_var'],
          },
          // 发生循环引用时，type 清空
        },
        {
          kind: ASTKind.Property,
          key: 'b',
          initializer: {
            kind: ASTKind.KeyPathExpression,
            keyPath: ['cycle3_var'],
          },
          // 发生循环引用时，type 清空
        },
      ],
    });
    expect(cycle2Var.type?.toJSON()).toBeUndefined();
    expect(cycle3Var.type?.toJSON()).toBeUndefined();
  });
});
