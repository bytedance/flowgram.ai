/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';

import { Field } from '@flowgram.ai/free-layout-editor';
import type {
  RemoteSelectFetcher,
  RemoteSelectResponseTransformer,
} from '@flowgram.ai/form-materials';

import { FreeFormMetaStoryBuilder, FormHeader } from '../../free-form-meta-story-builder';

const RemoteSelect = React.lazy(() =>
  import('@flowgram.ai/form-materials').then((module) => ({
    default: module.RemoteSelect,
  }))
);

const mockFetcher: RemoteSelectFetcher = async () =>
  new Response(
    JSON.stringify([
      { label: 'Beijing', value: 'beijing' },
      { label: 'Shanghai', value: 'shanghai' },
      { label: 'Shenzhen', value: 'shenzhen' },
    ]),
    { headers: { 'Content-Type': 'application/json' } }
  );

const nestedResponseFetcher: RemoteSelectFetcher = async () =>
  new Response(JSON.stringify({ data: { records: [{ id: 1, name: 'Remote option' }] } }), {
    headers: { 'Content-Type': 'application/json' },
  });

const transformNestedResponse: RemoteSelectResponseTransformer = (payload) => {
  const response = payload as {
    data: { records: Array<{ id: number; name: string }> };
  };
  return response.data.records.map((record) => ({
    label: record.name,
    value: record.id,
  }));
};

export const BasicStory = () => (
  <FreeFormMetaStoryBuilder
    filterEndNode
    filterStartNode
    formMeta={{
      render: () => (
        <>
          <FormHeader />
          <Field<string> name="city">
            {({ field }) => (
              <RemoteSelect
                url="/api/cities"
                fetcher={mockFetcher}
                value={field.value}
                onChange={(value) => field.onChange(value as string)}
                placeholder="Select a city"
                style={{ width: 240 }}
              />
            )}
          </Field>
        </>
      ),
    }}
  />
);

export const NestedResponseStory = () => (
  <FreeFormMetaStoryBuilder
    filterEndNode
    filterStartNode
    formMeta={{
      render: () => (
        <>
          <FormHeader />
          <RemoteSelect
            url="/api/options"
            fetcher={nestedResponseFetcher}
            transformResponse={transformNestedResponse}
            placeholder="Select a remote option"
            style={{ width: 240 }}
          />
        </>
      ),
    }}
  />
);
