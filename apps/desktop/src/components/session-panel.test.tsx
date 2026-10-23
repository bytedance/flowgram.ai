/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */
import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';

import type { ConversationInput, Turn } from '../lib/types';
import { setLanguagePreference } from '../lib/i18n';
import { emptyConversation, type ConversationState } from '../lib/conversation-state';

const fixture = vi.hoisted(() => ({ state: null as unknown as ConversationState }));
vi.mock('../lib/use-conversation', () => ({
  useConversation: () => ({
    state: fixture.state,
    reload: async () => {},
    retry: () => {},
    loadOlder: async () => {},
    loadingOlder: false,
    error: '',
  }),
}));
vi.mock('../lib/project-context', () => ({ useProjectApi: () => vi.fn() }));
vi.mock('../lib/models', async (original) => ({
  ...(await original<typeof import('../lib/models')>()),
  useModels: () => ({
    models: [],
    connections: [],
    credentials: [],
    defaults: {},
    verifications: {},
  }),
}));
vi.mock('./model-picker', () => ({ ModelPicker: () => <button>Model</button> }));

import { SessionPanel } from './session-panel';
import { ConversationQueue } from './conversation-timeline';

function turn(status: Turn['status'] = 'running'): Turn {
  return {
    id: 'turn',
    sessionId: 'session',
    initiatingInputId: 'input',
    ordinal: 1,
    status,
    phase: 'model',
    revision: 1,
    startedAt: '2026-10-23T00:00:00Z',
    endedAt: null,
    finalItemId: null,
    error: null,
  };
}
function render() {
  return renderToStaticMarkup(
    <SessionPanel
      project={{ id: 'project', name: 'Project', directory: '/project', createdAt: '' }}
      sessionId="session"
      sessionEpoch={0}
      sessions={[]}
      workflows={[]}
      runs={[]}
      model={null}
      online
      ready
      workbenchOpen={false}
      onCreated={() => {}}
      onChanged={() => {}}
      onOpenWorkflow={() => {}}
      onOpenRun={() => {}}
      onSettings={() => {}}
      onToggleWorkbench={() => {}}
      onNewSession={() => {}}
      onArchive={() => {}}
      onActivity={() => {}}
      onTurn={() => {}}
    />
  );
}
beforeEach(() => {
  fixture.state = emptyConversation('session');
  vi.stubGlobal('sessionStorage', { getItem: () => null });
  vi.stubGlobal('localStorage', { setItem: () => {} });
  setLanguagePreference('en');
});
afterEach(() => {
  setLanguagePreference('system');
  vi.unstubAllGlobals();
});

describe('conversation input delivery', () => {
  it.each(['en', 'zh-CN'] as const)(
    'keeps delivery modes out of the composer in %s while running',
    (locale) => {
      setLanguagePreference(locale);
      fixture.state.turns.turn = turn();
      const html = render();
      expect(html).not.toContain('Input delivery');
      expect(html).not.toContain('Next turn');
      expect(html).not.toContain('输入投递方式');
      expect(html).not.toContain('下一轮执行');
      expect(html).not.toContain('补充本轮');
    }
  );
  it('offers steering on queued messages only while the current task is running', () => {
    fixture.state.inputs.queued = {
      id: 'queued',
      clientInputId: 'queued',
      sessionId: 'session',
      content: 'Use the existing workflow',
      deliveryMode: 'queue',
      turnId: null,
      status: 'queued',
      revision: 1,
      createdAt: '',
      error: null,
      references: null,
    } satisfies ConversationInput;
    const queue = (active?: Turn) =>
      renderToStaticMarkup(
        <ConversationQueue
          state={fixture.state}
          active={active}
          reload={async () => {}}
          workflows={[]}
        />
      );
    expect(queue(turn())).toContain('>Steer</button>');
    expect(queue(turn())).toContain('Insert after the current tool call finishes');
    expect(queue(turn())).toContain('Queued messages');
    expect(queue(turn('stopping'))).not.toContain('>Steer</button>');
    expect(queue()).not.toContain('>Steer</button>');
    fixture.state.inputs.queued.status = 'pending';
    expect(queue(turn())).not.toContain('>Steer</button>');
  });
});
