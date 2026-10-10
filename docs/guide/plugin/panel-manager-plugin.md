import { PackageManagerTabs } from '@theme';

# @flowgram.ai/panel-manager-plugin

管理各类面板的插件。

## 功能

* 基于该插件可以低成本的在画布的右侧和底部以 React 组件形式接入自定义面板

* 无需复杂的样式适配，底层自动计算面板的限位和布局

* 自动管理面板队列的出入

![Preview](@/public/plugin/panel-manager-1.png)

## 快速开始

1. 安装

<PackageManagerTabs command="install @flowgram.ai/panel-manager-plugin" />

2. 注册插件

插件的注册方法和 flowgram 的其他插件基本相同，只需要保证不要重复创建以及最终传入到对应的 LayoutEditorProvider 即可

```tsx
import { createPanelManagerPlugin } from '@flowgram.ai/panel-manager-plugin';

const editorProps = useMemo(() => ({
  plugins: () => [createPanelManagerPlugin({})]
}), []);

return (
  <FreeLayoutEditorProvider {...editorProps}>
    <EditorRenderer />
  </FreeLayoutEditorProvider>
)
```

3. 注册面板组件

面板的注册需要唯一的 `key` 以及返回 ReactNode 的渲染函数 `render`

这里以节点表单面板为例：

```tsx pure
import { type PanelFactory } from '@flowgram.ai/panel-manager-plugin';

export const NODE_FORM_PANEL = 'node-form-panel';
export const nodeFormPanelFactory: PanelFactory<NodeFormPanelProps> = {
  key: NODE_FORM_PANEL,
  defaultSize: 400,
  render: (props: NodeFormPanelProps) => <NodeFormPanel {...props} />
}
```

将定义好的对象传入插件中：

```ts pure
createPanelManagerPlugin({
  factories: [nodeFormPanelFactory],
  getPopupContainer: (ctx) => ctx.playground.node.parentNode,
  autoResize: true
})
```

4. 打开/关闭面板

面板的打开关闭通过 PanelManager 的实例控制：

```ts
import { PanelManager } from '@flowgram.ai/panel-manager-plugin';

class NodeFormService {
  @inject(PanelManager): panelManager: PanelManager;

  openPanel(nodeId: string) {
    this.panelManager.open(NODE_FORM_PANEL, 'right', {
      props: {
        nodeId
      }
    })
  }
  closePanel() {
    this.panelManager.close(NODE_FORM_PANEL)
  }
}
```

除此之外也可以在 react 组件中以 hook 的方式获取实例：

```tsx
import { usePanelManager } from '@flowgram.ai/panel-manager-plugin';

const panelManager = usePanelManager();

<button
  onClick={() => panelManager.open(TEST_RUN_FORM_PANEL, 'right')}
>
  试运行
</button>
```
