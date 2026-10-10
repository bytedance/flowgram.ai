# Interface: FormState

Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
SPDX-License-Identifier: MIT

## Table of contents

### Properties

* [errors](/auto-docs/free-layout-editor/interfaces/FormState.md#errors)
* [invalid](/auto-docs/free-layout-editor/interfaces/FormState.md#invalid)
* [isDirty](/auto-docs/free-layout-editor/interfaces/FormState.md#isdirty)
* [isTouched](/auto-docs/free-layout-editor/interfaces/FormState.md#istouched)
* [isValidating](/auto-docs/free-layout-editor/interfaces/FormState.md#isvalidating)
* [warnings](/auto-docs/free-layout-editor/interfaces/FormState.md#warnings)

## Properties

### errors

`Optional` **errors**: [`Errors`](/auto-docs/free-layout-editor/types/Errors.md)

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

`Optional` **warnings**: [`Warnings`](/auto-docs/free-layout-editor/types/Warnings.md)

Form warnings
