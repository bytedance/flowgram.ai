# useClientContext

提供在 react 内部访问画布的上下文, 目前固定布局和 自由布局有一定区别

## 固定布局

* Return: [FixedLayoutPluginContext](https://flowgram.ai/auto-docs/fixed-layout-editor/interfaces/FixedLayoutPluginContext.html)

```ts pure
import { useClientContext } from '@flowgram.ai/fixed-layout-editor'
const ctx = useClientContext()
console.log(ctx.operation) // FlowOperationService 操作服务
console.log(ctx.document) // FlowDocument 数据文档
console.log(ctx.playground) // Playground 画布
console.log(ctx.history) // HistoryService 历史记录
console.log(ctx.clipboard) // ClipboardService 剪贴板
console.log(ctx.container) // Inversify IOC 容器
console.log(ctx.get(MyService)) // 获取任意的 IOC 模块，详细见 自定义 Service
```

## 自由布局

* Return: [FreeLayoutPluginContext](https://flowgram.ai/auto-docs/free-layout-editor/interfaces/FreeLayoutPluginContext.html)

```ts pure
import { useClientContext } from '@flowgram.ai/free-layout-editor'
const ctx = useClientContext()
console.log(ctx.document) // WorkflowDocument 数据文档
console.log(ctx.playground) // Playground 画布
console.log(ctx.history) // HistoryService 历史记录
console.log(ctx.selection) // SelectionService 选择器服务
console.log(ctx.clipboard) // ClipboardService 剪贴板
console.log(ctx.container) // Inversify IOC 容器
console.log(ctx.get(MyService)) // 获取任意的 IOC 模块，详细见 自定义 Service
```
