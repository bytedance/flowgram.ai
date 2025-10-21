/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';

import { Field } from '@flowgram.ai/fixed-layout-editor';

import { FreeFormMetaStoryBuilder, FormHeader } from '../../free-form-meta-story-builder';

const InputsValuesTree = React.lazy(() =>
  import('@flowgram.ai/form-materials').then((module) => ({
    default: module.InputsValuesTree,
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
                b: {
                  type: 'ref',
                  content: ['start_0', 'str'],
                },
                c: {
                  type: 'constant',
                  content: 'hello',
                },
              },
              d: {
                type: 'constant',
                content: '{ "a": "b"}',
                schema: { type: 'object' },
              },
            }}
          >
            {({ field }) => (
              <InputsValuesTree value={field.value} onChange={(value) => field.onChange(value)} />
            )}
          </Field>
        </>
      ),
    }}
  />
);
