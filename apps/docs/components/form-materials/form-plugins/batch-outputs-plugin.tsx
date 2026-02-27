/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';

import { Field, FlowNodeRegistry } from '@flowgram.ai/free-layout-editor';
import { SubCanvasRender, createContainerNodePlugin } from '@flowgram.ai/free-container-plugin';
import {
  provideBatchInputEffect,
  createBatchOutputsFormPlugin,
  type IFlowRefValue,
  DisplayOutputs,
} from '@flowgram.ai/form-materials';

import { FreeFormMetaStoryBuilder, FormHeader } from '../../free-form-meta-story-builder';

const BatchVariableSelector = React.lazy(() =>
  import('@flowgram.ai/form-materials').then((module) => ({
    default: module.BatchVariableSelector,
  }))
);

const BatchOutputs = React.lazy(() =>
  import('@flowgram.ai/form-materials').then((module) => ({
    default: module.BatchOutputs,
  }))
);

type BatchOutputsValueType = Record<string, IFlowRefValue | undefined>;

const createLoopRegistry = (): FlowNodeRegistry => ({
  type: 'custom',
  meta: {
    isContainer: true,
    size: {
      width: 500,
      height: 260,
    },
    padding: () => ({
      top: 160,
      bottom: 40,
      left: 50,
      right: 50,
    }),
  },
  formMeta: {
    render: () => (
      <>
        <FormHeader />
        <div style={{ marginBottom: 16 }}>
          <div style={{ marginBottom: 8, fontSize: 12, color: '#666' }}>
            Loop input (select array variable):
          </div>
          <Field<IFlowRefValue | undefined>
            name="loopFor"
            defaultValue={{ type: 'ref', content: ['start_0', 'arr', 'arr_obj'] }}
          >
            {({ field }) => (
              <BatchVariableSelector
                style={{ width: '100%' }}
                value={field.value?.content}
                onChange={(val) => field.onChange({ type: 'ref', content: val })}
              />
            )}
          </Field>
        </div>
        <SubCanvasRender offsetY={-100} />
        <div style={{ marginBottom: 16 }}>
          <div style={{ marginBottom: 8, fontSize: 12, color: '#666' }}>
            Loop outputs (collected into arrays):
          </div>
          <Field<BatchOutputsValueType | undefined>
            name="loopOutputs"
            defaultValue={{
              names: { type: 'ref', content: ['variable_0', 'name'] },
            }}
          >
            {({ field }) => (
              <BatchOutputs
                style={{ width: '100%' }}
                value={field.value}
                onChange={(val) => field.onChange(val)}
              />
            )}
          </Field>
        </div>
        <div>
          <div style={{ marginBottom: 8, fontSize: 12, color: '#666' }}>
            Generated output variables:
          </div>
          <DisplayOutputs displayFromScope />
        </div>
      </>
    ),
    effect: {
      loopFor: provideBatchInputEffect,
    },
    plugins: [
      createBatchOutputsFormPlugin({ outputKey: 'loopOutputs', inferTargetKey: 'outputs' }),
    ],
  },
});

const createLoopRegistryWithInfer = (): FlowNodeRegistry => ({
  type: 'custom',
  meta: {
    isContainer: true,
    size: {
      width: 500,
      height: 260,
    },
    padding: () => ({
      top: 160,
      bottom: 40,
      left: 50,
      right: 50,
    }),
  },
  formMeta: {
    render: () => (
      <>
        <FormHeader />
        <div style={{ marginBottom: 16 }}>
          <div style={{ marginBottom: 8, fontSize: 12, color: '#666' }}>Loop input:</div>
          <Field<IFlowRefValue | undefined>
            name="loopFor"
            defaultValue={{ type: 'ref', content: ['start_0', 'arr', 'arr_obj'] }}
          >
            {({ field }) => (
              <BatchVariableSelector
                style={{ width: '100%' }}
                value={field.value?.content}
                onChange={(val) => field.onChange({ type: 'ref', content: val })}
              />
            )}
          </Field>
        </div>
        <SubCanvasRender offsetY={-100} />
        <div style={{ marginBottom: 16 }}>
          <div style={{ marginBottom: 8, fontSize: 12, color: '#666' }}>
            Loop outputs (with schema inference):
          </div>
          <Field<BatchOutputsValueType | undefined>
            name="loopOutputs"
            defaultValue={{
              items: { type: 'ref', content: ['variable_0', 'item_name'] },
              values: { type: 'ref', content: ['variable_0', 'item_index'] },
            }}
          >
            {({ field }) => (
              <BatchOutputs
                style={{ width: '100%' }}
                value={field.value}
                onChange={(val) => field.onChange(val)}
              />
            )}
          </Field>
        </div>
        <div>
          <div style={{ marginBottom: 8, fontSize: 12, color: '#666' }}>
            Output variables (check Debug panel for inferred schema):
          </div>
          <DisplayOutputs displayFromScope />
        </div>
      </>
    ),
    effect: {
      loopFor: provideBatchInputEffect,
    },
    plugins: [
      createBatchOutputsFormPlugin({ outputKey: 'loopOutputs', inferTargetKey: 'outputs' }),
    ],
  },
});

