/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';

import { Field } from '@flowgram.ai/free-layout-editor';

import { FreeFormMetaStoryBuilder, FormHeader } from '../../free-form-meta-story-builder';

const PromptEditor = React.lazy(() =>
  import('@flowgram.ai/form-materials').then((module) => ({
    default: module.PromptEditor,
  }))
);

export const BasicStory = () => (
  <FreeFormMetaStoryBuilder
    filterEndNode
    formMeta={{
      render: () => (
        <>
          <FormHeader />
          <Field<any | undefined>
            name="prompt_editor"
            defaultValue={{
              type: 'template',
              content: '# Role \n You are a helpful assistant',
            }}
          >
            {({ field }) => (
              <PromptEditor value={field.value} onChange={(value) => field.onChange(value)} />
            )}
          </Field>
        </>
      ),
    }}
  />
);
