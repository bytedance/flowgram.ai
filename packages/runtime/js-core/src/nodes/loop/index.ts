/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { isNil } from 'lodash-es';
import {
  ExecutionContext,
  ExecutionResult,
  FlowGramNode,
  IContext,
  IEngine,
  IFlowRefValue,
  INode,
  INodeExecutor,
  IVariableParseResult,
  LoopNodeSchema,
  WorkflowVariableType,
} from '@flowgram.ai/runtime-interface';

import { WorkflowRuntimeType } from '@infra/index';

type LoopArray = Array<any>;
type LoopBlockVariables = Record<string, IVariableParseResult>;
type LoopOutputs = Record<string, any>;

export interface LoopExecutorInputs {
  loopFor: LoopArray;
}

export class LoopExecutor implements INodeExecutor {
  public readonly type = FlowGramNode.Loop;

  public async execute(context: ExecutionContext): Promise<ExecutionResult> {
    const loopNodeID = context.node.id;

    const engine = context.container.get<IEngine>(IEngine);
    const { value: loopArray, itemsType } = this.getLoopArrayVariable(context);
    const subNodes = context.node.children;
    const blockStartNode = subNodes.find((node) => node.type === FlowGramNode.BlockStart);

    if (!blockStartNode) {
      throw new Error('Loop block start node not found');
    }

    const blockOutputs: LoopOutputs[] = [];

    // not use Array method to make error stack more concise, and better performance
    for (let index = 0; index < loopArray.length; index++) {
      const loopItem = loopArray[index];
      const subContext = context.runtime.sub();
      subContext.variableStore.setVariable({
        nodeID: `${loopNodeID}_locals`,
        key: 'item',
        type: itemsType,
        value: loopItem,
      });
      subContext.variableStore.setVariable({
        nodeID: `${loopNodeID}_locals`,
        key: 'index',
        type: WorkflowVariableType.Number,
        value: index,
      });
      try {
        await engine.executeNode({
          context: subContext,
          node: blockStartNode,
        });
      } catch (e) {
        throw new Error(`Loop block execute error`);
      }
      if (context.runtime.statusCenter.workflow.terminated) {
        return { outputs: {} };
      }
      if (this.isBreak(subContext)) {
        break;
      }
      if (this.isContinue(subContext)) {
        continue;
      }
      const blockOutput = this.getBlockOutput(context, subContext);
      blockOutputs.push(blockOutput);
    }

    this.setLoopNodeOutputs(context, blockOutputs);
    const outputs = this.combineBlockOutputs(context, blockOutputs);

    return {
      outputs,
    };
  }

  private getLoopArrayVariable(
    executionContext: ExecutionContext
  ): IVariableParseResult<LoopArray> & {
    itemsType: WorkflowVariableType;
  } {
    const loopNodeData = executionContext.node.data as LoopNodeSchema['data'];
    const LoopArrayVariable = executionContext.runtime.state.parseRef<LoopArray>(
      loopNodeData.loopFor
    );
    this.checkLoopArray(LoopArrayVariable);
    return LoopArrayVariable as IVariableParseResult<LoopArray> & {
      itemsType: WorkflowVariableType;
    };
  }

  private checkLoopArray(LoopArrayVariable: IVariableParseResult<LoopArray> | null): void {
    const loopArray = LoopArrayVariable?.value;
    if (!loopArray || isNil(loopArray) || !Array.isArray(loopArray)) {
      throw new Error('Loop "loopFor" is required');
    }
    const loopArrayType = LoopArrayVariable.type;
    if (loopArrayType !== WorkflowVariableType.Array) {
      throw new Error('Loop "loopFor" must be an array');
    }
    const loopArrayItemType = LoopArrayVariable.itemsType;
    if (isNil(loopArrayItemType)) {
      throw new Error('Loop "loopFor.items" must be array items');
    }
  }

  private getBlockOutput(
    executionContext: ExecutionContext,
    subContext: IContext
  ): LoopBlockVariables {
    const loopOutputsDeclare = this.getLoopOutputsDeclare(executionContext);
    const blockOutput = Object.entries(loopOutputsDeclare).reduce(
      (acc, [outputName, outputRef]) => {
        const outputVariable = subContext.state.parseRef(outputRef);
        if (!outputVariable) {
          return acc;
        }
        return {
          ...acc,
          [outputName]: outputVariable,
        };
      },
      {} as LoopBlockVariables
    );
    return blockOutput;
  }

  private setLoopNodeOutputs(
    executionContext: ExecutionContext,
    blockOutputs: LoopBlockVariables[]
  ) {
    const loopNode = executionContext.node as INode<LoopNodeSchema['data']>;
    const loopOutputsDeclare = this.getLoopOutputsDeclare(executionContext);
    const loopOutputNames = Object.keys(loopOutputsDeclare);
    loopOutputNames.forEach((outputName) => {
      const outputVariables = blockOutputs.map((blockOutput) => blockOutput[outputName]);
      const outputTypes = outputVariables.map((fieldVariable) => fieldVariable.type);
      const itemsType = WorkflowRuntimeType.getArrayItemsType(outputTypes);
      const value = outputVariables.map((fieldVariable) => fieldVariable.value);
      executionContext.runtime.variableStore.setVariable({
        nodeID: loopNode.id,
        key: outputName,
        type: WorkflowVariableType.Array,
        itemsType,
        value,
      });
    });
  }

  private combineBlockOutputs(
    executionContext: ExecutionContext,
    blockOutputs: LoopBlockVariables[]
  ): LoopOutputs {
    const loopOutputsDeclare = this.getLoopOutputsDeclare(executionContext);
    const loopOutputNames = Object.keys(loopOutputsDeclare);
    const loopOutput = loopOutputNames.reduce(
      (outputs, outputName) => ({
        ...outputs,
        [outputName]: blockOutputs.map((blockOutput) => blockOutput[outputName].value),
      }),
      {} as LoopOutputs
    );
    return loopOutput;
  }

  private getLoopOutputsDeclare(executionContext: ExecutionContext): Record<string, IFlowRefValue> {
    const loopNodeData = executionContext.node.data as LoopNodeSchema['data'];
    const loopOutputsDeclare = loopNodeData.loopOutputs ?? {};
    return loopOutputsDeclare;
  }

  private isBreak(subContext: IContext): boolean {
    return subContext.cache.get('loop-break') === true;
  }

  private isContinue(subContext: IContext): boolean {
    return subContext.cache.get('loop-continue') === true;
  }
}
