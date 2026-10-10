# useClientContext

Provides access to the canvas context within React. Currently, there are some differences between fixed layout and free layout.

## Fixed Layout

* Return: [FixedLayoutPluginContext](https://flowgram.ai/auto-docs/fixed-layout-editor/interfaces/FixedLayoutPluginContext.html)

```ts pure
import { useClientContext } from '@flowgram.ai/fixed-layout-editor'
const ctx = useClientContext()
```

## Free Layout

* Return: [FreeLayoutPluginContext](https://flowgram.ai/auto-docs/free-layout-editor/interfaces/FreeLayoutPluginContext.html)

```ts pure
import { useClientContext } from '@flowgram.ai/free-layout-editor'
const ctx = useClientContext()
```
