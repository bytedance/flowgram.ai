# Function: getParentPathByPattern

[Glob](/en/auto-docs/form/modules/Glob.md).getParentPathByPattern

**getParentPathByPattern**(`pattern`, `path`): `string`

从 path 中提取出匹配pattern 的 parent path，包括是 path 自身
该方法默认 isMatchOrParent(pattern, path) 为 true, 不做为false 的错误处理。

#### Parameters

| Name | Type |
| :------ | :------ |
| `pattern` | `string` |
| `path` | `string` |

#### Returns

`string`
