# Enumeration: DataEvent

## Table of contents

### Enumeration Members

* [onArrayAppend](/en/auto-docs/free-layout-editor/enums/DataEvent.md#onarrayappend)
* [onArrayDelete](/en/auto-docs/free-layout-editor/enums/DataEvent.md#onarraydelete)
* [onValueChange](/en/auto-docs/free-layout-editor/enums/DataEvent.md#onvaluechange)
* [onValueInit](/en/auto-docs/free-layout-editor/enums/DataEvent.md#onvalueinit)
* [onValueInitOrChange](/en/auto-docs/free-layout-editor/enums/DataEvent.md#onvalueinitorchange)

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
