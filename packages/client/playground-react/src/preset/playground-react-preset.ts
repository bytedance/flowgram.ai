import { createShortcutsPlugin } from '@flowgram.ai/shortcuts-plugin';
import {
  PluginContext,
  PluginsProvider,
  Plugin,
  createPlaygroundPlugin,
  PlaygroundConfig,
  PlaygroundLayer,
} from '@flowgram.ai/core';
import { createBackgroundPlugin } from '@flowgram.ai/background-plugin';

import { PlaygroundReactProps } from './playground-react-props';

export function createPlaygroundReactPreset<CTX extends PluginContext = PluginContext>(
  opts: PlaygroundReactProps<CTX>,
  plugins: Plugin[] = []
): PluginsProvider<CTX> {
  return (ctx: CTX) => {
    plugins = plugins.slice();
    /**
     * 注册背景 (放前面插入), 默认打开
     */
    if (opts.background || opts.background === undefined) {
      const backgroundOptions = typeof opts.background === 'object' ? opts.background : {};
      plugins.push(createBackgroundPlugin(backgroundOptions));
    }
    /**
     * 注册快捷键
     */
    if (opts.shortcuts) {
      plugins.push(
        createShortcutsPlugin({
          registerShortcuts: (registry) => opts.shortcuts!(registry, ctx),
        })
      );
    }
    /**
     * 注册三方插件
     */
    if (opts.plugins) {
      plugins.push(...opts.plugins(ctx));
    }
    /**
     * 画布生命周期注册
     */
    plugins.push(
      createPlaygroundPlugin<CTX>({
        onBind: (bindConfig) => {
          opts.onBind?.(bindConfig);
        },
        onInit: (ctx) => {
          const playgroundConfig = ctx.get<PlaygroundConfig>(PlaygroundConfig);
          if (opts.playground) {
            if (opts.playground.autoFocus !== undefined) {
              playgroundConfig.autoFocus = opts.playground.autoFocus;
            }
            if (opts.playground.autoResize !== undefined) {
              playgroundConfig.autoResize = opts.playground.autoResize;
            }
          }
          playgroundConfig.autoFocus = false;
          ctx.playground.registerLayer(PlaygroundLayer, opts.playground);
          if (opts.layers) {
            ctx.playground.registerLayers(...opts.layers);
          }
          if (opts.onInit) opts.onInit(ctx);
        },
        onReady(ctx) {
          if (opts.onReady) opts.onReady(ctx);
        },
        onAllLayersRendered() {
          if (opts.onAllLayersRendered) opts.onAllLayersRendered(ctx);
        },
        onDispose() {
          if (opts.onDispose) opts.onDispose(ctx);
        },
        containerModules: opts.containerModules || [],
      })
    );
    return plugins;
  };
}
