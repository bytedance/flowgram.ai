# Type alias: RecursivePartial\<T>

**RecursivePartial**<`T`>: { \[P in keyof T]?: T\[P] extends (infer I)\[] ? RecursivePartial\<I>\[] : RecursivePartial\<T\[P]> }

#### Type parameters

| Name |
| :------ |
| `T` |
