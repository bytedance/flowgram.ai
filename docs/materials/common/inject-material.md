import { SourceCode } from '@theme';

# 物料组件依赖注入

:::tip{title="目前物料库中支持依赖注入的组件物料"}

* [InjectDynamicValueInput](/materials/components/dynamic-value-input.md)
* [InjectTypeSelector](/materials/components/type-selector.md)
* [InjectVariableSelector](/materials/components/variable-selector.md)

:::

## 背景：为什么物料库需要依赖注入 ?

### ❌ 紧耦合：传统依赖问题

```mermaid
graph TD
    A[物料 A] --> B[物料 B]
    B --> D[物料 D]
    C[物料 C] --> D

    style D fill:#ff4757
    style A fill:#ffa502
    style B fill:#ffa502
    style C fill:#ffa502

    note["💥 问题：D变更导致A、B、C全部需要修改"]
```

**问题：** 连锁反应、高维护成本

### ✅ 解耦：依赖注入方案

```mermaid
graph TD
    A[物料 A] --> RenderKey[物料 D RenderKey]
    B[物料 B] --> RenderKey
    C[物料 C] --> RenderKey

    RenderKey -.-> BaseD[默认物料 D]
    CustomD[自定义物料 D] -.-> RenderKey

    style RenderKey fill:#3498db
    style BaseD fill:#2ed573
    style CustomD fill:#26d0ce
    style A fill:#a55eea
    style B fill:#a55eea
    style C fill:#a55eea

    note2["✅ A、B、C依赖抽象接口，与D实现解耦"]
```

**优势：** 热插拔、并行开发、版本兼容

## 使用方式

### 创建可注入的组件物料

```tsx
import { createInjectMaterial } from '@flowgram.ai/form-materials';
import { VariableSelector } from './VariableSelector';

// 使用 createInjectMaterial 高阶组件包装组件
const InjectVariableSelector = createInjectMaterial(VariableSelector);

// 现在你可以像使用普通组件一样使用它
function MyComponent() {
  return <InjectVariableSelector value={value} onChange={handleChange} />;
}
```

### 注册自定义组件

一个组件物料并创建为可注入的物料组件，当被其他物料使用时候，可以在 `use-editor-props.tsx` 中注入该物料的自定义渲染器：

```tsx
import { useEditorProps } from '@flowgram.ai/editor';
import { YourCustomVariableSelector } from './YourCustomVariableSelector';
import { VariableSelector } from '@flowgram.ai/form-materials';

function useCustomEditorProps() {
  const editorProps = useEditorProps({
    materials: {
      components: {
        // 默认使用组件的 Function Name 作为 renderKey
        'VariableSelector': YourCustomVariableSelector,
        'TypeSelector': YourCustomTypeSelector,
      }
    }
  });

  return editorProps;
}
```

### 使用自定义 renderKey

如果你的组件需要特定的 renderKey：

**方法 1：** 通过 createInjectMaterial 的第二个参数指定 renderKey

```tsx
const InjectCustomComponent = createInjectMaterial(MyComponent, {
  renderKey: 'my-custom-key'
});
// 注册时
{
  materials: {
    components: {
      'my-custom-key': MyCustomRenderer
    }
  }
}
```

**方法 2：** 或者直接设置组件的 renderKey 属性

```tsx
MyComponent.renderKey = 'my-custom-key';
const InjectCustomComponent = createInjectMaterial(MyComponent);
// 注册时
{
  materials: {
    components: {
      [MyComponent.renderKey]: MyCustomRenderer
    }
  }
}

```

:::note{title="渲染键优先级"}

组件渲染键的确定遵循以下优先级顺序：

1. `params.renderKey` (createInjectMaterial 的第二个参数)
2. `Component.renderKey` (组件自身的 renderKey 属性)
3. `Component.name` (组件的显示名称)
4. 空字符串 (最终回退)

:::

## API 参考

```typescript
interface CreateInjectMaterialOptions {
  renderKey?: string;
}

function createInjectMaterial<Props>(
  Component: React.FC<Props> & { renderKey?: string },
  params?: CreateInjectMaterialOptions
): React.FC<Props>
```

## 源码导读

<SourceCode href="https://github.com/bytedance/flowgram.ai/blob/main/packages/materials/form-materials/src/shared/inject-material/index.tsx" />

使用 CLI 命令可以复制源代码到本地：

```bash
npx @flowgram.ai/cli@latest materials shared/inject-material
```

### 核心时序图

完整的组件注册和渲染时序图：

```mermaid
sequenceDiagram
    participant App as 应用程序
    participant Editor as use-editor-props
    participant Registry as FlowRendererRegistry
    participant Inject as InjectMaterial
    participant Default as 默认组件
    participant Custom as 自定义组件

    Note over App,Custom: 组件注册阶段
    App->>Editor: 调用 use-editor-props()
    Editor->>Editor: 配置 materials.components
    Editor->>Registry: 向 FlowRendererRegistry 注册组件
    Registry->>Registry: 存储映射关系
    Registry-->>App: 注册完成

    Note over App,Custom: 组件渲染阶段
    App->>Inject: 渲染 InjectMaterial 组件
    Inject->>Registry: 查询渲染器 (getRendererComponent)

    alt 存在自定义渲染器
        Registry-->>Inject: 返回自定义 React 组件
        Inject->>Custom: 使用自定义组件渲染
        Custom-->>App: 渲染自定义 UI
    else 无自定义渲染器
        Registry-->>Inject: 返回 null 或类型不匹配
        Inject->>Default: 使用默认组件渲染
        Default-->>App: 渲染默认 UI
    end
```
