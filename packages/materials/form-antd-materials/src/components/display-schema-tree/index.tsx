/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';

import {
  type IJsonSchema,
  type JsonSchemaTypeManager,
  useTypeManager,
} from '@flowgram.ai/json-schema';

import './styles.css';

interface PropsType {
  value?: IJsonSchema;
  parentKey?: string;
  depth?: number;
  drilldown?: boolean;
  showIcon?: boolean;
  typeManager?: JsonSchemaTypeManager;
}

export function DisplaySchemaTree(props: Omit<PropsType, 'parentKey' | 'depth'>) {
  return <SchemaTree {...props} />;
}

function SchemaTree(props: PropsType) {
  const {
    value: schema = {},
    drilldown = true,
    depth = 0,
    showIcon = true,
    parentKey = '',
  } = props || {};

  const typeManager = useTypeManager() as JsonSchemaTypeManager;

  const config = typeManager.getTypeBySchema(schema);
  const title = typeManager.getComplexText(schema);
  const icon = typeManager?.getDisplayIcon(schema);
  let properties: IJsonSchema['properties'] =
    drilldown && config ? config.getTypeSchemaProperties(schema) : {};
  const childEntries = Object.entries(properties || {});

  return (
    <div className={`gedit-m-display-schema-tree-item depth-${depth}`} key={parentKey || 'root'}>
      <div className="gedit-m-display-schema-tree-row">
        {depth !== 0 && <div className="gedit-m-display-schema-tree-horizontal-line" />}
        {showIcon &&
          icon &&
          React.cloneElement(icon, {
            className: 'tree-icon',
          })}
        <div className="gedit-m-display-schema-tree-title">
          {parentKey ? (
            <>
              {`${parentKey} (`}
              {title}
              {')'}
            </>
          ) : (
            title
          )}
        </div>
      </div>
      {childEntries?.length ? (
        <div className="gedit-m-display-schema-tree-level">
          {childEntries.map(([key, value]) => (
            <SchemaTree key={key} {...props} parentKey={key} value={value} depth={depth + 1} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
