# 注意事项及常见问题

# 注意事项

1. 画布的 editor 版本及导入的插件版本必须一致，如果出现以下错误都是这个问题造成

2. 画布的事件监听，在 react 中使用都要配套写销毁逻辑，防止无限注册导致内存泄漏

```tsx pure
function SomeReactComp() {
  useEffect(() => {
    const toDispose = ctx.document.onContentChange(() => {
      // DO Something
    })
    return () => toDispose.dispose() // Destroy Event
  }, [])
}
```

# 常见问题

## 运行报报错

## 如何修改节点的数据

## 是否支持 vue

##
