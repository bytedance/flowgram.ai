# 作用域链

:::info{title="阅读前提"}

* 建议先完成[输出变量](/guide/variable/variable-output.md)、[消费变量](/guide/variable/variable-consume.md)的实践。
* 如果对作用域概念还不够熟悉，可先回顾[核心概念 - 作用域链](/guide/variable/concept.md#作用域链)。

:::

## 默认作用域链逻辑

详见：[画布中的作用域](/guide/variable/concept.md#画布中的变量)

## 在 `editor-props` 中定制

作用域的定制逻辑，通常在 `editor-props` 中，通过 `variableEngine.chainConfig` 定制。

```tsx pure title="use-editor-props.tsx" {6-8}
// ...
{
  // ...
  variableEngine: {
    enable: true,
    chainConfig: {
      // 作用域链逻辑定制
    }
  }
  // ...
}
// ...
```

### 子节点能否被后续节点依赖

**默认情况下，子节点是不可以被父节点的后续节点依赖的**。

如果需要定制这个逻辑，需要在 `variableEngine.chainConfig.isNodeChildrenPrivate` 中配置。

```tsx pure title="use-editor-props.tsx" {8-15}
{
  variableEngine: {
    enable: true,
    chainConfig: {
      /**
       * 定制：子节点是否可以被父节点的后续节点依赖
       */
      isNodeChildrenPrivate(node) {
        // 当命中用户某类自定义节点时，允许其子节点被后续节点依赖
        if (node.flowNodeType === 'Your_Custom_Type') {
          return false;
        }
        // 否则：默认不允许子节点被后续节点依赖
        return true;
      },
    }
  }
}
```
