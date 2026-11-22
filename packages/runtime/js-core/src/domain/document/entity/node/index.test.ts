/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { beforeEach, describe, expect, it } from 'vitest';
import {
  FlowGramNode,
  WorkflowPortType,
  CreateNodeParams,
  IEdge,
  INode,
  IPort,
} from '@flowgram.ai/runtime-interface';

import { WorkflowRuntimeNode } from './index';

describe('WorkflowRuntimeNode', () => {
  let node: WorkflowRuntimeNode;
  let mockParams: CreateNodeParams;

  beforeEach(() => {
    mockParams = {
      id: 'test-node',
      type: FlowGramNode.Start,
      name: 'Test Node',
      position: { x: 0, y: 0 },
      variable: {},
      data: { testData: 'data' },
    };
    node = new WorkflowRuntimeNode(mockParams);
  });

  describe('constructor', () => {
    it('should initialize with provided params', () => {
      expect(node.id).toBe(mockParams.id);
      expect(node.type).toBe(mockParams.type);
      expect(node.name).toBe(mockParams.name);
      expect(node.position).toBe(mockParams.position);
      expect(node.declare).toEqual(mockParams.variable);
      expect(node.data).toEqual(mockParams.data);
    });

    it('should initialize with default values when optional params are not provided', () => {
      const minimalParams = {
        id: 'test-node',
        type: FlowGramNode.Start,
        name: 'Test Node',
        position: { x: 0, y: 0 },
      };
      const minimalNode = new WorkflowRuntimeNode(minimalParams);
      expect(minimalNode.declare).toEqual({});
      expect(minimalNode.data).toEqual({});
    });
  });

  describe('ports', () => {
    let inputPort: IPort;
    let outputPort: IPort;

    beforeEach(() => {
      inputPort = { id: 'input-1', type: WorkflowPortType.Input, node, edges: [] };
      outputPort = { id: 'output-1', type: WorkflowPortType.Output, node, edges: [] };
      node.addPort(inputPort);
      node.addPort(outputPort);
    });

    it('should correctly categorize input and output ports', () => {
      const { inputs, outputs } = node.ports;
      expect(inputs).toHaveLength(1);
      expect(outputs).toHaveLength(1);
      expect(inputs[0]).toBe(inputPort);
      expect(outputs[0]).toBe(outputPort);
    });

    it('should not duplicate the same port when addPort is called twice', () => {
      node.addPort(inputPort);
      node.addPort(outputPort);

      expect(node.ports.inputs).toHaveLength(1);
      expect(node.ports.outputs).toHaveLength(1);
      expect(node.ports.inputs[0]).toBe(inputPort);
      expect(node.ports.outputs[0]).toBe(outputPort);
    });
  });

  describe('isBranch with shared ports', () => {
    it('should return false when a single output port fans out to multiple edges', () => {
      const outputPort = { id: 'output-1', type: WorkflowPortType.Output, node, edges: [] };
      node.addPort(outputPort);
      node.addPort(outputPort);

      expect(node.ports.outputs).toHaveLength(1);
      expect(node.isBranch).toBe(false);
    });
  });

  describe('edges', () => {
    let inputEdge: IEdge;
    let outputEdge: IEdge;
    let fromNode: INode;
    let toNode: INode;

    beforeEach(() => {
      fromNode = new WorkflowRuntimeNode({ ...mockParams, id: 'from-node' });
      toNode = new WorkflowRuntimeNode({ ...mockParams, id: 'to-node' });
      inputEdge = {
        id: 'input-edge',
        from: fromNode,
        to: node,
        fromPort: {} as IPort,
        toPort: {} as IPort,
      };
      outputEdge = {
        id: 'output-edge',
        from: node,
        to: toNode,
        fromPort: {} as IPort,
        toPort: {} as IPort,
      };
      node.addInputEdge(inputEdge);
      node.addOutputEdge(outputEdge);
    });

    it('should correctly store input and output edges', () => {
      const { inputs, outputs } = node.edges;
      expect(inputs).toHaveLength(1);
      expect(outputs).toHaveLength(1);
      expect(inputs[0]).toBe(inputEdge);
      expect(outputs[0]).toBe(outputEdge);
    });

    it('should update prev and next nodes when adding edges', () => {
      expect(node.prev).toHaveLength(1);
      expect(node.next).toHaveLength(1);
      expect(node.prev[0]).toBe(fromNode);
      expect(node.next[0]).toBe(toNode);
    });
  });

  describe('parent and children', () => {
    let parentNode: INode;
    let childNode: INode;

    beforeEach(() => {
      parentNode = new WorkflowRuntimeNode({ ...mockParams, id: 'parent-node' });
      childNode = new WorkflowRuntimeNode({ ...mockParams, id: 'child-node' });
    });

    it('should handle parent-child relationships', () => {
      node.parent = parentNode;
      node.addChild(childNode);

      expect(node.parent).toBe(parentNode);
      expect(node.children).toHaveLength(1);
      expect(node.children[0]).toBe(childNode);
    });
  });

  describe('isBranch', () => {
    it('should return true when node has multiple output ports', () => {
      const outputPort1 = { id: 'output-1', type: WorkflowPortType.Output, node, edges: [] };
      const outputPort2 = { id: 'output-2', type: WorkflowPortType.Output, node, edges: [] };
      node.addPort(outputPort1);
      node.addPort(outputPort2);

      expect(node.isBranch).toBe(true);
    });

    it('should return false when node has one or zero output ports', () => {
      const outputPort = { id: 'output-1', type: WorkflowPortType.Output, node, edges: [] };
      node.addPort(outputPort);

      expect(node.isBranch).toBe(false);
    });
  });

  describe('successors', () => {
    it('should return empty array when node has no successors', () => {
      expect(node.successors).toEqual([]);
    });

    it('should return direct successors', () => {
      const successor1 = new WorkflowRuntimeNode({ ...mockParams, id: 'successor-1' });
      const successor2 = new WorkflowRuntimeNode({ ...mockParams, id: 'successor-2' });

      const edge1 = {
        id: 'edge-1',
        from: node,
        to: successor1,
        fromPort: {} as IPort,
        toPort: {} as IPort,
      };
      const edge2 = {
        id: 'edge-2',
        from: node,
        to: successor2,
        fromPort: {} as IPort,
        toPort: {} as IPort,
      };

      node.addOutputEdge(edge1);
      node.addOutputEdge(edge2);

      const { successors } = node;
      expect(successors).toHaveLength(2);
      expect(successors).toContain(successor1);
      expect(successors).toContain(successor2);
    });

    it('should return all nested successors recursively', () => {
      const successor1 = new WorkflowRuntimeNode({ ...mockParams, id: 'successor-1' });
      const successor2 = new WorkflowRuntimeNode({ ...mockParams, id: 'successor-2' });
      const successor3 = new WorkflowRuntimeNode({ ...mockParams, id: 'successor-3' });

      // node -> successor1 -> successor2 -> successor3
      const edge1 = {
        id: 'edge-1',
        from: node,
        to: successor1,
        fromPort: {} as IPort,
        toPort: {} as IPort,
      };
      const edge2 = {
        id: 'edge-2',
        from: successor1,
        to: successor2,
        fromPort: {} as IPort,
        toPort: {} as IPort,
      };
      const edge3 = {
        id: 'edge-3',
        from: successor2,
        to: successor3,
        fromPort: {} as IPort,
        toPort: {} as IPort,
      };

      node.addOutputEdge(edge1);
      successor1.addOutputEdge(edge2);
      successor2.addOutputEdge(edge3);

      const { successors } = node;
      expect(successors).toHaveLength(3);
      expect(successors).toContain(successor1);
      expect(successors).toContain(successor2);
      expect(successors).toContain(successor3);
    });

    it('should handle circular references without infinite loop', () => {
      const successor1 = new WorkflowRuntimeNode({ ...mockParams, id: 'successor-1' });
      const successor2 = new WorkflowRuntimeNode({ ...mockParams, id: 'successor-2' });

      // Create a cycle: node -> successor1 -> successor2 -> node
      const edge1 = {
        id: 'edge-1',
        from: node,
        to: successor1,
        fromPort: {} as IPort,
        toPort: {} as IPort,
      };
      const edge2 = {
        id: 'edge-2',
        from: successor1,
        to: successor2,
        fromPort: {} as IPort,
        toPort: {} as IPort,
      };
      const edge3 = {
        id: 'edge-3',
        from: successor2,
        to: node,
        fromPort: {} as IPort,
        toPort: {} as IPort,
      };

      node.addOutputEdge(edge1);
      successor1.addOutputEdge(edge2);
      successor2.addOutputEdge(edge3);

      const { successors } = node;
      // In a circular reference, we should get all nodes in the cycle except the starting node
      expect(successors).toHaveLength(3);
      expect(successors).toContain(successor1);
      expect(successors).toContain(successor2);
      expect(successors).toContain(node); // node will be visited when traversing from successor2
    });
  });

  describe('predecessors', () => {
    it('should return empty array when node has no predecessors', () => {
      expect(node.predecessors).toEqual([]);
    });

    it('should return direct predecessors', () => {
      const predecessor1 = new WorkflowRuntimeNode({ ...mockParams, id: 'predecessor-1' });
      const predecessor2 = new WorkflowRuntimeNode({ ...mockParams, id: 'predecessor-2' });

      const edge1 = {
        id: 'edge-1',
        from: predecessor1,
        to: node,
        fromPort: {} as IPort,
        toPort: {} as IPort,
      };
      const edge2 = {
        id: 'edge-2',
        from: predecessor2,
        to: node,
        fromPort: {} as IPort,
        toPort: {} as IPort,
      };

      node.addInputEdge(edge1);
      node.addInputEdge(edge2);

      const { predecessors } = node;
      expect(predecessors).toHaveLength(2);
      expect(predecessors).toContain(predecessor1);
      expect(predecessors).toContain(predecessor2);
    });

    it('should return all nested predecessors recursively', () => {
      const predecessor1 = new WorkflowRuntimeNode({ ...mockParams, id: 'predecessor-1' });
      const predecessor2 = new WorkflowRuntimeNode({ ...mockParams, id: 'predecessor-2' });
      const predecessor3 = new WorkflowRuntimeNode({ ...mockParams, id: 'predecessor-3' });

      // predecessor3 -> predecessor2 -> predecessor1 -> node
      const edge1 = {
        id: 'edge-1',
        from: predecessor3,
        to: predecessor2,
        fromPort: {} as IPort,
        toPort: {} as IPort,
      };
      const edge2 = {
        id: 'edge-2',
        from: predecessor2,
        to: predecessor1,
        fromPort: {} as IPort,
        toPort: {} as IPort,
      };
      const edge3 = {
        id: 'edge-3',
        from: predecessor1,
        to: node,
        fromPort: {} as IPort,
        toPort: {} as IPort,
      };

      predecessor2.addInputEdge(edge1);
      predecessor1.addInputEdge(edge2);
      node.addInputEdge(edge3);

      const { predecessors } = node;
      expect(predecessors).toHaveLength(3);
      expect(predecessors).toContain(predecessor1);
      expect(predecessors).toContain(predecessor2);
      expect(predecessors).toContain(predecessor3);
    });

    it('should handle circular references without infinite loop', () => {
      const predecessor1 = new WorkflowRuntimeNode({ ...mockParams, id: 'predecessor-1' });
      const predecessor2 = new WorkflowRuntimeNode({ ...mockParams, id: 'predecessor-2' });

      // Create a cycle: node -> predecessor1 -> predecessor2 -> node
      const edge1 = {
        id: 'edge-1',
        from: node,
        to: predecessor1,
        fromPort: {} as IPort,
        toPort: {} as IPort,
      };
      const edge2 = {
        id: 'edge-2',
        from: predecessor1,
        to: predecessor2,
        fromPort: {} as IPort,
        toPort: {} as IPort,
      };
      const edge3 = {
        id: 'edge-3',
        from: predecessor2,
        to: node,
        fromPort: {} as IPort,
        toPort: {} as IPort,
      };

      node.addOutputEdge(edge1);
      predecessor1.addOutputEdge(edge2);
      node.addInputEdge(edge3);

      const { predecessors } = node;
      expect(predecessors).toHaveLength(1);
      expect(predecessors).toContain(predecessor2);
      // node itself should not be included in predecessors
      expect(predecessors).not.toContain(node);
    });
  });
});
