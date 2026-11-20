/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */
import { useState } from 'react';

import { rebaseWorkflow, type ConflictChoices } from '../lib/workflow-rebase';
import type { WorkflowSchema } from '../lib/types';
import { tx } from '../lib/i18n';
import { Dialog } from './ui/dialog';
import { Button } from './ui/button';
export function WorkflowConflictReview({
  base,
  local,
  remote,
  revision,
  blocked,
  onClose,
  onApply,
}: {
  base?: WorkflowSchema;
  local: WorkflowSchema;
  remote: WorkflowSchema;
  revision: number;
  blocked: boolean;
  onClose: () => void;
  onApply: (schema: WorkflowSchema) => void;
}) {
  const [choices, setChoices] = useState<ConflictChoices>({});
  const result = base
    ? rebaseWorkflow(base, local, remote, choices)
    : {
        schema: choices[''] === 'remote' ? remote : local,
        conflicts: choices[''] ? [] : [''],
        details: [{ path: '', base: undefined, local, remote }],
      };
  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      title={tx('处理工作流冲突')}
    >
      <p className="mb-4 text-xs text-muted-foreground">
        {tx('选择每处冲突要保留的内容，其余修改会自动合并。最新版本：v{0}', [revision])}
      </p>
      {blocked && (
        <p role="alert" className="mb-4 text-xs text-destructive">
          {tx('请先修复无效的节点草稿，再处理冲突。草稿内容已保留。')}
        </p>
      )}
      <div className="grid gap-4">
        {result.details.map((conflict) => (
          <fieldset key={conflict.path} className="tool-diff">
            <legend className="px-2 text-xs text-muted-foreground break-all">
              {conflict.path || tx('完整工作流')}
            </legend>
            <div className="tool-diff-values">
              {(['local', 'remote'] as const).map((side) => (
                <div key={side}>
                  <Button
                    variant={choices[conflict.path] === side ? 'secondary' : 'outline'}
                    size="sm"
                    aria-pressed={choices[conflict.path] === side}
                    onClick={() => setChoices((current) => ({ ...current, [conflict.path]: side }))}
                  >
                    {side === 'local' ? tx('保留本地修改') : tx('采用最新修改')}
                  </Button>
                  <pre className="mt-3 max-h-48 overflow-auto whitespace-pre-wrap break-words text-[11px] leading-relaxed">
                    {conflict[side] === undefined
                      ? tx('已删除')
                      : typeof conflict[side] === 'string'
                      ? conflict[side]
                      : JSON.stringify(conflict[side], null, 2)}
                  </pre>
                </div>
              ))}
            </div>
          </fieldset>
        ))}
      </div>
      <div className="mt-5 flex justify-end gap-2">
        <Button variant="ghost" onClick={onClose}>
          {tx('稍后处理')}
        </Button>
        <Button
          disabled={blocked || !!result.conflicts.length}
          onClick={() => onApply(result.schema)}
        >
          {tx('应用合并')}
        </Button>
      </div>
    </Dialog>
  );
}
