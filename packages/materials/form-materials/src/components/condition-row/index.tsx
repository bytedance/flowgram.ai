/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React, { useMemo } from 'react';

import { I18n } from '@flowgram.ai/editor';
import { Input } from '@douyinfe/semi-ui';

import { ConditionRowValueType, IRules, OpConfigs } from './types';
import { UIContainer, UILeft, UIOperator, UIRight, UIValues } from './styles';
import { useRule } from './hooks/useRule';
import { useOp } from './hooks/useOp';
import { VariableSelector } from '../variable-selector';
import { DynamicValueInput } from '../dynamic-value-input';

interface PropTypes {
  value?: ConditionRowValueType;
  onChange: (value?: ConditionRowValueType) => void;
  style?: React.CSSProperties;
  readonly?: boolean;
  ruleConfig?: {
    ops?: OpConfigs;
    rules?: IRules;
  };
}

const defaultRuleConfig = {
  ops: {},
  rules: {},
};

export function ConditionRow({
  style,
  value,
  onChange,
  readonly,
  ruleConfig = defaultRuleConfig,
}: PropTypes) {
  const { left, operator, right } = value || {};
  const { rule } = useRule(left, ruleConfig.rules);
  const { renderOpSelect, opConfig } = useOp({
    rule,
    op: operator,
    onChange: (v) => onChange({ ...value, operator: v }),
    readonly,
    userOps: ruleConfig.ops,
  });

  const targetSchema = useMemo(() => {
    const targetType: string | null = rule?.[operator || ''] || null;
    return targetType ? { type: targetType, extra: { weak: true } } : null;
  }, [rule, opConfig]);

  return (
    <UIContainer style={style}>
      <UIOperator>{renderOpSelect()}</UIOperator>
      <UIValues>
        <UILeft>
          <VariableSelector
            readonly={readonly}
            style={{ width: '100%' }}
            value={left?.content}
            onChange={(v) =>
              onChange({
                ...value,
                left: {
                  type: 'ref',
                  content: v,
                },
              })
            }
          />
        </UILeft>
        <UIRight>
          {targetSchema ? (
            <DynamicValueInput
              readonly={readonly || !rule}
              value={right}
              schema={targetSchema}
              onChange={(v) => onChange({ ...value, right: v })}
            />
          ) : (
            <Input
              size="small"
              disabled
              style={{ pointerEvents: 'none' }}
              value={opConfig?.rightDisplay || I18n.t('Empty')}
            />
          )}
        </UIRight>
      </UIValues>
    </UIContainer>
  );
}

export { type ConditionRowValueType };
