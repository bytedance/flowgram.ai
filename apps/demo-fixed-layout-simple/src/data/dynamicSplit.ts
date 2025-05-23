import { FlowDocumentJSON } from '@flowgram.ai/fixed-layout-editor';

export const dynamicSplit: FlowDocumentJSON = {
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
      id: 'dynamicSplit_0',
      type: 'dynamicSplit',
      data: {
        title: 'DynamicSplit',
      },
      blocks: [
        {
          id: 'branch_0',
          type: 'block',
          data: {
            title: 'Branch 0',
          },
        },
        {
          id: 'branch_1',
          type: 'block',
          data: {
            title: 'Branch 1',
          },
          blocks: [],
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
