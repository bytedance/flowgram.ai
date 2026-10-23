/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { useSyncExternalStore } from 'react';
import messages from './locales/messages.json';

export type Locale = 'en' | 'zh-CN';
export type LanguagePreference = 'system' | Locale;
const STORAGE_KEY = 'flowgram.language';
const listeners = new Set<() => void>();
const translations: Record<string, string> = messages;
const original = new Map(Object.entries(translations).map(([zh, en]) => [en, zh]));
export function resolveLocale(language?: string): Locale {
  return /^zh(?:-|_|$)/i.test(language || '') ? 'zh-CN' : 'en';
}
export function isLanguagePreference(value: unknown): value is LanguagePreference {
  return value === 'system' || value === 'en' || value === 'zh-CN';
}
export function readLanguagePreference(): LanguagePreference {
  try {
    const value = globalThis.localStorage?.getItem(STORAGE_KEY);
    return isLanguagePreference(value) ? value : 'system';
  } catch { return 'system'; }
}
let preference = readLanguagePreference();
export function getSystemLocale(): Locale {
  return resolveLocale(globalThis.navigator?.language);
}
export function getLocale(): Locale {
  return preference === 'system' ? getSystemLocale() : preference;
}
export function getLanguagePreference(): LanguagePreference { return preference; }
function notify() {
  if (typeof document !== 'undefined') document.documentElement.lang = getLocale() === 'en' ? 'en' : 'zh-CN';
  listeners.forEach((listener) => listener());
}
export function setLanguagePreference(next: LanguagePreference) {
  if (!isLanguagePreference(next)) throw new Error('Unsupported language');
  // Persist before notifying so storage failures never silently lose the preference.
  globalThis.localStorage.setItem(STORAGE_KEY, next);
  preference = next;
  notify();
}
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (event) => {
    if (event.key === STORAGE_KEY || event.key === null) { preference = readLanguagePreference(); notify(); }
  });
  window.addEventListener('languagechange', () => { if (preference === 'system') notify(); });
}
export function useLocale() {
  return useSyncExternalStore((listener) => { listeners.add(listener); return () => { listeners.delete(listener); }; }, () => `${preference}:${getLocale()}`);
}
export function sourceText(value: string): string { return original.get(value) || value; }
/** Translate owned interface copy only. Never pass user content through this function. */
export function tx(value: string, args: unknown[] = []): string {
  const result = getLocale() === 'en' ? translations[value] || value : original.get(value) || value;
  return result.replace(/\{(\d+)\}/g, (match, index) => Number(index) < args.length ? String(args[Number(index)]) : match);
}
type MetadataMode = 'metadata' | 'labels' | 'options' | 'option';
const metadataCache = new WeakMap<object, Map<MetadataMode, object>>();
const rawKeys = new Set(['defaults', 'schema', 'inputs', 'inputSchema', 'outputSchema', 'outputsByOperation', 'defaultValue', 'visible', 'icon']);
const textKeys = new Set(['title', 'label', 'group', 'description', 'hint', 'section', 'rowLabel', 'name']);
/** Lazy UI metadata view. Translate presentation fields, never IDs, editor kinds or enum values. */
export function localized<T extends object>(value: T, mode: MetadataMode = 'metadata'): T {
  let cache = metadataCache.get(value);
  if (cache?.has(mode)) return cache.get(mode) as T;
  const view = new Proxy(value, {
    get(target, key, receiver) {
      const entry: unknown = Reflect.get(target, key, receiver);
      const name = String(key);
      if (rawKeys.has(name)) return entry;
      if (typeof entry === 'string') {
        return mode === 'labels' || (mode === 'option' && name === '1') || textKeys.has(name) ? tx(entry) : entry;
      }
      if (!entry || typeof entry !== 'object') return entry;
      const nextMode = name === 'choices' || name === 'operators' ? 'options'
        : mode === 'options' && /^\d+$/.test(name) ? 'option'
        : ['aliases', 'tools', 'suggestions'].includes(name) || mode === 'labels' ? 'labels' : 'metadata';
      return localized(entry, nextMode);
    },
  });
  if (!cache) { cache = new Map(); metadataCache.set(value, cache); }
  cache.set(mode, view);
  return view;
}
const sourceMessages = {
  remoteConflict: '工作流已有更新，部分修改与本地草稿冲突。请比较并合并。', assignNode: '数据处理', llmNode: '模型处理',
  newSession: '新聊天', search: '搜索会话与工作流', projects: '项目', workflows: '工作流', settings: '设置',
  newProject: '新建项目', projectName: '项目名称', workflowName: '工作流名称', create: '创建', cancel: '取消',
  newWorkflow: '新建工作流', emptyWorkflows: '还没有工作流', workflowHint: '从空白流程开始，或让助手帮你搭建。',
  welcome: '想完成什么？', welcomeHint: '描述目标，和助手一起把工作流搭建、运行起来。',
  suggestions: ['帮我搭建一个文本处理流程', '查看项目里的工作流', '解释如何引用节点输出'],
  placeholder: '描述需求，或继续完善当前工作流…', send: '发送', stop: '停止',
  connected: '本地服务已连接', disconnected: '正在连接本地服务', retry: '重新连接',
  canvas: '画布', closeCanvas: '收起画布', expandCanvas: '展开画布', save: '保存', saved: '已保存', unsaved: '未保存',
  run: '试运行', validate: '校验', valid: '校验通过', invalid: '校验未通过', history: '执行记录',
  input: '运行输入', output: '运行结果', details: '执行过程', runEmpty: '试运行后在这里查看结果与执行过程',
  nodeConfig: '节点配置', apply: '应用', nodeData: '节点数据 JSON', schema: '流程 JSON', addNode: '添加节点',
  modelSettings: '模型连接', modelHint: '连接兼容 Responses API 的模型服务。凭证仅保存在本机后端。',
  baseUrl: 'API 地址', modelId: '模型 ID', modelKeep: '留空保留当前模型', apiKey: 'API Key', keyKeep: '留空保留已保存凭证',
  modelConnected: '已连接模型', modelMissing: '尚未配置模型', settingsSaved: '连接配置已保存',
  externalAgent: '外部 Agent 接入', externalHint: '通过 MCP 调用当前 Rust 后端的共享 Workflow Tools。',
  mcpHint: '接入地址和授权令牌从本机应用连接文件读取；不要公开令牌。',
  tools: '可用工具', selectWorkflow: '打开工作流', open: '打开', back: '返回对话',
  running: '执行中', succeeded: '已完成', failed: '失败', canceled: '已取消', interrupted: '已中断', idle: '就绪',
  loading: '正在加载', noMessages: '发送消息开始会话', unavailable: '模型未连接，请先打开设置',
  projectEmpty: '此项目还没有任务', error: '操作未完成', saving: '保存中', importing: '导入 JSON',
  connectedModel: '当前模型', noRun: '还没有执行记录', runStarted: '运行已开始', workflowUpdated: '工作流已更新',
} as const;

