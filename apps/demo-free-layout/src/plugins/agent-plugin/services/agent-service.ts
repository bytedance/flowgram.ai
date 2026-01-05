/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import {
  injectable,
  inject,
  WorkflowDocument,
  WorkflowOperationBaseService,
  Playground,
  fitView,
} from '@flowgram.ai/free-layout-editor';

import { WorkflowAgentUtils } from '../utils';
import type { AgentConfig, IWorkflowAgentService, UIChatMessage } from '../types';
import SystemPrompt from '../prompts/system-prompt.md?raw';
import { DEFAULT_AGENT_CONFIG } from '../constant';
import {
  LLMClient,
  MessageManager,
  ReActLoopExecutor,
  ContextCompactor,
  WorkflowAgentToolRegistry,
} from '.';

@injectable()
export class WorkflowAgentService implements IWorkflowAgentService {
  @inject(LLMClient)
  private llmClient: LLMClient;

  @inject(MessageManager)
  private messageManager: MessageManager;

  @inject(ReActLoopExecutor)
  private reactLoopExecutor: ReActLoopExecutor;

  @inject(ContextCompactor)
  private contextCompactor: ContextCompactor;

  @inject(WorkflowAgentToolRegistry)
  private toolRegistry: WorkflowAgentToolRegistry;

  @inject(WorkflowDocument)
  document: WorkflowDocument;

  @inject(WorkflowOperationBaseService)
  operationService: WorkflowOperationBaseService;

  @inject(Playground)
  playground: Playground;

  private config: AgentConfig = DEFAULT_AGENT_CONFIG;

  private abortController: AbortController | null = null;

  public init(config?: Partial<AgentConfig>): void {
    this.config = { ...DEFAULT_AGENT_CONFIG, ...config };
    this.llmClient.init(this.config);
  }

  public get onMessagesChange() {
    return this.messageManager.onMessagesChange;
  }

  public getMessages(): UIChatMessage[] {
    return this.messageManager.getMessages();
  }

  public hasSchema(messageId: string): boolean {
    return this.messageManager.hasSchema(messageId);
  }

  public getPreviousUserMessageId(messageId: string): string | null {
    return this.messageManager.getPreviousUserMessageId(messageId);
  }

  public clearMessages(): void {
    this.messageManager.resetMessages();
  }

  public cancelCurrentRequest(): void {
    if (this.abortController) {
      this.abortController.abort();
      this.abortController = null;
    }
  }

  public restoreSchema(messageId: string): void {
    const message = this.messageManager.findMessage(messageId);
    if (!message?.schema) {
      return;
    }

    this.operationService.fromJSON(message.schema);
    fitView(this.document, this.playground.config);
  }

  public async retryMessage(messageId: string): Promise<void> {
    const messageIndex = this.messageManager.findMessageIndex(messageId);
    if (messageIndex === -1) {
      return;
    }

    const message = this.messageManager.findMessage(messageId);
    if (!message || message.role !== 'assistant') {
      return;
    }

    // 找到之前的用户消息
    let userMessageIndex = -1;
    const allMessages = this.messageManager.getAllMessages();
    for (let i = messageIndex - 1; i >= 0; i--) {
      if (allMessages[i].role === 'user') {
        userMessageIndex = i;
        break;
      }
    }

    if (userMessageIndex === -1) {
      return;
    }

    const userMessage = allMessages[userMessageIndex];
    this.messageManager.truncateMessages(userMessageIndex);

    await this.sendMessage(userMessage.content);
  }

  public async editAndResendMessage(messageId: string, newContent: string): Promise<void> {
    const messageIndex = this.messageManager.findMessageIndex(messageId);
    if (messageIndex === -1) {
      return;
    }

    const message = this.messageManager.findMessage(messageId);
    if (!message || message.role !== 'user') {
      return;
    }

    this.messageManager.truncateMessages(messageIndex);

    await this.sendMessage(newContent);
  }

