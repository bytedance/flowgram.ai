/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';

import { Field } from '@flowgram.ai/free-layout-editor';

import { FreeFormMetaStoryBuilder, FormHeader } from '../../free-form-meta-story-builder';

const VariableSelector = React.lazy(() =>
  import('@flowgram.ai/form-materials').then((module) => ({
    default: module.VariableSelector,
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
        <>
          <FormHeader />
          <Field<string[] | undefined> name="variable_selector">
            {({ field }) => (
              <VariableSelector value={field.value} onChange={(value) => field.onChange(value)} />
            )}
          </Field>
        </>
      ),
    }}
  />
);

export const FilterSchemaStory = () => (
  <FreeFormMetaStoryBuilder
    filterEndNode
    formMeta={{
      render: () => (
        <>
          <FormHeader />
          <Field<string[] | undefined> name="variable_selector">
            {({ field }) => (
              <VariableSelector
                value={field.value}
                onChange={(value) => field.onChange(value)}
                includeSchema={{ type: 'string' }}
              />
            )}
          </Field>
        </>
      ),
    }}
  />
);

export const CustomFilterStory = () => (
  <FreeFormMetaStoryBuilder
    filterEndNode
    formMeta={{
      render: () => (
        <VariableSelectorProvider skipVariable={(variable) => variable?.key === 'str'}>
          <FormHeader />
          <Field<string[] | undefined> name="variable_selector">
            {({ field }) => (
              <VariableSelector value={field.value} onChange={(value) => field.onChange(value)} />
            )}
          </Field>
        </VariableSelectorProvider>
      ),
    }}
  />
);
