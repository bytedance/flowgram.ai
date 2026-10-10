# Interface: BindingInWhenOnSyntax\<T>

[interfaces](/en/auto-docs/editor/modules/interfaces.md).BindingInWhenOnSyntax

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

* [`BindingInSyntax`](/en/auto-docs/editor/interfaces/interfaces.BindingInSyntax.md)<`T`>

* [`BindingWhenOnSyntax`](/en/auto-docs/editor/interfaces/interfaces.BindingWhenOnSyntax.md)<`T`>

  ↳ **`BindingInWhenOnSyntax`**

## Table of contents

### Methods

* [inRequestScope](/en/auto-docs/editor/interfaces/interfaces.BindingInWhenOnSyntax.md#inrequestscope)
* [inSingletonScope](/en/auto-docs/editor/interfaces/interfaces.BindingInWhenOnSyntax.md#insingletonscope)
* [inTransientScope](/en/auto-docs/editor/interfaces/interfaces.BindingInWhenOnSyntax.md#intransientscope)
* [onActivation](/en/auto-docs/editor/interfaces/interfaces.BindingInWhenOnSyntax.md#onactivation)
* [onDeactivation](/en/auto-docs/editor/interfaces/interfaces.BindingInWhenOnSyntax.md#ondeactivation)
* [when](/en/auto-docs/editor/interfaces/interfaces.BindingInWhenOnSyntax.md#when)
* [whenAnyAncestorIs](/en/auto-docs/editor/interfaces/interfaces.BindingInWhenOnSyntax.md#whenanyancestoris)
* [whenAnyAncestorMatches](/en/auto-docs/editor/interfaces/interfaces.BindingInWhenOnSyntax.md#whenanyancestormatches)
* [whenAnyAncestorNamed](/en/auto-docs/editor/interfaces/interfaces.BindingInWhenOnSyntax.md#whenanyancestornamed)
* [whenAnyAncestorTagged](/en/auto-docs/editor/interfaces/interfaces.BindingInWhenOnSyntax.md#whenanyancestortagged)
* [whenInjectedInto](/en/auto-docs/editor/interfaces/interfaces.BindingInWhenOnSyntax.md#wheninjectedinto)
* [whenNoAncestorIs](/en/auto-docs/editor/interfaces/interfaces.BindingInWhenOnSyntax.md#whennoancestoris)
* [whenNoAncestorMatches](/en/auto-docs/editor/interfaces/interfaces.BindingInWhenOnSyntax.md#whennoancestormatches)
* [whenNoAncestorNamed](/en/auto-docs/editor/interfaces/interfaces.BindingInWhenOnSyntax.md#whennoancestornamed)
* [whenNoAncestorTagged](/en/auto-docs/editor/interfaces/interfaces.BindingInWhenOnSyntax.md#whennoancestortagged)
* [whenParentNamed](/en/auto-docs/editor/interfaces/interfaces.BindingInWhenOnSyntax.md#whenparentnamed)
* [whenParentTagged](/en/auto-docs/editor/interfaces/interfaces.BindingInWhenOnSyntax.md#whenparenttagged)
* [whenTargetIsDefault](/en/auto-docs/editor/interfaces/interfaces.BindingInWhenOnSyntax.md#whentargetisdefault)
* [whenTargetNamed](/en/auto-docs/editor/interfaces/interfaces.BindingInWhenOnSyntax.md#whentargetnamed)
* [whenTargetTagged](/en/auto-docs/editor/interfaces/interfaces.BindingInWhenOnSyntax.md#whentargettagged)

## Methods

### inRequestScope

**inRequestScope**(): [`BindingWhenOnSyntax`](/en/auto-docs/editor/interfaces/interfaces.BindingWhenOnSyntax.md)<`T`>

#### Returns

[`BindingWhenOnSyntax`](/en/auto-docs/editor/interfaces/interfaces.BindingWhenOnSyntax.md)<`T`>

#### Inherited from

[BindingInSyntax](/en/auto-docs/editor/interfaces/interfaces.BindingInSyntax.md).[inRequestScope](/en/auto-docs/editor/interfaces/interfaces.BindingInSyntax.md#inrequestscope)

***

### inSingletonScope

**inSingletonScope**(): [`BindingWhenOnSyntax`](/en/auto-docs/editor/interfaces/interfaces.BindingWhenOnSyntax.md)<`T`>

#### Returns

[`BindingWhenOnSyntax`](/en/auto-docs/editor/interfaces/interfaces.BindingWhenOnSyntax.md)<`T`>

#### Inherited from

[BindingInSyntax](/en/auto-docs/editor/interfaces/interfaces.BindingInSyntax.md).[inSingletonScope](/en/auto-docs/editor/interfaces/interfaces.BindingInSyntax.md#insingletonscope)

***

### inTransientScope

**inTransientScope**(): [`BindingWhenOnSyntax`](/en/auto-docs/editor/interfaces/interfaces.BindingWhenOnSyntax.md)<`T`>

#### Returns

[`BindingWhenOnSyntax`](/en/auto-docs/editor/interfaces/interfaces.BindingWhenOnSyntax.md)<`T`>

#### Inherited from

[BindingInSyntax](/en/auto-docs/editor/interfaces/interfaces.BindingInSyntax.md).[inTransientScope](/en/auto-docs/editor/interfaces/interfaces.BindingInSyntax.md#intransientscope)

***

### onActivation

**onActivation**(`fn`): [`BindingWhenSyntax`](/en/auto-docs/editor/interfaces/interfaces.BindingWhenSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | (`context`: [`Context`](/en/auto-docs/editor/interfaces/interfaces.Context.md), `injectable`: `T`) => `T` | `Promise`<`T`> |

#### Returns

[`BindingWhenSyntax`](/en/auto-docs/editor/interfaces/interfaces.BindingWhenSyntax.md)<`T`>

#### Inherited from

[BindingWhenOnSyntax](/en/auto-docs/editor/interfaces/interfaces.BindingWhenOnSyntax.md).[onActivation](/en/auto-docs/editor/interfaces/interfaces.BindingWhenOnSyntax.md#onactivation)

***

### onDeactivation

**onDeactivation**(`fn`): [`BindingWhenSyntax`](/en/auto-docs/editor/interfaces/interfaces.BindingWhenSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | (`injectable`: `T`) => `void` | `Promise`<`void`> |

#### Returns

[`BindingWhenSyntax`](/en/auto-docs/editor/interfaces/interfaces.BindingWhenSyntax.md)<`T`>

#### Inherited from

[BindingWhenOnSyntax](/en/auto-docs/editor/interfaces/interfaces.BindingWhenOnSyntax.md).[onDeactivation](/en/auto-docs/editor/interfaces/interfaces.BindingWhenOnSyntax.md#ondeactivation)

***

### when

**when**(`constraint`): [`BindingOnSyntax`](/en/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `constraint` | (`request`: [`Request`](/en/auto-docs/editor/interfaces/interfaces.Request.md)) => `boolean` |

#### Returns

[`BindingOnSyntax`](/en/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Inherited from

[BindingWhenOnSyntax](/en/auto-docs/editor/interfaces/interfaces.BindingWhenOnSyntax.md).[when](/en/auto-docs/editor/interfaces/interfaces.BindingWhenOnSyntax.md#when)

***

### whenAnyAncestorIs

**whenAnyAncestorIs**(`ancestor`): [`BindingOnSyntax`](/en/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ancestor` | `string` | `NewableFunction` |

#### Returns

[`BindingOnSyntax`](/en/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Inherited from

[BindingWhenOnSyntax](/en/auto-docs/editor/interfaces/interfaces.BindingWhenOnSyntax.md).[whenAnyAncestorIs](/en/auto-docs/editor/interfaces/interfaces.BindingWhenOnSyntax.md#whenanyancestoris)

***

### whenAnyAncestorMatches

**whenAnyAncestorMatches**(`constraint`): [`BindingOnSyntax`](/en/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `constraint` | (`request`: [`Request`](/en/auto-docs/editor/interfaces/interfaces.Request.md)) => `boolean` |

#### Returns

[`BindingOnSyntax`](/en/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Inherited from

[BindingWhenOnSyntax](/en/auto-docs/editor/interfaces/interfaces.BindingWhenOnSyntax.md).[whenAnyAncestorMatches](/en/auto-docs/editor/interfaces/interfaces.BindingWhenOnSyntax.md#whenanyancestormatches)

***

### whenAnyAncestorNamed

**whenAnyAncestorNamed**(`name`): [`BindingOnSyntax`](/en/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` | `number` | `symbol` |

#### Returns

[`BindingOnSyntax`](/en/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Inherited from

[BindingWhenOnSyntax](/en/auto-docs/editor/interfaces/interfaces.BindingWhenOnSyntax.md).[whenAnyAncestorNamed](/en/auto-docs/editor/interfaces/interfaces.BindingWhenOnSyntax.md#whenanyancestornamed)

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

#### Inherited from

[BindingWhenOnSyntax](/en/auto-docs/editor/interfaces/interfaces.BindingWhenOnSyntax.md).[whenAnyAncestorTagged](/en/auto-docs/editor/interfaces/interfaces.BindingWhenOnSyntax.md#whenanyancestortagged)

***

### whenInjectedInto

**whenInjectedInto**(`parent`): [`BindingOnSyntax`](/en/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `parent` | `string` | `NewableFunction` |

#### Returns

[`BindingOnSyntax`](/en/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Inherited from

[BindingWhenOnSyntax](/en/auto-docs/editor/interfaces/interfaces.BindingWhenOnSyntax.md).[whenInjectedInto](/en/auto-docs/editor/interfaces/interfaces.BindingWhenOnSyntax.md#wheninjectedinto)

***

### whenNoAncestorIs

**whenNoAncestorIs**(`ancestor`): [`BindingOnSyntax`](/en/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ancestor` | `string` | `NewableFunction` |

#### Returns

[`BindingOnSyntax`](/en/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Inherited from

[BindingWhenOnSyntax](/en/auto-docs/editor/interfaces/interfaces.BindingWhenOnSyntax.md).[whenNoAncestorIs](/en/auto-docs/editor/interfaces/interfaces.BindingWhenOnSyntax.md#whennoancestoris)

***

### whenNoAncestorMatches

**whenNoAncestorMatches**(`constraint`): [`BindingOnSyntax`](/en/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `constraint` | (`request`: [`Request`](/en/auto-docs/editor/interfaces/interfaces.Request.md)) => `boolean` |

#### Returns

[`BindingOnSyntax`](/en/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Inherited from

[BindingWhenOnSyntax](/en/auto-docs/editor/interfaces/interfaces.BindingWhenOnSyntax.md).[whenNoAncestorMatches](/en/auto-docs/editor/interfaces/interfaces.BindingWhenOnSyntax.md#whennoancestormatches)

***

### whenNoAncestorNamed

**whenNoAncestorNamed**(`name`): [`BindingOnSyntax`](/en/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` | `number` | `symbol` |

#### Returns

[`BindingOnSyntax`](/en/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Inherited from

[BindingWhenOnSyntax](/en/auto-docs/editor/interfaces/interfaces.BindingWhenOnSyntax.md).[whenNoAncestorNamed](/en/auto-docs/editor/interfaces/interfaces.BindingWhenOnSyntax.md#whennoancestornamed)

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

#### Inherited from

[BindingWhenOnSyntax](/en/auto-docs/editor/interfaces/interfaces.BindingWhenOnSyntax.md).[whenNoAncestorTagged](/en/auto-docs/editor/interfaces/interfaces.BindingWhenOnSyntax.md#whennoancestortagged)

***

### whenParentNamed

**whenParentNamed**(`name`): [`BindingOnSyntax`](/en/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` | `number` | `symbol` |

#### Returns

[`BindingOnSyntax`](/en/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Inherited from

[BindingWhenOnSyntax](/en/auto-docs/editor/interfaces/interfaces.BindingWhenOnSyntax.md).[whenParentNamed](/en/auto-docs/editor/interfaces/interfaces.BindingWhenOnSyntax.md#whenparentnamed)

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

#### Inherited from

[BindingWhenOnSyntax](/en/auto-docs/editor/interfaces/interfaces.BindingWhenOnSyntax.md).[whenParentTagged](/en/auto-docs/editor/interfaces/interfaces.BindingWhenOnSyntax.md#whenparenttagged)

***

### whenTargetIsDefault

**whenTargetIsDefault**(): [`BindingOnSyntax`](/en/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Returns

[`BindingOnSyntax`](/en/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Inherited from

[BindingWhenOnSyntax](/en/auto-docs/editor/interfaces/interfaces.BindingWhenOnSyntax.md).[whenTargetIsDefault](/en/auto-docs/editor/interfaces/interfaces.BindingWhenOnSyntax.md#whentargetisdefault)

***

### whenTargetNamed

**whenTargetNamed**(`name`): [`BindingOnSyntax`](/en/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` | `number` | `symbol` |

#### Returns

[`BindingOnSyntax`](/en/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Inherited from

[BindingWhenOnSyntax](/en/auto-docs/editor/interfaces/interfaces.BindingWhenOnSyntax.md).[whenTargetNamed](/en/auto-docs/editor/interfaces/interfaces.BindingWhenOnSyntax.md#whentargetnamed)

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

#### Inherited from

[BindingWhenOnSyntax](/en/auto-docs/editor/interfaces/interfaces.BindingWhenOnSyntax.md).[whenTargetTagged](/en/auto-docs/editor/interfaces/interfaces.BindingWhenOnSyntax.md#whentargettagged)
