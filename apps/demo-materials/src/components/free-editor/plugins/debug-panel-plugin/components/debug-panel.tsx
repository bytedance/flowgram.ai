/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { useState } from 'react';

import styled from 'styled-components';
import { Button, SideSheet, Tabs, Tooltip } from '@douyinfe/semi-ui';
import { IconTerminal } from '@douyinfe/semi-icons';

import { WorkflowJsonEditor } from './workflow-json-editor';
import { FullVariableList } from './full-variable-list';

const PanelWrapper = styled.div`
  position: relative;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.1);
`;

const DebugPanelButton = styled(Button)`
  position: absolute;
  top: 0;
  right: 0;
  border-radius: 20px;
  width: 90px;
  height: 40px;
  z-index: 999;
`;

export function DebugPanel() {
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <PanelWrapper>
      <Tooltip content="Toggle Debug Panel">
        <DebugPanelButton theme="light" onClick={() => setOpen((_open) => !_open)}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <IconTerminal />
            Debug
          </div>
        </DebugPanelButton>
      </Tooltip>
      <SideSheet
        title="Debug Panel"
        visible={isOpen}
        onCancel={() => setOpen(false)}
        width={1000}
        footer={null}
      >
        <Tabs>
          <Tabs.TabPane itemKey="workflow_json" tab="Workflow JSON">
            <WorkflowJsonEditor />
          </Tabs.TabPane>
          <Tabs.TabPane itemKey="variables" tab="Variable List">
            <FullVariableList />
          </Tabs.TabPane>
        </Tabs>
      </SideSheet>
    </PanelWrapper>
  );
}
