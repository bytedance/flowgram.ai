# Scope Chain

:::info{title="Before You Read"}

* We recommend completing [Output Variables](/en/guide/variable/variable-output.md) and [Consume Variables](/en/guide/variable/variable-consume.md) first.
* If the idea of scopes still feels fuzzy, review [Core Concepts – Scope Chain](/en/guide/variable/concept.md#scope-chain) before diving in.

:::

## Default Scope Chain Logic

For details, see: [Scope in Canvas](/en/guide/variable/concept.md#variables-in-the-canvas)

## Customize in `editor-props`

The customization logic for the scope is usually done in `editor-props` through `variableEngine.chainConfig`.

```tsx pure title="use-editor-props.tsx" {6-8}
// ...
{
  // ...
  variableEngine: {
    enable: true,
    chainConfig: {
      // Customize scope chain logic
    }
  }
  // ...
}
// ...
```

### Whether child nodes can be depended on by subsequent nodes

**By default, child nodes cannot be depended on by subsequent nodes of the parent node**.

If you need to customize this logic, you need to configure it in `variableEngine.chainConfig.isNodeChildrenPrivate`.

```tsx pure title="use-editor-props.tsx" {8-15}
{
  variableEngine: {
    enable: true,
    chainConfig: {
      /**
       * Customize: Whether child nodes can be depended on by subsequent nodes of the parent node
       */
      isNodeChildrenPrivate(node) {
        // When a certain type of custom node is hit, allow its child nodes to be depended on by subsequent nodes
        if (node.flowNodeType === 'Your_Custom_Type') {
          return false;
        }
        // Otherwise: by default, child nodes are not allowed to be depended on by subsequent nodes
        return true;
      },
    }
  }
}
```
