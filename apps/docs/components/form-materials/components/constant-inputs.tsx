/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';

import { Field } from '@flowgram.ai/free-layout-editor';

import { FreeFormMetaStoryBuilder, FormHeader } from '../../free-form-meta-story-builder';

const ConstantInput = React.lazy(() =>
  import('@flowgram.ai/form-materials').then((module) => ({
    default: module.ConstantInput,
  }))
);

export const BasicStory = () => (
  <FreeFormMetaStoryBuilder
    filterStartNode
    filterEndNode
    formMeta={{
      render: () => (
        <>
          <FormHeader />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <b>String</b>
            <Field<string> name="constant_string" defaultValue="Hello World">
              {({ field }) => (
                <ConstantInput
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  schema={{ type: 'string' }}
                />
              )}
            </Field>

            <b>Enum</b>
            <Field<string> name="constant_enum" defaultValue="morning">
              {({ field }) => (
                <ConstantInput
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  schema={{ type: 'string', enum: ['morning', 'afternoon'] }}
                />
              )}
            </Field>

            <b>Number</b>
            <Field<number> name="constant_number" defaultValue={42}>
              {({ field }) => (
                <ConstantInput
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  schema={{ type: 'number' }}
                />
              )}
            </Field>

            <b>Boolean</b>
            <Field<boolean> name="constant_boolean" defaultValue={true}>
              {({ field }) => (
                <ConstantInput
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  schema={{ type: 'boolean' }}
                />
              )}
            </Field>

            <b>Object</b>
            <Field<string>
              name="constant_object"
              defaultValue={JSON.stringify({ key: 'value', nested: { data: 'test' } })}
            >
              {({ field }) => (
                <ConstantInput
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  schema={{ type: 'object' }}
                />
              )}
            </Field>

            <b>Array</b>
            <Field<string>
              name="constant_array"
              defaultValue={JSON.stringify([1, 2, 3, 'four', true])}
            >
              {({ field }) => (
                <ConstantInput
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  schema={{ type: 'array' }}
                />
              )}
            </Field>
          </div>
        </>
      ),
    }}
  />
);

export const FallbackRendererStory = () => (
  <FreeFormMetaStoryBuilder
    filterStartNode
    filterEndNode
    formMeta={{
      render: () => (
        <>
          <FormHeader />
          <Field<any>
            name="constant_fallback"
            defaultValue={{ custom: 'data', type: 'unsupported' }}
          >
            {({ field }) => (
              <ConstantInput
                value={field.value}
                onChange={(value) => field.onChange(value)}
                schema={{ type: 'custom-unsupported-type' }}
                fallbackRenderer={({ value, onChange, readonly }) => (
                  <div style={{ padding: '8px', background: '#f0f0f0', border: '1px dashed #ccc' }}>
                    <p>Fallback renderer for unsupported type</p>
                  </div>
                )}
              />
            )}
          </Field>
        </>
      ),
    }}
  />
);

export const CustomStrategyStory = () => (
  <FreeFormMetaStoryBuilder
    filterStartNode
    filterEndNode
    formMeta={{
      render: () => (
        <>
          <FormHeader />
          <Field<string> name="constant_custom" defaultValue="Custom Value">
            {({ field }) => (
              <ConstantInput
                value={field.value}
                onChange={(value) => field.onChange(value)}
                schema={{ type: 'object' }}
                strategies={[
                  {
                    hit: (schema) => schema.type === 'object',
                    Renderer: ({ value, onChange, readonly }) => <p>Object is not supported now</p>,
                  },
                ]}
              />
            )}
          </Field>
        </>
      ),
    }}
  />
);
