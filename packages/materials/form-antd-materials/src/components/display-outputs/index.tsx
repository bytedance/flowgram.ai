/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React, { useLayoutEffect } from 'react';

import { IJsonSchema, JsonSchemaTypeManager, JsonSchemaUtils } from '@flowgram.ai/json-schema';
import { useCurrentScope, useRefresh } from '@flowgram.ai/editor';

import { DisplaySchemaTag } from '@/components/display-schema-tag';

import './styles.css';

interface PropsType {
  value?: IJsonSchema;
  showIconInTree?: boolean;
  displayFromScope?: boolean;
  typeManager?: JsonSchemaTypeManager;
  style?: React.CSSProperties;
}

export function DisplayOutputs({ value, showIconInTree, displayFromScope, style }: PropsType) {
  const scope = useCurrentScope();
  const refresh = useRefresh();

  useLayoutEffect(() => {
    if (!displayFromScope || !scope) {
      return () => null;
    }

    const disposable = scope.output.onListOrAnyVarChange(() => {
      refresh();
    });

    return () => {
      disposable.dispose();
    };
  }, [displayFromScope]);

  const properties: IJsonSchema['properties'] = displayFromScope
    ? (scope?.output.variables || []).reduce((acm, curr) => {
        acm = {
          ...acm,
          ...(JsonSchemaUtils.astToSchema(curr.type)?.properties || {}),
        };
        return acm;
      }, {})
    : value?.properties || {};

  const childEntries = Object.entries(properties || {});

  return (
    <div className="gedit-m-display-outputs-wrapper" style={style}>
      {childEntries.map(([key, schema]) => (
        <DisplaySchemaTag
          key={key}
          title={key}
          value={schema}
          showIconInTree={showIconInTree}
          warning={!schema}
        />
      ))}
    </div>
  );
}
