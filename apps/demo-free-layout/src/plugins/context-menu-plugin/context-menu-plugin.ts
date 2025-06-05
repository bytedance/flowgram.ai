import {
  definePluginCreator,
  PluginCreator,
  FreeLayoutPluginContext,
} from '@flowgram.ai/free-layout-editor';

import { ContextMenuLayer } from './context-menu-layer';

export interface ContextMenuPluginOptions {}

/**
 * Creates a plugin of contextmenu
 * @param ctx - The plugin context, containing the document and other relevant information.
 * @param options - Plugin options, currently an empty object.
 */
export const createContextMenuPlugin: PluginCreator<ContextMenuPluginOptions> = definePluginCreator<
  ContextMenuPluginOptions,
  FreeLayoutPluginContext
>({
  onInit(ctx, options) {
    ctx.playground.registerLayer(ContextMenuLayer);
  },
});
