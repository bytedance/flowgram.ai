/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import {
  FlowGramNode,
  PositionSchema,
  CreateNodeParams,
  IEdge,
  INode,
  IPort,
  NodeVariable,
  WorkflowPortType,
} from '@flowgram.ai/runtime-interface';

import { traverseNodes } from '@infra/index';

export class WorkflowRuntimeNode<T = any> implements INode {
  public readonly id: string;

  public readonly type: FlowGramNode;

  public readonly name: string;

  public readonly position: PositionSchema;

  public readonly declare: NodeVariable;

  public readonly data: T;

  private _parent: INode | null;

  private readonly _children: INode[];

  private readonly _ports: IPort[];

  private readonly _inputEdges: IEdge[];

  private readonly _outputEdges: IEdge[];

  private readonly _prev: INode[];

  private readonly _next: INode[];

  constructor(params: CreateNodeParams) {
    const { id, type, name, position, variable, data } = params;
    this.id = id;
    this.type = type;
    this.name = name;
    this.position = position;
    this.declare = variable ?? {};
    this.data = data ?? {};
    this._parent = null;
    this._children = [];
    this._ports = [];
    this._inputEdges = [];
    this._outputEdges = [];
    this._prev = [];
    this._next = [];
  }

  public get ports() {
    const inputs = this._ports.filter((port) => port.type === WorkflowPortType.Input);
    const outputs = this._ports.filter((port) => port.type === WorkflowPortType.Output);
    return {
      inputs,
      outputs,
    };
  }

  public get edges() {
    return {
      inputs: this._inputEdges,
      outputs: this._outputEdges,
    };
  }

  public get parent() {
    return this._parent;
  }

  public set parent(parent: INode | null) {
    this._parent = parent;
  }

  public get children() {
    return this._children;
  }

  public addChild(child: INode) {
    this._children.push(child);
  }

  public addPort(port: IPort) {
    if (!this._ports.includes(port)) {
      this._ports.push(port);
    }
  }

  public addInputEdge(edge: IEdge) {
    this._inputEdges.push(edge);
    this._prev.push(edge.from);
  }

  public addOutputEdge(edge: IEdge) {
    this._outputEdges.push(edge);
    this._next.push(edge.to);
  }

  public get prev() {
    return this._prev;
  }

  public get next() {
    return this._next;
  }

  public get successors(): INode[] {
    return traverseNodes(this, (node) => node.next);
  }

  public get predecessors(): INode[] {
    return traverseNodes(this, (node) => node.prev);
  }

  public get isBranch() {
    return this.ports.outputs.length > 1;
  }
}
