/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import {
  createPanelManagerPlugin as create,
  PanelFactory,
} from '@flowgram.ai/panel-manager-plugin';

import { DemoTools } from '../../components/tools';
import {
  TestRunSidePanel,
  TestRunSidePanelProps,
} from '../../components/testrun/testrun-panel/test-run-panel';
import { NodeFormPanel, NodeFormPanelProps } from '../../components/sidebar/node-form-panel';
import { ProblemPanel } from '../../components/problem-panel/problem-panel';
import { ChatPanel } from '../../components/chat-panel';
import { PanelType } from './constants';

const nodeFormPanelFactory: PanelFactory<NodeFormPanelProps> = {
  key: PanelType.NodeFormPanel,
  defaultSize: 500,
  maxSize: 800,
  minSize: 300,
  render: (props: NodeFormPanelProps) => <NodeFormPanel {...props} />,
};

const testRunPanelFactory: PanelFactory<TestRunSidePanelProps> = {
  key: PanelType.TestRunFormPanel,
  defaultSize: 400,
  render: () => <TestRunSidePanel />,
};

const problemPanelFactory: PanelFactory<void> = {
  key: PanelType.ProblemPanel,
  defaultSize: 200,
  render: () => <ProblemPanel />,
};

const chatPanelFactory: PanelFactory<void> = {
  key: PanelType.ChatPanel,
  defaultSize: 400,
  maxSize: 600,
  minSize: 300,
  resize: true,
  render: () => <ChatPanel />,
};

export const createPanelManagerPlugin = () =>
  create({
    factories: [nodeFormPanelFactory, testRunPanelFactory, problemPanelFactory, chatPanelFactory],
    layerProps: {
      children: <DemoTools />,
    },
  });
