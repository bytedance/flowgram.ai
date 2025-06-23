import {
  autoRenameRefEffect,
  provideJsonSchemaOutputs,
  syncVariableTitle,
} from '@flowgram.ai/form-materials';
import { FormRenderProps, FormMeta, ValidateTrigger } from '@flowgram.ai/fixed-layout-editor';

import { FlowNodeJSON } from '../typings';
import { FormHeader, FormContent, FormInputs, FormOutputs } from '../form-components';

export const renderForm = ({ form }: FormRenderProps<FlowNodeJSON['data']>) => (
  <>
    <FormHeader />
    <FormContent>
      <FormInputs />
      <FormOutputs />
    </FormContent>
  </>
);

export const defaultFormMeta: FormMeta<FlowNodeJSON['data']> = {
  render: renderForm,
  validateTrigger: ValidateTrigger.onChange,
  validate: {
    title: ({ value }) => (value ? undefined : 'Title is required'),
    'inputsValues.*': ({ value, context, formValues, name }) => {
      const valuePropetyKey = name.replace(/^inputsValues\./, '');
      const required = formValues.inputs?.required || [];
      if (
        required.includes(valuePropetyKey) &&
        (value === '' || value === undefined || value?.content === '')
      ) {
        return `${valuePropetyKey} is required`;
      }
      return undefined;
    },
  },
  effect: {
    title: syncVariableTitle,
    outputs: provideJsonSchemaOutputs,
    inputsValues: autoRenameRefEffect,
  },
};
