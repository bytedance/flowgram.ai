/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { inject, optional } from 'inversify';
import { Scope, ScopeChain } from '@flowgram.ai/variable-core';
import { FlowDocument, type FlowVirtualTree } from '@flowgram.ai/document';
import { FlowNodeEntity } from '@flowgram.ai/document';

import { VariableChainConfig } from '../variable-chain-config';
import { FlowNodeScope, FlowNodeScopeTypeEnum, ScopeChainNode } from '../types';
import { ScopeChainTransformService } from '../services/scope-chain-transform-service';
import { GlobalScope } from '../scopes/global-scope';
import { FlowNodeVariableData } from '../flow-node-variable-data';

/**
 * Scope chain implementation based on `FlowVirtualTree`.
 */
export class FixedLayoutScopeChain extends ScopeChain {
  // By adding { id: string }, custom virtual nodes can be flexibly added
  tree: FlowVirtualTree<ScopeChainNode> | undefined;

  @inject(ScopeChainTransformService)
  protected transformService: ScopeChainTransformService;

  constructor(
    @inject(FlowDocument)
    protected flowDocument: FlowDocument,
    @optional()
    @inject(VariableChainConfig)
    protected configs?: VariableChainConfig
  ) {
    super();

    // Bind the tree in flowDocument
    this.bindTree(flowDocument.originTree);

    // When originTree changes, trigger changes in dependencies
    this.toDispose.push(
      // REFRACTOR: onTreeChange trigger timing needs to be refined
      flowDocument.originTree.onTreeChange(() => {
        this.refreshAllChange();
      })
    );
  }

  /**
   * Binds the scope chain to a `FlowVirtualTree`.
   * @param tree The `FlowVirtualTree` to bind to.
   */
  bindTree(tree: FlowVirtualTree<ScopeChainNode>): void {
    this.tree = tree;
  }

  /**
   * Gets the dependency scopes for a given scope.
   * @param scope The scope to get dependencies for.
   * @returns An array of dependency scopes.
   */
  getDeps(scope: FlowNodeScope): FlowNodeScope[] {
    if (!this.tree) {
      return this.transformService.transformDeps([], { scope });
    }

    const node = scope.meta.node;
    if (!node) {
      return this.transformService.transformDeps([], { scope });
    }

    const deps: FlowNodeScope[] = [];

    let curr: ScopeChainNode | undefined = node;

    while (curr) {
      const { parent, pre } = this.tree.getInfo(curr);
      const currData = this.getVariableData(curr);

      // Contains child nodes and is not a private scope

      if (curr === node) {
        // public can depend on private
        if (scope.meta.type === FlowNodeScopeTypeEnum.public && currData?.private) {
          deps.unshift(currData.private);
        }
      } else if (this.hasChildren(curr) && !this.isNodeChildrenPrivate(curr)) {
        // For nodes with child elements, include the child elements in the dependency scope
        deps.unshift(
          ...this.getAllSortedChildScope(curr, {
            ignoreNodeChildrenPrivate: true,
          })
        );
      }

      // The public of the node can be accessed
      if (currData && curr !== node) {
        deps.unshift(currData.public);
      }

      // Process the previous node
      if (pre) {
        curr = pre;
        continue;
      }

      // Process the parent node
      if (parent) {
        let currParent: ScopeChainNode | undefined = parent;
        let currParentPre: ScopeChainNode | undefined = this.tree.getPre(currParent);

        while (currParent) {
          // Both private and public of the parent node can be accessed by child nodes
          const currParentData = this.getVariableData(currParent);
          if (currParentData) {
            deps.unshift(...currParentData.allScopes);
          }

          // If the current parent has a pre node, stop searching upwards
          if (currParentPre) {
            break;
          }

          currParent = this.tree.getParent(currParent);
          currParentPre = currParent ? this.tree.getPre(currParent) : undefined;
        }
        curr = currParentPre;
        continue;
      }

      // If there is no next and no parent, end the loop directly
      curr = undefined;
    }

    // If scope is GlobalScope, add globalScope to deps
    const globalScope = this.variableEngine.getScopeById(GlobalScope.ID);
    if (globalScope) {
      deps.unshift(globalScope);
    }

    return this.transformService.transformDeps(deps, { scope });
  }

