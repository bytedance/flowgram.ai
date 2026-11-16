/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { beforeEach, describe, expect, it } from 'vitest';
import { WorkflowSchema, FlowGramNode } from '@flowgram.ai/runtime-interface';

import { WorkflowRuntimeValidation } from './index';

describe('WorkflowRuntimeValidation Integration', () => {
  let validation: WorkflowRuntimeValidation;

  beforeEach(() => {
    validation = new WorkflowRuntimeValidation();
  });

  const createMockNode = (id: string, type: string = 'test') => ({
    id,
    type,
    meta: { position: { x: 0, y: 0 } },
    data: {},
  });

  const createMockEdge = (sourceNodeID: string, targetNodeID: string) => ({
    sourceNodeID,
    targetNodeID,
  });

  const createMockStartNode = (id: string) => ({
    id,
    type: FlowGramNode.Start,
    meta: { position: { x: 0, y: 0 } },
    data: {
      outputs: {
        type: 'object',
        properties: {},
      },
    },
  });

  const createMockEndNode = (id: string) => ({
    id,
    type: FlowGramNode.End,
    meta: { position: { x: 0, y: 0 } },
    data: {},
  });

  it('should pass validation for valid acyclic workflow', () => {
    const schema: WorkflowSchema = {
      nodes: [
        createMockStartNode('start'),
        createMockNode('middle'),
        { id: 'end', type: FlowGramNode.End, meta: { position: { x: 0, y: 0 } }, data: {} },
      ],
      edges: [createMockEdge('start', 'middle'), createMockEdge('middle', 'end')],
    };

    const result = validation.invoke({ schema, inputs: {} });
    expect(result.valid).toBe(true);
  });

  it('should reject duplicate node IDs in the same layer', () => {
    const schema: WorkflowSchema = {
      nodes: [
        createMockStartNode('start'),
        createMockNode('middle'),
        createMockNode('middle'),
        createMockEndNode('end'),
      ],
      edges: [createMockEdge('start', 'middle'), createMockEdge('middle', 'end')],
    };

    const result = validation.invoke({ schema, inputs: {} });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Workflow schema contains duplicate node ID "middle"');
  });

  it('should reject a nested node ID that matches a top-level node ID', () => {
    const schema: WorkflowSchema = {
      nodes: [
        createMockStartNode('start'),
        createMockNode('middle'),
        {
          ...createMockNode('container'),
          blocks: [
            createMockNode('block-start', FlowGramNode.BlockStart),
            createMockNode('middle'),
            createMockNode('block-end', FlowGramNode.BlockEnd),
          ],
          edges: [createMockEdge('block-start', 'middle'), createMockEdge('middle', 'block-end')],
        },
        createMockEndNode('end'),
      ],
      edges: [
        createMockEdge('start', 'middle'),
        createMockEdge('middle', 'container'),
        createMockEdge('container', 'end'),
      ],
    };

    const result = validation.invoke({ schema, inputs: {} });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Workflow schema contains duplicate node ID "middle"');
  });

  it('should reject a node ID that matches the implicit runtime root', () => {
    const schema: WorkflowSchema = {
      nodes: [
        createMockStartNode('start'),
        createMockNode(FlowGramNode.Root),
        createMockEndNode('end'),
      ],
      edges: [createMockEdge('start', FlowGramNode.Root), createMockEdge(FlowGramNode.Root, 'end')],
    };

    const result = validation.invoke({ schema, inputs: {} });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Workflow schema contains duplicate node ID "root"');
  });

  it('should fail validation for workflow with cycles', () => {
    const schema: WorkflowSchema = {
      nodes: [
        createMockStartNode('start'),
        createMockNode('A'),
        createMockNode('B'),
        { id: 'end', type: FlowGramNode.End, meta: { position: { x: 0, y: 0 } }, data: {} },
      ],
      edges: [
        createMockEdge('start', 'A'),
        createMockEdge('A', 'B'),
        createMockEdge('B', 'A'), // Creates a cycle
        createMockEdge('B', 'end'),
      ],
    };

    const result = validation.invoke({ schema, inputs: {} });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Workflow schema contains a cycle, which is not allowed');
  });

  it('should fail validation for workflow with non-existent edge targets', () => {
    const schema: WorkflowSchema = {
      nodes: [
        createMockStartNode('start'),
        { id: 'end', type: FlowGramNode.End, meta: { position: { x: 0, y: 0 } }, data: {} },
      ],
      edges: [
        createMockEdge('start', 'nonexistent'), // Non-existent target
      ],
    };

    const result = validation.invoke({ schema, inputs: {} });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Workflow schema edge target node "nonexistent" not exist');
  });

  it('should fail validation for workflow without start node', () => {
    const schema: WorkflowSchema = {
      nodes: [createMockNode('middle'), createMockEndNode('end')],
      edges: [createMockEdge('middle', 'end')],
    };

    const result = validation.invoke({ schema, inputs: {} });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Workflow schema must have a start node');
  });

  it('should fail validation for workflow without end node', () => {
    const schema: WorkflowSchema = {
      nodes: [createMockStartNode('start'), createMockNode('middle')],
      edges: [createMockEdge('start', 'middle')],
    };

    const result = validation.invoke({ schema, inputs: {} });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Workflow schema must have an end node');
  });

  it('should fail validation for workflow with multiple start nodes', () => {
    const schema: WorkflowSchema = {
      nodes: [
        createMockStartNode('start1'),
        createMockStartNode('start2'),
        createMockEndNode('end'),
      ],
      edges: [createMockEdge('start1', 'end'), createMockEdge('start2', 'end')],
    };

    const result = validation.invoke({ schema, inputs: {} });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Workflow schema must have only one start node');
  });

  it('should handle complex workflow with nested blocks and cycles', () => {
    const schema: WorkflowSchema = {
      nodes: [
        createMockStartNode('start'),
        {
          id: 'container',
          type: 'container',
          meta: { position: { x: 0, y: 0 } },
          data: {},
          blocks: [createMockNode('block1'), createMockNode('block2')],
          edges: [
            createMockEdge('block1', 'block2'),
            createMockEdge('block2', 'block1'), // Cycle in nested blocks
          ],
        },
        createMockEndNode('end'),
      ],
      edges: [createMockEdge('start', 'container'), createMockEdge('container', 'end')],
    };

    const result = validation.invoke({ schema, inputs: {} });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Workflow schema contains a cycle, which is not allowed');
  });

  // Schema format validation tests
  describe('Schema Format Validation', () => {
    it('should fail validation for invalid schema structure', () => {
      const invalidSchema = null as any;
      const result = validation.invoke({ schema: invalidSchema, inputs: {} });
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Workflow schema must be a valid object');
    });

    it('should fail validation for schema without nodes array', () => {
      const invalidSchema = { edges: [] } as any;
      const result = validation.invoke({ schema: invalidSchema, inputs: {} });
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Workflow schema must have a valid nodes array');
    });

    it('should fail validation for schema without edges array', () => {
      const invalidSchema = { nodes: [] } as any;
      const result = validation.invoke({ schema: invalidSchema, inputs: {} });
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Workflow schema must have a valid edges array');
    });

    it('should fail validation for node without required fields', () => {
      const schema: WorkflowSchema = {
        nodes: [
          {
            // Missing id field
            type: 'test',
            meta: { position: { x: 0, y: 0 } },
            data: {},
          } as any,
        ],
        edges: [],
      };
      const result = validation.invoke({ schema, inputs: {} });
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('nodes[0].id must be a non-empty string');
    });

    it('should fail validation for edge without required fields', () => {
      const schema: WorkflowSchema = {
        nodes: [createMockStartNode('start'), createMockEndNode('end')],
        edges: [
          {
            // Missing targetNodeID
            sourceNodeID: 'start',
          } as any,
        ],
      };
      const result = validation.invoke({ schema, inputs: {} });
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('edges[0].targetNodeID must be a non-empty string');
    });
  });

  // Input validation tests
  describe('Input Validation', () => {
    const createSchemaWithInputs = () => ({
      nodes: [
        {
          id: 'start',
          type: FlowGramNode.Start,
          meta: { position: { x: 0, y: 0 } },
          data: {
            outputs: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                age: { type: 'number' },
                active: { type: 'boolean' },
              },
              required: ['name', 'age'],
            },
          },
        },
        createMockEndNode('end'),
      ],
      edges: [createMockEdge('start', 'end')],
    });

    it('should pass validation with valid inputs', () => {
      const schema = createSchemaWithInputs();
      const inputs = {
        name: 'John Doe',
        age: 30,
        active: true,
      };
      const result = validation.invoke({ schema, inputs });
      expect(result.valid).toBe(true);
    });

    it('should fail validation with missing required inputs', () => {
      const schema = createSchemaWithInputs();
      const inputs = {
        name: 'John Doe',
        // Missing required 'age' field
      };
      const result = validation.invoke({ schema, inputs });
      expect(result.valid).toBe(false);
      expect(result.errors?.[0]).toContain('JSON Schema validation failed');
    });

    it('should fail validation with wrong input types', () => {
      const schema = createSchemaWithInputs();
      const inputs = {
        name: 'John Doe',
        age: 'thirty', // Should be number
        active: true,
      };
      const result = validation.invoke({ schema, inputs });
      expect(result.valid).toBe(false);
      expect(result.errors?.[0]).toContain('JSON Schema validation failed');
    });
  });

  // Edge cases and boundary conditions
  describe('Edge Cases', () => {
    it('should handle empty workflow', () => {
      const schema: WorkflowSchema = {
        nodes: [],
        edges: [],
      };
      const result = validation.invoke({ schema, inputs: {} });
      expect(result.valid).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors!.length).toBeGreaterThan(0);
      // Empty workflow should trigger start/end node validation errors
      const errorMessages = result.errors!.join(' ');
      expect(errorMessages).toContain('start node');
    });

    it('should handle workflow with only start node', () => {
      const schema: WorkflowSchema = {
        nodes: [createMockStartNode('start')],
        edges: [],
      };
      const result = validation.invoke({ schema, inputs: {} });
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Workflow schema must have an end node');
    });

    it('should handle workflow with disconnected nodes', () => {
      const schema: WorkflowSchema = {
        nodes: [createMockStartNode('start'), createMockNode('isolated'), createMockEndNode('end')],
        edges: [createMockEdge('start', 'end')], // 'isolated' node is not connected
      };
      const result = validation.invoke({ schema, inputs: {} });
      expect(result.valid).toBe(true); // This should pass as disconnected nodes are allowed
    });

    it('should handle workflow with self-referencing edge', () => {
      const schema: WorkflowSchema = {
        nodes: [createMockStartNode('start'), createMockNode('self'), createMockEndNode('end')],
        edges: [
          createMockEdge('start', 'self'),
          createMockEdge('self', 'self'), // Self-referencing edge
          createMockEdge('self', 'end'),
        ],
      };
      const result = validation.invoke({ schema, inputs: {} });
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Workflow schema contains a cycle, which is not allowed');
    });

    it('should handle workflow with multiple end nodes', () => {
      const schema: WorkflowSchema = {
        nodes: [createMockStartNode('start'), createMockEndNode('end1'), createMockEndNode('end2')],
        edges: [createMockEdge('start', 'end1'), createMockEdge('start', 'end2')],
      };
      const result = validation.invoke({ schema, inputs: {} });
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Workflow schema must have only one end node');
    });
  });

  // Multiple error scenarios
  describe('Multiple Error Scenarios', () => {
    it('should collect multiple validation errors', () => {
      const schema: WorkflowSchema = {
        nodes: [
          createMockStartNode('start1'),
          createMockStartNode('start2'), // Multiple start nodes
          createMockNode('A'),
          createMockNode('B'),
        ],
        edges: [
          createMockEdge('start1', 'A'),
          createMockEdge('A', 'B'),
          createMockEdge('B', 'A'), // Cycle
          createMockEdge('A', 'nonexistent'), // Non-existent target
        ],
      };
      const result = validation.invoke({ schema, inputs: {} });
      expect(result.valid).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors!.length).toBeGreaterThan(1);
      // Check that multiple errors are collected
      expect(result.errors!.some((error) => error.includes('cycle'))).toBe(true);
      expect(result.errors!.some((error) => error.includes('target node'))).toBe(true);
    });

    it('should handle schema format errors before other validations', () => {
      const invalidSchema = {
        nodes: 'invalid', // Should be array
        edges: [],
      } as any;
      const result = validation.invoke({ schema: invalidSchema, inputs: {} });
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Workflow schema must have a valid nodes array');
    });
  });

  // Complex nested scenarios
  describe('Complex Nested Scenarios', () => {
    it('should validate deeply nested blocks', () => {
      const schema: WorkflowSchema = {
        nodes: [
          createMockStartNode('start'),
          {
            id: 'container1',
            type: 'container',
            meta: { position: { x: 0, y: 0 } },
            data: {},
            blocks: [
              {
                id: 'block-start',
                type: FlowGramNode.BlockStart,
                meta: { position: { x: 0, y: 0 } },
                data: {},
              },
              {
                id: 'container2',
                type: 'container',
                meta: { position: { x: 0, y: 0 } },
                data: {},
                blocks: [
                  {
                    id: 'nested-block-start',
                    type: FlowGramNode.BlockStart,
                    meta: { position: { x: 0, y: 0 } },
                    data: {},
                  },
                  createMockNode('deep1'),
                  createMockNode('deep2'),
                  {
                    id: 'nested-block-end',
                    type: FlowGramNode.BlockEnd,
                    meta: { position: { x: 0, y: 0 } },
                    data: {},
                  },
                ],
                edges: [
                  createMockEdge('nested-block-start', 'deep1'),
                  createMockEdge('deep1', 'deep2'),
                  createMockEdge('deep2', 'nested-block-end'),
                ],
              },
              {
                id: 'block-end',
                type: FlowGramNode.BlockEnd,
                meta: { position: { x: 0, y: 0 } },
                data: {},
              },
            ],
            edges: [
              createMockEdge('block-start', 'container2'),
              createMockEdge('container2', 'block-end'),
            ],
          },
          createMockEndNode('end'),
        ],
        edges: [createMockEdge('start', 'container1'), createMockEdge('container1', 'end')],
      };
      const result = validation.invoke({ schema, inputs: {} });
      expect(result.valid).toBe(true);
    });

    it('should detect cycles in deeply nested blocks', () => {
      const schema: WorkflowSchema = {
        nodes: [
          createMockStartNode('start'),
          {
            id: 'container1',
            type: 'container',
            meta: { position: { x: 0, y: 0 } },
            data: {},
            blocks: [
              {
                id: 'container2',
                type: 'container',
                meta: { position: { x: 0, y: 0 } },
                data: {},
                blocks: [createMockNode('deep1'), createMockNode('deep2')],
                edges: [
                  createMockEdge('deep1', 'deep2'),
                  createMockEdge('deep2', 'deep1'), // Cycle in deep nested block
                ],
              },
            ],
            edges: [],
          },
          createMockEndNode('end'),
        ],
        edges: [createMockEdge('start', 'container1'), createMockEdge('container1', 'end')],
      };
      const result = validation.invoke({ schema, inputs: {} });
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Workflow schema contains a cycle, which is not allowed');
    });
  });
});
