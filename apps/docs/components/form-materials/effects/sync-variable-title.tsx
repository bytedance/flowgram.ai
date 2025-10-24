/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';

import { Field } from '@flowgram.ai/free-layout-editor';
import { provideJsonSchemaOutputs, syncVariableTitle } from '@flowgram.ai/form-materials';

import { FreeFormMetaStoryBuilder, FormHeader } from '../../free-form-meta-story-builder';

const Input = React.lazy(() =>
  import('@douyinfe/semi-ui').then((module) => ({
    default: module.Input,
  }))
);

export const BasicStory = () => (
  <FreeFormMetaStoryBuilder
    filterStartNode
    transformInitialNode={{
      end_0: (node) => {
        node.data.inputsValues = {
          success: { type: 'constant', content: true, schema: { type: 'boolean' } },
          message: { type: 'ref', content: ['custom_0', 'name'] },
        };
        return node;
      },
      custom_0: (node) => {
        node.data.outputs = {
          type: 'object',
          properties: {
            name: { type: 'string' },
            age: { type: 'number' },
          },
        };
        return node;
      },
    }}
    formMeta={{
      render: () => (
        <>
          <FormHeader />
          <p>Please Edit Title below to sync to variables:</p>
          <Field<string | undefined> name="title">
            {({ field }) => (
              <Input value={field.value} onChange={(value) => field.onChange(value)} />
            )}
          </Field>
        </>
      ),
      effect: {
        // Sync the title to variables
        title: syncVariableTitle,
        outputs: provideJsonSchemaOutputs,
      },
    }}
  />
);
