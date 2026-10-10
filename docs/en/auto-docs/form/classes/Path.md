# Class: Path

## Table of contents

### Constructors

* [constructor](/en/auto-docs/form/classes/Path.md#constructor)

### Accessors

* [parent](/en/auto-docs/form/classes/Path.md#parent)
* [value](/en/auto-docs/form/classes/Path.md#value)

### Methods

* [concat](/en/auto-docs/form/classes/Path.md#concat)
* [getArrayIndex](/en/auto-docs/form/classes/Path.md#getarrayindex)
* [isChild](/en/auto-docs/form/classes/Path.md#ischild)
* [isChildOrGrandChild](/en/auto-docs/form/classes/Path.md#ischildorgrandchild)
* [replaceParent](/en/auto-docs/form/classes/Path.md#replaceparent)
* [toString](/en/auto-docs/form/classes/Path.md#tostring)
* [compareArrayPath](/en/auto-docs/form/classes/Path.md#comparearraypath)

## Constructors

### constructor

**new Path**(`path`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` | `string`\[] |

## Accessors

### parent

`get` **parent**(): `undefined` | [`Path`](/en/auto-docs/form/classes/Path.md)

#### Returns

`undefined` | [`Path`](/en/auto-docs/form/classes/Path.md)

***

### value

`get` **value**(): `string`\[]

#### Returns

`string`\[]

## Methods

### concat

**concat**(`name`): [`Path`](/en/auto-docs/form/classes/Path.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` | `number` |

#### Returns

[`Path`](/en/auto-docs/form/classes/Path.md)

***

### getArrayIndex

**getArrayIndex**(`parent`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parent` | [`Path`](/en/auto-docs/form/classes/Path.md) |

#### Returns

`number`

***

### isChild

**isChild**(`path`): `boolean`

仅计直系child

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |

#### Returns

`boolean`

***

### isChildOrGrandChild

**isChildOrGrandChild**(`path`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |

#### Returns

`boolean`

***

### replaceParent

**replaceParent**(`parent`, `newParent`): [`Path`](/en/auto-docs/form/classes/Path.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `parent` | [`Path`](/en/auto-docs/form/classes/Path.md) |
| `newParent` | [`Path`](/en/auto-docs/form/classes/Path.md) |

#### Returns

[`Path`](/en/auto-docs/form/classes/Path.md)

***

### toString

**toString**(): `string`

#### Returns

`string`

***

### compareArrayPath

`Static` **compareArrayPath**(`path1`, `path2`): `number` | `void`

比较两个数组path大小
返回小于0则path1\<path2, 大于0 则path1>path2, 等于0则相等

#### Parameters

| Name | Type |
| :------ | :------ |
| `path1` | [`Path`](/en/auto-docs/form/classes/Path.md) |
| `path2` | [`Path`](/en/auto-docs/form/classes/Path.md) |

#### Returns

`number` | `void`
