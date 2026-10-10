# Interface: WorkflowPortEntityOpts

## Hierarchy

* `EntityOpts`

* [`WorkflowPort`](/auto-docs/free-layout-core/interfaces/WorkflowPort.md)

  ↳ **`WorkflowPortEntityOpts`**

## Table of contents

### Properties

* [datas](/auto-docs/free-layout-core/interfaces/WorkflowPortEntityOpts.md#datas)
* [disabled](/auto-docs/free-layout-core/interfaces/WorkflowPortEntityOpts.md#disabled)
* [entityManager](/auto-docs/free-layout-core/interfaces/WorkflowPortEntityOpts.md#entitymanager)
* [id](/auto-docs/free-layout-core/interfaces/WorkflowPortEntityOpts.md#id)
* [location](/auto-docs/free-layout-core/interfaces/WorkflowPortEntityOpts.md#location)
* [locationConfig](/auto-docs/free-layout-core/interfaces/WorkflowPortEntityOpts.md#locationconfig)
* [node](/auto-docs/free-layout-core/interfaces/WorkflowPortEntityOpts.md#node)
* [offset](/auto-docs/free-layout-core/interfaces/WorkflowPortEntityOpts.md#offset)
* [portID](/auto-docs/free-layout-core/interfaces/WorkflowPortEntityOpts.md#portid)
* [savedInManager](/auto-docs/free-layout-core/interfaces/WorkflowPortEntityOpts.md#savedinmanager)
* [size](/auto-docs/free-layout-core/interfaces/WorkflowPortEntityOpts.md#size)
* [targetElement](/auto-docs/free-layout-core/interfaces/WorkflowPortEntityOpts.md#targetelement)
* [type](/auto-docs/free-layout-core/interfaces/WorkflowPortEntityOpts.md#type)

## Properties

### datas

`Optional` **datas**: { `data?`: `any` ; `registry`: `EntityDataRegistry`<`EntityData`<`any`, {}>>  }\[]

#### Inherited from

EntityOpts.datas

***

### disabled

`Optional` **disabled**: `boolean`

禁用端口

#### Inherited from

[WorkflowPort](/auto-docs/free-layout-core/interfaces/WorkflowPort.md).[disabled](/auto-docs/free-layout-core/interfaces/WorkflowPort.md#disabled)

***

### entityManager

**entityManager**: `EntityManager`

#### Inherited from

EntityOpts.entityManager

***

### id

`Optional` **id**: `string`

#### Inherited from

EntityOpts.id

***

### location

`Optional` **location**: [`LinePointLocation`](/auto-docs/free-layout-core/types/LinePointLocation.md)

端口位置

#### Inherited from

[WorkflowPort](/auto-docs/free-layout-core/interfaces/WorkflowPort.md).[location](/auto-docs/free-layout-core/interfaces/WorkflowPort.md#location)

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

#### Inherited from

[WorkflowPort](/auto-docs/free-layout-core/interfaces/WorkflowPort.md).[locationConfig](/auto-docs/free-layout-core/interfaces/WorkflowPort.md#locationconfig)

***

### node

**node**: `FlowNodeEntity`

port 属于哪个节点

***

### offset

`Optional` **offset**: `IPoint`

相对于 location 的偏移

#### Inherited from

[WorkflowPort](/auto-docs/free-layout-core/interfaces/WorkflowPort.md).[offset](/auto-docs/free-layout-core/interfaces/WorkflowPort.md#offset)

***

### portID

`Optional` **portID**: `string` | `number`

没有代表 默认连接点，默认 input 类型 为最左边中心，output 类型为最右边中心

#### Inherited from

[WorkflowPort](/auto-docs/free-layout-core/interfaces/WorkflowPort.md).[portID](/auto-docs/free-layout-core/interfaces/WorkflowPort.md#portid)

***

### savedInManager

`Optional` **savedInManager**: `boolean`

#### Inherited from

EntityOpts.savedInManager

***

### size

`Optional` **size**: `Object`

端口热区大小

#### Type declaration

| Name | Type |
| :------ | :------ |
| `height` | `number` |
| `width` | `number` |

#### Inherited from

[WorkflowPort](/auto-docs/free-layout-core/interfaces/WorkflowPort.md).[size](/auto-docs/free-layout-core/interfaces/WorkflowPort.md#size)

***

### targetElement

`Optional` **targetElement**: `HTMLElement`

将点位渲染到该父节点上

#### Inherited from

[WorkflowPort](/auto-docs/free-layout-core/interfaces/WorkflowPort.md).[targetElement](/auto-docs/free-layout-core/interfaces/WorkflowPort.md#targetelement)

***

### type

**type**: [`WorkflowPortType`](/auto-docs/free-layout-core/types/WorkflowPortType.md)

输入或者输出点

#### Inherited from

[WorkflowPort](/auto-docs/free-layout-core/interfaces/WorkflowPort.md).[type](/auto-docs/free-layout-core/interfaces/WorkflowPort.md#type)
