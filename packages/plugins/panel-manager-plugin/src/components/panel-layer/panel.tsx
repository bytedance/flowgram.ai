/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { useEffect, startTransition, useState, useRef } from 'react';

import { clsx } from 'clsx';

import { Area } from '../../types';
import { PanelEntity } from '../../services/panel-factory';
import { usePanelManager } from '../../hooks/use-panel-manager';
import { usePanelStore } from '../../hooks/use-panel';
import { PanelContext } from '../../contexts';

const PanelItem: React.FC<{ panel: PanelEntity; hidden?: boolean }> = ({ panel, hidden }) => {
  const panelManager = usePanelManager();
  const ref = useRef<HTMLDivElement>(null);

  const isHorizontal = ['right', 'docked-right'].includes(panel.area);

  const { size, fullscreen } = usePanelStore((s) => ({
    size: s.size,
    fullscreen: s.fullscreen,
  }));

  const [layerSize, setLayerSize] = useState(size);

  const currentSize = fullscreen ? layerSize : size;

  const sizeStyle = isHorizontal ? { width: currentSize } : { height: currentSize };
  const handleResize = (next: number) => {
    let nextSize = next;
    if (typeof panel.factory.maxSize === 'number' && nextSize > panel.factory.maxSize) {
      nextSize = panel.factory.maxSize;
    } else if (typeof panel.factory.minSize === 'number' && nextSize < panel.factory.minSize) {
      nextSize = panel.factory.minSize;
    }
    panel.store.setState({ size: nextSize });
  };

  useEffect(() => {
    /** The set size may be illegal and needs to be updated according to the real element rendered for the first time. */
    if (ref.current && !fullscreen) {
      const { width, height } = ref.current.getBoundingClientRect();
      const realSize = isHorizontal ? width : height;
      panel.store.setState({ size: realSize });
    }
  }, [fullscreen]);

  useEffect(() => {
    if (!fullscreen) {
      return;
    }
    const layer = panel.layer;
    if (!layer) {
      return;
    }
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setLayerSize(isHorizontal ? width : height);
    });
    observer.observe(layer);
    return () => observer.disconnect();
  }, [fullscreen]);

  return (
    <div
      className={clsx(
        'gedit-flow-panel-wrap',
        isHorizontal ? 'panel-horizontal' : 'panel-vertical'
      )}
      key={panel.id}
      ref={ref}
      style={{
        display: hidden ? 'none' : 'block',
        ...panel.factory.style,
        ...panel.config.style,
        ...sizeStyle,
      }}
    >
      {panel.resizable &&
        panelManager.config.resizeBarRender({
          size,
          direction: isHorizontal ? 'vertical' : 'horizontal',
          onResize: handleResize,
        })}
      {panel.renderer}
    </div>
  );
};

export const PanelArea: React.FC<{ area: Area }> = ({ area }) => {
  const panelManager = usePanelManager();
  const [panels, setPanels] = useState(panelManager.getPanels(area));

  useEffect(() => {
    const dispose = panelManager.onPanelsChange(() => {
      startTransition(() => {
        setPanels(panelManager.getPanels(area));
      });
    });
    return () => dispose.dispose();
  }, []);

  return (
    <>
      {panels.map((panel) => (
        <PanelContext.Provider value={panel} key={panel.id}>
          <PanelItem panel={panel} hidden={panel.keepDOM && !panel.visible} />
        </PanelContext.Provider>
      ))}
    </>
  );
};
