# Nodes

This document provides a detailed introduction to the node system in FlowGram Runtime, including basic node concepts, existing node types and their usage, and how to create custom nodes.

Existing Nodes:

* Start Node
* End Node
* LLM Node
* Condition Node
* Loop Node

> Future support will include Code, Intent, Batch, Break, Continue, and HTTP nodes

## Node Overview

### The Role of Nodes in FlowGram Runtime

Nodes are the basic execution units of FlowGram workflows, with each node representing a specific operation or function. A FlowGram workflow is essentially a directed graph formed by multiple nodes connected by edges, describing the execution process of a task. The core responsibilities of the node system include:

1. **Executing Specific Operations**: Each type of node has its specific functionality, such as starting a workflow, calling an LLM model, performing conditional judgments, etc.
2. **Processing Inputs and Outputs**: Nodes receive input data, perform operations, and produce output data
3. **Controlling Execution Flow**: Control the execution path of the workflow through condition nodes and loop nodes

### Introduction to INodeExecutor Interface

All node executors must implement the `INodeExecutor` interface, which defines the basic structure of a node executor:

```typescript
interface INodeExecutor {
  // Node type, used to identify different kinds of nodes
  type: string;

  // Execute method, handles the specific logic of the node
  execute(context: ExecutionContext): Promise<ExecutionResult>;
}
```

Where:

* `type`: Node type identifier, such as 'start', 'end', 'llm', etc.
* `execute`: Node execution method, receives execution context, returns execution result

### Node Execution Process

The node execution process is as follows:

1. **Preparation Phase**:
   * Get the node's input data from the execution context
   * Validate whether the input data meets the requirements

2. **Execution Phase**:
   * Execute the node-specific business logic
   * Handle possible exception situations

3. **Completion Phase**:
   * Generate the node's output data
   * Update the node status
   * Return the execution result

The workflow engine schedules the execution of nodes in sequence according to the connection relationships between nodes. For special nodes (such as condition nodes and loop nodes), the engine will decide the next execution path based on the execution results of the node.

## Detailed Introduction to Existing Nodes

FlowGram Runtime currently implements five types of nodes: Start, End, LLM, Condition, and Loop. Below is a detailed introduction to each type of node's functionality, configuration, and usage examples.

### Start Node

#### Functionality

The Start node is the starting node of the workflow, used to receive the input data of the workflow and begin the execution of the workflow. Each workflow must have one and only one Start node.

#### Configuration Options

| Option | Type | Required | Description |
|------|------|------|------|
| outputs | JSONSchema | Yes | Defines the input data structure of the workflow |

#### Usage Example

```json
{
  "id": "start_0",
  "type": "start",
  "data": {
    "title": "Start Node",
    "outputs": {
      "type": "object",
      "properties": {
        "prompt": {
          "type": "string",
          "description": "User input prompt"
        }
      },
      "required": ["prompt"]
    }
  }
}
```

In this example, the Start node defines that the workflow needs a string type input named `prompt`.

### End Node

#### Functionality

The End node is the ending node of the workflow, used to collect the output data of the workflow and end the execution of the workflow. Each workflow must have at least one End node.

#### Configuration Options

| Option | Type | Required | Description |
|------|------|------|------|
| inputs | JSONSchema | Yes | Defines the output data structure of the workflow |
| inputsValues | `Record<string, ValueSchema>` | Yes | Defines the output data values of the workflow, can be references or constants |

#### Usage Example

```json
{
  "id": "end_0",
  "type": "end",
  "data": {
    "title": "End Node",
    "inputs": {
      "type": "object",
      "properties": {
        "result": {
          "type": "string",
          "description": "Output result of the workflow"
        }
      }
    },
    "inputsValues": {
      "result": {
        "type": "ref",
        "content": ["llm_0", "result"]
      }
    }
  }
}
```

In this example, the End node defines that the output of the workflow contains a string named `result`, whose value is referenced from the `result` output of the node with ID `llm_0`.

### LLM Node

#### Functionality

The LLM node is used to call large language models to perform natural language processing tasks, and is one of the most commonly used node types in FlowGram workflows.

#### Configuration Options

| Option | Type | Required | Description |
|------|------|------|------|
| modelName | string | Yes | Model name, such as "gpt-3.5-turbo" |
| apiKey | string | Yes | API key |
| apiHost | string | Yes | API host address |
| temperature | number | Yes | Temperature parameter, controls the randomness of the output |
| systemPrompt | string | No | System prompt, sets the role and behavior of the AI assistant |
| prompt | string | Yes | User prompt, i.e., the question or request posed to the AI |

#### Usage Example

