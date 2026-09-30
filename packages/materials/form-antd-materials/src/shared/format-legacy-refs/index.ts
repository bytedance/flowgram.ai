/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { isObject } from 'lodash-es';

interface LegacyFlowRefValueSchema {
  type: 'ref';
  content: string;
}

interface NewFlowRefValueSchema {
  type: 'ref';
  content: string[];
}

/**
 * In flowgram 0.2.0, for introducing Loop variable functionality,
 * the FlowRefValueSchema type definition is updated:
 *
 * interface LegacyFlowRefValueSchema {
 *  type: 'ref';
 *  content: string;
 * }
 *
 * interface NewFlowRefValueSchema {
 *  type: 'ref';
 *  content: string[];
 * }
 *
 *
 * For making sure backend json will not be changed, we provide format legacy ref utils for updating the formData
 *
 * How to use:
 *
 * 1. Call formatLegacyRefOnSubmit on the formData before submitting
 * 2. Call formatLegacyRefOnInit on the formData after submitting
 *
 * Example:
 * import { formatLegacyRefOnSubmit, formatLegacyRefOnInit } from '@flowgram.ai/form-materials';
 * formMeta: {
 *  formatOnSubmit: (data) => formatLegacyRefOnSubmit(data),
 *  formatOnInit: (data) => formatLegacyRefOnInit(data),
 * }
 */
export function formatLegacyRefOnSubmit(value: any): any {
  if (isObject(value)) {
    if (isLegacyFlowRefValueSchema(value)) {
      return formatLegacyRefToNewRef(value);
    }

    return Object.fromEntries(
      Object.entries(value).map(([key, value]: [string, any]) => [
        key,
        formatLegacyRefOnSubmit(value),
      ])
    );
  }

  if (Array.isArray(value)) {
    return value.map(formatLegacyRefOnSubmit);
  }

  return value;
}

/**
 * In flowgram 0.2.0, for introducing Loop variable functionality,
 * the FlowRefValueSchema type definition is updated:
 *
 * interface LegacyFlowRefValueSchema {
 *  type: 'ref';
 *  content: string;
 * }
 *
 * interface NewFlowRefValueSchema {
 *  type: 'ref';
 *  content: string[];
 * }
 *
 *
 * For making sure backend json will not be changed, we provide format legacy ref utils for updating the formData
 *
 * How to use:
 *
 * 1. Call formatLegacyRefOnSubmit on the formData before submitting
 * 2. Call formatLegacyRefOnInit on the formData after submitting
 *
 * Example:
 * import { formatLegacyRefOnSubmit, formatLegacyRefOnInit } from '@flowgram.ai/form-materials';
 *
 * formMeta: {
 *  formatOnSubmit: (data) => formatLegacyRefOnSubmit(data),
 *  formatOnInit: (data) => formatLegacyRefOnInit(data),
 * }
 */
export function formatLegacyRefOnInit(value: any): any {
  if (isObject(value)) {
    if (isNewFlowRefValueSchema(value)) {
      return formatNewRefToLegacyRef(value);
    }

    return Object.fromEntries(
      Object.entries(value).map(([key, value]: [string, any]) => [
        key,
        formatLegacyRefOnInit(value),
      ])
    );
  }

  if (Array.isArray(value)) {
    return value.map(formatLegacyRefOnInit);
  }

  return value;
}

export function isLegacyFlowRefValueSchema(value: any): value is LegacyFlowRefValueSchema {
  return (
    isObject(value) &&
    Object.keys(value).length === 2 &&
    (value as any).type === 'ref' &&
    typeof (value as any).content === 'string'
  );
}

export function isNewFlowRefValueSchema(value: any): value is NewFlowRefValueSchema {
  return (
    isObject(value) &&
    Object.keys(value).length === 2 &&
    (value as any).type === 'ref' &&
    Array.isArray((value as any).content)
  );
}

export function formatLegacyRefToNewRef(value: LegacyFlowRefValueSchema) {
  const keyPath = value.content.split('.');

  if (keyPath[1] === 'outputs') {
    return {
      type: 'ref',
      content: [`${keyPath[0]}.${keyPath[1]}`, ...(keyPath.length > 2 ? keyPath.slice(2) : [])],
    };
  }

  return {
    type: 'ref',
    content: keyPath,
  };
}

export function formatNewRefToLegacyRef(value: NewFlowRefValueSchema) {
  return {
    type: 'ref',
    content: value.content.join('.'),
  };
}
