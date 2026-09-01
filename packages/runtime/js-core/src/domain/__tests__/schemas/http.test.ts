/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { describe, expect, it, vi, beforeEach } from 'vitest';
import { IContainer, IEngine, WorkflowStatus } from '@flowgram.ai/runtime-interface';

import { snapshotsToVOData } from '../utils';
import { WorkflowRuntimeContainer } from '../../container';
import { TestSchemas } from '.';

const container: IContainer = WorkflowRuntimeContainer.instance;

// Mock global fetch function
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('WorkflowRuntime http schema', () => {
  beforeEach(() => {
    // Reset mock before each test
    mockFetch.mockReset();
  });

  it('should execute a workflow with HTTP request', async () => {
    // Mock successful HTTP response
    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      statusText: 'OK',
      headers: new Headers({
        'content-type': 'application/json',
      }),
      text: async () =>
        JSON.stringify({
          url: 'https://api.example.com/post',
          json: {},
          headers: {
            'Content-Type': 'application/json',
          },
        }),
    });

    const engine = container.get<IEngine>(IEngine);
    const { context, processing } = engine.invoke({
      schema: TestSchemas.httpSchema,
      inputs: {
        host: 'api.example.com',
        path: '/post',
      },
    });

    expect(context.statusCenter.workflow.status).toBe(WorkflowStatus.Processing);
    const result = await processing;
    expect(context.statusCenter.workflow.status).toBe(WorkflowStatus.Succeeded);

    // Verify the result structure
    expect(result).toHaveProperty('res');
    expect(result).toHaveProperty('code');
    expect(typeof result.res).toBe('string');
    expect(typeof result.code).toBe('number');
    expect(result.code).toBe(200);

    // Verify fetch was called with correct parameters
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.example.com/post',
      expect.objectContaining({
        method: 'POST',
        body: '{}',
        headers: expect.any(Object),
      })
    );

    const snapshots = snapshotsToVOData(context.snapshotCenter.exportAll());
    expect(snapshots).toHaveLength(3);

    // Verify start node snapshot
    expect(snapshots[0]).toMatchObject({
      nodeID: 'start_0',
      inputs: {},
      outputs: {
        host: 'api.example.com',
        path: '/post',
      },
      data: {},
    });

    // Verify http node snapshot
    expect(snapshots[1]).toMatchObject({
      nodeID: 'http_0',
      inputs: {
        method: 'POST',
        url: 'https://api.example.com/post',
        body: '{}',
        headers: {},
        params: {},
        timeout: 10000,
        retryTimes: 1,
      },
      data: {},
    });
    expect(snapshots[1].outputs).toHaveProperty('body');
    expect(snapshots[1].outputs).toHaveProperty('headers');
    expect(snapshots[1].outputs).toHaveProperty('statusCode');
    expect(snapshots[1].outputs.statusCode).toBe(200);

    // Verify end node snapshot
    expect(snapshots[2]).toMatchObject({
      nodeID: 'end_0',
      data: {},
    });
    expect(snapshots[2].inputs).toHaveProperty('res');
    expect(snapshots[2].inputs).toHaveProperty('code');
    expect(snapshots[2].outputs).toHaveProperty('res');
    expect(snapshots[2].outputs).toHaveProperty('code');
    expect(snapshots[2].outputs.code).toBe(200);

    const report = context.reporter.export();
    expect(report.workflowStatus.status).toBe(WorkflowStatus.Succeeded);
    expect(report.reports.start_0.status).toBe(WorkflowStatus.Succeeded);
    expect(report.reports.http_0.status).toBe(WorkflowStatus.Succeeded);
    expect(report.reports.end_0.status).toBe(WorkflowStatus.Succeeded);
  });

  it('should handle HTTP request with different inputs and status codes', async () => {
    // Mock HTTP response with 201 status
    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 201,
      statusText: 'Created',
      headers: new Headers({
        'content-type': 'application/json',
      }),
      text: async () =>
        JSON.stringify({
          id: 101,
          title: 'foo',
          body: 'bar',
          userId: 1,
        }),
    });

    const engine = container.get<IEngine>(IEngine);
    const { context, processing } = engine.invoke({
      schema: TestSchemas.httpSchema,
      inputs: {
        host: 'api.test.com',
        path: '/posts',
      },
    });

    expect(context.statusCenter.workflow.status).toBe(WorkflowStatus.Processing);
    const result = await processing;
    expect(context.statusCenter.workflow.status).toBe(WorkflowStatus.Succeeded);

    // Verify the result structure
    expect(result).toHaveProperty('res');
    expect(result).toHaveProperty('code');
    expect(typeof result.res).toBe('string');
    expect(typeof result.code).toBe('number');
    expect(result.code).toBe(201);

    // Verify fetch was called with correct URL
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.test.com/posts',
      expect.objectContaining({
        method: 'POST',
      })
    );

    const report = context.reporter.export();
    expect(report.workflowStatus.status).toBe(WorkflowStatus.Succeeded);
    expect(report.reports.start_0.status).toBe(WorkflowStatus.Succeeded);
    expect(report.reports.http_0.status).toBe(WorkflowStatus.Succeeded);
    expect(report.reports.end_0.status).toBe(WorkflowStatus.Succeeded);
  });

  it('should send a raw-text request body', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      statusText: 'OK',
      headers: new Headers(),
      text: async () => 'OK',
    });

    const schema = structuredClone(TestSchemas.httpSchema);
    const httpNode = schema.nodes.find((node) => node.id === 'http_0');
    if (!httpNode) {
      throw new Error('HTTP test node not found');
    }
    httpNode.data.body = {
      bodyType: 'raw-text',
      rawText: {
        type: 'template',
        content: 'request to {{start_0.path}}',
      },
    };

    const engine = container.get<IEngine>(IEngine);
    const { processing } = engine.invoke({
      schema,
      inputs: {
        host: 'api.example.com',
        path: '/raw',
      },
    });

    await processing;

    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.example.com/raw',
      expect.objectContaining({
        body: 'request to /raw',
      })
    );
  });

  it('should handle HTTP request failure', async () => {
    // Mock HTTP error response
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found',
      headers: new Headers(),
      text: async () => 'Not Found',
    });

    const engine = container.get<IEngine>(IEngine);
    const { context, processing } = engine.invoke({
      schema: TestSchemas.httpSchema,
      inputs: {
        host: 'api.mock.com',
        path: '/nonexistent',
      },
    });

    expect(context.statusCenter.workflow.status).toBe(WorkflowStatus.Processing);
    const result = await processing;

    // The workflow should still succeed but with error status code
    expect(context.statusCenter.workflow.status).toBe(WorkflowStatus.Succeeded);
    expect(result).toHaveProperty('res');
    expect(result).toHaveProperty('code');
    expect(result.code).toBe(404);

    // Verify fetch was called
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.mock.com/nonexistent',
      expect.objectContaining({
        method: 'POST',
      })
    );
  });

  it('should handle network error', async () => {
    // Mock network error
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    const engine = container.get<IEngine>(IEngine);
    const { context, processing } = engine.invoke({
      schema: TestSchemas.httpSchema,
      inputs: {
        host: 'api.invalid.test',
        path: '/test',
      },
    });

    expect(context.statusCenter.workflow.status).toBe(WorkflowStatus.Processing);
    await processing;

    // The workflow should fail due to network error
    expect(context.statusCenter.workflow.status).toBe(WorkflowStatus.Failed);

    const report = context.reporter.export();
    expect(report.workflowStatus.status).toBe(WorkflowStatus.Failed);
    expect(report.reports.http_0.status).toBe(WorkflowStatus.Failed);
  });
});
