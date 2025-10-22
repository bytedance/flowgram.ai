/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';

import { Field } from '@flowgram.ai/free-layout-editor';

import { FreeFormMetaStoryBuilder, FormHeader } from '../../free-form-meta-story-builder';

const SQLEditorWithVariables = React.lazy(() =>
  import('@flowgram.ai/form-materials').then((module) => ({
    default: module.SQLEditorWithVariables,
  }))
);

export const BasicStory = () => (
  <FreeFormMetaStoryBuilder
    filterEndNode
    formMeta={{
      render: () => (
        <div style={{ width: 400 }}>
          <FormHeader />
          <Field<string | undefined>
            name="sql_editor_with_variables"
            defaultValue={'SELECT * FROM users \n WHERE user_id = {{start_0.str}}'}
          >
            {({ field }) => (
              <SQLEditorWithVariables
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
