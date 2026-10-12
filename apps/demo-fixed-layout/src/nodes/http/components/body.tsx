/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import {
  IFlowTemplateValue,
  JsonEditorWithVariables,
  PromptEditorWithVariables,
} from '@flowgram.ai/form-materials';
import { Field } from '@flowgram.ai/fixed-layout-editor';
import { Select } from '@douyinfe/semi-ui';

import { useNodeRenderContext } from '../../../hooks';
import { FormItem } from '../../../form-components';

const BODY_TYPE_OPTIONS = [
  {
    label: 'None',
    value: 'none',
  },
  {
    label: 'JSON',
    value: 'JSON',
  },
  {
    label: 'Raw Text',
    value: 'raw-text',
  },
];

export function Body() {
  const { readonly } = useNodeRenderContext();

  const renderBodyEditor = (bodyType: string) => {
    switch (bodyType) {
      case 'JSON':
        return (
          <Field<IFlowTemplateValue> name="body.json">
            {({ field }) => (
              <JsonEditorWithVariables
                value={field.value?.content}
                readonly={readonly}
                activeLinePlaceholder="use var by '@'"
                onChange={(value) => {
                  field.onChange({ type: 'template', content: value });
                }}
              />
            )}
          </Field>
        );
      case 'raw-text':
        return (
          <Field<IFlowTemplateValue> name="body.rawText">
            {({ field }) => (
              <PromptEditorWithVariables
                disableMarkdownHighlight
                readonly={readonly}
                style={{ flexGrow: 1 }}
                placeholder="Input raw text, use var by '{'"
                onChange={(value) => {
                  field.onChange(value!);
                }}
              />
            )}
          </Field>
        );
      default:
        return null;
    }
  };

  return (
    <Field<string> name="body.bodyType" defaultValue="JSON">
      {({ field }) => (
        <div style={{ marginTop: 5 }}>
          <FormItem name="Body" vertical type="object">
            <Select
              value={field.value}
              onChange={(value) => {
                field.onChange(value as string);
              }}
              style={{ width: '100%', marginBottom: 10 }}
              disabled={readonly}
              size="small"
              optionList={BODY_TYPE_OPTIONS}
            />
            {renderBodyEditor(field.value)}
          </FormItem>
        </div>
      )}
    </Field>
  );
}
