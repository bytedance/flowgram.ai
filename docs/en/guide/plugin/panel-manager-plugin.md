import { PackageManagerTabs } from '@theme';

# @flowgram.ai/panel-manager-plugin

A plugin for managing different types of panels.

## Features

* Easily integrate custom panels on the right or bottom of the canvas as React components with minimal setup.

* No need for complex style adaptations—the plugin automatically calculates panel boundaries and layout.

* Automatically manages the entry and exit of the panel queue.

![Preview](@/public/plugin/panel-manager-1.png)

## Quick Start

1. Installation

<PackageManagerTabs command="install @flowgram.ai/panel-manager-plugin" />

2. Register the plugin

The registration process is basically the same as other Flowgram plugins. Just make sure you don’t create duplicates and eventually pass it into the corresponding `LayoutEditorProvider`.

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

3. Register panel components

A panel registration requires a unique key and a render function render that returns a ReactNode.

For example, here’s a node form panel:

```tsx
import { type PanelFactory } from '@flowgram.ai/panel-manager-plugin';

export const NODE_FORM_PANEL = 'node-form-panel';
export const nodeFormPanelFactory: PanelFactory<NodeFormPanelProps> = {
  key: NODE_FORM_PANEL,
  defaultSize: 400,
  render: (props: NodeFormPanelProps) => <NodeFormPanel {...props} />
}
```

Pass the defined object into the plugin:

```ts
createPanelManagerPlugin({
  factories: [nodeFormPanelFactory]
  getPopupContainer: (ctx) => ctx.playground.node.parentNode,
  autoResize: true
})
```

4. Open/close panels

Opening and closing panels is handled through an instance of PanelManager:

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

Alternatively, you can also access the instance in a React component via a hook:

```tsx
import { usePanelManager } from '@flowgram.ai/panel-manager-plugin';

const panelManager = usePanelManager();

<button
  onClick={() => panelManager.open(TEST_RUN_FORM_PANEL, 'right')}
>
  Test Run
</button>
```
