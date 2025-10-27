/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import type { PositionSchema } from '@flowgram.ai/free-layout-editor';

export interface PositionGroup {
  [key: string]: PositionSchema;
}

const originPosition: PositionGroup = {
  '1': {
    x: 0,
    y: 0,
  },
  '2': {
    x: 110,
    y: 0,
  },
  '3': {
    x: 220,
    y: 0,
  },
  '4': {
    x: 330,
    y: 0,
  },
};

export const positionGroups: PositionGroup[] = [
  // 水平线形态
  {
    '1': {
      x: 60,
      y: 0,
    },
    '2': {
      x: 120,
      y: 0,
    },
    '3': {
      x: 180,
      y: 0,
    },
    '4': {
      x: 240,
      y: 0,
    },
  },
  originPosition,
  // 锯齿形态
  {
    '1': {
      x: 0,
      y: -40,
    },
    '2': {
      x: 110,
      y: 40,
    },
    '3': {
      x: 220,
      y: -40,
    },
    '4': {
      x: 330,
      y: 40,
    },
  },
  originPosition,
  // 弧形形态
  {
    '1': {
      x: 50,
      y: -30,
    },
    '2': {
      x: 120,
      y: -50,
    },
    '3': {
      x: 190,
      y: -50,
    },
    '4': {
      x: 260,
      y: -30,
    },
  },
  originPosition,
  // 散布形态
  {
    '1': {
      x: 30,
      y: 60,
    },
    '2': {
      x: 180,
      y: -40,
    },
    '3': {
      x: 80,
      y: -60,
    },
    '4': {
      x: 280,
      y: 40,
    },
  },
  originPosition,
  // 对角上升形态
  {
    '1': {
      x: 0,
      y: 75,
    },
    '2': {
      x: 110,
      y: 25,
    },
    '3': {
      x: 220,
      y: -25,
    },
    '4': {
      x: 330,
      y: -75,
    },
  },
  originPosition,
  // 波浪形态
  {
    '1': {
      x: 0,
      y: 0,
    },
    '2': {
      x: 110,
      y: 80,
    },
    '3': {
      x: 220,
      y: 40,
    },
    '4': {
      x: 330,
      y: -20,
    },
  },
  originPosition,
  // 垂直堆叠形态
  {
    '1': {
      x: 165,
      y: -60,
    },
    '2': {
      x: 165,
      y: -20,
    },
    '3': {
      x: 165,
      y: 20,
    },
    '4': {
      x: 165,
      y: 60,
    },
  },
  originPosition,
  // 钻石形态
  {
    '1': {
      x: 165,
      y: -40,
    },
    '2': {
      x: 110,
      y: 0,
    },
    '3': {
      x: 165,
      y: 40,
    },
    '4': {
      x: 220,
      y: 0,
    },
  },
  originPosition,
];
