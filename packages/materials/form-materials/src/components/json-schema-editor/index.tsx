/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React, { useMemo, useState } from 'react';

import { IJsonSchema, JsonSchemaTypeManager, useTypeManager } from '@flowgram.ai/json-schema';
import { I18n } from '@flowgram.ai/editor';
import { Button, Checkbox, IconButton } from '@douyinfe/semi-ui';
import {
  IconExpand,
  IconShrink,
  IconPlus,
  IconChevronDown,
  IconChevronRight,
  IconMinus,
} from '@douyinfe/semi-icons';

import { InjectTypeSelector } from '@/components/type-selector';
import { BlurInput } from '@/components/blur-input';

import { ConfigType, PropertyValueType } from './types';
import { IconAddChildren } from './icon';
import { usePropertiesEdit } from './hooks';
import { DefaultValue } from './default-value';

import './styles.css';

const DEFAULT = { type: 'object' };

function getSchemaDefaultValue(
  typeManager: JsonSchemaTypeManager,
  schema: Partial<IJsonSchema> | undefined
) {
  if (schema?.type === 'object') {
    return '{}';
  }

  if (schema?.type === 'array') {
    return '[]';
  }

  return typeManager.getDefaultValue(schema || {});
}

export function JsonSchemaEditor(props: {
  value?: IJsonSchema;
  onChange?: (value: IJsonSchema) => void;
  config?: ConfigType;
  className?: string;
  readonly?: boolean;
}) {
  const { value = DEFAULT, config = {}, onChange: onChangeProps, readonly } = props;
  const { propertyList, onAddProperty, onRemoveProperty, onEditProperty } = usePropertiesEdit(
    value,
    onChangeProps
  );

  return (
    <div className="gedit-m-json-schema-editor-container">
      <div className="gedit-m-json-schema-editor-tree-items">
        {propertyList.map((_property) => (
          <PropertyEdit
            readonly={readonly}
            key={_property.key}
            value={_property}
            config={config}
            onChange={(_v) => {
              onEditProperty(_property.key!, _v);
            }}
            onRemove={() => {
              onRemoveProperty(_property.key!);
            }}
          />
        ))}
      </div>
      <Button
        disabled={readonly}
        size="small"
        style={{ marginTop: 10, marginLeft: 16 }}
        icon={<IconPlus />}
        onClick={onAddProperty}
      >
        {config?.addButtonText ?? I18n.t('Add')}
      </Button>
    </div>
  );
}

function PropertyEdit(props: {
  value?: PropertyValueType;
  config?: ConfigType;
  onChange?: (value: PropertyValueType) => void;
  onRemove?: () => void;
  readonly?: boolean;
  $isLast?: boolean;
  $level?: number; // 添加层级属性
}) {
  const { value, config, readonly, $level = 0, onChange: onChangeProps, onRemove, $isLast } = props;

  const [expand, setExpand] = useState(false);
  const [collapse, setCollapse] = useState(false);
  const typeManager = useTypeManager() as JsonSchemaTypeManager;

  const { name, type, items, default: defaultValue, description, isPropertyRequired } = value || {};

  const typeSelectorValue = useMemo(() => ({ type, items }), [type, items]);

  const { propertyList, canAddField, onAddProperty, onRemoveProperty, onEditProperty } =
    usePropertiesEdit(value, onChangeProps);

  const onChange = (key: string, _value: any) => {
    onChangeProps?.({
      ...(value || {}),
      [key]: _value,
    });
  };

  const showCollapse = canAddField && propertyList.length > 0;

  return (
    <>
      <div
        className={`gedit-m-json-schema-editor-tree-item-left ${$level > 0 ? 'show-line' : ''} ${
          $isLast ? 'is-last' : ''
        } ${showCollapse ? 'show-collapse' : ''}`}
      >
        {showCollapse && (
          <div
            className="gedit-m-json-schema-editor-collapse-trigger"
            onClick={() => setCollapse((_collapse) => !_collapse)}
          >
            {collapse ? <IconChevronDown size="small" /> : <IconChevronRight size="small" />}
          </div>
        )}
      </div>
      <div className="gedit-m-json-schema-editor-tree-item-right">
        <div className="gedit-m-json-schema-editor-tree-item-main">
          <div className="gedit-m-json-schema-editor-row">
            <div className="gedit-m-json-schema-editor-name">
              <BlurInput
                disabled={readonly}
                placeholder={config?.placeholder ?? I18n.t('Input Variable Name')}
                size="small"
                value={name}
                onChange={(value) => onChange('name', value)}
              />
            </div>
            <div className="gedit-m-json-schema-editor-type">
              <InjectTypeSelector
                value={typeSelectorValue}
                readonly={readonly}
                onChange={(_value) => {
                  const nextTypeSchema = _value || {};
                  onChangeProps?.({
                    ...(value || {}),
                    ...nextTypeSchema,
                    default: getSchemaDefaultValue(typeManager, nextTypeSchema),
                  });
                }}
              />
            </div>
            <div className="gedit-m-json-schema-editor-required">
              <Checkbox
                disabled={readonly}
                checked={isPropertyRequired}
                onChange={(e) => onChange('isPropertyRequired', e.target.checked)}
              />
            </div>
            <div className="gedit-m-json-schema-editor-actions">
              <IconButton
                disabled={readonly}
                size="small"
                theme="borderless"
                icon={expand ? <IconShrink size="small" /> : <IconExpand size="small" />}
                onClick={() => {
                  setExpand((_expand) => !_expand);
                }}
              />
              {canAddField && (
                <IconButton
                  disabled={readonly}
                  size="small"
                  theme="borderless"
                  icon={<IconAddChildren />}
                  onClick={() => {
                    onAddProperty();
                    setCollapse(true);
                  }}
                />
              )}
              <IconButton
                disabled={readonly}
                size="small"
                theme="borderless"
                icon={<IconMinus size="small" />}
                onClick={onRemove}
              />
            </div>
          </div>
          {expand && (
            <div className="gedit-m-json-schema-editor-expand-detail">
              <div className="gedit-m-json-schema-editor-label">
                {config?.descTitle ?? I18n.t('Description')}
              </div>
              <BlurInput
                disabled={readonly}
                size="small"
                value={description}
                onChange={(value) => onChange('description', value)}
                placeholder={
                  config?.descPlaceholder ?? I18n.t('Help LLM to understand the property')
                }
              />
              {$level === 0 && (
                <>
                  <div className="gedit-m-json-schema-editor-label" style={{ marginTop: 10 }}>
                    {config?.defaultValueTitle ?? I18n.t('Default Value')}
                  </div>
                  <div className="gedit-m-json-schema-editor-default-value-wrapper">
                    <DefaultValue
                      value={defaultValue}
                      schema={value}
                      placeholder={config?.defaultValuePlaceholder ?? I18n.t('Default Value')}
                      onChange={(value) => onChange('default', value)}
                    />
                  </div>
                </>
              )}
            </div>
          )}
        </div>
        {showCollapse && (
          <div className={`gedit-m-json-schema-editor-collapsible ${collapse ? 'collapse' : ''}`}>
            <div className="gedit-m-json-schema-editor-tree-items shrink">
              {propertyList.map((_property, index) => (
                <PropertyEdit
                  readonly={readonly}
                  key={_property.key}
                  value={_property}
                  config={config}
                  $level={$level + 1} // 传递递增的层级
                  onChange={(_v) => {
                    onEditProperty(_property.key!, _v);
                  }}
                  onRemove={() => {
                    onRemoveProperty(_property.key!);
                  }}
                  $isLast={index === propertyList.length - 1}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
