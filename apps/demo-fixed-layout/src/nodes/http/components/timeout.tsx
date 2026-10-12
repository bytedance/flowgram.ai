/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { Field } from '@flowgram.ai/fixed-layout-editor';
import { InputNumber } from '@douyinfe/semi-ui';

import { useNodeRenderContext } from '../../../hooks';
import { FormItem } from '../../../form-components';

export function Timeout() {
  const { readonly } = useNodeRenderContext();

  return (
    <div>
      <FormItem name="Timeout(ms)" required type="number">
        <Field<number> name="timeout.timeout" defaultValue={10000}>
          {({ field }) => (
            <InputNumber
              size="small"
              value={field.value}
              onChange={(value) => {
                field.onChange(value as number);
              }}
              disabled={readonly}
              style={{ width: '100%' }}
              min={0}
            />
          )}
        </Field>
      </FormItem>
      <FormItem name="Retry Times" required type="number">
        <Field<number> name="timeout.retryTimes" defaultValue={1}>
          {({ field }) => (
            <InputNumber
              size="small"
              value={field.value}
              onChange={(value) => {
                field.onChange(value as number);
              }}
              disabled={readonly}
              style={{ width: '100%' }}
              min={0}
            />
          )}
        </Field>
      </FormItem>
    </div>
  );
}
