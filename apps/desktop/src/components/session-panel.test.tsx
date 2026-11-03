/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */
import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';

import type { ConversationInput, Turn } from '../lib/types';
import { setLanguagePreference } from '../lib/i18n';
import { emptyConversation, type ConversationState } from '../lib/conversation-state';
import { SessionPanel } from './session-panel';
import { ConversationQueue } from './conversation-timeline';

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
function render(online = true) {
  return renderToStaticMarkup(
    <SessionPanel
      project={{ id: 'project', name: 'Project', directory: '/project', createdAt: '' }}
      sessionId="session"
      sessionEpoch={0}
      sessions={[]}
      workflows={[]}
      runs={[]}
      model={null}
      online={online}
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
    fixture.state.inputs.queued.status = 'rejected';
    expect(queue(turn())).toContain('>Send again</button>');
    expect(queue(turn())).not.toContain('>Steer</button>');
    fixture.state.inputs.queued.status = 'pending';
    expect(queue(turn())).not.toContain('>Send again</button>');
    expect(queue(turn())).not.toContain('>Steer</button>');
  });
});

describe('composer primary action', () => {
  function draft(content: string) {
    vi.stubGlobal('sessionStorage', {
      getItem: () => JSON.stringify({ session: { content, mentions: [] } }),
    });
  }
  function button(online = true) {
    const buttons = render(online).match(/<button[^>]*class="[^"]*composer-action[^>]*>/g) || [];
    expect(buttons).toHaveLength(1);
    return buttons[0];
  }
  it('shows a disabled send action when idle and empty, then enables it for a draft', () => {
    expect(button()).toContain('data-action="send"');
    expect(button()).toContain('aria-label="Send"');
    expect(button()).toContain('disabled=""');
    draft('Create a workflow');
    expect(button()).not.toContain('disabled=""');
  });
  it('shows stop for an empty running composer and switches that same action to queue a draft', () => {
    fixture.state.turns.turn = turn();
    expect(button()).toContain('data-action="stop"');
    expect(button()).toContain('aria-label="Stop"');
    expect(button()).not.toContain('disabled=""');
    draft('Use the existing workflow');
    expect(button()).toContain('data-action="send"');
    expect(button()).toContain('aria-label="Add to message queue"');
    expect(button()).not.toContain('disabled=""');
    draft('  \n  ');
    expect(button()).toContain('data-action="stop"');
  });
  it('keeps the stopping state disabled even with an unsent draft', () => {
    fixture.state.turns.turn = turn('stopping');
    draft('Preserve this draft');
    expect(button()).toContain('data-action="stop"');
    expect(button()).toContain('aria-label="Stopping"');
    expect(button()).toContain('disabled=""');
  });
  it('disables both actions while disconnected and localizes their accessible labels', () => {
    draft('Follow up');
    expect(button(false)).toContain('disabled=""');
    fixture.state.turns.turn = turn();
    setLanguagePreference('zh-CN');
    expect(button()).toContain('aria-label="加入消息队列"');
    draft('');
    expect(button(false)).toContain('disabled=""');
    expect(button()).toContain('aria-label="停止"');
  });
});
