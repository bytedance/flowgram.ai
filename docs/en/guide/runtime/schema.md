# Workflow Schema

This document provides a detailed introduction to the Workflow Schema structure. The Workflow Schema is the core configuration that defines workflows, describing nodes, edges, and their relationships.

## Basic Structure

A complete Workflow Schema contains the following main components:

```typescript
interface WorkflowSchema {
  nodes: WorkflowNodeSchema[];
  edges: WorkflowEdgeSchema[];
}
```

## Node Schema

Nodes are the basic units in a workflow, each with its specific type and configuration:

```typescript
interface WorkflowNodeSchema<T = string, D = any> {
  id: string;           // Unique identifier for the node
  type: T;              // Node type
  meta: WorkflowNodeMetaSchema;  // Node metadata
  data: D & {          // Node data
    title?: string;    // Node title
    inputsValues?: Record<string, IFlowValue>;  // Input values
    inputs?: IJsonSchema;   // Input schema definition
    outputs?: IJsonSchema;  // Output schema definition
    [key: string]: any;     // Other custom data
  };
  blocks?: WorkflowNodeSchema[];  // Child nodes (for composite nodes)
  edges?: WorkflowEdgeSchema[];   // Connections between child nodes
}
```

### Node Metadata

```typescript
interface WorkflowNodeMetaSchema {
  position: PositionSchema;        // Node position in canvas
}
```

## Edge Schema

Edges define the connections between nodes:

```typescript
interface WorkflowEdgeSchema {
  sourceNodeID: string;    // Source node ID
  targetNodeID: string;    // Target node ID
  sourcePortID?: string;   // Source port ID (optional)
  targetPortID?: string;   // Target port ID (optional)
}
```

## Variable Types

Workflow supports various variable types:

```typescript
enum WorkflowVariableType {
  String = 'string',    // String
  Integer = 'integer',  // Integer
  Number = 'number',    // Number
  Boolean = 'boolean',  // Boolean
  Object = 'object',    // Object
  Array = 'array',      // Array
  Null = 'null'         // Null
}
```

### Flow Values

In node input values, the following types are supported:

```typescript
type IFlowValue =
  | IFlowConstantValue     // Constant value
  | IFlowRefValue          // Reference value
  | IFlowExpressionValue   // Expression value
  | IFlowTemplateValue;    // Template value
```

Detailed definition for each type:

```typescript
interface IFlowConstantValue {
  type: 'constant';
  content?: string | number | boolean;
}

interface IFlowRefValue {
  type: 'ref';
  content?: string[];
}

interface IFlowExpressionValue {
  type: 'expression';
  content?: string;
}

interface IFlowTemplateValue {
  type: 'template';
  content?: string;
}
```

## JSON Schema

Node input and output definitions use JSON Schema format:

```typescript
interface IJsonSchema<T = string> {
  type: T;                 // Data type
  default?: any;           // Default value
  title?: string;          // Title
  description?: string;    // Description
  enum?: (string | number)[];  // Enumeration values
  properties?: Record<string, IJsonSchema<T>>;  // Object properties
  additionalProperties?: IJsonSchema<T>;        // Additional properties
  items?: IJsonSchema<T>;                       // Array item definition
  required?: string[];                          // Required fields
  $ref?: string;                                // Reference
  extra?: {                                     // Extra configuration
    index?: number;                             // Index
    weak?: boolean;                             // Weak type comparison
    formComponent?: string;                     // Form component
    [key: string]: any;
  };
}
```
