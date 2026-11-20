/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { localized } from './i18n';
import catalog from '../../../desktop-backend/catalog/atomic-nodes.json';
import type { FieldDefinition } from '../components/node-inspector/definitions';
import type { Data, Schema } from '../components/node-inspector/model';

export interface AtomicNodeDefinition {
  type: string;
  title: string;
  group: string;
  description: string;
  fields: FieldDefinition[];
  defaults: Data;
  inputSchema: Schema;
  outputSchema: Schema;
  outputsByOperation?: Record<string, Schema>;
  aliases?: string[];
}
// This is the exact resource embedded in Rust and returned by /api/nodes and MCP.
export const atomicNodes = localized(catalog as unknown as AtomicNodeDefinition[]);
