# Interface: FieldState

## Table of contents

### Properties

* [errors](/auto-docs/fixed-layout-editor/interfaces/FieldState.md#errors)
* [invalid](/auto-docs/fixed-layout-editor/interfaces/FieldState.md#invalid)
* [isDirty](/auto-docs/fixed-layout-editor/interfaces/FieldState.md#isdirty)
* [isTouched](/auto-docs/fixed-layout-editor/interfaces/FieldState.md#istouched)
* [isValidating](/auto-docs/fixed-layout-editor/interfaces/FieldState.md#isvalidating)
* [warnings](/auto-docs/fixed-layout-editor/interfaces/FieldState.md#warnings)

## Properties

### errors

`Optional` **errors**: [`FieldError`](/auto-docs/fixed-layout-editor/types/FieldError.md)\[]

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

`Optional` **warnings**: [`FieldWarning`](/auto-docs/fixed-layout-editor/types/FieldWarning.md)\[]

Field warnings, empty array means there is no warnings.
