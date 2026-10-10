# useService

Get all singleton modules of the underlying [IOC](/en/guide/concepts/ioc.md)

```ts pure

const playground = useService<Playground>(Playground)
const flowDocument = useService<FlowDocument>(FlowDocument)
const historyService = useService<HistoryService>(HistoryService)

// Equivalent to
const playground1 = useClientContext().playground

// Equivalent to
const playground3 = useClientContext().get<Playground>(Playground)

```

## Custom Service

```tsx pure
/**
 *  inversify: https://github.com/inversify/InversifyJS
 */
import { injectable } from 'inversify'

@injectable()
class MyService {
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
