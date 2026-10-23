/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { useEffect } from 'react';

import { useRefresh } from '@flowgram.ai/utils';

import { FieldName, FieldValue } from '../types';
import { Path } from '../core/path';
import { useFormModel } from './utils';

/**
 * Listen to the field data change and refresh the React component.
 * @param name the field's uniq name (path)
 */
export function useWatch<TValue = FieldValue>(name: FieldName): TValue {
  const refresh = useRefresh();

  const formModel = useFormModel();

  if (!formModel) {
    throw new Error('[Form] error in useWatch, formModel not found');
  }

  const value = formModel.getValueIn<TValue>(name);

  useEffect(() => {
    const watchedPath = new Path(name).value;
    const disposable = formModel.onFormValuesUpdated(({ name: updatedName }) => {
      const updatedPath = new Path(updatedName).value;
      if (
        watchedPath.every((segment, index) => segment === updatedPath[index]) ||
        updatedPath.every((segment, index) => segment === watchedPath[index])
      ) {
        refresh();
      }
    });
    return () => disposable.dispose();
  }, [name, formModel]);

  return value;
}
