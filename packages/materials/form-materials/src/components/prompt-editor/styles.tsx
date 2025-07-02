/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import styled, { css } from 'styled-components';

export const UIContainer = styled.div<{ $hasError?: boolean }>`
  background-color: var(--semi-color-fill-0);
  padding-left: 10px;
  padding-right: 6px;

  ${({ $hasError }) =>
    $hasError &&
    css`
      border: 1px solid var(--semi-color-danger-6);
    `}
`;
