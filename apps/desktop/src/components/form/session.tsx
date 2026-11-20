/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { createContext, useContext, type ReactNode } from 'react';

import type { Data } from '../node-inspector/model';
import type { ModelSettings, Workflow, WorkflowNode, WorkflowSchema } from '../../lib/types';

export interface EditorBuffer {
  text: string;
  invalid?: string;
  signature: string;
}
export interface FormSession {
  node: WorkflowNode;
  schema: WorkflowSchema;
  workflows: Workflow[];
  model: ModelSettings | null;
  bindings: Data;
  buffers: Record<string, EditorBuffer>;
  setBuffer: (key: string, buffer: EditorBuffer) => void;
  openSettings: () => void;
  variableNodes?: WorkflowNode[];
}
const Context = createContext<FormSession | null>(null);
export function FormSessionProvider({
  value,
  children,
}: {
  value: FormSession;
  children: ReactNode;
}) {
  return <Context.Provider value={value}>{children}</Context.Provider>;
}
export function useFormSession() {
  const session = useContext(Context);
  if (!session) throw new Error('Field requires a form session');
  return session;
}
export function clearEditorErrors(session: FormSession, prefix: string) {
  const path = `${session.node.id}:${prefix}`;
  Object.entries(session.buffers).forEach(([key, buffer]) => {
    if (
      (key === path || key.startsWith(path + '.') || key.startsWith(path + ':')) &&
      buffer.invalid
    )
      session.setBuffer(key, { ...buffer, invalid: undefined });
  });
}
