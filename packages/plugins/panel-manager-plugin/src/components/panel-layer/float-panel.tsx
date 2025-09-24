/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { useEffect, useRef, startTransition, useState } from 'react';

import { Area } from '../../types';
import { usePanelManager } from '../../hooks/use-panel-manager';
import { floatPanelWrap } from './css';

export const FloatPanel: React.FC<{ area: Area }> = ({ area }) => {
  const [, setVersion] = useState(0);
  const panelManager = usePanelManager();
  const panel = useRef(panelManager.getPanel(area));
  const render = () =>
    panel.current.elements.map((i) => (
      <div className="float-panel-wrap" key={i.key} style={floatPanelWrap}>
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

  return <>{node.current}</>;
};
