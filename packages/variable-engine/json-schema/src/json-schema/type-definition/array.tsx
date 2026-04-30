/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';

import { IJsonSchema, JsonSchemaTypeRegistryCreator } from '../types';

export const arrayRegistryCreator: JsonSchemaTypeRegistryCreator = ({ typeManager }) => {
  const icon = (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5.23759 1.00342H2.00391V14.997H5.23759V13.6251H3.35127V2.37534H5.23759V1.00342Z"
        fill="currentColor"
      />
      <path
        d="M10.7624 1.00342H13.9961V14.997H10.7624V13.6251H12.6487V2.37534H10.7624V1.00342Z"
        fill="currentColor"
      />
    </svg>
  );

  const getDisplayIcon = (type: IJsonSchema): JSX.Element => {
    const item = type.items;
    const config = item ? typeManager.getTypeBySchema(item) : undefined;

    if (config?.type === 'array' && item) {
      return getDisplayIcon(item);
    }

    return config?.arrayIcon || icon;
  };
  return {
    type: 'array',

    label: 'Array',

    icon,

    container: true,

    getJsonPaths: (type: IJsonSchema) => {
      const itemDefinition = type.items && typeManager.getTypeBySchema(type.items);
      const childrenPath = itemDefinition?.getJsonPaths
        ? itemDefinition.getJsonPaths(type.items!)
        : [];

      return ['items', ...childrenPath];
    },

    getDefaultValue: () => [],

    getSupportedItemTypes: (): Array<{ type: string; disabled?: string }> =>
      typeManager.getTypeRegistriesWithParentType('array'),

    getTypeSchemaProperties: (type: IJsonSchema): Record<string, IJsonSchema> => {
      const itemDefinition = type.items && typeManager.getTypeBySchema(type.items);
      return (itemDefinition && itemDefinition.getTypeSchemaProperties?.(type.items!)) || {};
    },

    canAddField: (type: IJsonSchema) => {
      if (!type.items) {
        return false;
      }

      const childConfig = typeManager.getTypeBySchema(type.items);

      return childConfig?.canAddField?.(type.items) || false;
    },

    getItemType: (type) => type.items,

    getStringValueByTypeSchema: (type: IJsonSchema): string => {
      if (!type.items) {
        return type.type || '';
      }

      const childConfig = typeManager.getTypeBySchema(type.items);

      return [type.type, childConfig?.getStringValueByTypeSchema?.(type.items)].join('-');
    },

    getTypeSchemaByStringValue: (optionValue: string): IJsonSchema => {
      if (!optionValue) {
        return { type: 'array' };
      }

      const [root, ...rest] = optionValue.split('-');

      const rootType = typeManager.getTypeByName(root);

      if (!rootType) {
        return { type: 'array' };
      }

      let itemType;
      if (rootType.getTypeSchemaByStringValue) {
        itemType = rootType.getTypeSchemaByStringValue(rest.join('-'))!;
      } else {
        itemType = rootType?.getDefaultSchema();
      }

      return {
        type: 'array',
        items: itemType,
      };
    },

    getDefaultSchema: (): IJsonSchema => ({
      type: 'array',
      items: { type: 'string' },
    }),

    getPropertiesParent: (type: IJsonSchema) => {
      const itemDef = type.items && typeManager.getTypeBySchema(type.items);

      return itemDef && itemDef.getPropertiesParent
        ? itemDef.getPropertiesParent(type.items!)
        : type;
    },
    getDisplayIcon,
  };
};
