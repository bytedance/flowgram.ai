import { FlowDocumentJSON } from '@flowgram.ai/fixed-layout-editor';

export const mindmap: FlowDocumentJSON = {
  nodes: [
    {
      id: 'multiInputs_0',
      type: 'multiInputs',
      blocks: [
        {
          id: 'input_0',
          type: 'input',
          data: {
            title: 'input_0',
          },
        },
        {
          id: 'input_1',
          type: 'input',
          data: {
            title: 'input_1',
          },
        },
        {
          id: 'input_3',
          type: 'input',
          data: {
            title: 'input_3',
          },
        },
      ],
    },
    {
      id: 'multiOutputs_0',
      type: 'multiOutputs',
      data: {
        title: 'mindNode_0',
      },
      blocks: [
        {
          id: 'output_0',
          type: 'output',
          data: {
            title: 'output_0',
          },
        },
        {
          id: 'multiOutputs_1',
          type: 'multiOutputs',
          data: {
            title: 'mindNode_1',
          },
          blocks: [
            {
              id: 'output_1',
              type: 'output',
              data: {
                title: 'output_1',
              },
            },
            {
              id: 'output_2',
              type: 'output',
              data: {
                title: 'output_2',
              },
            },
            {
              id: 'output_3',
              type: 'output',
              data: {
                title: 'output_3',
              },
            },
          ],
        },
        {
          id: 'output_4',
          type: 'output',
          data: {
            title: 'output_4',
          },
        },
      ],
    },
  ],
};
