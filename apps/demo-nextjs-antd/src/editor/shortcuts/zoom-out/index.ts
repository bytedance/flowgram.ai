/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import {
  FreeLayoutPluginContext,
  PlaygroundConfigEntity,
  ShortcutsHandler,
} from '@flowgram.ai/free-layout-editor';

import { FlowCommandId } from '../constants';

export class ZoomOutShortcut implements ShortcutsHandler {
  public commandId = FlowCommandId.ZOOM_OUT;

  public shortcuts = ['meta -', 'ctrl -'];

  private playgroundConfig: PlaygroundConfigEntity;

  constructor(context: FreeLayoutPluginContext) {
    this.playgroundConfig = context.get(PlaygroundConfigEntity);
    this.execute = this.execute.bind(this);
  }

  public async execute(): Promise<void> {
    // Soft floor near minZoom (0.25); the previous `zoom > 1.9` guard was
    // copied from zoom-in and blocked zoom-out whenever the canvas was zoomed in.
    if (this.playgroundConfig.zoom <= 0.3) {
      return;
    }
    this.playgroundConfig.zoomout();
  }
}