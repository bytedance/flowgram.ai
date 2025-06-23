import {
  DataEvent,
  Effect,
  EffectOptions,
  FlowNodeRegistry,
  FlowNodeVariableData,
} from '@flowgram.ai/editor';

export const syncVariableTitle: EffectOptions[] = [
  {
    event: DataEvent.onValueChange,
    effect: (({ value, context }) => {
      context.node.getData(FlowNodeVariableData).allScopes.forEach((_scope) => {
        _scope.output.variables.forEach((_var) => {
          _var.updateMeta({
            title: value || context.node.id,
            icon: context.node.getNodeRegistry<FlowNodeRegistry>().info?.icon,
          });
        });
      });
    }) as Effect,
  },
];
