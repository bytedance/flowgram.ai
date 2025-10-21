/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React, { useMemo } from 'react';

import { JsonSchemaUtils } from '@flowgram.ai/json-schema';
import { I18n, useScopeAvailable } from '@flowgram.ai/editor';
import { Button, Input, Select } from '@douyinfe/semi-ui';
import { IconChevronDownStroked } from '@douyinfe/semi-icons';

import { InjectVariableSelector } from '@/components/variable-selector';
import { InjectDynamicValueInput } from '@/components/dynamic-value-input';
import { IConditionRule, ConditionOpConfigs, useCondition } from '@/components/condition-context';

import { ConditionRowValueType } from './types';
import { UIContainer, UILeft, UIOperator, UIRight, UIValues } from './styles';

interface PropTypes {
  value?: ConditionRowValueType;
  onChange: (value?: ConditionRowValueType) => void;
  style?: React.CSSProperties;
  readonly?: boolean;
  /**
   * @deprecated use ConditionContext instead to pass ruleConfig to multiple
   */
  ruleConfig?: {
    ops?: ConditionOpConfigs;
    rules?: Record<string, IConditionRule>;
  };
}

export function ConditionRow({ style, value, onChange, readonly, ruleConfig }: PropTypes) {
  const { left, operator, right } = value || {};

  const available = useScopeAvailable();

  const variable = useMemo(() => {
    if (!left) return undefined;
    return available.getByKeyPath(left.content);
  }, [available, left]);

  const leftSchema = useMemo(() => {
    if (!variable) return undefined;
    return JsonSchemaUtils.astToSchema(variable.type, { drilldown: false });
  }, [variable?.type?.hash]);

  const { rule, opConfig, opOptionList, targetSchema } = useCondition({
    leftSchema,
    operator,
    ruleConfig,
  });

  const renderOpSelect = () => (
    <Select
      style={{ height: 22 }}
      disabled={readonly}
      size="small"
      value={operator}
      optionList={opOptionList}
      onChange={(v) => {
        onChange({
          ...value,
          operator: v as string,
        });
      }}
      triggerRender={({ value }) => (
        <Button size="small" disabled={!rule}>
          {opConfig?.abbreviation || <IconChevronDownStroked size="small" />}
        </Button>
      )}
    />
  );

  return (
    <UIContainer style={style}>
      <UIOperator>{renderOpSelect()}</UIOperator>
      <UIValues>
        <UILeft>
          <InjectVariableSelector
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
            <InjectDynamicValueInput
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
