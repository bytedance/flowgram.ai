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

const DisplayFlowValue = React.lazy(() =>
  import('@flowgram.ai/form-materials').then((module) => ({
    default: module.DisplayFlowValue,
  }))
);

export const BasicStory = () => (
  <FreeFormMetaStoryBuilder
    filterEndNode={true}
    transformInitialNode={{
      custom_0: (node) => {
        node.data.dynamic_value_input = {
          type: 'constant',
          content: 'Hello World',
        };
        return node;
      },
    }}
    formMeta={{
      render: () => (
        <>
          <FormHeader />
          <Field<any> name="dynamic_value_input">
            {({ field }) => (
              <DynamicValueInput value={field.value} onChange={(value) => field.onChange(value)} />
            )}
          </Field>
          <br />
          <div>
            <Field<any> name="dynamic_value_input">
              {({ field }) => {
                console.log('debugger field value', field);
                return <DisplayFlowValue value={field.value} title="Display Flow Value" />;
              }}
            </Field>
          </div>
        </>
      ),
    }}
  />
);
