/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */
import { useMemo, useState } from 'react';

import { Check, Copy, Download, Search } from 'lucide-react';

import { tx } from '../../lib/i18n';
import { Select } from './select';
import { Input } from './input';
import { Button } from './button';

function ValueTree({ value, depth = 0 }: { value: unknown; depth?: number }) {
  const [limit, setLimit] = useState(30);
  if (value === null) return <span className="text-muted-foreground">null</span>;
  if (typeof value !== 'object') {
    const text = typeof value === 'string' ? value : JSON.stringify(value);
    return (
      <span className="whitespace-pre-wrap break-words">
        {text.length > limit * 100 ? (
          <>
            {text.slice(0, limit * 100)}{' '}
            <button className="underline" onClick={() => setLimit(limit + 100)}>
              {tx('展开更多')}
            </button>
          </>
        ) : (
          text
        )}
      </span>
    );
  }
  const entries = Object.entries(value as Record<string, unknown>);
  if (!entries.length) return <code>{Array.isArray(value) ? '[]' : '{}'}</code>;
  return (
    <div className="space-y-2">
      {entries.slice(0, limit).map(([key, entry]) => {
        const nested = entry !== null && typeof entry === 'object';
        return (
          <div key={key} className="min-w-0 border-l border-border pl-3">
            {nested ? (
              <details open={depth < 1}>
                <summary className="cursor-pointer break-words text-muted-foreground">
                  <span className="text-foreground">{key}</span>{' '}
                  <span className="ml-1 text-[10px]">
                    {Array.isArray(entry) ? `[${entry.length}]` : `{${Object.keys(entry).length}}`}
                  </span>
                </summary>
                <div className="mt-2">
                  <ValueTree value={entry} depth={depth + 1} />
                </div>
              </details>
            ) : (
              <>
                <span className="mb-1 block break-words text-muted-foreground">{key}</span>
                <ValueTree value={entry} depth={depth + 1} />
              </>
            )}
          </div>
        );
      })}
      {entries.length > limit && (
        <Button size="sm" variant="ghost" onClick={() => setLimit(limit + 50)}>
          {tx('加载更多')} · {entries.length - limit}
        </Button>
      )}
    </div>
  );
}
export function DataViewer({
  value,
  label,
  filename = 'data.json',
  compact = false,
}: {
  value: unknown;
  label: string;
  filename?: string;
  compact?: boolean;
}) {
  const [mode, setMode] = useState('tree');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(0);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const text = useMemo(() => (value === undefined ? '' : JSON.stringify(value, null, 2)), [value]);
  const matches = useMemo(() => {
    if (!query) return [];
    const result: number[] = [];
    let offset = 0;
    const haystack = text.toLocaleLowerCase(),
      needle = query.toLocaleLowerCase();
    while (result.length < 200) {
      const index = haystack.indexOf(needle, offset);
      if (index < 0) break;
      result.push(index);
      offset = index + needle.length;
    }
    return result;
  }, [text, query]);
  if (value === undefined)
    return <p className="p-4 text-xs text-muted-foreground">{tx('未采集此数据')}</p>;
  if (compact)
    return (
      <div className="trace-data text-xs leading-relaxed" aria-label={label}>
        <ValueTree value={value} />
      </div>
    );
  return (
    <section className="trace-data" aria-label={label}>
      <div className="flex flex-wrap items-center gap-1 border-b border-border pb-2">
        <Select
          variant="ghost"
          className="!w-auto"
          aria-label={tx('数据展示方式')}
          value={mode}
          onValueChange={(next) => {
            setMode(next);
            setPage(0);
          }}
          options={[
            { value: 'tree', label: tx('结构') },
            { value: 'json', label: 'JSON' },
          ]}
        />
        <span className="ml-auto text-[10px] text-muted-foreground">
          {new TextEncoder().encode(text).length.toLocaleString()} B
        </span>
        <Button
          variant="ghost"
          size="icon"
          aria-label={copied ? tx('已复制') : tx('复制数据')}
          title={copied ? tx('已复制') : tx('复制数据')}
          onClick={() =>
            void navigator.clipboard
              .writeText(text)
              .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
              })
              .catch(() => setCopyError(true))
          }
        >
          {copied ? <Check /> : <Copy />}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          aria-label={tx('下载数据')}
          title={tx('下载数据')}
          onClick={() => {
            const url = URL.createObjectURL(new Blob([text], { type: 'application/json' }));
            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            link.click();
            setTimeout(() => URL.revokeObjectURL(url), 1000);
          }}
        >
          <Download />
        </Button>
      </div>
      {copyError && (
        <p role="alert" className="py-2 text-xs text-destructive">
          {tx('复制失败，请下载数据。')}
        </p>
      )}
      <label className="relative my-3 block">
        <Search size={13} className="absolute left-2 top-2.5 text-muted-foreground" />
        <Input
          className="h-8 pl-7 text-xs"
          aria-label={tx('搜索数据')}
          placeholder={tx('搜索数据')}
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setPage(0);
          }}
        />
      </label>
      {query ? (
        <div className="space-y-3 text-xs">
          <p className="text-muted-foreground">
            {tx('找到 {0} 处匹配', [matches.length])}
            {matches.length === 200 ? '+' : ''}
          </p>
          {matches.slice(page * 20, page * 20 + 20).map((index) => (
            <pre
              key={index}
              className="whitespace-pre-wrap break-all rounded-md bg-secondary/50 p-2"
            >
              {text.slice(Math.max(0, index - 80), index)}
              <mark>{text.slice(index, index + query.length)}</mark>
              {text.slice(index + query.length, index + query.length + 100)}
            </pre>
          ))}
          {matches.length > (page + 1) * 20 && (
            <Button size="sm" variant="ghost" onClick={() => setPage(page + 1)}>
              {tx('下一页')}
            </Button>
          )}
        </div>
      ) : mode === 'tree' ? (
        <div className="text-xs leading-relaxed">
          <ValueTree value={value} />
        </div>
      ) : (
        <>
          <pre className="whitespace-pre-wrap break-all text-xs leading-relaxed">
            {text.slice(page * 24000, (page + 1) * 24000)}
          </pre>
          {text.length > 24000 && (
            <div className="mt-3 flex items-center justify-between gap-2">
              <Button size="sm" variant="ghost" disabled={!page} onClick={() => setPage(page - 1)}>
                {tx('上一页')}
              </Button>
              <span className="text-xs text-muted-foreground">
                {page + 1} / {Math.ceil(text.length / 24000)}
              </span>
              <Button
                size="sm"
                variant="ghost"
                disabled={(page + 1) * 24000 >= text.length}
                onClick={() => setPage(page + 1)}
              >
                {tx('下一页')}
              </Button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
