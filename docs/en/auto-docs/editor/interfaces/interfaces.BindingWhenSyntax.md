# Interface: BindingWhenSyntax\<T>

[interfaces](/en/auto-docs/editor/modules/interfaces.md).BindingWhenSyntax

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

* **`BindingWhenSyntax`**

  ↳ [`BindingWhenOnSyntax`](/en/auto-docs/editor/interfaces/interfaces.BindingWhenOnSyntax.md)

## Table of contents

### Methods

* [when](/en/auto-docs/editor/interfaces/interfaces.BindingWhenSyntax.md#when)
* [whenAnyAncestorIs](/en/auto-docs/editor/interfaces/interfaces.BindingWhenSyntax.md#whenanyancestoris)
* [whenAnyAncestorMatches](/en/auto-docs/editor/interfaces/interfaces.BindingWhenSyntax.md#whenanyancestormatches)
* [whenAnyAncestorNamed](/en/auto-docs/editor/interfaces/interfaces.BindingWhenSyntax.md#whenanyancestornamed)
* [whenAnyAncestorTagged](/en/auto-docs/editor/interfaces/interfaces.BindingWhenSyntax.md#whenanyancestortagged)
* [whenInjectedInto](/en/auto-docs/editor/interfaces/interfaces.BindingWhenSyntax.md#wheninjectedinto)
* [whenNoAncestorIs](/en/auto-docs/editor/interfaces/interfaces.BindingWhenSyntax.md#whennoancestoris)
* [whenNoAncestorMatches](/en/auto-docs/editor/interfaces/interfaces.BindingWhenSyntax.md#whennoancestormatches)
* [whenNoAncestorNamed](/en/auto-docs/editor/interfaces/interfaces.BindingWhenSyntax.md#whennoancestornamed)
* [whenNoAncestorTagged](/en/auto-docs/editor/interfaces/interfaces.BindingWhenSyntax.md#whennoancestortagged)
* [whenParentNamed](/en/auto-docs/editor/interfaces/interfaces.BindingWhenSyntax.md#whenparentnamed)
* [whenParentTagged](/en/auto-docs/editor/interfaces/interfaces.BindingWhenSyntax.md#whenparenttagged)
* [whenTargetIsDefault](/en/auto-docs/editor/interfaces/interfaces.BindingWhenSyntax.md#whentargetisdefault)
* [whenTargetNamed](/en/auto-docs/editor/interfaces/interfaces.BindingWhenSyntax.md#whentargetnamed)
* [whenTargetTagged](/en/auto-docs/editor/interfaces/interfaces.BindingWhenSyntax.md#whentargettagged)

## Methods

### when

**when**(`constraint`): [`BindingOnSyntax`](/en/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `constraint` | (`request`: [`Request`](/en/auto-docs/editor/interfaces/interfaces.Request.md)) => `boolean` |

#### Returns

[`BindingOnSyntax`](/en/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

***

### whenAnyAncestorIs

**whenAnyAncestorIs**(`ancestor`): [`BindingOnSyntax`](/en/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ancestor` | `string` | `NewableFunction` |

#### Returns

[`BindingOnSyntax`](/en/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

***

### whenAnyAncestorMatches

**whenAnyAncestorMatches**(`constraint`): [`BindingOnSyntax`](/en/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `constraint` | (`request`: [`Request`](/en/auto-docs/editor/interfaces/interfaces.Request.md)) => `boolean` |

#### Returns

[`BindingOnSyntax`](/en/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

***

### whenAnyAncestorNamed

**whenAnyAncestorNamed**(`name`): [`BindingOnSyntax`](/en/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` | `number` | `symbol` |

#### Returns

[`BindingOnSyntax`](/en/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

***

### whenAnyAncestorTagged

**whenAnyAncestorTagged**(`tag`, `value`): [`BindingOnSyntax`](/en/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tag` | `string` | `number` | `symbol` |
| `value` | `unknown` |

#### Returns

[`BindingOnSyntax`](/en/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

***

### whenInjectedInto

**whenInjectedInto**(`parent`): [`BindingOnSyntax`](/en/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `parent` | `string` | `NewableFunction` |

#### Returns

[`BindingOnSyntax`](/en/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

***

### whenNoAncestorIs

**whenNoAncestorIs**(`ancestor`): [`BindingOnSyntax`](/en/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ancestor` | `string` | `NewableFunction` |

#### Returns

[`BindingOnSyntax`](/en/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

***

### whenNoAncestorMatches

**whenNoAncestorMatches**(`constraint`): [`BindingOnSyntax`](/en/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `constraint` | (`request`: [`Request`](/en/auto-docs/editor/interfaces/interfaces.Request.md)) => `boolean` |

#### Returns

[`BindingOnSyntax`](/en/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

***

### whenNoAncestorNamed

**whenNoAncestorNamed**(`name`): [`BindingOnSyntax`](/en/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` | `number` | `symbol` |

#### Returns

[`BindingOnSyntax`](/en/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

***

### whenNoAncestorTagged

**whenNoAncestorTagged**(`tag`, `value`): [`BindingOnSyntax`](/en/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tag` | `string` | `number` | `symbol` |
| `value` | `unknown` |

#### Returns

[`BindingOnSyntax`](/en/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

***

### whenParentNamed

**whenParentNamed**(`name`): [`BindingOnSyntax`](/en/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` | `number` | `symbol` |

#### Returns

[`BindingOnSyntax`](/en/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

***

### whenParentTagged

**whenParentTagged**(`tag`, `value`): [`BindingOnSyntax`](/en/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tag` | `string` | `number` | `symbol` |
| `value` | `unknown` |

#### Returns

[`BindingOnSyntax`](/en/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

***

### whenTargetIsDefault

**whenTargetIsDefault**(): [`BindingOnSyntax`](/en/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Returns

[`BindingOnSyntax`](/en/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

***

### whenTargetNamed

**whenTargetNamed**(`name`): [`BindingOnSyntax`](/en/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` | `number` | `symbol` |

#### Returns

[`BindingOnSyntax`](/en/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

***

### whenTargetTagged

**whenTargetTagged**(`tag`, `value`): [`BindingOnSyntax`](/en/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tag` | `string` | `number` | `symbol` |
| `value` | `unknown` |

#### Returns

[`BindingOnSyntax`](/en/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>
