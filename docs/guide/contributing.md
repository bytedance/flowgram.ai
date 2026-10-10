# 贡献指南

本文帮助你快速在本仓库完成开发、测试与提 PR。仓库采用 Rush + pnpm 的 Monorepo 管理方式，文档站基于 Rspress 构建。

## 构建开发环境

1. **安装 Node.js 18+**（推荐 LTS/Hydrogen）

```bash
nvm install lts/hydrogen
nvm alias default lts/hydrogen # 设为默认 Node 版本
nvm use lts/hydrogen
```

2. **克隆仓库到本地**

```bash
git clone git@github.com:bytedance/flowgram.ai.git
```

3. **安装全局依赖**

```bash
npm i -g pnpm@10.6.5 @microsoft/rush@5.150.0
```

4. **安装项目依赖**

```bash
rush install
```

5. **构建项目**

```bash
rush build
```

6. **运行文档或示例**

```bash
rush dev:docs                  # 在 apps/docs 启动文档站（含增量构建）
rush dev:demo-fixed-layout     # 运行固定布局示例
rush dev:demo-free-layout      # 运行自由布局示例
```

## 常用命令（Rush 自定义）

```bash
rush build            # 构建所有包
rush build:watch      # 增量构建并监听
rush lint             # 运行 ESLint 检查
rush lint:fix         # 自动修复 ESLint 问题
rush ts-check         # TypeScript 类型检查
rush test             # 运行各包的测试脚本（按包聚合）
rush e2e:test         # 运行所有 e2e 测试
rush e2e:update-screenshot # 更新 e2e 快照
rush dep-check        # 自动检查依赖健康度
```

## 分支与提交规范

* 分支命名：
  * `feat/描述`（新功能）
  * `fix/描述`（问题修复）
  * `docs/描述`（文档变更）
  * `chore/描述`（维护/杂项）
* 提交信息（Conventional Commits）：
  * 格式：`type(scope): subject`，例如：

```text
feat(editor): 支持节点批量对齐
```

* 常用类型：`feat`、`fix`、`docs`、`style`、`refactor`、`test`、`chore`
* 仓库已启用 commitlint 校验（commit-msg 钩子），提交信息将被自动检查；同时 pre-commit 会运行 lint-staged（自动更新许可证头、eslint 修复）与 `rush check` 校验。

## 开发与质量保障

* 本地开发建议：
  * 先执行 `rush build:watch`，再在对应 demo 或 docs 目录运行开发命令（如 `rush dev:docs`）。
  * 修改代码后，确保通过：`rush lint`、`rush ts-check`、`rush build`、`rush test`。
* 测试说明：
  * e2e 用例位于 `e2e/` 目录，可通过 `rush e2e:test` 运行，或更新快照 `rush e2e:update-screenshot`。

## Pull Request 流程

1. 从 `main` 创建你的工作分支（遵循分支命名规范）。
2. 编码并补充测试/文档。
3. 本地通过质量校验（lint、ts-check、build、test）。
4. 提交 PR：填写说明、关联 Issue，并注意使用模板。
5. 评审与 CI：维护者会进行代码评审，CI 全绿后即可合并。

## 文档贡献

* 文档位置：`apps/docs/src/zh/**`（中文）与 `apps/docs/src/en/**`（英文）。
* 本地预览：执行 `rush dev:docs` 启动 Rspress 文档站。
* 若需自动生成 API 文档，可在 `apps/docs` 目录执行 `rushx docs`（调用脚本生成）。

## 常见问题

* pnpm-lock 合并冲突：仓库已在 `post-checkout` 钩子中配置合并策略，通常可避免锁文件冲突。
* Node 版本：请确保使用 Node 18+，否则可能出现依赖或构建失败。

## 报告问题

* 请在 GitHub 提交 Issue：https://github.com/bytedance/flowgram.ai/issues/new/choose
  * 描述问题、复现步骤、期望与实际行为，必要时附代码示例。

## 许可证

* 本项目遵循 MIT 许可证。提交代码即默认同意相关条款。
