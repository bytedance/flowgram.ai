import { PackageManagerTabs } from '@theme';

# @flowgram.ai/free-auto-layout-plugin

基于 Dagre 算法的自动布局插件，为自由布局画布提供智能的节点排列功能。

## 功能

* 基于 Dagre 有向图布局算法，自动计算节点的最优位置
* 支持多种布局方向（从左到右、从上到下等）
* 可配置节点间距、边距等布局参数
* 支持嵌套容器的递归布局
* 提供动画效果和视图自适应功能
* 与历史记录系统集成，支持撤销/重做操作

![Preview](@/public/plugin/auto-layout.gif)

## 快速开始

1. 安装

<PackageManagerTabs command="install @flowgram.ai/free-auto-layout-plugin" />

2. 注册插件

插件的注册方法和 flowgram 的其他插件基本相同，只需要保证不要重复创建以及最终传入到对应的 FreeLayoutEditorProvider 即可

```tsx
import { createFreeAutoLayoutPlugin } from '@flowgram.ai/free-auto-layout-plugin';

const editorProps = useMemo(() => ({
  plugins: () => [
    createFreeAutoLayoutPlugin({
      layoutConfig: {
        rankdir: 'LR', // 布局方向：从左到右
        nodesep: 100,  // 节点间距
        ranksep: 100,  // 层级间距
      }
    })
  ]
}), []);

return (
  <FreeLayoutEditorProvider {...editorProps}>
    <EditorRenderer />
  </FreeLayoutEditorProvider>
)
```

3. 在 React 组件中使用

也可以通过工具类在组件中触发自动布局：

```tsx
import { WorkflowAutoLayoutTool } from '@flowgram.ai/free-layout-editor';

const AutoLayoutButton = () => {
  const tools = usePlaygroundTools();
  const playground = usePlayground();

  const handleAutoLayout = async () => {
    await tools.autoLayout({
      enableAnimation: true,      // 启用动画效果
      animationDuration: 1000,     // 动画持续时间
      disableFitView: false,      // 布局后自动适应视图
    });
  }

  return (
    <button onClick={handleAutoLayout}>
      自动布局
    </button>
  );
};
```

4. 使用自动布局服务

通过依赖注入获取 AutoLayoutService 实例来执行布局：

```tsx
import { AutoLayoutService } from '@flowgram.ai/free-auto-layout-plugin';

class MyLayoutService {
  @inject(AutoLayoutService)
  private autoLayoutService: AutoLayoutService;

  async performAutoLayout() {
    await this.autoLayoutService.layout({
      enableAnimation: true,      // 启用动画效果
      animationDuration: 1000,     // 动画持续时间
      disableFitView: false,      // 布局后自动适应视图
    });
  }
}
```

## 配置选项

### LayoutConfig

布局算法的配置参数：

```typescript
interface LayoutConfig {
  /** 布局方向 */
  rankdir?: 'TB' | 'BT' | 'LR' | 'RL';
  /** 对齐方式 */
  align?: 'UL' | 'UR' | 'DL' | 'DR';
  /** 同层节点间距 */
  nodesep?: number;
  /** 边的间距 */
  edgesep?: number;
  /** 层级间距 */
  ranksep?: number;
  /** 水平边距 */
  marginx?: number;
  /** 垂直边距 */
  marginy?: number;
  /** 环路处理算法 */
  acyclicer?: string;
  /** 排序算法 */
  ranker?: 'network-simplex' | 'tight-tree' | 'longest-path';
}
```

### LayoutOptions

布局执行时的选项：

```typescript
interface LayoutOptions {
  /** 容器节点，默认为根节点 */
  containerNode?: WorkflowNodeEntity;
  /** 获取跟随节点的函数 */
  getFollowNode?: GetFollowNode;
  /** 禁用自动适应视图 */
  disableFitView?: boolean;
  /** 启用动画效果 */
  enableAnimation?: boolean;
  /** 动画持续时间（毫秒） */
  animationDuration?: number;
  /** 节点过滤函数，用于控制哪些节点参与布局计算 */
  filterNode?: (params: { node: WorkflowNodeEntity; parent?: WorkflowNodeEntity }) => boolean;
}
```

