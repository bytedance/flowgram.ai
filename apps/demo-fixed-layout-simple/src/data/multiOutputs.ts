import { FlowDocumentJSON } from '@flowgram.ai/fixed-layout-editor';

export const multiOutputs: FlowDocumentJSON = {
  nodes: [
    {
      id: 'start_0',
      type: 'start',
      data: {
        title: 'Start',
      },
      blocks: [],
    },
    {
      id: 'multiOutputs_0',
      type: 'multiOutputs',
      data: {
        title: 'MultiOutputs',
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
      ],
    },
  ],
};
