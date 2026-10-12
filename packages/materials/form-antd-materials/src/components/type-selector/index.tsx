/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React, { useMemo } from 'react';

import { Button, Cascader } from 'antd';

import { createInjectMaterial } from '@/shared';
import { type IJsonSchema, useTypeManager } from '@/plugins';

import { ArrayIcons, VariableTypeIcons, getSchemaIcon } from './constants';

export interface TypeSelectorProps {
  value?: Partial<IJsonSchema>;
  onChange?: (value?: Partial<IJsonSchema>) => void;
  readonly?: boolean;
  /** @deprecated use readonly instead */
  disabled?: boolean;
  style?: React.CSSProperties;
}

export const getTypeSelectValue = (value?: Partial<IJsonSchema>): string[] | undefined => {
  if (value?.type === 'array' && value?.items) {
    return [value.type, ...(getTypeSelectValue(value.items) || [])];
  }

  return value?.type ? [value.type] : undefined;
};

export const parseTypeSelectValue = (value?: string[]): Partial<IJsonSchema> | undefined => {
  const [type, ...subTypes] = value || [];

  if (!type) {
    return undefined;
  }

  if (type === 'array') {
    return { type: 'array', items: parseTypeSelectValue(subTypes) };
  }

  return { type };
};

export function TypeSelector(props: TypeSelectorProps) {
  const { value, onChange, readonly, disabled, style } = props;

  const selectValue = useMemo(() => getTypeSelectValue(value), [value]);
  const typeManager = useTypeManager();
  const isDisabled = readonly || disabled;

  const options = useMemo(
    () =>
      typeManager.getTypeRegistriesWithParentType().map((registry) => {
        const isArray = registry.type === 'array';

        return {
          label: (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
              {registry.icon}
              {registry.label || registry.type}
            </span>
          ),
          value: registry.type,
          children: isArray
            ? typeManager.getTypeRegistriesWithParentType('array').map((itemRegistry) => ({
                label: (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                    {typeManager.getDisplayIcon({
                      type: 'array',
                      items: { type: itemRegistry.type },
                    })}
                    {itemRegistry.label || itemRegistry.type}
                  </span>
                ),
                value: itemRegistry.type,
              }))
            : undefined,
        };
      }),
    [typeManager]
  );

  const icon = typeManager.getDisplayIcon(value || {});

  return (
    <Cascader
      disabled={isDisabled}
      size="small"
      options={options}
      value={selectValue}
      onChange={(nextValue) => {
        onChange?.(parseTypeSelectValue(nextValue as string[]));
      }}
    >
      <Button
        aria-label="Select type"
        disabled={isDisabled}
        icon={icon}
        size="small"
        style={{
          ...(isDisabled ? { pointerEvents: 'none' } : {}),
          ...style,
        }}
      />
    </Cascader>
  );
}

TypeSelector.renderKey = 'type-selector-render-key';
export const InjectTypeSelector = createInjectMaterial(TypeSelector);

export { ArrayIcons, VariableTypeIcons, getSchemaIcon };
