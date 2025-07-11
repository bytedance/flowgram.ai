/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';

import { Input, InputNumber, Select } from '@douyinfe/semi-ui';

import { PropsType, Strategy } from './types';

const defaultStrategies: Strategy[] = [
  {
    hit: (schema) => schema?.type === 'string',
    Renderer: (props) => (
      <Input placeholder="Please Input String" size="small" disabled={props.readonly} {...props} />
    ),
  },
  {
    hit: (schema) => schema?.type === 'number',
    Renderer: (props) => (
      <InputNumber
        placeholder="Please Input Number"
        size="small"
        disabled={props.readonly}
        hideButtons
        {...props}
      />
    ),
  },
  {
    hit: (schema) => schema?.type === 'integer',
    Renderer: (props) => (
      <InputNumber
        placeholder="Please Input Integer"
        size="small"
        disabled={props.readonly}
        hideButtons
        precision={0}
        {...props}
      />
    ),
  },
  {
    hit: (schema) => schema?.type === 'boolean',
    Renderer: (props) => {
      const { value, onChange, ...rest } = props;
      return (
        <Select
          placeholder="Please Select Boolean"
          size="small"
          disabled={props.readonly}
          optionList={[
            { label: 'True', value: 1 },
            { label: 'False', value: 0 },
          ]}
          value={value ? 1 : 0}
          onChange={(value) => onChange?.(!!value)}
          {...rest}
        />
      );
    },
  },
];

export function ConstantInput(props: PropsType) {
  const { value, onChange, schema, strategies: extraStrategies, readonly, ...rest } = props;

  const strategies = useMemo(
    () => [...defaultStrategies, ...(extraStrategies || [])],
    [extraStrategies]
  );

  const Renderer = useMemo(() => {
    const strategy = strategies.find((_strategy) => _strategy.hit(schema));

    return strategy?.Renderer;
  }, [strategies, schema]);

  if (!Renderer) {
    return <Input size="small" disabled placeholder="Unsupported type" />;
  }

  return <Renderer value={value} onChange={onChange} readonly={readonly} schema={schema} {...rest} />;
}
