import { SourceCode } from '@theme';
import { BasicStory } from 'components/form-materials/components/sql-editor-with-variables';

# SQLEditorWithVariables

SQLEditorWithVariables 是一个增强版的 SQL 编辑器，支持在 SQL 中插入变量引用。它基于 SQLCodeEditor 构建，集成了变量选择器和变量标签注入功能，使用户能够在 SQL 字符串中使用 `{{variable}}` 语法引用变量。

## 案例演示

### 基本使用

:::tip{title="变量插入"}

在编辑器中输入 `@`, `{` 字符可以触发变量选择器。

输入 `@`, `{` 后会显示可用的变量列表，选择变量后会自动插入为 `{{variable.name}}` 格式。

:::

<BasicStory />

```tsx pure title="form-meta.tsx"
import { SQLEditorWithVariables } from '@flowgram.ai/form-materials';

const formMeta = {
  render: () => (
    <>
      <FormHeader />
      <Field<string | undefined>
        name="sql_editor_with_variables"
        defaultValue="SELECT * FROM users WHERE user_id = {{start_0.str}}"
      >
        {({ field }) => (
          <SQLEditorWithVariables
            value={field.value}
            onChange={(value) => field.onChange(value)}
          />
        )}
      </Field>
    </>
  ),
}
```

### 带变量的 SQL 示例

```sql
SELECT
  id, name, email
FROM users
WHERE id = {{start_0.user_id}}
  AND email LIKE '%{{start_0.domain}}'
LIMIT 10;
```

## API 参考

### SQLEditorWithVariables Props

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| `value` | `string` | - | SQL 字符串内容 |
| `onChange` | `(value: string) => void` | - | 内容变化时的回调函数 |
| `theme` | `'dark' \| 'light'` | `'light'` | 编辑器主题 |
| `placeholder` | `string` | - | 占位符文本 |
| `activeLinePlaceholder` | `string` | `'按 @ 选择变量'` | 当前行的占位提示 |
| `readonly` | `boolean` | `false` | 是否为只读模式 |
| `options` | `Options` | - | CodeMirror 配置选项 |

## 源码导读

<SourceCode href="https://github.com/bytedance/flowgram.ai/tree/main/packages/materials/form-materials/src/components/sql-editor-with-variables" />

使用 CLI 命令可以复制源代码到本地：

```bash
npx @flowgram.ai/cli@latest materials components/sql-editor-with-variables
```

### 目录结构讲解

```
sql-editor-with-variables/
├── index.tsx           # 懒加载导出文件
└── editor.tsx          # 主组件实现
```

### 核心实现说明

#### 变量能力集成

SQLEditorWithVariables 扩展了基础 SQLCodeEditor，并基于 coze-editor-extensions 增加了变量引用和回显功能。

### 依赖的其他物料

[**CozeEditorExtensions**](/materials/components/coze-editor-extensions.md)

* `EditorVariableTree`: 变量树选择触发
* `EditorVariableTagInject`: 变量标签展示