export const BasicStory = () => (
  <FreeFormMetaStoryBuilder
    filterEndNode
    height={550}
    initialData={{
      nodes: [
        {
          id: 'custom_0',
          type: 'custom',
          data: {
            title: 'Loop',
            loopFor: { type: 'ref', content: ['start_0', 'arr', 'arr_obj'] },
          },
          blocks: [
            {
              id: 'block_start_0',
              type: 'block-start',
              data: { title: 'Start' },
              meta: { position: { x: 20, y: 0 } },
            },
            {
              id: 'variable_0',
              type: 'variable',
              data: {
                title: 'Variable',
                assign: [
                  {
                    operator: 'declare',
                    left: 'name',
                    right: { type: 'ref', content: ['custom_0_locals', 'item', 'str'] },
                  },
                ],
              },
              meta: { position: { x: 100, y: 0 } },
            },
            {
              id: 'block_end_0',
              type: 'block-end',
              data: { title: 'End' },
              meta: { position: { x: 360, y: 0 } },
            },
          ],
          edges: [
            { sourceNodeID: 'block_start_0', targetNodeID: 'variable_0' },
            { sourceNodeID: 'variable_0', targetNodeID: 'block_end_0' },
          ],
        },
      ],
      edges: [{ sourceNodeID: 'start_0', targetNodeID: 'custom_0' }],
    }}
    transformRegistry={(props) => ({
      ...props,
      nodeRegistries: [
        ...(props.nodeRegistries || []).filter((r) => r.type !== 'custom'),
        createLoopRegistry(),
      ],
    })}
    plugins={(ctx) => [createContainerNodePlugin({})]}
  />
);

export const WithInferSchemaStory = () => (
  <FreeFormMetaStoryBuilder
    filterEndNode
    height={550}
    initialData={{
      nodes: [
        {
          id: 'custom_0',
          type: 'custom',
          data: {
            title: 'Loop',
            loopFor: { type: 'ref', content: ['start_0', 'arr', 'arr_obj'] },
          },
          blocks: [
            {
              id: 'block_start_0',
              type: 'block-start',
              data: { title: 'Start' },
              meta: { position: { x: 20, y: 0 } },
            },
            {
              id: 'variable_0',
              type: 'variable',
              data: {
                title: 'Variable',
                assign: [
                  {
                    operator: 'declare',
                    left: 'item_name',
                    right: { type: 'ref', content: ['custom_0_locals', 'item', 'str'] },
                  },
                  {
                    operator: 'declare',
                    left: 'item_index',
                    right: { type: 'ref', content: ['custom_0_locals', 'index'] },
                  },
                ],
              },
              meta: { position: { x: 100, y: 0 } },
            },
            {
              id: 'block_end_0',
              type: 'block-end',
              data: { title: 'End' },
              meta: { position: { x: 360, y: 0 } },
            },
          ],
          edges: [
            { sourceNodeID: 'block_start_0', targetNodeID: 'variable_0' },
            { sourceNodeID: 'variable_0', targetNodeID: 'block_end_0' },
          ],
        },
      ],
      edges: [{ sourceNodeID: 'start_0', targetNodeID: 'custom_0' }],
    }}
    transformRegistry={(props) => ({
      ...props,
      nodeRegistries: [
        ...(props.nodeRegistries || []).filter((r) => r.type !== 'custom'),
        createLoopRegistryWithInfer(),
      ],
    })}
    plugins={(ctx) => [createContainerNodePlugin({})]}
  />
);
