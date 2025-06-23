import { inject, optional } from 'inversify';
import { Scope, ScopeChain } from '@flowgram.ai/variable-core';
import { FlowDocument, type FlowVirtualTree } from '@flowgram.ai/document';
import { FlowNodeEntity } from '@flowgram.ai/document';

import { VariableLayoutConfig } from '../variable-layout-config';
import { FlowNodeScope, FlowNodeScopeTypeEnum, ScopeChainNode } from '../types';
import { ScopeChainTransformService } from '../services/scope-chain-transform-service';
import { GlobalScope } from '../scopes/global-scope';
import { FlowNodeVariableData } from '../flow-node-variable-data';

/**
 * 基于 FlowVirtualTree 的 ScopeOrder 实现
 */
export class FixedLayoutScopeChain extends ScopeChain {
  // 增加  { id: string } 使得可以灵活添加自定义虚拟节点
  tree: FlowVirtualTree<ScopeChainNode> | undefined;

  @inject(ScopeChainTransformService)
  protected transformService: ScopeChainTransformService;

  constructor(
    @inject(FlowDocument)
    protected flowDocument: FlowDocument,
    @optional()
    @inject(VariableLayoutConfig)
    protected configs?: VariableLayoutConfig
  ) {
    super();

    // 绑定 flowDocument 里面的树
    this.bindTree(flowDocument.originTree);

    // originTree 发生变化时，触发依赖关系的变化
    this.toDispose.push(
      // REFRACTOR: onTreeChange 触发时机精细化
      flowDocument.originTree.onTreeChange(() => {
        this.refreshAllChange();
      })
    );
  }

  // 绑定树
  bindTree(tree: FlowVirtualTree<ScopeChainNode>): void {
    this.tree = tree;
  }

  // 获取依赖作用域
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

      // 包含子节点，且不是私有作用域

      if (curr === node) {
        // public 可以依赖 private
        if (scope.meta.type === FlowNodeScopeTypeEnum.public && currData?.private) {
          deps.unshift(currData.private);
        }
      } else if (this.hasChildren(curr) && !this.isNodeChildrenPrivate(curr)) {
        // 有子元素的节点，则将子元素纳入依赖作用域
        deps.unshift(
          ...this.getAllSortedChildScope(curr, {
            ignoreNodeChildrenPrivate: true,
          })
        );
      }

      // 节点的 public 都可以被访问
      if (currData && curr !== node) {
        deps.unshift(currData.public);
      }

      // 上个节点处理
      if (pre) {
        curr = pre;
        continue;
      }

      // 父节点处理
      if (parent) {
        let currParent: ScopeChainNode | undefined = parent;
        let currParentPre: ScopeChainNode | undefined = this.tree.getPre(currParent);

        while (currParent) {
          // 父节点的 private 和 public 都能被子节点访问
          const currParentData = this.getVariableData(currParent);
          if (currParentData) {
            deps.unshift(...currParentData.allScopes);
          }

          // 当前 parent 有 pre 节点，则停止向上查找
          if (currParentPre) {
            break;
          }

          currParent = this.tree.getParent(currParent);
          currParentPre = currParent ? this.tree.getPre(currParent) : undefined;
        }
        curr = currParentPre;
        continue;
      }

      // next 和 parent 都没有，直接结束循环
      curr = undefined;
    }

    // If scope is GlobalScope, add globalScope to deps
    const globalScope = this.variableEngine.getScopeById(GlobalScope.ID);
    if (globalScope) {
      deps.unshift(globalScope);
    }

    return this.transformService.transformDeps(deps, { scope });
  }

  // 获取覆盖作用域
  getCovers(scope: FlowNodeScope): FlowNodeScope[] {
    if (!this.tree) {
      return this.transformService.transformCovers([], { scope });
    }

    // If scope is GlobalScope, return all scopes except GlobalScope
    if (GlobalScope.is(scope)) {
      return this.variableEngine
        .getAllScopes({ sort: true })
        .filter((_scope) => !GlobalScope.is(_scope));
    }

    const node = scope.meta.node;
    if (!node) {
      return this.transformService.transformCovers([], { scope });
    }

    const covers: FlowNodeScope[] = [];

    // 如果是 private 作用域，则只能子节点访问
    if (scope.meta.type === FlowNodeScopeTypeEnum.private) {
      covers.push(
        ...this.getAllSortedChildScope(node, {
          addNodePrivateScope: true,
        })
      );
      return this.transformService.transformCovers(covers, { scope });
    }

    let curr: ScopeChainNode | undefined = node;

    while (curr) {
      const { next, parent } = this.tree.getInfo(curr);
      const currData = this.getVariableData(curr);

      // 有子元素的节点，则将子元素纳入覆盖作用域
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

      // 下个节点处理
      if (next) {
        curr = next;
        continue;
      }

      if (parent) {
        let currParent: ScopeChainNode | undefined = parent;
        let currParentNext: ScopeChainNode | undefined = this.tree.getNext(currParent);

        while (currParent) {
          // 私有作用域不能被后续节点访问
          if (this.isNodeChildrenPrivate(currParent)) {
            return this.transformService.transformCovers(covers, { scope });
          }

          // 当前 parent 有 next 节点，则停止向上查找
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

  // 排序所有作用域
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

  // 获取变量 Data 数据
  private getVariableData(node: ScopeChainNode): FlowNodeVariableData | undefined {
    if (node.flowNodeType === 'virtualNode') {
      return;
    }
    // TODO 包含 $ 的节点不注册 variableData
    if (node.id.startsWith('$')) {
      return;
    }

    return (node as FlowNodeEntity).getData(FlowNodeVariableData);
  }

  // privateScope：子节点不可以被后续节点访问
  private isNodeChildrenPrivate(node?: ScopeChainNode): boolean {
    if (this.configs?.isNodeChildrenPrivate) {
      return node ? this.configs?.isNodeChildrenPrivate(node) : false;
    }

    const isSystemNode = node?.id.startsWith('$');
    // 兜底：有子节点（节点 id 没有 $ 开头）的全部为私有作用域
    return !isSystemNode && this.hasChildren(node);
  }

  private hasChildren(node?: ScopeChainNode): boolean {
    return Boolean(this.tree && node && this.tree.getChildren(node).length > 0);
  }

  // 子节点按照顺序进行排序（含自身）
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

    // 私有作用域，子节点的变量不对外输出
    //（父节点如果存在 public 变量则对外输出）
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
