/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { describe, expect, it } from 'vitest';
import { WorkflowVariableType } from '@flowgram.ai/runtime-interface';

import { WorkflowRuntimeType } from './runtime-type';

describe('WorkflowRuntimeType', () => {
  describe('getWorkflowType', () => {
    describe('null and undefined values', () => {
      it('should return Null for null value', () => {
        const result = WorkflowRuntimeType.getWorkflowType(null);
        expect(result).toBe(WorkflowVariableType.Null);
      });

      it('should return Null for undefined value', () => {
        const result = WorkflowRuntimeType.getWorkflowType(undefined);
        expect(result).toBe(WorkflowVariableType.Null);
      });

      it('should return Null when no parameter is passed', () => {
        const result = WorkflowRuntimeType.getWorkflowType();
        expect(result).toBe(WorkflowVariableType.Null);
      });
    });

    describe('string values', () => {
      it('should return String for string value', () => {
        const result = WorkflowRuntimeType.getWorkflowType('hello');
        expect(result).toBe(WorkflowVariableType.String);
      });

      it('should return String for empty string', () => {
        const result = WorkflowRuntimeType.getWorkflowType('');
        expect(result).toBe(WorkflowVariableType.String);
      });

      it('should return String for string with spaces', () => {
        const result = WorkflowRuntimeType.getWorkflowType('  hello world  ');
        expect(result).toBe(WorkflowVariableType.String);
      });
    });

    describe('datetime values', () => {
      it('should return DateTime for valid ISO 8601 string with milliseconds and Z', () => {
        const result = WorkflowRuntimeType.getWorkflowType('2025-09-11T12:05:49.000Z');
        expect(result).toBe(WorkflowVariableType.DateTime);
      });

      it('should return DateTime for valid ISO 8601 string without milliseconds', () => {
        const result = WorkflowRuntimeType.getWorkflowType('2025-09-11T12:05:49Z');
        expect(result).toBe(WorkflowVariableType.DateTime);
      });

      it('should return DateTime for valid ISO 8601 string without Z suffix', () => {
        const result = WorkflowRuntimeType.getWorkflowType('2025-09-11T12:05:49.000');
        expect(result).toBe(WorkflowVariableType.DateTime);
      });

      it('should return String for invalid datetime strings', () => {
        const invalidDateTimes = [
          '2025-13-11T12:05:49.000Z', // Invalid month
          '2025-09-32T12:05:49.000Z', // Invalid day
          '2025-09-11T25:05:49.000Z', // Invalid hour
          '2025-09-11T12:65:49.000Z', // Invalid minute
          '2025-09-11T12:05:65.000Z', // Invalid second
          '2025-09-11 12:05:49.000Z', // Missing T separator
          'not-a-date', // Completely invalid
          '2025-09-11', // Date only
          '12:05:49', // Time only
        ];

        invalidDateTimes.forEach((invalidDateTime) => {
          const result = WorkflowRuntimeType.getWorkflowType(invalidDateTime);
          expect(result).toBe(WorkflowVariableType.String);
        });
      });
    });

    describe('boolean values', () => {
      it('should return Boolean for true', () => {
        const result = WorkflowRuntimeType.getWorkflowType(true);
        expect(result).toBe(WorkflowVariableType.Boolean);
      });

      it('should return Boolean for false', () => {
        const result = WorkflowRuntimeType.getWorkflowType(false);
        expect(result).toBe(WorkflowVariableType.Boolean);
      });
    });

    describe('number values', () => {
      it('should return Integer for positive integer', () => {
        const result = WorkflowRuntimeType.getWorkflowType(42);
        expect(result).toBe(WorkflowVariableType.Integer);
      });

      it('should return Integer for negative integer', () => {
        const result = WorkflowRuntimeType.getWorkflowType(-42);
        expect(result).toBe(WorkflowVariableType.Integer);
      });

      it('should return Integer for zero', () => {
        const result = WorkflowRuntimeType.getWorkflowType(0);
        expect(result).toBe(WorkflowVariableType.Integer);
      });

      it('should return Number for positive float', () => {
        const result = WorkflowRuntimeType.getWorkflowType(3.14);
        expect(result).toBe(WorkflowVariableType.Number);
      });

      it('should return Number for negative float', () => {
        const result = WorkflowRuntimeType.getWorkflowType(-3.14);
        expect(result).toBe(WorkflowVariableType.Number);
      });

      it('should return Number for very small decimal', () => {
        const result = WorkflowRuntimeType.getWorkflowType(0.001);
        expect(result).toBe(WorkflowVariableType.Number);
      });

      it('should return Number for Infinity', () => {
        const result = WorkflowRuntimeType.getWorkflowType(Infinity);
        expect(result).toBe(WorkflowVariableType.Number);
      });

      it('should return Number for -Infinity', () => {
        const result = WorkflowRuntimeType.getWorkflowType(-Infinity);
        expect(result).toBe(WorkflowVariableType.Number);
      });

      it('should return Number for NaN', () => {
        const result = WorkflowRuntimeType.getWorkflowType(NaN);
        expect(result).toBe(WorkflowVariableType.Number);
      });
    });

    describe('array values', () => {
      it('should return Array for empty array', () => {
        const result = WorkflowRuntimeType.getWorkflowType([]);
        expect(result).toBe(WorkflowVariableType.Array);
      });

      it('should return Array for array with numbers', () => {
        const result = WorkflowRuntimeType.getWorkflowType([1, 2, 3]);
        expect(result).toBe(WorkflowVariableType.Array);
      });

      it('should return Array for array with strings', () => {
        const result = WorkflowRuntimeType.getWorkflowType(['a', 'b', 'c']);
        expect(result).toBe(WorkflowVariableType.Array);
      });

      it('should return Array for mixed type array', () => {
        const result = WorkflowRuntimeType.getWorkflowType([1, 'hello', true, null]);
        expect(result).toBe(WorkflowVariableType.Array);
      });

      it('should return Array for nested arrays', () => {
        const result = WorkflowRuntimeType.getWorkflowType([
          [1, 2],
          [3, 4],
        ]);
        expect(result).toBe(WorkflowVariableType.Array);
      });
    });

    describe('object values', () => {
      it('should return Object for empty object', () => {
        const result = WorkflowRuntimeType.getWorkflowType({});
        expect(result).toBe(WorkflowVariableType.Object);
      });

      it('should return Object for simple object', () => {
        const result = WorkflowRuntimeType.getWorkflowType({ name: 'John', age: 30 });
        expect(result).toBe(WorkflowVariableType.Object);
      });

      it('should return Object for nested object', () => {
        const result = WorkflowRuntimeType.getWorkflowType({
          user: { name: 'John', profile: { age: 30 } },
        });
        expect(result).toBe(WorkflowVariableType.Object);
      });

      it('should return Object for Date object', () => {
        const result = WorkflowRuntimeType.getWorkflowType(new Date());
        expect(result).toBe(WorkflowVariableType.Object);
      });

      it('should return Object for RegExp object', () => {
        const result = WorkflowRuntimeType.getWorkflowType(/test/);
        expect(result).toBe(WorkflowVariableType.Object);
      });
    });

    describe('unsupported types', () => {
      it('should return null for function', () => {
        const result = WorkflowRuntimeType.getWorkflowType(() => {});
        expect(result).toBe(null);
      });

      it('should return null for symbol', () => {
        const result = WorkflowRuntimeType.getWorkflowType(Symbol('test'));
        expect(result).toBe(null);
      });

      it('should return null for bigint', () => {
        const result = WorkflowRuntimeType.getWorkflowType(BigInt(123));
        expect(result).toBe(null);
      });
    });
  });

  describe('isMatchWorkflowType', () => {
    describe('matching types', () => {
      it('should return true for matching string type', () => {
        const result = WorkflowRuntimeType.isMatchWorkflowType(
          'hello',
          WorkflowVariableType.String
        );
        expect(result).toBe(true);
      });

      it('should return true for matching boolean type', () => {
        const result = WorkflowRuntimeType.isMatchWorkflowType(true, WorkflowVariableType.Boolean);
        expect(result).toBe(true);
      });

      it('should return true for matching integer type', () => {
        const result = WorkflowRuntimeType.isMatchWorkflowType(42, WorkflowVariableType.Integer);
        expect(result).toBe(true);
      });

      it('should return true for matching number type', () => {
        const result = WorkflowRuntimeType.isMatchWorkflowType(3.14, WorkflowVariableType.Number);
        expect(result).toBe(true);
      });

      it('should return true for matching array type', () => {
        const result = WorkflowRuntimeType.isMatchWorkflowType(
          [1, 2, 3],
          WorkflowVariableType.Array
        );
        expect(result).toBe(true);
      });

      it('should return true for matching object type', () => {
        const result = WorkflowRuntimeType.isMatchWorkflowType(
          { name: 'John' },
          WorkflowVariableType.Object
        );
        expect(result).toBe(true);
      });

      it('should return true for matching null type', () => {
        const result = WorkflowRuntimeType.isMatchWorkflowType(null, WorkflowVariableType.Null);
        expect(result).toBe(true);
      });
    });

    describe('non-matching types', () => {
      it('should return false for string vs number type', () => {
        const result = WorkflowRuntimeType.isMatchWorkflowType(
          'hello',
          WorkflowVariableType.Number
        );
        expect(result).toBe(false);
      });

      it('should return false for number vs string type', () => {
        const result = WorkflowRuntimeType.isMatchWorkflowType(42, WorkflowVariableType.String);
        expect(result).toBe(false);
      });

      it('should return false for array vs object type', () => {
        const result = WorkflowRuntimeType.isMatchWorkflowType(
          [1, 2, 3],
          WorkflowVariableType.Object
        );
        expect(result).toBe(false);
      });

      it('should return false for object vs array type', () => {
        const result = WorkflowRuntimeType.isMatchWorkflowType(
          { name: 'John' },
          WorkflowVariableType.Array
        );
        expect(result).toBe(false);
      });
    });

    describe('unsupported values', () => {
      it('should return false for function', () => {
        const result = WorkflowRuntimeType.isMatchWorkflowType(() => {},
        WorkflowVariableType.Object);
        expect(result).toBe(false);
      });

      it('should return false for symbol', () => {
        const result = WorkflowRuntimeType.isMatchWorkflowType(
          Symbol('test'),
          WorkflowVariableType.String
        );
        expect(result).toBe(false);
      });
    });
  });

  describe('isTypeEqual', () => {
    describe('exact type matches', () => {
      it('should return true for same string types', () => {
        const result = WorkflowRuntimeType.isTypeEqual(
          WorkflowVariableType.String,
          WorkflowVariableType.String
        );
        expect(result).toBe(true);
      });

      it('should return true for same boolean types', () => {
        const result = WorkflowRuntimeType.isTypeEqual(
          WorkflowVariableType.Boolean,
          WorkflowVariableType.Boolean
        );
        expect(result).toBe(true);
      });

      it('should return true for same array types', () => {
        const result = WorkflowRuntimeType.isTypeEqual(
          WorkflowVariableType.Array,
          WorkflowVariableType.Array
        );
        expect(result).toBe(true);
      });

      it('should return true for same object types', () => {
        const result = WorkflowRuntimeType.isTypeEqual(
          WorkflowVariableType.Object,
          WorkflowVariableType.Object
        );
        expect(result).toBe(true);
      });

      it('should return true for same null types', () => {
        const result = WorkflowRuntimeType.isTypeEqual(
          WorkflowVariableType.Null,
          WorkflowVariableType.Null
        );
        expect(result).toBe(true);
      });
    });

    describe('number and integer equivalence', () => {
      it('should return true for Number and Integer', () => {
        const result = WorkflowRuntimeType.isTypeEqual(
          WorkflowVariableType.Number,
          WorkflowVariableType.Integer
        );
        expect(result).toBe(true);
      });

      it('should return true for Integer and Number', () => {
        const result = WorkflowRuntimeType.isTypeEqual(
          WorkflowVariableType.Integer,
          WorkflowVariableType.Number
        );
        expect(result).toBe(true);
      });

      it('should return true for Number and Number', () => {
        const result = WorkflowRuntimeType.isTypeEqual(
          WorkflowVariableType.Number,
          WorkflowVariableType.Number
        );
        expect(result).toBe(true);
      });

      it('should return true for Integer and Integer', () => {
        const result = WorkflowRuntimeType.isTypeEqual(
          WorkflowVariableType.Integer,
          WorkflowVariableType.Integer
        );
        expect(result).toBe(true);
      });
    });

    describe('different type mismatches', () => {
      it('should return false for String and Boolean', () => {
        const result = WorkflowRuntimeType.isTypeEqual(
          WorkflowVariableType.String,
          WorkflowVariableType.Boolean
        );
        expect(result).toBe(false);
      });

      it('should return false for Array and Object', () => {
        const result = WorkflowRuntimeType.isTypeEqual(
          WorkflowVariableType.Array,
          WorkflowVariableType.Object
        );
        expect(result).toBe(false);
      });

      it('should return false for String and Number', () => {
        const result = WorkflowRuntimeType.isTypeEqual(
          WorkflowVariableType.String,
          WorkflowVariableType.Number
        );
        expect(result).toBe(false);
      });

      it('should return false for Boolean and Null', () => {
        const result = WorkflowRuntimeType.isTypeEqual(
          WorkflowVariableType.Boolean,
          WorkflowVariableType.Null
        );
        expect(result).toBe(false);
      });
    });
  });

  describe('getArrayItemsType', () => {
    describe('uniform type arrays', () => {
      it('should return String for all string types', () => {
        const types = [
          WorkflowVariableType.String,
          WorkflowVariableType.String,
          WorkflowVariableType.String,
        ];
        const result = WorkflowRuntimeType.getArrayItemsType(types);
        expect(result).toBe(WorkflowVariableType.String);
      });

      it('should return Number for all number types', () => {
        const types = [WorkflowVariableType.Number, WorkflowVariableType.Number];
        const result = WorkflowRuntimeType.getArrayItemsType(types);
        expect(result).toBe(WorkflowVariableType.Number);
      });

      it('should return Boolean for all boolean types', () => {
        const types = [WorkflowVariableType.Boolean];
        const result = WorkflowRuntimeType.getArrayItemsType(types);
        expect(result).toBe(WorkflowVariableType.Boolean);
      });

      it('should return Object for all object types', () => {
        const types = [
          WorkflowVariableType.Object,
          WorkflowVariableType.Object,
          WorkflowVariableType.Object,
          WorkflowVariableType.Object,
        ];
        const result = WorkflowRuntimeType.getArrayItemsType(types);
        expect(result).toBe(WorkflowVariableType.Object);
      });
    });

    describe('mixed type arrays', () => {
      it.each([
        { types: [WorkflowVariableType.Integer, WorkflowVariableType.Number] },
        { types: [WorkflowVariableType.Number, WorkflowVariableType.Integer] },
        {
          types: [
            WorkflowVariableType.Integer,
            WorkflowVariableType.Number,
            WorkflowVariableType.Integer,
          ],
        },
      ])('promotes compatible numeric items $types to Number', ({ types }) => {
        expect(WorkflowRuntimeType.getArrayItemsType(types)).toBe(WorkflowVariableType.Number);
      });

      it('should throw error for String and Number mix', () => {
        const types = [WorkflowVariableType.String, WorkflowVariableType.Number];
        expect(() => WorkflowRuntimeType.getArrayItemsType(types)).toThrow(
          'Array items type must be same, expect string, but got number'
        );
      });

      it('should throw error for Boolean and String mix', () => {
        const types = [WorkflowVariableType.Boolean, WorkflowVariableType.String];
        expect(() => WorkflowRuntimeType.getArrayItemsType(types)).toThrow(
          'Array items type must be same, expect boolean, but got string'
        );
      });

      it('should throw error for Object and Array mix', () => {
        const types = [WorkflowVariableType.Object, WorkflowVariableType.Array];
        expect(() => WorkflowRuntimeType.getArrayItemsType(types)).toThrow(
          'Array items type must be same, expect object, but got array'
        );
      });

      it('should throw error for multiple different types', () => {
        const types = [
          WorkflowVariableType.String,
          WorkflowVariableType.Number,
          WorkflowVariableType.Boolean,
        ];
        expect(() => WorkflowRuntimeType.getArrayItemsType(types)).toThrow(
          'Array items type must be same, expect string, but got number'
        );
      });
    });

    describe('edge cases', () => {
      it('should handle single item array', () => {
        const types = [WorkflowVariableType.Integer];
        const result = WorkflowRuntimeType.getArrayItemsType(types);
        expect(result).toBe(WorkflowVariableType.Integer);
      });

      it('should handle Null types', () => {
        const types = [WorkflowVariableType.Null, WorkflowVariableType.Null];
        const result = WorkflowRuntimeType.getArrayItemsType(types);
        expect(result).toBe(WorkflowVariableType.Null);
      });
    });
  });
});
