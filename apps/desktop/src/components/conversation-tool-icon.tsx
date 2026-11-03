/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */
import {
  Blocks,
  Search,
  SearchCode,
  FileText,
  GitCompare,
  Undo2,
  SquarePen,
  TextCursorInput,
  GitBranch,
  GitFork,
  Unplug,
  Move,
  Copy,
  Trash2,
  Link2,
  ListFilter,
  Settings2,
  CircleStop,
  ListOrdered,
  ScanLine,
  ArrowRightLeft,
  BetweenHorizontalStart,
  ListRestart,
  Radio,
  BrainCircuit,
  FilePlus2,
  FileOutput,
  FileSearch,
  FlaskConical,
  History,
  Layers3,
  LayoutTemplate,
  ListTree,
  Play,
  Plug,
  ShieldCheck,
  Wrench,
  type LucideIcon,
} from 'lucide-react';

const icons: Record<string, LucideIcon> = {
  search_tools: Search,
  describe_tool: FileText,
  search_node_types: Blocks,
  describe_node_type: ScanLine,
  read_model: Settings2,
  read_workflow: FileSearch,
  search_workflow: SearchCode,
  edit_workflow: SquarePen,
  get_workflow_change: GitCompare,
  revert_workflow_change: Undo2,
  read_run: History,
  list_run_steps: ListOrdered,
  read_run_step: ListFilter,
  read_run_events: Radio,
  cancel_run: CircleStop,
  'edit_workflow/rename_workflow': SquarePen,
  'edit_workflow/add_node': FilePlus2,
  'edit_workflow/update_node': Settings2,
  'edit_workflow/title': TextCursorInput,
  'edit_workflow/prompt': FileText,
  'edit_workflow/model': BrainCircuit,
  'edit_workflow/replace_text': TextCursorInput,
  'edit_workflow/edit_collection': ListFilter,
  'edit_workflow/remove_node': Trash2,
  'edit_workflow/replace_node_type': ArrowRightLeft,
  'edit_workflow/connect': Link2,
  'edit_workflow/disconnect': Unplug,
  'edit_workflow/reconnect': GitCompare,
  'edit_workflow/insert_node': BetweenHorizontalStart,
  'edit_workflow/add_branch': GitFork,
  'edit_workflow/update_branch': GitBranch,
  'edit_workflow/remove_branch': Trash2,
  'edit_workflow/move_branch': ListRestart,
  'edit_workflow/duplicate_subgraph': Copy,
  'edit_workflow/move_subgraph': Move,
  'edit_workflow/move_nodes': Move,
  read_tool_result: FileOutput,
  list_models: BrainCircuit,
  list_workflows: ListTree,
  create_workflow: FilePlus2,
  layout_workflow: LayoutTemplate,
  validate_workflow: ShieldCheck,
  run_workflow: Play,
  test_node: FlaskConical,
};

/** Tool identity stays visible throughout execution; status is presented separately. */
export function conversationToolIcon(name = ''): LucideIcon {
  if (Object.hasOwn(icons, name)) return icons[name];
  if (name.startsWith('mcp__')) {
    const tool = name.split('__').at(-1) || '';
    return Object.hasOwn(icons, tool) ? icons[tool] : Plug;
  }
  return Wrench;
}

export function ConversationToolIcon({ names }: { names: string[] }) {
  const distinct = [...new Set(names)];
  const Icon = distinct.length > 1 ? Layers3 : conversationToolIcon(distinct[0]);
  return <Icon size={13} strokeWidth={1.5} className="shrink-0" aria-hidden="true" />;
}
