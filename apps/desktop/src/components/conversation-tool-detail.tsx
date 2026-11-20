/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */
import { useEffect, useState } from 'react';

import { ChevronRight, Loader2 } from 'lucide-react';

import type { ConversationItem } from '../lib/types';
import { toolData } from '../lib/tool-presentation';
import { useProject } from '../lib/project-context';
import { tx, errorText } from '../lib/i18n';
import { Button } from './ui/button';

type Data = Record<string, unknown>;
interface ValueRef {
  resultId: string;
  path?: string;
  kind?: string;
  size?: number;
}
interface Page extends Data {
  kind: string;
  fields?: Data;
  items?: unknown[];
  content?: string;
  value?: unknown;
  nextCursor?: string;
}
const object = (v: unknown): v is Data => !!v && typeof v === 'object' && !Array.isArray(v);
function reference(value: unknown): ValueRef | null {
  if (!object(value)) return null;
  const ref = object(value.valueRef) ? value.valueRef : null;
  return ref && typeof ref.resultId === 'string' ? (ref as unknown as ValueRef) : null;
}
function TextValue({ value }: { value: unknown }) {
  const [expanded, setExpanded] = useState(false);
  const text = typeof value === 'string' ? value : JSON.stringify(value, null, 2);
  return (
    <div>
      <pre>{expanded ? text : text?.slice(0, 600)}</pre>
      {text?.length > 600 && (
        <Button size="sm" variant="ghost" onClick={() => setExpanded(!expanded)}>
          {expanded ? tx('收起') : tx('展开完整内容')}
        </Button>
      )}
    </div>
  );
}
function Value({ value, depth = 0 }: { value: unknown; depth?: number }) {
  const ref = reference(value);
  if (ref) return <RetainedValue reference={ref} />;
  if (object(value) || Array.isArray(value)) {
    const entries = Object.entries(value);
    return (
      <div className="tool-value-fields">
        {entries.map(([key, entry]) => (
          <div key={key} className="tool-value-field">
            <code>{key}</code>
            {depth < 2 ? (
              <Value value={entry} depth={depth + 1} />
            ) : (
              <details>
                <summary>{tx('查看内容')}</summary>
                <Value value={entry} />
              </details>
            )}
          </div>
        ))}
      </div>
    );
  }
  return <TextValue value={value} />;
}
/** Explicit reads only; opening a result never repeats its original operation. */
function RetainedValue({
  reference,
  diff = false,
  eager = false,
}: {
  reference: ValueRef;
  diff?: boolean;
  eager?: boolean;
}) {
  const { projectId, request } = useProject();
  const [open, setOpen] = useState(eager);
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [retry, setRetry] = useState(0);
  const [cursor, setCursor] = useState<string>();
  const [characters, setCharacters] = useState(false);
  useEffect(() => {
    if (!open) return;
    const controller = new AbortController();
    setLoading(true);
    setError('');
    void request<{ ok: boolean; data: Page; message?: string }>(
      '/api/tools/call',
      'POST',
      {
        projectId,
        name: 'read_tool_result',
        arguments: {
          resultId: reference.resultId,
          path: reference.path || '',
          ...(characters ? { view: 'characters' } : {}),
          ...(cursor ? { cursor } : {}),
          limit: reference.kind === 'text' ? 2000 : 20,
        },
      },
      controller.signal
    )
      .then((result) => {
        if (controller.signal.aborted) return;
        if (!result.ok) throw new Error(result.message || 'Result could not be read');
        setPages((current) => (cursor ? [...current, result.data] : [result.data]));
      })
      .catch((cause) => {
        if (!controller.signal.aborted) setError(cause.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [open, reference.resultId, reference.path, cursor, characters, retry, request, projectId]);
  const last = pages.at(-1);
  return (
    <div className="tool-retained-value">
      {!eager && (
        <button className="tool-value-toggle" aria-expanded={open} onClick={() => setOpen(!open)}>
          <ChevronRight size={12} className={open ? 'rotate-90' : ''} />
          {tx('查看内容')}
          {reference.size ? (
            <span className="text-muted-foreground">{reference.size.toLocaleString()} B</span>
          ) : null}
        </button>
      )}
      {open && (
        <div className="tool-value-content">
          {pages.map((page, i) => (
            <div key={i}>
              {diff && page.kind === 'object' ? (
                <Diff value={page.fields} />
              ) : diff && page.kind === 'array' ? (
                (page.items || []).map((part, j) => <Diff key={j} value={part} />)
              ) : page.kind === 'object' ? (
                <Value value={page.fields || {}} />
              ) : page.kind === 'array' ? (
                <Value value={page.items || []} />
              ) : page.kind === 'text' ? (
                <TextValue value={page.content} />
              ) : (
                <Value value={page.value} />
              )}
            </div>
          ))}
          {loading && (
            <span className="inline-flex items-center gap-2 text-muted-foreground">
              <Loader2 size={12} className="animate-spin" />
              {tx('加载中…')}
            </span>
          )}
          {error && (
            <p role="alert">
              {errorText(error)}{' '}
              <Button size="sm" variant="ghost" onClick={() => setRetry((v) => v + 1)}>
                {tx('重试')}
              </Button>
            </p>
          )}
          {!loading && last?.nextCursor && (
            <Button size="sm" variant="ghost" onClick={() => setCursor(last.nextCursor)}>
              {tx('加载更多')}
            </Button>
          )}
          {!loading && last?.kind === 'text' && last.content === undefined && (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                setCharacters(true);
                setCursor(undefined);
              }}
            >
              {tx('按字符读取')}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
function Diff({ value }: { value: unknown }) {
  const ref = reference(value);
  if (ref) return <RetainedValue reference={ref} diff />;
  if (!object(value) || !('path' in value)) return <Value value={value} />;
  const path = String(value.path)
    .split('/')
    .slice(1)
    .map((k) => k.replace(/~1/g, '/').replace(/~0/g, '~'));
  const label =
    path[0] === 'nodes'
      ? `${path[1]} · /${path.slice(path[2] === 'data' ? 3 : 2).join('/')}`
      : `/${path.join('/')}`;
  return (
    <div className="tool-diff">
      <code className="tool-diff-path">{label}</code>
      <div className="tool-diff-values">
        <div>
          <span>{tx('修改前')}</span>
          {value.hadBefore ? <Value value={value.before} /> : <em>{tx('未设置')}</em>}
        </div>
        <div>
          <span>{tx('修改后')}</span>
          {value.hasAfter ? <Value value={value.after} /> : <em>{tx('已删除')}</em>}
        </div>
      </div>
    </div>
  );
}
export function ConversationToolDetail({ item }: { item: ConversationItem }) {
  const data = toolData(item);
  const diff =
    object(data.diffRef) && typeof data.diffRef.resultId === 'string'
      ? (data.diffRef as unknown as ValueRef)
      : null;
  const result = item.payload.result;
  const editable = ['edit_workflow', 'layout_workflow', 'revert_workflow_change'].includes(
    item.payload.name || ''
  );
  return (
    <div className="conversation-tool-detail">
      {editable && data.changed === false && <p>{tx('内容未变化')}</p>}
      {diff && (
        <section>
          <h4>{tx('字段变更')}</h4>
          <RetainedValue reference={{ ...diff, path: '/patch' }} diff eager />
        </section>
      )}
      {result && item.payload.isError && (
        <section role="alert">
          <Value value={result} />
        </section>
      )}
      {!diff && !item.payload.isError && result && (
        <section>
          <h4>{tx('结果')}</h4>
          <Value value={result.data || result} />
        </section>
      )}
      {!result && (
        <p className="text-muted-foreground">
          {item.status === 'uncertain'
            ? tx('操作结果尚未确认，请先查询，避免重复执行。')
            : item.status === 'running'
            ? tx('正在等待返回')
            : item.status === 'drafting'
            ? tx('正在准备调用参数…')
            : tx('暂无返回结果。')}
        </p>
      )}
      <details className="tool-call-arguments">
        <summary>
          {tx('调用参数')} <code>{item.payload.name}</code>
        </summary>
        <Value value={item.payload.arguments || {}} />
      </details>
    </div>
  );
}
