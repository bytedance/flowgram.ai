/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import {
  type Observable,
  distinctUntilChanged,
  map,
  switchMap,
  combineLatest,
  of,
  Subject,
  share,
} from 'rxjs';
import { shallowEqual } from 'fast-equals';

import { getParentFields } from '../utils/variable-field';
import { ASTNodeJSON, type CreateASTParams } from '../types';
import { type BaseType } from '../type';
import { ASTNodeFlags } from '../flags';
import { type BaseVariableField } from '../declaration';
import { ASTNode } from '../ast-node';
import { subsToDisposable } from '../../utils/toDisposable';
import { IVariableTable } from '../../scope/types';

type ExpressionRefs = (BaseVariableField | undefined)[];

/**
 * Base class for all expressions.
 *
 * All other expressions should extend this class.
 */
export abstract class BaseExpression<
  JSON extends ASTNodeJSON = any,
  InjectOpts = any
> extends ASTNode<JSON, InjectOpts> {
  public flags: ASTNodeFlags = ASTNodeFlags.Expression;

  /**
   * Get the global variable table, which is used to access referenced variables.
   */
  get globalVariableTable(): IVariableTable {
    return this.scope.variableEngine.globalVariableTable;
  }

  /**
   * Parent variable fields, sorted from closest to farthest.
   */
  get parentFields(): BaseVariableField[] {
    return getParentFields(this);
  }

  /**
   * Get the variable fields referenced by the expression.
   *
   * This method should be implemented by subclasses.
   * @returns An array of referenced variable fields.
   */
  abstract getRefFields(): ExpressionRefs;

  /**
   * The return type of the expression.
   */
  abstract returnType: BaseType | undefined;

  /**
   * The variable fields referenced by the expression.
   */
  protected _refs: ExpressionRefs = [];

  /**
   * The variable fields referenced by the expression.
   */
  get refs(): ExpressionRefs {
    return this._refs;
  }

  protected refreshRefs$: Subject<void> = new Subject();

  /**
   * Refresh the variable references.
   */
  refreshRefs() {
    this.refreshRefs$.next();
  }

  /**
   * An observable that emits the referenced variable fields when they change.
   */
  refs$: Observable<ExpressionRefs> = this.refreshRefs$.pipe(
    map(() => this.getRefFields()),
    distinctUntilChanged<ExpressionRefs>(shallowEqual),
    switchMap((refs) =>
      !refs?.length
        ? of([])
        : combineLatest(
            refs.map((ref) =>
              ref
                ? (ref.value$ as unknown as Observable<BaseVariableField | undefined>)
                : of(undefined)
            )
          )
    ),
    share()
  );

  constructor(params: CreateASTParams, opts?: InjectOpts) {
    super(params, opts);

    this.toDispose.push(
      subsToDisposable(
        this.refs$.subscribe((_refs: ExpressionRefs) => {
          this._refs = _refs;
          this.fireChange();
        })
      )
    );
  }
}
