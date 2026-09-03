/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

'use client';
import React, { useCallback, useMemo } from 'react';

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

function findNodeByKey(nodes: TreeNodeData[], key: string): TreeNodeData | undefined {
  for (const node of nodes) {
    if (node.key === key) {
      return node;
    }
    if (node.children?.length) {
      const found = findNodeByKey(node.children, key);
      if (found) {
        return found;
      }
    }
  }
  return undefined;
}

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

  // Ant Design TreeSelect is single-select by default and rejects array values.
  // FlowGram stores variable refs as keyPath string[]; join for display like form-materials.
  const treeValue = useMemo(() => {
    if (!value?.length) {
      return undefined;
    }
    return value.join('.');
  }, [value]);

  const handleChange = useCallback<NonNullable<TreeSelectProps['onChange']>>(
    (next) => {
      if (next === undefined || next === null || next === '') {
        onChange(undefined);
        return;
      }
      const key = String(next);
      const node = findNodeByKey(treeData, key);
      onChange(node?.keyPath ?? key.split('.'));
    },
    [onChange, treeData]
  );

  return (
    <UITreeSelect
      value={treeValue}
      disabled={readonly}
      status={hasError ? 'error' : undefined}
      placeholder={config?.placeholder}
      styles={{
        popup: { root: { maxHeight: 400, minWidth: 230, overflow: 'auto' } },
      }}
      style={style}
      treeDefaultExpandAll
      onChange={handleChange}
      treeData={treeData}
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