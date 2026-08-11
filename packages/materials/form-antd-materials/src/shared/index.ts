/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

export {
  FlowValueUtils,
  type FlowValueType,
  type IFlowConstantRefValue,
  type IFlowConstantValue,
  type IFlowExpressionValue,
  type IFlowRefValue,
  type IFlowTemplateValue,
  type IFlowValue,
  type IFlowValueExtra,
  type IInputsValues,
} from './flow-value';
export {
  formatLegacyRefOnInit,
  formatLegacyRefOnSubmit,
  formatLegacyRefToNewRef,
  formatNewRefToLegacyRef,
  isLegacyFlowRefValueSchema,
  isNewFlowRefValueSchema,
} from './format-legacy-refs';
export { createInjectMaterial } from './inject-material';
export { lazySuspense, withSuspense } from './lazy-suspense';
export {
  polyfillCreateRoot,
  unstableSetCreateRoot,
  type IPolyfillRoot,
} from './polyfill-create-root';
