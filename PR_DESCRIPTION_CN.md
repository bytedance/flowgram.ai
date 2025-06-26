## 📝 功能描述

此 PR 实现了主画布和 SubCanvasRender 组件之间的背景配置共享，确保整个编辑器界面的视觉样式保持一致。

## 🎯 解决的问题

之前，`SubCanvasRender` 组件使用硬编码的背景样式，与主画布的 `background-plugin` 配置独立。这导致当用户自定义画布背景设置时，出现样式不一致的问题。

## ✨ 解决方案

### 核心架构设计

1. **inversify 单例服务**：使用 `BackgroundConfigService` 替代全局变量，避免多画布实例间的配置污染
2. **React Context 支持**：添加 `BackgroundProvider` 和 `useBackgroundConfig` 用于组件级配置覆盖
3. **依赖注入集成**：通过 `useService` hook 在 React 组件中访问 inversify 服务
4. **动态子画布背景**：更新 `SubCanvasBackground` 组件以支持消费共享配置
5. **唯一模式 ID**：为每个子画布生成唯一的 SVG pattern ID 以避免冲突

### 技术实现

- **新服务**：`packages/plugins/background-plugin/src/background-config-service.ts` - inversify 单例服务
- **新上下文**：`packages/plugins/background-plugin/src/background-context.tsx` - React Context 支持
- **增强插件**：背景插件注册服务并管理配置生命周期
- **更新组件**：SubCanvasBackground 组件通过依赖注入获取配置
- **依赖管理**：从 `@flowgram.ai/free-container-plugin` 到 `@flowgram.ai/background-plugin` 的正确依赖

### 架构优势

- **类型安全**：完整的 TypeScript 类型支持
- **无污染**：多画布实例间配置隔离
- **可扩展**：支持未来更复杂的配置需求
- **向后兼容**：现有代码无需修改

## 🔧 使用方式

### 自动模式（默认）

```tsx
// SubCanvasRender 自动继承主画布背景配置
<SubCanvasRender />
```

### 手动模式（高级用法）

```tsx
import { BackgroundProvider } from '@flowgram.ai/background-plugin';

<BackgroundProvider config={customConfig}>
  <YourEditorComponent />
</BackgroundProvider>
```

### 服务直接访问

```tsx
import { useService } from '@flowgram.ai/core';
import { BackgroundConfigService } from '@flowgram.ai/background-plugin';

const backgroundService = useService(BackgroundConfigService);
const config = backgroundService.getConfig();
```

## 📊 配置优先级

系统按以下优先级顺序处理配置：

1. React Context 配置（最高优先级）
2. inversify 单例服务配置
3. 默认值（兜底）

## 🧪 测试验证

- ✅ TypeScript 类型检查通过
- ✅ 构建验证完成
- ✅ 代码风格检查通过
- ✅ 向后兼容性保持
- ✅ 多画布实例隔离验证

## 📋 检查清单

- [x] 使用 inversify 单例服务替代全局变量
- [x] 代码符合项目编码规范
- [x] TypeScript 类型定义完整
- [x] 保持向后兼容性
- [x] 文档包含使用示例
- [x] 构建和代码检查通过
- [x] 未引入破坏性变更
- [x] 防止多画布实例配置污染

## 🎨 演示效果

如需测试此功能：

1. 在编辑器中配置背景设置：

```tsx
background: {
  gridSize: 30,
  dotColor: '#4d53e8',
  backgroundColor: '#fafbfc',
  opacity: 0.8,
  // ... 其他选项
}
```

2. 创建包含 SubCanvasRender 的容器节点
3. 验证子画布背景与主画布匹配
4. 测试多个画布实例间的配置隔离

## 🔄 迁移说明

无需迁移 - 这是一个非破坏性增强功能，与现有代码自动兼容。

## 📚 相关问题

解决了作者反馈的多画布实例配置污染问题：

- 移除全局变量方案
- 使用 inversify 单例模块进行配置管理
- 确保不同画布实例间的配置隔离

## 🤝 审查要点

- **架构设计**：使用 inversify 依赖注入容器管理配置，避免全局状态污染
- **类型安全**：完整的 TypeScript 接口定义和类型检查
- **配置优先级**：React Context > inversify 服务 > 默认值的清晰优先级
- **兼容性**：所有现有 API 保持不变，新功能可选使用
- **性能考虑**：单例服务减少重复配置创建，唯一 pattern ID 防止 SVG 冲突

---

**类型**：功能增强 + 架构重构
**破坏性变更**：否
**影响范围**：background-plugin, free-container-plugin
