/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';

import { Field } from '@flowgram.ai/free-layout-editor';

import { FreeFormMetaStoryBuilder, FormHeader } from '../../free-form-meta-story-builder';

const InputsValuesTree = React.lazy(() =>
  import('@flowgram.ai/form-materials').then((module) => ({
    default: module.InputsValuesTree,
  }))
);

const DisplayInputsValues = React.lazy(() =>
  import('@flowgram.ai/form-materials').then((module) => ({
    default: module.DisplayInputsValues,
  }))
);

export const BasicStory = () => (
  <FreeFormMetaStoryBuilder
    filterEndNode={true}
    transformInitialNode={{
      custom_0: (node) => {
        node.data.inputs_values = {
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
            type: 'ref',
            content: ['start_0', 'arr', 'arr_str'],
          },
          e: {
            type: 'ref',
            content: ['start_0', 'obj'],
          },
        };
        return node;
      },
    }}
    formMeta={{
      render: () => (
        <>
          <FormHeader />
          <Field<Record<string, any> | undefined> name="inputs_values">
            {({ field }) => (
              <InputsValuesTree value={field.value} onChange={(value) => field.onChange(value)} />
            )}
          </Field>
          <br />
          <Field<Record<string, any> | undefined> name="inputs_values">
            {({ field }) => <DisplayInputsValues value={field.value} />}
          </Field>
        </>
      ),
    }}
  />
);
