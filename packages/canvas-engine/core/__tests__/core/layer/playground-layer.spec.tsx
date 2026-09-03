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
    // 娓叉煋 playground
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

    // 鍒囨崲榧犳爣妯″紡
    editorStateConfig?.changeState(
      EditorState.STATE_MOUSE_FRIENDLY_SELECT.id,
      new MouseEvent('mousedown') as any
    );
    expect(editorStateConfig.is(EditorState.STATE_MOUSE_FRIENDLY_SELECT.id)).toBe(true);

    // 榧犳爣妯″紡涓哄皬鎵嬫ā寮?    expect(playgroundLayer.config.cursor).toBe('grab');

    // 鎸変笅 shift 閿?    registry.renderer.node.parentNode!.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Shift',
        code: 'ShiftLeft',
        shiftKey: true,
        bubbles: true,
        cancelable: true,
      })
    );

    // 榧犳爣鍙樻垚绠ご
    expect(playgroundLayer.config.cursor).toBe('');

    // 閲婃斁 shift 閿?    registry.renderer.node.parentNode!.dispatchEvent(
      new KeyboardEvent('keyup', {
        key: 'Shift',
        code: 'ShiftLeft',
        shiftKey: true,
        bubbles: true,
        cancelable: true,
      })
    );

    // 瑙﹀彂婊氬姩浜嬩欢
    registry.renderer.node.dispatchEvent(
      new MouseEvent('wheel', {
        deltaY: 100, // 鍚戜笅婊氬姩 100,
        bubbles: true,
        cancelable: true,
      } as any)
    );

    // 鍒囨崲瑙︽帶鏉?    editorStateConfig?.changeState(EditorState.STATE_SELECT.id, new MouseEvent('mousedown') as any);
    // 鑱氱劍
    registry.onFocusEmitter.fire();
    // 鎸変笅 space bar
    registry.renderer.node.parentNode!.dispatchEvent(
      new KeyboardEvent('keypress', {
        key: ' ',
        code: 'Space',
        bubbles: true,
        cancelable: true,
      })
    );
    expect(editorStateConfig.isPressingSpaceBar).toBe(true);
    expect(editorStateConfig.is(EditorState.STATE_GRAB.id)).toBe(true);

    // Space + "+" must not drop lastShortcutState; releasing "+" should keep grab,
    // and releasing Space should still exit grab (#756).
    registry.renderer.node.parentNode!.dispatchEvent(
      new KeyboardEvent('keypress', {
        key: '+',
        code: 'Equal',
        bubbles: true,
        cancelable: true,
      })
    );
    expect(editorStateConfig.is(EditorState.STATE_GRAB.id)).toBe(true);
    registry.renderer.node.parentNode!.dispatchEvent(
      new KeyboardEvent('keyup', {
        key: '+',
        code: 'Equal',
        bubbles: true,
        cancelable: true,
      })
    );
    expect(editorStateConfig.is(EditorState.STATE_GRAB.id)).toBe(true);
    registry.renderer.node.parentNode!.dispatchEvent(
      new KeyboardEvent('keyup', {
        key: ' ',
        code: 'Space',
        bubbles: true,
        cancelable: true,
      })
    );
    expect(editorStateConfig.isPressingSpaceBar).toBe(false);
    expect(editorStateConfig.is(EditorState.STATE_GRAB.id)).toBe(false);

    // Re-enter grab for the remaining touch/drag checks
    registry.renderer.node.parentNode!.dispatchEvent(
      new KeyboardEvent('keypress', {
        key: ' ',
        code: 'Space',
        bubbles: true,
        cancelable: true,
      })
    );

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

    // 寮€濮嬫嫋鎷?    registry.renderer.node.parentNode!.dispatchEvent(
      new MouseEvent('mousedown', {
        clientX: 100,
        clientY: 100,
      })
    );

    // 娉ㄩ攢 layer
    document.body.removeChild(playgroundLayer.pipelineNode.parentElement!);
    playgroundLayer?.dispose();
  });
});
