/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { isArray, isObject, isPlainObject, uniq } from 'lodash-es';
import { IJsonSchema, JsonSchemaUtils } from '@flowgram.ai/json-schema';
import { Scope } from '@flowgram.ai/editor';

import {
  IFlowConstantValue,
  IFlowRefValue,
  IFlowExpressionValue,
  IFlowTemplateValue,
  IFlowValue,
  IFlowConstantRefValue,
  FlowValueType,
} from './types';
import { constantSchema, refSchema, expressionSchema, templateSchema } from './schema';

export namespace FlowValueUtils {
  /**
   * Check if the value is a constant type
   */
  export function isConstant(value: any): value is IFlowConstantValue {
    return constantSchema.safeParse(value).success;
  }

  /**
   * Check if the value is a reference type
   */
  export function isRef(value: any): value is IFlowRefValue {
    return refSchema.safeParse(value).success;
  }

  /**
   * Check if the value is an expression type
   */
  export function isExpression(value: any): value is IFlowExpressionValue {
    return expressionSchema.safeParse(value).success;
  }

  /**
   * Check if the value is a template type
   */
  export function isTemplate(value: any): value is IFlowTemplateValue {
    return templateSchema.safeParse(value).success;
  }

  /**
   * Check if the value is either a constant or reference type
   */
  export function isConstantOrRef(value: any): value is IFlowConstantRefValue {
    return isConstant(value) || isRef(value);
  }

  /**
   * Check if the value is a valid flow value type
   */
  export function isFlowValue(value: any): value is IFlowValue {
    return isConstant(value) || isRef(value) || isExpression(value) || isTemplate(value);
  }

  /**
   * Traverse all flow values in the given value
   * @param value The value to traverse
   * @param options The options to traverse
   * @returns A generator of flow values
   */
  export function* traverse(
    value: any,
    options: {
      includeTypes: FlowValueType[];
      path?: string;
      pathArr?: string[];
    }
  ): Generator<{ value: IFlowValue; path: string; pathArr: string[] }> {
    const {
      includeTypes = ['ref', 'template', 'expression', 'constant'],
      path = '',
      pathArr = [],
    } = options || {};

    if (isPlainObject(value)) {
      if (isRef(value) && includeTypes.includes('ref')) {
        yield { value, path, pathArr };
        return;
      }

      if (isTemplate(value) && includeTypes.includes('template')) {
        yield { value, path, pathArr };
        return;
      }

      if (isExpression(value) && includeTypes.includes('expression')) {
        yield { value, path, pathArr };
        return;
      }

      if (isConstant(value) && includeTypes.includes('constant')) {
        yield { value, path, pathArr };
        return;
      }

      for (const [_key, _value] of Object.entries(value)) {
        yield* traverse(_value, {
          ...options,
          path: path ? `${path}.${_key}` : _key,
          pathArr: [...pathArr, _key],
        });
      }
      return;
    }

    if (isArray(value)) {
      for (const [_idx, _value] of value.entries()) {
        yield* traverse(_value, {
          ...options,
          path: path ? `${path}[${_idx}]` : `[${_idx}]`,
          pathArr: [...pathArr, `[${_idx}]`],
        });
      }
      return;
    }

    return;
  }

  /**
   * Get all key paths in the template value
   * @param value The template value
   * @returns A list of key paths
   */
  export function getTemplateKeyPaths(value: IFlowTemplateValue) {
    // find all keyPath wrapped in {{}}
    const keyPathReg = /\{\{([^\}\{]+)\}\}/g;
    return uniq(value.content?.match(keyPathReg) || []).map((_keyPath) =>
      _keyPath.slice(2, -2).split('.')
    );
  }

  /**
   * Infer the schema of the constant value
   * @param value
   * @returns
   */
  export function inferConstantJsonSchema(value: IFlowConstantValue): IJsonSchema | undefined {
    if (value?.schema) {
      return value.schema;
    }

    if (typeof value.content === 'string') {
      return {
        type: 'string',
      };
    }

    if (typeof value.content === 'number') {
      return {
        type: 'number',
      };
    }

    if (typeof value.content === 'boolean') {
      return {
        type: 'boolean',
      };
    }

    if (isObject(value.content)) {
      return {
        type: 'object',
      };
    }
    return undefined;
  }

  /**
   * Infer the schema of the flow value
   * @param values The flow value or object contains flow value
   * @param scope
   * @returns
   */
  export function inferJsonSchema(values: any, scope: Scope): IJsonSchema | undefined {
    if (isPlainObject(values)) {
      if (isConstant(values)) {
        return inferConstantJsonSchema(values);
      }

      if (isRef(values)) {
        const variable = scope.available.getByKeyPath(values?.content);
        const schema = variable?.type ? JsonSchemaUtils.astToSchema(variable?.type) : undefined;

        return schema;
      }

      if (isTemplate(values)) {
        return { type: 'string' };
      }

      return {
        type: 'object',
        properties: Object.keys(values).reduce((acc, key) => {
          const schema = inferJsonSchema((values as any)[key], scope);
          if (schema) {
            acc[key] = schema;
          }
          return acc;
        }, {} as Record<string, IJsonSchema>),
      };
    }
  }
}
