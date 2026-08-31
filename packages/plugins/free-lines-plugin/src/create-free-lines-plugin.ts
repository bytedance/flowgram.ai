/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { WorkflowLinesManager } from '@flowgram.ai/free-layout-core';
import { definePluginCreator, PluginContext } from '@flowgram.ai/core';

import { FreeLinesPluginOptions } from './type';
import { WorkflowLinesLayer } from './layer';
import {
  WorkflowBezierLineContribution,
  WorkflowFoldLineContribution,
  WorkflowStraightLineContribution,
} from './contributions';

export const createFreeLinesPlugin = definePluginCreator({
  singleton: true,
  onInit: (ctx: PluginContext, opts: FreeLinesPluginOptions) => {
    ctx.playground.registerLayer(WorkflowLinesLayer, {
      ...opts,
    });
    if (opts.defaultLineUIState) {
      ctx.container.get(WorkflowLinesManager).setDefaultUIState(opts.defaultLineUIState);
    }
  },
  onReady: (ctx: PluginContext, opts: FreeLinesPluginOptions) => {
    const linesManager = ctx.container.get(WorkflowLinesManager);
    linesManager
      .registerContribution(WorkflowBezierLineContribution)
      .registerContribution(WorkflowFoldLineContribution)
      .registerContribution(WorkflowStraightLineContribution);

    if (opts.contributions) {
      opts.contributions.forEach((contribution) => {
        linesManager.registerContribution(contribution);
      });
    }

    if (opts.defaultLineType) {
      linesManager.switchLineType(opts.defaultLineType);
    }
  },
});
