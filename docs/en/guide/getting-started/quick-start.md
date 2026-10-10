# Quick Start

import {
  PackageManagerTabs
  // @ts-ignore
} from '@theme';

:::info
To quickly experience FlowGram.AI, you can directly [open it in CodeSandbox](https://codesandbox.io/p/github/louisyoungx/flowgram-demo/main) or [open it in StackBlitz](https://stackblitz.com/~/github.com/louisyoungx/flowgram-demo).
:::

Choose a way to start:

* Option 1: Use the official template scaffolding to build a new project (⭐️ Recommended for a quick start).
* Option 2: Integrate into an existing project by installing the editor package.

## Option 1: Create a FlowGram.AI Application via the Official Template

1. Use the FlowGram CLI to set up a runnable demo.

<PackageManagerTabs
  command={{
npm: "npx @flowgram.ai/create-app@latest",
pnpm: "pnpm dlx @flowgram.ai/create-app@latest",
yarn: "yarn dlx @flowgram.ai/create-app@latest",
bun: "bunx @flowgram.ai/create-app@latest",
}}
/>

2. Select a template when prompted (it is recommended to choose `Free Layout Demo` for a quick start).

```text
- Free Layout Demo            # Best practice for free layout (⭐️ Recommended)
- Free Layout Demo Simple     # Basic usage of free layout
- Fixed Layout Demo           # Best practice for fixed layout
- Fixed Layout Demo Simple    # Basic usage of fixed layout
```

<div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(320px, 1fr))', gap: 16, marginTop: 12 }}>
  <div>
    <p><strong>Free Layout Demo</strong> [View Online Demo](/en/examples/free-layout/free-layout-simple.md)</p>

    <img src="/examples/example-free-layout.png" alt="Free Layout Preview" style={{ width: '100%', borderRadius: 8 }} />
  </div>

  <div>
    <p><strong>Fixed Layout Demo</strong> [View Online Demo](/en/examples/fixed-layout/fixed-layout-simple.md)</p>

    <img src="/examples/example-fixed-layout.png" alt="Fixed Layout Preview" style={{ width: '100%', borderRadius: 8 }} />
  </div>

  <div>
    <p><strong>Free Layout Demo Simple</strong> [View Online Demo](/en/examples/free-layout/free-layout-simple.md)</p>

    <img src="/examples/example-free-layout-simple.png" alt="Free Layout Simple Preview" style={{ width: '100%', borderRadius: 8 }} />
  </div>

  <div>
    <p><strong>Fixed Layout Demo Simple</strong> [View Online Demo](/en/examples/fixed-layout/fixed-layout-simple.md)</p>

    <img src="/examples/example-fixed-layout-simple.png" alt="Fixed Layout Simple Preview" style={{ width: '100%', borderRadius: 8 }} />
  </div>
</div>

3. Check the installed directory name.

* For a project created with the Free Layout Demo template, the directory name is `demo-free-layout`.
* For a project created with the Free Layout Demo Simple template, the directory name is `demo-free-layout-simple`.
* For a project created with the Fixed Layout Demo template, the directory name is `demo-fixed-layout`.
* For a project created with the Fixed Layout Demo Simple template, the directory name is `demo-fixed-layout-simple`.

4. Enter the project directory.

```sh
cd [project-name]
```

5. Install dependencies.

<PackageManagerTabs
  command={{
npm: "npm install",
pnpm: "pnpm install",
yarn: "yarn install",
bun: "bun install",
}}
/>

6. Start the development server.

<PackageManagerTabs
  command={{
npm: "npm run dev",
pnpm: "pnpm dev",
yarn: "yarn dev",
bun: "bun dev",
}}
/>

## Option 2: Install the Editor Package Directly

:::tip
This method is suitable for developers who have some familiarity with the FlowGram project.

If you are new to FlowGram, we recommend choosing Option 1 first to familiarize yourself with the project, and then gradually integrate the required code into your existing project.
:::

If you need to add the package to an existing project, choose a layout type:

<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
  <div>
    <strong>Free Layout</strong>
    <p>Nodes can be dragged freely on the canvas, and edges can be used to connect nodes to establish logical relationships between them.</p>
    <p>Next: [Create a Free Layout Canvas](/en/guide/getting-started/free-layout.md)</p>

    <img src="/free-layout/free-layout-demo.gif" alt="Free Layout Demo" style={{ width: '100%', borderRadius: 8 }} />
  </div>

  <div>
    <strong>Fixed Layout</strong>
    <p>The position of nodes in the graph represents the logical relationship between them.</p>
    <p>Next: [Create a Fixed Layout Canvas](/en/guide/getting-started/fixed-layout.md)</p>

    <img src="/fixed-layout/fixed-layout-demo.gif" alt="Fixed Layout Demo" style={{ width: '100%', borderRadius: 8 }} />
  </div>
</div>
