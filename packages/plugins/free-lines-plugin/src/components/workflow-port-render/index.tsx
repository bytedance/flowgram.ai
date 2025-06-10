import ReactDOM from 'react-dom';
import React, { useEffect, useState } from 'react';

import classNames from 'clsx';
import {
  WorkflowHoverService,
  type WorkflowPortEntity,
  usePlaygroundReadonlyState,
  WorkflowLinesManager,
} from '@flowgram.ai/free-layout-core';
import { useService } from '@flowgram.ai/core';

import { PORT_BG_CLASS_NAME } from '../../constants/points';
import { WorkflowPointStyle } from './style';
import CrossHair from './cross-hair';

export interface WorkflowPortRenderProps {
  entity: WorkflowPortEntity;
  className?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  /** 激活状态颜色 (linked/hovered) */
  primaryColor?: string;
  /** 默认状态颜色 */
  secondaryColor?: string;
  /** 错误状态颜色 */
  errorColor?: string;
  /** 背景颜色 */
  backgroundColor?: string;
}

export const WorkflowPortRender: React.FC<WorkflowPortRenderProps> =
  // eslint-disable-next-line react/display-name
  React.memo<WorkflowPortRenderProps>((props: WorkflowPortRenderProps) => {
    const hoverService = useService<WorkflowHoverService>(WorkflowHoverService);
    const linesManager = useService<WorkflowLinesManager>(WorkflowLinesManager);
    const { entity, onClick } = props;
    const { portType, relativePosition, disabled } = entity;
    const [targetElement, setTargetElement] = useState(entity.targetElement);
    const [posX, updatePosX] = useState(relativePosition.x);
    const [posY, updatePosY] = useState(relativePosition.y);
    const [hovered, setHovered] = useState(false);
    const [linked, setLinked] = useState(Boolean(entity?.lines?.length));
    const [hasError, setHasError] = useState(props.entity.hasError);
    const readonly = usePlaygroundReadonlyState();

    useEffect(() => {
      // useEffect 时序问题可能导致 port.hasError 非最新，需重新触发一次 validate
      entity.validate();
      setHasError(entity.hasError);
      const dispose = entity.onEntityChange(() => {
        // 如果有挂载的节点，不需要更新位置信息
        if (entity.targetElement) {
          if (entity.targetElement !== targetElement) {
            setTargetElement(entity.targetElement);
          }
          return;
        }
        const newPos = entity.relativePosition;
        // 加上 round 避免点位抖动
        updatePosX(Math.round(newPos.x));
        updatePosY(Math.round(newPos.y));
      });
      const dispose2 = hoverService.onHoveredChange((id) => {
        setHovered(hoverService.isHovered(entity.id));
      });
      const dispose3 = entity.onErrorChanged(() => {
        setHasError(entity.hasError);
      });
      const dispose4 = linesManager.onAvailableLinesChange(() => {
        setTimeout(() => {
          if (linesManager.disposed || entity.disposed) return;
          setLinked(Boolean(entity.lines.length));
        }, 0);
      });
      return () => {
        dispose.dispose();
        dispose2.dispose();
        dispose3.dispose();
        dispose4.dispose();
      };
    }, [hoverService, entity, targetElement]);

    // 监听变化
    const className = classNames('workflow-port-render', props.className || '', {
      hovered: !readonly && hovered && !disabled && portType !== 'input',
      // 有线条链接的时候深蓝色小圆点
      linked,
    });

    // 构建 CSS 自定义属性用于颜色覆盖
    const colorStyles: Record<string, string> = {};
    if (props.primaryColor) {
      colorStyles['--g-workflow-port-color-primary'] = props.primaryColor;
    }
    if (props.secondaryColor) {
      colorStyles['--g-workflow-port-color-secondary'] = props.secondaryColor;
    }
    if (props.errorColor) {
      colorStyles['--g-workflow-port-color-error'] = props.errorColor;
    }
    if (props.backgroundColor) {
      colorStyles['--g-workflow-port-color-background'] = props.backgroundColor;
    }

    const combinedStyle = targetElement
      ? { ...props.style, ...colorStyles }
      : { ...props.style, ...colorStyles, left: posX, top: posY };

    const content = (
      <WorkflowPointStyle
        className={className}
        style={combinedStyle}
        onClick={onClick}
        data-port-entity-id={entity.id}
        data-port-entity-type={entity.portType}
        data-testid="sdk.workflow.canvas.node.port"
      >
        <div className={classNames('bg-circle', 'workflow-bg-circle')}></div>
        <div
          className={classNames({
            bg: true,
            [PORT_BG_CLASS_NAME]: true,
            'workflow-point-bg': true,
            hasError,
          })}
        >
          <CrossHair />
        </div>
        <div className="focus-circle" />
      </WorkflowPointStyle>
    );
    if (targetElement) {
      return ReactDOM.createPortal(content, targetElement);
    }
    return content;
  });
