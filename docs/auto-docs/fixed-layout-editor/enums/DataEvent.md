# Enumeration: DataEvent

## Table of contents

### Enumeration Members

* [onArrayAppend](/auto-docs/fixed-layout-editor/enums/DataEvent.md#onarrayappend)
* [onArrayDelete](/auto-docs/fixed-layout-editor/enums/DataEvent.md#onarraydelete)
* [onValueChange](/auto-docs/fixed-layout-editor/enums/DataEvent.md#onvaluechange)
* [onValueInit](/auto-docs/fixed-layout-editor/enums/DataEvent.md#onvalueinit)
* [onValueInitOrChange](/auto-docs/fixed-layout-editor/enums/DataEvent.md#onvalueinitorchange)

## Enumeration Members

### onArrayAppend

**onArrayAppend** = `"onArrayAppend"`

***

### onArrayDelete

**onArrayDelete** = `"onArrayDelete"`

***

### onValueChange

**onValueChange** = `"onValueChange"`

***

### onValueInit

**onValueInit** = `"onValueInit"`

When value Init，it triggers when

* defaultValue is configured in formMeta, it will trigger when form is initializing.
* defaultValue is configured in Field, it will trigger when this Field is initializing if no initial value is set to this field.

***

### onValueInitOrChange

**onValueInitOrChange** = `"onValueInitOrChange"`

When Value Init or change
