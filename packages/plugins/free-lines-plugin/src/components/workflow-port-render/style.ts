/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import styled from 'styled-components';

export const WorkflowPointStyle = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-top: -10px;
  margin-left: -10px;
  left: 50%;
  top: 50%;
  position: absolute;
  // 非 hover 状态下的样式
  border: none;

  & > .symbol {
    opacity: 0;
  }

  .bg-circle {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    background-color: var(--g-workflow-port-color-background, #fff);
    transform: scale(0.5);
    transition: all 0.2s linear 0s;
  }

  .bg {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: var(--g-workflow-port-color-secondary, #9197f1);
    transform: scale(0.4, 0.4);
    transition: all 0.2s linear 0s;

    &.hasError {
      background: var(--g-workflow-port-color-error, red);
    }

    .symbol {
      position: absolute;
      width: 14px;
      height: 14px;
      opacity: 0;
      pointer-events: none;
      color: var(--g-workflow-port-color-background, #fff);
      transition: opacity 0.2s linear 0s;

      & > svg {
        width: 14px;
        height: 14px;
      }
    }

    .focus-circle {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 8px;
      height: 8px;
      opacity: 0;
      background: var(--g-workflow-port-color-secondary, #9197f1);
      border-radius: 50%;
      transition: opacity 0.2s linear 0s;
    }
  }

  &.linked .bg:not(.hasError) {
    background: var(--g-workflow-port-color-primary, #4d53e8);
  }

  &.hovered .bg:not(.hasError) {
    border: none;
    cursor: crosshair;
    transform: scale(1, 1);
    background: var(--g-workflow-port-color-primary, #4d53e8);

    & > .symbol {
      opacity: 1;
    }
  }

  .cross-hair {
    position: relative;
    left: 2px;
    top: 2px;

    &::after,
    &::before {
      content: '';
      background: var(--g-workflow-port-color-background, #fff);
      border-radius: 2px;
      position: absolute;
    }

    &::after {
      left: 4px;
      width: 2px;
      height: 6px;
      box-shadow: 0 4px var(--g-workflow-port-color-background, #fff);
    }

    &::before {
      top: 4px;
      width: 6px;
      height: 2px;
      box-shadow: 4px 0 var(--g-workflow-port-color-background, #fff);
    }
  }
`;
