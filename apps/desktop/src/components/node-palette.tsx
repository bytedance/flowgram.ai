/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { useEffect, useMemo, useRef, useState, useId, useLayoutEffect } from 'react';

import { ArrowLeft, Plus, Search, Star, X } from 'lucide-react';

import { nodeCatalog } from '../lib/node-catalog';
import { tx, sourceText } from '../lib/i18n';
import { Select } from './ui/select';
import { usePresence, useSurfaceTransition } from './ui/presence';
import { FloatingLayerOwners, ownsFloatingLayer } from './ui/floating-layer';
import { Button } from './ui/button';
import { OutputTree } from './node-inspector/node-form';
import type { Data } from './node-inspector/model';
import { insertionPorts, type InsertionIntent } from '../lib/workflow-editing';
import { isJoin } from '../lib/control-nodes';
import { nodeDefinitions } from './node-inspector/definitions';

const groups: Record<string, string> = {
  AI: '模型与 Agent',
  连接: '网络与工具',
  流程控制: '流程控制',
  对象与数据: '对象与数据',
  列表与表格: '列表与表格',
  文本与数值: '文本与数值',
};
const readSaved = (key: string): string[] => {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(key) || '[]');
    return Array.isArray(value) ? value.filter((v): v is string => typeof v === 'string') : [];
  } catch {
    return [];
  }
};
export function NodePalette({
  open,
  close,
  add,
  intent,
  insideLoop,
}: {
  open: boolean;
  close: () => void;
  add: (type: string, ports?: { input?: string; output?: string }) => void;
  intent: InsertionIntent;
  insideLoop: boolean;
}) {
  const layerId = useId();
  const present = usePresence(open, 'control');
  const panel = useRef<HTMLElement>(null);
  useSurfaceTransition(panel, open, 'control');
  const [quickPosition, setQuickPosition] = useState({ left: 12, top: 12 });
  const [expandedLibrary, setExpandedLibrary] = useState(false);
  const quick = intent.mode === 'quick' && !expandedLibrary;
  useEffect(() => setExpandedLibrary(false), [intent]);

  const [query, setQuery] = useState('');
  const [group, setGroup] = useState('all');
  const [selected, setSelected] = useState('text');
  const [inputPort, setInputPort] = useState<string>();
  const [outputPort, setOutputPort] = useState<string>();
  const [favorites, setFavorites] = useState(() => readSaved('flowgram.nodes.favorites'));
  const [recent, setRecent] = useState(() => readSaved('flowgram.nodes.recent'));
  const search = useRef<HTMLInputElement>(null);
  const catalog = useMemo(
    () => nodeCatalog.filter((node) => node.group !== tx('基础') && !node.hidden),
    []
  );
  const filtered = catalog
    .filter((node) => {
      const definition = nodeDefinitions[node.type];
      const terms = [
        node.title,
        node.description,
        node.type,
        ...(definition?.aliases || []),
        ...(definition?.fields.flatMap((field) => field.choices?.flat() || []) || []),
      ];
      return (
        (group === 'all' ||
          (group === 'favorites' && favorites.includes(node.type)) ||
          (group === 'recent' && recent.includes(node.type)) ||
          sourceText(node.group) === group) &&
        terms.join(' ').toLowerCase().includes(query.toLowerCase())
      );
    })
    .sort((a, b) => (group === 'recent' ? recent.indexOf(a.type) - recent.indexOf(b.type) : 0));
  const active = filtered.find((node) => node.type === selected) || filtered[0];
  const choose = (type: string) => {
    const next = [type, ...recent.filter((item) => item !== type)].slice(0, 20);
    setRecent(next);
    localStorage.setItem('flowgram.nodes.recent', JSON.stringify(next));
    add(type, { input: inputPort, output: outputPort });
  };
  const ports = active ? insertionPorts(active.type) : { input: [], output: [] };
  const needsInput = !!(intent.source || intent.edge);
  const unavailable =
    active &&
    (isJoin(active.type)
      ? tx('汇合节点会随对应分叉一起创建')
      : ['control.break', 'control.continue'].includes(active.type) && !insideLoop
      ? tx('此节点只能添加到循环内部')
      : null);
  const canAdd =
    !unavailable &&
    (!needsInput ||
      ports.input.length === 1 ||
      ports.input.some((port) => port.id === inputPort)) &&
    (!intent.edge ||
      ports.output.length === 1 ||
      ports.output.some((port) => port.id === outputPort));
  useLayoutEffect(() => {
    if (!open || !quick || !panel.current) return;
    const update = () => {
      const rect = panel.current!.getBoundingClientRect();
      const anchor = intent.anchor || { x: window.innerWidth / 2 - rect.width / 2, y: 120 };
      setQuickPosition((current) => {
        const next = {
          left: Math.max(12, Math.min(anchor.x, window.innerWidth - rect.width - 12)),
          top: Math.max(12, Math.min(anchor.y, window.innerHeight - rect.height - 12)),
        };
        return current.left === next.left && current.top === next.top ? current : next;
      });
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [open, quick, intent, query, active?.type]);
  useEffect(() => {
    setInputPort(undefined);
    setOutputPort(undefined);
  }, [active?.type, intent]);
  useEffect(() => {
    if (!open) return;
    const outside = (event: PointerEvent) => {
      if (
        quick &&
        !panel.current?.contains(event.target as Node) &&
        !ownsFloatingLayer(event.target, layerId)
      )
        close();
    };
    document.addEventListener('pointerdown', outside, true);
    const previous = document.activeElement as HTMLElement | null;
    search.current?.focus();
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !ownsFloatingLayer(event.target, layerId)) {
        event.preventDefault();
        event.stopPropagation();
        close();
      }
    };
    document.addEventListener('keydown', escape, true);
    return () => {
      document.removeEventListener('keydown', escape, true);
      document.removeEventListener('pointerdown', outside, true);
      if (previous?.isConnected) previous.focus();
    };
  }, [open]);
  if (!present) return null;
  return (
    <FloatingLayerOwners.Provider value={[layerId]}>
      <section
        ref={panel}
        role="dialog"
        data-state={open ? 'open' : 'closed'}
        inert={!open || undefined}
        aria-hidden={!open || undefined}
        className={`node-library ${quick ? 'node-library-quick' : ''}`}
        style={quick ? quickPosition : undefined}
        aria-label={tx('节点库')}
      >
        <header className="nl-header">
          <Button variant="ghost" size="sm" onClick={close}>
            <ArrowLeft />
            {tx('返回画布')}
          </Button>
          <span>
            {intent.edge
              ? tx('在连线中插入节点')
              : intent.source
              ? tx('连接后续节点')
              : intent.scopeId
              ? tx('添加到循环内部')
              : tx('添加节点')}
          </span>
          <button
            className="nf-icon-button"
            type="button"
            onClick={close}
            aria-label={tx('关闭节点库')}
          >
            <X size={16} />
          </button>
        </header>
        <div className="nl-workspace">
          <nav className="nl-categories" aria-label={tx('节点分类')}>
            {[
              ['all', '全部节点'],
              ['favorites', '常用节点'],
              ['recent', '最近使用'],
              ...Object.entries(groups),
            ].map(([id, label]) => (
              <button
                key={id}
                type="button"
                aria-pressed={id === group}
                onClick={() => setGroup(id)}
              >
                {tx(label)}
              </button>
            ))}
          </nav>
          <div className="nl-browser">
            <div className="nl-search">
              <Search size={16} />
              <input
                ref={search}
                aria-label={tx('搜索节点')}
                placeholder={tx('搜索节点、操作或能力…')}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.nativeEvent.isComposing && active && canAdd)
                    choose(active.type);
                  if (['ArrowDown', 'ArrowUp'].includes(e.key) && filtered.length) {
                    e.preventDefault();
                    const current = filtered.findIndex((node) => node.type === active?.type);
                    setSelected(
                      filtered[
                        (current + (e.key === 'ArrowDown' ? 1 : filtered.length - 1)) %
                          filtered.length
                      ].type
                    );
                  }
                }}
              />
            </div>
            <p className="nl-group-title">
              {tx(
                (
                  { all: '全部节点', favorites: '常用节点', recent: '最近使用' } as Record<
                    string,
                    string
                  >
                )[group] ||
                  groups[group] ||
                  group
              )}
              <span>{filtered.length}</span>
            </p>
            <div className="nl-list" role="listbox" aria-label={tx('可添加节点')}>
              {filtered.length ? (
                filtered.map((node, index) => {
                  const Icon = node.icon;
                  return (
                    <button
                      key={node.type}
                      type="button"
                      id={`nl-${node.type}`}
                      role="option"
                      aria-selected={node.type === active?.type}
                      className="nl-item"
                      title={node.description}
                      onClick={() => {
                        setSelected(node.type);
                        const candidate = insertionPorts(node.type);
                        if (
                          quick &&
                          !isJoin(node.type) &&
                          (insideLoop ||
                            !['control.break', 'control.continue'].includes(node.type)) &&
                          (!needsInput || candidate.input.length === 1) &&
                          (!intent.edge || candidate.output.length === 1)
                        )
                          choose(node.type);
                      }}
                      onDoubleClick={() => {
                        if (canAdd && active?.type === node.type) choose(node.type);
                      }}
                      onKeyDown={(e) => {
                        if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
                          e.preventDefault();
                          const next =
                            filtered[
                              (index + (e.key === 'ArrowDown' ? 1 : filtered.length - 1)) %
                                filtered.length
                            ];
                          setSelected(next.type);
                          document.getElementById(`nl-${next.type}`)?.focus();
                        }
                      }}
                    >
                      <span className={`node-icon node-tone-${node.tone}`}>
                        <Icon size={18} />
                      </span>
                      <span>
                        <strong>{node.title}</strong>
                        <small>{node.description}</small>
                      </span>
                    </button>
                  );
                })
              ) : (
                <p className="nf-empty">{tx('没有匹配的节点。试试名称、操作或其他分类。')}</p>
              )}
            </div>
          </div>
          <aside className="nl-detail">
            {active && (
              <>
                <div className="nl-detail-heading">
                  <span className={`node-icon node-tone-${active.tone}`}>
                    <active.icon size={20} />
                  </span>
                  <button
                    type="button"
                    className="nf-icon-button"
                    aria-label={
                      favorites.includes(active.type) ? tx('取消常用节点') : tx('设为常用节点')
                    }
                    aria-pressed={favorites.includes(active.type)}
                    onClick={() => {
                      const next = favorites.includes(active.type)
                        ? favorites.filter((v) => v !== active.type)
                        : [...favorites, active.type];
                      setFavorites(next);
                      localStorage.setItem('flowgram.nodes.favorites', JSON.stringify(next));
                    }}
                  >
                    <Star
                      size={15}
                      fill={favorites.includes(active.type) ? 'currentColor' : 'none'}
                    />
                  </button>
                </div>
                <h3>{active.title}</h3>
                <p>{active.description}</p>
                <h4>{tx('主要配置')}</h4>
                <div className="nl-input-tags">
                  {nodeDefinitions[active.type]?.fields
                    .filter((field) => !field.section)
                    .map((field) => (
                      <span key={field.key}>{field.label}</span>
                    ))}
                </div>
                <h4>{tx('输出')}</h4>
                <OutputTree
                  schema={nodeDefinitions[active.type]?.output(active.defaults as Data) || {}}
                />
              </>
            )}
          </aside>
        </div>
        {unavailable && (
          <p role="status" className="nl-port-choice">
            {unavailable}
          </p>
        )}
        {needsInput && (
          <div className="nl-port-choice">
            <p>{tx('选择连接端口，确认后再修改工作流。')}</p>
            {ports.input.length > 1 && (
              <Select
                aria-label={tx('连接到输入端口')}
                placeholder={tx('选择输入端口')}
                value={inputPort || ''}
                onValueChange={setInputPort}
                options={ports.input.map((port) => ({ value: port.id, label: port.label }))}
              />
            )}
            {intent.edge && ports.output.length > 1 && (
              <Select
                aria-label={tx('从输出端口继续')}
                placeholder={tx('选择输出端口')}
                value={outputPort || ''}
                onValueChange={setOutputPort}
                options={ports.output.map((port) => ({ value: port.id, label: port.label }))}
              />
            )}
            {(!ports.input.length || (intent.edge && !ports.output.length)) && (
              <p role="status">{tx('此节点无法插入当前连接')}</p>
            )}
          </div>
        )}
        <footer className="nl-footer">
          {quick ? (
            <button
              type="button"
              className="nl-browse-all"
              onClick={() => setExpandedLibrary(true)}
            >
              {tx('浏览节点库')}
            </button>
          ) : (
            <span>{active?.title || tx('选择要添加的节点')}</span>
          )}
          <Button
            size="sm"
            disabled={!active || !canAdd}
            onClick={() => active && canAdd && choose(active.type)}
          >
            <Plus />
            {tx('添加到画布')}
          </Button>
        </footer>
      </section>
    </FloatingLayerOwners.Provider>
  );
}
