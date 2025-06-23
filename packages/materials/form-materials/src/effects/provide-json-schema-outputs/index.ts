import {
  ASTFactory,
  EffectOptions,
  FlowNodeRegistry,
  createEffectFromVariableProvider,
  getNodeForm,
} from '@flowgram.ai/editor';

import { JsonSchemaUtils } from '../../utils';
import { IJsonSchema } from '../../typings';

export const provideJsonSchemaOutputs: EffectOptions[] = createEffectFromVariableProvider({
  parse: (value: IJsonSchema, ctx) => [
    ASTFactory.createVariableDeclaration({
      key: `${ctx.node.id}`,
      meta: {
        title: getNodeForm(ctx.node)?.getValueIn('title') || ctx.node.id,
        icon: ctx.node.getNodeRegistry<FlowNodeRegistry>().info?.icon,
      },
      type: JsonSchemaUtils.schemaToAST(value),
    }),
  ],
});
