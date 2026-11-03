/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { describe, expect, it, vi } from 'vitest';

import { RemoteSelectRequestError, loadRemoteSelectOptions } from './load-options';

describe('loadRemoteSelectOptions', () => {
  it('loads an option array from the configured URL', async () => {
    const fetcher = vi.fn().mockResolvedValue(
      new Response(JSON.stringify([{ label: 'Alpha', value: 'alpha' }]), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    );
    const controller = new AbortController();

    const options = await loadRemoteSelectOptions({
      url: '/api/options',
      requestInit: { headers: { Authorization: 'Bearer token' } },
      fetcher,
      signal: controller.signal,
    });

    expect(options).toEqual([{ label: 'Alpha', value: 'alpha' }]);
    expect(fetcher).toHaveBeenCalledWith('/api/options', {
      headers: { Authorization: 'Bearer token' },
      signal: controller.signal,
    });
  });

  it('supports transforming nested backend payloads', async () => {
    const fetcher = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ data: { items: [{ name: 'Beta', id: 2 }] } }), {
        status: 200,
      })
    );

    const options = await loadRemoteSelectOptions({
      url: '/api/options',
      fetcher,
      transformResponse: (payload) => {
        const response = payload as {
          data: { items: Array<{ name: string; id: number }> };
        };
        return response.data.items.map((item) => ({
          label: item.name,
          value: item.id,
        }));
      },
    });

    expect(options).toEqual([{ label: 'Beta', value: 2 }]);
  });

  it('reports non-success HTTP responses with status details', async () => {
    const fetcher = vi.fn().mockResolvedValue(
      new Response('unavailable', {
        status: 503,
        statusText: 'Service Unavailable',
      })
    );

    await expect(loadRemoteSelectOptions({ url: '/api/options', fetcher })).rejects.toEqual(
      expect.objectContaining<Partial<RemoteSelectRequestError>>({
        name: 'RemoteSelectRequestError',
        status: 503,
        statusText: 'Service Unavailable',
        url: '/api/options',
      })
    );
  });

  it('rejects payloads that do not resolve to an option array', async () => {
    const fetcher = vi
      .fn()
      .mockResolvedValue(new Response(JSON.stringify({ data: 'not-an-array' }), { status: 200 }));

    await expect(loadRemoteSelectOptions({ url: '/api/options', fetcher })).rejects.toThrow(
      'RemoteSelect expected an option array'
    );
  });
});
