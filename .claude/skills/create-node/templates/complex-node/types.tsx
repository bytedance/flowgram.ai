/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { FlowNodeJSON } from '../../typings';

/**
 * 节点数据类型定义
 */
export interface {NODE_NAME}NodeJSON extends FlowNodeJSON {
  data: FlowNodeJSON['data'] & {
    // TODO: 根据实际需求定义自定义字段类型
    customConfig?: {
      key: string;
      // 其他自定义字段
    };
  };
}
