import { SourceCode } from '@theme';
import { BasicStory, PlaceholderStory, DisabledStory } from 'components/form-materials/components/blur-input';

# BlurInput

BlurInput 是一个特殊的输入框组件，它只在输入框失焦时才会触发值的更新，适用于需要避免频繁触发更新操作的场景。

## 案例演示

### 基本使用

<BasicStory />

```tsx pure title="form-meta.tsx"
const formMeta = {
  render: () => (
    <>
      <FormHeader />
      <Field<string> name="blur_input" defaultValue="Initial text">
        {({ field }) => (
          <>
            <BlurInput
              value={field.value}
              onChange={(value) => field.onChange(value)}
              placeholder="Please enter text"
            />
            <p className="mt-2">Current value: {field.value}</p>
            <p className="text-sm text-gray-500">
              Note: Value updates after clicking outside the input
            </p>
          </>
        )}
      </Field>
    </>
  )
}
```

### 带占位符

<PlaceholderStory />

```tsx pure title="form-meta.tsx"
const formMeta = {
  render: () => (
    <>
      <FormHeader />
      <Field<string> name="blur_input_placeholder" defaultValue="">
        {({ field }) => (
          <>
            <BlurInput
              value={field.value}
              onChange={(value) => field.onChange(value)}
              placeholder="This is an input field with placeholder"
            />
            <p className="mt-2">Current value: {field.value || 'Empty'}</p>
          </>
        )}
      </Field>
    </>
  )
}
```

### 禁用状态

<DisabledStory />

```tsx pure title="form-meta.tsx"
const formMeta = {
  render: () => (
    <>
      <FormHeader />
      <Field<string> name="blur_input_disabled" defaultValue="Disabled state text">
        {({ field }) => (
          <BlurInput value={field.value} onChange={(value) => field.onChange(value)} disabled />
        )}
      </Field>
    </>
  )
}
```

## API 参考

### 属性

| 属性名 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| value | `string` | - | 输入框的值 |
| onChange | `(value: string, event?: React.FocusEvent) => void` | - | 失焦时触发的回调函数 |
| placeholder | `string` | - | 输入框占位符文本 |
| disabled | `boolean` | `false` | 是否禁用输入框 |
| ref | `React.RefObject<HTMLInputElement>` | - | 输入框的引用 |
| 其他属性 | 继承自 [Semi UI Input 组件](https://semi.design/zh-CN/input/input) | - | 支持 Semi UI Input 组件的所有其他属性 |

## 源码导读

<SourceCode href="https://github.com/bytedance/flowgram.ai/tree/main/packages/materials/form-materials/src/components/blur-input" />

使用 CLI 命令可以复制源代码到本地：

```bash
npx @flowgram.ai/cli@latest materials components/blur-input
```

### 目录结构讲解

```
components/blur-input/
└── index.tsx  # 组件实现文件
```

### 核心实现说明

BlurInput 组件的核心实现非常简洁，主要包含以下几个部分：

1. **状态管理**：使用 `useState` 维护内部值状态，与传入的 `value` 属性解耦
2. **值同步**：使用 `useEffect` 在外部 `value` 变化时更新内部状态
3. **延迟更新**：在用户输入时只更新内部状态，仅在 `onBlur` 事件触发时才调用外部传入的 `onChange` 回调

这种实现方式确保了值的更新只在用户完成输入并点击外部区域时发生，有效减少了不必要的更新操作，特别适合需要进行表单验证或远程数据请求的场景。

### 依赖梳理

#### 第三方库

[**Semi UI Input 组件**](https://semi.design/zh-CN/input/input) 提供基础的输入框功能支持，BlurInput 组件继承了其所有属性并添加了失焦更新的特性。
