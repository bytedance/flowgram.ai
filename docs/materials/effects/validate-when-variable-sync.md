import { SourceCode } from '@theme';
import { BasicStory } from 'components/form-materials/effects/validate-when-variable-sync';

# validateWhenVariableSync

当字段可访问的变量发生了变化时，则重新触发指定**错误字段**的校验。

:::note{title="为什么是错误字段？"}

错误字段的**错误信息可能源于变量引用的有效性**。

如果字段的**可访问变量发生了变化，使得字段的变量引用从无效变为有效**，就需要需要重新校验当前字段，清空之前的错误信息。

:::

| 引入前 | 引入后 |
| --- | --- |
| <img loading="lazy" src="/materials/validate-when-variable-sync-without-effect.gif" alt="syncVariableTitle 没引入" style={{ width: 500 }} /> *变量从无效变有效，错误信息还在* | <img loading="lazy" src="/materials/validate-when-variable-sync-with-effect.gif" alt="syncVariableTitle 引入" style={{ width: 500 }} /> *变量从无效变有效，错误信息自动清空* |

## 案例演示

### 基本使用

<BasicStory />

```tsx pure title="form-meta.tsx"
const formMeta = {
  effect: {
    value: validateWhenVariableSync(),
  },
  validate: {
    value: ({ value, context }) =>
      validateFlowValue(value, {
        node: context.node,
        errorMessages: {
          unknownVariable: 'Unknown Variable',
        },
      }),
  },
};
```

## API 参考

`validateWhenVariableSync(options?: { scope?: 'private' | 'public' })`

| 参数 | 类型 | 说明 | 默认值 | 是否必选 |
| --- | --- | --- | --- | --- |
| `options.scope` | `'private' \| 'public'` | 变量作用域类型，指定监听私有还是公共变量的变化 | - | 否 |

## 源码导读

<SourceCode href="https://github.com/bytedance/flowgram.ai/tree/main/packages/materials/form-materials/src/effects/validate-when-variable-sync/index.ts" />

使用 CLI 命令可以复制源代码到本地：

```bash
npx @flowgram.ai/cli@latest materials effects/validate-when-variable-sync
```

### 目录结构讲解

```
packages/materials/form-materials/src/effects/validate-when-variable-sync/
└── index.ts           # 核心实现和导出
```

### 核心实现说明

该效果通过监听字段可访问的变量变化，当变量发生变化时自动触发错误字段的校验，确保当变量引用从无效变为有效时能及时清除错误信息。

主要流程：

1. 监听表单初始化事件 `DataEvent.onValueInit`
2. 根据配置获取对应的节点作用域（私有或公共）
3. 监听作用域中可用变量的变化事件 `available.onListOrAnyVarChange`
4. 当变量变化时，筛选出包含当前字段名称的错误字段
5. 对筛选出的错误字段重新进行校验
6. 返回清理函数以释放事件监听器

### 依赖梳理

#### flowgram API

[**@flowgram.ai/variable-core**](https://github.com/bytedance/flowgram.ai/tree/main/packages/variable-engine/variable-core)

* `scope.available.onListOrAnyVarChange`: 监听作用域中可用变量的变化事件
