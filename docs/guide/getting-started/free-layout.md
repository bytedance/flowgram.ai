# 自由布局

import {
  PackageManagerTabs
  // @ts-ignore
} from '@theme';
import { CodePreview } from '@components/code-preview';
import step1 from '@components/free-examples/step-1.tsx?raw';
import step2 from '@components/free-examples/step-2.tsx?raw';
import step3 from '@components/free-examples/step-3.tsx?raw';
import step4 from '@components/free-examples/step-4.tsx?raw';
import step5App from '@components/free-examples/step-5/app.tsx?raw';
import step5InitialData from '@components/free-examples/step-5/initial-data.ts?raw';
import step5UseEditorProps from '@components/free-examples/step-5/use-editor-props.tsx?raw';
import step5NodeRender from '@components/free-examples/step-5/node-render.tsx?raw';
import step5NodeRegistries from '@components/free-examples/step-5/node-registries.tsx?raw';
import step6App from '@components/free-examples/step-6/app.tsx?raw';
import step6InitialData from '@components/free-examples/step-6/initial-data.ts?raw';
import step6UseEditorProps from '@components/free-examples/step-6/use-editor-props.tsx?raw';
import step6NodeRender from '@components/free-examples/step-6/node-render.tsx?raw';
import step6NodeRegistries from '@components/free-examples/step-6/node-registries.tsx?raw';
import step7App from '@components/free-examples/step-7/app.tsx?raw';
import step7InitialData from '@components/free-examples/step-7/initial-data.ts?raw';
import step7UseEditorProps from '@components/free-examples/step-7/use-editor-props.tsx?raw';
import step7NodeRender from '@components/free-examples/step-7/node-render.tsx?raw';
import step7NodeRegistries from '@components/free-examples/step-7/node-registries.tsx?raw';
import step7Tools from '@components/free-examples/step-7/tools.tsx?raw';
import step7AddNode from '@components/free-examples/step-7/add-node.tsx?raw';
import step7Minimap from '@components/free-examples/step-7/minimap.tsx?raw';

## Step.0 - 安装依赖

1. 安装编辑器包

<PackageManagerTabs
  command={{
"npm": "npm install @flowgram.ai/free-layout-editor",
"pnpm": "pnpm add @flowgram.ai/free-layout-editor",
"yarn": "yarn add @flowgram.ai/free-layout-editor",
"bun": "bun add @flowgram.ai/free-layout-editor",
}}
/>

2. 安装 styled-components（若尚未安装）

<PackageManagerTabs
  command={{
"npm": "npm install styled-components",
"pnpm": "pnpm add styled-components",
"yarn": "yarn add styled-components",
"bun": "bun add styled-components",
}}
/>

## Step.1 - 引入画布组件

1. 引入样式文件，确保基础样式生效：
   ```tsx
   import '@flowgram.ai/free-layout-editor/index.css';
   ```

2. 使用 `FreeLayoutEditorProvider` 提供编辑器上下文，`EditorRenderer` 负责渲染画布：
   ```tsx
   const FlowGramApp = () => (
     <FreeLayoutEditorProvider>
       <EditorRenderer />
     </FreeLayoutEditorProvider>
   );
   ```

3. 其余文件保持默认导出即可。

> 预期效果：页面加载后仅展示一个空白画布，无任何节点或连线。

<CodePreview
  files={{
  '/App.tsx': step1
}}
/>

## Step.2 - 实现节点组件并注册

1. 导入节点渲染相关 Hook 与组件：
   * `useNodeRender`：获取节点上下文（如表单）。
   * `WorkflowNodeProps` & `WorkflowNodeRenderer`：定义并渲染节点外壳。

2. 创建 `NodeRender` 组件，自定义节点尺寸与样式：
   ```tsx
   const NodeRender = (props: WorkflowNodeProps) => {
     const { form } = useNodeRender();
     return (
       <WorkflowNodeRenderer
         style={{ width: 280, height: 88, background: '#fff', borderRadius: 8, ... }}
         node={props.node}
       >
         {form?.render()}
       </WorkflowNodeRenderer>
     );
   };
   ```

3. 在 `FreeLayoutEditorProvider` 中注册：
   * `materials.renderDefaultNode` 指定默认节点渲染器。
   * `nodeRegistries` 声明可用节点类型（示例为 `custom`）。
   * `initialData` 提供一个初始节点，位置 `{ x: 250, y: 100 }`。

