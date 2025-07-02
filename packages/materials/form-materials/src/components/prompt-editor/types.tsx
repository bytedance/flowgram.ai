/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { IFlowTemplateValue } from '../../typings';

export interface PropsType {
  value?: IFlowTemplateValue;
  onChange: (value?: IFlowTemplateValue) => void;
  readonly?: boolean;
  hasError?: boolean;
  style?: React.CSSProperties;
}