## 布局算法

### Dagre 算法

插件基于 Dagre 库实现，这是一个专门用于有向图布局的 JavaScript 库。算法特点：

* **分层布局**：将节点按照依赖关系分为不同层级
* **最小交叉**：尽量减少连线的交叉
* **均匀分布**：在满足约束的前提下均匀分布节点

### 布局流程

1. **图构建**：将工作流节点和连线转换为 Dagre 图结构
2. **层级计算**：根据节点依赖关系计算层级（rank）
3. **顺序优化**：在每个层级内优化节点顺序以减少交叉
4. **位置计算**：计算每个节点的最终坐标位置
5. **动画执行**：如果启用动画，平滑过渡到新位置

## 高级用法

### 自定义跟随节点

可以通过 `getFollowNode` 函数自定义节点的跟随关系：

```typescript
const layoutOptions: LayoutOptions = {
  getFollowNode: (node: LayoutNode) => {
    // 返回应该跟随当前节点的节点ID
    if (node.flowNodeType === 'comment') {
      return getNearestNode(node);
    }
    return undefined;
  }
};
await tools.autoLayout(layoutOptions);
```

### 节点过滤

可以通过 `filterNode` 函数控制哪些节点参与布局计算：

```typescript
const layoutOptions: LayoutOptions = {
  filterNode: ({ node, parent }) => {
    // 过滤掉特定类型的节点
    if (node.flowNodeType === 'comment') {
      return false;
    }

    // 根据父节点条件过滤
    if (parent && parent.flowNodeType.type === 'group') {
      return false;
    }

    return true; // 默认包含所有节点
  }
};

// 使用过滤选项执行布局
await tools.autoLayout(layoutOptions);
```

### 仅对指定容器布局

插件支持对指定容器进行递归布局，会自动处理容器内部的节点排列：

```typescript
// 对特定容器执行布局
await autoLayoutService.layout({
  containerNode: specificContainerNode,
  enableAnimation: true,
});
```

## 常见问题

### Q: 如何在初始化时触发自动布局?

A: 在画布渲染完成后调用 `ctx.tool.autoLayout()` 方法即可触发自动布局。

```typescript
const editorProps = useMemo(() => ({
  onAllLayersRendered: (ctx) => {
    ctx.tool.autoLayout({
      enableAnimation: false, // 初始化时自动布局禁用动画，可优化用户体验
    }
    );
  }
}), []);
```

### Q: 如何实现自定义布局方向？

A: 方法一：在 EditorProps 中注册 AutoLayout 插件，通过 `rankdir` 参数控制布局方向：

```typescript

import { createFreeAutoLayoutPlugin } from '@flowgram.ai/free-auto-layout-plugin';

const editorProps = useMemo(() => ({
  plugins: () => [
    createFreeAutoLayoutPlugin({
      layoutConfig: {
        rankdir: 'TB', // 从上到下
        // rankdir: 'LR', // 从左到右（默认）
        // rankdir: 'RL', // 从右到左
        // rankdir: 'BT', // 从下到上
      }
    })
  ]
}), []);
```

方法二：在调用 `autoLayout` 方法时，通过 `layoutConfig` 参数传递布局配置：

```typescript
const tools = usePlaygroundTools();
const playground = usePlayground();

const handleAutoLayout = async () => {
  await tools.autoLayout({
    layoutConfig: {
      rankdir: 'TB', // 从上到下
      // rankdir: 'LR', // 从左到右（默认）
      // rankdir: 'RL', // 从右到左
      // rankdir: 'BT', // 从下到上
    }
  });
}
```

### Q: 布局动画卡顿怎么优化？

A: 对于复杂工作流，建议禁用动画或减少动画时长：

```typescript
layoutOptions: {
  enableAnimation: false, // 禁用动画
  // 或者
  animationDuration: 150, // 减少动画时长
}
```
