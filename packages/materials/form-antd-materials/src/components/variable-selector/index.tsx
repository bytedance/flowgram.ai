/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

'use client';
import React from 'react';

import type { TreeSelectProps, TreeNodeProps } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import { IJsonSchema } from '../../typings/json-schema';
import { useVariableTree } from './use-variable-tree';
import { TreeNodeData } from './types';
import { UITreeSelect } from './styles';

interface TriggerRenderProps {
  value: string[];
}

interface PropTypes {
  value?: string[];
  config?: {
    placeholder?: string;
    notFoundContent?: string;
  };
  onChange: (value?: string[]) => void;
  includeSchema?: IJsonSchema | IJsonSchema[];
  excludeSchema?: IJsonSchema | IJsonSchema[];
  readonly?: boolean;
  allowClear?: boolean;
  hasError?: boolean;
  style?: React.CSSProperties;
  triggerRender?: (props: TriggerRenderProps) => React.ReactNode;
}

export type VariableSelectorProps = PropTypes;

export const VariableSelector = ({
  value,
  config = {},
  onChange,
  style,
  readonly = false,
  allowClear = false,
  includeSchema,
  excludeSchema,
  hasError,
  triggerRender,
}: PropTypes) => {
  const treeData = useVariableTree({ includeSchema, excludeSchema });

  const findKeyPath = (nodes: TreeNodeData[], selected: string): string[] | undefined => {
    for (const node of nodes) {
      if (node.value === selected) {
        return node.keyPath;
      }
      const keyPath = node.children && findKeyPath(node.children, selected);
      if (keyPath) {
        return keyPath;
      }
    }
    return undefined;
  };

  const onPopupScroll: TreeSelectProps['onPopupScroll'] = (e) => {
    console.log('onPopupScroll', e);
  };

  return (
    <UITreeSelect
      value={value?.join('.')}
      styles={{
        popup: { root: { maxHeight: 400, minWidth: 230, overflow: 'auto' } },
      }}
      style={style}
      treeDefaultExpandAll
      onChange={(selected) =>
        onChange(selected === undefined ? undefined : findKeyPath(treeData, selected))
      }
      treeData={treeData}
      onPopupScroll={onPopupScroll}
      treeIcon={true}
      allowClear={allowClear}
      suffixIcon={triggerRender && value ? triggerRender({ value }) : undefined}
      switcherIcon={(props: TreeNodeProps) => (
        <DownOutlined
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        />
      )}
    />
  );
};
