/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { IFlowTemplateValue, PromptEditorWithVariables } from '@flowgram.ai/form-materials';
import { Field } from '@flowgram.ai/fixed-layout-editor';
import { Select } from '@douyinfe/semi-ui';

import { useNodeRenderContext } from '../../../hooks';
import { FormItem } from '../../../form-components';

export function Api() {
  const { readonly } = useNodeRenderContext();

  return (
    <div>
      <FormItem name="API" required vertical type="string">
        <div style={{ display: 'flex', gap: 5 }}>
          <Field<string> name="api.method" defaultValue="GET">
            {({ field }) => (
              <Select
                value={field.value}
                onChange={(value) => {
                  field.onChange(value as string);
                }}
                style={{ width: 85, maxWidth: 85, minWidth: 85 }}
                size="small"
                disabled={readonly}
                optionList={[
                  { label: 'GET', value: 'GET' },
                  { label: 'POST', value: 'POST' },
                  { label: 'PUT', value: 'PUT' },
                  { label: 'DELETE', value: 'DELETE' },
                  { label: 'PATCH', value: 'PATCH' },
                  { label: 'HEAD', value: 'HEAD' },
                ]}
              />
            )}
          </Field>

          <Field<IFlowTemplateValue> name="api.url">
            {({ field }) => (
              <PromptEditorWithVariables
                disableMarkdownHighlight
                readonly={readonly}
                style={{ flexGrow: 1 }}
                placeholder="Input URL, use var by '{'"
                value={field.value}
                onChange={(value) => {
                  field.onChange(value!);
                }}
              />
            )}
          </Field>
        </div>
      </FormItem>
    </div>
  );
}
