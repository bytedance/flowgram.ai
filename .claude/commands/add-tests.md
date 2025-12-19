---
description: 为代码添加单元测试（支持增量和存量代码测试补齐）
---

# 单元测试生成

## 用法
- `/add-tests [dir]` - 为指定模块或文件添加单元测试
  - `[dir]` 可选参数：包名（以 @ 开头）、文件路径或目录路径
  - 不指定 `[dir]` 则默认为全代码库（会提示用户确认）
  - 执行后会询问用户选择：增量代码测试（基于 git diff）或存量代码测试补齐

## 命令说明

此命令用于自动生成和补充单元测试，确保代码质量。FlowGram 使用 **Vitest** 作为测试框架。

### 测试覆盖率目标

根据包的类型和重要性，测试覆盖率要求如下：

- **核心引擎层**（canvas-engine、node-engine、variable-engine、runtime）
  - 覆盖率目标：≥ 85%
  - 包括：@flowgram.ai/core、@flowgram.ai/form、@flowgram.ai/variable-core、@flowgram.ai/runtime-js 等

- **插件和客户端层**（plugins、client）
  - 覆盖率目标：≥ 60%
  - 包括：@flowgram.ai/editor、各类 plugin 包、@flowgram.ai/fixed-layout-editor 等

- **工具和示例**（common、apps）
  - 覆盖率目标：尽可能覆盖关键逻辑
  - 包括：@flowgram.ai/utils、demo 应用等

### 测试文件组织

- 测试文件位置：
  - `__tests__/` 目录（推荐）
  - 或与源文件同级的 `*.test.ts`/`*.test.tsx` 文件
- 命名规范：
  - 对于 `src/core/utils.ts`，测试文件为 `__tests__/core/utils.test.ts` 或 `src/core/utils.test.ts`

## 测试生成流程

### 0. 命令执行和用户确认

1. **确认范围**：
   - 如果未指定 `[dir]`，询问用户是否要对全代码库操作，还是指定具体目录
   - 全代码库操作工作量巨大，需要用户明确确认

2. **选择模式**：
   - 询问用户选择测试模式：
     - **增量代码测试**：仅为 git diff 中的新增/修改代码添加测试
     - **存量代码测试补齐**：扫描所有代码，补齐缺失或覆盖率不足的测试

### 1. 识别待测代码

**增量代码模式**：
```bash
# 检查 git diff 获取所有修改的文件
git diff --name-only
git diff <file>  # 查看具体变更
```

**存量代码模式**：
- 扫描指定目录下所有源文件（排除已有完整测试的文件）
- 查找缺少测试或覆盖率不足的文件
- 优先处理核心引擎层的文件

### 2. 确定包信息和覆盖率目标

1. 从最近的 `package.json` 获取包名
2. 使用包名在 `rush.json` 中查找包的分类（projectFolder）
3. 根据包所在目录确定覆盖率目标：
   - `packages/canvas-engine/`、`packages/node-engine/`、`packages/variable-engine/`、`packages/runtime/` → 85%
   - `packages/plugins/`、`packages/client/` → 60%
   - `packages/common/`、`apps/` → 尽可能覆盖

### 3. 生成测试代码

**测试重点**：
- 新增或修改的函数、方法、类
- 分支逻辑（if/else、switch/case）
- 边界条件和异常处理
- 依赖注入容器（inversify）的模拟
- 响应式状态（ReactiveState）的行为验证

**Vitest 最佳实践**：
```typescript
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('ModuleName', () => {
  beforeEach(() => {
    // 初始化
  });

  it('should handle specific case', () => {
    // 测试逻辑
    expect(result).toBe(expected);
  });
});
```

**React 组件测试**：
- 使用 `@testing-library/react` 进行组件测试
- 为关键元素添加 `data-testid` 属性
- 测试用户交互和状态变化

**依赖注入测试**：
- 使用 `vi.mock()` 模拟依赖
- 创建测试容器来验证服务注册

### 4. 执行测试验证

**单包测试**：
```bash
cd packages/canvas-engine/core
rushx test          # 运行测试
rushx test:cov      # 生成覆盖率报告
```

**全局测试**：
```bash
rush test           # 运行所有包的测试
rush test:cov       # 生成所有包的覆盖率报告
```

**每次添加测试后**：
1. 立即运行测试确保通过
2. 检查覆盖率是否达到目标
3. 修复失败的测试或调整测试用例
4. 继续处理下一个文件

### 5. 输出测试文件

- 将测试文件保存到 `__tests__/` 目录（优先）或源文件同级
- 保持目录结构与源代码一致
- 添加必要的导入和类型声明

## 示例命令

```bash
# 为某个包添加测试（执行后会询问增量或存量）
/add_tests @flowgram.ai/core

# 为特定目录添加测试
/add_tests packages/node-engine/form

# 为单个文件添加测试
/add_tests packages/canvas-engine/core/src/core/utils.ts

# 全代码库测试（会先确认范围，再询问增量或存量）
/add_tests
```

### 典型使用场景

**场景 1：为新功能添加测试**
```bash
/add_tests packages/plugins/my-new-plugin
# 选择：增量代码测试
# 结果：仅为 git diff 中的新代码生成测试
```

**场景 2：提升现有包的测试覆盖率**
```bash
/add_tests @flowgram.ai/variable-core
# 选择：存量代码测试补齐
# 结果：扫描所有代码，补齐缺失的测试，目标 85% 覆盖率
```

**场景 3：全面测试检查**
```bash
/add_tests
# 确认：选择要处理的目录或全代码库
# 选择：存量代码测试补齐
# 结果：系统性地补齐整个项目的测试
```

## 注意事项

1. **优先级**：优先为核心引擎层包编写高质量测试
2. **隔离性**：每个测试应该独立，不依赖其他测试的执行顺序
3. **可读性**：测试用例命名应清晰描述测试场景（使用中文或英文皆可）
4. **Mock 策略**：
   - 外部依赖（网络请求、文件系统）必须 mock
   - 内部复杂模块可以考虑 mock
   - 简单工具函数可以直接使用
5. **快照测试**：谨慎使用快照测试，仅用于稳定的 UI 或数据结构
6. **异步测试**：使用 async/await 处理异步操作，确保 Promise 正确解决

## 工作流程总结

1. **接收命令**：用户执行 `/add_tests [dir]`
2. **确认范围**：如果未指定 dir，询问用户要处理全代码库还是指定目录
3. **选择模式**：询问用户选择增量代码测试或存量代码测试补齐
4. **分析代码**：根据选择的模式识别待测代码
5. **确定目标**：根据包的分类确定覆盖率目标
6. **生成测试**：逐文件生成测试用例
7. **运行验证**：每生成一批测试后立即运行验证
8. **修复问题**：修复失败的测试或调整测试用例
9. **检查覆盖率**：查看覆盖率报告是否达标
10. **继续迭代**：直到达到目标覆盖率或所有文件都有测试

开始生成测试吧！
