# Interface: BindingWhenOnSyntax\<T>

[interfaces](/en/auto-docs/fixed-layout-editor/modules/interfaces.md).BindingWhenOnSyntax

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

* [`BindingWhenSyntax`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingWhenSyntax.md)<`T`>

* [`BindingOnSyntax`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

  ↳ **`BindingWhenOnSyntax`**

  ↳↳ [`BindingInWhenOnSyntax`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingInWhenOnSyntax.md)

## Table of contents

### Methods

* [onActivation](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingWhenOnSyntax.md#onactivation)
* [onDeactivation](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingWhenOnSyntax.md#ondeactivation)
* [when](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingWhenOnSyntax.md#when)
* [whenAnyAncestorIs](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingWhenOnSyntax.md#whenanyancestoris)
* [whenAnyAncestorMatches](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingWhenOnSyntax.md#whenanyancestormatches)
* [whenAnyAncestorNamed](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingWhenOnSyntax.md#whenanyancestornamed)
* [whenAnyAncestorTagged](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingWhenOnSyntax.md#whenanyancestortagged)
* [whenInjectedInto](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingWhenOnSyntax.md#wheninjectedinto)
* [whenNoAncestorIs](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingWhenOnSyntax.md#whennoancestoris)
* [whenNoAncestorMatches](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingWhenOnSyntax.md#whennoancestormatches)
* [whenNoAncestorNamed](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingWhenOnSyntax.md#whennoancestornamed)
* [whenNoAncestorTagged](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingWhenOnSyntax.md#whennoancestortagged)
* [whenParentNamed](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingWhenOnSyntax.md#whenparentnamed)
* [whenParentTagged](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingWhenOnSyntax.md#whenparenttagged)
* [whenTargetIsDefault](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingWhenOnSyntax.md#whentargetisdefault)
* [whenTargetNamed](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingWhenOnSyntax.md#whentargetnamed)
* [whenTargetTagged](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingWhenOnSyntax.md#whentargettagged)

## Methods

### onActivation

**onActivation**(`fn`): [`BindingWhenSyntax`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingWhenSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | (`context`: [`Context`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Context.md), `injectable`: `T`) => `T` | `Promise`<`T`> |

#### Returns

[`BindingWhenSyntax`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingWhenSyntax.md)<`T`>

#### Inherited from

[BindingOnSyntax](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingOnSyntax.md).[onActivation](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingOnSyntax.md#onactivation)

***

### onDeactivation

**onDeactivation**(`fn`): [`BindingWhenSyntax`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingWhenSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | (`injectable`: `T`) => `void` | `Promise`<`void`> |

#### Returns

[`BindingWhenSyntax`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingWhenSyntax.md)<`T`>

#### Inherited from

[BindingOnSyntax](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingOnSyntax.md).[onDeactivation](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingOnSyntax.md#ondeactivation)

***

### when

**when**(`constraint`): [`BindingOnSyntax`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `constraint` | (`request`: [`Request`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Request.md)) => `boolean` |

#### Returns

[`BindingOnSyntax`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Inherited from

[BindingWhenSyntax](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingWhenSyntax.md).[when](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingWhenSyntax.md#when)

***

### whenAnyAncestorIs

**whenAnyAncestorIs**(`ancestor`): [`BindingOnSyntax`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ancestor` | `string` | `NewableFunction` |

#### Returns

[`BindingOnSyntax`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Inherited from

[BindingWhenSyntax](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingWhenSyntax.md).[whenAnyAncestorIs](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingWhenSyntax.md#whenanyancestoris)

***

### whenAnyAncestorMatches

**whenAnyAncestorMatches**(`constraint`): [`BindingOnSyntax`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `constraint` | (`request`: [`Request`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Request.md)) => `boolean` |

#### Returns

[`BindingOnSyntax`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Inherited from

[BindingWhenSyntax](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingWhenSyntax.md).[whenAnyAncestorMatches](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingWhenSyntax.md#whenanyancestormatches)

***

### whenAnyAncestorNamed

**whenAnyAncestorNamed**(`name`): [`BindingOnSyntax`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` | `number` | `symbol` |

#### Returns

[`BindingOnSyntax`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Inherited from

[BindingWhenSyntax](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingWhenSyntax.md).[whenAnyAncestorNamed](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingWhenSyntax.md#whenanyancestornamed)

***

### whenAnyAncestorTagged

**whenAnyAncestorTagged**(`tag`, `value`): [`BindingOnSyntax`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tag` | `string` | `number` | `symbol` |
| `value` | `unknown` |

#### Returns

[`BindingOnSyntax`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Inherited from

[BindingWhenSyntax](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingWhenSyntax.md).[whenAnyAncestorTagged](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingWhenSyntax.md#whenanyancestortagged)

***

### whenInjectedInto

**whenInjectedInto**(`parent`): [`BindingOnSyntax`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `parent` | `string` | `NewableFunction` |

#### Returns

[`BindingOnSyntax`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Inherited from

[BindingWhenSyntax](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingWhenSyntax.md).[whenInjectedInto](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingWhenSyntax.md#wheninjectedinto)

***

### whenNoAncestorIs

**whenNoAncestorIs**(`ancestor`): [`BindingOnSyntax`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ancestor` | `string` | `NewableFunction` |

#### Returns

[`BindingOnSyntax`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Inherited from

[BindingWhenSyntax](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingWhenSyntax.md).[whenNoAncestorIs](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingWhenSyntax.md#whennoancestoris)

***

### whenNoAncestorMatches

**whenNoAncestorMatches**(`constraint`): [`BindingOnSyntax`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `constraint` | (`request`: [`Request`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.Request.md)) => `boolean` |

#### Returns

[`BindingOnSyntax`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Inherited from

[BindingWhenSyntax](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingWhenSyntax.md).[whenNoAncestorMatches](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingWhenSyntax.md#whennoancestormatches)

***

### whenNoAncestorNamed

**whenNoAncestorNamed**(`name`): [`BindingOnSyntax`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` | `number` | `symbol` |

#### Returns

[`BindingOnSyntax`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Inherited from

[BindingWhenSyntax](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingWhenSyntax.md).[whenNoAncestorNamed](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingWhenSyntax.md#whennoancestornamed)

***

### whenNoAncestorTagged

**whenNoAncestorTagged**(`tag`, `value`): [`BindingOnSyntax`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tag` | `string` | `number` | `symbol` |
| `value` | `unknown` |

#### Returns

[`BindingOnSyntax`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Inherited from

[BindingWhenSyntax](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingWhenSyntax.md).[whenNoAncestorTagged](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingWhenSyntax.md#whennoancestortagged)

***

### whenParentNamed

**whenParentNamed**(`name`): [`BindingOnSyntax`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` | `number` | `symbol` |

#### Returns

[`BindingOnSyntax`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Inherited from

[BindingWhenSyntax](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingWhenSyntax.md).[whenParentNamed](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingWhenSyntax.md#whenparentnamed)

***

### whenParentTagged

**whenParentTagged**(`tag`, `value`): [`BindingOnSyntax`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tag` | `string` | `number` | `symbol` |
| `value` | `unknown` |

#### Returns

[`BindingOnSyntax`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Inherited from

[BindingWhenSyntax](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingWhenSyntax.md).[whenParentTagged](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingWhenSyntax.md#whenparenttagged)

***

### whenTargetIsDefault

**whenTargetIsDefault**(): [`BindingOnSyntax`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Returns

[`BindingOnSyntax`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Inherited from

[BindingWhenSyntax](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingWhenSyntax.md).[whenTargetIsDefault](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingWhenSyntax.md#whentargetisdefault)

***

### whenTargetNamed

**whenTargetNamed**(`name`): [`BindingOnSyntax`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` | `number` | `symbol` |

#### Returns

[`BindingOnSyntax`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Inherited from

[BindingWhenSyntax](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingWhenSyntax.md).[whenTargetNamed](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingWhenSyntax.md#whentargetnamed)

***

### whenTargetTagged

**whenTargetTagged**(`tag`, `value`): [`BindingOnSyntax`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tag` | `string` | `number` | `symbol` |
| `value` | `unknown` |

#### Returns

[`BindingOnSyntax`](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Inherited from

[BindingWhenSyntax](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingWhenSyntax.md).[whenTargetTagged](/en/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingWhenSyntax.md#whentargettagged)