> 预期效果：画布中出现一个可拖拽的自定义样式节点。

<CodePreview
  files={{
  '/App.tsx': step2
}}
/>

## Step.3 - 添加多节点与连线

1. 新增 `onAllLayersRendered` 回调，在所有图层渲染完成后调用 `ctx.tools.fitView(false)`，让画布自动适配内容。

2. 新增 `canDeleteNode` & `canDeleteLine` 回调，返回 `true` 允许删除节点与连线。

3. 扩展 `initialData`：
   * 再增加一个同类型节点，位置 `{ x: 400, y: 0 }`。
   * 在 `edges` 数组中添加一条连线，连接节点 `1` 与节点 `2`。

> 预期效果：
>
> • 画布展示两个相连节点，并自动居中/缩放到合适视图。
>
> • 选中任意节点或连线，键盘删除键可删除选中元素。

<CodePreview
  files={{
  '/App.tsx': step3
}}
/>

## Step.4 - 引入插件

:::info

* `@flowgram.ai/free-snap-plugin`：节点对齐插件，使节点在网格上对齐。
* `@flowgram.ai/minimap-plugin`：迷你地图插件，提供画布的小地图视图。

:::

1. 安装插件依赖

<PackageManagerTabs
  command={{
"npm": "npm install @flowgram.ai/free-snap-plugin @flowgram.ai/minimap-plugin",
"pnpm": "pnpm add @flowgram.ai/free-snap-plugin @flowgram.ai/minimap-plugin",
"yarn": "yarn add @flowgram.ai/free-snap-plugin @flowgram.ai/minimap-plugin",
"bun": "bun add @flowgram.ai/free-snap-plugin @flowgram.ai/minimap-plugin",
}}
/>

2. 从对应包导入插件创建函数：

* `createFreeSnapPlugin` 用于节点网格对齐。
* `createMinimapPlugin` 用于生成画布缩略图。

3. 在 `FreeLayoutEditorProvider` 的 `plugins` 属性中注册插件：

```tsx
plugins={() => [
  createMinimapPlugin({}),
  createFreeSnapPlugin({})
]}
```

> 预期效果:
>
> • 画布右上角出现可拖拽/缩放的迷你地图，点击或拖拽缩略图可快速定位主画布。
>
> • 拖拽节点时，节点会自动吸附到附近节点，便于快速对齐。

<CodePreview
  files={{
  '/App.tsx': step4
}}
/>

## Step.5 - 拆分文件

为避免单个文件代码行数过长，我们需要将原本集中在一个组件中的编辑器配置、节点渲染、初始化数据等拆分为独立文件，便于维护、复用与协作。

```sh
- use-editor-props.ts # 画布配置
- node-render.tsx # 节点渲染
- initial-data.ts # 初始化数据
- node-registries.ts # 节点配置
- App.tsx # 画布入口
```

文件职责说明

* `use-editor-props.tsx`：集中管理 FreeLayoutEditorProvider 的所有 props（插件、视图适配、材料、节点注册与初始数据）。
* `node-render.tsx`：定义自定义节点渲染器 NodeRender，负责外观与内部表单渲染。
* `initial-data.ts`：提供初始节点与连线。当前示例包含 5 个 custom 节点及多条连接关系。
* `node-registries.tsx`：声明节点类型集合（示例为仅注册 'custom'）。
* `App.tsx`：应用入口，从 useEditorProps 获取配置并挂载 EditorRenderer。

> 预期效果: 通过拆分文件，代码结构更清晰、职责更明确，后续代码更易扩展

<CodePreview
  files={{
  '/App.tsx': step5App,
  '/use-editor-props.tsx': step5UseEditorProps,
  '/initial-data.ts': step5InitialData,
  '/node-registries.tsx': step5NodeRegistries,
  '/node-render.tsx': step5NodeRender,
}}
/>

## Step.6 - 接入表单与历史记录

1. 节点注册与端口配置

* `start`：起始节点，不可删除，默认只有输出端口。
* `end`：结束节点，不可删除，默认只有输入端口。
* `custom`：普通节点，默认同时拥有输入与输出端口。

2. 启用表单与历史记录

在 `useEditorProps.tsx` 中：

