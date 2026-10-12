/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';

export type MaterialIcon = string | React.ReactElement | { src?: string } | null | undefined;

export const renderMaterialIcon = (icon: MaterialIcon): React.ReactNode => {
  if (React.isValidElement(icon)) {
    return icon;
  }

  const objectSource =
    icon && typeof icon === 'object' ? (icon as { src?: unknown }).src : undefined;
  const src =
    typeof icon === 'string' ? icon : typeof objectSource === 'string' ? objectSource : undefined;

  return src ? <img alt="" style={{ marginRight: 8 }} width={12} height={12} src={src} /> : null;
};
