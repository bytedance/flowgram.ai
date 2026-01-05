/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

export interface ToolSuccessResult<T = any> {
  success: true;
  data?: T;
  message: string;
}

export interface ToolErrorResult {
  success: false;
  error: string;
  data?: any;
}

export type ToolCallResult<T = any> = ToolSuccessResult<T> | ToolErrorResult;
