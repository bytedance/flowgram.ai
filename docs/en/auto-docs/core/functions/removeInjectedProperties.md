# Function: removeInjectedProperties

**removeInjectedProperties**(`instance`): `void`

在 rspack 场景编译ts文件时候
decorator 注入的 property 会被当成 this 的属性, 导致 Reflect.metadata 失效

#### Parameters

| Name | Type |
| :------ | :------ |
| `instance` | `any` |

#### Returns

`void`
