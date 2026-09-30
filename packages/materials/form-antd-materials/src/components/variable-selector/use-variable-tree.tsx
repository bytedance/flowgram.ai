/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { useCallback } from 'react';

import { ASTMatch, type BaseVariableField, useAvailableVariables } from '@flowgram.ai/editor';

import { type MaterialIcon, renderMaterialIcon } from '@/shared/render-icon';
import { type IJsonSchema, JsonSchemaUtils, useTypeManager } from '@/plugins';

import type { TreeNodeData } from './types';
import { useVariableSelectorContext } from './context';

type VariableField = BaseVariableField<{
  icon?: MaterialIcon;
  title?: string;
  disabled?: boolean;
}>;

export function useVariableTree(params: {
  includeSchema?: IJsonSchema | IJsonSchema[];
  excludeSchema?: IJsonSchema | IJsonSchema[];
  skipVariable?: (variable: VariableField) => boolean;
}): TreeNodeData[] {
  const context = useVariableSelectorContext();
  const {
    includeSchema = context.includeSchema,
    excludeSchema = context.excludeSchema,
    skipVariable = context.skipVariable,
  } = params;

  const typeManager = useTypeManager();
  const variables = useAvailableVariables();

  const getVariableTypeIcon = useCallback(
    (variable: VariableField) => {
      if (variable.meta?.icon) {
        return renderMaterialIcon(variable.meta.icon);
      }

      const schema = JsonSchemaUtils.astToSchema(variable.type, { drilldownObject: false });
      return typeManager.getDisplayIcon(schema || {});
    },
    [typeManager]
  );

  const renderVariable = (
    variable: VariableField,
    parentFields: VariableField[] = []
  ): TreeNodeData | null => {
    const type = variable?.type;
    if (!type) {
      return null;
    }

    let children: TreeNodeData[] | undefined;
    if (ASTMatch.isObject(type)) {
      children = (type.properties || [])
        .map((property) => renderVariable(property as VariableField, [...parentFields, variable]))
        .filter(Boolean) as TreeNodeData[];
    }

    const keyPath = [...parentFields.map((field) => field.key), variable.key];
    const key = keyPath.join('.');
    const isSchemaInclude = includeSchema
      ? JsonSchemaUtils.isASTMatchSchema(type, includeSchema)
      : true;
    const isSchemaExclude = excludeSchema
      ? JsonSchemaUtils.isASTMatchSchema(type, excludeSchema)
      : false;
    const isSchemaMatch =
      isSchemaInclude && !isSchemaExclude && !skipVariable?.(variable) && !variable.meta?.disabled;

    if (!isSchemaMatch && !children?.length) {
      return null;
    }

    return {
      key,
      title: variable.meta?.title || variable.key,
      value: key,
      keyPath,
      icon: getVariableTypeIcon(variable),
      children,
      disabled: !isSchemaMatch,
      rootMeta: parentFields[0]?.meta || variable.meta,
      isRoot: parentFields.length === 0,
    };
  };

  return [...variables.slice(0).reverse()]
    .map((variable) => renderVariable(variable as VariableField))
    .filter(Boolean) as TreeNodeData[];
}
