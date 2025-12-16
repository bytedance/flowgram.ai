/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { FormMeta, FormRenderProps } from '@flowgram.ai/free-layout-editor';
import { DisplayOutputs } from '@flowgram.ai/form-materials';
import { Divider } from '@douyinfe/semi-ui';

import { FormHeader, FormContent } from '../../form-components';
import { {NODE_NAME}NodeJSON } from './types';
import { CustomComponent } from './components/custom-component';
import { defaultFormMeta } from '../default-form-meta';

/**
 * 表单渲染组件
 */
export const FormRender = ({ form }: FormRenderProps<{NODE_NAME}NodeJSON>) => (
  <>
    <FormHeader />
    <FormContent>
      {/* TODO: 添加自定义组件 */}
      <CustomComponent />
      <Divider />
      {/* 显示节点输出 */}
      <DisplayOutputs displayFromScope />
    </FormContent>
  </>
);

/**
 * 表单配置
 */
export const formMeta: FormMeta = {
  render: (props) => <FormRender {...props} />,
  effect: defaultFormMeta.effect,
  plugins: [
    // TODO: 根据需要添加插件
    // createInferInputsPlugin({ sourceKey: 'xxxValues', targetKey: 'xxx' }),
  ],
};
