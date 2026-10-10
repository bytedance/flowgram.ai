# Interface: BindingWhenOnSyntax\<T>

[interfaces](/auto-docs/editor/modules/interfaces.md).BindingWhenOnSyntax

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

* [`BindingWhenSyntax`](/auto-docs/editor/interfaces/interfaces.BindingWhenSyntax.md)<`T`>

* [`BindingOnSyntax`](/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

  ↳ **`BindingWhenOnSyntax`**

  ↳↳ [`BindingInWhenOnSyntax`](/auto-docs/editor/interfaces/interfaces.BindingInWhenOnSyntax.md)

## Table of contents

### Methods

* [onActivation](/auto-docs/editor/interfaces/interfaces.BindingWhenOnSyntax.md#onactivation)
* [onDeactivation](/auto-docs/editor/interfaces/interfaces.BindingWhenOnSyntax.md#ondeactivation)
* [when](/auto-docs/editor/interfaces/interfaces.BindingWhenOnSyntax.md#when)
* [whenAnyAncestorIs](/auto-docs/editor/interfaces/interfaces.BindingWhenOnSyntax.md#whenanyancestoris)
* [whenAnyAncestorMatches](/auto-docs/editor/interfaces/interfaces.BindingWhenOnSyntax.md#whenanyancestormatches)
* [whenAnyAncestorNamed](/auto-docs/editor/interfaces/interfaces.BindingWhenOnSyntax.md#whenanyancestornamed)
* [whenAnyAncestorTagged](/auto-docs/editor/interfaces/interfaces.BindingWhenOnSyntax.md#whenanyancestortagged)
* [whenInjectedInto](/auto-docs/editor/interfaces/interfaces.BindingWhenOnSyntax.md#wheninjectedinto)
* [whenNoAncestorIs](/auto-docs/editor/interfaces/interfaces.BindingWhenOnSyntax.md#whennoancestoris)
* [whenNoAncestorMatches](/auto-docs/editor/interfaces/interfaces.BindingWhenOnSyntax.md#whennoancestormatches)
* [whenNoAncestorNamed](/auto-docs/editor/interfaces/interfaces.BindingWhenOnSyntax.md#whennoancestornamed)
* [whenNoAncestorTagged](/auto-docs/editor/interfaces/interfaces.BindingWhenOnSyntax.md#whennoancestortagged)
* [whenParentNamed](/auto-docs/editor/interfaces/interfaces.BindingWhenOnSyntax.md#whenparentnamed)
* [whenParentTagged](/auto-docs/editor/interfaces/interfaces.BindingWhenOnSyntax.md#whenparenttagged)
* [whenTargetIsDefault](/auto-docs/editor/interfaces/interfaces.BindingWhenOnSyntax.md#whentargetisdefault)
* [whenTargetNamed](/auto-docs/editor/interfaces/interfaces.BindingWhenOnSyntax.md#whentargetnamed)
* [whenTargetTagged](/auto-docs/editor/interfaces/interfaces.BindingWhenOnSyntax.md#whentargettagged)

## Methods

### onActivation

**onActivation**(`fn`): [`BindingWhenSyntax`](/auto-docs/editor/interfaces/interfaces.BindingWhenSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | (`context`: [`Context`](/auto-docs/editor/interfaces/interfaces.Context.md), `injectable`: `T`) => `T` | `Promise`<`T`> |

#### Returns

[`BindingWhenSyntax`](/auto-docs/editor/interfaces/interfaces.BindingWhenSyntax.md)<`T`>

#### Inherited from

[BindingOnSyntax](/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md).[onActivation](/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md#onactivation)

***

### onDeactivation

**onDeactivation**(`fn`): [`BindingWhenSyntax`](/auto-docs/editor/interfaces/interfaces.BindingWhenSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | (`injectable`: `T`) => `void` | `Promise`<`void`> |

#### Returns

[`BindingWhenSyntax`](/auto-docs/editor/interfaces/interfaces.BindingWhenSyntax.md)<`T`>

#### Inherited from

[BindingOnSyntax](/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md).[onDeactivation](/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md#ondeactivation)

***

### when

**when**(`constraint`): [`BindingOnSyntax`](/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `constraint` | (`request`: [`Request`](/auto-docs/editor/interfaces/interfaces.Request.md)) => `boolean` |

#### Returns

[`BindingOnSyntax`](/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Inherited from

[BindingWhenSyntax](/auto-docs/editor/interfaces/interfaces.BindingWhenSyntax.md).[when](/auto-docs/editor/interfaces/interfaces.BindingWhenSyntax.md#when)

***

### whenAnyAncestorIs

**whenAnyAncestorIs**(`ancestor`): [`BindingOnSyntax`](/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ancestor` | `string` | `NewableFunction` |

#### Returns

[`BindingOnSyntax`](/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Inherited from

[BindingWhenSyntax](/auto-docs/editor/interfaces/interfaces.BindingWhenSyntax.md).[whenAnyAncestorIs](/auto-docs/editor/interfaces/interfaces.BindingWhenSyntax.md#whenanyancestoris)

***

### whenAnyAncestorMatches

**whenAnyAncestorMatches**(`constraint`): [`BindingOnSyntax`](/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `constraint` | (`request`: [`Request`](/auto-docs/editor/interfaces/interfaces.Request.md)) => `boolean` |

#### Returns

[`BindingOnSyntax`](/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Inherited from

[BindingWhenSyntax](/auto-docs/editor/interfaces/interfaces.BindingWhenSyntax.md).[whenAnyAncestorMatches](/auto-docs/editor/interfaces/interfaces.BindingWhenSyntax.md#whenanyancestormatches)

***

### whenAnyAncestorNamed

**whenAnyAncestorNamed**(`name`): [`BindingOnSyntax`](/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` | `number` | `symbol` |

#### Returns

[`BindingOnSyntax`](/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Inherited from

[BindingWhenSyntax](/auto-docs/editor/interfaces/interfaces.BindingWhenSyntax.md).[whenAnyAncestorNamed](/auto-docs/editor/interfaces/interfaces.BindingWhenSyntax.md#whenanyancestornamed)

***

### whenAnyAncestorTagged

**whenAnyAncestorTagged**(`tag`, `value`): [`BindingOnSyntax`](/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tag` | `string` | `number` | `symbol` |
| `value` | `unknown` |

#### Returns

[`BindingOnSyntax`](/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Inherited from

[BindingWhenSyntax](/auto-docs/editor/interfaces/interfaces.BindingWhenSyntax.md).[whenAnyAncestorTagged](/auto-docs/editor/interfaces/interfaces.BindingWhenSyntax.md#whenanyancestortagged)

***

### whenInjectedInto

**whenInjectedInto**(`parent`): [`BindingOnSyntax`](/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `parent` | `string` | `NewableFunction` |

#### Returns

[`BindingOnSyntax`](/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Inherited from

[BindingWhenSyntax](/auto-docs/editor/interfaces/interfaces.BindingWhenSyntax.md).[whenInjectedInto](/auto-docs/editor/interfaces/interfaces.BindingWhenSyntax.md#wheninjectedinto)

***

### whenNoAncestorIs

**whenNoAncestorIs**(`ancestor`): [`BindingOnSyntax`](/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ancestor` | `string` | `NewableFunction` |

#### Returns

[`BindingOnSyntax`](/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Inherited from

[BindingWhenSyntax](/auto-docs/editor/interfaces/interfaces.BindingWhenSyntax.md).[whenNoAncestorIs](/auto-docs/editor/interfaces/interfaces.BindingWhenSyntax.md#whennoancestoris)

***

### whenNoAncestorMatches

**whenNoAncestorMatches**(`constraint`): [`BindingOnSyntax`](/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `constraint` | (`request`: [`Request`](/auto-docs/editor/interfaces/interfaces.Request.md)) => `boolean` |

#### Returns

[`BindingOnSyntax`](/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Inherited from

[BindingWhenSyntax](/auto-docs/editor/interfaces/interfaces.BindingWhenSyntax.md).[whenNoAncestorMatches](/auto-docs/editor/interfaces/interfaces.BindingWhenSyntax.md#whennoancestormatches)

***

### whenNoAncestorNamed

**whenNoAncestorNamed**(`name`): [`BindingOnSyntax`](/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` | `number` | `symbol` |

#### Returns

[`BindingOnSyntax`](/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Inherited from

[BindingWhenSyntax](/auto-docs/editor/interfaces/interfaces.BindingWhenSyntax.md).[whenNoAncestorNamed](/auto-docs/editor/interfaces/interfaces.BindingWhenSyntax.md#whennoancestornamed)

***

### whenNoAncestorTagged

**whenNoAncestorTagged**(`tag`, `value`): [`BindingOnSyntax`](/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tag` | `string` | `number` | `symbol` |
| `value` | `unknown` |

#### Returns

[`BindingOnSyntax`](/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Inherited from

[BindingWhenSyntax](/auto-docs/editor/interfaces/interfaces.BindingWhenSyntax.md).[whenNoAncestorTagged](/auto-docs/editor/interfaces/interfaces.BindingWhenSyntax.md#whennoancestortagged)

***

### whenParentNamed

**whenParentNamed**(`name`): [`BindingOnSyntax`](/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` | `number` | `symbol` |

#### Returns

[`BindingOnSyntax`](/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Inherited from

[BindingWhenSyntax](/auto-docs/editor/interfaces/interfaces.BindingWhenSyntax.md).[whenParentNamed](/auto-docs/editor/interfaces/interfaces.BindingWhenSyntax.md#whenparentnamed)

***

### whenParentTagged

**whenParentTagged**(`tag`, `value`): [`BindingOnSyntax`](/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tag` | `string` | `number` | `symbol` |
| `value` | `unknown` |

#### Returns

[`BindingOnSyntax`](/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Inherited from

[BindingWhenSyntax](/auto-docs/editor/interfaces/interfaces.BindingWhenSyntax.md).[whenParentTagged](/auto-docs/editor/interfaces/interfaces.BindingWhenSyntax.md#whenparenttagged)

***

### whenTargetIsDefault

**whenTargetIsDefault**(): [`BindingOnSyntax`](/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Returns

[`BindingOnSyntax`](/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Inherited from

[BindingWhenSyntax](/auto-docs/editor/interfaces/interfaces.BindingWhenSyntax.md).[whenTargetIsDefault](/auto-docs/editor/interfaces/interfaces.BindingWhenSyntax.md#whentargetisdefault)

***

### whenTargetNamed

**whenTargetNamed**(`name`): [`BindingOnSyntax`](/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` | `number` | `symbol` |

#### Returns

[`BindingOnSyntax`](/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Inherited from

[BindingWhenSyntax](/auto-docs/editor/interfaces/interfaces.BindingWhenSyntax.md).[whenTargetNamed](/auto-docs/editor/interfaces/interfaces.BindingWhenSyntax.md#whentargetnamed)

***

### whenTargetTagged

**whenTargetTagged**(`tag`, `value`): [`BindingOnSyntax`](/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tag` | `string` | `number` | `symbol` |
| `value` | `unknown` |

#### Returns

[`BindingOnSyntax`](/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Inherited from

[BindingWhenSyntax](/auto-docs/editor/interfaces/interfaces.BindingWhenSyntax.md).[whenTargetTagged](/auto-docs/editor/interfaces/interfaces.BindingWhenSyntax.md#whentargettagged)
