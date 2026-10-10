# 自定义插件

## 插件的生命周期说明

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
   * 插件 IOC 注册, 等价于 containerModule
   * @param ctx
   */
  onBind?: (bindConfig: PluginBindConfig, opts: Opts) => void;
  /**
   * 画布注册阶段
   */
  onInit?: (ctx: CTX, opts: Opts) => void;
  /**
   * 画布准备阶段，一般用于 dom 事件注册等
   */
  onReady?: (ctx: CTX, opts: Opts) => void;
  /**
   * 画布销毁阶段
   */
  onDispose?: (ctx: CTX, opts: Opts) => void;
  /**
   * 画布所有 layer 渲染结束
   */
  onAllLayersRendered?: (ctx: CTX, opts: Opts) => void;
  /**
   * IOC 模块，用于更底层的插件扩展
   */
  containerModules?: interfaces.ContainerModule[];
}

```

## 创建插件

```tsx pure
/**
 * 如果希望插件固定布局和自由布局都能使用， 请只用
*  import { definePluginCreator } from '@flowgram.ai/core'
 */
import { definePluginCreator, FixedLayoutPluginContext } from '@flowgram.ai/fixed-layout-editor'

export interface MyPluginOptions {
  opt1: string;
}

export const createMyPlugin = definePluginCreator<MyPluginOptions, FixedLayoutPluginContext>({
  onBind: (bindConfig, opts) => {
    // 注册 IOC 模块, Service 如何定义 见 自定义 Service
    bindConfig.bind(MyService).toSelf().inSingletonScope()
  },
  onInit: (ctx, opts) => {
    // 插件配置
    console.log(opts.opt1)
    // ctx 对应 FixedLayoutPluginContext 或者 FreeLayoutPluginContext
    console.log(ctx.document)
    console.log(ctx.playground)
    console.log(ctx.get<MyService>(MyService)) // 获取 IOC 模块
  },
});
```

## 添加插件

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
