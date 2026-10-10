# Quick Start

This document will help you quickly get started with FlowGram Runtime, including environment preparation, installation, configuration, creating and running workflows. Through this guide, you'll be able to set up your workflow runtime environment and run your first workflow example in a short time.

## Getting the Code

Since FlowGram Runtime is positioned as a demo rather than an SDK and will not be published as an npm package, you need to follow these steps to obtain and use it:

### Method 1: Fork the Repository (Recommended)

1. Visit the FlowGram Runtime repository
2. Click the "Fork" button to create your own copy of the repository
3. Clone your forked repository to your local machine

### Method 2: Direct Clone

If you just want to try it out without submitting changes, you can clone the original repository directly:

```bash
git clone git@github.com:bytedance/flowgram.ai.git
cd flowgram.ai
```

## Environment Preparation

Before you start using FlowGram Runtime, please ensure your development environment meets the following requirements:

* **Node.js**: Version 18.x or higher (LTS version recommended)

```bash
nvm install lts/hydrogen
nvm alias default lts/hydrogen # set default node version
nvm use lts/hydrogen
```

* **Package Manager**: pnpm 9+ and rush 5+

```bash
npm i -g pnpm@10.6.5 @microsoft/rush@5.150.0
```

## Installing Dependencies and Project Setup

After obtaining the code, you need to install dependencies and perform basic setup:

1. **Install Project Dependencies**

```bash
rush install
```

2. **Build the Project**

```bash
rush build
```

## Starting the Service

1. **Navigate to Runtime Directory**

```bash
cd packages/runtime/nodejs
```

2. **Start the nodejs Server**

```bash
npm run dev
```

If everything is working correctly, you should see the following output in the console:

```
> Listen Port: 4000
> Server Address: http://localhost:4000
> API Docs: http://localhost:4000/docs
```

3. **Verify the Service**

You can test the service using cURL:

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

You should see the following output in the command line where the service is running:

```
> POST TaskRun - taskID:  xxxx-xxxx-xxxx-xxxx
{ test_input: 'Hello FlowGram!' }
> LOG Task finished:  xxxx-xxxx-xxxx-xxxx
{ test_output: 'Hello FlowGram!' }
```

## Compiling the Service

1. **Enter the Runtime Directory**

```bash
cd packages/runtime/nodejs
```

2. **Compile the Service**

```bash
npm run build
```

2. **Start the nodejs Server**

```bash
node dist/index.js
```
