# 固定布局

import {
  PackageManagerTabs
  // @ts-ignore
} from '@theme';
import { FixedLayoutCodePreview } from '@components/code-preview';
import step1 from '@components/fixed-examples/step-1.tsx?raw';
import step2 from '@components/fixed-examples/step-2.tsx?raw';
import step3 from '@components/fixed-examples/step-3.tsx?raw';
import step4 from '@components/fixed-examples/step-4.tsx?raw';
import step5App from '@components/fixed-examples/step-5/app.tsx?raw';
import step5UseEditorProps from '@components/fixed-examples/step-5/use-editor-props.tsx?raw';
import step5InitialData from '@components/fixed-examples/step-5/initial-data.ts?raw';
import step5NodeRegistries from '@components/fixed-examples/step-5/node-registries.tsx?raw';
import step5NodeRender from '@components/fixed-examples/step-5/node-render.tsx?raw';
import step5Adder from '@components/fixed-examples/step-5/adder.tsx?raw';
import step6App from '@components/fixed-examples/step-6/app.tsx?raw';
import step6UseEditorProps from '@components/fixed-examples/step-6/use-editor-props.tsx?raw';
import step6InitialData from '@components/fixed-examples/step-6/initial-data.ts?raw';
import step6NodeRegistries from '@components/fixed-examples/step-6/node-registries.tsx?raw';
import step6NodeRender from '@components/fixed-examples/step-6/node-render.tsx?raw';
import step6Adder from '@components/fixed-examples/step-6/adder.tsx?raw';
import step7App from '@components/fixed-examples/step-7/app.tsx?raw';
import step7UseEditorProps from '@components/fixed-examples/step-7/use-editor-props.tsx?raw';
import step7InitialData from '@components/fixed-examples/step-7/initial-data.ts?raw';
import step7NodeRegistries from '@components/fixed-examples/step-7/node-registries.tsx?raw';
import step7NodeRender from '@components/fixed-examples/step-7/node-render.tsx?raw';
import step7Adder from '@components/fixed-examples/step-7/adder.tsx?raw';
import step7Tools from '@components/fixed-examples/step-7/tools.tsx?raw';
import step7Minimap from '@components/fixed-examples/step-7/minimap.tsx?raw';

## Step.0 - 安装依赖

1. 安装编辑器包

