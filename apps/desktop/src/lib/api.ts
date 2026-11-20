/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import type { RuntimeEvent } from './types';
let endpoint = '';
let token = '';
export async function connectDesktop() {
  if ('__TAURI_INTERNALS__' in window) {
    const { invoke } = await import('@tauri-apps/api/core');
    const connection = await invoke<{ endpoint: string; token: string }>('backend_connection');
    endpoint = connection.endpoint;
    token = connection.token;
  }
}
export async function api<T>(
  path: string,
  method = 'GET',
  body?: unknown,
  signal?: AbortSignal,
  projectId?: string
): Promise<T> {
  const payload = body === undefined ? undefined : JSON.stringify(body);
  let response: Response;
  try {
    response = await fetch(`${endpoint}${path}`, {
      method,
      signal,
      headers: {
        ...(body === undefined ? {} : { 'Content-Type': 'application/json' }),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(projectId ? { 'X-FlowGram-Project': projectId } : {}),
      },
      body: payload,
    });
  } catch (cause) {
    if (signal?.aborted || (cause instanceof Error && cause.name === 'AbortError')) throw cause;
    // A lost response does not prove a mutation failed; never retry it automatically.
    throw new Error(
      'Cannot reach the local service. Check the connection and refresh to confirm the operation result',
      { cause }
    );
  }
  if (!response.ok) {
    const data = await response.json().catch(() => null);
    throw new Error(data?.error?.message || `HTTP ${response.status}`);
  }
  return response.json();
}
export async function subscribeEvents(
  signal: AbortSignal,
  onEvent: (event: RuntimeEvent) => void,
  onConnection: (online: boolean) => void,
  objectId?: string,
  initialAfter = 0,
  projectId?: string
) {
  let after = initialAfter;
  while (!signal.aborted) {
    try {
      const response = await fetch(
        `${endpoint}/api/events?after=${after}${
          objectId ? `&objectId=${encodeURIComponent(objectId)}` : ''
        }`,
        {
          signal,
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...(projectId ? { 'X-FlowGram-Project': projectId } : {}),
          },
        }
      );
      if (!response.ok || !response.body) throw new Error('Event connection failed');
      onConnection(true);
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      while (!signal.aborted) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        let boundary: number;
        while ((boundary = buffer.indexOf('\n\n')) >= 0) {
          const frame = buffer.slice(0, boundary);
          buffer = buffer.slice(boundary + 2);
          const data = frame
            .split('\n')
            .find((line) => line.startsWith('data:'))
            ?.slice(5)
            .trim();
          if (!data) continue;
          const event = JSON.parse(data) as RuntimeEvent;
          if (event.sequence > after) {
            after = event.sequence;
            onEvent(event);
          }
        }
      }
    } catch (error) {
      if (signal.aborted) return;
      onConnection(false);
    }
    onConnection(false);
    if (!signal.aborted)
      await new Promise<void>((resolve) => {
        const finish = () => {
          clearTimeout(timer);
          signal.removeEventListener('abort', finish);
          resolve();
        };
        const timer = setTimeout(finish, 1500);
        signal.addEventListener('abort', finish, { once: true });
      });
  }
}
