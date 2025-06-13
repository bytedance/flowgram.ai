import React from 'react';

import { type IPoint } from '@flowgram.ai/utils';
import { type WorkflowLineEntity } from '@flowgram.ai/free-layout-core';

/**
 * 箭头渲染器属性接口
 */
export interface ArrowRendererProps {
  /** 用于渐变的唯一ID */
  id: string;
  /** 箭头位置 */
  pos: IPoint;
  /** 是否反转箭头方向 */
  reverseArrow: boolean;
  /** 描边宽度 */
  strokeWidth: number;
  /** 是否为垂直方向 */
  vertical?: boolean;
  /** 是否隐藏箭头 */
  hide?: boolean;
  /** 线条实体，提供更多上下文信息 */
  line: WorkflowLineEntity;
}

/**
 * 箭头渲染器组件类型
 */
export type ArrowRendererComponent = React.ComponentType<ArrowRendererProps>;
