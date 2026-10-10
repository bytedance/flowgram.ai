# 端口

* [WorkflowNodePortsData](https://github.com/bytedance/flowgram.ai/blob/main/packages/canvas-engine/free-layout-core/src/entity-datas/workflow-node-ports-data.ts) 管理节点的所有端口信息
* [WorkflowPortEntity](https://github.com/bytedance/flowgram.ai/blob/main/packages/canvas-engine/free-layout-core/src/entities/workflow-port-entity.ts) 端口实例
* [WorkflowPortRender](https://github.com/bytedance/flowgram.ai/blob/main/packages/plugins/free-lines-plugin/src/components/workflow-port-render/index.tsx) 端口渲染组件

## 定义端口

节点声明添加 `defaultPorts` , 如 `{ type: 'input', location: 'left' }`, 则会在节点左侧加入输入端口

```ts pure
// Port 接口
export interface WorkflowPort {
  /**
   * 没有代表 默认连接点，默认 input 类型 为最左边中心，output 类型为最右边中心
   */
  portID?: string | number;
  /**
   * 输入或者输出点
   */
  type: 'input' | 'output';
  /**
   * 端口位置
   */
  location?: 'left' | 'top' | 'right' | 'bottom';
  /**
   *  端口位置配置
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
   * 相对于 location 的偏移
   */
  offset?: IPoint;
  /**
   * 端口热区大小
   */
  size?: { width: number; height: number };
  /**
   * 禁用端口
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

## 动态端口

节点声明添加 `useDynamicPort` , 当设置为 true 则会到节点dom 上寻找 data-port-id 和 data-port-type 属性的 dom 作为端口

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
*  动态端口通过 querySelectorAll('[data-port-id]') 查找端口位置
 */
function BaseNode() {
  return (
    <div>
      <div data-port-id="condition-if-0" data-port-type="output" data-port-location="right"></div>
      <div data-port-id="condition-if-1" data-port-type="output" data-port-location="right" ></div>
      {/* others */}
    </div>
  )
}
```

## 垂直端口

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

## 更新端口数据

* 静态端口更新

```ts pure
// 可以根据表单数据调用这个方法更新静态端口数据
node.ports.updateAllPorts([
    { type: 'output', location: 'right', locationConfig: { left: '33%', bottom: 0 }},
    { type: 'input', location: 'left', locationConfig: { left: '66%', bottom: 0 }}
])
```

* 动态端口更新

```ts pure
// 刷新并同步节点 dom 中的端口数据
node.ports.updateDynamicPorts()
```

## 监听表单变化并更新端口数据

下边 condition 节点通过 [表单effect](/guide/form/form.md) 监听 `portKeys` 数据并更新端口数据, 详细见 [Demo](/examples/free-layout/free-layout-simple.md)

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

## 端口渲染

端口最终通过 `WorkflowPortRender` 组件渲染，支持自定义 style, 或者业务基于源码重新实现该组件, 参考 [自由布局最佳实践 - 节点渲染](https://github.com/bytedance/flowgram.ai/blob/main/apps/demo-free-layout/src/components/base-node/node-wrapper.tsx)

## 自定义端口颜色

可以通过向 `WorkflowPortRender` 传递颜色 props 来自定义端口颜色：

* `primaryColor` - 激活状态颜色（linked/hovered）
* `secondaryColor` - 默认状态颜色
* `errorColor` - 错误状态颜色
* `backgroundColor` - 背景颜色

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
          // 自定义端口颜色
          primaryColor="#4d53e8"        // 激活状态颜色（linked/hovered）
          secondaryColor="#9197f1"      // 默认状态颜色
          errorColor="#ff4444"          // 错误状态颜色
          backgroundColor="#ffffff"     // 背景颜色
        />
      ))}
    </div>
  )
}
```

## 获取端口数据

```ts pure
const { ports } = node

console.log(ports.inputPorts) // 获取当前节点的所有输入端口
console.log(ports.outputPorts) // 获取当前节点的所有输出端口

console.log(ports.inputPorts.map(port => port.availableLines)) // 通过端口找到连接的线条

ports.updateDynamicPorts() // 当动态端口修改了 dom 结构或位置，可以通过该方法手动刷新端口位置(dom 渲染有延迟，最好在 useEffect 或者 setTimeout 执行)
```

## 端口双向连接

<img loading="lazy" className="invert-img" src="/free-layout/two-way-connection.gif" />

```ts pure title="node-registries.ts"
  {
    type: 'twoway',
    meta: {
      defaultPorts: [
        // input 和 output 端口 可以叠加
        { type: 'input', portID: 'input-left', location: 'left' },
        { type: 'output', portID: 'output-left', location: 'left' },
        { type: 'input', portID: 'input-right', location: 'right' },
        { type: 'output', portID: 'output-right', location: 'right' },
      ],
    },
  },

```