* `nodeEngine.enable = true`：开启节点引擎，允许为节点类型配置 `formMeta`。
* `history.enable = true` 与 `history.enableChangeNode = true`：启用撤销/重做，并监听节点数据变化（例如表单变更）。
* `getNodeDefaultRegistry(type)`：为未显式注册的类型提供默认配置：
  * `meta.defaultExpanded = true`：默认展开节点的内部内容区域。
  * `formMeta.render`：渲染表单。本示例通过 `<Field<string> name="title">` 渲染标题字段。

3. 初始化数据与渲染

* 在 `initial-data.ts` 中，为每个节点设置 `data.title`（如 `Start Node`、`Custom Node A/B/C`、`End Node`）。
* `NodeRender` 中的 `form?.render()` 会将表单内容渲染进节点外壳，展示各节点的标题。

> 预期效果:
>
> • 画布包含 `start`、多个 `custom` 与 `end` 节点，连接关系与初始数据一致。
>
> • 每个节点显示其 `title`；选中节点时可扩展为展示更多表单字段与交互。
>
> • 撤销/重做快捷键可用，可通过删除、移动节点操作进行验证。

<CodePreview
  activeFile="/use-editor-props.tsx"
  files={{
  '/App.tsx': step6App,
  '/use-editor-props.tsx': step6UseEditorProps,
  '/initial-data.ts': step6InitialData,
  '/node-registries.tsx': step6NodeRegistries,
  '/node-render.tsx': step6NodeRender,
}}
/>

## Step.7 - 创建工具栏

1. 引入工具栏组件

* 在 `App.tsx` 中引入 `<Tools />`，与 `<EditorRenderer />` 同级放置于 `FreeLayoutEditorProvider` 内，使其能够访问编辑器上下文与工具方法。

2. 通过工具方法操控画布

* 使用 `usePlaygroundTools()` 获取画布操作方法：`zoomin/zoomout`、`fitView`、`autoLayout`、`switchLineType` 等。
* 切换连线样式：通过 `switchLineType` 在 `LineType.BEZIER`（贝塞尔）与 `LineType.LINE_CHART`（折线）之间切换。
* 实时显示缩放比例：读取 `tools.zoom`，展示当前画布缩放百分比。

3. 接入撤销/重做状态

* 使用 `useClientContext()` 获取 `history`，并监听 `history.undoRedoService.onChange` 更新 `canUndo/canRedo` 按钮状态。
* 在 `use-editor-props.tsx` 中确保开启历史：`history.enable = true` 与 `history.enableChangeNode = true`，使撤销/重做对节点数据变化生效。

5. 扩展组件（可选）

* Minimap：通过自定义 `MinimapRender` 容器样式将缩略图固定在右下角，提升定位效率。
* AddNode：提供快速新增节点按钮，通过 `WorkflowDocument.createWorkflowNodeByType` 在画布中心创建并选中节点。

> 预期效果:
>
> • 页面右下角出现工具栏，支持 ZoomIn/ZoomOut、FitView、AutoLayout 等常用操作，实时显示缩放比例。
>
> • 可切换连线样式（贝塞尔/折线），撤销/重做按钮会随历史状态自动启用/禁用。
>
> • 搭配 Minimap 与 AddNode 组件，形成完整的编辑工具区，操作更高效。

<CodePreview
  activeFile="/tools.tsx"
  files={{
  '/App.tsx': step7App,
  '/use-editor-props.tsx': step7UseEditorProps,
  '/initial-data.ts': step7InitialData,
  '/node-registries.tsx': step7NodeRegistries,
  '/tools.tsx': step7Tools,
  '/add-node.tsx': step7AddNode,
  '/minimap.tsx': step7Minimap,
  '/node-render.tsx': step7NodeRender,
}}
/>

## Step.8 - 了解更多

<div
  style={{
display: "grid",
gridTemplateColumns: "1fr 1fr",
gap: "2rem",
marginTop: "1rem",
}}
>
  <div>
    了解更多自由布局用法：

    * [加载与保存](/guide/free-layout/load.md)
    * [节点](/guide/free-layout/node.md)
    * [线条](/guide/free-layout/line.md)
    * [端口](/guide/free-layout/port.md)
    * [子画布](/guide/free-layout/sub-canvas.md)
  </div>

  <div>
    了解 FlowGram.AI 更多功能：

    * [表单](/guide/form/form.md)
    * [变量](/guide/variable/basic.md)
    * [物料](/materials/introduction.md)
    * [运行时](/guide/runtime/introduction.md)
  </div>
</div>
