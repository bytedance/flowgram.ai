/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React, { useMemo } from 'react';

import { I18n } from '@flowgram.ai/editor';
import { Button, Select } from '@douyinfe/semi-ui';
import { IconChevronDownStroked } from '@douyinfe/semi-icons';

import { IRule, OpConfigs } from '../types';
import { defaultOpConfigs } from '../constants';

interface HookParams {
  rule?: IRule;
  op?: string;
  onChange: (op: string) => void;
  readonly?: boolean;
  userOps?: OpConfigs;
}

export function useOp({ rule, op, onChange, readonly, userOps }: HookParams) {
  const options = useMemo(
    () =>
      Object.keys(rule || {}).map((_op) => ({
        ...(defaultOpConfigs[_op] || {}),
        ...(userOps?.[_op] || {}),
        value: _op,
        label: I18n.t(userOps?.[_op]?.label || defaultOpConfigs[_op]?.label),
      })),
    [rule, userOps]
  );

  const opConfig = useMemo(() => defaultOpConfigs[op as string], [op]);

  const renderOpSelect = () => (
    <Select
      style={{ height: 22 }}
      disabled={readonly}
      size="small"
      value={op}
      optionList={options}
      onChange={(v) => {
        onChange(v as string);
      }}
      triggerRender={({ value }) => (
        <Button size="small" disabled={!rule}>
          {opConfig?.abbreviation || <IconChevronDownStroked size="small" />}
        </Button>
      )}
    />
  );

  return { renderOpSelect, opConfig };
}
