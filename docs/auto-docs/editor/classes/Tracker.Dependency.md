# Class: Dependency

[Tracker](/auto-docs/editor/modules/Tracker.md).Dependency

A Dependency represents an atomic unit of reactive data that a
computation might depend on. Reactive data sources such as Session or
Minimongo internally create different Dependency objects for different
pieces of data, each of which may be depended on by multiple computations.
When the data changes, the computations are invalidated.

## Table of contents

### Constructors

* [constructor](/auto-docs/editor/classes/Tracker.Dependency.md#constructor)

### Methods

* [changed](/auto-docs/editor/classes/Tracker.Dependency.md#changed)
* [depend](/auto-docs/editor/classes/Tracker.Dependency.md#depend)
* [hasDependents](/auto-docs/editor/classes/Tracker.Dependency.md#hasdependents)

## Constructors

### constructor

**new Dependency**()

## Methods

### changed

**changed**(): `void`

Invalidate all dependent computations immediately and remove them as dependents.

#### Returns

`void`

***

### depend

**depend**(`computation?`): `boolean`

Declares that the current computation (or `fromComputation` if given) depends on `dependency`.  The computation will be invalidated the next time `dependency` changes.
If there is no current computation and `depend()` is called with no arguments, it does nothing and returns false.
Returns true if the computation is a new dependent of `dependency` rather than an existing one.

#### Parameters

| Name | Type |
| :------ | :------ |
| `computation?` | [`Computation`](/auto-docs/editor/classes/Tracker.Computation.md)<`any`> |

#### Returns

`boolean`

***

### hasDependents

**hasDependents**(): `boolean`

True if this Dependency has one or more dependent Computations, which would be invalidated if this Dependency were to change.

#### Returns

`boolean`
