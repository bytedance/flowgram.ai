# FlowGram Runtime API Reference

FlowGram Runtime provides five core APIs for validating, running, monitoring, retrieving results, and canceling workflows. This document details the usage, parameters, and return values of these APIs.

## TaskRun API

### Function Description

The TaskRun API is used to start a workflow task. It takes a workflow schema and initial inputs, and returns a task ID.

### Parameters

TaskRun API accepts a `TaskRunInput` object as its parameter:

| Parameter | Type | Required | Description |
| --------- | ---- | -------- | ----------- |
| schema | string | Yes | JSON string of the workflow schema, defining nodes and edges |
| inputs | object | No | Initial input parameters for the workflow, can be empty |

The `schema` parameter is a JSON string that defines the structure of the workflow, including information about nodes and edges. The basic structure of the schema is as follows:

```typescript
interface WorkflowSchema {
  nodes: WorkflowNodeSchema[];
  edges: WorkflowEdgeSchema[];
}

interface WorkflowNodeSchema {
  id: string;
  type: FlowGramNode;
  name?: string;
  meta: {
    position: {
      x: number;
      y: number;
    };
  };
  data: any;
  blocks?: WorkflowNodeSchema[];
  edges?: WorkflowEdgeSchema[];
}

interface WorkflowEdgeSchema {
  sourceNodeID: string;
  sourcePort: string;
  targetNodeID: string;
  targetPort: string;
}
```

### Return Value

TaskRun API returns a `TaskRunOutput` object:

| Field | Type | Description |
| ----- | ---- | ----------- |
| taskID | string | Unique identifier for the task, used for subsequent queries |

### Error Handling

TaskRun API may throw the following errors:

* **Schema parsing error**: When the provided schema is not a valid JSON string
* **Schema structure error**: When the schema structure does not match the expected format
* **Node type error**: When the schema includes unsupported node types
* **Initialization error**: When the workflow fails to initialize

### Usage Example

```javascript
import { TaskRunAPI } from '@flowgram.ai/runtime-js';

const schema = JSON.stringify({
  nodes: [
    {
      id: 'start',
      type: 'start',
      meta: { position: { x: 0, y: 0 } },
      data: {}
    },
    {
      id: 'llm',
      type: 'llm',
      meta: { position: { x: 200, y: 0 } },
      data: {
        modelName: 'gpt-3.5-turbo',
        temperature: 0.7,
        systemPrompt: 'You are an assistant',
        prompt: 'Introduce yourself'
      }
    },
    {
      id: 'end',
      type: 'end',
      meta: { position: { x: 400, y: 0 } },
      data: {}
    }
  ],
  edges: [
    {
      sourceNodeID: 'start',
      sourcePort: 'out',
      targetNodeID: 'llm',
      targetPort: 'in'
    },
    {
      sourceNodeID: 'llm',
      sourcePort: 'out',
      targetNodeID: 'end',
      targetPort: 'in'
    }
  ]
});

const inputs = {
  userInput: 'Please introduce yourself'
};

async function runWorkflow() {
  try {
    const result = await TaskRunAPI({
      schema,
      inputs
    });
    console.log('Task ID:', result.taskID);
    return result.taskID;
  } catch (error) {
    console.error('Failed to start workflow:', error);
  }
}
```

### Notes

* The schema must be a valid JSON string and conform to the WorkflowSchema structure
* The workflow must include a start node (type: 'start') and an end node (type: 'end')
* Connections between nodes must be correctly defined through edges
* After a task is started, it will execute asynchronously. You can use the TaskReport API and TaskResult API to get the execution status and results

## TaskReport API

### Function Description

The TaskReport API is used to get the execution report of a workflow task, including the task status and the execution status of each node.

### Parameters

TaskReport API accepts a `TaskReportInput` object as its parameter:

| Parameter | Type | Required | Description |
| --------- | ---- | -------- | ----------- |
| taskID | string | Yes | Unique identifier for the task, returned by TaskRun API |

### Return Value

TaskReport API returns a `TaskReportOutput` object containing the execution report of the task:

| Field | Type | Description |
| ----- | ---- | ----------- |
| workflow | WorkflowStatus | Overall status of the workflow |
| nodes | `Record<string, NodeStatus>` | Execution status of each node |

The `WorkflowStatus` structure is as follows:

```typescript
interface WorkflowStatus {
  status: 'idle' | 'processing' | 'success' | 'fail' | 'canceled';
  terminated: boolean;
}
```

The `NodeStatus` structure is as follows:

```typescript
interface NodeStatus {
  status: 'idle' | 'processing' | 'success' | 'fail' | 'canceled';
  startTime?: number;
  endTime?: number;
}
```

### Error Handling

TaskReport API may encounter the following error situations:

* **Task does not exist**: When the provided taskID does not exist, returns undefined
* **Report generation error**: When an error occurs during report generation

