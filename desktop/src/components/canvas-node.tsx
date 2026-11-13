/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */
import {
  AlertCircle,
  Check,
  CircleAlert,
  CircleMinus,
  Clock3,
  Loader2,
  MoreHorizontal,
  Link2,
  Box,
} from 'lucide-react';

import type { WorkflowNode } from '../lib/types';
import { duration, statusLabel } from '../lib/run-trace';
import type { NodePreviewRow, NodePreviewToken } from '../lib/node-preview';
import type { NodeResources } from '../lib/node-presentation';
import { describePort, previewPredicate } from '../lib/node-presentation';
import { NODE_LAYOUT } from '../lib/node-layout';
import type { CanvasExecution } from '../lib/node-execution';
import type { NodeCatalogEntry } from '../lib/node-catalog';
import { tx } from '../lib/i18n';
import { InlineRename } from './ui/inline-rename';

export function CanvasNodeHeader({
  title,
  spec,
  issue,
  readOnly,
  renaming,
  onRename,
  onEndRename,
  onMenu,
  boundaryLabel,
}: {
  title: string;
  boundaryLabel?: string;
  spec: NodeCatalogEntry;
  issue?: string;
  readOnly: boolean;
  renaming: boolean;
  onRename: (name: string) => void;
  onEndRename: () => void;
  onMenu: (event: React.MouseEvent) => void;
}) {
  const Icon = spec.icon;
  return (
    <div className="workflow-node-heading">
      <span className={`node-icon node-tone-${spec.tone}`} title={spec.title}>
        <Icon size={17} strokeWidth={1.7} />
      </span>
      <div className="node-heading-text">
        {boundaryLabel && !renaming ? (
          <span className="node-display-title" title={`${boundaryLabel} · ${title}`}>
            {boundaryLabel}
          </span>
        ) : readOnly ? (
          <span className="node-display-title" title={title}>
            {title}
          </span>
        ) : (
          <InlineRename
            value={title}
            editing={renaming}
            onStart={() => {}}
            onCommit={onRename}
            onEnd={onEndRename}
          />
        )}
      </div>
      {issue && (
        <span
          className="node-config-issue"
          role="img"
          aria-label={tx('配置问题：{0}', [issue])}
          title={issue}
        >
          <AlertCircle size={14} />
        </span>
      )}
      {!readOnly && (
        <button
          type="button"
          className="node-config-button flow-canvas-not-draggable"
          aria-label={tx('节点更多操作')}
          onClick={(event) => {
            event.stopPropagation();
            onMenu(event);
          }}
        >
          <MoreHorizontal size={16} />
        </button>
      )}
    </div>
  );
}
export function CanvasNodeToken({ token }: { token: NodePreviewToken }) {
  const description =
    token.description || (token.detail ? `${token.text} · ${token.detail}` : token.text);
  return (
    <span className={`node-preview-token node-preview-${token.kind}`} title={description}>
      {token.kind === 'reference' && <Link2 size={11} aria-hidden="true" />}
      {token.kind === 'resource' && <Box size={11} aria-hidden="true" />}
      <span className="node-token-text">{token.text}</span>
      {token.detail && !['text', 'count'].includes(token.kind) && (
        <span className="node-token-detail">
          {token.kind === 'reference' ? token.detail.split('.').at(-1) : token.detail}
        </span>
      )}
    </span>
  );
}
export function CanvasNodeSummary({ rows }: { rows: NodePreviewRow[] }) {
  if (!rows.length) return null;
  return (
    <div className="node-content-summary">
      {rows.slice(0, 2).map((row, index) => (
        <div
          className="node-preview-row"
          key={index}
          title={[
            row.label,
            ...row.tokens.map(
              (token) =>
                token.description || token.text + (token.detail ? ` · ${token.detail}` : '')
            ),
          ]
            .filter(Boolean)
            .join(' · ')}
        >
          {row.label && (
            <span className="node-preview-label" title={row.label}>
              {row.label}
            </span>
          )}
          <div className="node-preview-values">
            {row.tokens.map((token, index) => (
              <CanvasNodeToken key={index} token={token} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
export function CanvasNodeRoutes({
  node,
  ports,
  side,
  resources,
}: {
  node: WorkflowNode;
  ports: { id: string; label: string }[];
  side: 'input' | 'output';
  resources: NodeResources;
}) {
  return (
    <div className="node-port-rows" data-side={side} style={{ top: NODE_LAYOUT.rowTop }}>
      {ports.map((port) => {
        const condition =
          node.type === 'control.switch'
            ? ((node.data.branches as { id: string; predicate: unknown }[]) || []).find(
                (branch) => branch.id === port.id
              )?.predicate
            : node.type === 'condition'
            ? {
                combinator: 'and',
                rules: ((node.data.conditions as { key?: string; value: unknown }[]) || [])
                  .filter((condition) => String(condition.key || 'true') === port.id)
                  .map((condition) => condition.value),
              }
            : undefined;
        return (
          <div className="node-port-row" key={port.id} style={{ height: NODE_LAYOUT.rowHeight }}>
            <span className="node-route-label" title={port.label}>
              {port.label}
            </span>
            {condition && port.id !== 'else' ? (
              <div className="node-route-condition" title={describePort(node, port.id, resources)}>
                {previewPredicate(condition, resources).map((token, index) => (
                  <CanvasNodeToken key={index} token={token} />
                ))}
              </div>
            ) : port.id === 'else' && ['condition', 'control.switch'].includes(node.type) ? (
              <span className="node-route-condition">{tx('未匹配其他条件')}</span>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
export function CanvasNodeRunBadge({
  entry,
  now,
  onInspect,
}: {
  entry: CanvasExecution;
  now: number;
  onInspect: () => void;
}) {
  const status = entry.status;
  const Icon =
    status === 'running'
      ? Loader2
      : status === 'succeeded'
      ? Check
      : status === 'failed'
      ? CircleAlert
      : status === 'waiting'
      ? Clock3
      : CircleMinus;
  const elapsed =
    status === 'skipped'
      ? undefined
      : entry.durationMs ??
        (status === 'running' && entry.startedAt
          ? Math.max(0, now - Date.parse(entry.startedAt))
          : undefined);
  const failed = entry.counts?.failed || 0;
  const repeated = (entry.total || 0) > 1;
  const iteration = entry.iterationPath?.map((index) => index + 1).join(' / ');
  const label = repeated
    ? `${tx('{0} 次执行', [entry.total!])}${failed ? ` · ${tx('{0} 次失败', [failed])}` : ''}`
    : `${iteration ? tx('第 {0} 轮', [iteration]) + ' · ' : ''}${statusLabel(status)}${
        elapsed != null && Number.isFinite(elapsed) ? ' · ' + duration(elapsed) : ''
      }${(entry.attempt || 1) > 1 ? ' · ' + tx('第 {0} 次尝试', [entry.attempt!]) : ''}`;
  return (
    <button
      type="button"
      className="node-run-badge flow-canvas-not-draggable"
      data-status={status}
      onPointerDown={(event) => event.stopPropagation()}
      onClick={(event) => {
        event.stopPropagation();
        onInspect();
      }}
      title={tx('查看执行详情：{0}', [label])}
      aria-label={tx('查看执行详情：{0}', [label])}
    >
      <Icon size={12} className={status === 'running' ? 'animate-spin' : undefined} />
      <span>{label}</span>
    </button>
  );
}
