/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { FlowGramNode, WorkflowSchema } from '@flowgram.ai/runtime-interface';

/**
 * Validates the basic format and structure of a workflow schema
 * Ensures all required fields are present and have correct types
 */
export const schemaFormat = (schema: WorkflowSchema): void => {
  // The runtime stores all nodes, including its implicit root, by ID.
  validateSchemaFormat(schema, new Set<string>([FlowGramNode.Root]));
};

const validateSchemaFormat = (schema: WorkflowSchema, nodeIDs: Set<string>): void => {
  // Check if schema is a valid object
  if (!schema || typeof schema !== 'object') {
    throw new Error('Workflow schema must be a valid object');
  }

  // Check if nodes array exists and is valid
  if (!Array.isArray(schema.nodes)) {
    throw new Error('Workflow schema must have a valid nodes array');
  }

  // Check if edges array exists and is valid
  if (!Array.isArray(schema.edges)) {
    throw new Error('Workflow schema must have a valid edges array');
  }

  // Validate each node structure
  schema.nodes.forEach((node, index) => {
    validateNodeFormat(node, `nodes[${index}]`);
    if (nodeIDs.has(node.id)) {
      throw new Error(`Workflow schema contains duplicate node ID "${node.id}"`);
    }
    nodeIDs.add(node.id);
  });

  // Validate each edge structure
  schema.edges.forEach((edge, index) => {
    validateEdgeFormat(edge, `edges[${index}]`);
  });

  // Recursively validate nested blocks
  schema.nodes.forEach((node, nodeIndex) => {
    if (node.blocks) {
      if (!Array.isArray(node.blocks)) {
        throw new Error(`Node nodes[${nodeIndex}].blocks must be an array`);
      }

      const nestedSchema = {
        nodes: node.blocks,
        edges: node.edges || [],
      };

      validateSchemaFormat(nestedSchema, nodeIDs);
    }
  });
};

/**
 * Validates the format of a single node
 */
const validateNodeFormat = (node: any, path: string): void => {
  if (!node || typeof node !== 'object') {
    throw new Error(`${path} must be a valid object`);
  }

  // Check required fields
  if (typeof node.id !== 'string' || !node.id.trim()) {
    throw new Error(`${path}.id must be a non-empty string`);
  }

  if (typeof node.type !== 'string' || !node.type.trim()) {
    throw new Error(`${path}.type must be a non-empty string`);
  }

  if (!node.meta || typeof node.meta !== 'object') {
    throw new Error(`${path}.meta must be a valid object`);
  }

  if (!node.data || typeof node.data !== 'object') {
    throw new Error(`${path}.data must be a valid object`);
  }

  // Validate optional fields if present
  if (node.blocks !== undefined && !Array.isArray(node.blocks)) {
    throw new Error(`${path}.blocks must be an array if present`);
  }

  if (node.edges !== undefined && !Array.isArray(node.edges)) {
    throw new Error(`${path}.edges must be an array if present`);
  }

  // Validate data.inputs and data.outputs if present
  if (
    node.data.inputs !== undefined &&
    (typeof node.data.inputs !== 'object' || node.data.inputs === null)
  ) {
    throw new Error(`${path}.data.inputs must be a valid object if present`);
  }

  if (
    node.data.outputs !== undefined &&
    (typeof node.data.outputs !== 'object' || node.data.outputs === null)
  ) {
    throw new Error(`${path}.data.outputs must be a valid object if present`);
  }

  if (
    node.data.inputsValues !== undefined &&
    (typeof node.data.inputsValues !== 'object' || node.data.inputsValues === null)
  ) {
    throw new Error(`${path}.data.inputsValues must be a valid object if present`);
  }

  if (node.data.title !== undefined && typeof node.data.title !== 'string') {
    throw new Error(`${path}.data.title must be a string if present`);
  }
};

/**
 * Validates the format of a single edge
 */
const validateEdgeFormat = (edge: any, path: string): void => {
  if (!edge || typeof edge !== 'object') {
    throw new Error(`${path} must be a valid object`);
  }

  // Check required fields
  if (typeof edge.sourceNodeID !== 'string' || !edge.sourceNodeID.trim()) {
    throw new Error(`${path}.sourceNodeID must be a non-empty string`);
  }

  if (typeof edge.targetNodeID !== 'string' || !edge.targetNodeID.trim()) {
    throw new Error(`${path}.targetNodeID must be a non-empty string`);
  }

  // Validate optional fields if present
  if (edge.sourcePortID !== undefined && typeof edge.sourcePortID !== 'string') {
    throw new Error(`${path}.sourcePortID must be a string if present`);
  }

  if (edge.targetPortID !== undefined && typeof edge.targetPortID !== 'string') {
    throw new Error(`${path}.targetPortID must be a string if present`);
  }
};
