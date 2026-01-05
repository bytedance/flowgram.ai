/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import clsx from 'clsx';

import { useGlobalCSS } from '../../hooks/use-global-css';
import { PanelArea } from './panel';
import { globalCSS } from './css';

export type PanelLayerProps = React.PropsWithChildren<{
  /** 模式：悬浮｜挤压 */
  mode?: 'floating' | 'docked';
  className?: string;
  style?: React.CSSProperties;
}>;

export const PanelLayer: React.FC<PanelLayerProps> = ({
  mode = 'floating',
  className,
  style,
  children,
}) => {
  useGlobalCSS({
    cssText: globalCSS,
    id: 'flow-panel-layer-css',
  });

  return (
    <div
      className={clsx(
        'gedit-flow-panel-layer-wrap',
        mode === 'docked' && 'gedit-flow-panel-layer-wrap-docked',
        mode === 'floating' && 'gedit-flow-panel-layer-wrap-floating',
        className
      )}
      style={style}
    >
      <div className="gedit-flow-panel-left-panel-area">
        <PanelArea area={mode === 'docked' ? 'docked-left' : 'left'} />
      </div>
      <div className="gedit-flow-panel-center-area">
        <div className="gedit-flow-panel-main-area">{children}</div>
        <div className="gedit-flow-panel-bottom-area">
          <PanelArea area={mode === 'docked' ? 'docked-bottom' : 'bottom'} />
        </div>
      </div>
      <div className="gedit-flow-panel-right-panel-area">
        <PanelArea area={mode === 'docked' ? 'docked-right' : 'right'} />
      </div>
    </div>
  );
};
