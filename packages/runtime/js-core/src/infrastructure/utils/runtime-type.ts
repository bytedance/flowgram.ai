/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { WorkflowVariableType } from '@flowgram.ai/runtime-interface';

export namespace WorkflowRuntimeType {
  export const getWorkflowType = (value?: unknown): WorkflowVariableType | null => {
    // 处理 null 和 undefined 的情况
    if (value === null || value === undefined) {
      return WorkflowVariableType.Null;
    }

    // 处理基本类型
    if (typeof value === 'string') {
      // Check if string is a valid ISO 8601 datetime format
      const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?(?:Z|[+-]\d{2}:\d{2})?$/;
      if (iso8601Regex.test(value)) {
        const date = new Date(value);
        // Validate that the date is actually valid
        if (!isNaN(date.getTime())) {
          return WorkflowVariableType.DateTime;
        }
      }
      return WorkflowVariableType.String;
    }

    if (typeof value === 'boolean') {
      return WorkflowVariableType.Boolean;
    }

    if (typeof value === 'number') {
      if (Number.isInteger(value)) {
        return WorkflowVariableType.Integer;
      }
      return WorkflowVariableType.Number;
    }

    // 处理数组
    if (Array.isArray(value)) {
      return WorkflowVariableType.Array;
    }

    // 处理普通对象
    if (typeof value === 'object') {
      return WorkflowVariableType.Object;
    }

    return null;
  };

  export const isMatchWorkflowType = (value: unknown, type: WorkflowVariableType): boolean => {
    const workflowType = getWorkflowType(value);
    if (!workflowType) {
      return false;
    }
    return workflowType === type;
  };

  export const isTypeEqual = (
    typeA: WorkflowVariableType,
    typeB: WorkflowVariableType
  ): boolean => {
    // 处理 Number 和 Integer 等价的情况
    if (
      (typeA === WorkflowVariableType.Number && typeB === WorkflowVariableType.Integer) ||
      (typeA === WorkflowVariableType.Integer && typeB === WorkflowVariableType.Number)
    ) {
      return true;
    }
    return typeA === typeB;
  };

  export const getArrayItemsType = (types: WorkflowVariableType[]): WorkflowVariableType => {
    const expectedType = types[0];
    types.forEach((type) => {
      if (type !== expectedType) {
        throw new Error(`Array items type must be same, expect ${expectedType}, but got ${type}`);
      }
    });
    return expectedType;
  };
}
