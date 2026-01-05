/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';

import { Field, FieldRenderProps, FlowNodeRegistry } from '@flowgram.ai/free-layout-editor';

import { useIsSidebar, useNodeRenderContext } from '../../hooks';
import { FormTitleDescription, FormWrapper } from './styles';

/**
 * @param props
 * @constructor
 */
export function FormContent(props: { children?: React.ReactNode }) {
  const { node, expanded } = useNodeRenderContext();
  const isSidebar = useIsSidebar();
  const registry = node.getNodeRegistry<FlowNodeRegistry>();
  return (
    <FormWrapper>
      <>
        {isSidebar && (
          <Field name="description" defaultValue={registry.info?.description}>
            {({ field: { value } }: FieldRenderProps<string>) => (
              <FormTitleDescription>{value}</FormTitleDescription>
            )}
          </Field>
        )}
        {(expanded || isSidebar) && props.children}
      </>
    </FormWrapper>
  );
}
