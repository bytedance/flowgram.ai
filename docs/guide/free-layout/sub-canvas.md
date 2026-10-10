# 子画布

<img loading="lazy" className="invert-img" src="/free-layout/loop2.png" />

详细代码见 [自由布局最佳实践](/examples/free-layout/free-feature-overview.md)

## 添加子画布插件

```tsx pure

import { createContainerNodePlugin } from '@flowgram.ai/free-container-plugin';

function App() {
  const editorProps = {
    plugins: () => [
      createContainerNodePlugin({}),
    ]
    // ..others
  }
  return (
    <FreeLayoutEditorProvider {...editorProps}>
      <EditorRenderer className="demo-editor" />
    </FreeLayoutEditorProvider>
  )
}
```

## 定义子画布节点

```tsx pure
import { SubCanvasRender } from '@flowgram.ai/free-container-plugin';

export const LoopNodeRegistry: FlowNodeRegistry = {
  type: 'loop',
  info: {
    icon: iconLoop,
    description:
      'Used to repeatedly execute a series of tasks by setting the number of iterations and logic.',
  },
  meta: {
    /**
     * 子画布标记
     */
    isContainer: true,
    /**
    * 子画布默认大小设置
     */
    size: {
      width: 560,
      height: 400,
    },
    /**
    * 子画布 padding 设置
     */
    padding: () => ({ // 容器 padding 设置
      top: 150,
      bottom: 100,
      left: 100,
      right: 100,
    }),
    /**
      * 控制子画布内的节点选中状态
      */
    selectable(node: WorkflowNodeEntity, mousePos?: PositionSchema): boolean {
      if (!mousePos) {
        return true;
      }
      const transform = node.getData<FlowNodeTransformData>(FlowNodeTransformData);
      // 鼠标开始时所在位置不包括当前节点时才可选中
      return !transform.bounds.contains(mousePos.x, mousePos.y);
    },
  },
  formMeta: {
    render: () => (
      <div>
        { /* others */ }
        <SubCanvasRender />
      </div>
    )
  }
}
```
