/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';

import { Field } from '@flowgram.ai/free-layout-editor';

import { FreeFormMetaStoryBuilder, FormHeader } from '../../free-form-meta-story-builder';

const BlurInput = React.lazy(() =>
  import('@flowgram.ai/form-materials').then((module) => ({
    default: module.BlurInput,
  }))
);

export const BasicStory = () => (
  <FreeFormMetaStoryBuilder
    filterEndNode
    filterStartNode
    formMeta={{
      render: () => (
        <>
          <FormHeader />
          <Field<string> name="blur_input" defaultValue="Initial text">
            {({ field }) => (
              <>
                <BlurInput
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  placeholder="Please enter text"
                />
                <p className="mt-2">Current value: {field.value}</p>
                <p className="text-sm text-gray-500">
                  Note: Value updates after clicking outside the input
                </p>
              </>
            )}
          </Field>
        </>
      ),
    }}
  />
);

export const PlaceholderStory = () => (
  <FreeFormMetaStoryBuilder
    filterEndNode
    filterStartNode
    formMeta={{
      render: () => (
        <>
          <FormHeader />
          <Field<string> name="blur_input_placeholder" defaultValue="">
            {({ field }) => (
              <>
                <BlurInput
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  placeholder="This is an input field with placeholder"
                />
                <p className="mt-2">Current value: {field.value || 'Empty'}</p>
              </>
            )}
          </Field>
        </>
      ),
    }}
  />
);

export const DisabledStory = () => (
  <FreeFormMetaStoryBuilder
    filterEndNode
    filterStartNode
    formMeta={{
      render: () => (
        <>
          <FormHeader />
          <Field<string> name="blur_input_disabled" defaultValue="Disabled state text">
            {({ field }) => (
              <BlurInput value={field.value} onChange={(value) => field.onChange(value)} disabled />
            )}
          </Field>
        </>
      ),
    }}
  />
);
