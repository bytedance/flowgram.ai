/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { useEffect } from 'react';

import { useRefresh } from '@flowgram.ai/utils';
import { FlowNodeFormData } from '@flowgram.ai/form-core';
import { Errors, Warnings } from '@flowgram.ai/form';
import { FormState, useFormErrors, useFormState, useFormWarnings } from '@flowgram.ai/form';
import { FlowNodeEntity } from '@flowgram.ai/document';

import { FormModelV2 } from './form-model-v2';

/**
 * Listen to Form's values and refresh the React component.
 * By providing related node, you can use this hook outside the Form Component.
 * @param node
 */
export function useWatchFormValues<T = any>(node: FlowNodeEntity): T | undefined {
  const formModel = node.getData(FlowNodeFormData).getFormModel<FormModelV2>();
  const refresh = useRefresh();

  useEffect(() => {
    const disposable = formModel.nativeFormModel?.onFormValuesChange(() => {
      refresh();
    });
    return () => disposable?.dispose();
  }, [formModel.nativeFormModel]);

  return formModel.getValues<T>();
}

/**
 * Listen to Form's value in a certain path and refresh the React component.
 * By providing related node, you can use this hook outside the Form Component.
 * @param node
 */
export function useWatchFormValueIn<T = any>(node: FlowNodeEntity, name: string): T | undefined {
  const formModel = node.getData(FlowNodeFormData).getFormModel<FormModelV2>();
  const refresh = useRefresh();

  useEffect(() => {
    const disposable = formModel.nativeFormModel?.onFormValuesChange(({ name: changedName }) => {
      if (name === changedName) {
        refresh();
      }
    });

    return () => disposable?.dispose();
  }, [name, formModel.nativeFormModel]);

  return formModel.getValueIn<T>(name);
}

/**
 * Listen to FormModel's initialization and refresh React component.
 * By providing related node, you can use this hook outside the Form Component.
 * @param node
 */
export function useInitializedFormModel(node: FlowNodeEntity) {
  const formModel = node.getData(FlowNodeFormData).getFormModel<FormModelV2>();
  const refresh = useRefresh();

  useEffect(() => {
    const disposable = formModel.onInitialized(() => {
      refresh();
    });
    return () => disposable.dispose();
  }, [formModel]);

  return formModel;
}

/**
 * Get Form's state, Form State is a proxy, it will refresh the React component when the value you accessed changed
 * By providing related node, you can use this hook outside the Form Component.
 * @param node
 */
export function useWatchFormState(node: FlowNodeEntity): FormState | undefined {
  const formModel = useInitializedFormModel(node);
  return useFormState(formModel.formControl);
}

/**
 * Get Form's errors, Form errors is a proxy, it will refresh the React component when the value you accessed changed
 * By providing related node, you can use this hook outside the Form Component.
 * @param node
 */
export function useWatchFormErrors(node: FlowNodeEntity): Errors | undefined {
  const formModel = useInitializedFormModel(node);
  return useFormErrors(formModel.formControl);
}

/**
 * Get Form's warnings, Form warnings is a proxy, it will refresh the React component when the value you accessed changed
 * By providing related node, you can use this hook outside the Form Component.
 * @param node
 */
export function useWatchFormWarnings(node: FlowNodeEntity): Warnings | undefined {
  const formModel = useInitializedFormModel(node);
  return useFormWarnings(formModel.formControl);
}
