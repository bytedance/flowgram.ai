/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React, { useMemo } from 'react';

import { isPlainObject } from 'lodash-es';
import { useScopeAvailable } from '@flowgram.ai/editor';

import { IInputsValues } from '@/shared/flow-value';
import { FlowValueUtils } from '@/shared';
import { DisplayFlowValue } from '@/components/display-flow-value';

import './styles.css';
import { DisplaySchemaTag } from '../display-schema-tag';

interface PropsType {
  value?: IInputsValues;
  showIconInTree?: boolean;
}

export function DisplayInputsValues({ value, showIconInTree }: PropsType) {
  const childEntries = Object.entries(value || {});

  return (
    <div className="gedit-m-display-inputs-wrapper">
      {childEntries.map(([key, value]) => {
        if (FlowValueUtils.isFlowValue(value)) {
          return (
            <DisplayFlowValue key={key} title={key} value={value} showIconInTree={showIconInTree} />
          );
        }

        if (isPlainObject(value)) {
          return (
            <DisplayInputsValueAllInTag
              key={key}
              title={key}
              value={value}
              showIconInTree={showIconInTree}
            />
          );
        }

        return null;
      })}
    </div>
  );
}

export function DisplayInputsValueAllInTag({
  value,
  title,
  showIconInTree,
}: PropsType & {
  title: string;
}) {
  const available = useScopeAvailable();

  const schema = useMemo(
    () => FlowValueUtils.inferJsonSchema(value, available.scope),
    [available.version, value]
  );

  return <DisplaySchemaTag title={title} value={schema} showIconInTree={showIconInTree} />;
}