<PackageManagerTabs
  command={{
"npm": "npm install @flowgram.ai/fixed-layout-editor @flowgram.ai/fixed-semi-materials",
"pnpm": "pnpm add @flowgram.ai/fixed-layout-editor @flowgram.ai/fixed-semi-materials",
"yarn": "yarn add @flowgram.ai/fixed-layout-editor @flowgram.ai/fixed-semi-materials",
"bun": "bun add @flowgram.ai/fixed-layout-editor @flowgram.ai/fixed-semi-materials",
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
   import '@flowgram.ai/fixed-layout-editor/index.css';
   ```

2. 使用 `FixedLayoutEditorProvider` 提供编辑器上下文，`EditorRenderer` 负责渲染画布；并通过 `materials.components` 引入默认的固定布局 Semi 组件集：
   ```tsx
   const FlowGramApp = () => (
     <FixedLayoutEditorProvider
       materials={{ components: defaultFixedSemiMaterials }}
     >
       <EditorRenderer />
     </FixedLayoutEditorProvider>
   );
   ```

3. 其余文件保持默认导出即可。

> 预期效果：页面加载后仅展示一个空白画布，无任何节点或连线。

<FixedLayoutCodePreview
  files={{
  '/App.tsx': step1
}}
/>

## Step.2 - 实现节点组件

1. 导入节点渲染相关 API：
   * `useNodeRender`：获取节点上下文（如拖拽、悬停、高亮、表单等）。
   * `FlowNodeEntity`：节点实体类型，用于声明 `NodeRender` 的 props。

2. 创建 `NodeRender` 组件，自定义节点尺寸与样式，并接入拖拽与表单渲染：
   ```tsx
   import { useNodeRender, FlowNodeEntity } from '@flowgram.ai/fixed-layout-editor';

   export const NodeRender = ({ node }: { node: FlowNodeEntity }) => {
     const { onMouseEnter, onMouseLeave, startDrag, form, dragging, activated } = useNodeRender();
     return (
       <div
         onMouseEnter={onMouseEnter}
         onMouseLeave={onMouseLeave}
         onMouseDown={(e) => { startDrag(e); e.stopPropagation(); }}
         style={{ width: 280, minHeight: 88, background: '#fff', borderRadius: 8, opacity: dragging ? 0.3 : 1, /* ... */ }}
       >
         {form?.render()}
       </div>
     );
   };
   ```

3. 在 `FixedLayoutEditorProvider` 中注册：
   * `materials.renderDefaultNode` 指定默认节点渲染器为 `NodeRender`。
   * `nodeRegistries` 声明可用节点类型（示例为 `custom`）。
   * `initialData` 提供一个初始节点，类型为 `custom`。

> 预期效果：画布中出现一个可拖拽的自定义样式节点。

<FixedLayoutCodePreview
  files={{
  '/App.tsx': step2
}}
/>

## Step.3 - 自定义添加节点组件与删除节点按钮

1. 为节点添加删除按钮
   * 在 `NodeRender` 中通过 `useClientContext()` 获取 `ctx`，点击按钮调用 `ctx.operation.deleteNode(node)` 删除当前节点。
   * 注意阻止事件冒泡：`e.stopPropagation()`，避免干扰画布的选择/拖拽行为。
   ```tsx
   const ctx = useClientContext();
   <button onClick={(e) => { e.stopPropagation(); ctx.operation.deleteNode(node); }}>×</button>
   ```

2. 自定义添加节点组件 `Adder`
   * 使用 `useService(FlowOperationService)` 与 `usePlayground()` 封装 `handleAdd` 方法：在指定节点之后插入一个新节点，并滚动到视图中心。
   * 基于 `hoverActivated` 切换 UI：悬停时显示加号与更大的点击区域；只读模式下不显示。
   ```tsx
   const { handleAdd } = useAddNode();
   const Adder = ({ from, hoverActivated }) => (
     <div onClick={() => handleAdd({ type: 'custom', id: `custom_${Date.now()}` }, from)}>
       {hoverActivated ? <span>+</span> : null}
     </div>
   );
   ```

3. 在 `materials.components` 中注册 `Adder`
   * 通过 `FlowRendererKey.ADDER` 覆盖默认的“添加节点”渲染器。
   ```tsx
   materials={{
     renderDefaultNode: NodeRender,
     components: { ...defaultFixedSemiMaterials, [FlowRendererKey.ADDER]: Adder },
   }}
   ```

4. 初始化数据与视图适配
   * `initialData` 提供基础流程：`start -> custom -> end`。
   * 在 `onAllLayersRendered` 中调用 `fitView`，让画布自动适配内容：
   ```tsx
   onAllLayersRendered={(ctx) => {
     setTimeout(() => {
       ctx.playground.config.fitView(ctx.document.root.bounds.pad(30));
     }, 10);
   }}
   ```

> 预期效果：
>
> • 画布展示一个由 `start`、`custom`、`end` 组成的基础流程，视图自动居中/缩放到合适范围。
>
> • 鼠标悬停到可添加位置时出现圆形加号按钮，点击即可在当前节点之后新增一个 `custom` 节点，并自动滚动到新节点。
>
> • 每个节点右上角显示“×”删除按钮，点击可删除该节点（只读模式下隐藏添加组件）。

<FixedLayoutCodePreview
  files={{
  '/App.tsx': step3
}}
/>

## Step.4 - 引入插件

:::info

* `@flowgram.ai/minimap-plugin`：迷你地图插件，提供画布的小地图视图。

:::

1. 安装插件依赖

<PackageManagerTabs
  command={{
"npm": "npm install @flowgram.ai/minimap-plugin",
"pnpm": "pnpm add @flowgram.ai/minimap-plugin",
"yarn": "yarn add @flowgram.ai/minimap-plugin",
"bun": "bun add @flowgram.ai/minimap-plugin",
}}
/>

2. 从对应包导入插件创建函数：

* `createMinimapPlugin` 用于生成画布缩略图。

3. 在 `FixedLayoutEditorProvider` 的 `plugins` 属性中注册插件：

```tsx
plugins={() => [
  createMinimapPlugin({
    enableDisplayAllNodes: true,
  })
]}
```

> 预期效果:
>
> • 画布右上角出现可拖拽/缩放的迷你地图，点击或拖拽缩略图可快速定位主画布。
>
> • 启用 `enableDisplayAllNodes: true` 后，迷你地图会显示所有节点，方便在流程较长时快速导航。

<FixedLayoutCodePreview
  files={{
  '/App.tsx': step4
}}
/>

## Step.5 - 拆分文件

为避免单个文件代码行数过长，我们需要将原本集中在一个组件中的编辑器配置、节点渲染、初始化数据等拆分为独立文件，便于维护、复用与协作。

```sh
- use-editor-props.tsx # 画布配置（集中管理 Provider 的 props）
- node-render.tsx      # 节点渲染（含删除按钮）
- initial-data.ts      # 初始化数据（start/custom/end）
- node-registries.tsx  # 节点注册（示例仅注册 'custom'）
- adder.tsx            # 自定义添加节点组件（点击新增 custom 节点）
- App.tsx              # 画布入口（挂载 EditorRenderer）
```

文件职责说明

* `use-editor-props.tsx`：集中管理 FixedLayoutEditorProvider 的所有 props（插件、视图适配、材料、节点注册与初始数据）：
  * `plugins`：注册迷你地图插件 `createMinimapPlugin({ enableDisplayAllNodes: true })`。
  * `onAllLayersRendered`：渲染完成后调用 `fitView`，让画布自动适配内容。
  * `materials`：
    * `renderDefaultNode` 指定默认节点渲染器为 `NodeRender`。
    * `components` 合并 `defaultFixedSemiMaterials`，并用 `[FlowRendererKey.ADDER]: Adder` 覆盖默认添加器。
  * `nodeRegistries` 与 `initialData` 分别来自独立文件。

* `node-render.tsx`：定义自定义节点渲染器 `NodeRender`，设置节点外观并通过 `form?.render()` 渲染内部表单；同时在右上角提供“×”删除按钮（`useClientContext().operation.deleteNode(node)`）。

* `initial-data.ts`：提供基础流程的初始数据，包含 `start -> custom -> end` 三个节点。

* `node-registries.tsx`：声明节点类型集合（示例为仅注册 `'custom'`）。

* `adder.tsx`：实现自定义添加节点组件 `Adder`，悬停时显示加号；点击时通过 `FlowOperationService.addFromNode` 在当前节点之后新增一个 `custom` 节点，并调用 `scrollToView` 自动定位新节点。

* `App.tsx`：应用入口，从 `useEditorProps` 获取配置并挂载 `EditorRenderer`。

> 预期效果：通过拆分文件，代码结构更清晰、职责更明确，后续扩展与团队协作更容易；界面效果与上一节一致（基础流程、删除按钮与添加节点组件可用，且含迷你地图与自动视图适配）。

<FixedLayoutCodePreview
  files={{
  '/App.tsx': step5App,
  '/use-editor-props.tsx': step5UseEditorProps,
  '/initial-data.ts': step5InitialData,
  '/node-registries.tsx': step5NodeRegistries,
  '/node-render.tsx': step5NodeRender,
  '/adder.tsx': step5Adder,
}}
/>

## Step.6 - 接入表单与历史记录

1. 节点注册与扩展

* `condition`：通过 `extend: 'dynamicSplit'` 将其扩展为“分支节点”，并在 `onAdd()` 中返回默认 `blocks`（多分支）。
* `custom`：普通节点，在 `onAdd()` 中为其设置默认 `data.title` 与 `data.content`。
* 可选的 `meta` 配置项可控制节点行为（是否可拖拽、选择、删除、复制、添加等）。

2. 启用表单与历史

在 `use-editor-props.tsx` 中：

* `nodeEngine.enable = true`：开启节点引擎，允许为节点类型配置 `formMeta`。
* `history.enable = true` 与 `history.enableChangeNode = true`：启用撤销/重做，并监听节点数据变化（例如表单字段变更）。
* `history.onApply(ctx)`：在应用历史记录后触发，可用于自动保存（示例中打印 `ctx.document.toJSON()`）。
* `getNodeDefaultRegistry(type)`：为未显式注册的类型提供默认配置：
  * `meta.defaultExpanded = true`：默认展开节点的内部内容区域。
  * `formMeta.render`：渲染表单。本示例通过 `<Field<string> name="title">` 与 `<Field<string> name="content">` 分别展示标题与一个可编辑输入框。
  ```tsx
  getNodeDefaultRegistry(type) {
    return {
      type,
      meta: { defaultExpanded: true },
      formMeta: {
        render: () => (
          <>
            <Field<string> name="title">{({ field }) => <div>{field.value}</div>}</Field>
            <Field<string> name="content">
              <input />
            </Field>
          </>
        ),
      },
    };
  }
  ```

3. 初始化数据与渲染

* 在 `initial-data.ts` 中，包含一个 `start` 节点、一个带三条分支的 `condition` 节点（其中一条分支包含 `custom`，另一条为 `break`，还有一条为空），以及一个 `end` 节点。
* 各节点携带 `data.title` 与 `data.content`，`NodeRender` 中的 `form?.render()` 会将这些表单字段渲染到节点外壳内。
* `Adder` 组件点击后新增 `custom` 节点，默认 `title: 'New Custom Node'` 与 `content: 'Custom Node Content'`。

> 预期效果:
>
> • 画布包含 `start`、`condition`（三分支）与 `end`，各节点显示其 `title` 与 `content`；可通过 `Adder` 在流程中快速新增 `custom` 节点。
>
> • 撤销/重做快捷键可用，节点移动、添加、删除以及表单输入变更都会纳入历史记录；触发历史应用时将执行示例中的自动保存回调。
>
> • 分支节点的展开区域默认打开，便于查看与编辑内部内容。

<FixedLayoutCodePreview
  files={{
  '/App.tsx': step6App,
  '/use-editor-props.tsx': step6UseEditorProps,
  '/initial-data.ts': step6InitialData,
  '/node-registries.tsx': step6NodeRegistries,
  '/node-render.tsx': step6NodeRender,
  '/adder.tsx': step6Adder,
}}
/>

## Step.7 - 创建工具栏

1. 引入工具栏与迷你地图组件

* 在 `App.tsx` 中引入并渲染 `<Tools />` 与自定义 `<Minimap />`，与 `<EditorRenderer />` 同级放置于 `FixedLayoutEditorProvider` 内，使其能够访问编辑器上下文与画布操作方法。

2. 通过工具方法操控画布

* 使用 `usePlaygroundTools()` 获取画布操作方法：`zoomin/zoomout`、`fitView`、`changeLayout` 等。
* 实时显示缩放比例：通过 `tools.zoom` 读取当前画布缩放并展示百分比。

3. 接入撤销/重做状态

* 使用 `useClientContext()` 获取 `history`，并监听 `history.undoRedoService.onChange` 更新工具栏中的 `Undo/Redo` 可用态。
* 在 `use-editor-props.tsx` 中确保开启历史：`history.enable = true` 与 `history.enableChangeNode = true`，使撤销/重做对节点数据与布局变更生效。

4. 自定义迷你地图（可选）

* 使用 `MinimapRender` 并自定义容器样式，将缩略图固定在左下角，避免遮挡主要交互区域。
* 在 `use-editor-props.tsx` 中为迷你地图插件传入：`disableLayer: true` 与 `canvasStyle`（`canvasWidth/canvasHeight/canvasPadding`），获得紧凑的缩略图尺寸与边距。

5. 保持前述功能

* `NodeRender` 继续通过 `form?.render()` 渲染表单字段，并提供删除按钮；`Adder` 支持一键新增 `custom` 节点；`node-registries.tsx` 中维持 `condition/custom` 类型注册；`initial-data.ts` 中包含 `start → condition(三分支) → end` 的示例流程。

> 预期效果:
>
> • 画面左下角出现工具栏，支持 `ZoomIn/ZoomOut`、`FitView`、`ChangeLayout` 等常用操作，并实时显示缩放比例；`Undo/Redo` 按钮会根据历史状态联动更新。
>
> • 左下角同时展示自定义样式的迷你地图，可点击/拖拽缩略图快速定位主画布；结合工具栏形成完整的编辑工具区，操作更高效。

<FixedLayoutCodePreview
  files={{
  '/App.tsx': step7App,
  '/use-editor-props.tsx': step7UseEditorProps,
  '/initial-data.ts': step7InitialData,
  '/node-registries.tsx': step7NodeRegistries,
  '/node-render.tsx': step7NodeRender,
  '/adder.tsx': step7Adder,
  '/tools.tsx': step7Tools,
  '/minimap.tsx': step7Minimap,
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
    了解更多固定布局用法

    * [加载与保存](/guide/fixed-layout/load.md)
    * [节点](/guide/fixed-layout/node.md)
    * [复合节点](/guide/fixed-layout/composite-nodes.md)
  </div>

  <div>
    了解 FlowGram.AI 更多功能

    * [表单](/guide/form/form.md)
    * [变量](/guide/variable/basic.md)
    * [物料](/materials/introduction.md)
  </div>
</div>
