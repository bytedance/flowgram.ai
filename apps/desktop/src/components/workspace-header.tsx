/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import type { ReactNode } from 'react';

export function WorkspaceHeader({
  title,
  leading,
  children,
}: {
  title: ReactNode;
  leading?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="workspace-header" data-tauri-drag-region>
      <div className="flex min-w-0 flex-1 items-center gap-2">
        {leading}
        <div className="min-w-0 truncate text-[13px] font-medium">{title}</div>
      </div>
      {children && <div className="flex shrink-0 items-center gap-1">{children}</div>}
    </header>
  );
}
