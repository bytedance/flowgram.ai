/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import * as React from 'react';

import { isFunction } from 'lodash-es';
import { DisposableCollection, useRefresh } from '@flowgram.ai/utils';
import { useReadonlyReactiveState } from '@flowgram.ai/reactive';

import {
  FieldArrayOptions,
  FieldArrayRenderProps,
  FieldModelState,
  FieldName,
  FieldValue,
} from '../types/field';
import { FormModelState } from '../types';
import { toFieldArray } from '../core/to-field-array';
import { FieldArrayModel } from '../core/field-array-model';
import { toFieldState, toFormState } from '../core';
import { useFormModel } from './utils';
import { FieldModelContext } from './context';

export type FieldArrayProps<TValue> = FieldArrayOptions<TValue> & {
  /**
   * A React element or a render prop
   */
  children?: ((props: FieldArrayRenderProps<TValue>) => React.ReactElement) | React.ReactElement;
  /**
   * Dependencies of the current field. If a field name is given in deps, current field will re-render if the given field name data is updated
   */
  deps?: FieldName[];
};

/**
 * HOC That declare an array field, an FieldArray model will be created when it's rendered. Multiple FieldArray rendering with a same name will link to the same model, which means they shared data、 status and methods
 */
export function FieldArray<TValue extends FieldValue>({
  name,
  defaultValue,
  deps,
  render,
  children,
}: FieldArrayProps<TValue>): React.ReactElement {
  const formModel = useFormModel();
  const fieldModel =
    formModel.getField<FieldArrayModel<TValue>>(name) ||
    (formModel.createFieldArray(name) as FieldArrayModel<any>);

  const field = React.useMemo(() => toFieldArray<TValue>(fieldModel), [fieldModel]);

  const refresh = useRefresh();

  const fieldModelState = useReadonlyReactiveState<FieldModelState>(fieldModel.reactiveState);
  const formModelState = useReadonlyReactiveState<FormModelState>(formModel.reactiveState);

  const fieldState = toFieldState(fieldModelState);
  const formState = React.useMemo(() => toFormState(formModelState), [formModelState]);

  React.useEffect(() => {
    // 当 FieldArray 加上 key 且 key 变化时候会销毁 FieldModel
    if (fieldModel.disposed) {
      refresh();
      return () => {};
    }
    fieldModel.renderCount = fieldModel.renderCount + 1;

    if (formModel.getValueIn(name) === undefined && defaultValue !== undefined) {
      formModel.setInitValueIn(name, defaultValue);
      refresh();
    }

    const disposableCollection = new DisposableCollection();

    disposableCollection.push(
      fieldModel.onValueChange(() => {
        refresh();
      })
    );

    if (deps) {
      deps.forEach((dep) => {
        const disposable = formModel.getField(dep)?.onValueChange(() => {
          refresh();
        });
        if (disposable) {
          disposableCollection.push(disposable);
        }
      });
    }
    return () => {
      disposableCollection.dispose();

      if (fieldModel.renderCount > 1) {
        fieldModel.renderCount = fieldModel.renderCount - 1;
      } else {
        const newFieldModel = formModel.getField(fieldModel.name);
        if (newFieldModel === fieldModel) fieldModel.dispose();
      }
    };
  }, [fieldModel]);

  const renderInner = () => {
    if (render && isFunction(render)) {
      // @ts-ignore
      return render({ field, fieldState, formState });
    }

    if (isFunction(children)) {
      return children({ field, fieldState, formState });
    }
    return <>Invalid Array render</>;
  };

  if (fieldModel.disposed) return <></>;

  return (
    <FieldModelContext.Provider value={fieldModel}>{renderInner()}</FieldModelContext.Provider>
  );
}
