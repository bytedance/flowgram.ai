# Consuming Variables

In FlowGram, when a node wants to use variables from preceding nodes, it needs to consume those variables.

:::info{title="Reading Tips"}

* We recommend finishing [Output Variables](/en/guide/variable/variable-output.md) first so you know how variables are produced; this guide is the second stop focused on “how to access them.”
* To quickly preview the variable selector experience, try [VariableSelector](#variableselector) first; continue with the API sections when you need code-level access to variable lists.
* All examples assume the **node scope**. When private or global scopes show up, refer to [Core Concepts – Variables in the Canvas](/en/guide/variable/concept.md#variables-in-the-canvas) for additional context.

:::

## `VariableSelector`

To make it easier for you to integrate variable selection functionality into your applications, the official materials provide the `VariableSelector` component.

See documentation: [VariableSelector](/en/materials/components/variable-selector.md)

## Getting Accessible Variable Tree

In canvas nodes, we often need to get **variables available in the current scope** and display them in a tree structure for users to select and operate.

:::info{title="Common Needs at a Glance"}

* **Just list variables** → `useAvailableVariables`
* **Need drill-down for objects/arrays** → `ASTMatch` + recursive rendering
* **Need precise subscriptions** → go straight to `scope.available`

:::

### `useAvailableVariables`

`useAvailableVariables` is a lightweight Hook that directly returns an array of variables available in the current scope (`VariableDeclaration[]`).

```tsx pure title="use-variable-tree.tsx" {7}
import {
  type BaseVariableField,
  useAvailableVariables,
} from '@flowgram.ai/fixed-layout-editor';

// .... In React component or Hook
const availableVariables = useAvailableVariables();

const renderVariable = (variable: BaseVariableField) => {
  // You can render each variable according to your needs here
  // ....
}

return availableVariables.map(renderVariable);

// ....
```

### Getting Object Type Variable Drill-down

When a variable's type is `Object`, we often need to be able to "drill down" into its interior to access its properties. The `ASTMatch.isObject` method can help us determine if a variable type is an object. If it is, we can recursively render its `properties`.

:::tip

Each layer of the variable tree is essentially a declaration (`BaseVariableField`). For objects, `properties` gives you the next-level declaration array.

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
  // Only Object type variables can be drilled down
  children: ASTMatch.isObject(variable.type) ? variable.type.properties.map(renderVariable) : [],
});

// ....
```

### Getting Array Type Variable Drill-down

Similar to `Object` type, when encountering an `Array` type variable, we also want to display its internal structure. For arrays, we usually care about the type of their elements. `ASTMatch.isArray` can determine if a variable type is an array. It's worth noting that the element type of an array can be any type, and it might even be another array. Therefore, we need a recursive helper function `getTypeChildren` to handle this situation.

```tsx pure title="use-variable-tree.tsx" {13,16}
import {
  type BaseVariableField,
  type BaseType,
  ASTMatch,
} from '@flowgram.ai/fixed-layout-editor';

// ....

