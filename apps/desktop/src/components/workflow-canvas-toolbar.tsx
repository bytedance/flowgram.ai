/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { useEffect, useState, type ReactNode } from 'react';

import { LayoutTemplate, Loader2, Minus, Plus, Redo2, Scan, Undo2 } from 'lucide-react';
import { useClientContext } from '@flowgram.ai/free-layout-editor';

import { tx } from '../lib/i18n';
import { Select } from './ui/select';
import { Button } from './ui/button';

export function WorkflowCanvasToolbar({
  leading,
  trailing,
  readOnly = false,
  onHistory,
  onFit,
  onAutoLayout,
  onNavigate,
}: {
  readOnly?: boolean;
  leading?: ReactNode;
  trailing?: ReactNode;
  onHistory: (redo: boolean) => Promise<void>;
  onFit: () => void;
  onAutoLayout: () => Promise<void>;
  onNavigate?: () => void;
}) {
  const { playground, history } = useClientContext();
  const [zoom, setZoom] = useState(() => playground.config.zoom);
  const [historyState, setHistoryState] = useState({
    undo: false,
    redo: false,
  });
  const [busy, setBusy] = useState<'history' | 'layout' | null>(null);
  useEffect(() => {
    const updateHistory = () =>
      setHistoryState({
        undo: history.canUndo() && !playground.config.readonly,
        redo: history.canRedo() && !playground.config.readonly,
      });
    updateHistory();
    setZoom(playground.config.zoom);
    const subscriptions = [
      playground.onZoom(setZoom),
      history.undoRedoService.onChange(updateHistory),
      playground.config.onReadonlyOrDisabledChange(updateHistory),
    ];
    return () => subscriptions.forEach((subscription) => subscription.dispose());
  }, [history, playground]);
  async function changeHistory(redo: boolean) {
    setBusy('history');
    try {
      await onHistory(redo);
    } finally {
      setBusy(null);
    }
  }
  async function autoLayout() {
    if (busy) return;
    setBusy('layout');
    try {
      await onAutoLayout();
    } finally {
      setBusy(null);
    }
  }
  const percentage = `${Math.round(zoom * 100)}%`;
  return (
    <div
      className="workflow-canvas-tools"
      onPointerDownCapture={(event) => {
        if (
          !(event.target as Element).closest(
            '[data-run-follow-control], [data-preserve-run-follow]'
          )
        )
          onNavigate?.();
      }}
      onKeyDownCapture={(event) => {
        if (
          ['Enter', ' '].includes(event.key) &&
          !(event.target as Element).closest(
            '[data-run-follow-control], [data-preserve-run-follow]'
          )
        )
          onNavigate?.();
      }}
      onWheelCapture={onNavigate}
    >
      <div role="group" aria-label={tx('画布工具栏')} className="workflow-canvas-toolbar">
        {!readOnly && (
          <div className="workflow-canvas-tool-group">
            {leading}
            <Button
              variant="ghost"
              size="icon"
              aria-label={tx('撤销更改')}
              title={`${tx('撤销更改')} (⌘/Ctrl Z)`}
              disabled={!!busy || !historyState.undo}
              onClick={() => void changeHistory(false)}
            >
              <Undo2 />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label={tx('重做更改')}
              title={`${tx('重做更改')} (⌘/Ctrl Shift Z)`}
              disabled={!!busy || !historyState.redo}
              onClick={() => void changeHistory(true)}
            >
              <Redo2 />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label={tx('自动布局')}
              title={tx('自动布局')}
              disabled={!!busy}
              onClick={() => void autoLayout()}
            >
              {busy === 'layout' ? (
                <Loader2 className="animate-spin motion-reduce:animate-none" />
              ) : (
                <LayoutTemplate />
              )}
            </Button>
          </div>
        )}
        <div className="workflow-canvas-tool-group workflow-canvas-viewport-tools">
          <Button
            variant="ghost"
            size="icon"
            aria-label={tx('缩小画布')}
            title={tx('缩小画布')}
            disabled={zoom <= playground.config.config.minZoom}
            onClick={() => playground.config.zoomout(false)}
          >
            <Minus />
          </Button>
          <Select
            aria-label={tx('画布缩放')}
            title={tx('画布缩放')}
            variant="ghost"
            className="workflow-canvas-zoom"
            value={String(zoom)}
            options={[...new Set([0.1, 0.25, 0.5, 0.75, 1, 1.5, 2, zoom])]
              .sort((a, b) => a - b)
              .map((value) => ({
                value: String(value),
                label: `${Math.round(value * 100)}%`,
              }))}
            onValueChange={(value) => playground.config.updateZoom(Number(value), false)}
            placeholder={percentage}
          />
          <Button
            variant="ghost"
            size="icon"
            aria-label={tx('放大画布')}
            title={tx('放大画布')}
            disabled={zoom >= playground.config.config.maxZoom}
            onClick={() => playground.config.zoomin(false)}
          >
            <Plus />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label={tx('适应画布')}
            title={tx('适应画布')}
            onClick={onFit}
          >
            <Scan />
          </Button>
        </div>
        {trailing && <div className="workflow-canvas-tool-group">{trailing}</div>}
      </div>
    </div>
  );
}
