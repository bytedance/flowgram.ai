# useService

获取底层 [IOC](/guide/concepts/ioc.md) 的所有单例模块

```ts pure

const playground = useService<Playground>(Playground)
const flowDocument = useService<FlowDocument>(FlowDocument)
const historyService = useService<HistoryService>(HistoryService)

// 等价
const playground1 = useClientContext().playground

// 等价
const playground3 = useClientContext().get<Playground>(Playground)

```

## 自定义 Service

```tsx pure
/**
 *  inversify: https://github.com/inversify/InversifyJS
 */
import { injectable, inject } from 'inversify'
import { FlowDocument } from '@flowgram.ai/fixed-layout-editor'

@injectable()
class MyService {
  // 依赖注入单例模块
  @inject(FlowDocument) flowDocument: FlowDocument
  // ...
}

import { useMemo } from 'react';
import { type FixedLayoutProps } from '@flowgram.ai/fixed-layout-editor';

function BaseNode() {
  const mySerivce = useService<MyService>(MyService)
}

export function useEditorProps(
): FixedLayoutProps {
  return useMemo<FixedLayoutProps>(
    () => ({
      // ....other props
      onBind: ({ bind }) => {
        bind(MyService).toSelf().inSingletonScope()
      },
      materials: {
        renderDefaultNode: BaseNode
      }
    }),
    [],
  );
}

```
