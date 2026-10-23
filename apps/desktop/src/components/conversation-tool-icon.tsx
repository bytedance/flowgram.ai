/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */
import {
  Blocks,
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
  Save,
  ShieldCheck,
  Wrench,
  type LucideIcon,
} from 'lucide-react';

const icons: Record<string, LucideIcon> = {
  read_tool_result: FileOutput,
  list_models: BrainCircuit,
  list_node_types: Blocks,
  list_workflows: ListTree,
  inspect_workflow: FileSearch,
  create_workflow: FilePlus2,
  save_workflow: Save,
  layout_workflow: LayoutTemplate,
  validate_workflow: ShieldCheck,
  run_workflow: Play,
  get_run: History,
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
