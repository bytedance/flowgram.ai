/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { useDark } from '@rspress/core/runtime';

export const FlowGramLogoMask = () => {
  const isDark = useDark();
  return (
    <div
      className="flowgram-logo-mask"
      style={{
        backgroundImage: isDark
          ? 'conic-gradient(from 180deg at 50% 50%, #0095ff 0deg, 180deg, #42d392 1turn)'
          : 'conic-gradient(from 180deg at 50% 50%, #3473fb 0deg, 180deg, #46cbc2 1turn)',
      }}
    />
  );
};
