/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React, { useCallback } from 'react';

import {
  IJsonSchema,
  JsonSchemaTypeManager,
  JsonSchemaUtils,
  useTypeManager,
} from '@flowgram.ai/json-schema';
import { ASTMatch, BaseVariableField, useAvailableVariables } from '@flowgram.ai/editor';
import { TreeNodeData } from '@douyinfe/semi-ui/lib/es/tree';
import { Icon } from '@douyinfe/semi-ui';

import { useVariableSelectorContext } from './context';

type VariableField = BaseVariableField<{
  icon?: string | JSX.Element;
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

  const typeManager = useTypeManager() as JsonSchemaTypeManager;
  const variables = useAvailableVariables();

  const getVariableTypeIcon = useCallback((variable: VariableField) => {
    if (variable.meta?.icon) {
      if (typeof variable.meta.icon === 'string') {
        return <img style={{ marginRight: 8 }} width={12} height={12} src={variable.meta.icon} />;
      }

      return variable.meta.icon;
    }

    const schema = JsonSchemaUtils.astToSchema(variable.type, { drilldownObject: false });

    return <Icon size="small" svg={typeManager.getDisplayIcon(schema || {})} />;
  }, []);

  const renderVariable = (
    variable: VariableField,
    parentFields: VariableField[] = []
  ): TreeNodeData | null => {
    let type = variable?.type;

    if (!type) {
      return null;
    }

    let children: TreeNodeData[] | undefined;

    if (ASTMatch.isObject(type)) {
      children = (type.properties || [])
        .map((_property) => renderVariable(_property as VariableField, [...parentFields, variable]))
        .filter(Boolean) as TreeNodeData[];
    }

    const keyPath = [...parentFields.map((_field) => _field.key), variable.key];
    const key = keyPath.join('.');

    const isSchemaInclude = includeSchema
      ? JsonSchemaUtils.isASTMatchSchema(type, includeSchema)
      : true;
    const isSchemaExclude = excludeSchema
      ? JsonSchemaUtils.isASTMatchSchema(type, excludeSchema)
      : false;
    const isCustomSkip = skipVariable ? skipVariable(variable) : false;

    // disabled in meta when created
    const isMetaDisabled = variable.meta?.disabled;

    const isSchemaMatch = isSchemaInclude && !isSchemaExclude && !isCustomSkip && !isMetaDisabled;

    // If not match, and no children, return null
    if (!isSchemaMatch && !children?.length) {
      return null;
    }

    return {
      key: key,
      label: variable.meta?.title || variable.key,
      value: key,
      keyPath,
      icon: getVariableTypeIcon(variable),
      children,
      disabled: !isSchemaMatch,
      rootMeta: parentFields[0]?.meta || variable.meta,
      isRoot: !parentFields?.length,
    };
  };

  return [...variables.slice(0).reverse()]
    .map((_variable) => renderVariable(_variable as VariableField))
    .filter(Boolean) as TreeNodeData[];
}
