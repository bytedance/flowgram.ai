/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { injectable } from '@flowgram.ai/free-layout-editor';

import type { ToolCallResult } from './type';
import { BaseTool } from './base-tool';
import type { Tool } from '../types';
import { TodoWriteRender } from '../renders/todo-write-render';

/**
 * TodoWrite 工具参数
 */
interface TodoWriteArgs {
  operation: 'write' | 'read' | 'update' | 'add' | 'remove';
  todoList?: Array<{
    id: number;
    title: string;
    status: 'not_started' | 'in_progress' | 'completed';
    description?: string;
  }>;
  id?: number;
  title?: string;
  status?: 'not_started' | 'in_progress' | 'completed';
  description?: string;
}

/**
 * Todo 项
 */
interface TodoItem {
  id: number;
  title: string;
  status: 'not_started' | 'in_progress' | 'completed';
  description?: string;
}

type TodoWriteResult = TodoItem[] | TodoItem;

/**
 * Todo 列表存储
 */
class TodoStore {
  private todos: TodoItem[] = [];

  write(todos: TodoItem[]): void {
    this.todos = todos;
  }

  read(): TodoItem[] {
    return this.todos;
  }

  clear(): void {
    this.todos = [];
  }
}

const todoStore = new TodoStore();

/**
 * TodoWrite 工具
 * 用于管理和跟踪任务列表
 * 支持依赖注入，可以注入 WorkflowDocument 等服务
 */
@injectable()
export class TodoWriteTool extends BaseTool<TodoWriteArgs, TodoWriteResult> {
  // 如果需要注入服务，可以这样写：
  // @inject(WorkflowDocument) private document: WorkflowDocument;

  readonly tool: Tool = {
    type: 'function',
    function: {
      name: 'TodoWrite',
      description: `管理工作流任务的待办事项列表。用于规划、跟踪和更新任务状态。

使用场景：
- 将复杂任务分解为可操作的步骤
- 在开始工作前标记任务为 in_progress
- 完成任务后立即标记为 completed
- 为用户提供任务进度的可见性

任务状态：
- not_started: 尚未开始
- in_progress: 正在进行（一次只能有一个）
- completed: 已完成

重要：完成每个任务后立即标记为 completed，不要批量处理多个任务。

操作类型（必须严格遵守）：
- update: 更新单个任务状态（推荐，最省 token）- 用于标记任务为 in_progress 或 completed
- add: 添加单个新任务（推荐）- 用于在执行过程中发现新任务
- remove: 删除单个任务 - 用于删除不再需要的任务
- write: 初始化完整列表（警告：仅在会话开始创建初始任务列表时使用一次！之后必须使用 update/add/remove）
- read: 读取当前列表

IMPORTANT：write 操作会完全替换整个列表，导致之前的任务历史丢失。创建初始列表后，必须使用 update 来改变任务状态，使用 add 来添加新任务。禁止多次使用 write 操作。`,
      parameters: {
        type: 'object',
        properties: {
          operation: {
            type: 'string',
            description:
              '操作类型。必须使用 update/add/remove 进行增量更新。write 只能在创建初始列表时使用一次，之后禁止再次使用 write。',
            enum: ['write', 'read', 'update', 'add', 'remove'],
          },
          todoList: {
            type: 'array',
            description: '仅用于 write 操作：完整的待办事项数组。',
            items: {
              type: 'object',
              properties: {
                id: {
                  type: 'number',
                  description: '待办事项的唯一标识符。从 1 开始使用连续数字。',
                },
                title: {
                  type: 'string',
                  description: '简洁的面向行动的待办事项标签（3-7 个词）。',
                },
                status: {
                  type: 'string',
                  description:
                    'not_started: 未开始 | in_progress: 正在工作（最多 1 个）| completed: 完全完成，没有阻碍',
                  enum: ['not_started', 'in_progress', 'completed'],
                },
                description: {
                  type: 'string',
                  description: '可选的详细描述',
                },
              },
              required: ['id', 'title', 'status'],
            },
          },
          id: {
            type: 'number',
            description: '用于 update/remove 操作：要操作的任务 ID。add 操作时自动生成。',
          },
          title: {
            type: 'string',
            description: '用于 add/update 操作：任务标题。',
          },
          status: {
            type: 'string',
            description: '用于 add/update 操作：任务状态。',
            enum: ['not_started', 'in_progress', 'completed'],
          },
          description: {
            type: 'string',
            description: '用于 add/update 操作：任务描述（可选）。',
          },
        },
        required: ['operation'],
      },
    },
    render: TodoWriteRender,
  };

