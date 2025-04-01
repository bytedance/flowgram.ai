import {
  Field,
  FieldRenderProps,
  FormMeta,
  WorkflowNodeRegistry,
  FormRenderProps,
} from '@flowgram.ai/free-layout-editor';
import { FieldWrapper } from '@flowgram.ai/demo-node-form';
import { Input } from '@douyinfe/semi-ui';
import '../index.css';

interface FormData {
  country: string;
  city: string;
}

const render = ({ form }: FormRenderProps<FormData>) => (
  <div className="demo-node-content">
    <div className="demo-node-title">Visibility Examples</div>
    <Field name="country">
      {({ field }: FieldRenderProps<string>) => (
        <FieldWrapper title="Country">
          <Input size={'small'} {...field} />
        </FieldWrapper>
      )}
    </Field>

    <Field name="city" deps={['country']}>
      {({ field }: FieldRenderProps<string>) =>
        form.getValueIn('country') ? (
          <FieldWrapper title="City">
            <Input size={'small'} {...field} />
          </FieldWrapper>
        ) : (
          <></>
        )
      }
    </Field>
  </div>
);

const formMeta: FormMeta<FormData> = {
  render,
};

export const nodeRegistry: WorkflowNodeRegistry = {
  type: 'custom',
  meta: {},
  defaultPorts: [{ type: 'output' }, { type: 'input' }],
  formMeta,
};
