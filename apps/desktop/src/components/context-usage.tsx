/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { Loader2 } from 'lucide-react';

import type { ContextUsage as Usage } from '../lib/types';
import { getLocale, tx } from '../lib/i18n';

export function ContextUsage({ value }: { value?: Usage | null }) {
  if (!value || !value.effectiveWindow) return null;
  const percent = Math.min(100, Math.round((value.inputTokens / value.effectiveWindow) * 100));
  const number = (n: number) => n.toLocaleString(getLocale());
  const title = [
    tx('上下文用量：{0} / {1} tokens', [number(value.inputTokens), number(value.effectiveWindow)]),
    tx('自动压缩阈值：{0} tokens', [number(value.autoCompactTokenLimit)]),
    tx('为模型输出预留 {0} tokens', [number(value.outputReserve)]),
    value.compactions ? tx('已自动压缩 {0} 次', [value.compactions]) : '',
    value.contextWindow === null
      ? tx('未配置模型上下文窗口，使用保守预算。可在模型设置中修改。')
      : '',
    value.source === 'estimate'
      ? tx('用量基于本地估算，模型返回用量后会校正。')
      : tx('用量基于模型返回值和新增内容计算。'),
  ]
    .filter(Boolean)
    .join('\n');
  return (
    <span
      className="inline-flex shrink-0 items-center gap-1.5 px-1 text-[11px] tabular-nums text-muted-foreground"
      title={title}
    >
      {value.status === 'compacting' ? (
        <Loader2 size={12} className="animate-spin motion-reduce:animate-none" />
      ) : (
        <span
          role="meter"
          aria-label={tx('上下文用量')}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percent}
          aria-valuetext={title}
          className="h-3 w-3 rounded-full"
          style={{
            background: `conic-gradient(currentColor ${percent}%, var(--border) 0)`,
            maskImage: 'radial-gradient(transparent 48%, #000 52%)',
          }}
        />
      )}
      <span>{value.status === 'compacting' ? tx('正在压缩上下文') : `${percent}%`}</span>
    </span>
  );
}
