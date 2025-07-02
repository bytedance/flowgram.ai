/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { FlowDocumentJSON } from './typings';

export const initialData: FlowDocumentJSON = {
  nodes: [
    {
      id: 'start_0',
      type: 'start',
      meta: {
        position: {
          x: 180,
          y: 381.75,
        },
      },
      data: {
        title: 'Start',
        outputs: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              default: 'Hello Flow.',
            },
            enable: {
              type: 'boolean',
              default: true,
            },
            array_obj: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  int: {
                    type: 'number',
                  },
                  str: {
                    type: 'string',
                  },
                },
              },
            },
          },
        },
      },
    },
    {
      id: 'condition_0',
      type: 'condition',
      meta: {
        position: {
          x: 640,
          y: 318.25,
        },
      },
      data: {
        title: 'Condition',
        conditions: [
          {
            key: 'if_0',
            value: {
              left: {
                type: 'ref',
                content: ['start_0', 'query'],
              },
              operator: 'contains',
              right: {
                type: 'constant',
                content: 'Hello Flow.',
              },
            },
          },
          {
            key: 'if_f0rOAt',
            value: {
              left: {
                type: 'ref',
                content: ['start_0', 'enable'],
              },
              operator: 'is_true',
            },
          },
        ],
      },
    },
    {
      id: 'end_0',
      type: 'end',
      meta: {
        position: {
          x: 2202.9953917050693,
          y: 381.75,
        },
      },
      data: {
        title: 'End',
        inputs: {
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
      id: '159623',
      type: 'comment',
      meta: {
        position: {
          x: 640,
          y: 573.96875,
        },
      },
      data: {
        size: {
          width: 240,
          height: 150,
        },
        note: 'hi ~\n\nthis is a comment node\n\n- flowgram.ai',
      },
    },
    {
      id: 'loop_sGybT',
      type: 'loop',
      meta: {
        position: {
          x: 1373.5714285714287,
          y: 394.9758064516129,
        },
      },
      data: {
        title: 'Loop_1',
        batchFor: {
          type: 'ref',
          content: ['start_0', 'array_obj'],
        },
        batchOutputs: {
          results: {
            type: 'ref',
            content: ['llm_6aSyo', 'result'],
          },
          indexList: {
            type: 'ref',
            content: ['loop_sGybT_locals', 'index'],
          },
        },
      },
      blocks: [
        {
          id: 'llm_6aSyo',
          type: 'llm',
          meta: {
            position: {
              x: -196.8663594470046,
              y: 142.0046082949309,
            },
          },
          data: {
            title: 'LLM_3',
            inputsValues: {
              modelName: {
                type: 'constant',
                content: 'gpt-3.5-turbo',
              },
              apiKey: {
                type: 'constant',
                content: 'sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
              },
              apiHost: {
                type: 'constant',
                content: 'https://mock-ai-url/api/v3',
              },
              temperature: {
                type: 'constant',
                content: 0.5,
              },
              systemPrompt: {
                type: 'constant',
                content: '# Role\nYou are an AI assistant.\n',
              },
              prompt: {
                type: 'constant',
                content: '',
              },
            },
            inputs: {
              type: 'object',
              required: ['modelName', 'apiKey', 'apiHost', 'temperature', 'prompt'],
              properties: {
                modelName: {
                  type: 'string',
                },
                apiKey: {
                  type: 'string',
                },
                apiHost: {
                  type: 'string',
                },
                temperature: {
                  type: 'number',
                },
                systemPrompt: {
                  type: 'string',
                  extra: {
                    formComponent: 'prompt-editor',
                  },
                },
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
          id: 'llm_ZqKlP',
          type: 'llm',
          meta: {
            position: {
              x: 253.1797235023041,
              y: 142.00460829493088,
            },
          },
          data: {
            title: 'LLM_4',
            inputsValues: {
              modelName: {
                type: 'constant',
                content: 'gpt-3.5-turbo',
              },
              apiKey: {
                type: 'constant',
                content: 'sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
              },
              apiHost: {
                type: 'constant',
                content: 'https://mock-ai-url/api/v3',
              },
              temperature: {
                type: 'constant',
                content: 0.5,
              },
              systemPrompt: {
                type: 'constant',
                content: '# Role\nYou are an AI assistant.\n',
              },
              prompt: {
                type: 'constant',
                content: '',
              },
            },
            inputs: {
              type: 'object',
              required: ['modelName', 'apiKey', 'apiHost', 'temperature', 'prompt'],
              properties: {
                modelName: {
                  type: 'string',
                },
                apiKey: {
                  type: 'string',
                },
                apiHost: {
                  type: 'string',
                },
                temperature: {
                  type: 'number',
                },
                systemPrompt: {
                  type: 'string',
                  extra: {
                    formComponent: 'prompt-editor',
                  },
                },
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
      ],
      edges: [
        {
          sourceNodeID: 'llm_6aSyo',
          targetNodeID: 'llm_ZqKlP',
        },
      ],
    },
    {
      id: 'group_5ci0o',
      type: 'group',
      meta: {
        position: {
          x: 0,
          y: 0,
        },
      },
      data: {},
      blocks: [
        {
          id: 'llm_8--A3',
          type: 'llm',
          meta: {
            position: {
              x: 1177.8341013824886,
              y: 19.25,
            },
          },
          data: {
            title: 'LLM_1',
            inputsValues: {
              modelName: {
                type: 'constant',
                content: 'gpt-3.5-turbo',
              },
              apiKey: {
                type: 'constant',
                content: 'sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
              },
              apiHost: {
                type: 'constant',
                content: 'https://mock-ai-url/api/v3',
              },
              temperature: {
                type: 'constant',
                content: 0.5,
              },
              systemPrompt: {
                type: 'constant',
                content: '# Role\nYou are an AI assistant.\n',
              },
              prompt: {
                type: 'constant',
                content: '',
              },
            },
            inputs: {
              type: 'object',
              required: ['modelName', 'apiKey', 'apiHost', 'temperature', 'prompt'],
              properties: {
                modelName: {
                  type: 'string',
                },
                apiKey: {
                  type: 'string',
                },
                apiHost: {
                  type: 'string',
                },
                temperature: {
                  type: 'number',
                },
                systemPrompt: {
                  type: 'string',
                  extra: {
                    formComponent: 'prompt-editor',
                  },
                },
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
          id: 'llm_vTyMa',
          type: 'llm',
          meta: {
            position: {
              x: 1625.6221198156682,
              y: 19.25,
            },
          },
          data: {
            title: 'LLM_2',
            inputsValues: {
              modelName: {
                type: 'constant',
                content: 'gpt-3.5-turbo',
              },
              apiKey: {
                type: 'constant',
                content: 'sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
              },
              apiHost: {
                type: 'constant',
                content: 'https://mock-ai-url/api/v3',
              },
              temperature: {
                type: 'constant',
                content: 0.5,
              },
              systemPrompt: {
                type: 'constant',
                content: '# Role\nYou are an AI assistant.\n',
              },
              prompt: {
                type: 'constant',
                content: '',
              },
            },
            inputs: {
              type: 'object',
              required: ['modelName', 'apiKey', 'apiHost', 'temperature', 'prompt'],
              properties: {
                modelName: {
                  type: 'string',
                },
                apiKey: {
                  type: 'string',
                },
                apiHost: {
                  type: 'string',
                },
                temperature: {
                  type: 'number',
                },
                systemPrompt: {
                  type: 'string',
                  extra: {
                    formComponent: 'prompt-editor',
                  },
                },
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
      ],
      edges: [
        {
          sourceNodeID: 'condition_0',
          targetNodeID: 'llm_8--A3',
          sourcePortID: 'if_0',
        },
        {
          sourceNodeID: 'llm_8--A3',
          targetNodeID: 'llm_vTyMa',
        },
        {
          sourceNodeID: 'llm_vTyMa',
          targetNodeID: 'end_0',
        },
      ],
    },
  ],
  edges: [
    {
      sourceNodeID: 'start_0',
      targetNodeID: 'condition_0',
    },
    {
      sourceNodeID: 'condition_0',
      targetNodeID: 'llm_8--A3',
      sourcePortID: 'if_0',
    },
    {
      sourceNodeID: 'condition_0',
      targetNodeID: 'loop_sGybT',
      sourcePortID: 'if_f0rOAt',
    },
    {
      sourceNodeID: 'llm_vTyMa',
      targetNodeID: 'end_0',
    },
    {
      sourceNodeID: 'loop_sGybT',
      targetNodeID: 'end_0',
    },
  ],
};
