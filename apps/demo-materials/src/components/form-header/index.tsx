/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { WorkflowNodeEntity, useCurrentEntity } from '@flowgram.ai/free-layout-editor';

import { getIcon } from './utils';
import { TitleInput } from './title-input';
import { Header, HeaderInner } from './styles';

export function FormHeader() {
  const node: WorkflowNodeEntity = useCurrentEntity();

  return (
    <Header>
      <HeaderInner>
        {getIcon(node)}

        <TitleInput />
      </HeaderInner>
    </Header>
  );
}