  /**
   * Gets the covering scopes for a given scope.
   * @param scope The scope to get covering scopes for.
   * @returns An array of covering scopes.
   */
  getCovers(scope: FlowNodeScope): FlowNodeScope[] {
    if (!this.tree) {
      return this.transformService.transformCovers([], { scope });
    }

    // If scope is GlobalScope, return all scopes except GlobalScope
    if (GlobalScope.is(scope)) {
      const scopes = this.variableEngine
        .getAllScopes({ sort: true })
        .filter((_scope) => !GlobalScope.is(_scope));

      return this.transformService.transformCovers(scopes, { scope });
    }

    const node = scope.meta.node;
    if (!node) {
      return this.transformService.transformCovers([], { scope });
    }

    const covers: FlowNodeScope[] = [];

    // If it is a private scope, only child nodes can access it
    if (scope.meta.type === FlowNodeScopeTypeEnum.private) {
      covers.push(
        ...this.getAllSortedChildScope(node, {
          addNodePrivateScope: true,
        }).filter((_scope) => _scope !== scope)
      );
      return this.transformService.transformCovers(covers, { scope });
    }

    let curr: ScopeChainNode | undefined = node;

    while (curr) {
      const { next, parent } = this.tree.getInfo(curr);
      const currData = this.getVariableData(curr);

      // For nodes with child elements, include the child elements in the covering scope
      if (curr !== node) {
        if (this.hasChildren(curr)) {
          covers.push(
            ...this.getAllSortedChildScope(curr, {
              addNodePrivateScope: true,
            })
          );
        } else if (currData) {
          covers.push(...currData.allScopes);
        }
      }

      // Process the next node
      if (next) {
        curr = next;
        continue;
      }

      if (parent) {
        let currParent: ScopeChainNode | undefined = parent;
        let currParentNext: ScopeChainNode | undefined = this.tree.getNext(currParent);

        while (currParent) {
          // Private scopes cannot be accessed by subsequent nodes
          if (this.isNodeChildrenPrivate(currParent)) {
            return this.transformService.transformCovers(covers, { scope });
          }

          // If the current parent has a next node, stop searching upwards
          if (currParentNext) {
            break;
          }

          currParent = this.tree.getParent(currParent);
          currParentNext = currParent ? this.tree.getNext(currParent) : undefined;
        }
        if (!currParentNext && currParent) {
          break;
        }

        curr = currParentNext;
        continue;
      }

      // next 和 parent 都没有，直接结束循环
      curr = undefined;
    }

    return this.transformService.transformCovers(covers, { scope });
  }

  /**
   * Sorts all scopes in the scope chain.
   * @returns A sorted array of all scopes.
   */
  sortAll(): Scope[] {
    const startNode = this.flowDocument.getAllNodes().find((_node) => _node.isStart);
    if (!startNode) {
      return [];
    }

    const startVariableData = startNode.getData(FlowNodeVariableData);
    const startPublicScope = startVariableData.public;
    const deps = this.getDeps(startPublicScope);

    const covers = this.getCovers(startPublicScope).filter(
      (_scope) => !deps.includes(_scope) && _scope !== startPublicScope
    );

    return [...deps, startPublicScope, ...covers];
  }

  /**
   * Gets the `FlowNodeVariableData` for a given `ScopeChainNode`.
   * @param node The `ScopeChainNode` to get data for.
   * @returns The `FlowNodeVariableData` or `undefined` if not found.
   */
  private getVariableData(node: ScopeChainNode): FlowNodeVariableData | undefined {
    if (node.flowNodeType === 'virtualNode') {
      return;
    }
    // TODO Nodes containing $ do not register variableData
    if (node.id.startsWith('$')) {
      return;
    }

    return (node as FlowNodeEntity).getData(FlowNodeVariableData);
  }

  /**
   * Checks if the children of a node are private.
   * @param node The node to check.
   * @returns `true` if the children are private, `false` otherwise.
   */
  private isNodeChildrenPrivate(node?: ScopeChainNode): boolean {
    if (this.configs?.isNodeChildrenPrivate) {
      return node ? this.configs?.isNodeChildrenPrivate(node) : false;
    }

    const isSystemNode = node?.id.startsWith('$');
    // Fallback: all nodes with children (node id does not start with $) are private scopes
    return !isSystemNode && this.hasChildren(node);
  }

  /**
   * Checks if a node has children.
   * @param node The node to check.
   * @returns `true` if the node has children, `false` otherwise.
   */
  private hasChildren(node?: ScopeChainNode): boolean {
    return Boolean(this.tree && node && this.tree.getChildren(node).length > 0);
  }

  /**
   * Gets all sorted child scopes of a node.
   * @param node The node to get child scopes for.
   * @param options Options for getting child scopes.
   * @returns An array of sorted child scopes.
   */
  private getAllSortedChildScope(
    node: ScopeChainNode,
    {
      ignoreNodeChildrenPrivate,
      addNodePrivateScope,
    }: { ignoreNodeChildrenPrivate?: boolean; addNodePrivateScope?: boolean } = {}
  ): FlowNodeScope[] {
    const scopes: FlowNodeScope[] = [];

    const variableData = this.getVariableData(node);

    if (variableData) {
      scopes.push(variableData.public);
    }

    // For private scopes, the variables of child nodes are not exposed externally
    // (If the parent node has public variables, they are exposed externally)
    if (ignoreNodeChildrenPrivate && this.isNodeChildrenPrivate(node)) {
      return scopes;
    }

    if (addNodePrivateScope && variableData?.private) {
      scopes.push(variableData.private);
    }

    const children = this.tree?.getChildren(node) || [];
    scopes.push(
      ...children
        .map((child) =>
          this.getAllSortedChildScope(child, { ignoreNodeChildrenPrivate, addNodePrivateScope })
        )
        .flat()
    );

    return scopes;
  }
}
