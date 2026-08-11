/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { useEffect, useMemo, useRef } from 'react';

import { IJsonSchema } from '@flowgram.ai/json-schema';
import { I18n } from '@flowgram.ai/editor';

import { useTypeManager } from '@/plugins';

import { IConditionRule, ConditionOpConfigs } from '../types';
import { useConditionContext } from '../context';

interface HooksParams {
  /**
   * Left schema of condition
   */
  leftSchema?: IJsonSchema;

  /**
   * Operator of condition
   */
  operator?: string;

  /**
   * If op is not in opOptionList, clear it
   */
  onClearOp?: () => void;

  /**
   * If targetSchema updated, clear it
   */
  onClearRight?: () => void;

  /**
   * @deprecated use ConditionProvider instead
   * custom rule config
   */
  ruleConfig?: {
    ops?: ConditionOpConfigs;
    rules?: Record<string, IConditionRule>;
  };
}

export function useCondition({
  leftSchema,
  operator,
  onClearOp,
  onClearRight,
  ruleConfig,
}: HooksParams) {
  const typeManager = useTypeManager();
  const { rules: contextRules, ops: contextOps } = useConditionContext();

  // Merge user rules and context rules
  const userRules = useMemo(
    () => ruleConfig?.rules || contextRules || {},
    [contextRules, ruleConfig?.rules]
  );

  // Merge user operators and context operators
  const allOps = useMemo(() => ruleConfig?.ops || contextOps || {}, [contextOps, ruleConfig?.ops]);

  // Get type configuration
  const config = useMemo(
    () => (leftSchema ? typeManager.getTypeBySchema(leftSchema) : undefined),
    [leftSchema, typeManager]
  );

  // Calculate rule
  const rule = useMemo(() => {
    if (!config) {
      return undefined;
    }
    if (userRules[config.type]) {
      return userRules[config.type];
    }
    if (typeof config.conditionRule === 'function') {
      return config.conditionRule(leftSchema);
    }
    return config.conditionRule;
  }, [userRules, leftSchema, config]);

  // Calculate operator option list
  const opOptionList = useMemo(
    () =>
      Object.keys(rule || {})
        .filter((_op) => allOps[_op])
        .map((_op) => ({
          ...(allOps?.[_op] || {}),
          value: _op,
          label: I18n.t(allOps?.[_op]?.label || _op),
        })),
    [rule, allOps]
  );

  // When op not in list, clear it
  useEffect(() => {
    if (!operator || !rule) {
      return;
    }
    if (!opOptionList.find((item) => item.value === operator)) {
      onClearOp?.();
    }
  }, [operator, opOptionList, onClearOp]);

  // get target schema
  const targetSchema = useMemo(() => {
    const targetType: string | IJsonSchema | null = rule?.[operator || ''] || null;

    if (!targetType) {
      return undefined;
    }

    if (typeof targetType === 'string') {
      return { type: targetType, extra: { weak: true } };
    }

    return targetType;
  }, [rule, operator]);

  const prevTargetSchemaRef = useRef<IJsonSchema | undefined>(undefined);

  // When type of target schema updated, clear it
  useEffect(() => {
    if (!prevTargetSchemaRef.current) {
      prevTargetSchemaRef.current = targetSchema;
      return;
    }
    if (prevTargetSchemaRef.current?.type !== targetSchema?.type) {
      onClearRight?.();
    }
    prevTargetSchemaRef.current = targetSchema;
  }, [targetSchema, onClearRight]);

  // get current operator config
  const opConfig = useMemo(() => allOps[operator || ''], [operator, allOps]);

  return {
    rule,
    opConfig,
    opOptionList,
    targetSchema,
  };
}
