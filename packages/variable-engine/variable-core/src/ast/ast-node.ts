/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import {
  BehaviorSubject,
  animationFrameScheduler,
  debounceTime,
  distinctUntilChanged,
  map,
  skip,
  tap,
} from 'rxjs';
import { nanoid } from 'nanoid';
import { shallowEqual } from 'fast-equals';
import { Disposable, DisposableCollection } from '@flowgram.ai/utils';

import { subsToDisposable } from '../utils/toDisposable';
import { updateChildNodeHelper } from './utils/helpers';
import { type Scope } from '../scope';
import {
  type ASTNodeJSON,
  type ObserverOrNext,
  type ASTKindType,
  type CreateASTParams,
  type Identifier,
  SubscribeConfig,
  GlobalEventActionType,
  DisposeASTAction,
  UpdateASTAction,
} from './types';
import { ASTNodeFlags } from './flags';

export interface ASTNodeRegistry<JSON extends ASTNodeJSON = any, InjectOpts = any> {
  kind: string;
  new (params: CreateASTParams, injectOpts: InjectOpts): ASTNode<JSON>;
}

/**
 * An `ASTNode` represents a fundamental unit of variable information within the system's Abstract Syntax Tree.
 * It can model various constructs, for example:
 * - **Declarations**: `const a = 1`
 * - **Expressions**: `a.b.c`
 * - **Types**: `number`, `string`, `boolean`
 *
 * Here is some characteristic of ASTNode:
 * - **Tree-like Structure**: ASTNodes can be nested to form a tree, representing complex variable structures.
 * - **Extendable**: New features can be added by extending the base ASTNode class.
 * - **Reactive**: Changes in an ASTNode's value trigger events, enabling reactive programming patterns.
 * - **Serializable**: ASTNodes can be converted to and from a JSON format (ASTNodeJSON) for storage or transmission.
 */
