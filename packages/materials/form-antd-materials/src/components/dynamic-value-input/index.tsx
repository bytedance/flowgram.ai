/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';

import { Button } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

import {
  createInjectMaterial,
  type IFlowConstantRefValue,
  type IFlowConstantValue,
} from '@/shared';
import { type IJsonSchema, JsonSchemaUtils, useTypeManager } from '@/plugins';
import { InjectVariableSelector } from '@/components/variable-selector';
import { TypeSelector } from '@/components/type-selector';
import { ConstantInput, type ConstantInputStrategy } from '@/components/constant-input';

import { useIncludeSchema, useRefVariable, useSelectSchema } from './hooks';
import './styles.css';

interface PropsType {
  value?: IFlowConstantRefValue;
  onChange: (value?: IFlowConstantRefValue) => void;
  readonly?: boolean;
  hasError?: boolean;
  style?: React.CSSProperties;
  schema?: IJsonSchema;
  constantProps?: {
    strategies?: ConstantInputStrategy[];
    schema?: IJsonSchema;
    [key: string]: any;
  };
}

const DEFAULT_VALUE: IFlowConstantValue = {
  type: 'constant',
  content: '',
  schema: { type: 'string' },
};

export function DynamicValueInput({
  value,
  onChange,
  readonly,
  style,
  schema: schemaFromProps,
  constantProps,
}: PropsType) {
  const refVariable = useRefVariable(value);
  const [selectSchema, setSelectSchema] = useSelectSchema(schemaFromProps, constantProps, value);
  const includeSchema = useIncludeSchema(schemaFromProps);
  const typeManager = useTypeManager();

  const renderTypeSelector = () => {
    if (schemaFromProps) {
      return <TypeSelector value={schemaFromProps} readonly />;
    }

    if (value?.type === 'ref') {
      const schema = refVariable?.type ? JsonSchemaUtils.astToSchema(refVariable.type) : undefined;
      return <TypeSelector value={schema} readonly />;
    }

    return (
      <TypeSelector
        value={selectSchema}
        onChange={(nextSchema) => {
          const schema = nextSchema || { type: 'string' };
          setSelectSchema(schema);

          let content = typeManager.getDefaultValue(schema);
          if (schema.type === 'object') {
            content = '{}';
          } else if (schema.type === 'array') {
            content = '[]';
          }

          onChange({ type: 'constant', content, schema });
        }}
        readonly={readonly}
      />
    );
  };

  const renderMain = () => {
    if (value?.type === 'ref') {
      return (
        <InjectVariableSelector
          style={{ width: '100%' }}
          value={value.content}
          onChange={(nextValue) =>
            onChange(nextValue ? { type: 'ref', content: nextValue } : DEFAULT_VALUE)
          }
          includeSchema={includeSchema}
          readonly={readonly}
        />
      );
    }

    const constantSchema = schemaFromProps || selectSchema || { type: 'string' };
    return (
      <ConstantInput
        value={value?.content}
        onChange={(content) => onChange({ type: 'constant', content, schema: constantSchema })}
        schema={constantSchema}
        readonly={readonly}
        fallbackRenderer={() => (
          <InjectVariableSelector
            style={{ width: '100%' }}
            onChange={(nextValue) =>
              onChange(nextValue ? { type: 'ref', content: nextValue } : DEFAULT_VALUE)
            }
            includeSchema={includeSchema}
            readonly={readonly}
          />
        )}
        {...constantProps}
        strategies={[...(constantProps?.strategies || [])]}
      />
    );
  };

  const renderTrigger = () => (
    <InjectVariableSelector
      style={{ width: '100%' }}
      value={value?.type === 'ref' ? value.content : undefined}
      onChange={(nextValue) => onChange({ type: 'ref', content: nextValue })}
      includeSchema={includeSchema}
      readonly={readonly}
      triggerRender={() => (
        <Button
          aria-label="Select variable"
          disabled={readonly}
          icon={<SettingOutlined />}
          size="small"
          type="text"
        />
      )}
    />
  );

  return (
    <div className="gedit-m-dynamic-value-input-container" style={style}>
      <div className="gedit-m-dynamic-value-input-type">{renderTypeSelector()}</div>
      <div className="gedit-m-dynamic-value-input-main">{renderMain()}</div>
      <div className="gedit-m-dynamic-value-input-trigger">{renderTrigger()}</div>
    </div>
  );
}

DynamicValueInput.renderKey = 'dynamic-value-input-render-key';
export const InjectDynamicValueInput = createInjectMaterial(DynamicValueInput);
