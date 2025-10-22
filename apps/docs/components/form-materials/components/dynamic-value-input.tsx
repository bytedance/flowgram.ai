/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';

import { Field } from '@flowgram.ai/free-layout-editor';

import { FreeFormMetaStoryBuilder, FormHeader } from '../../free-form-meta-story-builder';

const DynamicValueInput = React.lazy(() =>
  import('@flowgram.ai/form-materials').then((module) => ({
    default: module.DynamicValueInput,
  }))
);

export const BasicStory = () => (
  <FreeFormMetaStoryBuilder
    filterEndNode
    formMeta={{
      render: () => (
        <>
          <FormHeader />
          <Field<any> name="dynamic_value_input">
            {({ field }) => (
              <DynamicValueInput value={field.value} onChange={(value) => field.onChange(value)} />
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
          <Field<any> name="dynamic_value_input">
            {({ field }) => (
              <DynamicValueInput
                value={field.value}
                onChange={(value) => field.onChange(value)}
                schema={{ type: 'string' }}
              />
            )}
          </Field>
        </>
      ),
    }}
  />
);
