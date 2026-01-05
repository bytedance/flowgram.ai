/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { WorkflowValidateTool } from './workflow-validate';
import { WorkflowTestrunTool } from './workflow-testrun';
import { TodoWriteTool } from './todo-write';
import { StartNodeTool } from './start-node';
import { RemoveNodeTool } from './remove-node-tool';
import { RemoveEdgeTool } from './remove-edge-tool';
import { NodeValidateTool } from './node-validate';
import { LoopNodeTool } from './loop-node';
import { LLMNodeTool } from './llm-node';
import { HTTPNodeTool } from './http-node';
import { GetWorkflowStructureTool } from './get-workflow-structure';
import { GetWorkflowSchemaTool } from './get-workflow-schema';
import { GetWorkflowInputDefinitionTool } from './get-workflow-input-definition';
import { GetNodeSchemaTool } from './get-node-schema';
import { EndNodeTool } from './end-node';
import { CreateEdgeTool } from './create-edge';
import { ContinueNodeTool } from './continue-node';
import { ConditionNodeTool } from './condition-node';
import { CodeNodeTool } from './code-node';
import { BreakNodeTool } from './break-node';
import { AskUserQuestionTool } from './ask-user-question';

export { IAgentTool, BaseTool } from './base-tool';

export const AGENT_BUILTIN_TOOLS = [
  TodoWriteTool,
  AskUserQuestionTool,
  GetWorkflowStructureTool,
  GetWorkflowSchemaTool,
  GetWorkflowInputDefinitionTool,
  WorkflowValidateTool,
  WorkflowTestrunTool,
  GetNodeSchemaTool,
  NodeValidateTool,
  CreateEdgeTool,
  RemoveNodeTool,
  RemoveEdgeTool,
  StartNodeTool,
  EndNodeTool,
  LLMNodeTool,
  HTTPNodeTool,
  CodeNodeTool,
  ConditionNodeTool,
  LoopNodeTool,
  BreakNodeTool,
  ContinueNodeTool,
];
