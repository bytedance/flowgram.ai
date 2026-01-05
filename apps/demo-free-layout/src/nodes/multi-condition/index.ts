/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */
import { nanoid } from 'nanoid';

import { WorkflowNodeType } from '../constants';
import { FlowNodeRegistry } from '../../typings';
import iconCondition from '../../assets/icon-condition.svg';
import { formMeta } from './form-meta';

let index = 0;
export const MultiConditionNodeRegistry: FlowNodeRegistry = {
  type: WorkflowNodeType.MultiCondition,
  info: {
    icon: iconCondition,
    description:
      'Connect multiple downstream branches. Only the corresponding branch will be executed if the set conditions are met.',
  },
  meta: {
    defaultPorts: [{ type: 'input' }],
    // Condition Outputs use dynamic port
    useDynamicPort: true,
    expandable: false, // disable expanded
    size: {
      width: 360,
      height: 210,
    },
  },
  formMeta,
  onAdd() {
    return {
      id: `multi_condition_${nanoid(5)}`,
      type: 'condition',
      data: {
        title: `multi_condition_${++index}`,
        branch: [
          {
            logic: 'and',
            conditions: [
              {
                key: `condition_${nanoid(5)}`,
                value: {},
              },
            ],
          },
        ],
      },
    };
  },
};
