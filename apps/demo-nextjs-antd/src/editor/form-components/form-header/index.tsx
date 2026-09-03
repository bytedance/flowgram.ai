/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

'use client';

import './index.scss';
import { useEffect, useState } from 'react';

import { Button } from 'antd';
import { CommandService, useClientContext } from '@flowgram.ai/free-layout-editor';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';

import { FlowCommandId } from '@editor/shortcuts';
import { useIsSidebar, useNodeRenderContext } from '@editor/hooks';
import { NodeMenu } from '@editor/components/node-menu';
import { toggleLoopExpanded } from '@editor/utils';
import { getIcon } from './utils';
import { TitleInput } from './title-input';
import { Header, Operators } from './styles';

export function FormHeader() {
  const { node, expanded, toggleExpand, readonly } = useNodeRenderContext();
  const [titleEdit, updateTitleEdit] = useState<boolean>(false);
  const ctx = useClientContext();
  const isSidebar = useIsSidebar();
  const handleExpand = (e: React.MouseEvent) => {
    toggleExpand();
    e.stopPropagation(); // Disable clicking prevents the sidebar from opening
  };
  const handleDelete = () => {
    ctx.get<CommandService>(CommandService).executeCommand(FlowCommandId.DELETE, [node]);
  };

  useEffect(() => {
    if (node.flowNodeType === 'loop') {
      toggleLoopExpanded(node, expanded);
    }
  }, [expanded, node, node.blocks.length]);

  return (
    <Header className="node-form-header">
      {getIcon(node)}
      <TitleInput readonly={readonly} updateTitleEdit={updateTitleEdit} titleEdit={titleEdit} />
      {node?.renderData.expandable && !isSidebar && (
        <Button
          type="text"
          icon={expanded ? <CaretDownOutlined /> : <CaretUpOutlined />}
          size="small"
          onClick={handleExpand}
        />
      )}
      {readonly ? undefined : (
        <Operators>
          <NodeMenu node={node} deleteNode={handleDelete} updateTitleEdit={updateTitleEdit} />
        </Operators>
      )}
    </Header>
  );
}