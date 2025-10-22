/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';

import { Field } from '@flowgram.ai/free-layout-editor';
import type { IJsonSchema } from '@flowgram.ai/form-materials';

import { FreeFormMetaStoryBuilder, FormHeader } from '../../free-form-meta-story-builder';

const TypeSelector = React.lazy(() =>
  import('@flowgram.ai/form-materials').then((module) => ({
    default: module.TypeSelector,
  }))
);

export const BasicStory = () => (
  <FreeFormMetaStoryBuilder
    filterStartNode
    filterEndNode
    formMeta={{
      render: () => (
        <>
          <FormHeader />
          <Field<Partial<IJsonSchema> | undefined>
            name="type_selector"
            defaultValue={{ type: 'string' }}
          >
            {({ field }) => (
              <TypeSelector value={field.value} onChange={(value) => field.onChange(value)} />
            )}
          </Field>
        </>
      ),
    }}
  />
);
