/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { History, Workflow as WorkflowIcon, X } from 'lucide-react';

import { sameDocument, type WorkspaceDocument } from '../lib/workbench';
import type { Run, Workflow } from '../lib/types';
import { tx } from '../lib/i18n';

export function WorkbenchTabs({
  documents,
  active,
  workflows,
  runs,
  onSelect,
  onClose,
}: {
  documents: WorkspaceDocument[];
  active: WorkspaceDocument;
  workflows: Workflow[];
  runs: Run[];
  onSelect: (document: WorkspaceDocument) => void;
  onClose: (document: WorkspaceDocument) => void;
}) {
  return (
    <div
      role="tablist"
      aria-label={tx('工作台文档')}
      className="workbench-tabs flex min-w-0 items-center gap-1 overflow-x-auto"
      onKeyDown={(event) => {
        const index = documents.findIndex((document) => sameDocument(document, active));
        const next =
          event.key === 'ArrowRight'
            ? (index + 1) % documents.length
            : event.key === 'ArrowLeft'
            ? (index + documents.length - 1) % documents.length
            : event.key === 'Home'
            ? 0
            : event.key === 'End'
            ? documents.length - 1
            : -1;
        if (next < 0) return;
        event.preventDefault();
        onSelect(documents[next]);
        const tabs = event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]');
        tabs[next]?.focus();
      }}
    >
      {documents.map((document) => {
        const run = document.kind === 'run' && runs.find((item) => item.id === document.id);
        const name =
          workflows.find((item) => item.id === (run ? run.workflowId : document.id))?.name ||
          tx('工作流');
        const title = document.kind === 'run' ? `${name} · ${tx('运行详情')}` : name;
        const selected = sameDocument(document, active);
        const Icon = document.kind === 'workflow' ? WorkflowIcon : History;
        return (
          <div
            key={`${document.kind}:${document.id}`}
            className={`flex max-w-52 shrink-0 items-center rounded-md ${
              selected ? 'bg-secondary' : ''
            }`}
          >
            <button
              role="tab"
              title={title}
              aria-selected={selected}
              tabIndex={selected ? 0 : -1}
              className="flex min-w-0 items-center gap-2 px-2 py-1.5 text-xs"
              onClick={() => onSelect(document)}
            >
              <Icon size={13} className="shrink-0" />
              <span className="truncate">{title}</span>
            </button>
            <button
              className="mr-1 rounded p-1 text-muted-foreground hover:bg-background hover:text-foreground"
              aria-label={tx('关闭文档：{0}', [title])}
              title={tx('关闭文档：{0}', [title])}
              onClick={() => onClose(document)}
            >
              <X size={12} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
