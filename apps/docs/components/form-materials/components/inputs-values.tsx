/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';

import { Field } from '@flowgram.ai/free-layout-editor';

import { FreeFormMetaStoryBuilder, FormHeader } from '../../free-form-meta-story-builder';

const InputsValues = React.lazy(() =>
  import('@flowgram.ai/form-materials').then((module) => ({
    default: module.InputsValues,
  }))
);

export const BasicStory = () => (
  <FreeFormMetaStoryBuilder
    filterEndNode
    formMeta={{
      render: () => (
        <>
          <FormHeader />
          <Field<Record<string, any> | undefined>
            name="inputs_values"
            defaultValue={{
              a: {
                type: 'ref',
                content: ['start_0', 'str'],
              },
            }}
          >
            {({ field }) => (
              <InputsValues value={field.value} onChange={(value) => field.onChange(value)} />
            )}
          </Field>
        </>
      ),
    }}
  />
);

export const WithSchemaStory = () => (
  <FreeFormMetaStoryBuilder
    filterEndNode
    formMeta={{
      render: () => (
        <>
          <FormHeader />
          <Field<Record<string, any> | undefined>
            name="inputs_values"
            defaultValue={{
              a: {
                type: 'ref',
                content: ['start_0', 'str'],
              },
            }}
          >
            {({ field }) => (
              <InputsValues
                value={field.value}
                onChange={(value) => field.onChange(value)}
                schema={{
                  type: 'string',
                }}
              />
            )}
          </Field>
        </>
      ),
    }}
  />
);
