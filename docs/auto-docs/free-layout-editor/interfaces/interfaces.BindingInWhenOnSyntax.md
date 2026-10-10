# Interface: BindingInWhenOnSyntax\<T>

[interfaces](/auto-docs/free-layout-editor/modules/interfaces.md).BindingInWhenOnSyntax

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

* [`BindingInSyntax`](/auto-docs/free-layout-editor/interfaces/interfaces.BindingInSyntax.md)<`T`>

* [`BindingWhenOnSyntax`](/auto-docs/free-layout-editor/interfaces/interfaces.BindingWhenOnSyntax.md)<`T`>

  ↳ **`BindingInWhenOnSyntax`**

## Table of contents

### Methods

* [inRequestScope](/auto-docs/free-layout-editor/interfaces/interfaces.BindingInWhenOnSyntax.md#inrequestscope)
* [inSingletonScope](/auto-docs/free-layout-editor/interfaces/interfaces.BindingInWhenOnSyntax.md#insingletonscope)
* [inTransientScope](/auto-docs/free-layout-editor/interfaces/interfaces.BindingInWhenOnSyntax.md#intransientscope)
* [onActivation](/auto-docs/free-layout-editor/interfaces/interfaces.BindingInWhenOnSyntax.md#onactivation)
* [onDeactivation](/auto-docs/free-layout-editor/interfaces/interfaces.BindingInWhenOnSyntax.md#ondeactivation)
* [when](/auto-docs/free-layout-editor/interfaces/interfaces.BindingInWhenOnSyntax.md#when)
* [whenAnyAncestorIs](/auto-docs/free-layout-editor/interfaces/interfaces.BindingInWhenOnSyntax.md#whenanyancestoris)
* [whenAnyAncestorMatches](/auto-docs/free-layout-editor/interfaces/interfaces.BindingInWhenOnSyntax.md#whenanyancestormatches)
* [whenAnyAncestorNamed](/auto-docs/free-layout-editor/interfaces/interfaces.BindingInWhenOnSyntax.md#whenanyancestornamed)
* [whenAnyAncestorTagged](/auto-docs/free-layout-editor/interfaces/interfaces.BindingInWhenOnSyntax.md#whenanyancestortagged)
* [whenInjectedInto](/auto-docs/free-layout-editor/interfaces/interfaces.BindingInWhenOnSyntax.md#wheninjectedinto)
* [whenNoAncestorIs](/auto-docs/free-layout-editor/interfaces/interfaces.BindingInWhenOnSyntax.md#whennoancestoris)
* [whenNoAncestorMatches](/auto-docs/free-layout-editor/interfaces/interfaces.BindingInWhenOnSyntax.md#whennoancestormatches)
* [whenNoAncestorNamed](/auto-docs/free-layout-editor/interfaces/interfaces.BindingInWhenOnSyntax.md#whennoancestornamed)
* [whenNoAncestorTagged](/auto-docs/free-layout-editor/interfaces/interfaces.BindingInWhenOnSyntax.md#whennoancestortagged)
* [whenParentNamed](/auto-docs/free-layout-editor/interfaces/interfaces.BindingInWhenOnSyntax.md#whenparentnamed)
* [whenParentTagged](/auto-docs/free-layout-editor/interfaces/interfaces.BindingInWhenOnSyntax.md#whenparenttagged)
* [whenTargetIsDefault](/auto-docs/free-layout-editor/interfaces/interfaces.BindingInWhenOnSyntax.md#whentargetisdefault)
* [whenTargetNamed](/auto-docs/free-layout-editor/interfaces/interfaces.BindingInWhenOnSyntax.md#whentargetnamed)
* [whenTargetTagged](/auto-docs/free-layout-editor/interfaces/interfaces.BindingInWhenOnSyntax.md#whentargettagged)

## Methods

### inRequestScope

**inRequestScope**(): [`BindingWhenOnSyntax`](/auto-docs/free-layout-editor/interfaces/interfaces.BindingWhenOnSyntax.md)<`T`>

#### Returns

[`BindingWhenOnSyntax`](/auto-docs/free-layout-editor/interfaces/interfaces.BindingWhenOnSyntax.md)<`T`>

#### Inherited from

[BindingInSyntax](/auto-docs/free-layout-editor/interfaces/interfaces.BindingInSyntax.md).[inRequestScope](/auto-docs/free-layout-editor/interfaces/interfaces.BindingInSyntax.md#inrequestscope)

***

### inSingletonScope

**inSingletonScope**(): [`BindingWhenOnSyntax`](/auto-docs/free-layout-editor/interfaces/interfaces.BindingWhenOnSyntax.md)<`T`>

#### Returns

[`BindingWhenOnSyntax`](/auto-docs/free-layout-editor/interfaces/interfaces.BindingWhenOnSyntax.md)<`T`>

#### Inherited from

[BindingInSyntax](/auto-docs/free-layout-editor/interfaces/interfaces.BindingInSyntax.md).[inSingletonScope](/auto-docs/free-layout-editor/interfaces/interfaces.BindingInSyntax.md#insingletonscope)

***

### inTransientScope

**inTransientScope**(): [`BindingWhenOnSyntax`](/auto-docs/free-layout-editor/interfaces/interfaces.BindingWhenOnSyntax.md)<`T`>

#### Returns

[`BindingWhenOnSyntax`](/auto-docs/free-layout-editor/interfaces/interfaces.BindingWhenOnSyntax.md)<`T`>

#### Inherited from

[BindingInSyntax](/auto-docs/free-layout-editor/interfaces/interfaces.BindingInSyntax.md).[inTransientScope](/auto-docs/free-layout-editor/interfaces/interfaces.BindingInSyntax.md#intransientscope)

***

### onActivation

**onActivation**(`fn`): [`BindingWhenSyntax`](/auto-docs/free-layout-editor/interfaces/interfaces.BindingWhenSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | (`context`: [`Context`](/auto-docs/free-layout-editor/interfaces/interfaces.Context.md), `injectable`: `T`) => `T` | `Promise`<`T`> |

#### Returns

[`BindingWhenSyntax`](/auto-docs/free-layout-editor/interfaces/interfaces.BindingWhenSyntax.md)<`T`>

#### Inherited from

[BindingWhenOnSyntax](/auto-docs/free-layout-editor/interfaces/interfaces.BindingWhenOnSyntax.md).[onActivation](/auto-docs/free-layout-editor/interfaces/interfaces.BindingWhenOnSyntax.md#onactivation)

***

### onDeactivation

**onDeactivation**(`fn`): [`BindingWhenSyntax`](/auto-docs/free-layout-editor/interfaces/interfaces.BindingWhenSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | (`injectable`: `T`) => `void` | `Promise`<`void`> |

#### Returns

[`BindingWhenSyntax`](/auto-docs/free-layout-editor/interfaces/interfaces.BindingWhenSyntax.md)<`T`>

#### Inherited from

[BindingWhenOnSyntax](/auto-docs/free-layout-editor/interfaces/interfaces.BindingWhenOnSyntax.md).[onDeactivation](/auto-docs/free-layout-editor/interfaces/interfaces.BindingWhenOnSyntax.md#ondeactivation)

***

### when

**when**(`constraint`): [`BindingOnSyntax`](/auto-docs/free-layout-editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `constraint` | (`request`: [`Request`](/auto-docs/free-layout-editor/interfaces/interfaces.Request.md)) => `boolean` |

#### Returns

[`BindingOnSyntax`](/auto-docs/free-layout-editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Inherited from

[BindingWhenOnSyntax](/auto-docs/free-layout-editor/interfaces/interfaces.BindingWhenOnSyntax.md).[when](/auto-docs/free-layout-editor/interfaces/interfaces.BindingWhenOnSyntax.md#when)

***

### whenAnyAncestorIs

**whenAnyAncestorIs**(`ancestor`): [`BindingOnSyntax`](/auto-docs/free-layout-editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ancestor` | `string` | `NewableFunction` |

#### Returns

[`BindingOnSyntax`](/auto-docs/free-layout-editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Inherited from

[BindingWhenOnSyntax](/auto-docs/free-layout-editor/interfaces/interfaces.BindingWhenOnSyntax.md).[whenAnyAncestorIs](/auto-docs/free-layout-editor/interfaces/interfaces.BindingWhenOnSyntax.md#whenanyancestoris)

***

### whenAnyAncestorMatches

**whenAnyAncestorMatches**(`constraint`): [`BindingOnSyntax`](/auto-docs/free-layout-editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `constraint` | (`request`: [`Request`](/auto-docs/free-layout-editor/interfaces/interfaces.Request.md)) => `boolean` |

#### Returns

[`BindingOnSyntax`](/auto-docs/free-layout-editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Inherited from

[BindingWhenOnSyntax](/auto-docs/free-layout-editor/interfaces/interfaces.BindingWhenOnSyntax.md).[whenAnyAncestorMatches](/auto-docs/free-layout-editor/interfaces/interfaces.BindingWhenOnSyntax.md#whenanyancestormatches)

***

### whenAnyAncestorNamed

**whenAnyAncestorNamed**(`name`): [`BindingOnSyntax`](/auto-docs/free-layout-editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` | `number` | `symbol` |

#### Returns

[`BindingOnSyntax`](/auto-docs/free-layout-editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Inherited from

[BindingWhenOnSyntax](/auto-docs/free-layout-editor/interfaces/interfaces.BindingWhenOnSyntax.md).[whenAnyAncestorNamed](/auto-docs/free-layout-editor/interfaces/interfaces.BindingWhenOnSyntax.md#whenanyancestornamed)

***

### whenAnyAncestorTagged

**whenAnyAncestorTagged**(`tag`, `value`): [`BindingOnSyntax`](/auto-docs/free-layout-editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tag` | `string` | `number` | `symbol` |
| `value` | `unknown` |

#### Returns

[`BindingOnSyntax`](/auto-docs/free-layout-editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Inherited from

[BindingWhenOnSyntax](/auto-docs/free-layout-editor/interfaces/interfaces.BindingWhenOnSyntax.md).[whenAnyAncestorTagged](/auto-docs/free-layout-editor/interfaces/interfaces.BindingWhenOnSyntax.md#whenanyancestortagged)

***

### whenInjectedInto

**whenInjectedInto**(`parent`): [`BindingOnSyntax`](/auto-docs/free-layout-editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `parent` | `string` | `NewableFunction` |

#### Returns

[`BindingOnSyntax`](/auto-docs/free-layout-editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Inherited from

[BindingWhenOnSyntax](/auto-docs/free-layout-editor/interfaces/interfaces.BindingWhenOnSyntax.md).[whenInjectedInto](/auto-docs/free-layout-editor/interfaces/interfaces.BindingWhenOnSyntax.md#wheninjectedinto)

***

### whenNoAncestorIs

**whenNoAncestorIs**(`ancestor`): [`BindingOnSyntax`](/auto-docs/free-layout-editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ancestor` | `string` | `NewableFunction` |

#### Returns

[`BindingOnSyntax`](/auto-docs/free-layout-editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Inherited from

[BindingWhenOnSyntax](/auto-docs/free-layout-editor/interfaces/interfaces.BindingWhenOnSyntax.md).[whenNoAncestorIs](/auto-docs/free-layout-editor/interfaces/interfaces.BindingWhenOnSyntax.md#whennoancestoris)

***

### whenNoAncestorMatches

**whenNoAncestorMatches**(`constraint`): [`BindingOnSyntax`](/auto-docs/free-layout-editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `constraint` | (`request`: [`Request`](/auto-docs/free-layout-editor/interfaces/interfaces.Request.md)) => `boolean` |

#### Returns

[`BindingOnSyntax`](/auto-docs/free-layout-editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Inherited from

[BindingWhenOnSyntax](/auto-docs/free-layout-editor/interfaces/interfaces.BindingWhenOnSyntax.md).[whenNoAncestorMatches](/auto-docs/free-layout-editor/interfaces/interfaces.BindingWhenOnSyntax.md#whennoancestormatches)

***

### whenNoAncestorNamed

**whenNoAncestorNamed**(`name`): [`BindingOnSyntax`](/auto-docs/free-layout-editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` | `number` | `symbol` |

#### Returns

[`BindingOnSyntax`](/auto-docs/free-layout-editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Inherited from

[BindingWhenOnSyntax](/auto-docs/free-layout-editor/interfaces/interfaces.BindingWhenOnSyntax.md).[whenNoAncestorNamed](/auto-docs/free-layout-editor/interfaces/interfaces.BindingWhenOnSyntax.md#whennoancestornamed)

***

### whenNoAncestorTagged

**whenNoAncestorTagged**(`tag`, `value`): [`BindingOnSyntax`](/auto-docs/free-layout-editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tag` | `string` | `number` | `symbol` |
| `value` | `unknown` |

#### Returns

[`BindingOnSyntax`](/auto-docs/free-layout-editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Inherited from

[BindingWhenOnSyntax](/auto-docs/free-layout-editor/interfaces/interfaces.BindingWhenOnSyntax.md).[whenNoAncestorTagged](/auto-docs/free-layout-editor/interfaces/interfaces.BindingWhenOnSyntax.md#whennoancestortagged)

***

### whenParentNamed

**whenParentNamed**(`name`): [`BindingOnSyntax`](/auto-docs/free-layout-editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` | `number` | `symbol` |

#### Returns

[`BindingOnSyntax`](/auto-docs/free-layout-editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Inherited from

[BindingWhenOnSyntax](/auto-docs/free-layout-editor/interfaces/interfaces.BindingWhenOnSyntax.md).[whenParentNamed](/auto-docs/free-layout-editor/interfaces/interfaces.BindingWhenOnSyntax.md#whenparentnamed)

***

### whenParentTagged

**whenParentTagged**(`tag`, `value`): [`BindingOnSyntax`](/auto-docs/free-layout-editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tag` | `string` | `number` | `symbol` |
| `value` | `unknown` |

#### Returns

[`BindingOnSyntax`](/auto-docs/free-layout-editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Inherited from

[BindingWhenOnSyntax](/auto-docs/free-layout-editor/interfaces/interfaces.BindingWhenOnSyntax.md).[whenParentTagged](/auto-docs/free-layout-editor/interfaces/interfaces.BindingWhenOnSyntax.md#whenparenttagged)

***

### whenTargetIsDefault

**whenTargetIsDefault**(): [`BindingOnSyntax`](/auto-docs/free-layout-editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Returns

[`BindingOnSyntax`](/auto-docs/free-layout-editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Inherited from

[BindingWhenOnSyntax](/auto-docs/free-layout-editor/interfaces/interfaces.BindingWhenOnSyntax.md).[whenTargetIsDefault](/auto-docs/free-layout-editor/interfaces/interfaces.BindingWhenOnSyntax.md#whentargetisdefault)

***

### whenTargetNamed

**whenTargetNamed**(`name`): [`BindingOnSyntax`](/auto-docs/free-layout-editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` | `number` | `symbol` |

#### Returns

[`BindingOnSyntax`](/auto-docs/free-layout-editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Inherited from

[BindingWhenOnSyntax](/auto-docs/free-layout-editor/interfaces/interfaces.BindingWhenOnSyntax.md).[whenTargetNamed](/auto-docs/free-layout-editor/interfaces/interfaces.BindingWhenOnSyntax.md#whentargetnamed)

***

### whenTargetTagged

**whenTargetTagged**(`tag`, `value`): [`BindingOnSyntax`](/auto-docs/free-layout-editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tag` | `string` | `number` | `symbol` |
| `value` | `unknown` |

#### Returns

[`BindingOnSyntax`](/auto-docs/free-layout-editor/interfaces/interfaces.BindingOnSyntax.md)<`T`>

#### Inherited from

[BindingWhenOnSyntax](/auto-docs/free-layout-editor/interfaces/interfaces.BindingWhenOnSyntax.md).[whenTargetTagged](/auto-docs/free-layout-editor/interfaces/interfaces.BindingWhenOnSyntax.md#whentargettagged)
