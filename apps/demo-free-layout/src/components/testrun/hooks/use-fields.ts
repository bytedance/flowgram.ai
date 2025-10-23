/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { TestRunFormField, TestRunFormMeta } from '../testrun-form/type';

export const useFields = (params: {
  formMeta: TestRunFormMeta;
  values: Record<string, unknown>;
  setValues: (values: Record<string, unknown>) => void;
}): TestRunFormField[] => {
  const { formMeta, values, setValues } = params;

  // Convert each meta item to a form field with value and onChange handler
  const fields: TestRunFormField[] = formMeta.map((meta) => {
    const currentValue = values[meta.name] ?? meta.defaultValue;

    const handleChange = (newValue: unknown): void => {
      setValues({
        ...values,
        [meta.name]: newValue,
      });
    };

    return {
      ...meta,
      value: currentValue,
      onChange: handleChange,
    };
  });

  return fields;
};