  /**
   * 执行工具
   */
  async execute(args: TodoWriteArgs): Promise<ToolCallResult<TodoWriteResult>> {
    if (args.operation === 'read') {
      const todos = todoStore.read();
      if (todos.length === 0) {
        return {
          success: true,
          data: [],
          message: '待办事项列表为空',
        };
      }
      return {
        success: true,
        data: todos,
        message: `当前有 ${todos.length} 个待办事项`,
      };
    }

    if (args.operation === 'write') {
      if (!args.todoList || !Array.isArray(args.todoList)) {
        return {
          success: false,
          error: 'write 操作需要提供 todoList 数组',
        };
      }

      const inProgressCount = args.todoList.filter((t) => t.status === 'in_progress').length;
      if (inProgressCount > 1) {
        return {
          success: false,
          error: '一次只能有一个 in_progress 状态的任务',
        };
      }

      const ids = args.todoList.map((t) => t.id);
      if (new Set(ids).size !== ids.length) {
        return {
          success: false,
          error: '待办事项 ID 必须唯一',
        };
      }

      todoStore.write(args.todoList);
      return {
        success: true,
        data: args.todoList,
        message: `成功写入 ${args.todoList.length} 个待办事项`,
      };
    }

    if (args.operation === 'update') {
      if (args.id === undefined) {
        return {
          success: false,
          error: 'update 操作需要提供 id',
        };
      }

      const todos = todoStore.read();
      const todoIndex = todos.findIndex((t) => t.id === args.id);

      if (todoIndex === -1) {
        return {
          success: false,
          error: `未找到 ID 为 ${args.id} 的任务`,
        };
      }

      if (args.status === 'in_progress') {
        const hasOtherInProgress = todos.some(
          (t) => t.id !== args.id && t.status === 'in_progress'
        );
        if (hasOtherInProgress) {
          return {
            success: false,
            error: '一次只能有一个 in_progress 状态的任务',
          };
        }
      }

      const updatedTodo = { ...todos[todoIndex] };
      if (args.title !== undefined) updatedTodo.title = args.title;
      if (args.status !== undefined) updatedTodo.status = args.status;
      if (args.description !== undefined) updatedTodo.description = args.description;

      todos[todoIndex] = updatedTodo;
      todoStore.write(todos);

      return {
        success: true,
        data: updatedTodo,
        message: `成功更新任务 ${args.id}`,
      };
    }

    if (args.operation === 'add') {
      if (!args.title) {
        return {
          success: false,
          error: 'add 操作需要提供 title',
        };
      }

      const todos = todoStore.read();
      const newId = todos.length > 0 ? Math.max(...todos.map((t) => t.id)) + 1 : 1;

      if (args.status === 'in_progress') {
        const hasInProgress = todos.some((t) => t.status === 'in_progress');
        if (hasInProgress) {
          return {
            success: false,
            error: '一次只能有一个 in_progress 状态的任务',
          };
        }
      }

      const newTodo: TodoItem = {
        id: newId,
        title: args.title,
        status: args.status || 'not_started',
        description: args.description,
      };

      todos.push(newTodo);
      todoStore.write(todos);

      return {
        success: true,
        data: todos,
        message: `成功添加任务 ${newId}`,
      };
    }

    if (args.operation === 'remove') {
      if (args.id === undefined) {
        return {
          success: false,
          error: 'remove 操作需要提供 id',
        };
      }

      const todos = todoStore.read();
      const todoIndex = todos.findIndex((t) => t.id === args.id);

      if (todoIndex === -1) {
        return {
          success: false,
          error: `未找到 ID 为 ${args.id} 的任务`,
        };
      }

      const removedTodo = todos[todoIndex];
      todos.splice(todoIndex, 1);
      todoStore.write(todos);

      return {
        success: true,
        data: removedTodo,
        message: `成功删除任务 ${args.id}`,
      };
    }

    return {
      success: false,
      error: '未知的操作类型',
    };
  }
}
