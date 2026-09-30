/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React, { useMemo } from 'react';

import { Input } from 'antd';

import { useTypeManager } from '@/plugins';

import { type PropsType, type Strategy as ConstantInputStrategy } from './types';

export { type ConstantInputStrategy };

export function ConstantInput(props: PropsType) {
  const { value, onChange, schema, strategies, fallbackRenderer, readonly, ...rest } = props;
  const typeManager = useTypeManager();

  const Renderer = useMemo(() => {
    const strategy = (strategies || []).find((item) => item.hit(schema));
    return strategy?.Renderer || typeManager.getTypeBySchema(schema)?.ConstantRenderer;
  }, [strategies, schema, typeManager]);

  if (!Renderer) {
    if (fallbackRenderer) {
      return React.createElement(fallbackRenderer, {
        value,
        onChange,
        readonly,
        schema,
        ...rest,
      });
    }
    return <Input size="small" disabled placeholder="Unsupported type" />;
  }

  return (
    <Renderer value={value} onChange={onChange} readonly={readonly} schema={schema} {...rest} />
  );
}
