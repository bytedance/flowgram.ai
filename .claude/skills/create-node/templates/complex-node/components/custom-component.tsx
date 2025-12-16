/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { Field } from '@flowgram.ai/free-layout-editor';
import { Input, Select } from '@douyinfe/semi-ui';

import { useNodeRenderContext } from '../../../hooks';
import { FormItem } from '../../../form-components';

/**
 * 自定义表单组件
 */
export function CustomComponent() {
  const { readonly } = useNodeRenderContext();

  return (
    <div>
      <FormItem name="配置项名称" required vertical type="string">
        <Field<string> name="customConfig.key" defaultValue="">
          {({ field }) => (
            <Input
              value={field.value}
              onChange={(value) => field.onChange(value)}
              disabled={readonly}
              placeholder="请输入..."
            />
          )}
        </Field>
      </FormItem>

      {/* TODO: 添加更多表单字段 */}
      <FormItem name="选择器示例" vertical type="string">
        <Field<string> name="customConfig.option" defaultValue="option1">
          {({ field }) => (
            <Select
              value={field.value}
              onChange={(value) => field.onChange(value as string)}
              disabled={readonly}
              style={{ width: '100%' }}
              optionList={[
                { label: '选项 1', value: 'option1' },
                { label: '选项 2', value: 'option2' },
                { label: '选项 3', value: 'option3' },
              ]}
            />
          )}
        </Field>
      </FormItem>
    </div>
  );
}
