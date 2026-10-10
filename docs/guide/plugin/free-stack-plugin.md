import { PackageManagerTabs } from '@theme';

# @flowgram.ai/free-stack-plugin

层级管理插件，为自由布局画布提供节点和连线的 z-index 层级控制功能。

## 功能

* 智能计算节点和连线的层级关系，避免遮挡问题
* 支持选中节点自动置顶显示
* 支持悬停节点和连线的高亮显示
* 可自定义节点排序规则，控制同层级节点的渲染顺序
* 自动处理父子节点的层级关系
* 支持连线的智能层级管理，确保连线可见性
* 实时响应节点选择、悬停和实体变化事件

## 快速开始

1. 安装

<PackageManagerTabs command="install @flowgram.ai/free-stack-plugin" />

2. 注册插件

插件的注册方法和 flowgram 的其他插件基本相同，只需要保证不要重复创建以及最终传入到对应的 FreeLayoutEditorProvider 即可

```tsx
import { createFreeStackPlugin } from '@flowgram.ai/free-stack-plugin';

const editorProps = useMemo(() => ({
  plugins: () => [
    createFreeStackPlugin()
  ]
}), []);

return (
  <FreeLayoutEditorProvider {...editorProps}>
    <EditorRenderer />
  </FreeLayoutEditorProvider>
)
```

3. 自定义节点排序

可以通过 `sortNodes` 函数自定义同层级节点的排序规则：

```tsx
import { createFreeStackPlugin } from '@flowgram.ai/free-stack-plugin';
import { WorkflowNodeType } from './nodes/constants';

const editorProps = useMemo(() => ({
  plugins: () => [
    createFreeStackPlugin({
      sortNodes: (nodes) => {
        const commentNodes = [];
        const otherNodes = [];

        // 将注释节点和其他节点分开
        nodes.forEach((node) => {
          if (node.flowNodeType === WorkflowNodeType.Comment) {
            commentNodes.push(node);
          } else {
            otherNodes.push(node);
          }
        });

        // 注释节点渲染在底层，其他节点在上层
        return [...commentNodes, ...otherNodes];
      },
    })
  ]
}), []);
```

## 配置选项

### FreeStackPluginOptions

插件的配置选项：

```typescript
interface FreeStackPluginOptions {
  /** 自定义节点排序函数 */
  sortNodes?: (nodes: WorkflowNodeEntity[]) => WorkflowNodeEntity[];
}
```

### sortNodes 函数

用于自定义同层级节点的排序规则：

```typescript
type SortNodesFunction = (nodes: WorkflowNodeEntity[]) => WorkflowNodeEntity[];
```

**参数说明：**

* `nodes`: 需要排序的节点数组
* **返回值**: 排序后的节点数组

**使用场景：**

* 将特定类型的节点（如注释）放在底层
* 按照业务优先级排序节点
* 按照创建时间或其他属性排序

## 层级管理算法

### 基础层级计算

插件使用智能算法计算每个节点和连线的层级：

1. **基础层级**：从 `BASE_Z_INDEX`（默认为 8）开始计算
2. **节点层级**：根据节点的嵌套关系和排序规则计算
3. **连线层级**：确保连线不被节点遮挡，同时处理特殊情况

### 层级提升规则

以下情况会触发层级提升：

* **选中节点**：选中的节点会被提升到顶层
* **悬停元素**：悬停的节点或连线会被高亮显示
* **正在绘制的连线**：绘制中的连线会置于顶层
* **父子关系连线**：父子节点间的连线会优先显示

### 层级计算流程

1. **初始化**：清除缓存，计算基础参数
2. **节点索引**：建立节点索引映射
3. **选中节点处理**：标记选中节点的父级关系
4. **层级分配**：递归处理节点层级
5. **连线处理**：计算连线层级，确保可见性
6. **样式应用**：将计算结果应用到 DOM 元素

## 高级用法

### 复杂排序规则

可以实现复杂的节点排序逻辑：

```typescript
const sortNodes = (nodes: WorkflowNodeEntity[]) => {
  return nodes.sort((a, b) => {
    // 1. 按节点类型优先级排序
    const typeOrder = {
      [WorkflowNodeType.Comment]: 0,
      [WorkflowNodeType.Start]: 1,
      [WorkflowNodeType.End]: 2,
      // ... 其他类型
    };

    const aOrder = typeOrder[a.flowNodeType] ?? 999;
    const bOrder = typeOrder[b.flowNodeType] ?? 999;

    if (aOrder !== bOrder) {
      return aOrder - bOrder;
    }

    // 2. 按创建时间排序
    return a.createTime - b.createTime;
  });
};
```

## 常见问题

### Q: 如何让特定类型的节点始终在底层？

A: 通过 `sortNodes` 函数将这些节点排在数组前面：

```typescript
const sortNodes = (nodes) => {
  const backgroundNodes = nodes.filter(node =>
    node.flowNodeType === WorkflowNodeType.Comment
  );
  const foregroundNodes = nodes.filter(node =>
    node.flowNodeType !== WorkflowNodeType.Comment
  );

  return [...backgroundNodes, ...foregroundNodes];
};
```

### Q: 如何禁用自动层级管理？

A: 目前插件没有提供禁用选项，如果需要完全自定义层级管理，建议不使用此插件，直接在节点组件中设置 z-index。

### Q: 性能优化建议？

A: 插件已经内置了性能优化：

* 使用防抖机制减少计算频率
* 只在必要时重新计算层级
* 使用 Map 数据结构提高查找效率

对于大型画布（超过 1000 个节点），建议：

* 简化 `sortNodes` 函数的逻辑
* 避免在排序函数中进行复杂计算
