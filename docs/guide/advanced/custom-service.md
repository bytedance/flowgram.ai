# 自定义 Service

业务中需要抽象出单例服务便于插件化管理

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
  // 依赖注入单例模块
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
