/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import styled from 'styled-components';

export const ConditionPort = styled.div`
  position: absolute;
  right: -12px;
  top: 50%;
`;

export const ConditionBranch = styled.div`
  display: flex;
  width: 100%;
  align-items: stretch;
  position: relative;
`;

export const ConditionBranchLogic = styled.div`
  position: relative;
  width: 80px;
  display: flex;
  align-items: center;

  &::before {
    content: '';
    position: absolute;
    width: 50%;
    border: 1px solid var(--semi-color-tertiary-light-active);
    border-radius: 6px 0 0 6px;
    border-right: none;
    left: 50%;
    top: 32px;
    bottom: 32px;
  }
`;
