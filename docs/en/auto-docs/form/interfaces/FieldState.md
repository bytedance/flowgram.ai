# Interface: FieldState

## Table of contents

### Properties

* [errors](/en/auto-docs/form/interfaces/FieldState.md#errors)
* [invalid](/en/auto-docs/form/interfaces/FieldState.md#invalid)
* [isDirty](/en/auto-docs/form/interfaces/FieldState.md#isdirty)
* [isTouched](/en/auto-docs/form/interfaces/FieldState.md#istouched)
* [isValidating](/en/auto-docs/form/interfaces/FieldState.md#isvalidating)
* [warnings](/en/auto-docs/form/interfaces/FieldState.md#warnings)

## Properties

### errors

`Optional` **errors**: [`FieldError`](/en/auto-docs/form/types/FieldError.md)\[]

Field errors, empty array means there is no errors.

***

### invalid

**invalid**: `boolean`

If field value is invalid

***

### isDirty

**isDirty**: `boolean`

If field current value is different from the initialValue.

***

### isTouched

**isTouched**: `boolean`

If field input component is touched by user

***

### isValidating

**isValidating**: `boolean`

If field is validating.

***

### warnings

`Optional` **warnings**: [`FieldWarning`](/en/auto-docs/form/types/FieldWarning.md)\[]

Field warnings, empty array means there is no warnings.
