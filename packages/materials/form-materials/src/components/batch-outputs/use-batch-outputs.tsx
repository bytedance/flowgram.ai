import { FlowNodeEntity, useEntityFromContext } from '@flowgram.ai/editor';

export function useBatchOutputVariables() {
  const node: FlowNodeEntity = useEntityFromContext();

  // listen to tree change which might cause change of children of loop
}
