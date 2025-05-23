import { FlowDocumentJSON } from '@flowgram.ai/fixed-layout-editor';

export const loop: FlowDocumentJSON = {
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
      id: 'loop_0',
      type: 'loop',
      data: {
        title: 'Loop',
      },
      blocks: [
        {
          id: 'branch_0',
          type: 'block',
          data: {
            title: 'Branch 0',
          },
          blocks: [
            {
              id: 'custom',
              type: 'custom',
              data: {
                title: 'Custom',
              },
            },
          ],
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
