/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { useMemo } from 'react';

import {
  Field,
  FreeLayoutProps,
  PlaygroundConfigEntity,
  WorkflowLinesManager,
} from '@flowgram.ai/free-layout-editor';

import { updatePosition } from './update-position';
import { NodeRender } from './node-render';
import { nodeRegistries } from './node-registries';
import { NodeColorMap } from './node-color';
import { initialData } from './initial-data';

export const useEditorProps = () =>
  useMemo<FreeLayoutProps>(
    () => ({
      background: false,
      materials: {
        renderDefaultNode: NodeRender,
      },
      isHideArrowLine: (ctx, line) => {
        if (line.from && line.to) {
          return true;
        }
        return false;
      },
      nodeRegistries,
      initialData,
      onInit: (ctx) => {
        const linesManager = ctx.get(WorkflowLinesManager);
        linesManager.getLineColor = (line) => {
          const lineColor = NodeColorMap[line.from?.id ?? line.to?.id ?? ''] ?? '#000';
          return lineColor;
        };
      },
      onAllLayersRendered: (ctx) => {
        ctx.tools.fitView(false);
        // disable playground operations
        const playgroundConfig = ctx.get(PlaygroundConfigEntity);
        playgroundConfig.updateConfig = () => {};
        updatePosition(ctx);
      },
      getNodeDefaultRegistry(type) {
        return {
          type,
          meta: {
            defaultExpanded: true,
          },
          formMeta: {
            /**
             * Render form
             */
            render: () => (
              <>
                <Field<string> name="title">{({ field }) => <div>{field.value}</div>}</Field>
              </>
            ),
          },
        };
      },
    }),
    []
  );
