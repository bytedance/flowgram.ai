import { type IPoint } from '@flowgram.ai/utils';

import { type FlowNodeEntity } from '../entities';
import { type LABEL_SIDE_TYPE } from './flow-node-register';

// 内置几种线条
export enum FlowTransitionLineEnum {
  STRAIGHT_LINE, // 直线
  DIVERGE_LINE, // 分支线 (一种 ROUNDED_LINE)
  MERGE_LINE, // 汇聚线 (一种 ROUNDED_LINE)
  ROUNDED_LINE, // 自定义圆角转弯线
  CUSTOM_LINE, // 自定义，用于处理循环节点等自定义线条
  DRAGGING_LINE, // 分支拖拽场景渲染的线条
}

export interface Vertex extends IPoint {
  radiusX?: number;
  radiusY?: number;
  // 圆弧出入点位置移动
  moveX?: number;
  moveY?: number;
}

export interface FlowTransitionLine {
  type: FlowTransitionLineEnum;
  from: IPoint;
  to: IPoint;
  vertices?: Vertex[]; // 自定义圆角转弯线需要转弯的拐点
  arrow?: boolean; // 是否有箭头
  renderKey?: string; // 只有自定义线条需要
  isHorizontal?: boolean; // 是否为水平布局
  activated?: boolean; // 是否激活态
  side?: LABEL_SIDE_TYPE; // 区分是否分支前缀线条
  style?: React.CSSProperties;
  lineId?: string;
}

// 内置几种标签
export enum FlowTransitionLabelEnum {
  ADDER_LABEL, // 添加按钮
  TEXT_LABEL, // 文本标签
  COLLAPSE_LABEL, // 复合节点收起的展开标签
  COLLAPSE_ADDER_LABEL, // 复合节点收起 + 加号复合标签
  CUSTOM_LABEL, // 自定义，用于处理循环节点等自定义标签
  BRANCH_DRAGGING_LABEL, // 分支拖拽场景下的 label
}

export interface FlowTransitionLabel {
  type: FlowTransitionLabelEnum;
  // type === 'CUSTOM_LABEL'需要配置的数据
  renderKey?: string;
  offset: IPoint; // 位置
  width?: number; // 宽度
  rotate?: string; // 循环, 如 '60deg'
  props?: Record<string, any>;
  labelId?: string;
}

export interface AdderProps {
  node: FlowNodeEntity; // 实际挂载 label 的节点
  from: FlowNodeEntity; // 边起始点在哪个节点
  to: FlowNodeEntity; // 边终点在哪个节点
  renderTo: FlowNodeEntity; // 实际渲染（renderTree）边终点在哪个节点
  [key: string]: any;
}

export interface CollapseProps {
  node: FlowNodeEntity; // 实际挂载 label 的节点
  collapseNode: FlowNodeEntity; // 要展开收起的节点，默认为 node
  activateNode?: FlowNodeEntity; // 设置获取 label 激活状态的节点
  forceVisible?: boolean; // 是否强制显示
  [key: string]: any;
}

export interface CustomLabelProps {
  node: FlowNodeEntity; // 实际挂载 label 的节点
  [key: string]: any;
}

export interface CollapseAdderProps extends AdderProps, CollapseProps {
  [key: string]: any;
}

export interface DragNodeProps {
  node: FlowNodeEntity; // 实际挂载 label 的节点
}
