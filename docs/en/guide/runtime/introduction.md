# Introduction to FlowGram Runtime

**⚠️ FlowGram Runtime is currently in early development stage, and only supports nodejs runtime, and only work in free layout.**

<div className="rs-highlight">
  **⚠️ Currently in early development stage**

  * Unstable API, API interfaces may change, with no guarantee of backward compatibility
  * Only supports nodejs runtime, and only work in free layout
</div>

This document introduces the basic concepts, design principles, and core features of FlowGram Runtime to help business integration developers understand and use this reference implementation of a workflow runtime engine.

## What is FlowGram Runtime

FlowGram Runtime is a reference implementation of a workflow runtime engine, designed to provide runtime reference for business developers. It can parse and execute graph-based workflows, supporting various node types including Start, End, LLM, Condition, Loop, and more.

### Project Positioning and Goals

FlowGram Runtime is **positioned as a demo rather than an SDK**, with the following main goals:

* Provide design and implementation reference for workflow runtimes
* Demonstrate how to build and extend workflow engines
* Offer code that developers can directly learn from and modify
* Support rapid prototyping and proof of concept

As a reference implementation, FlowGram Runtime will not be published as a package. Developers need to fork the repository and modify it according to their specific business scenarios and requirements.

## Core Concepts

### Workflow

A workflow is a directed graph composed of nodes and edges, describing the execution order and logical relationships of a series of tasks. In FlowGram Runtime, workflows are defined in JSON format, containing nodes and edges.

Example workflow definition:

```json
{
  "nodes": [
    { "id": "start", "type": "Start", "meta": {}, "data": {} },
    { "id": "llm", "type": "LLM", "meta": {}, "data": { "systemPrompt": "You are an assistant", "userPrompt": "{{start.input}}" } },
    { "id": "end", "type": "End", "meta": {}, "data": {} }
  ],
  "edges": [
    { "sourceNodeID": "start", "targetNodeID": "llm" },
    { "sourceNodeID": "llm", "targetNodeID": "end" }
  ]
}
```

### Node

Nodes are the basic execution units in a workflow, each representing a specific operation or task. FlowGram Runtime supports various node types, including:

* **Start Node**: The starting point of a workflow, providing workflow input
* **End Node**: The endpoint of a workflow, collecting workflow output
* **LLM Node**: Calls large language models, supporting system prompts and user prompts
* **Condition Node**: Selects different execution branches based on conditions, supporting various comparison operators
* **Loop Node**: Performs the same operation on each element in an array, supporting sub-workflows

Each node contains ID, type, metadata, and data information, with different node types having different configuration options and behaviors.

### Edge

Edges define the connection relationships between nodes, representing the direction of data and control flow. Each edge contains source node, target node, and optional source port information.

The definition of edges determines the execution path and data flow of the workflow, forming the foundation for building complex workflow logic.

### Execution Engine

The execution engine is responsible for parsing workflow definitions, executing nodes in the defined logical order, and handling data flow between nodes. It is the core component of FlowGram Runtime, managing the entire lifecycle of workflows.

## Technical Architecture

FlowGram Runtime adopts a Domain-Driven Design (DDD) architecture, dividing the system into multiple domains:

* **Document**: Data structures for workflow definitions, including node and edge models
* **Engine**: Core logic for workflow execution, responsible for workflow parsing and scheduling
* **Executor**: Responsible for executing the specific logic of various node types, such as LLM calls and condition evaluation
* **State**: Maintains state information during workflow execution, including execution history and current status
* **Variable**: Manages variable data during workflow execution, supporting variable storage and access

### Technology Stack

The JavaScript version of FlowGram Runtime is built on the following technology stack:

* **TypeScript**: Provides type safety and modern JavaScript features
* **LangChain**: Integrates large language models and related tools
* **OpenAI API**: Provides AI model calling capabilities
* **Fastify**: High-performance web framework for HTTP API services
* **tRPC**: Type-safe API framework

### Module Composition

The project consists of three core modules:

1. **js-core**: Core runtime library, including workflow engine, node executors, and state management
2. **interface**: Interface definitions, defining APIs and data models
3. **nodejs**: NodeJS service implementation, providing HTTP API and service management

## Current Development Status and Limitations ⚠️

FlowGram Runtime is currently in early development stage, with the following status and limitations:

### Development Status

* Core functionality has been implemented, including workflow engine, basic node types, and main APIs
* Basic LLM integration is complete, supporting integration with OpenAI and LangChain
* Basic error handling and state management mechanisms are provided
* Includes test cases and example workflows, though documentation is relatively limited

### Known Limitations

* **Unstable API**: API interfaces may change, with no guarantee of backward compatibility
* **Incomplete Features**: Some features are not fully implemented, such as ServerInfo API and Validation API
* **Error Handling**: Error handling mechanisms are not fully refined, certain edge cases may cause exceptions
* **Storage Mechanism**: Current storage mechanisms are relatively simple, not suitable for production environment persistence requirements
* **Security Mechanisms**: Lacks comprehensive security mechanisms such as authentication, authorization, and input validation

## Future Development Plans

Future development plans for FlowGram Runtime include:

### Multi-language Support

Currently only JavaScript/TypeScript version is available, with plans to develop:

* **Python Version**: Suitable for data science and machine learning scenarios
* **Go Version**: Suitable for high-performance server-side scenarios

### Feature Enhancements

* Add more node types: Code, Intent, Batch, Break, Continue, HTTP.
* Improve error handling and exception recovery mechanisms
* Add complete server-side validation, including schema validation and input validation.
* Support `Docker` deployment.

### TestRun Optimization

* TestRun supports input form
* TestRun input parameter validation
* Single node test run

## Access to FlowGram Editor (Web Frontend)

Modify the runtime configuration in `editorProps` to server mode and configure the service address:

```ts
createRuntimePlugin({
  // mode: 'browser', // remove this line
  mode: 'server',
  serverConfig: {
    domain: 'localhost',
    port: 4000,
    protocol: 'http',
  },
})
```
