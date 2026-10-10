# Type alias: Xor\<T, U>

**Xor**<`T`, `U`>: `T` | `U` extends `object` ? `Without`<`T`, `U`> & `U` | `Without`<`U`, `T`> & `T` : `T` | `U`

#### Type parameters

| Name |
| :------ |
| `T` |
| `U` |
