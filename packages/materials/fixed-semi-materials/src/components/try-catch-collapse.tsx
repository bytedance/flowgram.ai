import React, { useState } from 'react';

import {
  FlowNodeRenderData,
  FlowNodeTransformData,
  type CustomLabelProps,
  Playground,
  useBaseColor,
  FlowTextKey,
  FlowRendererRegistry,
} from '@flowgram.ai/fixed-layout-editor';
import { IconChevronLeft } from '@douyinfe/semi-icons';

function TryCatchCollapse(props: CustomLabelProps): JSX.Element {
  const { node } = props;
  const { baseColor, baseActivatedColor } = useBaseColor();

  const activateData = node.getData(FlowNodeRenderData)!;
  const transform = node.getData(FlowNodeTransformData)!;

  const [hoverActivated, setHoverActivated] = useState(false);

  if (!transform || !transform.parent) {
    return <></>;
  }

  // hotzone width & height
  const width = transform.inputPoint.x - transform.parent.inputPoint.x;
  const height = 40;

  const scrollToActivateNode = () => {
    setTimeout(() => {
      Playground.getLatest()?.scrollToView({
        position: node?.getData(FlowNodeTransformData)?.inputPoint,
        scrollToCenter: true,
      });
    }, 100);
  };

  const collapseBlock = () => {
    transform.collapsed = true;
    activateData.activated = false;
    scrollToActivateNode();
  };

  const openBlock = () => {
    transform.collapsed = false;
    scrollToActivateNode();
  };

  const handleMouseEnter = () => {
    setHoverActivated(true);
    activateData.activated = true;
  };

  const handleMouseLeave = () => {
    setHoverActivated(false);
    activateData.activated = false;
  };

  const renderCollapse = () => {
    // Expand
    if (transform.collapsed) {
      const childCount = node.allCollapsedChildren.filter(
        (child) => !child.hidden && child !== node
      ).length;

      return (
        <div
          onClick={openBlock}
          style={{
            width: 16,
            height: 16,
            fontSize: 10,
            borderRadius: 9,
            display: 'flex',
            color: '#fff',
            cursor: 'pointer',
            justifyContent: 'center',
            alignItems: 'center',
            background: hoverActivated ? baseActivatedColor : baseColor,
          }}
          aria-hidden="true"
        >
          {childCount}
        </div>
      );
    }

    // Collapse
    if (hoverActivated) {
      return (
        <div
          onClick={collapseBlock}
          style={{
            width: 16,
            height: 16,
            fontSize: 10,
            borderRadius: 9,
            display: 'flex',
            color: '#fff',
            cursor: 'pointer',
            justifyContent: 'center',
            alignItems: 'center',
            background: baseActivatedColor,
          }}
          aria-hidden="true"
        >
          <IconChevronLeft />
        </div>
      );
    }

    return <></>;
  };

  // Collapse
  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        width,
        height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
      }}
    >
      <div
        data-label-id={props.labelId}
        style={{
          fontSize: 12,
          color: hoverActivated ? baseActivatedColor : baseColor,
          textAlign: 'center',
          whiteSpace: 'nowrap',
          backgroundColor: 'var(--g-editor-background)',
          lineHeight: '20px',
        }}
      >
        {node.getService(FlowRendererRegistry).getText(FlowTextKey.CATCH_TEXT)}
      </div>

      {renderCollapse()}
    </div>
  );
}

export default TryCatchCollapse;
