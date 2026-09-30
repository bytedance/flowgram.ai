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
    Renderer: (props) => {
      const { readonly, ...rest } = props;
      return (
        <UIInput
          placeholder={I18n.t('Please Input String')}
          size="small"
          {...rest}
          disabled={readonly}
        />
      );
    },
  },
  {
    hit: (schema) => schema?.type === 'number',
    Renderer: (props) => {
      const { readonly, ...rest } = props;
      return (
        <UIInputNumber
          placeholder={I18n.t('Please Input Number')}
          size="small"
          {...rest}
          disabled={readonly}
        />
      );
    },
  },
  {
    hit: (schema) => schema?.type === 'integer',
    Renderer: (props) => {
      const { readonly, ...rest } = props;
      return (
        <UIInputNumber
          placeholder={I18n.t('Please Input Integer')}
          size="small"
          precision={0}
          {...rest}
          disabled={readonly}
        />
      );
    },
  },
  {
    hit: (schema) => schema?.type === 'boolean',
    Renderer: (props) => {
      const { value, onChange, readonly, ...rest } = props;
      return (
        <UISelect
          placeholder="Please Select Boolean"
          size="small"
          options={[
            { label: 'True', value: 1 },
            { label: 'False', value: 0 },
          ]}
          {...rest}
          value={value ? 1 : 0}
          onChange={(value) => onChange?.(!!value)}
          disabled={readonly}
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