### Usage Example

```javascript
import { TaskReportAPI } from '@flowgram.ai/runtime-js';

async function getTaskReport(taskID) {
  try {
    const report = await TaskReportAPI({ taskID });

    if (!report) {
      console.log('Task does not exist or report not generated');
      return;
    }

    console.log('Workflow status:', report.workflow.status);
    console.log('Workflow terminated:', report.workflow.terminated);

    // Print status of each node
    for (const [nodeId, nodeStatus] of Object.entries(report.nodes)) {
      console.log(`Node ${nodeId} status:`, nodeStatus.status);
      if (nodeStatus.startTime) {
        console.log(`Node ${nodeId} start time:`, new Date(nodeStatus.startTime).toLocaleString());
      }
      if (nodeStatus.endTime) {
        console.log(`Node ${nodeId} end time:`, new Date(nodeStatus.endTime).toLocaleString());
      }
    }

    return report;
  } catch (error) {
    console.error('Failed to get task report:', error);
  }
}
```

### Notes

* The task report is real-time, you can call TaskReport API multiple times to get the latest execution status
* If the workflow has not terminated (`workflow.terminated` is false), the workflow is still executing
* Node status can be 'idle' (not started), 'processing' (executing), 'success' (successful), 'fail' (failed), or 'canceled' (canceled)
* It is recommended to poll the task report periodically to monitor the progress of the workflow

## TaskCancel API

### Function Description

The TaskCancel API is used to cancel a running workflow task.

### Parameters

TaskCancel API accepts a `TaskCancelInput` object as its parameter:

| Parameter | Type | Required | Description |
| --------- | ---- | -------- | ----------- |
| taskID | string | Yes | Unique identifier for the task, returned by TaskRun API |

### Return Value

TaskCancel API returns a `TaskCancelOutput` object:

| Field | Type | Description |
| ----- | ---- | ----------- |
| success | boolean | Indicates whether the task was successfully canceled |

### Error Handling

TaskCancel API may encounter the following error situations:

* **Task does not exist**: When the provided taskID does not exist, returns `{ success: false }`
* **Task already completed**: When the task has already completed or been canceled, it cannot be canceled again

### Usage Example

```javascript
import { TaskCancelAPI } from '@flowgram.ai/runtime-js';

async function cancelTask(taskID) {
  try {
    const result = await TaskCancelAPI({ taskID });

    if (result.success) {
      console.log('Task successfully canceled');
    } else {
      console.log('Failed to cancel task, task may not exist or is already completed');
    }

    return result.success;
  } catch (error) {
    console.error('Failed to cancel task:', error);
    return false;
  }
}
```

### Notes

* Task cancellation is asynchronous, after a successful cancellation request, the task may take some time to completely stop
* Tasks that have already completed cannot be canceled
* After canceling a task, you can check the final status of the task through TaskReport API, the status of a canceled task will change to 'canceled'
* Canceling a task does not clear the intermediate results of the task, you can still get the results of the executed part through TaskResult API

## TaskResult API

### Function Description

The TaskResult API is used to get the final result of a workflow task.

### Parameters

TaskResult API accepts a `TaskResultInput` object as its parameter:

| Parameter | Type | Required | Description |
| --------- | ---- | -------- | ----------- |
| taskID | string | Yes | Unique identifier for the task, returned by TaskRun API |

### Return Value

TaskResult API returns a `WorkflowOutputs` object containing the output results of the workflow:

```typescript
type WorkflowOutputs = Record<string, any>;
```

The structure of the returned object depends on the specific implementation and output definition of the workflow.

### Error Handling

TaskResult API may encounter the following error situations:

* **Task does not exist**: When the provided taskID does not exist, returns undefined
* **Task not completed**: When the task has not terminated, returns undefined
* **Result retrieval error**: When an error occurs during result retrieval

### Usage Example

```javascript
import { TaskResultAPI } from '@flowgram.ai/runtime-js';

async function getTaskResult(taskID) {
  try {
    const result = await TaskResultAPI({ taskID });

    if (!result) {
      console.log('Task does not exist or is not yet completed');
      return;
    }

    console.log('Task result:', result);
    return result;
  } catch (error) {
    console.error('Failed to get task result:', error);
  }
}

// Usage example: wait for task to complete and get result
async function waitForResult(taskID, pollingInterval = 1000, timeout = 60000) {
  const startTime = Date.now();

  while (Date.now() - startTime < timeout) {
    // Get task report
    const report = await TaskReportAPI({ taskID });

    // If task has terminated, get result
    if (report && report.workflow.terminated) {
      return await TaskResultAPI({ taskID });
    }

    // Wait for a while before checking again
    await new Promise(resolve => setTimeout(resolve, pollingInterval));
  }

  throw new Error('Timeout waiting for task result');
}
```

### Notes

