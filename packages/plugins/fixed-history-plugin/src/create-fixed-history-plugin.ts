/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { interfaces } from 'inversify';
import { bindContributions } from '@flowgram.ai/utils';
import { HistoryContainerModule, OperationService } from '@flowgram.ai/history';
import { OperationContribution } from '@flowgram.ai/history';
import { FlowOperationBaseService } from '@flowgram.ai/document';
import { FlowDocument } from '@flowgram.ai/document';
import { definePluginCreator } from '@flowgram.ai/core';

import { FixedHistoryPluginOptions } from './types';
import { FixedHistoryService } from './services/fixed-history-service';
import { FixedHistoryOperationService } from './services/fixed-history-operation-service';
import { FixedHistoryFormDataService } from './services';
import { FixedHistoryRegisters } from './fixed-history-registers';
import { FixedHistoryConfig } from './fixed-history-config';

export function registerHistory(bind: interfaces.Bind, rebind: interfaces.Rebind) {
  bindContributions(bind, FixedHistoryRegisters, [OperationContribution]);
  bind(FixedHistoryService).toSelf().inSingletonScope();
  bind(FixedHistoryFormDataService).toSelf().inSingletonScope();
  bind(FixedHistoryConfig).toSelf().inSingletonScope();
  rebind(FlowOperationBaseService).to(FixedHistoryOperationService).inSingletonScope();
}

export const createFixedHistoryPlugin = definePluginCreator<FixedHistoryPluginOptions<any>>({
  onBind: ({ bind, rebind }) => {
    registerHistory(bind, rebind);
  },
  onInit(ctx, opts): void {
    const fixedHistoryService = ctx.get<FixedHistoryService>(FixedHistoryService);
    fixedHistoryService.setSource(ctx);
    const document = ctx.get<FlowDocument>(FlowDocument);

    if (opts?.uri) {
      fixedHistoryService.historyService.context.uri = opts.uri;
    }

    if (opts?.getDocumentJSON) {
      fixedHistoryService.historyService.config.getSnapshot = opts.getDocumentJSON(ctx);
    } else {
      fixedHistoryService.historyService.config.getSnapshot = () => document.toJSON();
    }

    const config = fixedHistoryService.config;
    config.init(ctx, opts);

    if (opts?.operationMetas) {
      fixedHistoryService.registerOperationMetas(opts.operationMetas);
    }

    if (opts.onApply) {
      ctx.get(OperationService).onApply(opts.onApply.bind(null, ctx));
    }
  },
  containerModules: [HistoryContainerModule],
});
