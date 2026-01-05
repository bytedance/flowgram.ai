/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { definePluginCreator } from '@flowgram.ai/free-layout-editor';

import { IWorkflowAgentService, type AgentConfig } from './types';
import { IAgentTool, AGENT_BUILTIN_TOOLS } from './tools';
import {
  WorkflowAgentToolRegistry,
  WorkflowAgentService,
  ContextCompactor,
  LLMClient,
  MessageManager,
  ReActLoopExecutor,
} from './services';

export const createAgentPlugin = definePluginCreator<{ config?: Partial<AgentConfig> }>({
  onBind({ bind }, opts) {
    // 注册所有核心服务
    bind(WorkflowAgentToolRegistry).toSelf().inSingletonScope();

    // 绑定所有工具（使用 multiInject）
    AGENT_BUILTIN_TOOLS.forEach((ToolFactory) => {
      bind(IAgentTool).to(ToolFactory).inSingletonScope();
    });

    bind(LLMClient).toSelf().inSingletonScope();
    bind(MessageManager).toSelf().inSingletonScope();
    bind(ReActLoopExecutor).toSelf().inSingletonScope();
    bind(ContextCompactor).toSelf().inSingletonScope();
    bind(WorkflowAgentService).toSelf().inSingletonScope();
    bind(IWorkflowAgentService).to(WorkflowAgentService).inSingletonScope();
  },
  onInit(ctx, opts) {
    const agentService = ctx.get<IWorkflowAgentService>(IWorkflowAgentService);
    agentService.init(opts?.config);
  },
});
