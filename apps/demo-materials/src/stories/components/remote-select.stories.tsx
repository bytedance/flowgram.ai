/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { Meta, StoryObj } from 'storybook-react-rsbuild';
import { Field, FormMeta } from '@flowgram.ai/free-layout-editor';
import {
  RemoteSelect,
  type RemoteSelectFetcher,
  type RemoteSelectResponseTransformer,
} from '@flowgram.ai/form-materials';

import { FreeFormMetaStoryBuilder } from '../../components/free-form-meta-story-builder';
import { FormHeader } from '../../components/form-header';

const wait = (duration: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, duration);
  });

const mockFetcher: RemoteSelectFetcher = async () => {
  await wait(300);
  return new Response(
    JSON.stringify([
      { label: 'Beijing', value: 'beijing' },
      { label: 'Shanghai', value: 'shanghai' },
      { label: 'Shenzhen', value: 'shenzhen' },
    ]),
    { headers: { 'Content-Type': 'application/json' } }
  );
};

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

const Story = (args: { formMeta: FormMeta }) => (
  <FreeFormMetaStoryBuilder formMeta={args.formMeta} />
);

const meta: Meta<typeof Story> = {
  title: 'Form Components/RemoteSelect',
  component: Story,
  tags: ['autodocs'],
};

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    formMeta: {
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
    },
  },
};

export const TransformNestedResponse: Story = {
  args: {
    formMeta: {
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
    },
  },
};

export default meta;
