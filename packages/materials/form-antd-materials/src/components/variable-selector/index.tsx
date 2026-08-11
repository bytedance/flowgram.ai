/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React, { useMemo } from 'react';

import { Popover, Tag } from 'antd';
import { I18n } from '@flowgram.ai/editor';
import { DownOutlined, WarningOutlined } from '@ant-design/icons';

import { type MaterialIcon, renderMaterialIcon } from '@/shared/render-icon';
import { createInjectMaterial } from '@/shared';
import { type IJsonSchema } from '@/plugins';

import { useVariableTree } from './use-variable-tree';
import type { TreeNodeData } from './types';
import { UITreeSelect } from './styles';
import { useVariableSelectorContext } from './context';

interface TriggerRenderProps {
  value: string[];
}

export interface VariableSelectorProps {
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

const findTreeNode = (nodes: TreeNodeData[], value: string): TreeNodeData | undefined => {
  for (const node of nodes) {
    if (node.value === value) {
      return node;
    }
    const child = node.children ? findTreeNode(node.children, value) : undefined;
    if (child) {
      return child;
    }
  }
  return undefined;
};

export { useVariableTree };

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
}: VariableSelectorProps) => {
  const { skipVariable } = useVariableSelectorContext();
  const treeData = useVariableTree({ includeSchema, excludeSchema, skipVariable });

  const treeValue = useMemo(() => {
    if (typeof value === 'string') {
      console.warn('VariableSelector value should be a string array.');
      return value;
    }
    return value?.join('.');
  }, [value]);

  const selectedNode = treeValue ? findTreeNode(treeData, treeValue) : undefined;

  const selectedLabel = selectedNode ? (
    <Popover
      content={
        <div className="gedit-m-variable-selector-tag-pop">
          {renderMaterialIcon((selectedNode.rootMeta?.icon || selectedNode.icon) as MaterialIcon)}
          <span className="gedit-m-variable-selector-root-title">
            {selectedNode.rootMeta?.title
              ? `${selectedNode.rootMeta.title} ${selectedNode.isRoot ? '' : '-'} `
              : null}
          </span>
          <span className="gedit-m-variable-selector-var-name">
            {selectedNode.keyPath.slice(1).join('.')}
          </span>
        </div>
      }
    >
      <Tag
        className="gedit-m-variable-selector-tag"
        icon={renderMaterialIcon(
          (selectedNode.rootMeta?.icon || selectedNode.icon) as MaterialIcon
        )}
      >
        <span className="gedit-m-variable-selector-root-title">
          {selectedNode.rootMeta?.title
            ? `${selectedNode.rootMeta.title} ${selectedNode.isRoot ? '' : '-'} `
            : null}
        </span>
        {!selectedNode.isRoot && (
          <span className="gedit-m-variable-selector-var-name in-selector">
            {selectedNode.title}
          </span>
        )}
      </Tag>
    </Popover>
  ) : treeValue ? (
    <Tag className="gedit-m-variable-selector-tag" color="warning" icon={<WarningOutlined />}>
      {config.notFoundContent ?? 'Undefined'}
    </Tag>
  ) : undefined;

  return (
    <UITreeSelect
      className={`gedit-m-variable-selector-tree-select ${hasError ? 'error' : ''}`}
      value={treeValue ? { value: treeValue, label: selectedLabel } : undefined}
      labelInValue
      popupMatchSelectWidth={false}
      styles={{ popup: { root: { maxHeight: 400, minWidth: 230, overflow: 'auto' } } }}
      style={style}
      size="small"
      status={hasError ? 'error' : undefined}
      disabled={readonly}
      treeDefaultExpandAll
      treeData={treeData}
      treeIcon
      treeNodeLabelProp="title"
      allowClear={allowClear}
      onChange={(nextValue: any) => {
        const rawValue = nextValue?.value;
        if (rawValue === undefined) {
          onChange(undefined);
          return;
        }
        const node = findTreeNode(treeData, String(rawValue));
        onChange(node?.keyPath || String(rawValue).split('.'));
      }}
      suffixIcon={
        triggerRender && value ? triggerRender({ value }) : <DownOutlined aria-hidden="true" />
      }
      switcherIcon={<DownOutlined />}
      placeholder={config.placeholder ?? I18n.t('Select Variable')}
      notFoundContent={config.notFoundContent}
    />
  );
};

VariableSelector.renderKey = 'variable-selector-render-key';
export const InjectVariableSelector = createInjectMaterial(VariableSelector);

export { VariableSelectorProvider } from './context';