```json
{
  "id": "llm_0",
  "type": "llm",
  "data": {
    "title": "LLM Node",
    "inputsValues": {
      "modelName": {
        "type": "constant",
        "content": "gpt-3.5-turbo"
      },
      "apiKey": {
        "type": "constant",
        "content": "sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
      },
      "apiHost": {
        "type": "constant",
        "content": "https://api.openai.com/v1"
      },
      "temperature": {
        "type": "constant",
        "content": 0.7
      },
      "systemPrompt": {
        "type": "constant",
        "content": "You are a helpful assistant."
      },
      "prompt": {
        "type": "ref",
        "content": ["start_0", "prompt"]
      }
    },
    "inputs": {
      "type": "object",
      "required": ["modelName", "apiKey", "apiHost", "temperature", "prompt"],
      "properties": {
        "modelName": { "type": "string" },
        "apiKey": { "type": "string" },
        "apiHost": { "type": "string" },
        "temperature": { "type": "number" },
        "systemPrompt": { "type": "string" },
        "prompt": { "type": "string" }
      }
    },
    "outputs": {
      "type": "object",
      "properties": {
        "result": { "type": "string" }
      }
    }
  }
}
```

In this example, the LLM node uses the gpt-3.5-turbo model, with a temperature parameter of 0.7, a system prompt set to "You are a helpful assistant", and a user prompt referenced from the input of the Start node.

### Condition Node

#### Functionality

The Condition node is used to select different execution branches based on conditions, implementing conditional logic in the workflow.

#### Configuration Options

| Option | Type | Required | Description |
|------|------|------|------|
| conditions | Array | Yes | Array of conditions, each condition contains key and value |

Structure of condition value:

| Option | Type | Required | Description |
|------|------|------|------|
| left | ValueSchema | Yes | Left value, can be a reference or constant |
| operator | string | Yes | Operator, such as "eq", "gt", etc. |
| right | ValueSchema | Yes | Right value, can be a reference or constant |

Supported operators:

| Operator | Description | Applicable Types |
|--------|------|----------|
| eq | Equal to | All types |
| neq | Not equal to | All types |
| gt | Greater than | Numbers, strings |
| gte | Greater than or equal to | Numbers, strings |
| lt | Less than | Numbers, strings |
| lte | Less than or equal to | Numbers, strings |
| includes | Contains | Strings, arrays |
| startsWith | Starts with | Strings |
| endsWith | Ends with | Strings |

#### Usage Example

```json
{
  "id": "condition_0",
  "type": "condition",
  "data": {
    "title": "Condition Node",
    "conditions": [
      {
        "key": "if_true",
        "value": {
          "left": {
            "type": "ref",
            "content": ["start_0", "value"]
          },
          "operator": "gt",
          "right": {
            "type": "constant",
            "content": 10
          }
        }
      },
      {
        "key": "if_false",
        "value": {
          "left": {
            "type": "ref",
            "content": ["start_0", "value"]
          },
          "operator": "lte",
          "right": {
            "type": "constant",
            "content": 10
          }
        }
      }
    ]
  }
}
```

In this example, the condition node defines two branches: when the value output of the Start node is greater than 10, it takes the "if\_true" branch, otherwise it takes the "if\_false" branch.

### Loop Node

#### Functionality

The Loop node is used to perform the same operation on each element in an array, implementing loop logic in the workflow.

#### Configuration Options

| Option | Type | Required | Description |
|------|------|------|------|
| loopFor | ValueSchema | Yes | The array to iterate over, usually a reference |
| loopOutputs | `Record<string, ValueSchema>` | Yes | Loop outputs, references to sub-node outputs |
| blocks | `Array<NodeSchema>` | Yes | Array of nodes within the loop body |

#### Usage Example

```json
{
  "id": "loop_0",
  "type": "loop",
  "data": {
    "title": "Loop Node",
    "loopFor": {
      "type": "ref",
      "content": ["start_0", "items"]
    },
    "loopOutputs": {
      "results": {
        "type": "ref",
        "content": ["llm_1", "result"]
      }
    }
  },
  "blocks": [
    {
      "id": "llm_1",
      "type": "llm",
      "data": {
        "inputsValues": {
          "prompt": {
            "type": "ref",
            "content": ["loop_0_locals", "item"]
          }
        }
      }
    }
  ]
}
```

