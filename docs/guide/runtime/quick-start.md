# 快速开始

本文档将帮助您快速上手使用 FlowGram Runtime，包括环境准备、安装配置、创建和运行工作流等内容。通过本指南，您将能够在短时间内搭建起自己的工作流运行环境并运行第一个工作流示例。

## 获取代码

由于 FlowGram Runtime 定位为 demo 而非 SDK，不会作为 npm 包发布，您需要通过以下步骤来获取和使用：

### 方式一：Fork 仓库（推荐）

1. 访问 FlowGram Runtime 的代码仓库
2. 点击 "Fork" 按钮创建您自己的仓库副本
3. 克隆您 fork 的仓库到本地

### 方式二：直接克隆 flowgram 仓库

如果您只是想尝试使用而不需要提交更改，可以直接克隆原始仓库：

```bash
git clone git@github.com:bytedance/flowgram.ai.git
cd flowgram.ai
```

## 环境准备

在开始使用 FlowGram Runtime 之前，请确保您的开发环境满足以下要求：

* **Node.js**：版本 18.x 或更高版本（推荐使用 LTS 版本）

```bash
nvm install lts/hydrogen
nvm alias default lts/hydrogen # set default node version
nvm use lts/hydrogen
```

* **包管理器**：pnpm 9+ 与 rush 5+

```bash
npm i -g pnpm@10.6.5 @microsoft/rush@5.150.0
```

## 安装依赖和项目设置

获取代码后，需要安装依赖并进行基本设置：

1. **安装项目依赖**

```bash
rush install
```

2. **构建项目**

```bash
rush build
```

## 启动服务

1. **进入运行时目录**

```bash
cd packages/runtime/nodejs
```

2. **启动 nodejs 服务器**

```bash
npm run dev
```

如果一切正常，你能在控制台看到以下输出：

```
> Listen Port: 4000
> Server Address: http://localhost:4000
> API Docs: http://localhost:4000/docs
```

3. **验证服务运行**

在命令行支持 cURL 请求

```bash
curl --location 'http://localhost:4000/api/task/run' \
--header 'Content-Type: application/json' \
--data '{
  "inputs": {
      "test_input": "Hello FlowGram!"
  },
  "schema": "{\"nodes\":[{\"id\":\"start_0\",\"type\":\"start\",\"meta\":{\"position\":{\"x\":180,\"y\":0}},\"data\":{\"title\":\"Start\",\"outputs\":{\"type\":\"object\",\"properties\":{\"test_input\":{\"key\":4,\"name\":\"test_input\",\"isPropertyRequired\":true,\"type\":\"string\",\"extra\":{\"index\":0}}},\"required\":[\"test_input\"]}}},{\"id\":\"end_0\",\"type\":\"end\",\"meta\":{\"position\":{\"x\":640,\"y\":0}},\"data\":{\"title\":\"End\",\"inputsValues\":{\"test_output\":{\"type\":\"ref\",\"content\":[\"start_0\",\"test_input\"]}},\"inputs\":{\"type\":\"object\",\"properties\":{\"test_output\":{\"type\":\"string\"}}}}}],\"edges\":[{\"sourceNodeID\":\"start_0\",\"targetNodeID\":\"end_0\"}]}"
}'
```

此时服务所在的命令行应该会有如下输出：

```
> POST TaskRun - taskID:  xxxx-xxxx-xxxx-xxxx
{ test_input: 'Hello FlowGram!' }
> LOG Task finished:  xxxx-xxxx-xxxx-xxxx
{ test_output: 'Hello FlowGram!' }
```

## 接入到 FlowGram 编辑器（Web 前端）

在 `editorProps` 配置中修改 runtime 为 server 模式，并配置服务地址

```ts
createRuntimePlugin({
  // mode: 'browser', // 移除这一行
  mode: 'server',
  serverConfig: {
    domain: 'localhost',
    port: 4000,
    protocol: 'http',
  },
})
```

## 编译服务

1. **进入运行时目录**

```bash
cd packages/runtime/nodejs
```

2. **编译服务**

```bash
npm run build
```

2. **启动 nodejs 服务器**

```bash
node dist/index.js
```
