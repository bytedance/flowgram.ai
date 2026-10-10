# Interface: WorkflowPort

## Hierarchy

* **`WorkflowPort`**

  ↳ [`WorkflowPortEntityOpts`](/auto-docs/free-layout-core/interfaces/WorkflowPortEntityOpts.md)

## Table of contents

### Properties

* [disabled](/auto-docs/free-layout-core/interfaces/WorkflowPort.md#disabled)
* [location](/auto-docs/free-layout-core/interfaces/WorkflowPort.md#location)
* [locationConfig](/auto-docs/free-layout-core/interfaces/WorkflowPort.md#locationconfig)
* [offset](/auto-docs/free-layout-core/interfaces/WorkflowPort.md#offset)
* [portID](/auto-docs/free-layout-core/interfaces/WorkflowPort.md#portid)
* [size](/auto-docs/free-layout-core/interfaces/WorkflowPort.md#size)
* [targetElement](/auto-docs/free-layout-core/interfaces/WorkflowPort.md#targetelement)
* [type](/auto-docs/free-layout-core/interfaces/WorkflowPort.md#type)

## Properties

### disabled

`Optional` **disabled**: `boolean`

禁用端口

***

### location

`Optional` **location**: [`LinePointLocation`](/auto-docs/free-layout-core/types/LinePointLocation.md)

端口位置

***

### locationConfig

`Optional` **locationConfig**: `Object`

端口位置配置

**`Example`**

```ts
// bottom-center
 {
   left: '50%',
   bottom: 0
 }
 // right-center
 {
   right: 0,
   top: '50%'
 }
```

#### Type declaration

| Name | Type |
| :------ | :------ |
| `bottom?` | `string` | `number` |
| `left?` | `string` | `number` |
| `right?` | `string` | `number` |
| `top?` | `string` | `number` |

***

### offset

`Optional` **offset**: `IPoint`

相对于 location 的偏移

***

### portID

`Optional` **portID**: `string` | `number`

没有代表 默认连接点，默认 input 类型 为最左边中心，output 类型为最右边中心

***

### size

`Optional` **size**: `Object`

端口热区大小

#### Type declaration

| Name | Type |
| :------ | :------ |
| `height` | `number` |
| `width` | `number` |

***

### targetElement

`Optional` **targetElement**: `HTMLElement`

将点位渲染到该父节点上

***

### type

**type**: [`WorkflowPortType`](/auto-docs/free-layout-core/types/WorkflowPortType.md)

输入或者输出点
