/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React, { useMemo } from 'react';

import { IJsonSchema } from '@flowgram.ai/json-schema';
import { I18n } from '@flowgram.ai/editor';
import { TriggerRenderProps } from '@douyinfe/semi-ui/lib/es/treeSelect';
import { TreeNodeData } from '@douyinfe/semi-ui/lib/es/tree';
import { Popover } from '@douyinfe/semi-ui';
import { IconChevronDownStroked, IconIssueStroked } from '@douyinfe/semi-icons';

import { createInjectMaterial } from '@/shared';

import { useVariableTree } from './use-variable-tree';
import { UIPopoverContent, UIRootTitle, UITag, UITreeSelect, UIVarName } from './styles';
import { useVariableSelectorContext } from './context';

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
  hasError?: boolean;
  style?: React.CSSProperties;
  triggerRender?: (props: TriggerRenderProps) => React.ReactNode;
}

export { useVariableTree };

export const VariableSelector = ({
  value,
  config = {},
  onChange,
  style,
  readonly = false,
  includeSchema,
  excludeSchema,
  hasError,
  triggerRender,
}: VariableSelectorProps) => {
  const { skipVariable } = useVariableSelectorContext();

  const treeData = useVariableTree({
    includeSchema,
    excludeSchema,
    skipVariable,
  });

  const treeValue = useMemo(() => {
    if (typeof value === 'string') {
      console.warn(
        'The Value of VariableSelector is a string, it should be an ARRAY. \n',
        'Please check the value of VariableSelector \n'
      );
      return value;
    }
    return value?.join('.');
  }, [value]);

  const renderIcon = (icon: string | JSX.Element) => {
    if (typeof icon === 'string') {
      return <img style={{ marginRight: 8 }} width={12} height={12} src={icon} />;
    }

    return icon;
  };

  return (
    <>
      <UITreeSelect
        dropdownMatchSelectWidth={false}
        disabled={readonly}
        treeData={treeData}
        size="small"
        value={treeValue}
        clearIcon={null}
        $error={hasError}
        style={style}
        validateStatus={hasError ? 'error' : undefined}
        onChange={(_, _config) => {
          onChange((_config as TreeNodeData).keyPath as string[]);
        }}
        renderSelectedItem={(_option: TreeNodeData) => {
          if (!_option?.keyPath) {
            return (
              <UITag
                prefixIcon={<IconIssueStroked />}
                color="amber"
                closable={!readonly}
                onClose={() => onChange(undefined)}
              >
                {config?.notFoundContent ?? 'Undefined'}
              </UITag>
            );
          }

          const rootIcon = renderIcon(_option.rootMeta?.icon || _option?.icon);

          const rootTitle = (
            <UIRootTitle>
              {_option.rootMeta?.title
                ? `${_option.rootMeta?.title} ${_option.isRoot ? '' : '-'} `
                : null}
            </UIRootTitle>
          );

          return (
            <div>
              <Popover
                content={
                  <UIPopoverContent>
                    {rootIcon}
                    {rootTitle}
                    <UIVarName>{_option.keyPath.slice(1).join('.')}</UIVarName>
                  </UIPopoverContent>
                }
              >
                <UITag
                  prefixIcon={rootIcon}
                  closable={!readonly}
                  onClose={() => onChange(undefined)}
                >
                  {rootTitle}
                  {!_option.isRoot && <UIVarName $inSelector>{_option.label}</UIVarName>}
                </UITag>
              </Popover>
            </div>
          );
        }}
        showClear={false}
        arrowIcon={<IconChevronDownStroked size="small" />}
        triggerRender={triggerRender}
        placeholder={config?.placeholder ?? I18n.t('Select Variable')}
      />
    </>
  );
};

VariableSelector.renderKey = 'variable-selector-render-key';
export const InjectVariableSelector = createInjectMaterial(VariableSelector);

export { VariableSelectorProvider } from './context';
