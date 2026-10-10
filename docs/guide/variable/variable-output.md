# 输出变量

我们主要将输出变量分为三类：

1. **输出节点变量**：通常作为该节点的产出，供后续节点使用。
2. **输出节点私有变量**：输出变量仅限于节点内部（包括子节点），不能被外部节点访问。
3. **输出全局变量**：贯穿整个流程，任何节点都可以读取，适合存放一些公共状态或配置。

:::info{title="阅读指引"}

* 读完[变量介绍](/guide/variable/basic.md)后，可先从这里开始，通过实践搞清楚「变量是如何被产出的」。
* 若你从表单配置出发，优先阅读「方式一：通过表单副作用同步」；若需要运行时动态创建变量，请看插件或 UI 相关章节。
* 文中所有示例均使用了 `ASTFactory`，可先对照[变量概念 - AST 小节](/guide/variable/concept.md#ast-) 理解 AST 的概念。

:::

## 输出节点变量

输出节点变量与当前节点的生命周期绑定：节点创建时变量诞生，节点删除时变量消失。（详见：[节点作用域](/guide/variable/concept.md#节点作用域)）

我们通常有三种方式来输出节点变量：

:::info{title="如何选择方式"}

* 变量定义源于表单配置 → 方式一。
* 变量在运行时根据逻辑生成或批量同步 → 方式二。
* UI 里直接写变量只作临时调试，正式环境请避免使用方式三。

:::

### 方式一：通过表单副作用同步

[表单副作用](/guide/form/form.md#副作用-effect) 通常在节点的 `form-meta.ts` 文件中进行配置，是定义节点输出变量最常见的方式。

:::info{title="适用场景"}

* 节点的变量模型可以从表单项推导出来。

:::

#### `provideJsonSchemaOutputs`

若节点所需输出变量的结构与 [JSON Schema](https://json-schema.org/) 结构匹配，即可使用官方提供的 `provideJsonSchemaOutputs` 副作用物料。

详见文档： [provideJsonSchemaOutputs](/materials/effects/provide-json-schema-outputs.md)

#### `createEffectFromVariableProvider`

`provideJsonSchemaOutputs` 只适配 `JsonSchema`。如果你想要定义自己的一套 Schema，那么就需要自定义表单的副作用。

:::note

FlowGram 提供了 `createEffectFromVariableProvider`，只需要定义一个 `parse`函数，就可以自定义自己的变量同步副作用：

* `parse` 会在表单值初始化和更新时被调用
* `parse` 的输入为当前字段的表单的值
* `parse` 的输出为变量 AST

:::

下面这个例子中，我们为表单的两个字段 `path.to.value` 和 `path.to.value2` 分别创建了输出变量：

```tsx pure title="form-meta.ts" {26-37,40-56}
import {
  createEffectFromVariableProvider,
  ASTFactory,
  type ASTNodeJSON
} from '@flowgram.ai/fixed-layout-editor';

export function createTypeFromValue(typeValue: string): ASTNodeJSON | undefined {
  switch (typeValue) {
    case 'string':
      return ASTFactory.createString();
    case 'number':
      return ASTFactory.createNumber();
    case 'boolean':
      return ASTFactory.createBoolean();
    case 'integer':
      return ASTFactory.createInteger();
    default:
      return;
  }
}

export const formMeta =  {
  effect: {
    // Create first variable
    // = node.scope.setVar('path.to.value', ASTFactory.createVariableDeclaration(parse(v)))
    'path.to.value': createEffectFromVariableProvider({
      // parse form value to variable
      parse(v: string, { node }) {
        return [{
          meta: {
            title: `Your Output Variable Title`,
          },
          key: `uid_${node.id}`,
          type: createTypeFromValue(v)
        }]
      }
    }),
    // Create second variable
    // = node.scope.setVar('path.to.value2', ASTFactory.createVariableDeclaration(parse(v)))
    'path.to.value2': createEffectFromVariableProvider({
      // parse form value to variable
      parse(v: { name: string; typeValue: string }[], { node }) {
        return {
          meta: {
            title: `Second Output Variable For ${node.form.getValueIn("title")}`,
          },
          key: `uid_${node.id}_2`,
          type: ASTFactory.createObject({
            properties: v.map(_item => ASTFactory.createProperty({
              key: _item.name,
              type: createTypeFromValue(_item.typeValue)
            }))
          })
        }
      }
    }),
  },
  render: () => (
    // ...
  )
}
```

:::tip

如果你的协议比较复杂，不知道如何解析为 AST，不妨参考下官方物料中 Json Schema 转换为 AST 的实现：[JsonSchemaUtils.schemaToAST](https://github.com/bytedance/flowgram.ai/blob/main/packages/variable-engine/json-schema/src/json-schema/utils.ts)

:::

:::warning

使用 VariableSelector 官方物料进行变量选择时，**当前节点定义的每个输出变量都会作为独立的树节点显示**，而非默认按节点进行分组。参考 [VariableSelector 物料文档](/materials/components/variable-selector.md)

:::

#### 多个表单字段同步到一个变量上

如果多个字段同步到一个变量，就需要用到 `createEffectFromVariableProvider` 的 `namespace` 字段，将多个字段的变量数据同步到同一个命名空间上。

```tsx pure title="form-meta.ts" {11}
import {
  createEffectFromVariableProvider,
  ASTFactory,
} from '@flowgram.ai/fixed-layout-editor';

/**
 * 从 form 拿到多个字段的信息
 */
const variableSyncEffect = createEffectFromVariableProvider({
  // 必须添加，确保不同字段的副作用，同步到同一个命名空间上
  namespace: 'your_namespace',

  // 将表单值解析为变量
  parse(_, { form, node }) {
    // 注意：form 字段要求 flowgram 版本 > 0.5.5, 之前的版本可以通过 node.form 获取
    return [{
      meta: {
        title: `Title_${form.getValueIn('path.to.value')}_${form.getValueIn('path.to.value2')}`,
      },
      key: `uid_${node.id}`,
      type: ASTFactory.createCustomType({ typeName: "CustomVariableType" })
    }]
  }
})

export const formMeta = {
  effect: {
    'path.to.value': variableSyncEffect,
    'path.to.value2': variableSyncEffect,
  },
  render: () => (
   // ...
  )
}
```

#### 在副作用中使用 `node.scope` API

如果 `createEffectFromVariableProvider` 不能满足你的需求，你也可以直接在表单副作用中使用 `node.scope` API，进行更加灵活多变的变量操作。

:::note

`node.scope` 会返回一个节点的变量作用域（Scope）对象，这个对象上挂载了几个核心方法：

* `setVar(variable)`: 设置一个变量。
* `setVar(namespace, variable)`: 在指定的命名空间下设置一个变量。
* `getVar()`: 获取所有变量。
* `getVar(namespace)`: 获取指定命名空间下的变量。
* `clearVar()`: 清空所有变量。
* `clearVar(namespace)`: 清空指定命名空间下的变量。

:::

```tsx pure title="form-meta.tsx" {10-18,29-38}
import { Effect } from '@flowgram.ai/editor';

export const formMeta = {
  effect: {
    'path.to.value': [{
      event: DataEvent.onValueInitOrChange,
      effect: ((params) => {
        const { context, value } = params;

        context.node.scope.setVar(
          ASTFactory.createVariableDeclaration({
            meta: {
              title: `Title_${value}`,
            },
            key: `uid_${context.node.id}`,
            type: ASTFactory.createString(),
          })
        )

        console.log("查看生成的变量", context.node.scope.getVar())

      }) as Effect,
    }],
    'path.to.value2': [{
      event: DataEvent.onValueInitOrChange,
      effect: ((params) => {
        const { context, value } = params;

        context.node.scope.setVar(
          'namespace_2',
          ASTFactory.createVariableDeclaration({
            meta: {
              title: `Title_${value}`,
            },
            key: `uid_${context.node.id}_2`,
            type: ASTFactory.createNumber(),
          })
        )

        console.log("查看生成的变量", context.node.scope.getVar('namespace_2'))

      }) as Effect,
    }],
  },
  render: () => (
    // ...
  )
}
```

### 方式二：通过插件同步变量

除了在表单中静态配置，我们还可以在插件（Plugin）中，通过 `node.scope` 更新自由动态地操作节点的变量。

:::info{title="适用场景"}

* 需要跨多个节点批量创建或调整变量。
* 需要在画布初始化阶段自动补齐默认变量。

:::

#### 指定节点的 Scope 进行更新

下面的例子演示了如何在插件的 `onInit`生命周期中，获取开始节点的 `Scope`，并对它的变量进行一系列操作。

```tsx pure title="sync-variable-plugin.tsx" {10-22}
import {
  FlowDocument,
  definePluginCreator,
  PluginCreator,
} from '@flowgram.ai/fixed-layout-editor';

export const createSyncVariablePlugin: PluginCreator<SyncVariablePluginOptions> =
  definePluginCreator<SyncVariablePluginOptions, FixedLayoutPluginContext>({
    onInit(ctx, options) {
      const startNode = ctx.get(FlowDocument).getNode('start_0');
      const startScope =  startNode.scope!

      // Set Variable For Start Scope
      startScope.setVar(
        ASTFactory.createVariableDeclaration({
          meta: {
            title: `Your Output Variable Title`,
          },
          key: `uid`,
          type: ASTFactory.createString(),
        })
      )
    }
  })
```

#### 在 onNodeCreate 同步变量

下面的例子演示了如何通过 `onNodeCreate` 获取到新创建节点的 Scope，并通过监听 `node.form.onFormValuesChange` 实现变量的同步操作。

```tsx pure title="sync-variable-plugin.tsx" {10,29}
import {
  FlowDocument,
  definePluginCreator,
  PluginCreator,
} from '@flowgram.ai/fixed-layout-editor';

export const createSyncVariablePlugin: PluginCreator<SyncVariablePluginOptions> =
  definePluginCreator<SyncVariablePluginOptions, FixedLayoutPluginContext>({
    onInit(ctx, options) {
      ctx.get(FlowDocument).onNodeCreate(({ node }) => {
        const syncVariable = (title: string) => {
          node.scope?.setVar(
            ASTFactory.createVariableDeclaration({
              key: `uid_${node.id}`,
              meta: {
                title,
                icon: iconVariable,
              },
              type: ASTFactory.createString(),
            })
          );
        };

        if (node.form) {
          // sync variable on init
          syncVariable(node.form.getValueIn('title'));

          // listen to form values change
          node.form?.onFormValuesChange(({ values, name }) => {
            // title field changed
            if (name.match(/^title/)) {
              syncVariable(values[name]);
            }
          });
        }
      });
    }
  })
```

### 方式三：在 UI 中同步变量（不推荐）

:::warning
直接在 UI 中同步变量（方式三）是一种 **非常不推荐** 的做法。它会打破**数据和渲染分离**的原则，会导致数据和渲染之间的紧密耦合，可能会导致：

* 关闭节点侧边栏，就无法触发变量同步，导致数据和渲染之间的不一致。
* 画布如果开启了只渲染视图内可见节点的性能优化，如果节点不在视图内，则联动逻辑会失效

:::

下面的例子演示了如何在 `formMeta.render` 中，通过 `useCurrentScope` 事件，同步更新变量。

```tsx pure title="form-meta.ts" {13}
import {
  createEffectFromVariableProvider,
  ASTFactory,
} from '@flowgram.ai/fixed-layout-editor';

/**
 * 从 form 拿到多个字段的信息
 */
const FormRender = () => {
  /**
   * 获取到当前作用域，用于后续设置变量
   */
  const scope = useCurrentScope()

  return <>
    <UserCustomForm
      onValuesChange={(values) => {
        scope.setVar(
          ASTFactory.createVariableDeclaration({
            meta: {
              title: values.title,
            },
            key: `uid`,
            type: ASTFactory.createString(),
          })
        )
      }}
    />
  </>
}

export const formMeta = {
  render: () => <FormRender />
}
```

## 输出节点私有变量

私有变量是指只能在当前节点及其子节点中访问的变量。（详见：[节点私有作用域](/guide/variable/concept.md#节点私有作用域)）

:::tip

判断是否要使用私有作用域的小诀窍：变量内容只为节点内部实现服务，并不希望暴露给下游节点时，就放到 `node.privateScope`。

:::

下面只列举其中两种方式，其他方式可以根据[输出节点变量](#输出节点变量)的方式类推。

### 方式一：`createEffectFromVariableProvider`

`createEffectFromVariableProvider` 提供了参数 `scope`，用于指定变量的作用域。

* `scope` 设置为 `private` 时，变量的作用域为当前节点的私有作用域 `node.privateScope`
* `scope` 设置为 `public` 时，变量的作用域为当前节点的作用域 `node.scope`

```tsx pure title="form-meta.ts" {11}
import {
  createEffectFromVariableProvider,
  ASTFactory,
} from '@flowgram.ai/fixed-layout-editor';

export const formMeta =  {
  effect: {
    // Create variable in privateScope
    // = node.privateScope.setVar('path.to.value', ASTFactory.createVariableDeclaration(parse(v)))
    'path.to.value': createEffectFromVariableProvider({
      scope: 'private',
      // parse form value to variable
      parse(v: string, { node }) {
        return [{
          meta: {
            title: `Private_${v}`,
          },
          key: `uid_${node.id}_locals`,
          type: ASTFactory.createBoolean(),
        }]
      }
    }),
  },
  render: () => (
    // ...
  )
}
```

### 方式二：`node.privateScope`

`node.privateScope` 的 API 设计得和节点作用域（`node.scope`）几乎一模一样，都提供了 `setVar`、`getVar`、`clearVar`等方法，并且同样支持命名空间（namespace）。详情可以参考 [`node.scope`](#在副作用中使用-nodescope-api)。

```tsx pure title="form-meta.tsx" {10-18}
import { Effect } from '@flowgram.ai/editor';

export const formMeta = {
  effect: {
    'path.to.value': [{
      event: DataEvent.onValueInitOrChange,
      effect: ((params) => {
        const { context, value } = params;

        context.node.privateScope.setVar(
          ASTFactory.createVariableDeclaration({
            meta: {
              title: `Your Private Variable Title`,
            },
            key: `uid_${context.node.id}`,
            type: ASTFactory.createInteger(),
          })
        )

        console.log("查看生成的变量", context.node.privateScope.getVar())

      }) as Effect,
    }],
  },
  render: () => (
    // ...
  )
}
```

## 输出全局变量

全局变量就像是整个流程的“共享内存”，任何节点、任何插件都可以访问和修改它。它非常适合用来存储一些贯穿始终的状态，比如用户信息、环境配置等等。（详见：[全局作用域](/guide/variable/concept.md#全局作用域)）

:::info{title="何时选用全局作用域"}

* 变量在多个流程节点甚至插件中被复用。
* 变量与具体节点解耦，例如环境配置、用户上下文。
* 需要在流程初始化阶段就写入，后续节点只需读取。

:::

和节点变量类似，我们也有两种主要的方式来获取全局变量的作用域（`GlobalScope`）。

### 方式一：在插件中获取

在插件的上下文中（`ctx`），我们可以直接“注入”`GlobalScope` 的实例：

```tsx pure title="global-variable-plugin.tsx" {10-20}
import {
  GlobalScope,
  definePluginCreator,
  PluginCreator
} from '@flowgram.ai/fixed-layout-editor';

export const createGlobalVariablePlugin: PluginCreator<SyncVariablePluginOptions> =
  definePluginCreator<SyncVariablePluginOptions, FixedLayoutPluginContext>({
    onInit(ctx, options) {
      const globalScope = ctx.get(GlobalScope)

      globalScope.setVar(
         ASTFactory.createVariableDeclaration({
          meta: {
            title: `Your Output Variable Title`,
          },
          key: `your_variable_global_unique_key`,
          type: ASTFactory.createString(),
        })
      )
    }
  })

```

### 方式二：在 UI 中获取

如果你想在画布的 React 组件中与全局变量交互，可以使用 `useService` 这个 Hook 来获取 `GlobalScope` 的实例：

```tsx pure title="global-variable-component.tsx" {7}
import {
  GlobalScope,
  useService,
} from '@flowgram.ai/fixed-layout-editor';

function GlobalVariableComponent() {
  const globalScope = useService(GlobalScope)

  // ...

  const handleChange = (v: string) => {
    globalScope.setVar(
      ASTFactory.createVariableDeclaration({
        meta: {
          title: `Your Output Variable Title`,
        },
        key: `uid_${v}`,
        type: ASTFactory.createString(),
      })
    )
  }

  return <Input onChange={handleChange}/>
}

```

### 全局作用域的 API

`GlobalScope` 的 API 设计得和节点作用域（`node.scope`）几乎一模一样，都提供了 `setVar`、`getVar`、`clearVar` 等方法，并且同样支持命名空间（namespace）。详情可以参考 [`node.scope`](#在副作用中使用-nodescope-api)。

下面是一个在插件中操作全局变量的综合示例：

```tsx pure title="sync-variable-plugin.tsx" {11-39}
import {
  GlobalScope,
} from '@flowgram.ai/fixed-layout-editor';

// ...

onInit(ctx, options) {
  const globalScope = ctx.get(GlobalScope);

  // 1. Create, Update, Read, Delete Variable in GlobalScope
  globalScope.setVar(
    ASTFactory.createVariableDeclaration({
      meta: {
        title: `Your Output Variable Title`,
      },
      key: `your_variable_global_unique_key`,
      type: ASTFactory.createString(),
    })
  )

  console.log(globalScope.getVar())

  globalScope.clearVar()

  // 2.  Create, Update, Read, Delete Variable in GlobalScope's namespace: 'namespace_1'
    globalScope.setVar(
      'namespace_1',
      ASTFactory.createVariableDeclaration({
        meta: {
          title: `Your Output Variable Title 2`,
        },
        key: `uid_2`,
        type: ASTFactory.createString(),
      })
  )

  console.log(globalScope.getVar('namespace_1'))

  globalScope.clearVar('namespace_1')

  // ...
}
```

详见：[Class: GlobalScope](https://flowgram.ai/auto-docs/editor/classes/GlobalScope.html)
