/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { isNil } from 'lodash-es';
import {
  ConditionItem,
  ConditionOperator,
  ExecutionContext,
  ExecutionResult,
  FlowGramNode,
  INodeExecutor,
  WorkflowVariableType,
} from '@flowgram.ai/runtime-interface';

import { WorkflowRuntimeType } from '@infra/index';
import { ConditionValue, Conditions } from './type';
import { conditionRules } from './rules';
import { conditionHandlers } from './handlers';

export class ConditionExecutor implements INodeExecutor {
  public readonly type = FlowGramNode.Condition;

  public async execute(context: ExecutionContext): Promise<ExecutionResult> {
    const conditions: Conditions = context.node.data?.conditions;
    if (!conditions) {
      return {
        outputs: {},
      };
    }
    const activatedCondition = conditions.find((item) => {
      const condition = this.parseCondition(item, context);
      return this.checkCondition(condition) && this.handleCondition(condition);
    });
    return {
      outputs: {},
      branch: activatedCondition?.key ?? 'else',
    };
  }

  private parseCondition(item: ConditionItem, context: ExecutionContext): ConditionValue {
    const { key, value } = item;
    const { left, operator, right } = value;
    const parsedLeft = context.runtime.state.parseRef(left);
    const leftValue = parsedLeft?.value ?? null;
    const leftType = parsedLeft?.type ?? WorkflowVariableType.Null;
    const expectedRightType = this.getRuleType({ leftType, operator });
    const parsedRight = Boolean(right)
      ? context.runtime.state.parseFlowValue({
          flowValue: right,
          declareType: expectedRightType,
        })
      : null;
    const rightValue = parsedRight?.value ?? null;
    const rightType = parsedRight?.type ?? WorkflowVariableType.Null;
    return {
      key,
      leftValue,
      leftType,
      rightValue,
      rightType,
      operator,
    };
  }

  private checkCondition(condition: ConditionValue): boolean {
    const rule = conditionRules[condition.leftType];
    if (isNil(rule)) {
      throw new Error(`Condition left type "${condition.leftType}" is not supported`);
    }
    const ruleType = rule[condition.operator];
    if (isNil(ruleType)) {
      throw new Error(
        `Condition left type "${condition.leftType}" has no operator "${condition.operator}"`
      );
    }
    if (!WorkflowRuntimeType.isTypeEqual(ruleType, condition.rightType)) {
      return false;
    }
    return true;
  }

  private handleCondition(condition: ConditionValue): boolean {
    const handler = conditionHandlers[condition.leftType];
    if (!handler) {
      throw new Error(`Condition left type ${condition.leftType} is not supported`);
    }
    const isActive = handler(condition);
    return isActive;
  }

  private getRuleType(params: {
    leftType: WorkflowVariableType;
    operator: ConditionOperator;
  }): WorkflowVariableType {
    const { leftType, operator } = params;
    const rule = conditionRules[leftType];
    if (isNil(rule)) {
      return WorkflowVariableType.Null;
    }
    const ruleType = rule[operator];
    if (isNil(ruleType)) {
      return WorkflowVariableType.Null;
    }
    return ruleType;
  }
}
