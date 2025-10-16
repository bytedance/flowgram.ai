/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { Subject, filter } from 'rxjs';
import { Disposable } from '@flowgram.ai/utils';

import { type Scope } from '../scope';
import { subsToDisposable } from '../../utils/toDisposable';
import { type GlobalEventActionType } from '../../ast';

type Observer<ActionType extends GlobalEventActionType = GlobalEventActionType> = (
  action: ActionType
) => void;

/**
 * Manages global events within a scope.
 */
export class ScopeEventData {
  event$: Subject<GlobalEventActionType> = new Subject<GlobalEventActionType>();

  /**
   * Dispatches a global event.
   * @param action The event action to dispatch.
   */
  dispatch<ActionType extends GlobalEventActionType = GlobalEventActionType>(action: ActionType) {
    if (this.scope.disposed) {
      return;
    }
    this.event$.next(action);
  }

  /**
   * Subscribes to all global events.
   * @param observer The observer function to call with the event action.
   * @returns A disposable to unsubscribe from the events.
   */
  subscribe<ActionType extends GlobalEventActionType = GlobalEventActionType>(
    observer: Observer<ActionType>
  ): Disposable {
    return subsToDisposable(this.event$.subscribe(observer as Observer));
  }

  /**
   * Subscribes to a specific type of global event.
   * @param type The type of the event to subscribe to.
   * @param observer The observer function to call with the event action.
   * @returns A disposable to unsubscribe from the event.
   */
  on<ActionType extends GlobalEventActionType = GlobalEventActionType>(
    type: ActionType['type'],
    observer: Observer<ActionType>
  ): Disposable {
    return subsToDisposable(
      this.event$.pipe(filter((_action) => _action.type === type)).subscribe(observer as Observer)
    );
  }

  constructor(public readonly scope: Scope) {
    scope.toDispose.pushAll([
      this.subscribe((_action) => {
        scope.variableEngine.fireGlobalEvent(_action);
      }),
    ]);
  }
}
