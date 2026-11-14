/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import {
  EngineServices,
  IEngine,
  IExecutor,
  INode,
  WorkflowOutputs,
  IContext,
  InvokeParams,
  ITask,
  FlowGramNode,
  IValidation,
} from '@flowgram.ai/runtime-interface';

import { compareNodeGroups } from '@infra/utils';
import { WorkflowRuntimeTask } from '../task';
import { WorkflowRuntimeContext } from '../context';
import { WorkflowRuntimeContainer } from '../container';

export class WorkflowRuntimeEngine implements IEngine {
  private readonly validation: IValidation;

  private readonly executor: IExecutor;

  constructor(service: EngineServices) {
    this.validation = service.Validation;
    this.executor = service.Executor;
  }

  public invoke(params: InvokeParams): ITask {
    const { valid, errors } = this.validation.invoke(params);
    const context = WorkflowRuntimeContext.create();
    context.init(valid ? params : { schema: { nodes: [], edges: [] }, inputs: params.inputs });
    if (!valid) {
      errors?.forEach((message) => context.messageCenter.error({ message }));
      context.statusCenter.workflow.fail();
      return WorkflowRuntimeTask.create({
        processing: Promise.resolve({}),
        context,
      });
    }
    const processing = this.process(context);
    processing.then(() => {
      context.dispose();
    });
    return WorkflowRuntimeTask.create({
      processing,
      context,
    });
  }

  public async executeNode(params: { context: IContext; node: INode }) {
    const { node, context } = params;
    if (!this.canExecuteNode({ node, context })) {
      return;
    }
    context.statusCenter.nodeStatus(node.id).process();
    const snapshot = context.snapshotCenter.create({
      nodeID: node.id,
      data: node.data,
    });
    let nextNodes: INode[] = [];
    try {
      const inputs = context.state.getNodeInputs(node);
      snapshot.update({
        inputs,
      });
      const result = await this.executor.execute({
        node,
        inputs,
        runtime: context,
        container: WorkflowRuntimeContainer.instance,
        snapshot,
      });
      if (context.statusCenter.workflow.terminated) {
        return;
      }
      const { outputs, branch } = result;
      snapshot.update({ outputs, branch });
      context.state.setNodeOutputs({ node, outputs });
      context.state.addExecutedNode(node);
      context.statusCenter.nodeStatus(node.id).success();
      nextNodes = this.getNextNodes({ node, branch, context });
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred';
      snapshot.update({ error: errorMessage });
      context.messageCenter.error({
        nodeID: node.id,
        message: errorMessage,
      });
      context.statusCenter.nodeStatus(node.id).fail();
      console.error(e);
      throw e;
    }
    await this.executeNext({ node, nextNodes, context });
  }

  private async process(context: IContext): Promise<WorkflowOutputs> {
    const startNode = context.document.start;
    context.statusCenter.workflow.process();
    try {
      await this.executeNode({ node: startNode, context });
      const outputs = context.ioCenter.outputs;
      context.statusCenter.workflow.success();
      return outputs;
    } catch (e) {
      context.statusCenter.workflow.fail();
      return {};
    }
  }

  private canExecuteNode(params: { context: IContext; node: INode }) {
    const { node, context } = params;
    const prevNodes = node.prev;
    if (prevNodes.length === 0) {
      return true;
    }
    return prevNodes.every((prevNode) => context.state.isExecutedNode(prevNode));
  }

  private getNextNodes(params: { context: IContext; node: INode; branch?: string }) {
    const { node, branch, context } = params;
    const allNextNodes = node.next;
    if (!branch) {
      return allNextNodes;
    }
    const targetPort = node.ports.outputs.find((port) => port.id === branch);
    if (!targetPort) {
      throw new Error(`Branch "${branch}" not found`);
    }
    const nextNodeIDs: Set<string> = new Set(targetPort.edges.map((edge) => edge.to.id));
    const nextNodes = allNextNodes.filter((nextNode) => nextNodeIDs.has(nextNode.id));
    const skipNodes = allNextNodes.filter((nextNode) => !nextNodeIDs.has(nextNode.id));
    const nextGroups = nextNodes.map((nextNode) => [nextNode, ...nextNode.successors]);
    const skipGroups = skipNodes.map((skipNode) => [skipNode, ...skipNode.successors]);
    const { uniqueToB: skippedNodes } = compareNodeGroups(nextGroups, skipGroups);
    skippedNodes.forEach((node) => {
      context.state.addExecutedNode(node);
    });
    return nextNodes;
  }

  private async executeNext(params: { context: IContext; node: INode; nextNodes: INode[] }) {
    const { context, node, nextNodes } = params;
    const terminatingNodeTypes = [
      FlowGramNode.End,
      FlowGramNode.BlockEnd,
      FlowGramNode.Break,
      FlowGramNode.Continue,
    ];
    if (terminatingNodeTypes.includes(node.type)) {
      return;
    }
    if (nextNodes.length === 0) {
      throw new Error(`Node "${node.id}" has no next nodes`); // inside loop node may have no next nodes
    }
    await Promise.all(
      nextNodes.map((nextNode) =>
        this.executeNode({
          node: nextNode,
          context,
        })
      )
    );
  }
}
