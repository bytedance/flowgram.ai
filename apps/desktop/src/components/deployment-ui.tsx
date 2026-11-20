/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { useState, type ReactNode } from 'react';

import { Copy } from 'lucide-react';

import { tx } from '../lib/i18n';
import { Button } from './ui/button';

export const deploymentEditor =
  'min-h-24 w-full rounded-lg border border-input bg-background px-3 py-2 font-mono text-xs leading-6 outline-none focus-visible:ring-2 focus-visible:ring-ring';
export function DeploymentField({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="flex min-w-0 flex-col gap-2 text-sm">
      <span>{label}</span>
      {children}
      {hint && <span className="text-xs leading-5 text-muted-foreground">{hint}</span>}
    </label>
  );
}
export function DeploymentCode({ title, value }: { title: string; value: string }) {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(false);
  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <div className="flex items-center justify-between border-b border-border px-4 py-2 text-xs text-muted-foreground">
        <span>{title}</span>
        <Button
          size="sm"
          variant="ghost"
          onClick={() =>
            void navigator.clipboard
              .writeText(value)
              .then(() => {
                setCopied(true);
                setError(false);
              })
              .catch(() => setError(true))
          }
        >
          <Copy size={13} />
          {error ? tx('复制失败') : copied ? tx('已复制') : tx('复制')}
        </Button>
      </div>
      <pre className="max-h-80 overflow-auto bg-secondary/20 p-4 text-xs leading-6">{value}</pre>
    </div>
  );
}
export function DeploymentEmpty({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-dashed border-border px-8 py-14 text-center">
      <p className="text-sm font-medium">{title}</p>
      <p className="mx-auto mb-5 mt-2 max-w-md text-sm leading-6 text-muted-foreground">
        {description}
      </p>
      {children}
    </div>
  );
}
