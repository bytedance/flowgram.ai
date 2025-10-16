/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { inject, optional, postConstruct } from 'inversify';
import { Scope, ScopeChain } from '@flowgram.ai/variable-core';
import { WorkflowNodeLinesData, WorkflowNodeMeta } from '@flowgram.ai/free-layout-core';
import {
  FlowNodeEntity,
  FlowDocument,
  FlowVirtualTree,
  FlowNodeBaseType,
} from '@flowgram.ai/document';
import { EntityManager } from '@flowgram.ai/core';

import { VariableChainConfig } from '../variable-chain-config';
import { FlowNodeScope, FlowNodeScopeTypeEnum } from '../types';
import { ScopeChainTransformService } from '../services/scope-chain-transform-service';
import { GlobalScope } from '../scopes/global-scope';
import { FlowNodeVariableData } from '../flow-node-variable-data';

/**
 * Scope chain implementation for free layout.
 */
export class FreeLayoutScopeChain extends ScopeChain {
  @inject(EntityManager) entityManager: EntityManager;

  @inject(FlowDocument)
  protected flowDocument: FlowDocument;

  @optional()
  @inject(VariableChainConfig)
  protected configs?: VariableChainConfig;

  @inject(ScopeChainTransformService)
  protected transformService: ScopeChainTransformService;

  /**
   * The virtual tree of the flow document.
   */
  get tree(): FlowVirtualTree<FlowNodeEntity> {
    return this.flowDocument.originTree;
  }

  @postConstruct()
  onInit() {
    this.toDispose.pushAll([
      // When the line changes, the scope chain will be updated
      this.entityManager.onEntityDataChange(({ entityDataType }) => {
        if (entityDataType === WorkflowNodeLinesData.type) {
          this.refreshAllChange();
        }
      }),
      // Refresh the scope when the tree changes
      this.tree.onTreeChange(() => {
        this.refreshAllChange();
      }),
    ]);
  }

  /**
   * Gets all input layer nodes for a given node in the same layer, sorted by distance.
   * @param node The node to get input layer nodes for.
   * @returns An array of input layer nodes.
   */
  protected getAllInputLayerNodes(node: FlowNodeEntity): FlowNodeEntity[] {
    const currParent = this.getNodeParent(node);

    const result = new Set<FlowNodeEntity>();

    // add by bfs
    const queue: FlowNodeEntity[] = [node];

    while (queue.length) {
      const curr = queue.shift()!;

      (curr.lines?.inputNodes || []).forEach((inputNode) => {
        if (this.getNodeParent(inputNode) === currParent) {
          if (result.has(inputNode)) {
            return;
          }
          queue.push(inputNode);
          result.add(inputNode);
        }
      });
    }

    return Array.from(result).reverse();
  }

  /**
   * Gets all output layer nodes for a given node in the same layer.
   * @param curr The node to get output layer nodes for.
   * @returns An array of output layer nodes.
   */
  protected getAllOutputLayerNodes(curr: FlowNodeEntity): FlowNodeEntity[] {
    const currParent = this.getNodeParent(curr);

    return (curr.lines?.allOutputNodes || []).filter(
      (_node) => this.getNodeParent(_node) === currParent
    );
  }

  /**
   * Gets the dependency scopes for a given scope.
   * @param scope The scope to get dependencies for.
   * @returns An array of dependency scopes.
   */
  getDeps(scope: FlowNodeScope): FlowNodeScope[] {
    const { node } = scope.meta || {};
    if (!node) {
      return this.transformService.transformDeps([], { scope });
    }

    const deps: FlowNodeScope[] = [];

    // 1. find dep nodes
    let curr: FlowNodeEntity | undefined = node;

    while (curr) {
      // 2. private scope of parent node can be access
      const currVarData: FlowNodeVariableData = curr.getData(FlowNodeVariableData);
      if (currVarData?.private && scope !== currVarData.private) {
        deps.unshift(currVarData.private);
      }

      // 3. all public scopes of inputNodes
      const allInputNodes: FlowNodeEntity[] = this.getAllInputLayerNodes(curr);
      deps.unshift(
        ...allInputNodes
          .map((_node) => [
            _node.getData(FlowNodeVariableData).public,
            // 4. all public children of inputNodes
            ...this.getAllPublicChildScopes(_node),
          ])
          .flat()
          .filter(Boolean)
      );

      curr = this.getNodeParent(curr);
    }

    // If scope is GlobalScope, add globalScope to deps
    const globalScope = this.variableEngine.getScopeById(GlobalScope.ID);
    if (globalScope) {
      deps.unshift(globalScope);
    }

    const uniqDeps = Array.from(new Set(deps));
    return this.transformService.transformDeps(uniqDeps, { scope });
  }

