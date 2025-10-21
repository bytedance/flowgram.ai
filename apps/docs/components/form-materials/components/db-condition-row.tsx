/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';

import { Field } from '@flowgram.ai/fixed-layout-editor';

import { FreeFormMetaStoryBuilder, FormHeader } from '../../free-form-meta-story-builder';

const DBConditionRow = React.lazy(() =>
  import('@flowgram.ai/form-materials').then((module) => ({
    default: module.DBConditionRow,
  }))
);

export const BasicStory = () => (
  <FreeFormMetaStoryBuilder
    filterEndNode
    formMeta={{
      render: () => (
        <>
          <FormHeader />
          <Field<any | undefined> name="db_condition_row">
            {({ field }) => (
              <DBConditionRow
                options={[
                  {
                    label: 'TransactionID',
                    value: 'transaction_id',
                    schema: { type: 'integer' },
                  },
                  {
                    label: 'Amount',
                    value: 'amount',
                    schema: { type: 'number' },
                  },
                  {
                    label: 'Description',
                    value: 'description',
                    schema: { type: 'string' },
                  },
                  {
                    label: 'Archived',
                    value: 'archived',
                    schema: { type: 'boolean' },
                  },
                  {
                    label: 'CreateTime',
                    value: 'create_time',
                    schema: { type: 'date-time' },
                  },
                ]}
                value={field.value}
                onChange={(value) => field.onChange(value)}
              />
            )}
          </Field>
        </>
      ),
    }}
  />
);
