/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';

interface TodoItem {
  id: number;
  title: string;
  status: 'not_started' | 'in_progress' | 'completed';
  description?: string;
}

interface TodoWriteArgs {
  operation: 'write' | 'read' | 'update' | 'add' | 'remove';
  todoList?: TodoItem[];
  id?: number;
  title?: string;
  status?: 'not_started' | 'in_progress' | 'completed';
  description?: string;
}

interface TodoWriteResult {
  success: boolean;
  data?: TodoItem | TodoItem[];
  message?: string;
  error?: string;
}

export const TodoWriteRender: React.FC<{
  args: TodoWriteArgs;
  result?: TodoWriteResult;
}> = ({ args, result }) => {
  if (!result || !result.success) {
    return null;
  }

  const getTodoList = (): TodoItem[] => {
    const todos = result.data;
    if (Array.isArray(todos)) return todos;
    if (todos && typeof todos === 'object') return [todos];
    return [];
  };

  const todoList = getTodoList();
  if (todoList.length === 0) return null;

  const getStatusIcon = (status: string) => {
    if (status === 'completed') return '✓';
    if (status === 'in_progress') return '○';
    return '○';
  };

  // const completedCount = todoList.filter((t) => t.status === 'completed').length;

  // 对于增量操作，只显示被操作的单个任务
  let displayList = todoList;
  let title = `待办事项`;

  if (args.operation === 'update' && args.id !== undefined) {
    const updatedTodo = todoList.find((t) => t.id === args.id);
    if (updatedTodo) {
      displayList = [updatedTodo];
      if (updatedTodo.status === 'completed') {
        title = `已完成`;
      } else if (updatedTodo.status === 'in_progress') {
        title = `开始任务`;
      } else {
        title = `更新任务`;
      }
    }
  } else if (args.operation === 'add') {
    // 对于 add 操作，显示新添加的任务（通常是最后一个）
    const newTodo = todoList[todoList.length - 1];
    if (newTodo) {
      displayList = [newTodo];
      title = `新增任务`;
    }
  } else if (args.operation === 'remove') {
    // remove 操作后任务已被删除，显示当前列表
    title = `已删除任务`;
  }

  return (
    <div style={{ padding: '8px', backgroundColor: '#f9fafb', borderRadius: '6px' }}>
      <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '6px' }}>{title}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {displayList.map((todo) => (
          <div
            key={todo.id}
            style={{
              padding: '6px 8px',
              backgroundColor: '#fff',
              borderRadius: '4px',
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span style={{ opacity: 0.6 }}>{getStatusIcon(todo.status)}</span>
            <span
              style={{
                flex: 1,
                textDecoration: todo.status === 'completed' ? 'line-through' : 'none',
                opacity: todo.status === 'completed' ? 0.6 : 1,
              }}
            >
              {todo.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
