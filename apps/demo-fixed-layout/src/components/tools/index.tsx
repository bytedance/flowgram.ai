import { useState, useEffect } from 'react';

import { usePlayground, usePlaygroundTools, useRefresh } from '@flowgram.ai/fixed-layout-editor';
import { Tooltip, IconButton } from '@douyinfe/semi-ui';
import { IconUndo, IconRedo } from '@douyinfe/semi-icons';

import { ZoomSelect } from './zoom-select';
import { SwitchVertical } from './switch-vertical';
import { ToolContainer, ToolSection } from './styles';
import { Save } from './save';
import { Run } from './run';
import { Readonly } from './readonly';
import { MinimapSwitch } from './minimap-switch';
import { Minimap } from './minimap';
import { FitView } from './fit-view';

export const DemoTools = () => {
  const tools = usePlaygroundTools();
  const [minimapVisible, setMinimapVisible] = useState(false);
  const playground = usePlayground();
  const refresh = useRefresh();

  useEffect(() => {
    const disposable = playground.config.onReadonlyOrDisabledChange(() => refresh());
    return () => disposable.dispose();
  }, [playground]);

  return (
    <ToolContainer className="fixed-demo-tools">
      <ToolSection>
        <SwitchVertical />
        <ZoomSelect />
        <FitView fitView={tools.fitView} />
        <MinimapSwitch minimapVisible={minimapVisible} setMinimapVisible={setMinimapVisible} />
        <Minimap visible={minimapVisible} />
        <Readonly />
        <Tooltip content="Undo">
          <IconButton
            theme="borderless"
            icon={<IconUndo />}
            disabled={!tools.canUndo || playground.config.readonly}
            onClick={() => tools.undo()}
          />
        </Tooltip>
        <Tooltip content="Redo">
          <IconButton
            theme="borderless"
            icon={<IconRedo />}
            disabled={!tools.canRedo || playground.config.readonly}
            onClick={() => tools.redo()}
          />
        </Tooltip>
        <Save disabled={playground.config.readonly} />
        <Run />
      </ToolSection>
    </ToolContainer>
  );
};
