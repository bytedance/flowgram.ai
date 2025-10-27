/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React, { useEffect } from 'react';

import { Field } from '@flowgram.ai/free-layout-editor';
import { validateFlowValue, validateWhenVariableSync } from '@flowgram.ai/form-materials';
import { Button } from '@douyinfe/semi-ui';

import { FreeFormMetaStoryBuilder, FormHeader } from '../../free-form-meta-story-builder';

const DynamicValueInput = React.lazy(() =>
  import('@flowgram.ai/form-materials').then((module) => ({
    default: module.DynamicValueInput,
  }))
);

export const BasicStory = () => (
  <FreeFormMetaStoryBuilder
    filterEndNode
    transformInitialNode={{
      custom_0: (node) => {
        node.data.value = {
          type: 'ref',
          content: ['start_0', 'query'],
        };

        return node;
      },
    }}
    formMeta={{
      effect: {
        value: validateWhenVariableSync(),
      },
      validate: {
        value: ({ value, context }) =>
          validateFlowValue(value, {
            node: context.node,
            errorMessages: {
              unknownVariable: 'Unknown Variable',
            },
          }),
      },
      render: ({ form }) => {
        useEffect(() => {
          form.validate();
        }, []);

        return (
          <>
            <FormHeader />

            <b>{"Add 'query' in Start"}</b>
            <Field<any> name="value">
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

            <Button onClick={() => form.validate()}>Trigger Validate</Button>
          </>
        );
      },
    }}
  />
);
