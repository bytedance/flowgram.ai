import { PackageManagerTabs } from '@theme';

# @flowgram.ai/free-stack-plugin

A layer management plugin that provides z-index layer control functionality for nodes and connections in free layout canvas.

## Features

* Intelligently calculates layer relationships between nodes and connections to avoid occlusion issues
* Supports automatic top-level display for selected nodes
* Supports highlighting of hovered nodes and connections
* Customizable node sorting rules to control rendering order of nodes at the same level
* Automatically handles parent-child node layer relationships
* Supports intelligent layer management for connections, ensuring connection visibility
* Real-time response to node selection, hover, and entity change events

## Quick Start

1. Installation

<PackageManagerTabs command="install @flowgram.ai/free-stack-plugin" />

2. Register Plugin

The plugin registration method is basically the same as other flowgram plugins. Just make sure not to create duplicates and finally pass it to the corresponding FreeLayoutEditorProvider.

```tsx
import { createFreeStackPlugin } from '@flowgram.ai/free-stack-plugin';

const editorProps = useMemo(() => ({
  plugins: () => [
    createFreeStackPlugin()
  ]
}), []);

return (
  <FreeLayoutEditorProvider {...editorProps}>
    <EditorRenderer />
  </FreeLayoutEditorProvider>
)
```

3. Custom Node Sorting

You can customize the sorting rules for nodes at the same level through the `sortNodes` function:

```tsx
import { createFreeStackPlugin } from '@flowgram.ai/free-stack-plugin';
import { WorkflowNodeType } from './nodes/constants';

const editorProps = useMemo(() => ({
  plugins: () => [
    createFreeStackPlugin({
      sortNodes: (nodes) => {
        const commentNodes = [];
        const otherNodes = [];

        // Separate comment nodes from other nodes
        nodes.forEach((node) => {
          if (node.flowNodeType === WorkflowNodeType.Comment) {
            commentNodes.push(node);
          } else {
            otherNodes.push(node);
          }
        });

        // Comment nodes render at the bottom layer, other nodes at the top layer
        return [...commentNodes, ...otherNodes];
      },
    })
  ]
}), []);
```

## Configuration Options

### FreeStackPluginOptions

Plugin configuration options:

```typescript
interface FreeStackPluginOptions {
  /** Custom node sorting function */
  sortNodes?: (nodes: WorkflowNodeEntity[]) => WorkflowNodeEntity[];
}
```

### sortNodes Function

Used to customize sorting rules for nodes at the same level:

```typescript
type SortNodesFunction = (nodes: WorkflowNodeEntity[]) => WorkflowNodeEntity[];
```

**Parameter Description:**

* `nodes`: Array of nodes to be sorted
* **Return Value**: Array of sorted nodes

**Use Cases:**

* Place specific types of nodes (like comments) at the bottom layer
* Sort nodes by business priority
* Sort by creation time or other attributes

## Layer Management Algorithm

### Basic Layer Calculation

The plugin uses an intelligent algorithm to calculate the layer for each node and connection:

1. **Base Layer**: Starts calculation from `BASE_Z_INDEX` (default is 8)
2. **Node Layer**: Calculated based on node nesting relationships and sorting rules
3. **Connection Layer**: Ensures connections are not occluded by nodes while handling special cases

### Layer Elevation Rules

The following situations will trigger layer elevation:

* **Selected Nodes**: Selected nodes will be elevated to the top layer
* **Hovered Elements**: Hovered nodes or connections will be highlighted
* **Drawing Connections**: Connections being drawn will be placed at the top layer
* **Parent-Child Relationship Connections**: Connections between parent-child nodes will be prioritized for display

### Layer Calculation Process

1. **Initialization**: Clear cache, calculate basic parameters
2. **Node Indexing**: Establish node index mapping
3. **Selected Node Processing**: Mark parent relationships of selected nodes
4. **Layer Assignment**: Recursively process node layers
5. **Connection Processing**: Calculate connection layers, ensure visibility
6. **Style Application**: Apply calculation results to DOM elements

## Advanced Usage

### Complex Sorting Rules

You can implement complex node sorting logic:

```typescript
const sortNodes = (nodes: WorkflowNodeEntity[]) => {
  return nodes.sort((a, b) => {
    // 1. Sort by node type priority
    const typeOrder = {
      [WorkflowNodeType.Comment]: 0,
      [WorkflowNodeType.Start]: 1,
      [WorkflowNodeType.End]: 2,
      // ... other types
    };

    const aOrder = typeOrder[a.flowNodeType] ?? 999;
    const bOrder = typeOrder[b.flowNodeType] ?? 999;

    if (aOrder !== bOrder) {
      return aOrder - bOrder;
    }

    // 2. Sort by creation time
    return a.createTime - b.createTime;
  });
};
```

## FAQ

### Q: How to keep specific types of nodes always at the bottom layer?

A: Place these nodes at the front of the array through the `sortNodes` function:

```typescript
const sortNodes = (nodes) => {
  const backgroundNodes = nodes.filter(node =>
    node.flowNodeType === WorkflowNodeType.Comment
  );
  const foregroundNodes = nodes.filter(node =>
    node.flowNodeType !== WorkflowNodeType.Comment
  );

  return [...backgroundNodes, ...foregroundNodes];
};
```

### Q: How to disable automatic layer management?

A: Currently, the plugin does not provide a disable option. If you need complete custom layer management, it is recommended not to use this plugin and directly set z-index in node components.

### Q: Performance optimization suggestions?

A: The plugin already has built-in performance optimizations:

* Uses debounce mechanism to reduce calculation frequency
* Only recalculates layers when necessary
* Uses Map data structure to improve lookup efficiency

For large canvases (over 1000 nodes), it is recommended to:

* Simplify the logic of the `sortNodes` function
* Avoid complex calculations in sorting functions