In this example, the loop node iterates over the items output of the Start node (assuming it's an array), calling an LLM node for each element. Within the loop body, the current iteration element can be referenced via `loop_0_locals.item`, and the LLM node's result is referenced as Loop node's output.

## How to Add Custom Nodes

FlowGram Runtime is designed to be extensible, allowing developers to add custom node types. Below are the steps to implement and register custom nodes.

### Steps to Implement the INodeExecutor Interface

1. **Create a Node Executor Class**:

```typescript
import { ExecutionContext, ExecutionResult, INodeExecutor } from '@flowgram.ai/runtime-interface';

export class CustomNodeExecutor implements INodeExecutor {
  // Define node type
  public type = 'custom';

  // Implement execute method
  public async execute(context: ExecutionContext): Promise<ExecutionResult> {
    // 1. Get inputs from context
    const inputs = context.inputs as CustomNodeInputs;

    // 2. Validate inputs
    if (!inputs.requiredParam) {
      throw new Error('Required parameter missing');
    }

    // 3. Execute node logic
    const result = await this.processCustomLogic(inputs);

    // 4. Return outputs
    return {
      outputs: {
        result: result
      }
    };
  }

  // Custom processing logic
  private async processCustomLogic(inputs: CustomNodeInputs): Promise<string> {
    // Implement custom logic
    return `Processing result: ${inputs.requiredParam}`;
  }
}

// Define input interface
interface CustomNodeInputs {
  requiredParam: string;
  optionalParam?: number;
}
```

2. **Handle Exception Situations**:

```typescript
public async execute(context: ExecutionContext): Promise<ExecutionResult> {
  try {
    const inputs = context.inputs as CustomNodeInputs;

    // Validate inputs
    if (!inputs.requiredParam) {
      throw new Error('Required parameter missing');
    }

    // Execute node logic
    const result = await this.processCustomLogic(inputs);

    return {
      outputs: {
        result: result
      }
    };
  } catch (error) {
    // Handle exceptions
    console.error('Node execution failed:', error);
    throw error; // Or return specific error output
  }
}
```

### Method to Register Custom Nodes

Add the custom node executor to the node executor registry of FlowGram Runtime:

```typescript
import { WorkflowRuntimeNodeExecutors } from './nodes';
import { CustomNodeExecutor } from './nodes/custom';

// Register custom node executor
WorkflowRuntimeNodeExecutors.push(new CustomNodeExecutor());
```

### Best Practices for Custom Node Development

1. **Clear Node Responsibility**:
   * Each node should have a clear single responsibility
   * Avoid implementing multiple unrelated functionalities in one node

2. **Input Validation**:
   * Validate all required inputs before executing node logic
   * Provide clear error messages for debugging

3. **Exception Handling**:
   * Catch and handle possible exception situations
   * Avoid letting unhandled exceptions cause the entire workflow to crash

4. **Performance Considerations**:
   * Consider implementing timeout mechanisms for time-consuming operations
   * Avoid long-time synchronous operations that block the main thread

5. **Testability**:
   * Consider the convenience of unit testing when designing nodes
   * Separate core logic from external dependencies for easier mock testing

6. **Documentation and Comments**:
   * Provide detailed documentation for custom nodes
   * Add necessary comments in the code, especially for complex logic parts

### Complete Custom Node Example

Below is a complete example of a custom HTTP request node, used to send HTTP requests and handle responses:

```typescript
import { ExecutionContext, ExecutionResult, INodeExecutor } from '@flowgram.ai/runtime-interface';
import axios from 'axios';

// Define HTTP node input interface
interface HTTPNodeInputs {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: any;
  timeout?: number;
}

// Define HTTP node output interface
interface HTTPNodeOutputs {
  status: number;
  data: any;
  headers: Record<string, string>;
}

export class HTTPNodeExecutor implements INodeExecutor {
  // Define node type
  public type = 'http';

  // Implement execute method
  public async execute(context: ExecutionContext): Promise<ExecutionResult> {
    // 1. Get inputs from context
    const inputs = context.inputs as HTTPNodeInputs;

    // 2. Validate inputs
    if (!inputs.url) {
      throw new Error('URL parameter missing');
    }

    if (!inputs.method) {
      throw new Error('Request method parameter missing');
    }

    // 3. Execute HTTP request
    try {
      const response = await axios({
        url: inputs.url,
        method: inputs.method,
        headers: inputs.headers || {},
        data: inputs.body,
        timeout: inputs.timeout || 30000
      });

      // 4. Process response
      const outputs: HTTPNodeOutputs = {
        status: response.status,
        data: response.data,
        headers: response.headers as Record<string, string>
      };

      // 5. Return outputs
      return {
        outputs
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle Axios errors
        if (error.response) {
          // Server returned an error status code
          return {
            outputs: {
              status: error.response.status,
              data: error.response.data,
              headers: error.response.headers as Record<string, string>
            }
          };
        } else if (error.request) {
          // Request was sent but no response was received
          throw new Error(`Request timeout or no response: ${error.message}`);
        } else {
          // Request configuration error
          throw new Error(`Request configuration error: ${error.message}`);
        }
      } else {
        // Handle non-Axios errors
        throw error;
      }
    }
  }
}

// Register HTTP node executor
import { WorkflowRuntimeNodeExecutors } from './nodes';
WorkflowRuntimeNodeExecutors.push(new HTTPNodeExecutor());
```

Usage example:

```json
{
  "id": "http_0",
  "type": "http",
  "data": {
    "title": "HTTP Request Node",
    "inputsValues": {
      "url": {
        "type": "constant",
        "content": "https://api.example.com/data"
      },
      "method": {
        "type": "constant",
        "content": "GET"
      },
      "headers": {
        "type": "constant",
        "content": {
          "Authorization": "Bearer token123"
        }
      }
    },
    "inputs": {
      "type": "object",
      "required": ["url", "method"],
      "properties": {
        "url": { "type": "string" },
        "method": { "type": "string", "enum": ["GET", "POST", "PUT", "DELETE"] },
        "headers": { "type": "object" },
        "body": { "type": "object" },
        "timeout": { "type": "number" }
      }
    },
    "outputs": {
      "type": "object",
      "properties": {
        "status": { "type": "number" },
        "data": { "type": "object" },
        "headers": { "type": "object" }
      }
    }
  }
}
```

Through the above steps and examples, you can develop and register custom nodes according to your own needs, extending the functionality of FlowGram Runtime.
