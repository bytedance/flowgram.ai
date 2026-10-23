/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */
import type { ConversationItem } from './types';
import { localized, tx } from './i18n';

export const toolNames: Record<string, string> = localized(
  {
    search_tools: '查找工具',
    describe_tool: '读取工具契约',
    search_node_types: '查找节点',
    describe_node_type: '读取节点契约',
    list_models: '查看可用模型',
    read_model: '读取模型配置',
    list_workflows: '查看项目工作流',
    read_workflow: '读取工作流',
    search_workflow: '搜索工作流',
    create_workflow: '创建工作流',
    edit_workflow: '编辑工作流',
    get_workflow_change: '核实工作流变更',
    revert_workflow_change: '撤销工作流变更',
    layout_workflow: '自动布局',
    validate_workflow: '校验工作流',
    run_workflow: '发起试运行',
    test_node: '测试节点',
    read_run: '读取运行状态',
    list_run_steps: '查看执行步骤',
    read_run_step: '读取执行数据',
    read_run_events: '读取运行事件',
    cancel_run: '停止运行',
    read_tool_result: '读取工具结果',
    'edit_workflow/rename_workflow': '重命名工作流',
    'edit_workflow/add_node': '添加节点',
    'edit_workflow/update_node': '更新节点参数',
    'edit_workflow/prompt': '修改提示词',
    'edit_workflow/model': '更换节点模型',
    'edit_workflow/title': '重命名节点',
    'edit_workflow/replace_text': '修改文本片段',
    'edit_workflow/edit_collection': '编辑配置条目',
    'edit_workflow/remove_node': '删除节点',
    'edit_workflow/replace_node_type': '更换节点类型',
    'edit_workflow/connect': '连接节点',
    'edit_workflow/disconnect': '断开连线',
    'edit_workflow/reconnect': '调整连接',
    'edit_workflow/insert_node': '插入节点',
    'edit_workflow/add_branch': '添加分支',
    'edit_workflow/update_branch': '修改分支',
    'edit_workflow/remove_branch': '删除分支',
    'edit_workflow/move_branch': '调整分支顺序',
    'edit_workflow/duplicate_subgraph': '复制子图',
    'edit_workflow/move_subgraph': '移动子图',
    'edit_workflow/move_nodes': '调整节点位置',
  },
  'labels'
);

export function toolIdentity(item: ConversationItem): string {
  const name = item.payload.name || '';
  if (name !== 'edit_workflow') return name;
  const operations = (item.payload.arguments as Record<string, unknown> | undefined)?.operations;
  if (!Array.isArray(operations) || !operations.length) return name;
  const actions = new Set(
    operations.map((op) => {
      const operation = op as Record<string, unknown>;
      if (operation.op !== 'update_node') return String(operation.op || '');
      const paths = [
        ...Object.keys((operation.set || {}) as Record<string, unknown>),
        ...(Array.isArray(operation.unset) ? operation.unset.map(String) : []),
      ];
      if (paths.length && paths.every((path) => path === '/title')) return 'title';
      if (paths.length && paths.every((path) => /^\/model(?:\/|$)/.test(path))) return 'model';
      if (paths.length && paths.every((path) => /^\/inputsValues\/prompt(?:\/|$)/.test(path)))
        return 'prompt';
      return 'update_node';
    })
  );
  return actions.size === 1 ? `${name}/${[...actions][0]}` : name;
}

/** Project the structured tool envelope into compact UI facts. */
export function toolData(item: ConversationItem): Record<string, unknown> {
  const result = item.payload.result || {};
  const context = result.context as Record<string, unknown> | undefined;
  const data = result.data as Record<string, unknown> | undefined;
  if (!data || typeof data !== 'object' || Array.isArray(data)) return {};
  const execution = ['run_workflow', 'test_node'].includes(item.payload.name || '');
  return {
    ...data,
    revision: context?.revision,
    workflowId: context?.workflowId,
    id: execution ? data.runId : context?.workflowId,
  };
}

/** Describe observed effects; arguments alone must not imply a successful mutation. */
export function toolSummary(item: ConversationItem): string {
  const name = item.payload.name || '';
  const data = toolData(item);
  const fallback = toolNames[toolIdentity(item)] || name || tx('准备工具调用');
  if (item.status !== 'completed' || item.payload.isError) return fallback;
  if (data.changed === false) return tx('内容未变化');
  if (name === 'edit_workflow') {
    const created = Number(data.createdNodeCount || 0);
    const changed = Number(data.changedNodeCount || 0);
    const operations =
      (item.payload.arguments as { operations?: Array<{ op: string }> })?.operations || [];
    if (created > 0 && operations.every((op) => ['add_node', 'insert_node'].includes(op.op)))
      return tx('添加 {0} 个节点', [created]);
    const identity = toolIdentity(item);
    if (changed && identity.endsWith('/prompt')) return tx('修改 {0} 个节点的提示词', [changed]);
    if (changed && identity.endsWith('/model')) return tx('更换 {0} 个节点的模型', [changed]);
    if (changed && identity.endsWith('/remove_node'))
      return tx('删除 {0} 个节点', [
        Array.isArray(data.removedNodes) ? data.removedNodes.length : changed,
      ]);
    if (changed && operations.every((op) => op.op === 'add_branch'))
      return tx('添加 {0} 条分支', [operations.length]);
    if (changed) return tx('更新 {0} 个节点', [changed]);
  }
  if (name === 'layout_workflow' && Array.isArray(data.movedNodes))
    return tx('布局 {0} 个节点', [data.changedNodeCount || data.movedNodes.length]);
  return fallback;
}
