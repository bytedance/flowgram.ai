# 服务消费实证 · 2026-10-19

结论：31 项业务消费、协议互通、进程生命周期和界面接入验收全部通过。现有三个复杂工程已同时发布到本机后端和独立 Rust 宿主；关闭桌面后仍能运行。

## 可直接体验

打开项目「复杂验证 · 采购对账」→「服务」→「接入」。当前本机采购服务已通过真实 UI 发布并启用 1.1.0，提供批量对账、单票对账和异常日报三个操作。订单和客服工程也各有两个已发布操作。

独立宿主不打开原项目目录，通过发布包导入到自己的运行目录。验收宿主与模拟业务系统保留在独立的 `flowgram-services`、`flowgram-service-business` tmux 会话中。对外业务工具不包含创建和修改工作流的权限。

## 验收证据

| 检查 | 实际 Run ID / 结果 |
|---|---|
| 订单：发布、导出与独立导入 | 通过 |
| 采购：发布、导出与独立导入 | 通过 |
| 客服：发布、导出与独立导入 | 通过 |
| 订单：独立 HTTP 业务运行 | `c0928cfb-17c8-4b70-a31b-68ac775e1e10` |
| 订单：本机 HTTP 一致性 | `be31603b-5cb9-4116-af55-3a703df97bd4` |
| 采购：独立 HTTP 业务运行 | `d649ba03-cd55-41f7-b1ff-ee8718971876` |
| 采购：本机 HTTP 一致性 | `e964cdaa-6f71-4997-a79b-8239f9fdb40e` |
| 客服：独立 HTTP 业务运行 | `77c0a356-3f5c-4e45-bb56-71f520b7dc3e` |
| 客服：本机 HTTP 一致性 | `06ebfd97-883a-4902-9f3f-22e3b7f73849` |
| HTTP/MCP 复用同一幂等运行 | `f70821bd-2a7e-4cab-b7cc-c90c1d50e991` |
| 幂等冲突与环境输入覆盖被拒绝 | 通过 |
| 权限、发现、调用隔离与撤销 | 通过 |
| OpenAPI、事件补读与结果下载 | `f70821bd-2a7e-4cab-b7cc-c90c1d50e991` |
| MCP 新协议元数据与业务工具发现 | 通过 |
| 官方 SDK：无握手 HTTP | `9d32aa52-0508-4595-9ceb-1ee1d720740b` |
| 官方 SDK：兼容初始化 HTTP | `76dd3b5b-4410-40c5-9e1f-2012ef455d5e` |
| 官方 SDK：Rust stdio 桥接 | `d153f7cb-e16b-411e-9839-411a08a1f074` |
| 运行中升级仍使用旧依赖 | `3c65b59f-e035-498a-b8d6-be5b23fe4598` |
| 新请求切换到新版本 | `c3e0c112-7c06-4a84-99f4-7555fc5233cc` |
| 回滚到不可变旧版本 | `d4504fdb-1f1f-4e68-bde4-672fefea8d43` |
| 关闭桌面：订单运行 | `5b3d9d9e-3912-42ca-96d8-21e5f3f82c57` |
| 关闭桌面：采购运行 | `cba05f7e-e65a-45d3-be48-4c18c290bd0e` |
| 关闭桌面：客服运行 | `92600155-693e-46de-9545-238eb6c86f99` |
| 主机凭证注入与回显脱敏 | `3605b1b7-4547-4954-8346-23cabbb4cd00` |
| 外部调用取消 | `15b5937d-a5c9-4ef7-a168-6b35c8af27c4` |
| 签名回调从 503 恢复 | `15b5937d-a5c9-4ef7-a168-6b35c8af27c4` |
| 宿主重启保留中断状态，不重放旧请求 | `b7886f07-eeec-44cc-a48b-5ce1ac1d0c27` |
| 宿主重启后接受新请求 | `a6c733a8-f2fb-4094-902c-a5d5d9fc79bc` |
| UI 发布与启用 1.1.0 | 通过 |
| UI 创建操作级凭证并执行日报 | `45c70ea4-8077-4a58-a4b4-85dbdacec7a8` |
| UI 凭证撤销后拒绝访问 | 通过 |

原始证据：
- [acceptance.json](../.flowgram-local/service-validation/acceptance.json)
- [mcp-sdk-acceptance.json](../.flowgram-local/service-validation/mcp-sdk-acceptance.json)
- [lifecycle-acceptance.json](../.flowgram-local/service-validation/lifecycle-acceptance.json)
- [ui-acceptance.json](../.flowgram-local/service-validation/ui-acceptance.json)

## 实现与验证

- 不可变发布包包含主流程及全部子流程、业务输入输出契约、摘要和 Rust 运行时格式要求；已验证升级与回滚不会改变原运行。
- HTTP 与 MCP 共享调用方权限、输入输出校验、运行、取消、并发限制与幂等。相同请求跨入口返回同一个 Run ID。
- 官方 MCP Python SDK 2.3.0 完成三种传输互通。业务工具只呈现授权操作；长任务以业务运行句柄查询，未声明 Tasks 扩展。
- 实际注入专属验收凭证，外部 HTTP 收到凭证，返回内容被脱敏；发布包不含主机模型密钥、管理令牌和签名密钥。
- 回调在真实 503 后重投成功，验收接收方验证 HMAC 签名。服务重启后旧运行保持 interrupted，同键重试不重跑，后续新请求正常完成。
- Rust 74 项测试、前端 83 项测试、作用域 ESLint、TypeScript、fmt、Clippy 和最终原生应用构建通过。
- UI 已实际发布、部署、创建受限凭证、消费日报并撤销凭证。界面采用共享 Select；修复了选择器挤压状态文案的布局问题。
- 发现并修复本机业务路由继承外层路径参数的问题，已有专门回归测试。原模型配置校验保持一致。

## 交付范围

完整接入与部署说明见 [工作流服务发布与消费](workflow-service-delivery.md)。当前证明本机与独立 Rust 进程的完整链路；业务样本是受控非生产数据。

Dockerfile 与 Compose 已提供，Compose 配置校验通过；本机 Docker daemon 不可用，容器镜像构建与启动尚未实测。当前远程 MCP 使用显式 Bearer 凭证，尚未提供 OAuth 登录。产物下载目前为 JSON，不包含大文件对象存储与签名链接。运行重启后的断点续跑、通用补偿和任意下游 exactly-once 均未宣称实现。

![已发布的采购服务](../.flowgram-local/screenshots/service-delivery.png)
