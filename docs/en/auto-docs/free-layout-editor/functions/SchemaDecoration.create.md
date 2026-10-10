# Function: create

[SchemaDecoration](/en/auto-docs/free-layout-editor/modules/SchemaDecoration.md).create

**create**<`T`>(`properties`, `baseDecoration?`, `mixinDefaults?`): [`SchemaDecoration`](/en/auto-docs/free-layout-editor/interfaces/SchemaDecoration-1.md)<`T`>

扩展 SchemaDecoration

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `properties` | `Object` | 定义新的属性 |
| `baseDecoration?` | [`SchemaDecoration`](/en/auto-docs/free-layout-editor/interfaces/SchemaDecoration-1.md)<`any`> | 基类 |
| `mixinDefaults?` | `SchemaMixinDefaults` | 修改默认值 |

#### Returns

[`SchemaDecoration`](/en/auto-docs/free-layout-editor/interfaces/SchemaDecoration-1.md)<`T`>

**`Example`**

```ts
const MySchemaDecoration = SchemaDecoration.create({
     myProp: { label: '', default: 1, type: 'number' }
   },
   TransformSchemaDecoration, // 继承 Transform
   {
     'size.width': 100, // 修改 size 的默认值
     'size.height': 100,
   })
```
