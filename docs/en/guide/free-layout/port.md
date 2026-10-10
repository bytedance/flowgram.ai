# Ports

* [WorkflowNodePortsData](https://github.com/bytedance/flowgram.ai/blob/main/packages/canvas-engine/free-layout-core/src/entity-datas/workflow-node-ports-data.ts) manages all port information for nodes
* [WorkflowPortEntity](https://github.com/bytedance/flowgram.ai/blob/main/packages/canvas-engine/free-layout-core/src/entities/workflow-port-entity.ts) port instance
* [WorkflowPortRender](https://github.com/bytedance/flowgram.ai/blob/main/packages/plugins/free-lines-plugin/src/components/workflow-port-render/index.tsx) port rendering component

## Define Ports

Add `defaultPorts` to node declaration, such as `{ type: 'input', location: 'left' }`, which will add an input port on the left side of the node

```ts pure
// Port interface
export interface WorkflowPort {
  /**
   * If not specified, represents default connection point, default input type is left center, output type is right center
   */
  portID?: string | number;
  /**
   * Input or output point
   */
  type: 'input' | 'output';
  /**
   * Port location
   */
  location?: 'left' | 'top' | 'right' | 'bottom';
  /**
   * Port location config
   * @example
   *  // bottom-center
   *  {
   *    left: '50%',
   *    bottom: 0
   *  }
   *  // right-center
   *  {
   *    right: 0,
   *    top: '50%'
   *  }
   */
  locationConfig?: { left?: string | number, top?: string | number, right?: string | number, bottom?: string | number}
  /**
   * Offset relative to location
   */
  offset?: IPoint;
  /**
   * Port hot zone size
   */
  size?: { width: number; height: number };
  /**
   * Disable port
   */
  disabled?: boolean;
}
```

```ts pure title="node-registries.ts"
{
  type: 'start',
  meta: {
    defaultPorts: [{ type: 'output', location: 'right' }, { type: 'input', location: 'left' }]
  },
}
```

## Dynamic Ports

Add `useDynamicPort` to node declaration, when set to true it will look for DOM elements with `data-port-id` and `data-port-type` attributes on the node DOM as ports

```ts pure title="node-registries.ts"
{
  type: 'condition',
  meta: {
    defaultPorts: [{ type: 'input'}]
    useDynamicPort: true
  },
}

```

```tsx pure

/**
*  Dynamic ports find port positions through querySelectorAll('[data-port-id]')
 */
function BaseNode() {
  return (
    <div>
      <div data-port-id="condition-if-0" data-port-type="output" data-port-location="right"></div>
      <div data-port-id="condition-if-1" data-port-type="output" data-port-location="righ" ></div>
      {/* others */}
    </div>
  )
}
```

## Vertical Ports

<img loading="lazy" className="invert-img" src="/free-layout/vertical-ports.png" />

```typescript pure
export const nodeRegsistries = [
  {
    type: 'chain',
    meta: {
      defaultPorts: [
        { type: 'input' },
        { type: 'output' },
        {
          portID: 'p4',
          location: 'bottom',
          locationConfig: { left: '33%', bottom: 0 },
          type: 'output',
        },
        {
          portID: 'p5',
          location: 'bottom',
          locationConfig: { left: '66%', bottom: 0 },
          type: 'output',
        },
      ],
    },
  },
  {
    type: 'tool',
    meta: {
      defaultPorts: [{ location: 'top', type: 'input' }],
    },
  },
]
```

## Update Ports Data

* Static Ports Update

```ts pure
// You can call this method to update static ports data based on form data
node.ports.updateAllPorts([
    { type: 'output', location: 'right', locationConfig: { left: '33%', bottom: 0 }},
    { type: 'input', location: 'left', locationConfig: { left: '66%', bottom: 0 }}
])
```

* Dynamic Ports Update

```ts pure
// Refresh and sync ports data from node dom content
node.ports.updateDynamicPorts()
```

## Update Ports Data Via Form Values Changed

Below, the `condition` node listens to `portKeys` data and updates ports data via [Form Effect](/en/guide/form/form.md), details see [Demo](/en/examples/free-layout/free-layout-simple.md)

<img loading="lazy" className="invert-img" height="200" src="/free-layout/auto-update-ports.gif" />

```tsx pure title="node-registries.ts"
import {
  Field,
  DataEvent,
  EffectFuncProps,
  WorkflowPorts
} from '@flowgram.ai/free-layout-editor';

const CONDITION_ITEM_HEIGHT = 30
const conditionNodeRegistry =  {
    type: 'condition',
    meta: {
      defaultPorts: [{ type: 'input' }],
    },
    formMeta: {
      effect: {
        /**
         * Listen for "portsKeys" changes and update ports
         */
        portKeys: [{
          event: DataEvent.onValueInitOrChange,
          effect: ({ value, context }: EffectFuncProps<Array<string>, FormData>) => {
            const { node } = context
            const defaultPorts: WorkflowPorts = [{ type: 'input'}]
            const newPorts: WorkflowPorts = value.map((portID: string, i: number) => ({
              type: 'output',
              portID,
              location: 'right',
              locationConfig: {
                right: 0,
                top: (i + 1) * CONDITION_ITEM_HEIGHT
              }
            }))
            node.ports.updateAllPorts([...defaultPorts, ...newPorts])
          },
        }],
      },
      render: () => (
        <>
          <Field<string> name="title">
            {({ field }) => <div className="demo-free-node-title">{field.value}</div>}
          </Field>
          <Field<Array<string>> name="portKeys">
            {({ field: { value, onChange }, }) => {
              return (
                <div className="demo-free-node-content" style={{
                  width: 160,
                  height: value.length * CONDITION_ITEM_HEIGHT,
                  minHeight: 2 * CONDITION_ITEM_HEIGHT
                }}>
                  <div>
                    <button onClick={() => onChange(value.concat(`if_${value.length}`))}>Add Port</button>
                  </div>
                  <div style={{ marginTop: 8 }}>
                    <button onClick={() => onChange(value.filter((v, i, arr) => i !== arr.length - 1))}>Delete Port
                    </button>
                  </div>
                </div>
              )
            }}
          </Field>
        </>
      ),
    },
  }
```

## Port Rendering

Ports are ultimately rendered through the `WorkflowPortRender` component, supporting custom styles, or you can reimplement this component based on the source code. Refer to [Free Layout Best Practices - Node Rendering](https://github.com/bytedance/flowgram.ai/blob/main/apps/demo-free-layout/src/components/base-node/node-wrapper.tsx)

## Custom Port Colors

You can customize port colors by passing color props to `WorkflowPortRender`:

* `primaryColor` - Active state color (linked/hovered)
* `secondaryColor` - Default state color
* `errorColor` - Error state color
* `backgroundColor` - Background color

```tsx pure

import { WorkflowPortRender, useNodeRender } from '@flowgram.ai/free-layout-editor';

function BaseNode() {
  const { ports } = useNodeRender();
  return (
    <div>
      <div data-port-id="condition-if-0" data-port-type="output"></div>
      <div data-port-id="condition-if-1" data-port-type="output"></div>
      {ports.map((p) => (
        <WorkflowPortRender
          key={p.id}
          entity={p}
          className="xxx"
          style={{ /* custom style */}}
          // Custom port colors
          primaryColor="#4d53e8"        // Active state color (linked/hovered)
          secondaryColor="#9197f1"      // Default state color
          errorColor="#ff4444"          // Error state color
          backgroundColor="#ffffff"     // Background color
        />
      ))}
    </div>
  )
}
```

## Get Ports Data

```ts pure
const { ports } = node

console.log(ports.inputPorts) // Get all input ports of current node
console.log(ports.outputPorts) // Get all output ports of current node

console.log(ports.inputPorts.map(port => port.availableLines)) // Find connected lines through ports

ports.updateDynamicPorts() // When dynamic ports modify DOM structure or position, you can manually refresh port positions through this method (DOM rendering has delay, best executed in useEffect or setTimeout)
```

## Two-way Port Connection

<img loading="lazy" className="invert-img" src="/free-layout/two-way-connection.gif" />

```ts pure title="node-registries.ts"
  {
    type: 'twoway',
    meta: {
      defaultPorts: [
        // input and output ports can overlap
        { type: 'input', portID: 'input-left', location: 'left' },
        { type: 'output', portID: 'output-left', location: 'left' },
        { type: 'input', portID: 'input-right', location: 'right' },
        { type: 'output', portID: 'output-right', location: 'right' },
      ],
    },
  },

```
