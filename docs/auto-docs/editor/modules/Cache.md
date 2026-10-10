# Namespace: Cache

缓存工具：

1. 可延迟按需创建，提升性能
2. 可支持多个或单个，有些动态创建多个的场景可以共享已有的实例，提升性能
3. 自动删除，超过一定的数目会自动做清空回收

**`Example`**

```ts
function htmlFactory<HTMLElement>(): Cache<HTMLElement> {
   const el = document.createElement('div')
   return Cache.assign(el, { dispose: () => el.remove() })
 }
 const htmlCache = Cache.create<HTMLElement>(htmlFactory)
 console.log(htmlCache.get() === htmlCache.get()) // true
 console.log(htmlCache.getMore(3)) // [HTMLElement, HTMLElement, HTMLElement]
 console.log(htmlCache.getMore(2)) // [HTMLElement, HTMLElement] 自动删除第三个
```

## Table of contents

### Functions

* [assign](/auto-docs/editor/functions/Cache.assign.md)
* [create](/auto-docs/editor/functions/Cache.create.md)
* [createShortCache](/auto-docs/editor/functions/Cache.createShortCache.md)
* [createWeakCache](/auto-docs/editor/functions/Cache.createWeakCache.md)
