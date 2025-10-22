/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';

import { Field } from '@flowgram.ai/free-layout-editor';
import { IFlowTemplateValue, IInputsValues, InputsValuesTree } from '@flowgram.ai/form-materials';

import { FreeFormMetaStoryBuilder, FormHeader } from '../../free-form-meta-story-builder';

const PromptEditorWithInputs = React.lazy(() =>
  import('@flowgram.ai/form-materials').then((module) => ({
    default: module.PromptEditorWithInputs,
  }))
);

export const BasicStory = () => (
  <FreeFormMetaStoryBuilder
    filterEndNode
    formMeta={{
      render: () => (
        <div style={{ width: 400 }}>
          <FormHeader />
          <Field<IInputsValues | undefined>
            name="inputsValues"
            defaultValue={{
              a: { type: 'constant', content: '123' },
              b: { type: 'ref', content: ['start_0', 'obj'] },
            }}
          >
            {({ field }) => (
              <InputsValuesTree value={field.value} onChange={(value) => field.onChange(value)} />
            )}
          </Field>
          <br />
          <Field<IInputsValues | undefined> name="inputsValues">
            {({ field: inputsField }) => (
              <Field<IFlowTemplateValue | undefined>
                name="prompt_editor_with_inputs"
                defaultValue={{
                  type: 'template',
                  content: '# Query \n {{b.obj2.num}}',
                }}
              >
                {({ field }) => (
                  <PromptEditorWithInputs
                    value={field.value}
                    onChange={(value) => field.onChange(value)}
                    inputsValues={inputsField.value || {}}
                  />
                )}
              </Field>
            )}
          </Field>
        </div>
      ),
    }}
  />
);
