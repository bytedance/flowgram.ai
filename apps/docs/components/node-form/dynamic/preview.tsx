import {
  DEFAULT_INITIAL_DATA,
  defaultInitialDataTs,
  fieldWrapperCss,
  fieldWrapperTs,
} from '@flowgram.ai/demo-node-form';

import { Editor } from '../editor.tsx';
import { PreviewEditor } from '../../preview-editor.tsx';
import { nodeRegistry } from './node-registry.tsx';

const nodeRegistryFile = {
  code: `import {
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
`,
  active: true,
};

export const NodeFormDynamicPreview = () => {
  const files = {
    'node-registry.tsx': nodeRegistryFile,
    'initial-data.ts': { code: defaultInitialDataTs, active: true },
    'field-wrapper.tsx': { code: fieldWrapperTs, active: true },
    'field-wrapper.css': { code: fieldWrapperCss, active: true },
  };
  return (
    <PreviewEditor files={files} previewStyle={{ height: 500 }} editorStyle={{ height: 500 }}>
      <Editor registry={nodeRegistry} initialData={DEFAULT_INITIAL_DATA} />
    </PreviewEditor>
  );
};
