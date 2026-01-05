/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { useService } from '@flowgram.ai/free-layout-editor';

import { IWorkflowAgentService } from './types';
import { WorkflowAgentToolRegistry } from './services';

export const useAgentService = (): IWorkflowAgentService => {
  const agentService = useService(IWorkflowAgentService);
  return agentService as IWorkflowAgentService;
};

export const useToolRegistry = (): WorkflowAgentToolRegistry => {
  const toolRegistry = useService(WorkflowAgentToolRegistry);
  return toolRegistry;
};
