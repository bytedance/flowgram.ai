/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';

import type { ModelInventory } from './models';

const inventory: ModelInventory = {
  connections: [
    {
      id: 'gateway',
      name: 'Model service',
      provider: 'custom',
      protocol: 'responses',
      baseUrl: 'http://localhost:9000',
      credentialId: null,
      enabled: true,
      timeoutMs: 1000,
      revision: 1,
      updatedAt: '',
    },
  ],
  models: [
    {
      id: 'model',
      name: 'Available model',
      modelId: 'upstream-model',
      connectionId: 'gateway',
      enabled: true,
      capabilities: { tools: true, streaming: true, reasoningEfforts: [] },
      contextWindow: null,
      parameters: {},
      revision: 1,
      updatedAt: '',
    },
  ],
  credentials: [],
  defaults: { chat: 'model', workflow: 'model', revision: 1 },
  verifications: {},
};
const fetcher = vi.fn();
beforeEach(() => {
  vi.resetModules();
  fetcher.mockReset();
  vi.stubGlobal('fetch', fetcher);
  vi.stubGlobal('navigator', { language: 'en' });
});
afterEach(() => vi.unstubAllGlobals());
const response = (value: ModelInventory) => new Response(JSON.stringify(value));
async function picker() {
  const { ModelPicker } = await import('../components/model-picker');
  return renderToStaticMarkup(<ModelPicker value={{}} onChange={() => {}} kind="chat" />);
}

describe('model catalog recovery', () => {
  it('distinguishes a loading or failed catalog from a genuinely empty catalog and retries', async () => {
    const models = await import('./models');
    expect(models.getModelLoadState()).toBe('idle');
    expect(await picker()).toContain('Loading models');
    fetcher.mockRejectedValueOnce(new Error('Local service is not ready'));
    const first = models.refreshModels();
    expect(models.getModelLoadState()).toBe('loading');
    await expect(first).rejects.toThrow('Cannot reach the local service');
    expect(models.getModelLoadState()).toBe('error');
    const failed = await picker();
    expect(failed).toContain('Unable to load models');
    expect(failed).not.toContain('No model configured');
    fetcher.mockResolvedValueOnce(
      response({ ...inventory, models: [], defaults: { chat: null, workflow: null, revision: 1 } })
    );
    await models.refreshModels();
    expect(models.getModelLoadState()).toBe('ready');
    expect(await picker()).toContain('No model configured');
    fetcher.mockResolvedValueOnce(response(inventory));
    await models.refreshModels();
    expect(await picker()).toContain('Available model');
  });

  it('keeps the previous model selection after refresh failure and recovers the catalog', async () => {
    const models = await import('./models');
    fetcher.mockResolvedValueOnce(response(inventory));
    await models.refreshModels();
    fetcher.mockRejectedValueOnce(new Error('Offline'));
    await expect(models.refreshModels()).rejects.toThrow('Cannot reach the local service');
    expect(await picker()).toContain('Available model');
    fetcher.mockResolvedValueOnce(
      response({ ...inventory, models: [{ ...inventory.models[0], name: 'Updated model' }] })
    );
    await models.refreshModels();
    expect(await picker()).toContain('Updated model');
  });

  it('deduplicates concurrent reads and reads again after a pre-connection request fails', async () => {
    const models = await import('./models');
    let reject!: (reason: Error) => void;
    fetcher.mockImplementationOnce(
      () =>
        new Promise<Response>((_, fail) => {
          reject = fail;
        })
    );
    const beforeConnection = models.refreshModels();
    expect(models.refreshModels()).toBe(beforeConnection);
    fetcher.mockResolvedValueOnce(response(inventory));
    const afterConnection = models.refreshModels(true);
    reject(new Error('Native connection is not ready'));
    await expect(beforeConnection).rejects.toThrow('Cannot reach the local service');
    await expect(afterConnection).resolves.toEqual(inventory);
    expect(fetcher).toHaveBeenCalledTimes(2);
    expect(models.getModelLoadState()).toBe('ready');
  });

  it('does not let an earlier successful read overwrite a requested fresh catalog', async () => {
    const models = await import('./models');
    let complete!: (response: Response) => void;
    fetcher.mockImplementationOnce(
      () =>
        new Promise<Response>((resolve) => {
          complete = resolve;
        })
    );
    const old = models.refreshModels();
    fetcher.mockResolvedValueOnce(response(inventory));
    const fresh = models.refreshModels(true);
    complete(response({ ...inventory, models: [] }));
    await old;
    await fresh;
    expect(await picker()).toContain('Available model');
    expect(fetcher).toHaveBeenCalledTimes(2);
  });
});
