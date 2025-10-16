/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import {
  Observable,
  Subject,
  animationFrameScheduler,
  debounceTime,
  distinctUntilChanged,
  map,
  merge,
  share,
  skip,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import { flatten } from 'lodash-es';
import { shallowEqual } from 'fast-equals';
import { Disposable } from '@flowgram.ai/utils';
import { Emitter } from '@flowgram.ai/utils';

import { IVariableTable } from '../types';
import { type Scope } from '../scope';
import { subsToDisposable } from '../../utils/toDisposable';
import { createMemo } from '../../utils/memo';
import { SubscribeConfig } from '../../ast/types';
import { ASTNode, BaseVariableField, VariableDeclaration } from '../../ast';

/**
 * Manages the available variables within a scope.
 */
export class ScopeAvailableData {
  protected memo = createMemo();

  /**
   * The global variable table from the variable engine.
   */
  get globalVariableTable(): IVariableTable {
    return this.scope.variableEngine.globalVariableTable;
  }

  protected _version: number = 0;

  protected refresh$: Subject<void> = new Subject();

  protected _variables: VariableDeclaration[] = [];

  /**
   * The current version of the available data, which increments on each change.
   */
  get version() {
    return this._version;
  }

  protected bumpVersion() {
    this._version = this._version + 1;
    if (this._version === Number.MAX_SAFE_INTEGER) {
      this._version = 0;
    }
  }

  /**
   * Refreshes the list of available variables.
   * This should be called when the dependencies of the scope change.
   */
  refresh(): void {
    // Do not trigger refresh for a disposed scope.
    if (this.scope.disposed) {
      return;
    }
    this.refresh$.next();
  }

  /**
   * An observable that emits when the list of available variables changes.
   */
  protected variables$: Observable<VariableDeclaration[]> = this.refresh$.pipe(
    // Map to the flattened list of variables from all dependency scopes.
    map(() => flatten(this.depScopes.map((scope) => scope.output.variables || []))),
    // Use shallow equality to check if the variable list has changed.
    distinctUntilChanged<VariableDeclaration[]>(shallowEqual),
    share()
  );

  /**
   * An observable that emits when any variable in the available list changes its value.
   */
  protected anyVariableChange$: Observable<VariableDeclaration> = this.variables$.pipe(
    switchMap((_variables) =>
      merge(
        ..._variables.map((_v) =>
          _v.value$.pipe<any>(
            // Skip the initial value of the BehaviorSubject.
            skip(1)
          )
        )
      )
    ),
    share()
  );

  /**
   * Subscribes to changes in any variable's value in the available list.
   * @param observer A function to be called with the changed variable.
   * @returns A disposable to unsubscribe from the changes.
   */
  onAnyVariableChange(observer: (changedVariable: VariableDeclaration) => void) {
    return subsToDisposable(this.anyVariableChange$.subscribe(observer));
  }

  /**
   * Subscribes to changes in the list of available variables.
   * @param observer A function to be called with the new list of variables.
   * @returns A disposable to unsubscribe from the changes.
   */
  onVariableListChange(observer: (variables: VariableDeclaration[]) => void) {
    return subsToDisposable(this.variables$.subscribe(observer));
  }

  /**
   * @deprecated
   */
  protected onDataChangeEmitter = new Emitter<VariableDeclaration[]>();

  protected onListOrAnyVarChangeEmitter = new Emitter<VariableDeclaration[]>();

  /**
   * @deprecated use available.onListOrAnyVarChange instead
   */
  public onDataChange = this.onDataChangeEmitter.event;

  /**
   * An event that fires when the variable list changes or any variable's value is updated.
   */
  public onListOrAnyVarChange = this.onListOrAnyVarChangeEmitter.event;

  constructor(public readonly scope: Scope) {
    this.scope.toDispose.pushAll([
      this.onVariableListChange((_variables) => {
        this._variables = _variables;
        this.memo.clear();
        this.onDataChangeEmitter.fire(this._variables);
        this.bumpVersion();
        this.onListOrAnyVarChangeEmitter.fire(this._variables);
      }),
      this.onAnyVariableChange(() => {
        this.onDataChangeEmitter.fire(this._variables);
        this.bumpVersion();
        this.onListOrAnyVarChangeEmitter.fire(this._variables);
      }),
      Disposable.create(() => {
        this.refresh$.complete();
        this.refresh$.unsubscribe();
      }),
    ]);
  }

  /**
   * Gets the list of available variables.
   */
  get variables(): VariableDeclaration[] {
    return this._variables;
  }

  /**
   * Gets the keys of the available variables.
   */
  get variableKeys(): string[] {
    return this.memo('availableKeys', () => this._variables.map((_v) => _v.key));
  }

  /**
   * Gets the dependency scopes.
   */
  get depScopes(): Scope[] {
    return this.scope.depScopes;
  }

  /**
   * Retrieves a variable field by its key path from the available variables.
   * @param keyPath The key path to the variable field.
   * @returns The found `BaseVariableField` or `undefined`.
   */
  getByKeyPath(keyPath: string[] = []): BaseVariableField | undefined {
    // Check if the variable is accessible in the current scope.
    if (!this.variableKeys.includes(keyPath[0])) {
      return;
    }
    return this.globalVariableTable.getByKeyPath(keyPath);
  }

  /**
   * Tracks changes to a variable field by its key path.
   * This includes changes to its type, value, or any nested properties.
   * @param keyPath The key path to the variable field to track.
   * @param cb The callback to execute when the variable changes.
   * @param opts Configuration options for the subscription.
   * @returns A disposable to unsubscribe from the tracking.
   */
  trackByKeyPath<Data = BaseVariableField | undefined>(
    keyPath: string[] = [],
    cb: (variable?: Data) => void,
    opts?: SubscribeConfig<BaseVariableField | undefined, Data>
  ): Disposable {
    const { triggerOnInit = true, debounceAnimation, selector } = opts || {};

    return subsToDisposable(
      merge(this.anyVariableChange$, this.variables$)
        .pipe(
          triggerOnInit ? startWith() : tap(() => null),
          map(() => {
            const v = this.getByKeyPath(keyPath);
            return selector ? selector(v) : (v as any);
          }),
          distinctUntilChanged(
            (a, b) => shallowEqual(a, b),
            (value) => {
              if (value instanceof ASTNode) {
                // If the value is an ASTNode, compare its hash for changes.
                return value.hash;
              }
              return value;
            }
          ),
          // Debounce updates to a single emission per animation frame.
          debounceAnimation ? debounceTime(0, animationFrameScheduler) : tap(() => null)
        )
        .subscribe(cb)
    );
  }
}
