# 快速上手

import {
  PackageManagerTabs
  // @ts-ignore
} from '@theme';

:::info
快速体验 FlowGram.AI，你可以直接 [在 CodeSandbox 中打开](https://codesandbox.io/p/github/louisyoungx/flowgram-demo/main) 或者 [在 StackBlitz 中打开](https://stackblitz.com/~/github.com/louisyoungx/flowgram-demo)
:::

选择开始方式：

* 方式一：使用官方模板脚手架搭建新项目（⭐️ 推荐用于快速入门）。
* 方式二：通过安装编辑器包集成到现有项目中。

## 方式一：通过官方模版创建 FlowGram.AI 应用

1. 使用 FlowGram CLI 搭建一个可运行的演示

<PackageManagerTabs
  command={{
npm: "npx @flowgram.ai/create-app@latest",
pnpm: "pnpm dlx @flowgram.ai/create-app@latest",
yarn: "yarn dlx @flowgram.ai/create-app@latest",
bun: "bunx @flowgram.ai/create-app@latest",
}}
/>

2. 在提示时选择一个模板（推荐选择 `Free Layout Demo` 用于快速入门）

```text
- Free Layout Demo            # 自由布局最佳实践 (⭐️ 推荐)
- Free Layout Demo Simple     # 自由布局基本用法
- Fixed Layout Demo           # 固定布局最佳实践
- Fixed Layout Demo Simple    # 固定布局基本用法
```

<div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(320px, 1fr))', gap: 16, marginTop: 12 }}>
  <div>
    <p><strong>Free Layout Demo</strong> [查看在线演示](/examples/free-layout/free-layout-simple.md)</p>

    <img src="/examples/example-free-layout.png" alt="自由布局预览" style={{ width: '100%', borderRadius: 8 }} />
  </div>

  <div>
    <p><strong>Fixed Layout Demo</strong> [查看在线演示](/examples/fixed-layout/fixed-layout-simple.md)</p>

    <img src="/examples/example-fixed-layout.png" alt="固定布局预览" style={{ width: '100%', borderRadius: 8 }} />
  </div>

  <div>
    <p><strong>Free Layout Demo Simple</strong> [查看在线演示](/examples/free-layout/free-layout-simple.md)</p>

    <img src="/examples/example-free-layout-simple.png" alt="自由布局简单预览" style={{ width: '100%', borderRadius: 8 }} />
  </div>

  <div>
    <p><strong>Fixed Layout Demo Simple</strong> [查看在线演示](/examples/fixed-layout/fixed-layout-simple.md)</p>

    <img src="/examples/example-fixed-layout-simple.png" alt="固定布局简单预览" style={{ width: '100%', borderRadius: 8 }} />
  </div>
</div>

3. 查看安装的目录名称

* 使用 Free Layout Demo 模板创建的项目，目录名称为 `demo-free-layout`
* 使用 Free Layout Demo Simple 模板创建的项目，目录名称为 `demo-free-layout-simple`
* 使用 Fixed Layout Demo 模板创建的项目，目录名称为 `demo-fixed-layout`
* 使用 Fixed Layout Demo Simple 模板创建的项目，目录名称为 `demo-fixed-layout-simple`

4. 进入项目目录

```sh
cd [project-name]
```

5. 安装依赖

<PackageManagerTabs
  command={{
npm: "npm install",
pnpm: "pnpm install",
yarn: "yarn install",
bun: "bun install",
}}
/>

6. 启动开发服务器

<PackageManagerTabs
  command={{
npm: "npm run dev",
pnpm: "pnpm dev",
yarn: "yarn dev",
bun: "bun dev",
}}
/>

## 方式二：直接安装编辑器包

:::tip
此方法适用于对 FlowGram 项目有一定了解的开发者。

如果初次接触 FlowGram，我们建议优先选择方式一，先对 FlowGram 项目进行熟悉，然后再将所需代码逐步整合到现有的工程中。
:::

如果你需要将包添加到现有项目中，选择一个布局类型：

<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
  <div>
    <strong>自由布局</strong>
    <p>节点可以在画布上任意拖动，可以使用边在节点之间进行连接，从而建立节点之间的逻辑关系</p>
    <p>下一步：[创建自由布局画布](/guide/getting-started/free-layout.md)</p>

    <img src="/free-layout/free-layout-demo.gif" alt="自由布局演示" style={{ width: '100%', borderRadius: 8 }} />
  </div>

  <div>
    <strong>固定布局</strong>
    <p>节点在图中的位置代表了节点之间的逻辑关系</p>
    <p>下一步：[创建固定布局画布](/guide/getting-started/fixed-layout.md)</p>

    <img src="/fixed-layout/fixed-layout-demo.gif" alt="固定布局演示" style={{ width: '100%', borderRadius: 8 }} />
  </div>
</div>