  /**
   * 发送消息并处理 AI 响应
   */
  public async sendMessage(content: string): Promise<void> {
    if (!content.trim()) return;

    // 创建新的 AbortController
    this.abortController = new AbortController();

    // 添加用户消息
    const userMessage = WorkflowAgentUtils.createUserMessage(content);

    // 在发送消息前保存当前 workflow schema 快照
    const schema = this.document.toJSON();
    const userMessageWithSchema = { ...userMessage, schema };

    this.messageManager.addMessage(userMessageWithSchema);

    // 创建 assistant 消息
    const assistantMessage = WorkflowAgentUtils.createAssistantMessage();
    const assistantMessageId = assistantMessage.id;
    this.messageManager.addMessage(assistantMessage);

    try {
      // 构建对话历史
      const messages = this.messageManager.buildApiMessages(this.systemPrompt);
      const tools = this.toolRegistry.getAllTools();

      // 执行 ReAct Loop
      await this.reactLoopExecutor.execute({
        messages,
        tools,
        maxIterations: 100,
        signal: this.abortController.signal,
        onChunk: (chunk) => {
          const msg = this.messageManager.findMessage(assistantMessageId);
          if (msg) {
            this.messageManager.updateMessage(assistantMessageId, {
              content: msg.content + chunk,
            });
          }
        },
        onStep: (step) => {
          this.handleReActStep(assistantMessageId, step);
        },
      });

      // 标记消息发送成功
      this.messageManager.updateMessage(assistantMessageId, {
        status: 'sent',
      });

      // 对话成功完成后，执行智能总结
      await this.compactContextIfNeeded();
    } catch (error) {
      this.handleError(assistantMessageId, error);
    } finally {
      this.abortController = null;
    }
  }

  private get systemPrompt(): string {
    return SystemPrompt;
  }

  /**
   * 处理 ReAct 步骤回调
   */
  private handleReActStep(
    assistantMessageId: string,
    step: { type: string; toolCalls?: any[]; results?: any[]; content?: string }
  ): void {
    const msg = this.messageManager.findMessage(assistantMessageId);
    if (!msg) return;

    if (step.type === 'tool_call' && step.toolCalls) {
      const toolCallsXML = WorkflowAgentUtils.formatToolCallsToXML(step.toolCalls);
      this.messageManager.updateMessage(assistantMessageId, {
        content: msg.content + toolCallsXML,
      });
    } else if (step.type === 'tool_call_update' && step.toolCalls) {
      const updatedContent = WorkflowAgentUtils.updateToolCallArguments(
        msg.content,
        step.toolCalls
      );
      this.messageManager.updateMessage(assistantMessageId, {
        content: updatedContent,
      });
    } else if (step.type === 'tool_result' && step.results) {
      const updatedContent = WorkflowAgentUtils.updateToolCallResults(msg.content, step.results);
      this.messageManager.updateMessage(assistantMessageId, {
        content: updatedContent,
      });
    }
  }

  /**
   * 处理错误
   */
  private handleError(assistantMessageId: string, error: unknown): void {
    // 检查是否为取消错误
    if (
      error instanceof Error &&
      (error.name === 'AbortError' || error.message.includes('aborted'))
    ) {
      // 取消请求时，处理未完成的工具调用
      const msg = this.messageManager.findMessage(assistantMessageId);
      if (msg) {
        const updatedContent = WorkflowAgentUtils.markIncompleteToolCallsAsCancelled(msg.content);
        this.messageManager.updateMessage(assistantMessageId, {
          content: updatedContent,
          status: 'sent',
        });
      } else {
        this.messageManager.updateMessage(assistantMessageId, {
          status: 'sent',
        });
      }
    } else {
      // 处理其他错误
      const errorContent = WorkflowAgentUtils.formatErrorMessage(error);
      this.messageManager.updateMessage(assistantMessageId, {
        content: errorContent,
        status: 'error',
      });
    }
  }

  /**
   * 检查是否需要执行智能总结，如需要则执行
   */
  private async compactContextIfNeeded(): Promise<void> {
    const messages = this.messageManager.getAllMessages();
    const lastSummaryIndex = this.messageManager.getLastSummaryMessageIndex();

    if (!this.contextCompactor.shouldCompact(messages, lastSummaryIndex)) {
      return;
    }

    try {
      console.log('[Context Compact] Starting intelligent summarization...');

      const summary = await this.contextCompactor.generateSummary(messages);

      if (summary) {
        this.messageManager.setConversationSummary(summary);
        console.log('[Context Compact] Summary generated successfully');
      }
    } catch (error) {
      console.warn('[Context Compact] Failed to generate summary:', error);
      // 失败时不影响正常流程
    }
  }
}
