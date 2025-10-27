/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';

import { Field } from '@flowgram.ai/free-layout-editor';
import { validateFlowValue } from '@flowgram.ai/form-materials';
import { Button } from '@douyinfe/semi-ui';

import { FreeFormMetaStoryBuilder, FormHeader } from '../../free-form-meta-story-builder';

const DynamicValueInput = React.lazy(() =>
  import('@flowgram.ai/form-materials').then((module) => ({
    default: module.DynamicValueInput,
  }))
);

const PromptEditorWithVariables = React.lazy(() =>
  import('@flowgram.ai/form-materials').then((module) => ({
    default: module.PromptEditorWithVariables,
  }))
);

export const BasicStory = () => (
  <FreeFormMetaStoryBuilder
    filterEndNode
    transformInitialNode={{
      custom_0: (node) => {
        node.data.dynamic_value_input = {
          type: 'ref',
          content: ['start_0', 'unknown_key'],
        };
        node.data.required_dynamic_value_input = {
          type: 'constant',
          content: '',
        };
        node.data.prompt_editor = {
          type: 'template',
          content: 'Hello {{start_0.unknown_key}}',
        };
        return node;
      },
    }}
    formMeta={{
      validate: {
        dynamic_value_input: ({ value, context }) =>
          validateFlowValue(value, {
            node: context.node,
            errorMessages: {
              required: 'Value is required',
              unknownVariable: 'Unknown Variable',
            },
          }),

        required_dynamic_value_input: ({ value, context }) =>
          validateFlowValue(value, {
            node: context.node,
            required: true,
            errorMessages: {
              required: 'Value is required',
              unknownVariable: 'Unknown Variable',
            },
          }),

        prompt_editor: ({ value, context }) =>
          validateFlowValue(value, {
            node: context.node,
            required: true,
            errorMessages: {
              required: 'Prompt is required',
              unknownVariable: 'Unknown Variable In Template',
            },
          }),
      },
      render: ({ form }) => (
        <>
          <FormHeader />

          <b>Validate variable valid</b>
          <Field<any> name="dynamic_value_input">
            {({ field, fieldState }) => (
              <>
                <DynamicValueInput
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                />
                <span style={{ color: 'red' }}>
                  {fieldState.errors?.map((e) => e.message).join('\n')}
                </span>
              </>
            )}
          </Field>
          <br />

          <b>Validate required value</b>
          <Field<any> name="required_dynamic_value_input">
            {({ field, fieldState }) => (
              <>
                <DynamicValueInput
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                />
                <span style={{ color: 'red' }}>
                  {fieldState.errors?.map((e) => e.message).join('\n')}
                </span>
              </>
            )}
          </Field>
          <br />

          <b>Validate required and variables valid in prompt</b>
          <Field<any> name="prompt_editor">
            {({ field, fieldState }) => (
              <>
                <PromptEditorWithVariables
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                />
                <span style={{ color: 'red' }}>
                  {fieldState.errors?.map((e) => e.message).join('\n')}
                </span>
              </>
            )}
          </Field>

          <br />

          <Button onClick={() => form.validate()}>Trigger Validate</Button>
        </>
      ),
    }}
  />
);
