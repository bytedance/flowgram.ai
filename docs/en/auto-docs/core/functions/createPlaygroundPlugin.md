# Function: createPlaygroundPlugin

**createPlaygroundPlugin**<`CTX`>(`options`): [`Plugin`](/en/auto-docs/core/variables/Plugin-1.md)<`undefined`>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `CTX` | extends [`PluginContext`](/en/auto-docs/core/variables/PluginContext-1.md) = [`PluginContext`](/en/auto-docs/core/variables/PluginContext-1.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`PluginConfig`](/en/auto-docs/core/interfaces/PluginConfig.md)<`undefined`, `CTX`> |

#### Returns

[`Plugin`](/en/auto-docs/core/variables/Plugin-1.md)<`undefined`>

**`Example`**

```ts
createPlaygroundPlugin({
   // IOC 注册
   onBind(bind) {
     bind('xxx').toSelf().inSingletonScope()
   },
   // 画布初始化
   onInit(ctx) {
     ctx.playground.registerLayer(MyLayer)
   },
   // 画布销毁
   onDispose(ctx) {
   },
   // IOC 模块
   containerModules: [new ContainerModule(() => {})]
})
```
