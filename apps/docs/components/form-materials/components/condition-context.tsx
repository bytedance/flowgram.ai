/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';

import { Field } from '@flowgram.ai/free-layout-editor';
import type { ConditionOpConfigs, IConditionRule } from '@flowgram.ai/form-materials';

import { FreeFormMetaStoryBuilder, FormHeader } from '../../free-form-meta-story-builder';

const ConditionRow = React.lazy(() =>
  import('@flowgram.ai/form-materials').then((module) => ({
    default: module.ConditionRow,
  }))
);

const DBConditionRow = React.lazy(() =>
  import('@flowgram.ai/form-materials').then((module) => ({
    default: module.DBConditionRow,
  }))
);

const ConditionProvider = React.lazy(() =>
  import('@flowgram.ai/form-materials').then((module) => ({
    default: module.ConditionProvider,
  }))
);

const OPS: ConditionOpConfigs = {
  cop: {
    abbreviation: 'C',
    label: 'Custom Operator',
  },
};

const RULES: Record<string, IConditionRule> = {
  string: {
    cop: { type: 'string' },
  },
};

export const BasicStory = () => (
  <FreeFormMetaStoryBuilder
    filterEndNode
    formMeta={{
      render: () => (
        <>
          <FormHeader />
          <ConditionProvider ops={OPS} rules={RULES}>
            <Field<any | undefined> name="condition_row">
              {({ field }) => (
                <ConditionRow value={field.value} onChange={(value) => field.onChange(value)} />
              )}
            </Field>
            <Field<any | undefined> name="db_condition_row">
              {({ field }) => (
                <DBConditionRow
                  options={[
                    {
                      label: 'UserName',
                      value: 'username',
                      schema: { type: 'string' },
                    },
                  ]}
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                />
              )}
            </Field>
          </ConditionProvider>
        </>
      ),
    }}
  />
);
