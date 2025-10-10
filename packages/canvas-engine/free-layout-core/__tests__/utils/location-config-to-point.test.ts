/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { expect } from 'vitest';
import { Rectangle } from '@flowgram.ai/utils';

import { locationConfigToPoint } from '../../src/utils/location-config-to-point';

test('locationConfigToPoint', () => {
  const bounds = new Rectangle(10, 10, 100, 100);
  expect(locationConfigToPoint(bounds, { left: 0, top: 0 })).toEqual(bounds.leftTop);
  expect(locationConfigToPoint(bounds, { left: 0, bottom: 0 })).toEqual(bounds.leftBottom);
  expect(locationConfigToPoint(bounds, { right: 0, bottom: 0 })).toEqual(bounds.rightBottom);
  expect(locationConfigToPoint(bounds, { right: 0, top: 0 })).toEqual(bounds.rightTop);
  expect(locationConfigToPoint(bounds, { left: 0, top: '0%' })).toEqual(bounds.leftTop);
  expect(locationConfigToPoint(bounds, { right: 0, bottom: '0%' })).toEqual(bounds.rightBottom);
  expect(locationConfigToPoint(bounds, { left: 0, top: '50%' })).toEqual(bounds.leftCenter);
  expect(locationConfigToPoint(bounds, { right: 0, bottom: '50%' })).toEqual(bounds.rightCenter);
  expect(locationConfigToPoint(bounds, { left: '50%', bottom: 0 })).toEqual(bounds.bottomCenter);
  expect(locationConfigToPoint(bounds, { right: '50%', top: 0 })).toEqual(bounds.topCenter);
  expect(locationConfigToPoint(bounds, { left: '50%', top: '50%' })).toEqual(bounds.center);
  expect(locationConfigToPoint(bounds, { right: '50%', bottom: '50%' })).toEqual(bounds.center);
  expect(locationConfigToPoint(bounds, { left: 11, top: 11 })).toEqual({ x: 21, y: 21 });
  expect(locationConfigToPoint(bounds, { right: 11, bottom: 11 })).toEqual({
    x: 10 + 100 - 11,
    y: 10 + 100 - 11,
  });
  // with offset
  expect(locationConfigToPoint(bounds, { left: 11, top: 11 }, { x: 100, y: 100 })).toEqual({
    x: 121,
    y: 121,
  });
});
