import { SourceCode } from '@theme';
import { DisplayFromScopeStory, DisplayFromFieldStory } from 'components/form-materials/components/display-outputs';

# DisplayOutputs

DisplayOutputs 是一个用于可视化展示节点输出变量的组件，支持从作用域自动获取输出变量或通过字段值手动指定输出模式。

## 案例演示

### 从作用域获取输出变量

当设置 `displayFromScope` 为 `true` 时，组件会自动从当前节点作用域获取输出变量并展示：

<DisplayFromScopeStory />

```tsx pure title="form-meta.tsx" {27}
import { DisplayOutputs, provideJsonSchemaOutputs } from '@flowgram.ai/form-materials';
import { Field } from '@flowgram.ai/editor';

const formMeta = {
  render: () => (
    <>
      <FormHeader />
      <Field<IJsonSchema | undefined> name="outputs">
        {({ field }) => (
          <JsonSchemaEditor value={field.value} onChange={(value) => field.onChange(value)} />
        )}
      </Field>
      <p>Display Output Schema:</p>
      <DisplayOutputs displayFromScope />
    </>
  ),
  effect: {
    outputs: provideJsonSchemaOutputs,
  },
}
```

### 通过字段值指定输出模式

当不设置 `displayFromScope` 时，组件通过 `value` 属性接收输出的 JSON Schema：

<DisplayFromFieldStory />

```tsx pure title="form-meta.tsx"
import { DisplayOutputs } from '@flowgram.ai/form-materials';
import { Field } from '@flowgram.ai/editor';

const formMeta = {
  render: () => (
    <>
      <FormHeader />
      <Field<IJsonSchema | undefined> name="outputs">
        {({ field }) => (
          <JsonSchemaEditor value={field.value} onChange={(value) => field.onChange(value)} />
        )}
      </Field>
      <p>Display Output Schema:</p>
      <Field<IJsonSchema | undefined> name="outputs">
        {({ field }) => <DisplayOutputs value={field.value} />}
      </Field>
    </>
  ),
}
```

## API 参考

### DisplayOutputs Props

| 属性名 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| value | `IJsonSchema` | - | 要展示的 JSON Schema 对象，当 `displayFromScope` 为 `false` 时使用 |
| displayFromScope | `boolean` | `false` | 是否从当前作用域自动获取输出变量 |
| showIconInTree | `boolean` | `false` | 是否在树形结构中显示图标 |
| typeManager | `JsonSchemaTypeManager` | - | 自定义类型管理器 |
| style | `React.CSSProperties` | - | 自定义样式 |

## 源码导读

<SourceCode href="https://github.com/bytedance/flowgram.ai/tree/main/packages/materials/form-materials/src/components/display-outputs" />

使用 CLI 命令可以复制源代码到本地：

```bash
npx @flowgram.ai/cli@latest materials display-outputs
```

### 目录结构讲解

```plaintext
display-outputs/
├── index.tsx    # 组件主入口，实现 DisplayOutputs 组件
└── styles.css   # 组件样式文件
```

### 核心实现说明

DisplayOutputs 组件的核心逻辑：

1. **作用域模式** (`displayFromScope=true`): 使用 `useCurrentScope` Hook 获取当前作用域的输出变量，通过 `scope?.output.variables` 获取变量列表并转换为 JSON Schema 属性

2. **字段模式** (`displayFromScope=false`): 直接使用 `value` 属性传入的 JSON Schema 对象

3. **变量监听**: 在作用域模式下，组件会监听输出变量的变化并自动刷新显示

4. **渲染实现**: 将 JSON Schema 的每个属性渲染为 `DisplaySchemaTag` 组件，支持类型图标和警告状态显示

### 依赖梳理

#### flowgram API

[**@flowgram.ai/editor**](https://github.com/bytedance/flowgram.ai/tree/main/packages/client/editor)

* [`useCurrentScope`](https://flowgram.ai/auto-docs/editor/functions/useCurrentScope): 获取当前作用域的 Hook
* [`useRefresh`](https://flowgram.ai/api/hooks/use-refresh): 强制组件刷新的 Hook

[**@flowgram.ai/json-schema**](https://github.com/bytedance/flowgram.ai/tree/main/packages/common/json-schema)

* [`IJsonSchema`](https://flowgram.ai/auto-docs/json-schema/interfaces/IJsonSchema): JSON Schema 类型定义
* [`JsonSchemaUtils`](https://flowgram.ai/auto-docs/json-schema/modules/JsonSchemaUtils): JSON Schema 工具函数
* [`JsonSchemaTypeManager`](https://flowgram.ai/auto-docs/json-schema/classes/JsonSchemaTypeManager): 类型管理器

#### 其他物料

[**DisplaySchemaTag**](/materials/components/display-schema-tag.md)

* `DisplaySchemaTag`: 用于展示单个 JSON Schema 属性的标签组件

#### 第三方库

[**React**](https://react.dev/)

* `useLayoutEffect`: 用于监听作用域变量变化
