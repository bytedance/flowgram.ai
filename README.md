# FlowGram.AI

FlowGram is a node-based flow building engine that helps developers quickly create workflows in either fixed layout or
free connection layout modes. It provides a set of interaction best practices and is particularly suitable for visual
workflows with clear inputs and outputs.

In the current AI boom, we are also focusing on how to empower workflows with AI capabilities, hence the AI suffix in
our name.

<div align="center">

[![License](https://img.shields.io/github/license/bytedance/flowgram.ai)](https://github.com/bytedance/flowgram.ai/blob/main/LICENSE)
[![@flowgram.ai/editor](https://img.shields.io/npm/dw/%40flowgram.ai%2Fcore
)](https://www.npmjs.com/package/@flowgram.ai/editor)

</div>

## 📖 Documentation

- [Official Documentation](https://flowgram.ai/)
- [Contributing Guidelines](https://github.com/bytedance/flowgram.ai/blob/main/CONTRIBUTING.md)

## 📦 Packages

| Package                                                                   | Description         | Version                                                                                                                                     |
|---------------------------------------------------------------------------|---------------------|---------------------------------------------------------------------------------------------------------------------------------------------|
| [@flowgram.ai/create-app](./apps/create-app)                              | App Creator         | [![npm](https://img.shields.io/npm/v/@flowgram.ai/create-app.svg)](https://www.npmjs.com/package/@flowgram.ai/create-app)                   |
| [@flowgram.ai/fixed-layout-editor](./packages/client/fixed-layout-editor) | Fixed Layout Editor | [![npm](https://img.shields.io/npm/v/@flowgram.ai/fixed-layout-editor.svg)](https://www.npmjs.com/package/@flowgram.ai/fixed-layout-editor) |
| [@flowgram.ai/free-layout-editor](./packages/client/free-layout-editor)   | Free Layout Editor  | [![npm](https://img.shields.io/npm/v/@flowgram.ai/free-layout-editor.svg)](https://www.npmjs.com/package/@flowgram.ai/free-layout-editor)   |

## 🎮 Examples

<div>
  <p>
    <a href="https://flowgram.ai/examples/fixed-layout/fixed-feature-overview.html">
        Fixed Layout
    </a>
  </p>
  <p>
    Fixed layout where nodes can be dragged to specified positions, with support for compound nodes like branches and loops.
  </p>
  <p>
    <img src="./apps/docs/src/public/fixed-layout/fixed-layout-demo.gif"/>
  </p>
  </div>
  <div>
  <p>
    <a href="https://flowgram.ai/examples/free-layout/free-feature-overview.html">
      Free Layout
    </a>
  </p>
  <p>
      Free layout where nodes can be placed anywhere and connected using free-form lines.
  </p>
  <p>
    <img src="./apps/docs/src/public/free-layout/free-layout-demo.gif"/>
  </p>
</div>

## 🚀 Getting Started

```sh
# create demo
npx @flowgram.ai/create-app@latest

# select demo
- fixed-layout # full-feature overview
- free-layout # full-feature overview
- fixed-layout-simple # basic usage
- free-layout-simple # basic usage
```

## 🔨 Development

1. **Install Node.js 18+**

``` bash
nvm install lts/hydrogen
nvm alias default lts/hydrogen # set default node version
nvm use lts/hydrogen
```

2. **Clone the repository**

``` bash
git clone git@github.com:bytedance/flowgram.ai.git
```

3. **Install required global dependencies**

``` bash
npm i -g pnpm@9.12.0 @microsoft/rush@5.140.0
```

4. **Install project dependencies**

``` bash
rush update
```

5. **Build the project**

``` bash
rush build
```

6. **Run docs or demo**

``` bash
rush dev:docs # docs
rush dev:demo-fixed-layout
rush dev:demo-free-layout
```

After that, you can start to develop projects inside this repository.

Enjoy it!

## Stats
![Repo Stats](https://repobeats.axiom.co/api/embed/2b88f04ae1568daf1e49f77de99bb9d2fbe0d296.svg)

## 🌟 Contributors

[![FlowGram.AI Contributors](https://contrib.rocks/image?repo=bytedance/flowgram.ai)](https://github.com/bytedance/flowgram.ai/graphs/contributors)

