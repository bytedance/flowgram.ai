import {
  DataEvent,
  EffectFuncProps,
  Field,
  FieldRenderProps,
  FormMeta,
  ValidateTrigger,
  WorkflowNodeRegistry,
} from '@flowgram.ai/free-layout-editor';
import { FieldWrapper } from '@flowgram.ai/demo-node-form';
import { Input } from '@douyinfe/semi-ui';
import '../index.css';

const render = () => (
  <div className="demo-node-content">
    <div className="demo-node-title">Effect Examples</div>
    <Field name="field1">
      {({ field }: FieldRenderProps<string>) => (
        <FieldWrapper
          title="Basic effect"
          note={'The following field will console.log field value on value change'}
        >
          <Input size={'small'} {...field} />
        </FieldWrapper>
      )}
    </Field>

    <Field name="field2">
      {({ field }: FieldRenderProps<string>) => (
        <FieldWrapper
          title="Control other fields"
          note={'The following field will change Field 3 value on value change'}
        >
          <Input size={'small'} {...field} />
        </FieldWrapper>
      )}
    </Field>
    <Field name="field3">
      {({ field }: FieldRenderProps<string>) => (
        <FieldWrapper title="Field 3">
          <Input size={'small'} {...field} />
        </FieldWrapper>
      )}
    </Field>
  </div>
);

interface FormData {
  field1: string;
  field2: string;
  field3: string;
}

const formMeta: FormMeta<FormData> = {
  render,
  validateTrigger: ValidateTrigger.onChange,
  effect: {
    field1: [
      {
        event: DataEvent.onValueChange,
        effect: ({ value }: EffectFuncProps<string, FormData>) => {
          console.log('field1 value:', value);
        },
      },
    ],
    field2: [
      {
        event: DataEvent.onValueChange,
        effect: ({ value, form }: EffectFuncProps<string, FormData>) => {
          form.setValueIn('field3', 'field2 value is ' + value);
        },
      },
    ],
  },
};

export const nodeRegistry: WorkflowNodeRegistry = {
  type: 'custom',
  meta: {},
  defaultPorts: [{ type: 'output' }, { type: 'input' }],
  formMeta,
};
