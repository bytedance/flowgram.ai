/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.module.less';
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}
declare module '*.md?raw' {
  const content: string;
  export default content;
}