  /**
   * Gets the covering scopes for a given scope.
   * @param scope The scope to get covering scopes for.
   * @returns An array of covering scopes.
   */
  getCovers(scope: FlowNodeScope): FlowNodeScope[] {
    // If scope is GlobalScope, return all scopes except GlobalScope
    if (GlobalScope.is(scope)) {
      const scopes = this.variableEngine
        .getAllScopes({ sort: true })
        .filter((_scope) => !GlobalScope.is(_scope));

      return this.transformService.transformCovers(scopes, { scope });
    }

    const { node } = scope.meta || {};
    if (!node) {
      return this.transformService.transformCovers([], { scope });
    }

    const isPrivate = scope.meta.type === FlowNodeScopeTypeEnum.private;

    // 1. BFS to find all covered nodes
    const queue: FlowNodeEntity[] = [];

    if (isPrivate) {
      // private can only cover its child nodes
      queue.push(...this.getNodeChildren(node));
    } else {
      // Otherwise, cover all nodes of its output lines
      queue.push(...(this.getAllOutputLayerNodes(node) || []));

      // get all parents
      let parent = this.getNodeParent(node);

      while (parent) {
        // if childNodes of parent is private to next nodes, break
        if (this.isNodeChildrenPrivate(parent)) {
          break;
        }

        queue.push(...this.getAllOutputLayerNodes(parent));

        parent = this.getNodeParent(parent);
      }
    }

    // 2. Get the public and private scopes of all covered nodes
    const scopes: FlowNodeScope[] = [];

    while (queue.length) {
      const _node = queue.shift()!;
      const variableData: FlowNodeVariableData = _node.getData(FlowNodeVariableData);
      scopes.push(...variableData.allScopes);
      const children = _node && this.getNodeChildren(_node);

      if (children?.length) {
        queue.push(...children);
      }
    }

    // 3. If the current scope is private, the public scope of the current node can also be covered
    const currentVariableData: FlowNodeVariableData = node.getData(FlowNodeVariableData);
    if (isPrivate && currentVariableData.public) {
      scopes.push(currentVariableData.public);
    }

    const uniqScopes = Array.from(new Set(scopes));

    return this.transformService.transformCovers(uniqScopes, { scope });
  }

  /**
   * Gets the children of a node.
   * @param node The node to get children for.
   * @returns An array of child nodes.
   */
  getNodeChildren(node: FlowNodeEntity): FlowNodeEntity[] {
    if (this.configs?.getNodeChildren) {
      return this.configs.getNodeChildren?.(node);
    }
    const nodeMeta = node.getNodeMeta<WorkflowNodeMeta>();
    const subCanvas = nodeMeta.subCanvas?.(node);

    if (subCanvas) {
      // The sub-canvas itself does not have children
      if (subCanvas.isCanvas) {
        return [];
      } else {
        return subCanvas.canvasNode.collapsedChildren;
      }
    }

    // In some scenarios, the parent-child relationship is expressed through connections, so it needs to be configured at the upper level
    return this.tree.getChildren(node);
  }

  /**
   * Get All children of nodes
   * @param node
   * @returns
   */
  getAllPublicChildScopes(node: FlowNodeEntity): Scope[] {
    if (this.isNodeChildrenPrivate(node)) {
      return [];
    }

    return this.getNodeChildren(node)
      .map((_node) => [
        _node.getData(FlowNodeVariableData).public,
        ...this.getAllPublicChildScopes(_node),
      ])
      .flat();
  }

  /**
   * Gets the parent of a node.
   * @param node The node to get the parent for.
   * @returns The parent node or `undefined` if not found.
   */
  getNodeParent(node: FlowNodeEntity): FlowNodeEntity | undefined {
    // In some scenarios, the parent-child relationship is expressed through connections, so it needs to be configured at the upper level
    if (this.configs?.getNodeParent) {
      return this.configs.getNodeParent(node);
    }
    let parent = node.document.originTree.getParent(node);

    // If currentParent is Group, get the parent of parent
    while (parent?.flowNodeType === FlowNodeBaseType.GROUP) {
      parent = parent.parent;
    }

    if (!parent) {
      return parent;
    }

    const nodeMeta = parent.getNodeMeta<WorkflowNodeMeta>();
    const subCanvas = nodeMeta.subCanvas?.(parent);
    if (subCanvas?.isCanvas) {
      // Get real parent node by subCanvas Configuration
      return subCanvas.parentNode;
    }

    return parent;
  }

  /**
   * Checks if the children of a node are private and cannot be accessed by subsequent nodes.
   * @param node The node to check.
   * @returns `true` if the children are private, `false` otherwise.
   */
  protected isNodeChildrenPrivate(node?: FlowNodeEntity): boolean {
    if (this.configs?.isNodeChildrenPrivate) {
      return node ? this.configs?.isNodeChildrenPrivate(node) : false;
    }

    const isSystemNode = node?.id.startsWith('$');

    // Except system node and group node, everything else is private
    return !isSystemNode && node?.flowNodeType !== FlowNodeBaseType.GROUP;
  }

  /**
   * Sorts all scopes in the scope chain.
   * @returns An empty array, as this method is not implemented.
   */
  sortAll(): Scope[] {
    // Not implemented yet
    console.warn('FreeLayoutScopeChain.sortAll is not implemented');
    return [];
  }
}