export abstract class ASTNode<JSON extends ASTNodeJSON = any, InjectOpts = any>
  implements Disposable
{
  /**
   * @deprecated
   * Get the injected options for the ASTNode.
   *
   * Please use `@injectToAst(XXXService) declare xxxService: XXXService` to achieve external dependency injection.
   */
  public readonly opts?: InjectOpts;

  /**
   * The unique identifier of the ASTNode, which is **immutable**.
   * - Immutable: Once assigned, the key cannot be changed.
   * - Automatically generated if not specified, and cannot be changed as well.
   * - If a new key needs to be generated, the current ASTNode should be destroyed and a new ASTNode should be generated.
   */
  public readonly key: Identifier;

  /**
   * The kind of the ASTNode.
   */
  static readonly kind: ASTKindType;

  /**
   * Node flags, used to record some flag information.
   */
  public readonly flags: number = ASTNodeFlags.None;

  /**
   * The scope in which the ASTNode is located.
   */
  public readonly scope: Scope;

  /**
   * The parent ASTNode.
   */
  public readonly parent: ASTNode | undefined;

  /**
   * The version number of the ASTNode, which increments by 1 each time `fireChange` is called.
   */
  protected _version: number = 0;

  /**
   * Update lock.
   * - When set to `true`, `fireChange` will not trigger any events.
   * - This is useful when multiple updates are needed, and you want to avoid multiple triggers.
   */
  public changeLocked = false;

  /**
   * Parameters related to batch updates.
   */
  private _batch: {
    batching: boolean;
    hasChangesInBatch: boolean;
  } = {
    batching: false,
    hasChangesInBatch: false,
  };

  /**
   * AST node change Observable events, implemented based on RxJS.
   * - Emits the current ASTNode value upon subscription.
   * - Emits a new value whenever `fireChange` is called.
   */
  public readonly value$: BehaviorSubject<ASTNode> = new BehaviorSubject<ASTNode>(this as ASTNode);

  /**
   * Child ASTNodes.
   */
  protected _children = new Set<ASTNode>();

  /**
   * List of disposal handlers for the ASTNode.
   */
  public readonly toDispose: DisposableCollection = new DisposableCollection(
    Disposable.create(() => {
      // When a child element is deleted, the parent element triggers an update.
      this.parent?.fireChange();
      this.children.forEach((child) => child.dispose());
    })
  );

  /**
   * Callback triggered upon disposal.
   */
  onDispose = this.toDispose.onDispose;

  /**
   * Constructor.
   * @param createParams Necessary parameters for creating an ASTNode.
   * @param injectOptions Dependency injection for various modules.
   */
  constructor({ key, parent, scope }: CreateASTParams, opts?: InjectOpts) {
    this.scope = scope;
    this.parent = parent;
    this.opts = opts;

    // Initialize the key value. If a key is passed in, use it; otherwise, generate a random one using nanoid.
    this.key = key || nanoid();

    // All `fireChange` calls within the subsequent `fromJSON` will be merged into one.
    this.fromJSON = this.withBatchUpdate(this.fromJSON.bind(this));
  }

  /**
   * The type of the ASTNode.
   */
  get kind(): string {
    if (!(this.constructor as any).kind) {
      throw new Error(`ASTNode Registry need a kind: ${this.constructor.name}`);
    }
    return (this.constructor as any).kind;
  }

  /**
   * Parses AST JSON data.
   * @param json AST JSON data.
   */
  abstract fromJSON(json: JSON): void;

  /**
   * Gets all child ASTNodes of the current ASTNode.
   */
  get children(): ASTNode[] {
    return Array.from(this._children);
  }

  /**
   * Serializes the current ASTNode to ASTNodeJSON.
   * @returns
   */
  toJSON(): ASTNodeJSON {
    // Prompt the user to implement the toJSON method for the ASTNode themselves, instead of using the fallback implementation.
    console.warn('[VariableEngine] Please Implement toJSON method for ' + this.kind);

    return {
      kind: this.kind,
    };
  }

  /**
   * Creates a child ASTNode.
   * @param json The AST JSON of the child ASTNode.
   * @returns
   */
  protected createChildNode<ChildNode extends ASTNode = ASTNode>(json: ASTNodeJSON): ChildNode {
    const astRegisters = this.scope.variableEngine.astRegisters;

    const child = astRegisters.createAST(json, {
      parent: this,
      scope: this.scope,
    }) as ChildNode;

    // Add to the _children set.
    this._children.add(child);
    child.toDispose.push(
      Disposable.create(() => {
        this._children.delete(child);
      })
    );

    return child;
  }

  /**
   * Updates a child ASTNode, quickly implementing the consumption logic for child ASTNode updates.
   * @param keyInThis The specified key on the current object.
   */
  protected updateChildNodeByKey(keyInThis: keyof this, nextJSON?: ASTNodeJSON) {
    this.withBatchUpdate(updateChildNodeHelper).call(this, {
      getChildNode: () => this[keyInThis] as ASTNode,
      updateChildNode: (_node) => ((this as any)[keyInThis] = _node),
      removeChildNode: () => ((this as any)[keyInThis] = undefined),
      nextJSON,
    });
  }

  /**
   * Batch updates the ASTNode, merging all `fireChange` calls within the batch function into one.
   * @param updater The batch function.
   * @returns
   */
  protected withBatchUpdate<ParamTypes extends any[], ReturnType>(
    updater: (...args: ParamTypes) => ReturnType
  ) {
    return (...args: ParamTypes) => {
      // Nested batchUpdate can only take effect once.
      if (this._batch.batching) {
        return updater.call(this, ...args);
      }

      this._batch.hasChangesInBatch = false;

      this._batch.batching = true;
      const res = updater.call(this, ...args);
      this._batch.batching = false;

      if (this._batch.hasChangesInBatch) {
        this.fireChange();
      }
      this._batch.hasChangesInBatch = false;

      return res;
    };
  }

  /**
   * Triggers an update for the current node.
   */
  fireChange(): void {
    if (this.changeLocked || this.disposed) {
      return;
    }

    if (this._batch.batching) {
      this._batch.hasChangesInBatch = true;
      return;
    }

    this._version++;
    this.value$.next(this);
    this.dispatchGlobalEvent<UpdateASTAction>({ type: 'UpdateAST' });
    this.parent?.fireChange();
  }

  /**
   * The version value of the ASTNode.
   * - You can used to check whether ASTNode are updated.
   */
  get version(): number {
    return this._version;
  }

  /**
   * The unique hash value of the ASTNode.
   * - It will update when the ASTNode is updated.
   * - You can used to check two ASTNode are equal.
   */
  get hash(): string {
    return `${this._version}${this.kind}${this.key}`;
  }

  /**
   * Listens for changes to the ASTNode.
   * @param observer The listener callback.
   * @param selector Listens for specified data.
   * @returns
   */
  subscribe<Data = this>(
    observer: ObserverOrNext<Data>,
    { selector, debounceAnimation, triggerOnInit }: SubscribeConfig<this, Data> = {}
  ): Disposable {
    return subsToDisposable(
      this.value$
        .pipe(
          map(() => (selector ? selector(this) : (this as any))),
          distinctUntilChanged(
            (a, b) => shallowEqual(a, b),
            (value) => {
              if (value instanceof ASTNode) {
                // If the value is an ASTNode, compare its hash.
                return value.hash;
              }
              return value;
            }
          ),
          // By default, skip the first trigger of BehaviorSubject.
          triggerOnInit ? tap(() => null) : skip(1),
          // All updates within each animationFrame are merged into one.
          debounceAnimation ? debounceTime(0, animationFrameScheduler) : tap(() => null)
        )
        .subscribe(observer)
    );
  }

  /**
   * Dispatches a global event for the current ASTNode.
   * @param event The global event.
   */
  dispatchGlobalEvent<ActionType extends GlobalEventActionType = GlobalEventActionType>(
    event: Omit<ActionType, 'ast'>
  ) {
    this.scope.event.dispatch({
      ...event,
      ast: this,
    });
  }

  /**
   * Disposes the ASTNode.
   */
  dispose(): void {
    // Prevent multiple disposals.
    if (this.toDispose.disposed) {
      return;
    }

    this.toDispose.dispose();
    this.dispatchGlobalEvent<DisposeASTAction>({ type: 'DisposeAST' });

    // When the complete event is emitted, ensure that the current ASTNode is in a disposed state.
    this.value$.complete();
    this.value$.unsubscribe();
  }

  get disposed(): boolean {
    return this.toDispose.disposed;
  }

  /**
   * Extended information of the ASTNode.
   */
  [key: string]: unknown;
}
