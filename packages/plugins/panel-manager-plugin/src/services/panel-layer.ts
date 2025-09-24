/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import ReactDOM from 'react-dom';
import { createElement } from 'react';

import { injectable } from 'inversify';
import { domUtils } from '@flowgram.ai/utils';
import { Layer } from '@flowgram.ai/core';

import { PanelLayer as PanelLayerComp } from '../components/panel-layer';

@injectable()
export class PanelLayer extends Layer {
  panelRoot = domUtils.createDivWithClass('gedit-flow-panel-layer');

  layout: JSX.Element | null = null;

  onReady(): void {
    this.playgroundNode.parentNode?.appendChild(this.panelRoot);
    const commonStyle = {
      pointerEvents: 'none',
      width: '100%',
      height: '100%',
      position: 'absolute',
      left: 0,
      top: 0,
      zIndex: 20,
    };
    domUtils.setStyle(this.panelRoot, commonStyle);
  }

  render(): JSX.Element {
    if (!this.layout) {
      this.layout = createElement(PanelLayerComp);
    }
    return ReactDOM.createPortal(this.layout, this.panelRoot);
  }
}
