# Output Variables

We primarily categorize output variables into three types:

1. **Output Node Variables**: Typically produced by the node and available for subsequent nodes to use.
2. **Output Node Private Variables**: Output variables limited to the node's interior (including child nodes) and not accessible by external nodes.
3. **Output Global Variables**: Available throughout the entire flow, readable by any node, suitable for storing public states or configurations.

:::info{title="Reading Guide"}

* After [Variable Introduction](/en/guide/variable/basic.md), start here to practice how variables are produced.
* If you work from form configuration, begin with “Method 1: Synchronization via Form Side Effects.” If you need runtime logic or batch updates, skip to the plugin or UI sections.
* Every example uses `ASTFactory`; revisit [Core Concepts – AST](/en/guide/variable/concept.md#ast-) if you need a refresher.

:::

## Output Node Variables

Output node variables are bound to the lifecycle of the current node: they are created with the node and removed when the node is deleted. (See [Node Scope](/en/guide/variable/concept.md#node-scope) for details.)

We typically have three ways to output node variables:

:::info{title="How to pick a method"}

* Variable definitions tied to form inputs → Method 1.
* Variables generated at runtime or synchronized in batches → Method 2.
* Writing variables directly in UI is only for temporary debugging; avoid Method 3 in production.

:::

### Method 1: Synchronization via Form Side Effects

[Form side effects](/en/guide/form/form.md#side-effects-effect) are usually configured in the node's `form-meta.ts` file and are the most common way to define node output variables.

:::info{title="When to use it"}

* The node’s variable model can be derived from form fields.

:::

#### `provideJsonSchemaOutputs`

If the structure of the output variables required by a node matches the [JSON Schema](https://json-schema.org/) structure, you can use the `provideJsonSchemaOutputs` side effect (Effect) material.

provideJsonSchemaOutputs uses the [`createEffectFromVariableProvider`](/en/guide/variable/variable-output.md) factory function to create variable providers.

See documentation: [provideJsonSchemaOutputs](/en/materials/effects/provide-json-schema-outputs.md)

#### `createEffectFromVariableProvider` Custom Output

`provideJsonSchemaOutputs` only adapts to `JsonSchema`. If you want to define your own set of Schema, you'll need to customize form side effects.

:::note

FlowGram provides `createEffectFromVariableProvider`, which only requires defining a `parse` function to customize your variable synchronization side effect:

* `parse` is called when the form value is initialized and updated
* The input of `parse` is the current field's form value
* The output of `parse` is variable AST

:::

In the following example, we create output variables for two form fields `path.to.value` and `path.to.value2`:

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

If your Schema is complex and you're not sure how to parse it into AST, you can refer to the official material's implementation of JSON Schema conversion to AST: [JsonSchemaUtils.schemaToAST](https://github.com/bytedance/flowgram.ai/blob/main/packages/variable-engine/json-schema/src/json-schema/utils.ts)

:::

:::warning

When using the VariableSelector official material for variable selection, **each output variable defined in the current node will be displayed as an independent tree node**, rather than being grouped by node by default.

For more details, please refer to the [VariableSelector Material Documentation](/en/materials/components/variable-selector.md)

:::

#### Synchronizing Multiple Form Fields to One Variable

If synchronizing multiple fields to one variable, you need to use the `namespace` field of `createEffectFromVariableProvider` to synchronize variable data from multiple fields to the same namespace.

```tsx pure title="form-meta.ts" {11}
import {
  createEffectFromVariableProvider,
  ASTFactory,
} from '@flowgram.ai/fixed-layout-editor';

/**
 * Get information from multiple form fields
 */
const variableSyncEffect = createEffectFromVariableProvider({
  // Must be added to ensure side effects from different fields synchronize to the same namespace
  namespace: 'your_namespace',

  // Parse form value to variable
  parse(_, { form, node }) {
    // Note: The form field requires flowgram version > 0.5.5, prior versions can get it through node.form
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

#### Using `node.scope` API in Side Effects

If `createEffectFromVariableProvider` doesn't meet your needs, you can also directly use the `node.scope` API in form side effects for more flexible variable operations.

:::note

`node.scope` returns a variable scope object for a node, which has several core methods mounted on it:

* `setVar(variable)`: Set a variable.
* `setVar(namespace, variable)`: Set a variable under a specified namespace.
* `getVar()`: Get all variables.
* `getVar(namespace)`: Get variables under a specified namespace.
* `clearVar()`: Clear all variables.
* `clearVar(namespace)`: Clear variables under a specified namespace.

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

        console.log("View generated variables", context.node.scope.getVar())

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

        console.log("View generated variables", context.node.scope.getVar('namespace_2'))

      }) as Effect,
    }],
  },
  render: () => (
    // ...
  )
}
```

### Method 2: Synchronizing Variables via Plugins

In addition to static configuration in forms, we can also freely and dynamically manipulate node variables in plugins through `node.scope`.

:::info{title="When to use it"}

* You need to create or adjust variables across multiple nodes in bulk.
* You want to auto-populate default variables when the canvas initializes.

:::

#### Updating via Specified Node's Scope

The following example demonstrates how to obtain the `Scope` of the start node in the `onInit` lifecycle of a plugin and perform a series of operations on its variables.

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

#### Synchronizing Variables in onNodeCreate

The following example demonstrates how to obtain the Scope of a newly created node through `onNodeCreate` and implement variable synchronization by listening to `node.form.onFormValuesChange`.

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

### Method 3: Synchronizing Variables in UI (Not Recommended)

:::warning
Directly synchronizing variables in UI (Method 3) is a **strongly discouraged** practice. It breaks the principle of **separation of data and rendering**, leading to tight coupling between data and rendering, which may cause:

* Closing the node sidebar prevents variable synchronization, resulting in inconsistency between data and rendering.
* If the canvas enables performance optimization to only render nodes visible in the view, and the node is not in the view, the联动 logic will fail.

:::

The following example demonstrates how to synchronously update variables in `formMeta.render` through the `useCurrentScope` event.

```tsx pure title="form-meta.ts" {13}
import {
  createEffectFromVariableProvider,
  ASTFactory,
} from '@flowgram.ai/fixed-layout-editor';

/**
 * Get information from form
 */
const FormRender = () => {
  /**
   * Get current scope for setting variables later
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

## Output Node Private Variables

Private variables are variables that can only be accessed within the current node and its child nodes. (See [Node Private Scope](/en/guide/variable/concept.md#node-private-scope).)

:::tip

Quick rule of thumb: if a variable only serves the node’s internal implementation and shouldn’t be exposed downstream, keep it in `node.privateScope`.

:::

Here we only list two methods, and other methods can be inferred from [Output Node Variables](#output-node-variables).

### Method 1: `createEffectFromVariableProvider`

`createEffectFromVariableProvider` provides the parameter `scope` for specifying the variable's scope.

* When `scope` is set to `private`, the variable's scope is the current node's private scope `node.privateScope`
* When `scope` is set to `public`, the variable's scope is the current node's scope `node.scope`

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

### Method 2: `node.privateScope`

The API design of `node.privateScope` is almost identical to the node scope (`node.scope`), both providing methods like `setVar`, `getVar`, `clearVar`, etc., and both supporting namespaces. For details, please refer to [`node.scope`](#using-nodescope-api-in-side-effects).

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

        console.log("View generated variables", context.node.privateScope.getVar())

      }) as Effect,
    }],
  },
  render: () => (
    // ...
  )
}
```

## Output Global Variables

Global variables are like the “shared memory” of the entire flow—any node or plugin can read and modify them. They work well for state that persists across the flow, such as user information or environment configuration. (See [Global Scope](/en/guide/variable/concept.md#global-scope).)

:::info{title="When to choose the global scope"}

* The variable is reused across multiple nodes or even plugins.
* The variable should be decoupled from a specific node (e.g., environment config, user context).
* You need to write it during initialization so downstream nodes can simply read it.

:::

Similar to node variables, we also have two main ways to obtain the global variable scope (`GlobalScope`).

### Method 1: Obtaining in Plugins

In the plugin's context (`ctx`), we can directly "inject" an instance of `GlobalScope`:

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

### Method 2: Obtaining in UI

If you want to interact with global variables in a React component on the canvas, you can use the `useService` Hook to obtain an instance of `GlobalScope`:

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

### Global Scope API

The API design of `GlobalScope` is almost identical to the node scope (`node.scope`), both providing methods like `setVar`, `getVar`, `clearVar`, etc., and both supporting namespaces. For details, please refer to [`node.scope`](#using-nodescope-api-in-side-effects).

Here's a comprehensive example of operating global variables in a plugin:

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

  // 2. Create, Update, Read, Delete Variable in GlobalScope's namespace: 'namespace_1'
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

See: [Class: GlobalScope](https://flowgram.ai/auto-docs/editor/classes/GlobalScope.html)
