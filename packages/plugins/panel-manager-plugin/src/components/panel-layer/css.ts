/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

export const globalCSS = `
  .gedit-flow-panel-layer-wrap * {
    box-sizing: border-box;
  }
  .gedit-flow-panel-layer-wrap {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .gedit-flow-panel-layer-wrap-docked {

  }
  .gedit-flow-panel-layer-wrap-floating {
    pointer-events: none;
  }

  .gedit-flow-panel-left-panel-area {
    height: 100%;
    flex-grow: 1;
    flex-shrink: 0;
    min-width: 0;
    display: flex;
    max-width: 100%;
  }
  .gedit-flow-panel-center-area {
    width: 100%;
    min-width: 0;
    flex-grow: 0;
    flex-shrink: 1;
    display: flex;
    flex-direction: column;
  }
  .gedit-flow-panel-right-panel-area {
    height: 100%;
    flex-grow: 1;
    flex-shrink: 0;
    min-width: 0;
    display: flex;
    max-width: 100%;
  }

  .gedit-flow-panel-main-area {
    position: relative;
    overflow: hidden;
    flex-grow: 0;
    flex-shrink: 1;
    width: 100%;
    height: 100%;
  }
  .gedit-flow-panel-bottom-area {
    flex-grow: 1;
    flex-shrink: 0;
    width: 100%;
    min-height: 0;
  }
  .gedit-flow-panel-wrap {
    pointer-events: auto;
    overflow: auto;
    position: relative;
  }
  .gedit-flow-panel-wrap.panel-horizontal {
    height: 100%;
    overflow: hidden;
  }
  .gedit-flow-panel-wrap.panel-vertical {
    width: 100%;
  }
`;
