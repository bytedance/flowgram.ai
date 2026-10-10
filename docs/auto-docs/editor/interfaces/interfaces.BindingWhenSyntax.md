# Interface: BindingWhenSyntax\<T>

[interfaces](/auto-docs/editor/modules/interfaces.md).BindingWhenSyntax

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

* **`BindingWhenSyntax`**

  ↳ [`BindingWhenOnSyntax`](/auto-docs/editor/interfaces/interfaces.BindingWhenOnSyntax.md)

## Table of contents

### Methods

* [when](/auto-docs/editor/interfaces/interfaces.BindingWhenSyntax.md#when)
* [whenAnyAncestorIs](/auto-docs/editor/interfaces/interfaces.BindingWhenSyntax.md#whenanyancestoris)
* [whenAnyAncestorMatches](/auto-docs/editor/interfaces/interfaces.BindingWhenSyntax.md#whenanyancestormatches)
* [whenAnyAncestorNamed](/auto-docs/editor/interfaces/interfaces.BindingWhenSyntax.md#whenanyancestornamed)
* [whenAnyAncestorTagged](/auto-docs/editor/interfaces/interfaces.BindingWhenSyntax.md#whenanyancestortagged)
* [whenInjectedInto](/auto-docs/editor/interfaces/interfaces.BindingWhenSyntax.md#wheninjectedinto)
* [whenNoAncestorIs](/auto-docs/editor/interfaces/interfaces.BindingWhenSyntax.md#whennoancestoris)
* [whenNoAncestorMatches](/auto-docs/editor/interfaces/interfaces.BindingWhenSyntax.md#whennoancestormatches)
* [whenNoAncestorNamed](/auto-docs/editor/interfaces/interfaces.BindingWhenSyntax.md#whennoancestornamed)
* [whenNoAncestorTagged](/auto-docs/editor/interfaces/interfaces.BindingWhenSyntax.md#whennoancestortagged)
* [whenParentNamed](/auto-docs/editor/interfaces/interfaces.BindingWhenSyntax.md#whenparentnamed)
* [whenParentTagged](/auto-docs/editor/interfaces/interfaces.BindingWhenSyntax.md#whenparenttagged)
* [whenTargetIsDefault](/auto-docs/editor/interfaces/interfaces.BindingWhenSyntax.md#whentargetisdefault)
* [whenTargetNamed](/auto-docs/editor/interfaces/interfaces.BindingWhenSyntax.md#whentargetnamed)
* [whenTargetTagged](/auto-docs/editor/interfaces/interfaces.BindingWhenSyntax.md#whentargettagged)

## Methods

### when

**when**(`constraint`): [`BindingOnSyntax`](/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `constraint` | (`request`: [`Request`](/auto-docs/editor/interfaces/interfaces.Request.md)) => `boolean` |

#### Returns

[`BindingOnSyntax`](/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

***

### whenAnyAncestorIs

**whenAnyAncestorIs**(`ancestor`): [`BindingOnSyntax`](/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ancestor` | `string` | `NewableFunction` |

#### Returns

[`BindingOnSyntax`](/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

***

### whenAnyAncestorMatches

**whenAnyAncestorMatches**(`constraint`): [`BindingOnSyntax`](/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `constraint` | (`request`: [`Request`](/auto-docs/editor/interfaces/interfaces.Request.md)) => `boolean` |

#### Returns

[`BindingOnSyntax`](/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

***

### whenAnyAncestorNamed

**whenAnyAncestorNamed**(`name`): [`BindingOnSyntax`](/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` | `number` | `symbol` |

#### Returns

[`BindingOnSyntax`](/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

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

***

### whenInjectedInto

**whenInjectedInto**(`parent`): [`BindingOnSyntax`](/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `parent` | `string` | `NewableFunction` |

#### Returns

[`BindingOnSyntax`](/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

***

### whenNoAncestorIs

**whenNoAncestorIs**(`ancestor`): [`BindingOnSyntax`](/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ancestor` | `string` | `NewableFunction` |

#### Returns

[`BindingOnSyntax`](/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

***

### whenNoAncestorMatches

**whenNoAncestorMatches**(`constraint`): [`BindingOnSyntax`](/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `constraint` | (`request`: [`Request`](/auto-docs/editor/interfaces/interfaces.Request.md)) => `boolean` |

#### Returns

[`BindingOnSyntax`](/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

***

### whenNoAncestorNamed

**whenNoAncestorNamed**(`name`): [`BindingOnSyntax`](/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` | `number` | `symbol` |

#### Returns

[`BindingOnSyntax`](/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

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

***

### whenParentNamed

**whenParentNamed**(`name`): [`BindingOnSyntax`](/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` | `number` | `symbol` |

#### Returns

[`BindingOnSyntax`](/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

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

***

### whenTargetIsDefault

**whenTargetIsDefault**(): [`BindingOnSyntax`](/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Returns

[`BindingOnSyntax`](/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

***

### whenTargetNamed

**whenTargetNamed**(`name`): [`BindingOnSyntax`](/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` | `number` | `symbol` |

#### Returns

[`BindingOnSyntax`](/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

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
