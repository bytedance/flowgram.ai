/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { WorkflowDocumentOptions, WorkflowLinesManager } from '@flowgram.ai/free-layout-core';
import { ConstantKeys, parseLineWidth } from '@flowgram.ai/document';
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

    // constants.LINE_WIDTH 是全局线条粗细；defaultLineUIState 里显式给的值优先
    // 归一成 number：strokeWidth 会原样传给自定义箭头渲染器，'2px' 留在那里会让消费方
    // 的数值几何得到 NaN。
    const constants = ctx.container.get<WorkflowDocumentOptions>(WorkflowDocumentOptions)?.constants;
    const lineWidth = parseLineWidth(constants?.[ConstantKeys.LINE_WIDTH]);
    const defaultLineUIState = {
      ...(lineWidth !== undefined ? { strokeWidth: lineWidth } : {}),
      ...opts.defaultLineUIState,
    };

    if (Object.keys(defaultLineUIState).length > 0) {
      ctx.container.get(WorkflowLinesManager).setDefaultUIState(defaultLineUIState);
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
