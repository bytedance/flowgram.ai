/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { FormRenderProps, FormMeta, ValidateTrigger } from '@flowgram.ai/free-layout-editor';
import { autoRenameRefEffect } from '@flowgram.ai/form-materials';

import { FlowNodeJSON } from '../../typings';
import { FormHeader, FormContent } from '../../form-components';
import { ConditionInputs } from './condition-inputs';

export const renderForm = ({ form }: FormRenderProps<FlowNodeJSON>) => (
  <>
    <FormHeader />
    <FormContent>
      <ConditionInputs />
    </FormContent>
  </>
);

export const formMeta: FormMeta<FlowNodeJSON> = {
  render: renderForm,
  validateTrigger: ValidateTrigger.onChange,
  validate: {
    title: ({ value }: { value: string }) => (value ? undefined : 'Title is required'),
    'branch.*': ({ value }) => {
      const haveEmptyCondition =
        value.conditions.filter((item: any) => Object.keys(item.value).length === 0).length > 0;
      if (haveEmptyCondition) return 'Condition is required';
      return undefined;
    },
  },
  effect: {
    conditions: autoRenameRefEffect,
  },
};
