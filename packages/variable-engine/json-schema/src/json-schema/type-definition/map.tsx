/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';

import { IJsonSchema, JsonSchemaTypeRegistryCreator } from '../types';
import { arrayMapIcon } from './array-icons';

export const mapRegistryCreator: JsonSchemaTypeRegistryCreator = ({ typeManager }) => {
  const icon = (
    <svg
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
    >
      <path
        d="M877.860571 938.642286h-645.851428c-27.574857 0-54.052571-11.337143-73.508572-31.744a110.957714 110.957714 0 0 1-30.500571-76.8V193.828571c0-28.745143 10.971429-56.32 30.500571-76.726857a101.888 101.888 0 0 1 73.508572-31.817143h574.171428c27.501714 0 53.979429 11.337143 73.508572 31.744 19.529143 20.333714 30.500571 48.054857 30.500571 76.8v522.020572a34.157714 34.157714 0 0 1-6.948571 22.820571c-37.156571 19.382857-57.636571 39.350857-57.636572 72.630857 0 39.716571 19.894857 50.029714 57.636572 72.777143a34.816 34.816 0 0 1-8.045714 49.298286 32.256 32.256 0 0 1-17.334858 5.193143z m-32.256-254.537143V193.828571a40.228571 40.228571 0 0 0-39.497142-41.179428H232.009143a40.301714 40.301714 0 0 0-39.497143 41.252571V699.245714c17.773714-9.874286 37.449143-14.994286 57.417143-14.921143h595.675428v-0.073142z m-595.675428 187.245714h566.198857c-22.893714-11.190857-27.940571-39.497143-28.013714-59.977143 0-20.260571 3.218286-43.885714 28.013714-59.904h-566.125714c-31.670857 0-57.417143 26.843429-57.417143 59.977143 0 33.060571 25.746286 59.904 57.344 59.904z"
        fill="currentColor"
      ></path>
      <path
        d="M320 128m32.036571 0l-0.073142 0q32.036571 0 32.036571 32.036571l0 511.926858q0 32.036571-32.036571 32.036571l0.073142 0q-32.036571 0-32.036571-32.036571l0-511.926858q0-32.036571 32.036571-32.036571Z"
        fill="currentColor"
      ></path>
    </svg>
  );

  return {
    type: 'map',

    label: 'Map',

    icon,

    arrayIcon: arrayMapIcon,

    container: true,

    getJsonPaths: (type: IJsonSchema) => {
      const itemDefinition =
        type.additionalProperties && typeManager.getTypeBySchema(type.additionalProperties);
      const childrenPath = itemDefinition?.getJsonPaths
        ? itemDefinition.getJsonPaths(type.additionalProperties!)
        : [];

      return ['additionalProperties', ...childrenPath];
    },

    getDefaultValue: () => [],

    getSupportedItemTypes: (): Array<{ type: string; disabled?: string }> =>
      typeManager.getTypeRegistriesWithParentType('map'),

    getTypeSchemaProperties: (type: IJsonSchema): Record<string, IJsonSchema> => {
      const itemDefinition =
        type.additionalProperties && typeManager.getTypeBySchema(type.additionalProperties);
      return (
        (itemDefinition && itemDefinition.getTypeSchemaProperties?.(type.additionalProperties!)) ||
        {}
      );
    },

    canAddField: (type: IJsonSchema) => {
      if (!type.additionalProperties) {
        return false;
      }

      const childConfig = typeManager.getTypeBySchema(type.additionalProperties);

      return childConfig?.canAddField?.(type.additionalProperties) || false;
    },

    getItemType: (type) => type.additionalProperties,

    getStringValueByTypeSchema: (type: IJsonSchema): string => {
      if (!type.additionalProperties) {
        return type.type || '';
      }

      const childConfig = typeManager.getTypeBySchema(type.additionalProperties);

      return [type.type, childConfig?.getStringValueByTypeSchema?.(type.additionalProperties)].join(
        '-'
      );
    },

    getTypeSchemaByStringValue: (optionValue: string): IJsonSchema => {
      if (!optionValue) {
        return { type: 'map' };
      }

      const [root, ...rest] = optionValue.split('-');

      const rooType = typeManager.getTypeByName(root);

      if (!rooType) {
        return { type: 'map' };
      }

      let itemType;
      if (rooType.getTypeSchemaByStringValue) {
        itemType = rooType.getTypeSchemaByStringValue(rest.join('-'))!;
      } else {
        itemType = rooType?.getDefaultSchema();
      }

      return {
        type: 'map',
        additionalProperties: itemType,
      };
    },

    getDefaultSchema: (): IJsonSchema => ({
      type: 'map',
      additionalProperties: { type: 'string' },
    }),

    getPropertiesParent: (type: IJsonSchema) => {
      const itemDef =
        type.additionalProperties && typeManager.getTypeBySchema(type.additionalProperties);

      return itemDef && itemDef.getPropertiesParent
        ? itemDef.getPropertiesParent(type.additionalProperties!)
        : type;
    },
  };
};
