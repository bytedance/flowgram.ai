import { FlowDocumentJSON } from '@flowgram.ai/fixed-layout-editor';

export const multiInputs: FlowDocumentJSON = {
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
      id: 'end_0',
      type: 'end',
      data: {
        title: 'End',
      },
    },
  ],
};
