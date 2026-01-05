/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { usePanelManager } from '@flowgram.ai/panel-manager-plugin';

import type { NodeFormPanelProps } from '../../components/sidebar/node-form-panel';
import { PanelType } from './constants';

export const useNodeFormPanel = () => {
  const panelManager = usePanelManager();

  const open = (props: NodeFormPanelProps) => {
    panelManager.open(PanelType.NodeFormPanel, 'right', {
      props: props,
    });
  };
  const close = () => panelManager.close(PanelType.NodeFormPanel);

  return { open, close };
};

export const useTestRunFormPanel = () => {
  const panelManager = usePanelManager();

  const open = () => {
    panelManager.open(PanelType.TestRunFormPanel, 'docked-right');
  };
  const close = () => panelManager.close(PanelType.TestRunFormPanel);

  return { open, close };
};

export const useProblemPanel = () => {
  const panelManager = usePanelManager();

  const open = () => {
    panelManager.open(PanelType.ProblemPanel, 'bottom');
  };
  const close = () => panelManager.close(PanelType.ProblemPanel);

  return { open, close };
};

export const useChatPanel = () => {
  const panelManager = usePanelManager();

  const open = () => {
    panelManager.open(PanelType.ChatPanel, 'docked-left');
  };
  const close = () => panelManager.close(PanelType.ChatPanel);

  const toggle = () => {
    const panels = panelManager.getPanels('docked-left');
    const isOpen = panels.some((p) => p.key === PanelType.ChatPanel && p.visible);
    if (isOpen) {
      close();
    } else {
      open();
    }
  };

  return { open, close, toggle };
};
