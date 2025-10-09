/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { HistoryContainerModule, OperationContribution } from '@flowgram.ai/history';
import { bindContributions, definePluginCreator } from '@flowgram.ai/core';

import { type FreeHistoryPluginOptions } from './types';
import { HistoryEntityManager } from './history-entity-manager';
import { DragNodesHandler } from './handlers/drag-nodes-handler';
import { ChangeContentHandler } from './handlers/change-content-handler';
import { FreeHistoryRegisters } from './free-history-registers';
import { FreeHistoryManager } from './free-history-manager';
import { FreeHistoryConfig } from './free-history-config';

export const createFreeHistoryPlugin = definePluginCreator<FreeHistoryPluginOptions>({
  onBind: ({ bind }) => {
    bindContributions(bind, FreeHistoryRegisters, [OperationContribution]);
    bind(FreeHistoryConfig).toSelf().inSingletonScope();
    bind(FreeHistoryManager).toSelf().inSingletonScope();
    bind(HistoryEntityManager).toSelf().inSingletonScope();
    bind(DragNodesHandler).toSelf().inSingletonScope();
    bind(ChangeContentHandler).toSelf().inSingletonScope();
  },
  onInit(ctx, opts): void {
    ctx.get<FreeHistoryConfig>(FreeHistoryConfig).init(ctx, opts);

    if (!opts.enable) {
      return;
    }
    ctx.get<FreeHistoryManager>(FreeHistoryManager).onInit(ctx, opts);
  },
  onDispose(ctx) {
    ctx.get<HistoryEntityManager>(HistoryEntityManager).dispose();
  },
  containerModules: [HistoryContainerModule],
});
