# 快捷键

## 自定义快捷键

```ts pure
// 添加到 EditorProps
{
  shortcuts(shortcutsRegistry, ctx) {
      // 按住 cmmand + a，选中所有节点
      shortcutsRegistry.addHandlers({
        commandId: 'selectAll',
        shortcuts: ['meta a', 'ctrl a'],
        isEnabled: (...args) => true,
        execute(...args) {
          const allNodes = ctx.document.getAllNodes();
          ctx.playground.selectionService.selection = allNodes;
        },
      });
  },
}

```

## 通过 CommandService 调用快捷键

```ts pure
const commandService = useService(CommandService)
/**
 * 调用命令服务, args 参数会透传给 execute 和 isEnabled
 */
commandService.executeCommand('selectAll', ...args)

// OR
ctx.get(CommandService).executeCommand('selectAll', ...args)
```
