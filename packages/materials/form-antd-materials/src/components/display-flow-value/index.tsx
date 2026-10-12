/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React, { useMemo } from 'react';

import { JsonSchemaTypeManager, JsonSchemaUtils } from '@flowgram.ai/json-schema';
import { useScopeAvailable } from '@flowgram.ai/editor';

import { IFlowValue } from '@/shared';
import { FlowValueUtils } from '@/shared';
import { DisplaySchemaTag } from '@/components/display-schema-tag';

interface PropsType {
  value?: IFlowValue;
  title?: JSX.Element | string;
  showIconInTree?: boolean;
  typeManager?: JsonSchemaTypeManager;
}

export function DisplayFlowValue({ value, title, showIconInTree }: PropsType) {
  const available = useScopeAvailable();

  const variable = value?.type === 'ref' ? available.getByKeyPath(value?.content) : undefined;

  const schema = useMemo(() => {
    if (value?.type === 'ref') {
      return JsonSchemaUtils.astToSchema(variable?.type);
    }
    if (value?.type === 'template') {
      return { type: 'string' };
    }
    if (value?.type === 'constant') {
      return FlowValueUtils.inferConstantJsonSchema(value);
    }

    return { type: 'unknown' };
  }, [value, variable?.hash]);

  return (
    <DisplaySchemaTag
      title={title}
      value={schema}
      showIconInTree={showIconInTree}
      warning={value?.type === 'ref' && !variable}
    />
  );
}
