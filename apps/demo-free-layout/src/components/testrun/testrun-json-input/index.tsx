/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { FC } from 'react';

import { JsonValueEditor } from '../json-value-editor';
import { useFormMeta, useSyncDefault } from '../hooks';

import styles from './index.module.less';

interface TestRunJsonInputProps {
  values: Record<string, unknown>;
  setValues: (values: Record<string, unknown>) => void;
}

export const TestRunJsonInput: FC<TestRunJsonInputProps> = ({ values, setValues }) => {
  const formMeta = useFormMeta();

  useSyncDefault({
    formMeta,
    values,
    setValues,
  });

  return (
    <div className={styles['testrun-json-input']}>
      <JsonValueEditor value={values} onChange={setValues} />
    </div>
  );
};
