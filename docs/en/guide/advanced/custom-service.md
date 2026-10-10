# Custom Service

In business, it is necessary to abstract singleton services for easy plug-in management.

```tsx pure
import { useMemo } from 'react';
import { FlowDocument, type FixedLayoutProps, inject, injectable } from '@flowgram.ai/fixed-layout-editor'

/**
 * Docs: https://inversify.io/docs/introduction/getting-started/
 * Warning: Use decorator legacy
 *   // rsbuild.config.ts
 *   {
 *     source: {
 *       decorators: {
 *         version: 'legacy'
 *       }
 *     }
 *   }
 * Usage:
 *  1.
 *    const myService = useService(MyService)
 *    myService.save()
 *  2.
 *    const myService = useClientContext().get(MyService)
 *  3.
 *    const myService = node.getService(MyService)
 */
@injectable()
class MyService {
  // Dependency injection of singleton module
  @inject(FlowDocument) flowDocument: FlowDocument
  // ...
}

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
