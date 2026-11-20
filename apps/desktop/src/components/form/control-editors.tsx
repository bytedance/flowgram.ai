/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { ArrowDown, ArrowUp, Plus, Trash2 } from 'lucide-react';

import { Input } from '../ui/input';
import { accessibleNodes, type Data } from '../node-inspector/model';
import { tx } from '../../lib/i18n';
import { branches, isFork, isJoin, scopeFor, type Branch } from '../../lib/control-nodes';
import { clearEditorErrors, FormSessionProvider, useFormSession } from './session';
import { Select } from './field';
import { MappingEditor } from './editors';
import { PredicateEditor } from './collection-editors';

export function NodeLinkEditor({
  field,
  value,
  onChange,
}: {
  field: string;
  value: unknown;
  onChange: (value: unknown) => void;
}) {
  const session = useFormSession();
  const graph = scopeFor(session.schema, session.node.id);
  const candidates = graph.nodes.filter((n) =>
    field === 'forkId' ? isFork(n.type) : isJoin(n.type)
  );
  return (
    <Select
      aria-label={field === 'forkId' ? tx('所属分叉') : tx('对应汇合')}
      value={String(value || '')}
      onValueChange={(selectedValue) => onChange(selectedValue)}
      options={[
        { value: '', label: tx('选择节点') },
        ...(candidates.map((n) => ({ value: n.id, label: String(n.data.title || n.id) })) || []),
      ]}
    />
  );
}
export function BranchEditor({
  value,
  onChange,
  operators,
}: {
  value: Branch[];
  onChange: (value: Branch[]) => void;
  operators: Array<[string, string]>;
}) {
  const session = useFormSession();
  const graph = scopeFor(session.schema, session.node.id);
  const update = (id: string, patch: Partial<Branch>) =>
    onChange(value.map((b) => (b.id === id ? { ...b, ...patch } : b)));
  return (
    <div className="nf-collection">
      {value.map((branch, index) => {
        const connected = graph.edges.filter(
          (e) => e.sourceNodeID === session.node.id && e.sourcePortID === branch.id
        );
        const move = (offset: number) => {
          const next = [...value];
          [next[index], next[index + offset]] = [next[index + offset], next[index]];
          onChange(next);
        };
        return (
          <div className="nf-control-branch" key={branch.id}>
            <div className="nf-collection-actions">
              <span>
                {tx('出口')}
                {index + 1}
              </span>
              <button
                type="button"
                className="nf-icon-button"
                aria-label={tx('上移分支 {0}', [index + 1])}
                disabled={!index}
                onClick={() => move(-1)}
              >
                <ArrowUp size={13} />
              </button>
              <button
                type="button"
                className="nf-icon-button"
                aria-label={tx('下移分支 {0}', [index + 1])}
                disabled={index === value.length - 1}
                onClick={() => move(1)}
              >
                <ArrowDown size={13} />
              </button>
              <button
                type="button"
                className="nf-icon-button"
                aria-label={tx('删除分支 {0}', [index + 1])}
                disabled={!!connected.length}
                title={connected.length ? tx('请先移除或改接该出口的连线') : tx('删除分支')}
                onClick={() => {
                  clearEditorErrors(session, `branches.${branch.id}`);
                  onChange(value.filter((b) => b.id !== branch.id));
                }}
              >
                <Trash2 size={13} />
              </button>
            </div>
            <Input
              aria-label={tx('分支 {0} 名称', [index + 1])}
              value={branch.label}
              onChange={(e) => update(branch.id, { label: e.target.value })}
            />
            <p className="nf-hint">
              {connected.length ? tx('已连接 {0} 条路径', [connected.length]) : tx('尚未连接')} · ID{' '}
              {branch.id}
            </p>
            {session.node.type === 'control.switch' && (
              <PredicateEditor
                value={branch.predicate || { combinator: 'and', rules: [] }}
                onChange={(predicate) => update(branch.id, { predicate })}
                bufferKey={`branches.${branch.id}.predicate`}
                operators={operators}
              />
            )}
          </div>
        );
      })}
      <button
        type="button"
        className="nf-text-action"
        disabled={value.length >= 32}
        onClick={() =>
          onChange([
            ...value,
            {
              id: `branch_${crypto.randomUUID().slice(0, 8)}`,
              label: tx('分支 {0}', [value.length + 1]),
              ...(session.node.type === 'control.switch'
                ? {
                    predicate: {
                      combinator: 'and',
                      rules: [
                        {
                          left: { type: 'constant', content: true },
                          operator: 'eq',
                          right: { type: 'constant', content: true },
                        },
                      ],
                    },
                  }
                : {}),
            },
          ])
        }
      >
        <Plus size={14} />
        {tx('添加分支')}
      </button>
      {session.node.type === 'control.switch' && (
        <p className="nf-hint">
          {tx('未命中规则时进入固定的「否则」出口。改名和重排不会改变连线。')}
        </p>
      )}
    </div>
  );
}
export function BranchMappingsEditor({
  value,
  onChange,
}: {
  value: Data;
  onChange: (value: Data) => void;
}) {
  const session = useFormSession();
  const graph = scopeFor(session.schema, session.node.id);
  const fork = graph.nodes.find((n) => n.id === session.node.data.forkId);
  if (!fork) return <p className="nf-hint">{tx('先选择所属分叉，再配置每个入口的结果。')}</p>;
  return (
    <div className="nf-collection">
      {branches(fork).map((branch) => {
        const upstream = graph.edges.find(
          (e) => e.targetNodeID === session.node.id && e.targetPortID === branch.id
        );
        const terminal = graph.nodes.find((n) => n.id === upstream?.sourceNodeID);
        const variableNodes = terminal
          ? [...accessibleNodes(session.schema, terminal.id), terminal]
          : [];
        return (
          <details className="nf-control-branch" key={branch.id} open>
            <summary>
              {branch.label}
              <small>
                {terminal ? String(terminal.data.title || terminal.id) : tx('尚未连接')}
              </small>
            </summary>
            <p className="nf-hint">{tx('留空使用路径末尾节点的输出；添加字段后使用映射结果。')}</p>
            <FormSessionProvider value={{ ...session, variableNodes }}>
              <MappingEditor
                value={(value[branch.id] || {}) as Data}
                bufferKey={`mappings.${branch.id}`}
                onChange={(mapping) => {
                  const next = { ...value };
                  if (Object.keys(mapping).length) next[branch.id] = mapping;
                  else delete next[branch.id];
                  onChange(next);
                }}
              />
            </FormSessionProvider>
          </details>
        );
      })}
    </div>
  );
}
