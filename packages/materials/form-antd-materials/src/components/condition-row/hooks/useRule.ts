/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { useMemo } from 'react';

import { useScopeAvailable } from '@flowgram.ai/editor';

import { rules } from '../constants';
import { JsonSchemaUtils } from '../../../utils';
import { IFlowRefValue, JsonSchemaBasicType } from '../../../typings';

export function useRule(left?: IFlowRefValue) {
  const available = useScopeAvailable();

  const variable = useMemo(() => {
    if (!left) return undefined;
    return available.getByKeyPath(left.content);
  }, [available, left]);

  const rule = useMemo(() => {
    if (!variable) return undefined;

    const schema = JsonSchemaUtils.astToSchema(variable.type, {
      drilldown: false,
    });

    return rules[schema?.type as JsonSchemaBasicType];
  }, [variable?.type]);

  return { rule };
}
