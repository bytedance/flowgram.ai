/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { afterEach, describe, expect, it, vi } from 'vitest';

import { projectApi } from './project-context';
import { api, subscribeEvents } from './api';

afterEach(() => vi.unstubAllGlobals());
describe('desktop service transport', () => {
  it('keeps Unicode intact across stream chunks and ignores duplicate event sequences', async () => {
    const event = {
      sequence: 4,
      kind: 'message',
      objectId: 'task',
      data: JSON.stringify({ content: '流程完成' }),
      createdAt: 'now',
    };
    const encoded = new TextEncoder().encode(
      `: connected\n\ndata: ${JSON.stringify(event)}\n\ndata: ${JSON.stringify(event)}\n\n`
    );
    const body = new ReadableStream({
      start(controller) {
        for (const byte of encoded) controller.enqueue(new Uint8Array([byte]));
        controller.close();
      },
    });
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(body)));
    const controller = new AbortController();
    const events: unknown[] = [];
    const connection: boolean[] = [];
    await subscribeEvents(
      controller.signal,
      (received) => {
        events.push(received);
        controller.abort();
      },
      (online) => connection.push(online)
    );
    expect(events).toEqual([event]);
    expect(connection[0]).toBe(true);
  });
  it('reports structured backend errors to the caller', async () => {
    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockResolvedValue(
          new Response(JSON.stringify({ error: { message: '工作流版本已更新' } }), { status: 409 })
        )
    );
    await expect(api('/api/workflows/example', 'PUT', {})).rejects.toThrow('工作流版本已更新');
  });
});

it('keeps request scope bound to its project across concurrent project views', async () => {
  const fetcher = vi.fn().mockImplementation(async () => new Response('{}'));
  vi.stubGlobal('fetch', fetcher);
  const first = projectApi('project-a');
  const second = projectApi('project-b');
  await Promise.all([
    first('/api/workflows/first'),
    second('/api/workflows/second'),
    first('/api/runs/first'),
  ]);
  expect(fetcher.mock.calls.map(([, options]) => options.headers['X-FlowGram-Project'])).toEqual([
    'project-a',
    'project-b',
    'project-a',
  ]);
});

it('resumes task events from the conversation snapshot watermark', async () => {
  const controller = new AbortController();
  const event = {
    sequence: 43,
    kind: 'conversation_turn',
    objectId: 'task',
    data: '{}',
    createdAt: 'now',
  };
  const fetcher = vi.fn().mockResolvedValue(new Response(`data: ${JSON.stringify(event)}\n\n`));
  vi.stubGlobal('fetch', fetcher);
  await subscribeEvents(
    controller.signal,
    () => controller.abort(),
    () => {},
    'task',
    42
  );
  expect(fetcher.mock.calls[0][0]).toContain('after=42&objectId=task');
});

it('explains transport failures without claiming a mutation did not happen or retrying it', async () => {
  const cause = new TypeError('Load failed');
  const fetcher = vi.fn().mockRejectedValue(cause);
  vi.stubGlobal('fetch', fetcher);
  await expect(api('/api/projects/example', 'DELETE', { confirmationName: 'Example' })).rejects.toMatchObject({
    message: 'Cannot reach the local service. Check the connection and refresh to confirm the operation result',
    cause,
  });
  expect(fetcher).toHaveBeenCalledTimes(1);
});

it('preserves intentional request cancellation', async () => {
  const cancelled = new DOMException('The operation was aborted', 'AbortError');
  vi.stubGlobal('fetch', vi.fn().mockRejectedValue(cancelled));
  await expect(api('/api/bootstrap')).rejects.toBe(cancelled);
});
