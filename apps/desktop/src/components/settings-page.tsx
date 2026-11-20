/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { lazy, Suspense, useEffect, useRef, useState } from 'react';

import {
  ArrowLeft,
  Check,
  Keyboard,
  Palette,
  Plug,
  Settings2,
  Wrench,
  Info,
  Rocket,
  Archive,
} from 'lucide-react';

import { Select } from './ui/select';
import { useContentTransition } from './ui/presence';
import { cn } from '../lib/utils';
import type { ModelSettings } from '../lib/types';
import {
  errorText,
  tx,
  localized,
  getLanguagePreference,
  setLanguagePreference,
  isLanguagePreference,
} from '../lib/i18n';
import type { PublishIntent } from '../lib/deployment';
import { api } from '../lib/api';
import logo from '../assets/flowgram-logo.svg';
import copyIcon from '../assets/claude/copy.svg';
import arrowOut from '../assets/claude/arrow-out.svg';
import { Button } from './ui/button';
import { AssetIcon } from './ui/asset-icon';
import { ThemeSettings } from './theme-settings';
import { ResizablePanel } from './resizable-panel';
import { ModelSettingsPage } from './model-settings';
const DeploymentPage = lazy(() =>
  import('./deployment-page').then((module) => ({ default: module.DeploymentPage }))
);
const ArchiveSettings = lazy(() =>
  import('./archive-settings').then((module) => ({ default: module.ArchiveSettings }))
);
const sections = localized([
  { id: 'general', title: '通用', icon: Settings2 },
  { id: 'model', title: '模型', icon: Plug },
  { id: 'appearance', title: '外观与动效', icon: Palette },
  { id: 'tools', title: '工具与 MCP', icon: Wrench },
  { id: 'deployment', title: '部署', icon: Rocket },
  { id: 'archive', title: '归档', icon: Archive },
  { id: 'keyboard', title: '快捷键', icon: Keyboard },
  { id: 'about', title: '关于', icon: Info },
] as const);
export function SettingsPage({
  visible,
  close,
  saved,
  online,
  deploymentIntent,
  onDeploymentHandled,
  openDeploymentWorkflow,
  openDeploymentRun,
  onArchiveChanged,
}: {
  visible: boolean;
  close: () => void;
  model: ModelSettings | null;
  saved: (value: ModelSettings) => void;
  online: boolean;
  deploymentIntent: PublishIntent | null;
  onDeploymentHandled: () => void;
  openDeploymentWorkflow: (project: string, id: string) => void;
  openDeploymentRun: (project: string, id: string) => void;
  onArchiveChanged: (
    project: string,
    kind: 'session' | 'workflow',
    id: string,
    deleted: boolean
  ) => void;
}) {
  const [section, setSection] = useState<string>(
    deploymentIntent
      ? 'deployment'
      : sessionStorage.getItem('flowgram.settings.intent') === 'model'
      ? 'model'
      : 'general'
  );
  const content = useRef<HTMLDivElement>(null);
  useContentTransition(content, section);
  useEffect(() => {
    if (deploymentIntent) setSection('deployment');
  }, [deploymentIntent]);
  const [deploymentVisited, setDeploymentVisited] = useState(!!deploymentIntent);
  useEffect(() => {
    if (section === 'deployment') setDeploymentVisited(true);
  }, [section]);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');
  const [tools, setTools] = useState<Array<{ name: string; description: string }>>([]);
  const [motion, setMotion] = useState(() => localStorage.getItem('flowgram.motion') || 'system');
  useEffect(() => {
    api<typeof tools>('/api/tools')
      .then(setTools)
      .catch((e) => setError(e.message));
  }, []);
  useEffect(() => {
    const open = () => {
      setSection('model');
      sessionStorage.removeItem('flowgram.settings.intent');
    };
    sessionStorage.removeItem('flowgram.settings.intent');
    window.addEventListener('flowgram:open-model-settings', open);
    return () => window.removeEventListener('flowgram:open-model-settings', open);
  }, []);
  function appearance(value: string) {
    localStorage.setItem('flowgram.motion', value);
    document.documentElement.dataset.motion = value;
    setMotion(value);
  }
  return (
    <section
      className="settings-page fixed inset-0 z-40 flex bg-background text-foreground"
      aria-label={tx('设置页面')}
    >
      <ResizablePanel
        storageKey="flowgram.layout.settings"
        label={tx('设置导航宽度')}
        initial={224}
        min={192}
        max={300}
        reserve={480}
        className="border-r border-border bg-sidebar"
      >
        <div className="flex h-16 items-center gap-3 px-5" data-tauri-drag-region>
          <img src={logo} alt="FlowGram" className="h-7 w-9 object-contain" />
          <span className="text-sm font-semibold">FlowGram</span>
        </div>
        <div className="px-3">
          <Button
            variant="ghost"
            className="mb-5 w-full justify-start text-muted-foreground"
            onClick={close}
          >
            <ArrowLeft />
            {tx('返回工作区')}
          </Button>
          <nav aria-label={tx('设置分类')} className="space-y-1">
            {sections.map(({ id, title, icon: Icon }) => (
              <button
                key={id}
                aria-current={section === id ? 'page' : undefined}
                onClick={() => {
                  setSection(id);
                  setError('');
                  setNotice('');
                }}
                className={cn('sidebar-row', section === id && 'sidebar-selected')}
              >
                <Icon size={17} />
                {title}
              </button>
            ))}
          </nav>
        </div>
      </ResizablePanel>
      <div className="min-w-0 flex-1 overflow-auto">
        <div
          ref={content}
          className={cn(
            'mx-auto w-full px-10 pb-20 pt-12',
            section === 'deployment' ? 'max-w-[1120px]' : 'max-w-[840px]'
          )}
        >
          <h1 className="text-xl font-semibold tracking-tight">
            {sections.find((item) => item.id === section)?.title}
          </h1>
          <p className="mb-9 mt-2 text-sm text-muted-foreground">
            {
              (
                {
                  deployment: tx('管理项目发布、全局凭证与运行服务。'),
                  archive: tx('管理已归档的会话与工作流，可恢复到原项目或彻底删除。'),
                  general: tx('管理工作区与本机运行环境。'),
                  model: tx('为对话助手与工作流节点连接模型。'),
                  appearance: tx('选择舒适的外观与动态反馈。'),
                  tools: tx('内置助手和外部 Agent 共用工作流工具。'),
                  keyboard: tx('使用快捷键在工作区中快速操作。'),
                  about: tx('面向工作流的桌面 Agent 工作台。'),
                } as Record<string, string>
              )[section]
            }
          </p>
          {notice && (
            <p role="status" className="settings-notice mb-6 flex items-center gap-2">
              <Check size={15} />
              {tx(notice)}
            </p>
          )}
          {error && (
            <p role="alert" className="mb-6 text-sm text-destructive">
              {errorText(error)}
            </p>
          )}
          <div hidden={section !== 'deployment'}>
            {deploymentVisited && (
              <Suspense
                fallback={<p className="text-sm text-muted-foreground">{tx('正在加载')}</p>}
              >
                <DeploymentPage
                  active={visible && section === 'deployment'}
                  intent={deploymentIntent}
                  onHandled={onDeploymentHandled}
                  openWorkflow={openDeploymentWorkflow}
                  openRun={openDeploymentRun}
                />
              </Suspense>
            )}
          </div>
          {section === 'archive' && (
            <Suspense fallback={<p className="text-sm text-muted-foreground">{tx('正在加载')}</p>}>
              <ArchiveSettings active={visible} onChanged={onArchiveChanged} />
            </Suspense>
          )}
          {section === 'general' && (
            <div className="settings-group">
              <div className="settings-row">
                <div>
                  <h2>
                    <label htmlFor="display-language">{tx('界面语言')}</label>
                  </h2>
                  <p>
                    {tx('选择界面显示语言。切换立即生效，不会更改工作流内容或 Agent 的回复语言。')}
                  </p>
                </div>
                <Select
                  id="display-language"
                  className="settings-select"
                  value={getLanguagePreference()}
                  onValueChange={(selectedValue) => {
                    if (!isLanguagePreference(selectedValue)) return;
                    try {
                      setLanguagePreference(selectedValue);
                    } catch {
                      setError(tx('无法保存语言偏好，请重试。'));
                    }
                  }}
                  options={[
                    { value: 'system', label: tx('跟随系统') },
                    { value: 'en', label: 'English', lang: 'en' },
                    { value: 'zh-CN', label: '简体中文', lang: 'zh-CN' },
                  ]}
                />
              </div>
              <div className="settings-row">
                <div>
                  <h2>{tx('本地服务')}</h2>
                  <p>{tx('工程数据保存在项目目录中，模型连接保存在此设备。')}</p>
                </div>
                <span className="status-pill">{online ? tx('已连接') : tx('正在连接')}</span>
              </div>
              <div className="settings-row">
                <div>
                  <h2>{tx('工作区布局')}</h2>
                  <p>{tx('拖拽分隔线调整宽度；双击分隔线恢复默认。')}</p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    for (const name of [
                      'sidebar',
                      'conversation',
                      'inspector',
                      'results',
                      'results.visible',
                      'settings',
                    ])
                      localStorage.removeItem(`flowgram.layout.${name}`);
                    window.dispatchEvent(new Event('flowgram:reset-layout'));
                    setNotice(tx('已恢复默认布局'));
                  }}
                >
                  {tx('恢复默认布局')}
                </Button>
              </div>
              <div className="settings-row">
                <div>
                  <h2>{tx('工作流执行')}</h2>
                  <p>
                    {tx('支持条件分支、列表遍历、数据处理、模型与子工作流。运行过程中可以取消。')}
                  </p>
                </div>
              </div>
            </div>
          )}
          {section === 'model' && (
            <ModelSettingsPage
              changed={() => {
                void api<ModelSettings>('/api/settings/model')
                  .then(saved)
                  .catch((e) => setError(e.message));
              }}
            />
          )}
          {section === 'appearance' && (
            <div className="settings-group">
              <ThemeSettings />
              <div className="settings-row">
                <div>
                  <h2>{tx('动态效果')}</h2>
                  <p>{tx('减少动态效果时，保留即时状态反馈。')}</p>
                </div>
                <Select
                  aria-label={tx('动态效果')}
                  className="settings-select"
                  value={motion}
                  onValueChange={appearance}
                  options={[
                    { value: 'system', label: tx('跟随系统') },
                    { value: 'full', label: tx('标准') },
                    { value: 'reduced', label: tx('减少动态效果') },
                  ]}
                />
              </div>
              <div className="py-8">
                <div className="motion-preview rounded-xl border border-border bg-secondary/40 p-5">
                  <p className="text-sm font-medium">{tx('跟随设备偏好')}</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {tx('选择「跟随系统」时，将自动遵循设备的减少动态效果设置。')}
                  </p>
                </div>
              </div>
            </div>
          )}
          {section === 'tools' && (
            <div className="settings-group">
              <div className="settings-row">
                <div>
                  <h2>{tx('外部 Agent 接入')}</h2>
                  <p>
                    {tx(
                      '在 MCP 客户端中配置本机服务地址的 /mcp 路径，以及连接文件中的 Bearer 令牌。'
                    )}
                  </p>
                  <p>{tx('令牌位于服务数据目录的 connection.json，请仅提供给受信任客户端。')}</p>
                </div>
              </div>
              <div className="py-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    void navigator.clipboard
                      .writeText(
                        tx(
                          'FlowGram MCP: 使用 connection.json 中的 endpoint + /mcp，并设置 Bearer token'
                        )
                      )
                      .then(() => setNotice(tx('已复制 MCP 接入说明')))
                      .catch(() => setError(tx('无法复制，请手动选择接入说明。')));
                  }}
                >
                  <AssetIcon src={copyIcon} />
                  {tx('复制接入说明')}
                </Button>
              </div>
              <div className="divide-y divide-border">
                {tools.map((tool) => (
                  <div key={tool.name} className="py-4">
                    <h2 className="text-sm font-medium">{tx(tool.description)}</h2>
                    <code className="mt-1 block text-xs text-muted-foreground">{tool.name}</code>
                  </div>
                ))}
              </div>
            </div>
          )}
          {section === 'keyboard' && (
            <div className="settings-group">
              {[
                [tx('新建任务'), '⌘ / Ctrl N'],
                [tx('搜索会话与工作流'), '⌘ / Ctrl K'],
                [tx('显示或隐藏侧栏'), '⌘ / Ctrl B'],
                [tx('打开设置'), '⌘ / Ctrl ,'],
                [tx('发送消息'), 'Enter'],
                [tx('输入换行'), 'Shift Enter'],
                [tx('调整分区尺寸'), tx('聚焦分隔线后使用方向键')],
              ].map(([label, shortcut]) => (
                <div className="settings-row" key={label}>
                  <h2>{label}</h2>
                  <kbd className="rounded-md border border-border px-2 py-1 text-xs text-muted-foreground">
                    {shortcut}
                  </kbd>
                </div>
              ))}
            </div>
          )}
          {section === 'about' && (
            <div className="settings-group">
              <div className="flex items-center gap-4 py-8">
                <img
                  src={logo}
                  alt={tx('FlowGram 官方标志')}
                  className="h-16 w-24 object-contain"
                />
                <div>
                  <h2 className="text-lg font-semibold">FlowGram</h2>
                  <p className="mt-1 text-sm text-muted-foreground">Desktop · 0.1.0</p>
                </div>
              </div>
              <p className="text-sm leading-7 text-muted-foreground">
                {tx('通过对话与画布搭建可复用的工作流，在本机执行并追踪每一步结果。')}
              </p>
              <a
                href="https://flowgram.ai"
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sm underline underline-offset-4"
              >
                {tx('FlowGram 文档')}
                <AssetIcon src={arrowOut} />
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
