/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';

import { listenRefValueChange } from '@flowgram.ai/form-materials';
import { Field } from '@flowgram.ai/fixed-layout-editor';

import { FreeFormMetaStoryBuilder, FormHeader } from '../../free-form-meta-story-builder';

const InputsValues = React.lazy(() =>
  import('@flowgram.ai/form-materials').then((module) => ({
    default: module.InputsValues,
  }))
);

export const BasicStory = () => (
  <FreeFormMetaStoryBuilder
    filterEndNode
    formMeta={{
      effect: {
        'inputsValues.*': listenRefValueChange(({ name, variable, form }) => {
          form.setValueIn(
            `log`,
            `${form.getValueIn(`log`) || ''}* ${name}: ${JSON.stringify({
              name: variable?.name,
              type: variable?.type,
              value: variable?.value,
            })} \n`
          );
        }),
      },
      render: () => (
        <>
          <FormHeader />
          <Field<Record<string, any> | undefined>
            name="inputsValues"
            defaultValue={{
              a: {
                type: 'ref',
                content: ['start_0', 'str'],
              },
            }}
          >
            {({ field }) => (
              <InputsValues value={field.value} onChange={(value) => field.onChange(value)} />
            )}
          </Field>
          <br />
          <Field<any> name="log" defaultValue={'When variable value updated, log changes:\n'}>
            {({ field }) => (
              <pre style={{ padding: 4, background: '#f5f5f5', fontSize: 12 }}>{field.value}</pre>
            )}
          </Field>
        </>
      ),
    }}
  />
);
