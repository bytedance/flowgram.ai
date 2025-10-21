/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { useEffect, useRef, startTransition, useState, useCallback } from 'react';

import { Area } from '../../types';
import { usePanelManager } from '../../hooks/use-panel-manager';
import { floatPanelWrap } from './css';
import { ResizeBar } from '../resize-bar';

export const FloatPanel: React.FC<{ area: Area }> = ({ area }) => {
  const [, setVersion] = useState(0);
  const panelManager = usePanelManager();
  const panel = useRef(panelManager.getPanel(area));
  const render = () =>
    panel.current.elements.map((i) => (
      <div className="float-panel-wrap" key={i.key} style={{ ...floatPanelWrap, ...i.style }}>
        {i.el}
      </div>
    ));
  const node = useRef(render());

  useEffect(() => {
    const dispose = panel.current.onUpdate(() => {
      startTransition(() => {
        node.current = render();
        setVersion((v) => v + 1);
      });
    });
    return () => dispose.dispose();
  }, [panel]);
  const onResize = useCallback((newSize: number) => panel.current!.updateSize(newSize), []);
  const size = panel.current!.currentSize;
  const sizeStyle =
    area === 'right' ? { width: size, height: '100%' } : { height: size, width: '100%' };

  return (
    <div
      className="gedit-flow-panel"
      style={{
        position: 'relative',
        display: panel.current.visible ? 'block' : 'none',
        ...sizeStyle,
      }}
    >
      {panelManager.config.autoResize && panel.current.elements.length > 0 && (
        <ResizeBar size={size} isVertical={area === 'right'} onResize={onResize} />
      )}
      {node.current}
    </div>
  );
};
