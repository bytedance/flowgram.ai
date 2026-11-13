/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */
import { describe, expect, it } from 'vitest';

import {
  presentNode,
  describePredicate,
  safeRequestAddress,
  previewPredicate,
  type NodeResources,
} from './node-presentation';
import { nodeCatalog } from './node-catalog';
import { staticPorts } from './control-nodes';
import type { WorkflowNode } from './types';
import type { ModelInventory } from './models';
import { tx } from './i18n';

const constant = (content: unknown) => ({ type: 'constant', content });
const resources: NodeResources = {
  names: { start: '采购单' },
  workflows: { dependency: '审核订单' },
};
const node = (type: string, data: WorkflowNode['data'] = {}): WorkflowNode => ({
  id: 'node',
  type,
  data,
});
describe('canvas node presentation', () => {
  it('shows the configured request without exposing credentials or query values', () => {
    const request = node('http', {
      inputsValues: {
        method: constant('POST'),
        url: constant('https://alice:password@example.com/orders?apiKey=secret#private'),
      },
    });
    expect(presentNode(request, resources).lines).toEqual([
      tx('方法') + ' · POST',
      tx('地址') + ' · example.com/orders',
    ]);
    expect(safeRequestAddress(constant('javascript:secret'), resources)).toBe(tx('请求地址无效'));
    expect(
      safeRequestAddress({ type: 'ref', content: ['start', 'endpoint'] }, resources)
    ).toContain('采购单');
  });
  it('resolves user-authored names and describes typed values without serializing object secrets', () => {
    const call = presentNode(
      node('subworkflow', { inputsValues: { workflowId: constant('dependency') } }),
      resources
    );
    expect(call.lines[0]).toBe('审核订单');
    expect(call.issue).toBeUndefined();
    expect(
      presentNode(
        node('data.parse-json', {
          inputsValues: { text: { type: 'ref', content: ['start', 'json'] } },
        }),
        resources
      ).lines[0]
    ).toContain('「采购单」.json');
    const data = {
      mapping: {
        order: { type: 'ref', content: ['start', 'id'] },
        credentials: constant({ apiKey: 'secret' }),
      },
    };
    const result = presentNode(node('data.map-fields', data), resources);
    expect(result.lines.join()).toContain('采购单');
    expect(result.lines.join()).not.toContain('secret');
    expect(data.mapping.order.content).toEqual(['start', 'id']);
  });
  it('uses operation labels and actual changed values instead of generic descriptions', () => {
    const make = (operation: string) =>
      presentNode(
        node('text.transform', {
          inputsValues: { operation: constant(operation), text: constant('hello') },
        }),
        resources
      ).lines;
    expect(make('upper')).not.toEqual(make('lower'));
    expect(
      presentNode(
        node('value.math', {
          inputsValues: { operation: constant('add'), operands: constant([1, 2]) },
        }),
        resources
      ).lines[1]
    ).toContain('1 · 2');
    expect(make('upper').join()).not.toContain(
      nodeCatalog.find((entry) => entry.type === 'text.transform')!.description
    );
    for (const spec of nodeCatalog)
      expect(
        presentNode(node(spec.type, structuredClone(spec.defaults)), resources).lines.length
      ).toBeLessThanOrEqual(2);
  });
  it('preserves false and zero as configured values and marks absent required fields', () => {
    expect(
      presentNode(node('wait', { inputsValues: { durationMs: constant(0) } }), resources).issue
    ).toBeUndefined();
    expect(
      presentNode(node('http', { inputsValues: { url: constant('') } }), resources).issue
    ).toBeTruthy();
    expect(
      describePredicate(
        { left: constant(false), operator: 'eq', right: constant(false) },
        resources
      )
    ).toBe('false = false');
  });
  it('renders referenced HTTP methods and addresses as distinct tokens', () => {
    const request = node('http', {
      inputsValues: {
        method: { type: 'ref', content: ['start', 'method'] },
        url: { type: 'ref', content: ['start', 'url'] },
      },
    });
    const view = presentNode(request, resources);
    expect(view.rows).toEqual([
      { label: tx('方法'), tokens: [{ kind: 'reference', text: '采购单', detail: 'method' }] },
      { label: tx('地址'), tokens: [{ kind: 'reference', text: '采购单', detail: 'url' }] },
    ]);
    expect(view.lines.join()).not.toContain('start,method');
  });
  it('includes units for waits, preserves zero and never treats references as numbers', () => {
    for (const [amount, display] of [
      [0, '0 ms'],
      [40, '40 ms'],
      [1500, '1.5 s'],
    ] as const) {
      const view = presentNode(
        node('wait', { inputsValues: { durationMs: constant(amount) } }),
        resources
      );
      expect(view.rows[0].tokens).toEqual([{ kind: 'code', text: display }]);
    }
    expect(
      presentNode(
        node('wait', {
          inputsValues: {
            durationMs: { type: 'ref', content: ['start', 'delay'] },
          },
        }),
        resources
      ).rows[0].tokens
    ).toEqual([
      { kind: 'reference', text: '采购单', detail: 'delay' },
      { kind: 'text', text: 'ms' },
    ]);
  });
  it('summarizes schemas as typed fields with an explicit remainder', () => {
    const view = presentNode(
      node('start', {
        outputs: {
          type: 'object',
          properties: {
            orderId: { type: 'string' },
            amount: { type: 'number' },
            currency: { type: 'string' },
          },
        },
      }),
      resources
    );
    expect(view.rows[0].tokens).toEqual([
      { kind: 'field', text: 'orderId', detail: 'string' },
      { kind: 'field', text: 'amount', detail: 'number' },
      { kind: 'count', text: '+1', detail: 'currency: string' },
    ]);
  });
  it('preserves grouping in nested condition previews', () => {
    const comparison = (left: number) => ({
      left: constant(left),
      operator: 'eq',
      right: constant(1),
    });
    const tokens = previewPredicate(
      {
        combinator: 'and',
        rules: [{ combinator: 'or', rules: [comparison(1), comparison(2)] }, comparison(3)],
      },
      resources
    );
    expect(tokens.map((token) => token.text).join(' ')).toBe(
      `( 1 = 1 ${tx('或')} 2 = 1 ) ${tx('且')} 3 = 1`
    );
  });
  it('renders record fields through declared columns and bounds multiline previews', () => {
    const aggregate = presentNode(
      node('list.aggregate', {
        keys: [],
        metrics: [
          { name: 'total', operation: 'sum', path: 'amountMinor' },
          { name: 'orders', operation: 'count', path: '' },
          { name: 'average', operation: 'avg', path: 'amountMinor' },
        ],
      }),
      resources
    );
    expect(aggregate.rows[1].tokens[0]).toMatchObject({
      kind: 'field',
      text: 'total',
      detail: 'sum',
    });
    expect(aggregate.rows[1].tokens[0].description).toContain('amountMinor');
    expect(aggregate.rows[1].tokens[2]).toMatchObject({ kind: 'count', text: '+1' });
    expect(aggregate.lines.join()).not.toContain('operation:');
    const template = presentNode(
      node('text.template', {
        inputsValues: {
          format: constant('text'),
          template: constant('Daily report\n{% for row in rows %}secret body{% endfor %}'),
        },
      }),
      resources
    );
    expect(template.rows[1].tokens[0].text).toBe('Daily report');
  });
  it('keeps model snapshots independent of current model defaults', () => {
    const models = {
      models: [{ id: 'current', name: 'Current model', parameters: {} }],
      defaults: { workflow: 'current' },
    } as ModelInventory;
    const llm = node('llm', { inputsValues: { prompt: constant('private instructions') } });
    expect(presentNode(llm, { ...resources, models }).lines[0]).toBe('Current model');
    expect(presentNode(llm, { ...resources, models, readOnly: true }).lines[0]).toBe(
      tx('未采集模型配置')
    );
    const trace = {
      modelId: 'old',
      modelName: 'Pinned model',
      upstreamModel: 'upstream',
      connectionName: 'Original',
      parameters: { outputSchema: { type: 'object' } },
    };
    expect(
      presentNode(llm, { ...resources, models, readOnly: true, modelTraces: { node: trace } }).lines
    ).toEqual(['Pinned model', tx('结构化输出')]);
    expect(presentNode(llm, resources).lines.join()).not.toContain('private instructions');
  });
});
describe('static canvas geometry', () => {
  it('uses semantic branch rows on the corresponding side while preserving port IDs', () => {
    const fork = node('control.switch', {
      branches: [
        { id: 'high', label: '高额' },
        { id: 'low', label: '普通' },
      ],
    });
    const join = { ...node('control.join', { forkId: fork.id }), id: 'join' };
    const graph = { nodes: [fork, join], edges: [] };
    const first = staticPorts(fork, graph),
      second = staticPorts(join, graph);
    expect(
      first.ports
        .filter((port) => port.type === 'output')
        .map((port) => [port.portID, port.locationConfig.top])
    ).toEqual([
      ['high', 102],
      ['low', 146],
      ['else', 190],
    ]);
    expect(first.ports.find((port) => port.type === 'input')!.locationConfig.top).toBe(first.height / 2);
    expect(
      second.ports.filter((port) => port.type === 'input').map((port) => port.locationConfig.top)
    ).toEqual([102, 146, 190]);
    expect(second.ports.find((port) => port.type === 'output')!.locationConfig.top).toBe(second.height / 2);
    expect(first.ports.every((port) => !('targetElement' in port))).toBe(true);
  });
  it('uses compact content slots and aligns step ports without measuring content', () => {
    const graph = { nodes: [], edges: [] };
    const wait = staticPorts(node('wait'), graph);
    const http = staticPorts(node('http'), graph);
    expect(wait.height).toBe(84);
    expect(http.height).toBe(110);
    expect(wait.ports.map((port) => port.locationConfig.top)).toEqual([42, 42]);
    expect(http.ports.map((port) => port.locationConfig.top)).toEqual([55, 55]);
    for (const type of ['start', 'end', 'block-start', 'block-end', 'control.break', 'control.continue']) {
      const layout = staticPorts(node(type), graph);
      expect(layout.ports.every((port) => port.locationConfig.top === layout.height / 2)).toBe(true);
    }
    expect(staticPorts(node('wait', { title: 'Very long name '.repeat(20) }), graph)).toEqual(wait);
  });
  it('keeps terminal controls compact and never invents a forward output', () => {
    for (const type of ['end', 'block-end', 'control.break', 'control.continue'])
      expect(
        staticPorts(node(type), { nodes: [], edges: [] }).ports.filter(
          (port) => port.type === 'output'
        )
      ).toEqual([]);
    expect(staticPorts(node('block-start'), { nodes: [], edges: [] })).toMatchObject({
      width: 168,
      height: 36,
    });
    expect(staticPorts(node('http'), { nodes: [], edges: [] })).toMatchObject({
      width: 280,
      height: 110,
    });
    for (const type of ['loop', 'control.repeat']) {
      const loop = staticPorts(node(type), { nodes: [], edges: [] });
      expect(loop.ports.map((port) => port.locationConfig)).toEqual([
        { left: 0, top: '50%' }, { right: 0, top: '50%' },
      ]);
      expect(loop.ports.every((port) => !('targetElement' in port))).toBe(true);
    }
  });
});
