/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { useMemo } from 'react';

import { isPlainObject } from 'lodash-es';

import { FlowValueUtils } from '@/shared';
import { useObjectList } from '@/hooks';

interface ListItem {
  id: string;
  key?: string;
  value?: any;
}

export function useChildList(
  value?: any,
  onChange?: (value: any) => void
): {
  canAddField: boolean;
  hasChildren: boolean;
  list: ListItem[];
  add: (defaultValue?: any) => void;
  updateKey: (id: string, key: string) => void;
  updateValue: (id: string, value: any) => void;
  remove: (id: string) => void;
} {
  const canAddField = useMemo(() => {
    if (!isPlainObject(value)) {
      return false;
    }

    if (FlowValueUtils.isFlowValue(value)) {
      // Constant Object Value Can Add child fields
      return FlowValueUtils.isConstant(value) && value?.schema?.type === 'object';
    }

    return true;
  }, [value]);

  const objectListValue = useMemo(() => {
    if (isPlainObject(value)) {
      if (FlowValueUtils.isFlowValue(value)) {
        return undefined;
      }
      return value;
    }
    return undefined;
  }, [value]);

  const { list, add, updateKey, updateValue, remove } = useObjectList<any>({
    value: objectListValue,
    onChange: (value) => {
      onChange?.(value);
    },
    sortIndexKey: (value) => (FlowValueUtils.isFlowValue(value) ? 'extra.index' : ''),
  });

  const hasChildren = useMemo(
    () => canAddField && (list.length > 0 || Object.keys(objectListValue || {}).length > 0),
    [canAddField, list.length, Object.keys(objectListValue || {}).length]
  );

  return {
    canAddField,
    hasChildren,
    list,
    add,
    updateKey,
    updateValue,
    remove,
  };
}
