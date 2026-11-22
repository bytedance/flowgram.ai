/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { describe, expect, it } from 'vitest';
import { IJsonSchema } from '@flowgram.ai/runtime-interface';

import { JSONSchemaValidator } from './json-schema-validator';

describe('JSONSchemaValidator', () => {
  const testSchema: IJsonSchema = {
    type: 'object',
    properties: {
      AA: {
        type: 'string',
        extra: { index: 0 },
      },
      BB: {
        type: 'integer',
        extra: { index: 1 },
      },
      CC: {
        type: 'object',
        extra: { index: 2 },
        properties: {
          CA: {
            type: 'string',
            extra: { index: 0 },
          },
          CB: {
            type: 'integer',
            extra: { index: 1 },
          },
        },
        required: ['CA', 'CB'],
      },
      DD: {
        type: 'array',
        extra: { index: 3 },
        items: {
          type: 'object',
          properties: {
            DA: {
              type: 'string',
              extra: { index: 1 },
            },
            DB: {
              type: 'object',
              extra: { index: 2 },
              properties: {
                DBA: {
                  type: 'string',
                  extra: { index: 1 },
                },
              },
              required: ['DBA'],
            },
          },
          required: [],
        },
      },
    },
    required: ['AA'],
  };

  it('should validate valid input successfully', () => {
    const validValue = {
      AA: 'test string',
      BB: 42,
      CC: {
        CA: 'nested string',
        CB: 123,
      },
      DD: [
        {
          DA: 'array item string',
          DB: {
            DBA: 'deep nested string',
          },
        },
      ],
    };

    const result = JSONSchemaValidator({
      schema: testSchema,
      value: validValue,
    });

    expect(result.result).toBe(true);
    expect(result.errorMessage).toBeUndefined();
  });

  it('should fail when required property is missing', () => {
    const invalidValue = {
      BB: 42,
      // Missing required AA
    };

    const result = JSONSchemaValidator({
      schema: testSchema,
      value: invalidValue,
    });

    expect(result.result).toBe(false);
    expect(result.errorMessage).toContain('Missing required property "AA"');
  });

  it('should fail when property type is wrong', () => {
    const invalidValue = {
      AA: 123, // Should be string, not number
    };

    const result = JSONSchemaValidator({
      schema: testSchema,
      value: invalidValue,
    });

    expect(result.result).toBe(false);
    expect(result.errorMessage).toContain('Expected string at AA, but got: number');
  });

  it('should fail when nested required property is missing', () => {
    const invalidValue = {
      AA: 'test string',
      CC: {
        CA: 'nested string',
        // Missing required CB
      },
    };

    const result = JSONSchemaValidator({
      schema: testSchema,
      value: invalidValue,
    });

    expect(result.result).toBe(false);
    expect(result.errorMessage).toContain('Missing required property "CB"');
  });

  it('should validate array items correctly', () => {
    const invalidValue = {
      AA: 'test string',
      DD: [
        {
          DA: 'array item string',
          DB: {
            // Missing required DBA
          },
        },
      ],
    };

    const result = JSONSchemaValidator({
      schema: testSchema,
      value: invalidValue,
    });

    expect(result.result).toBe(false);
    expect(result.errorMessage).toContain('Missing required property "DBA"');
  });

  it('should handle enum validation', () => {
    const enumSchema: IJsonSchema = {
      type: 'string',
      enum: ['option1', 'option2', 'option3'],
    };

    const validResult = JSONSchemaValidator({
      schema: enumSchema,
      value: 'option1',
    });
    expect(validResult.result).toBe(true);

    const invalidResult = JSONSchemaValidator({
      schema: enumSchema,
      value: 'invalid_option',
    });
    expect(invalidResult.result).toBe(false);
    expect(invalidResult.errorMessage).toContain('must be one of: option1, option2, option3');
  });

  it('should handle different basic types', () => {
    const typeTests = [
      { type: 'boolean', validValue: true, invalidValue: 'not boolean' },
      { type: 'integer', validValue: 42, invalidValue: 3.14 },
      { type: 'number', validValue: 3.14, invalidValue: 'not number' },
      { type: 'array', validValue: [1, 2, 3], invalidValue: 'not array' },
    ];

    typeTests.forEach(({ type, validValue, invalidValue }) => {
      const schema: IJsonSchema = { type: type };

      const validResult = JSONSchemaValidator({ schema, value: validValue });
      expect(validResult.result).toBe(true);

      const invalidResult = JSONSchemaValidator({ schema, value: invalidValue });
      expect(invalidResult.result).toBe(false);
    });
  });

  it('should fail when a required property collides with an Object.prototype member', () => {
    const schema: IJsonSchema = {
      type: 'object',
      properties: {},
      required: ['constructor'],
    };

    const result = JSONSchemaValidator({ schema, value: {} });

    expect(result.result).toBe(false);
    expect(result.errorMessage).toContain('Missing required property "constructor"');
  });

  it('should not validate an omitted optional property against an inherited prototype member', () => {
    const schema: IJsonSchema = {
      type: 'object',
      properties: {
        toString: { type: 'string' },
      },
    };

    const result = JSONSchemaValidator({ schema, value: {} });

    expect(result.result).toBe(true);
    expect(result.errorMessage).toBeUndefined();
  });
});
