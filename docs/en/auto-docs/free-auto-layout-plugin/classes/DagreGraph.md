# Class: DagreGraph

## Table of contents

### Constructors

* [constructor](/en/auto-docs/free-auto-layout-plugin/classes/DagreGraph.md#constructor)

### Methods

* [children](/en/auto-docs/free-auto-layout-plugin/classes/DagreGraph.md#children)
* [edge](/en/auto-docs/free-auto-layout-plugin/classes/DagreGraph.md#edge)
* [edgeAsObj](/en/auto-docs/free-auto-layout-plugin/classes/DagreGraph.md#edgeasobj)
* [edgeCount](/en/auto-docs/free-auto-layout-plugin/classes/DagreGraph.md#edgecount)
* [edges](/en/auto-docs/free-auto-layout-plugin/classes/DagreGraph.md#edges)
* [filterNodes](/en/auto-docs/free-auto-layout-plugin/classes/DagreGraph.md#filternodes)
* [graph](/en/auto-docs/free-auto-layout-plugin/classes/DagreGraph.md#graph)
* [hasEdge](/en/auto-docs/free-auto-layout-plugin/classes/DagreGraph.md#hasedge)
* [hasNode](/en/auto-docs/free-auto-layout-plugin/classes/DagreGraph.md#hasnode)
* [inEdges](/en/auto-docs/free-auto-layout-plugin/classes/DagreGraph.md#inedges)
* [isCompound](/en/auto-docs/free-auto-layout-plugin/classes/DagreGraph.md#iscompound)
* [isDirected](/en/auto-docs/free-auto-layout-plugin/classes/DagreGraph.md#isdirected)
* [isMultigraph](/en/auto-docs/free-auto-layout-plugin/classes/DagreGraph.md#ismultigraph)
* [neighbors](/en/auto-docs/free-auto-layout-plugin/classes/DagreGraph.md#neighbors)
* [node](/en/auto-docs/free-auto-layout-plugin/classes/DagreGraph.md#node)
* [nodeCount](/en/auto-docs/free-auto-layout-plugin/classes/DagreGraph.md#nodecount)
* [nodeEdges](/en/auto-docs/free-auto-layout-plugin/classes/DagreGraph.md#nodeedges)
* [nodes](/en/auto-docs/free-auto-layout-plugin/classes/DagreGraph.md#nodes)
* [outEdges](/en/auto-docs/free-auto-layout-plugin/classes/DagreGraph.md#outedges)
* [parent](/en/auto-docs/free-auto-layout-plugin/classes/DagreGraph.md#parent)
* [predecessors](/en/auto-docs/free-auto-layout-plugin/classes/DagreGraph.md#predecessors)
* [removeEdge](/en/auto-docs/free-auto-layout-plugin/classes/DagreGraph.md#removeedge)
* [removeNode](/en/auto-docs/free-auto-layout-plugin/classes/DagreGraph.md#removenode)
* [setDefaultEdgeLabel](/en/auto-docs/free-auto-layout-plugin/classes/DagreGraph.md#setdefaultedgelabel)
* [setDefaultNodeLabel](/en/auto-docs/free-auto-layout-plugin/classes/DagreGraph.md#setdefaultnodelabel)
* [setEdge](/en/auto-docs/free-auto-layout-plugin/classes/DagreGraph.md#setedge)
* [setGraph](/en/auto-docs/free-auto-layout-plugin/classes/DagreGraph.md#setgraph)
* [setNode](/en/auto-docs/free-auto-layout-plugin/classes/DagreGraph.md#setnode)
* [setNodes](/en/auto-docs/free-auto-layout-plugin/classes/DagreGraph.md#setnodes)
* [setParent](/en/auto-docs/free-auto-layout-plugin/classes/DagreGraph.md#setparent)
* [setPath](/en/auto-docs/free-auto-layout-plugin/classes/DagreGraph.md#setpath)
* [sinks](/en/auto-docs/free-auto-layout-plugin/classes/DagreGraph.md#sinks)
* [sources](/en/auto-docs/free-auto-layout-plugin/classes/DagreGraph.md#sources)
* [successors](/en/auto-docs/free-auto-layout-plugin/classes/DagreGraph.md#successors)

## Constructors

### constructor

**new DagreGraph**(`options?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `GraphOptions` |

## Methods

### children

**children**(`v`): `string`\[]

Gets list of direct children of node v.
Complexity: O(1).

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `string` |

#### Returns

`string`\[]

children nodes names list.

**`Argument`**

v - node to get children of.

***

### edge

**edge**(`v`, `w`, `name?`): `any`

Gets the label for the specified edge.
Complexity: O(1).

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `string` |
| `w` | `string` |
| `name?` | `string` |

#### Returns

`any`

value associated with specified edge.

**`Argument`**

v - edge source node.

**`Argument`**

w - edge sink node.

**`Argument`**

name - name of the edge (actual for multigraph).

**edge**(`e`): `any`

Gets the label for the specified edge.
Complexity: O(1).

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `Edge` |

#### Returns

`any`

value associated with specified edge.

**`Argument`**

edge - edge descriptor.

***

### edgeAsObj

**edgeAsObj**(`v`, `w`, `name?`): `Object`

Gets the label for the specified edge and converts it to an object.
Complexity: O(1).

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `string` |
| `w` | `string` |
| `name?` | `string` |

#### Returns

`Object`

value associated with specified edge.

**`Argument`**

v - edge source node.

**`Argument`**

w - edge sink node.

**`Argument`**

name - name of the edge (actual for multigraph).

**edgeAsObj**(`e`): `Object`

Gets the label for the specified edge and converts it to an object.
Complexity: O(1).

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `Edge` |

#### Returns

`Object`

value associated with specified edge.

**`Argument`**

edge - edge descriptor.

***

### edgeCount

**edgeCount**(): `number`

Gets the number of edges in the graph.
Complexity: O(1).

#### Returns

`number`

edges count.

***

### edges

**edges**(): `Edge`\[]

Gets edges of the graph. In case of compound graph subgraphs are not considered.
Complexity: O(|E|).

#### Returns

`Edge`\[]

graph edges list.

***

### filterNodes

**filterNodes**(`filter`): [`DagreGraph`](/en/auto-docs/free-auto-layout-plugin/classes/DagreGraph.md)

Creates new graph with nodes filtered via filter. Edges incident to rejected node
are also removed. In case of compound graph, if parent is rejected by filter,
than all its children are rejected too.
Average-case complexity: O(|E|+|V|).

#### Parameters

| Name | Type |
| :------ | :------ |
| `filter` | (`v`: `string`) => `boolean` |

#### Returns

[`DagreGraph`](/en/auto-docs/free-auto-layout-plugin/classes/DagreGraph.md)

new graph made from current and nodes filtered.

**`Argument`**

filter - filtration function detecting whether the node should stay or not.

***

### graph

**graph**(): `any`

Gets the graph label.

#### Returns

`any`

currently assigned label for the graph or undefined if no label assigned.

***

### hasEdge

**hasEdge**(`v`, `w`, `name?`): `boolean`

Detects whether the graph contains specified edge or not. No subgraphs are considered.
Complexity: O(1).

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `string` |
| `w` | `string` |
| `name?` | `string` |

#### Returns

`boolean`

whether the graph contains the specified edge or not.

**`Argument`**

v - edge source node.

**`Argument`**

w - edge sink node.

**`Argument`**

name - name of the edge (actual for multigraph).

**hasEdge**(`edge`): `boolean`

Detects whether the graph contains specified edge or not. No subgraphs are considered.
Complexity: O(1).

#### Parameters

| Name | Type |
| :------ | :------ |
| `edge` | `Edge` |

#### Returns

`boolean`

whether the graph contains the specified edge or not.

**`Argument`**

edge - edge descriptor.

***

### hasNode

**hasNode**(`name`): `boolean`

Detects whether graph has a node with specified name or not.

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`boolean`

true if graph has node with specified name, false - otherwise.

**`Argument`**

name - name of the node.

***

### inEdges

**inEdges**(`v`, `w?`): `void` | `Edge`\[]

Return all edges that point to the node v. Optionally filters those edges down to just those
coming from node u. Behavior is undefined for undirected graphs - use nodeEdges instead.
Complexity: O(|E|).

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `string` |
| `w?` | `string` |

#### Returns

`void` | `Edge`\[]

edges descriptors list if v is in the graph, or undefined otherwise.

**`Argument`**

v - edge sink node.

**`Argument`**

w - edge source node.

***

### isCompound

**isCompound**(): `boolean`

Whether graph was created with 'compound' flag set to true or not.

#### Returns

`boolean`

whether a node of the graph can have subnodes.

***

### isDirected

**isDirected**(): `boolean`

Whether graph was created with 'directed' flag set to true or not.

#### Returns

`boolean`

whether the graph edges have an orientation.

***

### isMultigraph

**isMultigraph**(): `boolean`

Whether graph was created with 'multigraph' flag set to true or not.

#### Returns

`boolean`

whether the pair of nodes of the graph can have multiple edges.

***

### neighbors

**neighbors**(`v`): `void` | `string`\[]

Return all nodes that are predecessors or successors of the specified node or undefined if
node v is not in the graph.
Complexity: O(|V|).

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `string` |

#### Returns

`void` | `string`\[]

node identifiers list or undefined if v is not in the graph.

**`Argument`**

v - node identifier.

***

### node

**node**(`name`): `any`

Gets the label of node with specified name.
Complexity: O(|V|).

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`any`

label value of the node.

***

### nodeCount

**nodeCount**(): `number`

Gets the number of nodes in the graph.
Complexity: O(1).

#### Returns

`number`

nodes count.

***

### nodeEdges

**nodeEdges**(`v`, `w?`): `void` | `Edge`\[]

Returns all edges to or from node v regardless of direction. Optionally filters those edges
down to just those between nodes v and w regardless of direction.
Complexity: O(|E|).

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `string` |
| `w?` | `string` |

#### Returns

`void` | `Edge`\[]

edges descriptors list if v is in the graph, or undefined otherwise.

**`Argument`**

v - edge adjacent node.

**`Argument`**

w - edge adjacent node.

***

### nodes

**nodes**(): `string`\[]

Gets all nodes of the graph. Note, the in case of compound graph subnodes are
not included in list.
Complexity: O(1).

#### Returns

`string`\[]

list of graph nodes.

***

### outEdges

**outEdges**(`v`, `w?`): `void` | `Edge`\[]

Return all edges that are pointed at by node v. Optionally filters those edges down to just
those point to w. Behavior is undefined for undirected graphs - use nodeEdges instead.
Complexity: O(|E|).

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `string` |
| `w?` | `string` |

#### Returns

`void` | `Edge`\[]

edges descriptors list if v is in the graph, or undefined otherwise.

**`Argument`**

v - edge source node.

**`Argument`**

w - edge sink node.

***

### parent

**parent**(`v`): `string` | `void`

Gets parent node for node v.
Complexity: O(1).

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `string` |

#### Returns

`string` | `void`

parent node name or void if v has no parent.

**`Argument`**

v - node to get parent of.

***

### predecessors

**predecessors**(`v`): `void` | `string`\[]

Return all nodes that are predecessors of the specified node or undefined if node v is not in
the graph. Behavior is undefined for undirected graphs - use neighbors instead.
Complexity: O(|V|).

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `string` |

#### Returns

`void` | `string`\[]

node identifiers list or undefined if v is not in the graph.

**`Argument`**

v - node identifier.

***

### removeEdge

**removeEdge**(`edge`): [`DagreGraph`](/en/auto-docs/free-auto-layout-plugin/classes/DagreGraph.md)

Removes the specified edge from the graph. No subgraphs are considered.
Complexity: O(1).

#### Parameters

| Name | Type |
| :------ | :------ |
| `edge` | `Edge` |

#### Returns

[`DagreGraph`](/en/auto-docs/free-auto-layout-plugin/classes/DagreGraph.md)

the graph, allowing this to be chained with other functions.

**`Argument`**

edge - edge descriptor.

**removeEdge**(`v`, `w`, `name?`): [`DagreGraph`](/en/auto-docs/free-auto-layout-plugin/classes/DagreGraph.md)

Removes the specified edge from the graph. No subgraphs are considered.
Complexity: O(1).

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `string` |
| `w` | `string` |
| `name?` | `string` |

#### Returns

[`DagreGraph`](/en/auto-docs/free-auto-layout-plugin/classes/DagreGraph.md)

the graph, allowing this to be chained with other functions.

**`Argument`**

v - edge source node.

**`Argument`**

w - edge sink node.

**`Argument`**

name - name of the edge (actual for multigraph).

***

### removeNode

**removeNode**(`name`): [`DagreGraph`](/en/auto-docs/free-auto-layout-plugin/classes/DagreGraph.md)

Remove the node with the name from the graph or do nothing if the node is not in
the graph. If the node was removed this function also removes any incident
edges.
Complexity: O(1).

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`DagreGraph`](/en/auto-docs/free-auto-layout-plugin/classes/DagreGraph.md)

the graph, allowing this to be chained with other functions.

**`Argument`**

name - name of the node.

***

### setDefaultEdgeLabel

**setDefaultEdgeLabel**(`label`): [`DagreGraph`](/en/auto-docs/free-auto-layout-plugin/classes/DagreGraph.md)

Sets the default edge label. This label will be assigned as default label
in case if no label was specified while setting an edge.
Complexity: O(1).

#### Parameters

| Name | Type |
| :------ | :------ |
| `label` | `any` |

#### Returns

[`DagreGraph`](/en/auto-docs/free-auto-layout-plugin/classes/DagreGraph.md)

the graph, allowing this to be chained with other functions.

**`Argument`**

label - default edge label.

**setDefaultEdgeLabel**(`labelFn`): [`DagreGraph`](/en/auto-docs/free-auto-layout-plugin/classes/DagreGraph.md)

Sets the default edge label factory function. This function will be invoked
each time when setting an edge with no label specified and returned value
will be used as a label for edge.
Complexity: O(1).

#### Parameters

| Name | Type |
| :------ | :------ |
| `labelFn` | (`v`: `string`) => `any` |

#### Returns

[`DagreGraph`](/en/auto-docs/free-auto-layout-plugin/classes/DagreGraph.md)

the graph, allowing this to be chained with other functions.

**`Argument`**

labelFn - default edge label factory function.

***

### setDefaultNodeLabel

**setDefaultNodeLabel**(`label`): [`DagreGraph`](/en/auto-docs/free-auto-layout-plugin/classes/DagreGraph.md)

Sets the default node label. This label will be assigned as default label
in case if no label was specified while setting a node.
Complexity: O(1).

#### Parameters

| Name | Type |
| :------ | :------ |
| `label` | `any` |

#### Returns

[`DagreGraph`](/en/auto-docs/free-auto-layout-plugin/classes/DagreGraph.md)

the graph, allowing this to be chained with other functions.

**`Argument`**

label - default node label.

**setDefaultNodeLabel**(`labelFn`): [`DagreGraph`](/en/auto-docs/free-auto-layout-plugin/classes/DagreGraph.md)

Sets the default node label factory function. This function will be invoked
each time when setting a node with no label specified and returned value
will be used as a label for node.
Complexity: O(1).

#### Parameters

| Name | Type |
| :------ | :------ |
| `labelFn` | (`v`: `string`) => `any` |

#### Returns

[`DagreGraph`](/en/auto-docs/free-auto-layout-plugin/classes/DagreGraph.md)

the graph, allowing this to be chained with other functions.

**`Argument`**

labelFn - default node label factory function.

***

### setEdge

**setEdge**(`v`, `w`, `label?`, `name?`): [`DagreGraph`](/en/auto-docs/free-auto-layout-plugin/classes/DagreGraph.md)

Creates or updates the label for the edge (v, w) with the optionally supplied
name. If label is supplied it is set as the value for the edge. If label is not
supplied and the edge was created by this call then the default edge label will
be assigned. The name parameter is only useful with multigraphs.
Complexity: O(1).

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `string` |
| `w` | `string` |
| `label?` | `any` |
| `name?` | `string` |

#### Returns

[`DagreGraph`](/en/auto-docs/free-auto-layout-plugin/classes/DagreGraph.md)

the graph, allowing this to be chained with other functions.

**`Argument`**

v - edge source node.

**`Argument`**

w - edge sink node.

**`Argument`**

label - value to associate with the edge.

**`Argument`**

name - unique name of the edge in order to identify it in multigraph.

**setEdge**(`edge`, `label?`): [`DagreGraph`](/en/auto-docs/free-auto-layout-plugin/classes/DagreGraph.md)

Creates or updates the label for the specified edge. If label is supplied it is
set as the value for the edge. If label is not supplied and the edge was created
by this call then the default edge label will be assigned. The name parameter is
only useful with multigraphs.
Complexity: O(1).

#### Parameters

| Name | Type |
| :------ | :------ |
| `edge` | `Edge` |
| `label?` | `any` |

#### Returns

[`DagreGraph`](/en/auto-docs/free-auto-layout-plugin/classes/DagreGraph.md)

the graph, allowing this to be chained with other functions.

**`Argument`**

edge - edge descriptor.

**`Argument`**

label - value to associate with the edge.

***

### setGraph

**setGraph**(`label`): [`DagreGraph`](/en/auto-docs/free-auto-layout-plugin/classes/DagreGraph.md)

Sets the label of the graph.

#### Parameters

| Name | Type |
| :------ | :------ |
| `label` | `any` |

#### Returns

[`DagreGraph`](/en/auto-docs/free-auto-layout-plugin/classes/DagreGraph.md)

the graph, allowing this to be chained with other functions.

**`Argument`**

label - label value.

***

### setNode

**setNode**(`name`, `label?`): [`DagreGraph`](/en/auto-docs/free-auto-layout-plugin/classes/DagreGraph.md)

Creates or updates the value for the node v in the graph. If label is supplied
it is set as the value for the node. If label is not supplied and the node was
created by this call then the default node label will be assigned.
Complexity: O(1).

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `label?` | `any` |

#### Returns

[`DagreGraph`](/en/auto-docs/free-auto-layout-plugin/classes/DagreGraph.md)

the graph, allowing this to be chained with other functions.

**`Argument`**

name - node name.

**`Argument`**

label - value to set for node.

***

### setNodes

**setNodes**(`names`, `label?`): [`DagreGraph`](/en/auto-docs/free-auto-layout-plugin/classes/DagreGraph.md)

Invokes setNode method for each node in names list.
Complexity: O(|names|).

#### Parameters

| Name | Type |
| :------ | :------ |
| `names` | `string`\[] |
| `label?` | `any` |

#### Returns

[`DagreGraph`](/en/auto-docs/free-auto-layout-plugin/classes/DagreGraph.md)

the graph, allowing this to be chained with other functions.

**`Argument`**

names - list of nodes names to be set.

**`Argument`**

label - value to set for each node in list.

***

### setParent

**setParent**(`v`, `p?`): [`DagreGraph`](/en/auto-docs/free-auto-layout-plugin/classes/DagreGraph.md)

Sets node p as a parent for node v if it is defined, or removes the
parent for v if p is undefined. Method throws an exception in case of
invoking it in context of noncompound graph.
Average-case complexity: O(1).

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `string` |
| `p?` | `string` |

#### Returns

[`DagreGraph`](/en/auto-docs/free-auto-layout-plugin/classes/DagreGraph.md)

the graph, allowing this to be chained with other functions.

**`Argument`**

v - node to be child for p.

**`Argument`**

p - node to be parent for v.

***

### setPath

**setPath**(`nodes`, `label?`): [`DagreGraph`](/en/auto-docs/free-auto-layout-plugin/classes/DagreGraph.md)

Establish an edges path over the nodes in nodes list. If some edge is already
exists, it will update its label, otherwise it will create an edge between pair
of nodes with label provided or default label if no label provided.
Complexity: O(|nodes|).

#### Parameters

| Name | Type |
| :------ | :------ |
| `nodes` | `string`\[] |
| `label?` | `any` |

#### Returns

[`DagreGraph`](/en/auto-docs/free-auto-layout-plugin/classes/DagreGraph.md)

the graph, allowing this to be chained with other functions.

**`Argument`**

nodes - list of nodes to be connected in series.

**`Argument`**

label - value to set for each edge between pairs of nodes.

***

### sinks

**sinks**(): `string`\[]

Gets list of nodes without out-edges.
Complexity: O(|V|).

#### Returns

`string`\[]

the graph source nodes.

***

### sources

**sources**(): `string`\[]

Gets list of nodes without in-edges.
Complexity: O(|V|).

#### Returns

`string`\[]

the graph source nodes.

***

### successors

**successors**(`v`): `void` | `string`\[]

Return all nodes that are successors of the specified node or undefined if node v is not in
the graph. Behavior is undefined for undirected graphs - use neighbors instead.
Complexity: O(|V|).

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `string` |

#### Returns

`void` | `string`\[]

node identifiers list or undefined if v is not in the graph.

**`Argument`**

v - node identifier.
