/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { describe, expect, it } from 'vitest';
import { ExecutionContext } from '@flowgram.ai/runtime-interface';

import { MockLLMExecutor } from '../../domain/__tests__/executor/llm';

describe('LLMExecutor checkApiHost', () => {
  const validInputs = {
    modelName: 'test-model',
    apiKey: 'test-api-key',
    apiHost: 'https://api.example.com',
    temperature: 0.6,
    prompt: 'Hello',
  };

  const executeWithApiHost = (apiHost: string) => {
    const executor = new MockLLMExecutor();
    return executor.execute({
      inputs: { ...validInputs, apiHost },
    } as ExecutionContext);
  };

  it('should throw a friendly error when apiHost has no protocol', async () => {
    await expect(executeWithApiHost('api.example.com')).rejects.toThrow(
      'Invalid API host format - api.example.com'
    );
  });

  it('should throw a friendly error when apiHost is not a URL', async () => {
    await expect(executeWithApiHost('not a url')).rejects.toThrow(
      'Invalid API host format - not a url'
    );
  });

  it('should keep the friendly protocol error for non-http(s) URLs', async () => {
    await expect(executeWithApiHost('ftp://api.example.com')).rejects.toThrow(
      'Invalid API host protocol - ftp:'
    );
  });
});
