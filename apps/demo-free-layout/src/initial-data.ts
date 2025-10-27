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
          y: 601.2,
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
          x: 1100,
          y: 546.2,
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
        ],
      },
    },
    {
      id: 'end_0',
      type: 'end',
      meta: {
        position: {
          x: 2968,
          y: 601.2,
        },
      },
      data: {
        title: 'End',
        inputsValues: {
          success: {
            type: 'constant',
            content: true,
            schema: {
              type: 'boolean',
            },
          },
          query: {
            type: 'ref',
            content: ['start_0', 'query'],
          },
        },
        inputs: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
            },
            query: {
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
          x: 180,
          y: 775.2,
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
      id: 'http_rDGIH',
      type: 'http',
      meta: {
        position: {
          x: 640,
          y: 421.35,
        },
      },
      data: {
        title: 'HTTP_1',
        outputs: {
          type: 'object',
          properties: {
            body: {
              type: 'string',
            },
            headers: {
              type: 'object',
            },
            statusCode: {
              type: 'integer',
            },
          },
        },
        api: {
          method: 'GET',
          url: {
            type: 'template',
            content: '',
          },
        },
        body: {
          bodyType: 'JSON',
        },
        timeout: {
          timeout: 10000,
          retryTimes: 1,
        },
      },
    },
    {
      id: 'loop_Ycnsk',
      type: 'loop',
      meta: {
        position: {
          x: 1460,
          y: 0,
        },
      },
      data: {
        title: 'Loop_1',
        loopFor: {
          type: 'ref',
          content: ['start_0', 'array_obj'],
        },
        loopOutputs: {
          acm: {
            type: 'ref',
            content: ['llm_6aSyo', 'result'],
          },
        },
        outputs: {
          type: 'object',
          required: [],
          properties: {
            acm: {
              type: 'array',
              items: {
                type: 'string',
              },
            },
          },
        },
      },
      blocks: [
        {
          id: 'llm_6aSyo',
          type: 'llm',
          meta: {
            position: {
              x: 344,
              y: 0,
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
                type: 'template',
                content: '# Role\nYou are an AI assistant.\n',
              },
              prompt: {
                type: 'template',
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
              x: 804,
              y: 0,
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
                type: 'template',
                content: '# Role\nYou are an AI assistant.\n',
              },
              prompt: {
                type: 'template',
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
          id: 'block_start_PUDtS',
          type: 'block-start',
          meta: {
            position: {
              x: 32,
              y: 167.1,
            },
          },
          data: {},
        },
        {
          id: 'block_end_leBbs',
          type: 'block-end',
          meta: {
            position: {
              x: 1116,
              y: 167.1,
            },
          },
          data: {},
        },
      ],
      edges: [
        {
          sourceNodeID: 'block_start_PUDtS',
          targetNodeID: 'llm_6aSyo',
        },
        {
          sourceNodeID: 'llm_6aSyo',
          targetNodeID: 'llm_ZqKlP',
        },
        {
          sourceNodeID: 'llm_ZqKlP',
          targetNodeID: 'block_end_leBbs',
        },
      ],
    },
    {
      id: 'group_nYl6D',
      type: 'group',
      meta: {
        position: {
          x: 1624,
          y: 698.2,
        },
      },
      data: {
        parentID: 'root',
        blockIDs: ['llm_8--A3', 'llm_vTyMa'],
      },
    },
    {
      id: 'llm_8--A3',
      type: 'llm',
      meta: {
        position: {
          x: 180,
          y: 0,
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
            type: 'template',
            content: '# Role\nYou are an AI assistant.\n',
          },
          prompt: {
            type: 'template',
            content: '# User Input\nquery:{{start_0.query}}\nenable:{{start_0.enable}}',
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
          x: 640,
          y: 10,
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
            type: 'template',
            content: '# Role\nYou are an AI assistant.\n',
          },
          prompt: {
            type: 'template',
            content: '# LLM Input\nresult:{{llm_8--A3.result}}',
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
      sourceNodeID: 'start_0',
      targetNodeID: 'http_rDGIH',
    },
    {
      sourceNodeID: 'http_rDGIH',
      targetNodeID: 'condition_0',
    },
    {
      sourceNodeID: 'condition_0',
      targetNodeID: 'loop_Ycnsk',
      sourcePortID: 'if_0',
    },
    {
      sourceNodeID: 'condition_0',
      targetNodeID: 'llm_8--A3',
      sourcePortID: 'else',
    },
    {
      sourceNodeID: 'llm_vTyMa',
      targetNodeID: 'end_0',
    },
    {
      sourceNodeID: 'loop_Ycnsk',
      targetNodeID: 'end_0',
    },
    {
      sourceNodeID: 'llm_8--A3',
      targetNodeID: 'llm_vTyMa',
    },
  ],
  globalVariable: {
    type: 'object',
    required: [],
    properties: {
      userId: {
        type: 'string',
      },
    },
  },
};
