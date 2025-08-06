/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { useMemo } from 'react';

import { JsonSchemaUtils, JsonSchemaBasicType } from '@flowgram.ai/json-schema';
import { useScopeAvailable } from '@flowgram.ai/editor';

import { IRules } from '../types';
import { defaultRules } from '../constants';
import { IFlowRefValue } from '../../../typings';

export function useRule(left?: IFlowRefValue, userRules?: IRules) {
  const available = useScopeAvailable();

  const rules = useMemo(() => ({ ...defaultRules, ...(userRules || {}) }), [userRules]);

  const variable = useMemo(() => {
    if (!left) return undefined;
    return available.getByKeyPath(left.content);
  }, [available, left]);

  const rule = useMemo(() => {
    if (!variable) return undefined;

    const schema = JsonSchemaUtils.astToSchema(variable.type, { drilldown: false });

    return rules[schema?.type as JsonSchemaBasicType];
  }, [variable?.type, rules]);

  return { rule };
}
