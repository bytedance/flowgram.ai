/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { nanoid } from 'nanoid';
import {
  WorkflowNodeEntity,
  PositionSchema,
  FlowNodeTransformData,
} from '@flowgram.ai/free-layout-editor';

import { FlowNodeRegistry } from '../../typings';
import iconLoop from '../../assets/icon-loop.jpg';
import { formMeta } from './form-meta';
import { WorkflowNodeType } from '../constants';

let index = 0;
export const LoopNodeRegistry: FlowNodeRegistry = {
  type: WorkflowNodeType.Loop,
  info: {
    icon: iconLoop,
    description:
      'Used to repeatedly execute a series of tasks by setting the number of iterations and logic.',
  },
  meta: {
    /**
     * Mark as subcanvas
     * 子画布标记
     */
    isContainer: true,
    /**
     * The subcanvas default size setting
     * 子画布默认大小设置
     */
    size: {
      width: 424,
      height: 244,
    },
    autoResizeDisable: true,
    /**
     * The subcanvas padding setting
     * 子画布 padding 设置
     */
    padding: () => ({
      top: 120,
      bottom: 60,
      left: 60,
      right: 60,
    }),
    /**
     * Controls the node selection status within the subcanvas
     * 控制子画布内的节点选中状态
     */
    selectable(node: WorkflowNodeEntity, mousePos?: PositionSchema): boolean {
      if (!mousePos) {
        return true;
      }
      const transform = node.getData<FlowNodeTransformData>(FlowNodeTransformData);
      // 鼠标开始时所在位置不包括当前节点时才可选中
      return !transform.bounds.contains(mousePos.x, mousePos.y);
    },
    // expandable: false, // disable expanded
    wrapperStyle: {
      minWidth: 'unset',
      width: '100%',
    },
  },
  onAdd() {
    return {
      id: `loop_${nanoid(5)}`,
      type: WorkflowNodeType.Loop,
      data: {
        title: `Loop_${++index}`,
      },
      blocks: [
        {
          id: `block_start_${nanoid(5)}`,
          type: WorkflowNodeType.BlockStart,
          meta: {
            position: {
              x: -80,
              y: 120,
            },
          },
          data: {},
        },
        {
          id: `block_end_${nanoid(5)}`,
          type: WorkflowNodeType.BlockEnd,
          meta: {
            position: {
              x: 80,
              y: 120,
            },
          },
          data: {},
        },
      ],
    };
  },
  formMeta,
};
