# Shortcuts

## Customize Shortcuts

```ts pure
// Add to EditorProps
{
  shortcuts(shortcutsRegistry, ctx) {
      // Press command + a to select all nodes
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

## Call Shortcuts by CommandService

```ts pure
const commandService = useService(CommandService)
/**
 * Call command service, args will be passed to execute and isEnabled
 */
commandService.executeCommand('selectAll', ...args)

// OR
ctx.get(CommandService).executeCommand('selectAll', ...args)
```