const getTypeChildren = (type?: BaseType): BaseVariableField[] => {
  if (!type) return [];

  // Get Object properties
  if (ASTMatch.isObject(type)) return type.properties;

  // Recursively get Array element type
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

`scope.available` is one of the cores of the variable system, which can perform more advanced variable retrieval and monitoring actions on **variables available within the scope**.

:::info{title="When to reach for scope.available"}

* You need to read or validate a variable by `keyPath`.
* You want to manipulate visibility outside of React hooks (e.g., in plugins or services).
* You need fine-grained subscriptions without refreshing the entire list.

:::

### `useScopeAvailable`

`useScopeAvailable` can directly return `scope.available` in React.

```tsx
import { useScopeAvailable } from '@flowgram.ai/free-layout-editor';

const available = useScopeAvailable();

// The available object contains variable list and other APIs
console.log(available.variables);

// Get a single variable
console.log(available.getByKeyPath(['start_0', 'xxx']));

// Monitor changes in a single variable
available.trackByKeyPath(['start_0', 'xxx'], () => {
  // ...
})
```

:::info{title="Main Difference from useAvailableVariables"}

* **Return Value Different**: `useAvailableVariables` directly returns an array of variables, while `useScopeAvailable` returns a `ScopeAvailableData` object that includes a `variables` property and other methods.
* **Applicable Scenario**: When you need to perform more complex operations on variables, such as tracking changes in a single variable through `trackByKeyPath`, `useScopeAvailable` is your best choice.

:::

:::warning{title="useScopeAvailable automatically refreshes when available variables change"}

If you don't want automatic refresh, you can turn it off through the autoRefresh parameter:

```tsx
useScopeAvailable({ autoRefresh: false })
```

:::

### `getByKeyPath`

Through `getByKeyPath`, you can get a specific variable field (including variables nested in Object or Array) from the accessible variables in the current scope.

```tsx {6,13-17}
import { useScopeAvailable } from '@flowgram.ai/fixed-layout-editor';
import { useEffect, useState } from 'react';

function VariableDisplay({ keyPath }: { keyPath:string[] }) {
  const available = useScopeAvailable();
  const variableField = available.getByKeyPath(keyPath)

  return <div>{variableField.meta?.title}</div>;
}
```

`getByKeyPath` is often used in variable validation, such as:

```tsx
const validateVariableInNode = (keyPath: string, node: FlowNodeEntity) => {
  // Validate whether the variable can be accessed by the current node
  return Boolean(node.scope.available.getByKeyPath(keyPath))
}
```

### `trackByKeyPath`

When you only care about changes to a specific variable field (including variables nested in Object or Array), `trackByKeyPath` allows you to precisely "subscribe" to updates of that variable without causing component re-renders due to changes in other unrelated variables, thus achieving more refined performance optimization.

:::tip

Combine it with `autoRefresh: false` to avoid wide re-renders—only update local state when the tracked variable changes.

:::

```tsx {6,13-17}
import { useScopeAvailable } from '@flowgram.ai/fixed-layout-editor';
import { useEffect, useState } from 'react';

function UserNameDisplay() {
  // Turn off autoRefresh to prevent re-renders triggered by any variable changes
  const available = useScopeAvailable({ autoRefresh: false });
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Define the variable path we want to track
    const keyPath = ['user', 'name'];

    // Start tracking!
    const disposable = available.trackByKeyPath(keyPath, (nameField) => {
      // When the user.name variable field changes, this callback function will be triggered
      // nameField is the changed variable field, from which we can get the latest default value
      setUserName(nameField?.meta.default || '');
    });

    // Cancel tracking when the component unmounts to avoid memory leaks
    return () => disposable.dispose();
  }, [available]); // The dependency is the available object

  return <div>User Name: {userName}</div>;
}
```

### Overall Listening API

In addition to `trackByKeyPath`, `ScopeAvailableData` also provides a set of event listening APIs for overall variable changes, allowing you to more precisely control the response logic for variable changes.

This is very useful when dealing with complex scenarios that require manual management of subscriptions.

Below we use a table to compare these three core listening APIs in detail:

| API & Callback Parameters | Trigger Timing | Core Difference and Applicable Scenario |
| :--- | :--- | :--- |
| `onVariableListChange: (variables: VariableDeclaration[]) => void` | When the **list structure** of available variables changes. | **Only cares about the list itself**. For example, an upstream node added/removed an output variable, causing the total number or members of available variables to change. It doesn't care about changes within variables and drill-downs. Applicable to scenarios where you need to update UI based on the presence or quantity of variable lists. |
| `onAnyVariableChange: (changedVariable: VariableDeclaration) => void` | When the **type, metadata, and drill-down fields** of **any** variable in the list change. | **Only cares about updates to variable definitions**. For example, a user modified the type of an output variable. It doesn't care about changes to the list structure. Applicable to scenarios where you need to respond to changes in the content of any variable. |
| `onListOrAnyVarChange: (variables: VariableDeclaration[]) => void` | When **either** of the above two situations occurs. | **The most comprehensive listening**, combining the previous two. Both changes to the list structure and changes to any variable will trigger it. Applicable to "fallback" scenarios where you need to respond to any possible changes. |

Let's see how to use these APIs in components through a specific example.

```tsx {5,9-11,14-16,19-22}
import { useScopeAvailable } from '@flowgram.ai/fixed-layout-editor';
import { useEffect } from 'react';

function AdvancedListenerComponent() {
  const available = useScopeAvailable({ autoRefresh: false });

  useEffect(() => {
    // 1. Listen to list structure changes
    const listChangeDisposable = available.onVariableListChange((variables) => {
      console.log('The structure of the available variable list has changed! The new list length is:', variables.length);
    });

    // 2. Listen to any variable changes
    const valueChangeDisposable = available.onAnyVariableChange((changedVariable) => {
      console.log(`The definition of variable '${changedVariable.keyPath.join('.')}' has changed`);
    });

    // 3. Listen to all changes (structure or individual variable interior)
    const allChangesDisposable = available.onListOrAnyVarChange((variables) => {
      console.log('The variable list or one of its variables has changed!');
      // Note: The callback parameter here is the complete variable list, not a single changed variable
    });

    // When the component unmounts, be sure to clean up all listeners to prevent memory leaks
    return () => {
      listChangeDisposable.dispose();
      valueChangeDisposable.dispose();
      allChangesDisposable.dispose();
    };
  }, [available]);

  return <div>Please check the console for variable change logs...</div>;
}
```

:::warning

These APIs all return a `Disposable` object. To avoid memory leaks and unnecessary calculations, you must call its `dispose()` method in the cleanup function of `useEffect` to cancel the listening.

:::

## Getting Output Variables of Current Scope

### `useOutputVariables`

`useOutputVariables` can get **output variables of the current scope** and **automatically trigger a refresh** when the output variable list or drill-down changes.

```tsx
const variables = useOutputVariables();
```

:::tip

`useOutputVariables` is available in flowgram@0.5.6 and later versions. If you are on an earlier version, you can implement it with the following code:

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

## Other APIs

### Getting Current Scope

You can get the current scope through [`useCurrentScope`](https://flowgram.ai/auto-docs/editor/functions/useCurrentScope).

```tsx
const scope = useCurrentScope()

scope.output.variables

scope.available

```

### Setting Current Scope

You can set the current scope through [`ScopeProvider`](https://flowgram.ai/auto-docs/editor/functions/ScopeProvider).

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