* Results can only be obtained when the task has terminated (completed, failed, or canceled)
* If the task has not yet completed, TaskResult API will return undefined
* It is recommended to check if the task has terminated through TaskReport API before calling TaskResult API to get the result
* For canceled tasks, only partial results or no results may be available
* The specific structure of the result depends on the definition of the workflow, and needs to be parsed according to the actual output of the workflow

## TaskValidate API

### Function Description

The TaskValidate API is used to validate the validity of workflow schema and input parameters before actually running the workflow. This API helps you discover potential configuration errors before starting the workflow.

### Parameters

TaskValidate API accepts a `TaskValidateInput` object as its parameter:

| Parameter | Type | Required | Description |
| --------- | ---- | -------- | ----------- |
| schema | string | Yes | JSON string of the workflow schema, defining nodes and edges |
| inputs | object | No | Initial input parameters for the workflow, used to validate if inputs meet schema requirements |

### Return Value

TaskValidate API returns a `TaskValidateOutput` object:

| Field | Type | Description |
| ----- | ---- | ----------- |
| valid | boolean | Indicates whether validation passed, true means validation succeeded, false means validation failed |
| errors | string\[] | Optional field, contains specific error message list when validation fails |

### Validation Content

TaskValidate API validates the following content:

* **Schema Structure Validation**: Checks if the schema conforms to WorkflowSchema format requirements
* **Node Type Validation**: Validates if node types in the schema are supported
* **Edge Connection Validation**: Checks if connections between nodes are correct
* **Input Parameter Validation**: Validates if provided inputs meet the input requirements defined in the schema
* **Workflow Integrity Validation**: Checks if the workflow contains necessary start and end nodes

### Error Handling

TaskValidate API may return the following types of validation errors:

* **Schema parsing error**: When the provided schema is not a valid JSON string
* **Schema structure error**: When the schema structure does not match the expected format
* **Node configuration error**: When node configuration is incomplete or incorrect
* **Connection error**: When there are issues with connections between nodes
* **Input parameter error**: When input parameters do not meet requirements

### Usage Example

```javascript
import { TaskValidateAPI } from '@flowgram.ai/runtime-js';

const schema = JSON.stringify({
  nodes: [
    {
      id: 'start',
      type: 'start',
      meta: { position: { x: 0, y: 0 } },
      data: {
        outputs: {
          type: 'object',
          properties: {
            userInput: {
              type: 'string',
              extra: {
                index: 0,
              },
            }
          },
          required: ['userInput'],
        },
      }
    },
    {
      id: 'llm',
      type: 'llm',
      meta: { position: { x: 200, y: 0 } },
      data: {
        title: 'LLM_0',
        inputsValues: {
          prompt: {
            type: 'ref',
            content: ['start_0', 'userInput'],
          }
        },
        inputs: {
          type: 'object',
          required: ['editor'],
          properties: {
            prompt: {
              type: 'string',
              extra: {
                formComponent: 'prompt-editor',
              },
            },
          },
        },
        outputs: {
          type: 'object',
          properties: {
            result: {
              type: 'string',
            },
          },
        },
      },
    },
    {
      id: 'end',
      type: 'end',
      meta: { position: { x: 400, y: 0 } },
      data: {}
    }
  ],
  edges: [
    {
      sourceNodeID: 'start',
      sourcePort: 'out',
      targetNodeID: 'llm',
      targetPort: 'in'
    },
    {
      sourceNodeID: 'llm',
      sourcePort: 'out',
      targetNodeID: 'end',
      targetPort: 'in'
    }
  ]
});

const inputs = {
  userInput: 'Please introduce yourself'
};

async function validateWorkflow() {
  try {
    const result = await TaskValidateAPI({
      schema,
      inputs
    });

    if (result.valid) {
      console.log('Workflow validation passed, safe to run');
      return true;
    } else {
      console.error('Workflow validation failed:');
      result.errors?.forEach(error => {
        console.error('- ' + error);
      });
      return false;
    }
  } catch (error) {
    console.error('Error occurred during validation:', error);
    return false;
  }
}

// Validate before running the workflow
async function safeRunWorkflow() {
  const isValid = await validateWorkflow();
  if (isValid) {
    // Run the workflow after validation passes
    const runResult = await TaskRunAPI({ schema, inputs });
    console.log('Workflow started, Task ID:', runResult.taskID);
  } else {
    console.log('Workflow validation failed, please fix errors and retry');
  }
}
```

### Notes

* It is recommended to call TaskValidate API before calling TaskRun API for validation
* Passing validation does not guarantee that the workflow will not encounter errors during runtime, but it can identify most configuration issues in advance
* TaskValidate API typically executes faster than TaskRun API, making it suitable for real-time validation
* Error messages in validation results can help quickly locate and fix issues
* For complex workflows, it is recommended to use this API frequently during development for validation
