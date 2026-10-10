# Class: Computation\<V>

[Tracker](/en/auto-docs/free-layout-editor/modules/Tracker.md).Computation

A Computation object represents code that is repeatedly rerun
in response to
reactive data changes. Computations don't have return values; they just
perform actions, such as rerendering a template on the screen. Computations
are created using Tracker.autorun. Use stop to prevent further rerunning of a
computation.

## Type parameters

| Name | Type |
| :------ | :------ |
| `V` | `any` |

## Table of contents

### Constructors

* [constructor](/en/auto-docs/free-layout-editor/classes/Tracker.Computation.md#constructor)

### Properties

* [firstRun](/en/auto-docs/free-layout-editor/classes/Tracker.Computation.md#firstrun)
* [invalidated](/en/auto-docs/free-layout-editor/classes/Tracker.Computation.md#invalidated)
* [parent](/en/auto-docs/free-layout-editor/classes/Tracker.Computation.md#parent)
* [stopped](/en/auto-docs/free-layout-editor/classes/Tracker.Computation.md#stopped)

### Accessors

* [result](/en/auto-docs/free-layout-editor/classes/Tracker.Computation.md#result)

### Methods

* [\_needsRecompute](/en/auto-docs/free-layout-editor/classes/Tracker.Computation.md#_needsrecompute)
* [\_recompute](/en/auto-docs/free-layout-editor/classes/Tracker.Computation.md#_recompute)
* [flush](/en/auto-docs/free-layout-editor/classes/Tracker.Computation.md#flush)
* [invalidate](/en/auto-docs/free-layout-editor/classes/Tracker.Computation.md#invalidate)
* [onInvalidate](/en/auto-docs/free-layout-editor/classes/Tracker.Computation.md#oninvalidate)
* [onStop](/en/auto-docs/free-layout-editor/classes/Tracker.Computation.md#onstop)
* [run](/en/auto-docs/free-layout-editor/classes/Tracker.Computation.md#run)
* [stop](/en/auto-docs/free-layout-editor/classes/Tracker.Computation.md#stop)

## Constructors

### constructor

**new Computation**<`V`>(`_fn`, `parent?`, `_onError?`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `V` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `_fn` | [`IComputationCallback`](/en/auto-docs/free-layout-editor/types/Tracker.IComputationCallback.md)<`V`> |
| `parent?` | [`Computation`](/en/auto-docs/free-layout-editor/classes/Tracker.Computation.md)<`any`> |
| `_onError?` | `ICallback`<`Error`, `void`> |

## Properties

### firstRun

**firstRun**: `boolean`

是否第一次执行

***

### invalidated

**invalidated**: `boolean`

未开始执行则返回 false

***

### parent

`Optional` `Readonly` **parent**: [`Computation`](/en/auto-docs/free-layout-editor/classes/Tracker.Computation.md)<`any`>

***

### stopped

**stopped**: `boolean`

是否停止

## Accessors

### result

`get` **result**(): `V`

#### Returns

`V`

## Methods

### \_needsRecompute

**\_needsRecompute**(): `boolean`

#### Returns

`boolean`

***

### \_recompute

**\_recompute**(): `void`

#### Returns

`void`

***

### flush

**flush**(): `void`

#### Returns

`void`

**`Summary`**

Process the reactive updates for this computation immediately
and ensure that the computation is rerun. The computation is rerun only
if it is invalidated.

***

### invalidate

**invalidate**(): `void`

#### Returns

`void`

**`Summary`**

Invalidates this computation so that it will be rerun.

***

### onInvalidate

**onInvalidate**(`f`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | [`IComputationCallback`](/en/auto-docs/free-layout-editor/types/Tracker.IComputationCallback.md)<`any`> |

#### Returns

`void`

***

### onStop

**onStop**(`f`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | [`IComputationCallback`](/en/auto-docs/free-layout-editor/types/Tracker.IComputationCallback.md)<`any`> |

#### Returns

`void`

***

### run

**run**(): `void`

#### Returns

`void`

**`Summary`**

Causes the function inside this computation to run and
synchronously process all reactive updtes.

**`Locus`**

Client

***

### stop

**stop**(): `void`

#### Returns

`void`

**`Summary`**

Prevents this computation from rerunning.

**`Locus`**

Client