export const uiMessages = localized(sourceMessages, 'labels');
export function t(key: keyof typeof sourceMessages): string {
  const value = sourceMessages[key];
  return typeof value === 'string' ? tx(value) : '';
}
notify();

// Backend diagnostics are canonical English, including those returned to MCP clients.
// Format matching localizes only owned diagnostic templates and retains inserted values.
const escapePattern = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const diagnosticFormats = Object.entries(translations).flatMap(([zh, en]) => {
  const placeholders = /\{(?:[A-Za-z_][A-Za-z_0-9]*|\d*)\}/g;
  const tokens = en.match(placeholders);
  if (!tokens || !zh.match(placeholders)) return [];
  const parts = en.split(placeholders);
  const anonymousPositions = [...zh.matchAll(/\{\}/g)].map((match) => match.index);
  let anonymousIndex = 0;
  const pattern = parts.map((part, index) => {
    if (index === tokens.length) return escapePattern(part);
    // Count labels such as "{0} failed" must never consume arbitrary diagnostic text.
    const position = tokens[index] === '{}' ? anonymousPositions[anonymousIndex++] : zh.indexOf(tokens[index]);
    const count = position >= 0 && /^\s*(?:次|个|条|项|秒|毫秒|分钟|小时|天)/.test(zh.slice(position + tokens[index].length));
    return escapePattern(part) + (count ? '(-?\\d+(?:\\.\\d+)?)' : '(.+?)');
  }).join('');
  return [{ pattern: new RegExp(`^${pattern}$`, 's'), zh, tokens }];
});
export function errorText(value: string | null | undefined): string {
  if (!value) return '';
  if ([
    'The turn ended before receiving the supplemental input. Queue it for the next turn',
    'The target turn was interrupted. Reschedule this input',
  ].includes(value)) return tx('这条消息尚未处理，请重新发送。');
  if (/^(?:Load failed|Failed to fetch|NetworkError when attempting to fetch resource\.?|Network request failed)$/i.test(value))
    return tx('无法连接本地服务。请检查连接并刷新，以确认操作结果。');
  const direct = tx(value);
  if (direct !== value || getLocale() === 'en') return direct;
  for (const { pattern, zh, tokens } of diagnosticFormats) {
    const match = pattern.exec(value);
    if (!match) continue;
    const occurrences = new Map<string, number>();
    let anonymous = 0;
    tokens.forEach((token, index) => occurrences.set(token === '{}' ? `#${anonymous++}` : token, index + 1));
    anonymous = 0;
    return zh.replace(/\{(?:[A-Za-z_][A-Za-z_0-9]*|\d*)\}/g, (token) => {
      const index = occurrences.get(token === '{}' ? `#${anonymous++}` : token);
      return index ? match[index] : token;
    });
  }
  return value;
}
