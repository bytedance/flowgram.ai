# Interface: FieldState

## Table of contents

### Properties

* [errors](/auto-docs/form/interfaces/FieldState.md#errors)
* [invalid](/auto-docs/form/interfaces/FieldState.md#invalid)
* [isDirty](/auto-docs/form/interfaces/FieldState.md#isdirty)
* [isTouched](/auto-docs/form/interfaces/FieldState.md#istouched)
* [isValidating](/auto-docs/form/interfaces/FieldState.md#isvalidating)
* [warnings](/auto-docs/form/interfaces/FieldState.md#warnings)

## Properties

### errors

`Optional` **errors**: [`FieldError`](/auto-docs/form/types/FieldError.md)\[]

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

`Optional` **warnings**: [`FieldWarning`](/auto-docs/form/types/FieldWarning.md)\[]

Field warnings, empty array means there is no warnings.
