/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React, { useMemo } from 'react';

import { Input, Select } from 'antd';
import { JsonSchemaUtils } from '@flowgram.ai/json-schema';
import { I18n, useScopeAvailable } from '@flowgram.ai/editor';
import { DownOutlined } from '@ant-design/icons';

import { InjectVariableSelector } from '@/components/variable-selector';
import { InjectDynamicValueInput } from '@/components/dynamic-value-input';
import {
  type ConditionOpConfigs,
  type IConditionRule,
  useCondition,
} from '@/components/condition-context';

import './styles.css';
import type { ConditionRowValueType } from './types';

interface PropTypes {
  value?: ConditionRowValueType;
  onChange: (value?: ConditionRowValueType) => void;
  style?: React.CSSProperties;
  readonly?: boolean;
  /** @deprecated use ConditionProvider instead */
  ruleConfig?: {
    ops?: ConditionOpConfigs;
    rules?: Record<string, IConditionRule>;
  };
}

export function ConditionRow({ style, value, onChange, readonly, ruleConfig }: PropTypes) {
  const { left, operator, right } = value || {};
  const available = useScopeAvailable();

  const variable = useMemo(
    () => (left ? available.getByKeyPath(left.content) : undefined),
    [available, left]
  );
  const leftSchema = useMemo(
    () => (variable ? JsonSchemaUtils.astToSchema(variable.type, { drilldown: false }) : undefined),
    [variable?.type?.hash]
  );

  const { rule, opConfig, opOptionList, targetSchema } = useCondition({
    leftSchema,
    operator,
    ruleConfig,
    onClearOp: () => onChange({ ...value, operator: undefined }),
    onClearRight: () => onChange({ ...value, right: undefined }),
  });

  return (
    <div className="gedit-m-condition-row-container" style={style}>
      <div className="gedit-m-condition-row-operator">
        <Select
          aria-label="Condition operator"
          disabled={readonly || !rule}
          size="small"
          style={{ minWidth: 56 }}
          value={operator}
          options={opOptionList}
          optionLabelProp="abbreviation"
          suffixIcon={<DownOutlined />}
          onChange={(nextOperator) => onChange({ ...value, operator: nextOperator })}
        />
      </div>
      <div className="gedit-m-condition-row-values">
        <div className="gedit-m-condition-row-left">
          <InjectVariableSelector
            readonly={readonly}
            style={{ width: '100%' }}
            value={left?.content}
            onChange={(content) =>
              onChange({
                ...value,
                left: { type: 'ref', content },
              })
            }
          />
        </div>
        <div className="gedit-m-condition-row-right">
          {targetSchema ? (
            <InjectDynamicValueInput
              readonly={readonly || !rule}
              value={right}
              schema={targetSchema}
              onChange={(nextRight) => onChange({ ...value, right: nextRight })}
            />
          ) : (
            <Input
              size="small"
              disabled
              style={{ pointerEvents: 'none' }}
              value={opConfig?.rightDisplay || I18n.t('Empty')}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export { type ConditionRowValueType };
