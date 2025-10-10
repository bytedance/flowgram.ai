# Custom Plugin

## Plugin Lifecycle Explanation

```tsx pure
/**
 * from: https://github.com/bytedance/flowgram.ai/blob/main/packages/canvas-engine/core/src/plugin/plugin.ts
 */
import { ContainerModule, interfaces } from 'inversify';

export interface PluginBindConfig {
  bind: interfaces.Bind;
  unbind: interfaces.Unbind;
  isBound: interfaces.IsBound;
  rebind: interfaces.Rebind;
}
export interface PluginConfig<Opts, CTX extends PluginContext = PluginContext> {
  /**
   * Plugin IOC registration, equivalent to containerModule
   * @param ctx
   */
  onBind?: (bindConfig: PluginBindConfig, opts: Opts) => void;
  /**
   * Canvas registration phase
   */
  onInit?: (ctx: CTX, opts: Opts) => void;
  /**
   * Canvas preparation phase, generally used for DOM event registration, etc.
   */
  onReady?: (ctx: CTX, opts: Opts) => void;
  /**
   * Canvas destruction phase
   */
  onDispose?: (ctx: CTX, opts: Opts) => void;
  /**
   * After all layers of the canvas are rendered
   */
  onAllLayersRendered?: (ctx: CTX, opts: Opts) => void;
  /**
   * IOC module, used for more low - level plugin extensions
   */
  containerModules?: interfaces.ContainerModule[];
}

```

## Create a Plugin

```tsx pure
/**
 * If you want the plugin to be usable in both fixed and free layouts, please use
 *  import { definePluginCreator } from '@flowgram.ai/core'
 */
import { definePluginCreator, FixedLayoutPluginContext } from '@flowgram.ai/fixed-layout-editor'

export interface MyPluginOptions {
  opt1: string;
}

export const createMyPlugin = definePluginCreator<MyPluginOptions, FixedLayoutPluginContext>({
  onBind: (bindConfig, opts) => {
    // Register the IOC module. See Custom Service for how to define a Service.
    bindConfig.bind(MyService).toSelf().inSingletonScope()
  },
  onInit: (ctx, opts) => {
    // Plugin configuration
    console.log(opts.opt1)
    // ctx corresponds to FixedLayoutPluginContext or FreeLayoutPluginContext
    console.log(ctx.document)
    console.log(ctx.playground)
    console.log(ctx.get<MyService>(MyService)) // Get the IOC module
  },
});
```

## Add a Plugin

```tsx pure title="use-editor-props.ts"

// EditorProps
{
  plugins: () => [
    createMyPlugin({
      opt1: 'xxx'
    })
  ]
}
```
