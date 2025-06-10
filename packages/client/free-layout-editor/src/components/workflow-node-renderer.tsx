import React from 'react';

import clx from 'clsx';
import { WorkflowPortRender } from '@flowgram.ai/free-lines-plugin';
import {
  WorkflowNodeEntity,
  useNodeRender,
  WorkflowPortEntity,
} from '@flowgram.ai/free-layout-core';

export interface WorkflowNodeProps {
  node: WorkflowNodeEntity;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode | null;
  portClassName?: string;
  portStyle?: React.CSSProperties;
  onPortClick?: (
    port: WorkflowPortEntity,
    e: React.MouseEvent<HTMLDivElement> | React.MouseEventHandler<HTMLDivElement>
  ) => void;
  /** 端口激活状态颜色 (linked/hovered) */
  portPrimaryColor?: string;
  /** 端口默认状态颜色 */
  portSecondaryColor?: string;
  /** 端口错误状态颜色 */
  portErrorColor?: string;
  /** 端口背景颜色 */
  portBackgroundColor?: string;
}

export const WorkflowNodeRenderer: React.FC<WorkflowNodeProps> = (props) => {
  const { selected, activated, startDrag, ports, selectNode, nodeRef, onFocus, onBlur } =
    useNodeRender();
  const className = clx(props.className || '', {
    activated,
    selected,
  });
  return (
    <>
      <div
        className={className}
        style={props.style}
        ref={nodeRef}
        draggable
        onDragStart={startDrag}
        onClick={selectNode}
        onFocus={onFocus}
        onBlur={onBlur}
        data-node-selected={String(selected)}
      >
        {props.children}
      </div>
      {ports.map((p) => (
        <WorkflowPortRender
          key={p.id}
          entity={p}
          onClick={props.onPortClick ? (e) => props.onPortClick!(p, e) : undefined}
          className={props.portClassName}
          style={props.portStyle}
          primaryColor={props.portPrimaryColor}
          secondaryColor={props.portSecondaryColor}
          errorColor={props.portErrorColor}
          backgroundColor={props.portBackgroundColor}
        />
      ))}
    </>
  );
};
