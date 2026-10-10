# Enumeration: ASTKind

Core AST node types.

## Table of contents

### Enumeration Members

* [Any](/auto-docs/variable-core/enums/ASTKind.md#any)
* [Array](/auto-docs/variable-core/enums/ASTKind.md#array)
* [Boolean](/auto-docs/variable-core/enums/ASTKind.md#boolean)
* [CustomType](/auto-docs/variable-core/enums/ASTKind.md#customtype)
* [DataNode](/auto-docs/variable-core/enums/ASTKind.md#datanode)
* [EnumerateExpression](/auto-docs/variable-core/enums/ASTKind.md#enumerateexpression)
* [Integer](/auto-docs/variable-core/enums/ASTKind.md#integer)
* [KeyPathExpression](/auto-docs/variable-core/enums/ASTKind.md#keypathexpression)
* [ListNode](/auto-docs/variable-core/enums/ASTKind.md#listnode)
* [Map](/auto-docs/variable-core/enums/ASTKind.md#map)
* [MapNode](/auto-docs/variable-core/enums/ASTKind.md#mapnode)
* [Number](/auto-docs/variable-core/enums/ASTKind.md#number)
* [Object](/auto-docs/variable-core/enums/ASTKind.md#object)
* [Property](/auto-docs/variable-core/enums/ASTKind.md#property)
* [String](/auto-docs/variable-core/enums/ASTKind.md#string)
* [Union](/auto-docs/variable-core/enums/ASTKind.md#union)
* [VariableDeclaration](/auto-docs/variable-core/enums/ASTKind.md#variabledeclaration)
* [VariableDeclarationList](/auto-docs/variable-core/enums/ASTKind.md#variabledeclarationlist)
* [WrapArrayExpression](/auto-docs/variable-core/enums/ASTKind.md#wraparrayexpression)

## Enumeration Members

### Any

**Any** = `"Any"`

Any type.
Commonly used for business logic.

***

### Array

**Array** = `"Array"`

Array type.

***

### Boolean

**Boolean** = `"Boolean"`

Boolean type.

***

### CustomType

**CustomType** = `"CustomType"`

Custom type.
For business-defined types.

***

### DataNode

**DataNode** = `"DataNode"`

General-purpose data storage node.

***

### EnumerateExpression

**EnumerateExpression** = `"EnumerateExpression"`

Iterate over specified data.

***

### Integer

**Integer** = `"Integer"`

Integer type.

***

### KeyPathExpression

**KeyPathExpression** = `"KeyPathExpression"`

Access fields on variables through the path system.

***

### ListNode

**ListNode** = `"ListNode"`

General-purpose List<ASTNode> storage node.

***

### Map

**Map** = `"Map"`

Map type.

***

### MapNode

**MapNode** = `"MapNode"`

General-purpose Map\<string, ASTNode> storage node.

***

### Number

**Number** = `"Number"`

Number type.

***

### Object

**Object** = `"Object"`

Object type.

***

### Property

**Property** = `"Property"`

Field definition for Object drill-down.

***

### String

**String** = `"String"`

String type.

***

### Union

**Union** = `"Union"`

Union type.
Commonly used for type checking, generally not exposed to the business.

***

### VariableDeclaration

**VariableDeclaration** = `"VariableDeclaration"`

Variable declaration.

***

### VariableDeclarationList

**VariableDeclarationList** = `"VariableDeclarationList"`

Variable declaration list.

***

### WrapArrayExpression

**WrapArrayExpression** = `"WrapArrayExpression"`

Wrap with Array Type.
