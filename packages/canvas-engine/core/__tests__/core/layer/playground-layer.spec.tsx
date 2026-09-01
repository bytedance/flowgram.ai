/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';

import { interfaces } from 'inversify';
import { render } from '@testing-library/react';

import {
  EditorState,
  PlaygroundLayer,
  PlaygroundReactProvider,
  PlaygroundReactRenderer,
} from '../../../src';
import { createPlayground } from '../../../__mocks__/playground-container.mock';

describe('Layer', () => {
  beforeAll(() => {
    const modules: interfaces.ContainerModule[] = [];
    // 渲染 playground
    render(
      <PlaygroundReactProvider containerModules={modules}>
        <PlaygroundReactRenderer>
          <div id="div"></div>
          <textarea id="text"></textarea>
        </PlaygroundReactRenderer>
      </PlaygroundReactProvider>
    );
  });

  test('playground-layer', () => {
    const playground = createPlayground();
    playground.registerLayer(PlaygroundLayer);
    const playgroundLayer = playground.getLayer(PlaygroundLayer)!;
    const registry = playground.pipelineRegistry;
    playgroundLayer.options.preventGlobalGesture = true;
    playground.ready();
    document.body.appendChild(playgroundLayer.pipelineNode.parentElement!);

    // @ts-ignore
    const editorStateConfig = playgroundLayer.editorStateConfig;

    expect(editorStateConfig.is(EditorState.STATE_GRAB.id)).toBe(false);
    registry.renderer.node.parentNode!.dispatchEvent(
      new MouseEvent('mousedown', {
        button: 1,
      })
    );
    expect(editorStateConfig.is(EditorState.STATE_GRAB.id)).toBe(true);

    editorStateConfig?.changeState(EditorState.STATE_SELECT.id, new MouseEvent('mousedown') as any);
    expect(editorStateConfig.is(EditorState.STATE_SELECT.id)).toBe(true);

    // 切换鼠标模式
    editorStateConfig?.changeState(
      EditorState.STATE_MOUSE_FRIENDLY_SELECT.id,
      new MouseEvent('mousedown') as any
    );
    expect(editorStateConfig.is(EditorState.STATE_MOUSE_FRIENDLY_SELECT.id)).toBe(true);

    // 鼠标模式为小手模式
    expect(playgroundLayer.config.cursor).toBe('grab');

    // 按下 shift 键
    registry.renderer.node.parentNode!.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Shift',
        code: 'ShiftLeft',
        shiftKey: true,
        bubbles: true,
        cancelable: true,
      })
    );

    // 鼠标变成箭头
    expect(playgroundLayer.config.cursor).toBe('');

    // 释放 shift 键
    registry.renderer.node.parentNode!.dispatchEvent(
      new KeyboardEvent('keyup', {
        key: 'Shift',
        code: 'ShiftLeft',
        shiftKey: true,
        bubbles: true,
        cancelable: true,
      })
    );

    // 触发滚动事件
    registry.renderer.node.dispatchEvent(
      new MouseEvent('wheel', {
        deltaY: 100, // 向下滚动 100,
        bubbles: true,
        cancelable: true,
      } as any)
    );

    // 切换触控板
    editorStateConfig?.changeState(EditorState.STATE_SELECT.id, new MouseEvent('mousedown') as any);
    // 聚焦
    registry.onFocusEmitter.fire();
    // 按下 space bar
    registry.renderer.node.parentNode!.dispatchEvent(
      new KeyboardEvent('keypress', {
        key: ' ',
        code: 'Space',
        bubbles: true,
        cancelable: true,
      })
    );
    expect(editorStateConfig.isPressingSpaceBar).toBe(true);

    const twoFingerTouchStartEvent = new Event('touchstart', {
      bubbles: true,
      cancelable: true,
    }) as TouchEvent;
    Object.defineProperties(twoFingerTouchStartEvent, {
      touches: {
        value: [
          { clientX: 100, clientY: 100 },
          { clientX: 200, clientY: 200 },
        ],
      },
      changedTouches: { value: [] },
    });

    registry.renderer.node.parentNode!.dispatchEvent(twoFingerTouchStartEvent);

    expect(playgroundLayer.config.config.scrollX).toBe(0);
    expect(playgroundLayer.config.config.scrollY).toBe(0);

    // 开始拖拽
    registry.renderer.node.parentNode!.dispatchEvent(
      new MouseEvent('mousedown', {
        clientX: 100,
        clientY: 100,
      })
    );

    // 注销 layer
    document.body.removeChild(playgroundLayer.pipelineNode.parentElement!);
    playgroundLayer?.dispose();
  });
});
