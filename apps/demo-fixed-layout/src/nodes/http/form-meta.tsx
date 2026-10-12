/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { createInferInputsPlugin } from '@flowgram.ai/form-materials';
import { FormRenderProps } from '@flowgram.ai/fixed-layout-editor';
import { Divider } from '@douyinfe/semi-ui';

import { defaultFormMeta } from '../default-form-meta';
import { FormContent, FormHeader, FormOutputs } from '../../form-components';
import { HTTPNodeJSON } from './types';
import { Timeout } from './components/timeout';
import { Params } from './components/params';
import { Headers } from './components/headers';
import { Body } from './components/body';
import { Api } from './components/api';

export const FormRender = ({ form }: FormRenderProps<HTTPNodeJSON['data']>) => (
  <>
    <FormHeader />
    <FormContent>
      <Api />
      <Divider />
      <Headers />
      <Divider />
      <Params />
      <Divider />
      <Body />
      <Divider />
      <Timeout />
      <Divider />
      <FormOutputs />
    </FormContent>
  </>
);

export const formMeta = {
  ...defaultFormMeta,
  render: (props: FormRenderProps<HTTPNodeJSON['data']>) => <FormRender {...props} />,
  plugins: [
    createInferInputsPlugin({ sourceKey: 'headersValues', targetKey: 'headers' }),
    createInferInputsPlugin({ sourceKey: 'paramsValues', targetKey: 'params' }),
  ],
};
