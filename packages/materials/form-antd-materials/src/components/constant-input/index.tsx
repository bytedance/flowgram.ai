/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';

import { PropsType, Strategy } from './types';
import { UIInput, UIInputNumber, UISelect } from './styles';
import { I18n } from '@flowgram.ai/editor';

const defaultStrategies: Strategy[] = [
  {
    hit: (schema) => schema?.type === 'string',
    Renderer: (props) => (
      <UIInput
        placeholder={I18n.t('Please Input String')}
        size="small"
        disabled={props.readonly}
        {...props}
      />
    ),
  },
  {
    hit: (schema) => schema?.type === 'number',
    Renderer: (props) => (
      <UIInputNumber
        placeholder={I18n.t('Please Input Number')}
        size="small"
        disabled={props.readonly}
        {...props}
      />
    ),
  },
  {
    hit: (schema) => schema?.type === 'integer',
    Renderer: (props) => (
      <UIInputNumber
      placeholder={I18n.t('Please Input Integer')}
        size="small"
        disabled={props.readonly}
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
        <UISelect
          placeholder="Please Select Boolean"
          size="small"
          disabled={props.readonly}
          options={[
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
    return <UIInput size="small" disabled placeholder="Unsupported type" />;
  }

  return <Renderer value={value} onChange={onChange} readonly={readonly} {...rest} />;
}
