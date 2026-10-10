# Interface: FormState

Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
SPDX-License-Identifier: MIT

## Table of contents

### Properties

* [errors](/en/auto-docs/editor/interfaces/FormState.md#errors)
* [invalid](/en/auto-docs/editor/interfaces/FormState.md#invalid)
* [isDirty](/en/auto-docs/editor/interfaces/FormState.md#isdirty)
* [isTouched](/en/auto-docs/editor/interfaces/FormState.md#istouched)
* [isValidating](/en/auto-docs/editor/interfaces/FormState.md#isvalidating)
* [warnings](/en/auto-docs/editor/interfaces/FormState.md#warnings)

## Properties

### errors

`Optional` **errors**: [`Errors`](/en/auto-docs/editor/types/Errors.md)

Form errors

***

### invalid

**invalid**: `boolean`

If the form data is valid

***

### isDirty

**isDirty**: `boolean`

If the form data is different from the intialValues

***

### isTouched

**isTouched**: `boolean`

If the form fields have been touched

***

### isValidating

**isValidating**: `boolean`

If the form is during validation

***

### warnings

`Optional` **warnings**: [`Warnings`](/en/auto-docs/editor/types/Warnings.md)

Form warnings
