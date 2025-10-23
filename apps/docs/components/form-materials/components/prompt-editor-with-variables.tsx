/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';

import { Field } from '@flowgram.ai/free-layout-editor';

import { FreeFormMetaStoryBuilder, FormHeader } from '../../free-form-meta-story-builder';

const PromptEditorWithVariables = React.lazy(() =>
  import('@flowgram.ai/form-materials').then((module) => ({
    default: module.PromptEditorWithVariables,
  }))
);

const VariableSelectorProvider = React.lazy(() =>
  import('@flowgram.ai/form-materials').then((module) => ({
    default: module.VariableSelectorProvider,
  }))
);

export const BasicStory = () => (
  <FreeFormMetaStoryBuilder
    filterEndNode
    formMeta={{
      render: () => (
        <div style={{ width: 400 }}>
          <FormHeader />
          <Field<any | undefined>
            name="prompt_editor"
            defaultValue={{
              type: 'template',
              content: `# Role
You are a helpful assistant

# Query
{{start_0.str}}`,
            }}
          >
            {({ field }) => (
              <PromptEditorWithVariables
                value={field.value}
                onChange={(value) => field.onChange(value)}
              />
            )}
          </Field>
        </div>
      ),
    }}
  />
);

const STRING_ONLY_SCHEMA = { type: 'string' };
export const StringOnlyStory = () => (
  <FreeFormMetaStoryBuilder
    filterEndNode
    formMeta={{
      render: () => (
        <div style={{ width: 400 }}>
          <FormHeader />
          <VariableSelectorProvider includeSchema={STRING_ONLY_SCHEMA}>
            <Field<any | undefined>
              name="prompt_editor"
              defaultValue={{
                type: 'template',
                content: `# Role
You are a helpful assistant`,
              }}
            >
              {({ field }) => (
                <PromptEditorWithVariables
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                />
              )}
            </Field>
          </VariableSelectorProvider>
        </div>
      ),
    }}
  />
);
