# 消费变量

在 FlowGram 中，当一个节点想要使用到前序节点的变量，就需要消费变量。

:::info{title="阅读提示"}

* 建议先完成[输出变量](/guide/variable/variable-output.md)，确保知道变量是如何被产出的；本篇作为第二站，专注于「如何拿到变量」。
* 如果想快速看看变量选择器的效果，可先用用 [VariableSelector](#variableselector)；若需要在代码里拿到变量列表，再继续阅读后续 API 章节。
* 本文示例默认使用「节点作用域」。涉及节点私有或全局作用域时，可随时参考[核心概念 - 画布中的变量](/guide/variable/concept.md#画布中的变量)补充理解。

:::

## `VariableSelector`

为了让你能更轻松地在应用中集成变量选择的功能，官方物料提供了 `VariableSelector` 组件。

详见文档： [VariableSelector](/materials/components/variable-selector.md)

## 获取可访问的变量树

在画布的节点中，我们常常需要获取**当前作用域下可用的变量**，并将它们以树形结构展示出来，方便用户进行选择和操作。

:::info{title="常见需求拆解"}

* **仅需要展示变量列表** → `useAvailableVariables`
* **需要展示并响应对象/数组的下钻字段** → `ASTMatch` + 递归渲染
* **需要精准订阅指定变量/监听变化** → 直接操作 `scope.available`

:::

### `useAvailableVariables`

`useAvailableVariables` 是一个轻量级的 Hook，它直接返回当前作用域可用的变量数组 (`VariableDeclaration[]`)。

```tsx pure title="use-variable-tree.tsx" {7}
import {
  type BaseVariableField,
  useAvailableVariables,
} from '@flowgram.ai/fixed-layout-editor';

// .... 在 React 组件或 Hook 中
const availableVariables = useAvailableVariables();

const renderVariable = (variable: BaseVariableField) => {
  // 这里可以根据你的需求渲染每个变量
  // ....
}

return availableVariables.map(renderVariable);

// ....
```

### 获取 Object 类型变量的下钻

当变量的类型是 `Object` 时，我们往往需要能够“下钻”到它的内部，获取其属性。`ASTMatch.isObject` 方法可以帮助我们判断一个变量类型是否为对象。如果是，我们就可以递归地渲染它的 `properties`。

:::tip

变量树的每一层其实都是「声明」(`BaseVariableField`)。在对象场景下，`properties` 就是下一级声明数组。

:::

```tsx pure title="use-variable-tree.tsx" {12}
import {
  type BaseVariableField,
  ASTMatch,
} from '@flowgram.ai/fixed-layout-editor';

// ....

const renderVariable = (variable: BaseVariableField) => ({
  title: variable.meta?.title,
  key: variable.key,
  // 只有 Object 类型的变量才可以下钻
  children: ASTMatch.isObject(variable.type) ? variable.type.properties.map(renderVariable) : [],
});

// ....

```

### 获取 Array 类型变量的下钻

与 `Object` 类型类似，当遇到 `Array` 类型的变量时，我们也希望能展示它的内部结构。对于数组，我们通常关心的是其元素的类型。`ASTMatch.isArray` 可以判断变量类型是否为数组。值得注意的是，数组的元素类型可能是任意的，甚至可能是另一个数组。因此，我们需要一个递归的辅助函数 `getTypeChildren` 来处理这种情况。

```tsx pure title="use-variable-tree.tsx" {13,16}
import {
  type BaseVariableField,
  type BaseType,
  ASTMatch,
} from '@flowgram.ai/fixed-layout-editor';

// ....

const getTypeChildren = (type?: BaseType): BaseVariableField[] => {
  if (!type) return [];

  // 获取 Object 的属性
  if (ASTMatch.isObject(type)) return type.properties;

  // 递归获取 Array 的元素类型
  if (ASTMatch.isArray(type)) return getTypeChildren(type.items);

  return [];
};

const renderVariable = (variable: BaseVariableField) => ({
  title: variable.meta?.title,
  key: variable.key,
  children: getTypeChildren(variable.type).map(renderVariable),
});

// ....

```

## `scope.available`

`scope.available` 是变量系统的核心之一，可以对 **作用域内可用变量** 进行更加高级的变量获取和监听动作。

:::info{title="何时直接用 scope.available？"}

* 需要通过 keyPath 精确读取或校验变量。
* 需要在 Hook 之外（如插件、服务）操作变量可见性。
* 需要订阅变量变化但不希望整个列表刷新。

:::

### `useScopeAvailable`

`useScopeAvailable` 能够在 React 中直接返回 `scope.available`

```tsx
import { useScopeAvailable } from '@flowgram.ai/free-layout-editor';

const available = useScopeAvailable();

// available 对象上包含了变量列表和其他 API
console.log(available.variables);

// 获取单个变量
console.log(available.getByKeyPath(['start_0', 'xxx']));

// 监听单个变量的变化
available.trackByKeyPath(['start_0', 'xxx'], () => {
  // ...
})
```

:::info{title="与 useAvailableVariables 的主要区别"}

* **返回值不同**：`useAvailableVariables` 直接返回变量数组，而 `useScopeAvailable` 返回的是一个包含了 `variables` 属性以及其他方法的 `ScopeAvailableData` 对象。
* **适用场景**：当你需要对变量进行更复杂的操作，比如通过 `trackByKeyPath` 追踪单个变量的变化时，`useScopeAvailable` 是你的不二之选。

:::

:::warning{title="useScopeAvailable 会在可用变量变化时自动刷新"}

如果不想自动刷新，可以通过 autoRefresh 参数关闭：

```tsx
useScopeAvailable({ autoRefresh: false })
```

:::

### `getByKeyPath`

通过`getByKeyPath` 可以在当前作用域的可访问变量中获取特定变量字段（包括嵌套在 Object 或 Array 中的变量）

```tsx {6,13-17}
import { useScopeAvailable } from '@flowgram.ai/fixed-layout-editor';
import { useEffect, useState } from 'react';

function VariableDisplay({ keyPath }: { keyPath:string[] }) {
  const available = useScopeAvailable();
  const variableField = available.getByKeyPath(keyPath)

  return <div>{variableField.meta?.title}</div>;
}
```

`getByKeyPath` 也尝尝用于变量校验中，如：

```tsx
const validateVariableInNode = (keyPath: string, node: FlowNodeEntity) => {
  // 校验变量能否被当前节点所访问
  return Boolean(node.scope.available.getByKeyPath(keyPath))
}
```

### `trackByKeyPath`

当你只关心某个特定变量字段（包括嵌套在 Object 或 Array 中的变量）的变化时，`trackByKeyPath` 能让你精准地“订阅”这个变量的更新，而不会因为其他不相关变量的变化导致组件重新渲染，从而实现更精细的性能优化。

:::tip

配合 `autoRefresh: false` 使用时，可以避免大范围刷新，只在订阅的变量变化时手动更新组件状态。

:::

```tsx {6,13-18}
import { useScopeAvailable } from '@flowgram.ai/fixed-layout-editor';
import { useEffect, useState } from 'react';

function UserNameDisplay() {
  // 关闭 autoRefresh 能力，防止任意变量变化触发重渲染
  const available = useScopeAvailable({ autoRefresh: false });
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // 定义我们要追踪的变量路径
    const keyPath = ['user', 'name'];

    // 开始追踪！
    const disposable = available.trackByKeyPath(keyPath, (nameField) => {
      // 当 user.name 变量字段变化时，这个回调函数会被触发
      // nameField 就是那个变化的变量字段，我们可以从中获取最新的默认值
      setUserName(nameField?.meta.default || '');
    });

    // 组件卸载时取消追踪，避免内存泄漏
    return () => disposable.dispose();
  }, [available]); // 依赖项是 available 对象

  return <div>User Name: {userName}</div>;
}
```

### 整体监听 API

除了 `trackByKeyPath`，`ScopeAvailableData` 还提供了一套整体变量变化的事件监听 API，让你能够更精细地控制变量变化的响应逻辑。

这在处理一些复杂的、需要手动管理订阅的场景时非常有用。

下面我们通过一个表格来详细对比这三个核心的监听 API：

| API & 回调参数 | 触发时机 | 核心区别与适用场景 |
| :--- | :--- | :--- |
| `onVariableListChange: (variables: VariableDeclaration[]) => void` | 当可用变量的**列表结构**发生变化时。 | **只关心列表本身**。比如，上游节点新增/删除了一个输出变量，导致可用变量的总数或成员发生了变化。它不关心变量内部和下钻的改变。适用于需要根据变量列表的有无或数量来更新 UI 的场景。 |
| `onAnyVariableChange: (changedVariable: VariableDeclaration) => void` | 当列表中**任意一个**变量的**类型，元数据和下钻字段**发生变化时。 | **只关心变量定义的更新**。比如，用户修改了一个输出变量的类型。它不关心列表结构的变化。适用于需要对任何一个变量的内容变化做出反应的场景。 |
| `onListOrAnyVarChange: (variables: VariableDeclaration[]) => void` | 以上两种情况**任意一种**发生时。 | **最全面的监听**，是前两者的结合。无论是列表结构变化，还是任何一个变量的变化，都会触发。适用于需要对任何可能的变化都进行响应的“兜底”场景。 |

让我们通过一个具体的例子来看看如何在组件中使用这些 API。

```tsx {5,9-11,14-16,19-22}
import { useScopeAvailable } from '@flowgram.ai/fixed-layout-editor';
import { useEffect } from 'react';

function AdvancedListenerComponent() {
  const available = useScopeAvailable({ autoRefresh: false });

  useEffect(() => {
    // 1. 监听列表结构变化
    const listChangeDisposable = available.onVariableListChange((variables) => {
      console.log('可用变量列表的结构变了！新的列表长度是：', variables.length);
    });

    // 2. 监听任意变量的变化
    const valueChangeDisposable = available.onAnyVariableChange((changedVariable) => {
      console.log(`变量 '${changedVariable.keyPath.join('.')}' 的定义变了`);
    });

    // 3. 监听所有变化（结构或单个变量内部）
    const allChangesDisposable = available.onListOrAnyVarChange((variables) => {
      console.log('变量列表或其中某个变量发生了变化！');
      // 注意：这里的回调参数是完整的变量列表，而不是单个变化的变量
    });

    // 在组件卸载时，务必清理所有的监听器，防止内存泄漏
    return () => {
      listChangeDisposable.dispose();
      valueChangeDisposable.dispose();
      allChangesDisposable.dispose();
    };
  }, [available]);

  return <div>请在控制台查看变量变化的日志...</div>;
}
```

:::warning

这些 API 返回的都是一个 `Disposable` 对象。为了避免内存泄漏和不必要的计算，你必须在 `useEffect` 的清理函数中调用其 `dispose()` 方法来取消监听。

:::

## 获取当前作用域的输出变量

### `useOutputVariables`

`useOutputVariables` 可以获取**当前作用域的输出变量**，并在输出变量列表或者下钻变化时**自动触发刷新**。

```tsx
const variables = useOutputVariables();
```

:::tip

useOutputVariables 在 flowgram@0.5.6 之后的版本提供，如果版本较早，可以通过以下代码实现获取：

```tsx
const scope = useCurrentScope();
const refresh = useRefresh();

useEffect(() => {
  const disposable = scope.output.onListOrAnyVarChange(() => {
    refresh();
  });

  return () => disposable.dispose();
}, [])

const variables = scope.variables;
```

:::

## 其余 API

### 获取当前作用域

可以通过 [`useCurrentScope`](https://flowgram.ai/auto-docs/editor/functions/useCurrentScope) 获取当前的作用域。

```tsx
const scope = useCurrentScope()

scope.output.variables

scope.available

```

### 设定当前作用域

可以通过 [`ScopeProvider`](https://flowgram.ai/auto-docs/editor/functions/ScopeProvider) 设定当前作用域。

```tsx
// set the scope of current node
<ScopeProvider scope={node.scope}>
  <YourUI />
</ScopeProvider>

// set to private scope of current node
<ScopeProvider scope={node.privateScope}>
  <YourUI />
</ScopeProvider>
```
