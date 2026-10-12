/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { useEffect, useMemo, useRef, useState } from 'react';

import { IJsonSchema } from '@flowgram.ai/json-schema';
import { useScopeAvailable } from '@flowgram.ai/editor';

import { IFlowConstantRefValue } from '@/shared';

export function useRefVariable(value?: IFlowConstantRefValue) {
  const available = useScopeAvailable();
  const refVariable = useMemo(() => {
    if (value?.type === 'ref') {
      return available.getByKeyPath(value.content);
    }
  }, [value, available]);

  return refVariable;
}

export function useSelectSchema(
  schemaFromProps?: IJsonSchema,
  constantProps?: {
    schema?: IJsonSchema;
  },
  value?: IFlowConstantRefValue
) {
  let defaultSelectSchema = schemaFromProps || constantProps?.schema || { type: 'string' };
  if (value?.type === 'constant') {
    defaultSelectSchema = value?.schema || defaultSelectSchema;
  }

  const changeVersion = useRef(0);
  const effectVersion = useRef(0);

  const [selectSchema, setSelectSchema] = useState(defaultSelectSchema);

  useEffect(() => {
    effectVersion.current += 1;
    if (changeVersion.current === effectVersion.current) {
      return;
    }
    effectVersion.current = changeVersion.current;

    if (value?.type === 'constant' && value?.schema) {
      setSelectSchema(value?.schema);
      return;
    }
  }, [value]);

  const setSelectSchemaWithVersionUpdate = (schema: IJsonSchema) => {
    setSelectSchema(schema);
    changeVersion.current += 1;
  };

  return [selectSchema, setSelectSchemaWithVersionUpdate] as const;
}

export function useIncludeSchema(schemaFromProps?: IJsonSchema) {
  const includeSchema = useMemo(() => {
    if (!schemaFromProps) {
      return;
    }
    if (schemaFromProps?.type === 'number') {
      return [schemaFromProps, { type: 'integer' }];
    }
    return { ...schemaFromProps, extra: { weak: true, ...schemaFromProps?.extra } };
  }, [schemaFromProps]);

  return includeSchema;
}
