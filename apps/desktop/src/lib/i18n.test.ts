/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { afterEach, describe, expect, it, vi } from 'vitest';

import { atomicNodes } from './atomic-nodes';
import { controlNodes } from './control-nodes';
import {
  errorText, getLanguagePreference, getLocale, getSystemLocale, localized, readLanguagePreference,
  resolveLocale, setLanguagePreference, t, tx,
} from './i18n';
import messages from './locales/messages.json';
import atomicCatalog from '../../../desktop-backend/catalog/atomic-nodes.json';
import controlCatalog from '../../../desktop-backend/catalog/control-nodes.json';

const storage = new Map<string, string>();
function language(value: 'en' | 'zh-CN' | 'system') {
  vi.stubGlobal('localStorage', { getItem: (key: string) => storage.get(key) ?? null, setItem: (key: string, v: string) => storage.set(key, v) });
  setLanguagePreference(value);
}
afterEach(() => { language('system'); storage.clear(); vi.unstubAllGlobals(); });

describe('interface language and agent contract isolation', () => {
  it('selects example content from the system language independently of interface preferences', () => {
    vi.stubGlobal('navigator', { language: 'en-US' });
    language('zh-CN');
    expect(getLocale()).toBe('zh-CN');
    expect(getSystemLocale()).toBe('en');
    vi.stubGlobal('navigator', { language: 'zh-Hans-CN' });
    language('en');
    expect(getLocale()).toBe('en');
    expect(getSystemLocale()).toBe('zh-CN');
    vi.stubGlobal('navigator', { language: 'fr-FR' });
    expect(getSystemLocale()).toBe('en');
    vi.stubGlobal('navigator', undefined);
    expect(getSystemLocale()).toBe('en');
  });
  it('resolves system languages with an English fallback and validates stored preferences', () => {
    expect(resolveLocale('zh-Hans-CN')).toBe('zh-CN');
    expect(resolveLocale('zh_TW')).toBe('zh-CN');
    expect(resolveLocale('en-GB')).toBe('en');
    expect(resolveLocale('de-DE')).toBe('en');
    language('zh-CN');
    expect(readLanguagePreference()).toBe('zh-CN');
    storage.set('flowgram.language', 'invalid');
    expect(readLanguagePreference()).toBe('system');
    vi.stubGlobal('navigator', { language: 'en-US' });
    language('system');
    expect(getLocale()).toBe('en');
    vi.stubGlobal('navigator', { language: 'zh-CN' });
    expect(getLocale()).toBe('zh-CN');
  });
  it('persists successful changes and retains the current language if storage fails', () => {
    language('en');
    expect(storage.get('flowgram.language')).toBe('en');
    vi.stubGlobal('localStorage', { setItem: () => { throw new Error('blocked'); } });
    expect(() => setLanguagePreference('zh-CN')).toThrow('blocked');
    expect(getLanguagePreference()).toBe('en');
    expect(readLanguagePreference()).toBe('system');
  });
  it('updates existing metadata views without translating identifiers, defaults, or user documents', () => {
    const original = { type: 'list.map', title: '映射列表', defaults: { prompt: 'Summarize the input', title: '自定义标题' }, schema: { title: '用户输入' } };
    const view = localized(original);
    language('en');
    expect(view.title).toBe('Map list');
    expect(t('settings')).toBe('Settings');
    expect(tx('分支 {0}', ['用户值'])).toBe('Branch 用户值');
    const fields = atomicNodes[0].fields;
    expect(fields[0].label).not.toMatch(/\p{Script=Han}/u);
    language('zh-CN');
    expect(view.title).toBe('映射列表');
    expect(fields[0].label).toMatch(/\p{Script=Han}/u);
    expect(view.type).toBe(original.type);
    expect(view.defaults).toBe(original.defaults);
    expect(structuredClone(view.defaults)).toEqual(original.defaults);
    expect(view.schema).toBe(original.schema);
    expect(original.title).toBe('映射列表');
  });
  it('keeps every shared node contract English and its execution defaults identical across locales', () => {
    expect(JSON.stringify([...atomicCatalog, ...controlCatalog])).not.toMatch(/\p{Script=Han}/u);
    for (const node of [...atomicNodes, ...controlNodes]) {
      language('en');
      const defaults = JSON.stringify(node.defaults);
      const executionFields = () => node.fields.map((field) => ({
        key: field.key, editor: field.editor, type: field.type, valueType: field.valueType,
        choices: field.choices?.map(([value]) => value),
        operators: field.operators?.map(([value]) => value),
        columns: field.columns?.map((column) => ({ key: column.key, choices: column.choices?.map(([value]) => value) })),
      }));
      const fields = executionFields();
      language('zh-CN');
      expect(JSON.stringify(node.defaults)).toBe(defaults);
      expect(executionFields()).toEqual(fields);
    }
    for (const translated of Object.values(messages)) expect(translated).not.toMatch(/\p{Script=Han}/u);
  });
  it('localizes diagnostic templates while preserving inserted node IDs and values', () => {
    language('zh-CN');
    expect(errorText('worker: output result is not connected')).toBe('worker：出口 result 未连接');
    expect(errorText('Node 我的节点: bad input')).toBe('节点 我的节点：bad input');
    expect(errorText('Connect a model in settings before sending a message')).toBe('请在设置中连接模型后再发送消息');
    expect(errorText('custom server failure')).toBe('custom server failure');
    language('en');
    expect(errorText('Node 我的节点: bad input')).toBe('Node 我的节点: bad input');
  });
  it('explains browser transport failures without treating arbitrary text as a failure count', () => {
    language('zh-CN');
    for (const message of ['Load failed', 'Failed to fetch', 'NetworkError when attempting to fetch resource.'])
      expect(errorText(message)).toBe('无法连接本地服务。请检查连接并刷新，以确认操作结果。');
    expect(errorText('Custom failed')).toBe('Custom failed');
    expect(errorText('3 failed')).toBe('3 次失败');
    language('en');
    expect(errorText('Load failed')).toBe('Cannot reach the local service. Check the connection and refresh to confirm the operation result');
  });
  it('explains unreceived queued messages without requiring turn routing', () => {
    const errors = [
      'The turn ended before receiving the supplemental input. Queue it for the next turn',
      'The target turn was interrupted. Reschedule this input',
    ];
    language('zh-CN');
    for (const message of errors) expect(errorText(message)).toBe('这条消息尚未处理，请重新发送。');
    language('en');
    for (const message of errors) expect(errorText(message)).toBe('This message has not been processed. Send it again');
  });
  it('localizes model failures without changing provider diagnostic codes', () => {
    const message = 'Model response incomplete (max_output_tokens). No unfinished tool calls were executed';
    language('zh-CN');
    expect(errorText(message)).toBe('模型响应未完成（max_output_tokens）。生成中的工具调用未执行。');
    language('en');
    expect(errorText(message)).toBe(message);
  });

});
