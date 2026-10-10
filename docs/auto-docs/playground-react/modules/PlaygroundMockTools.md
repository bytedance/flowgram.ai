# Namespace: PlaygroundMockTools

画布测试工具

**`Example`**

```ts
监听 layer 的执行
    const layerState = PlaygroundMockTools.createLayerTestState(PlaygroundLayer)
    layerState.playground.ready()
    expect(layerState.onReady.mock.calls.length).toEqual(1)
    expect(layerState.autorun.mock.calls.length).toEqual(1)
    layerState.playground.config.updateConfig({
      scrollX: 100
    })
    expect(layerState.onReady.mock.calls.length).toEqual(1)
    expect(layerState.autorun.mock.calls.length).toEqual(2)
```

## Table of contents

### Classes

* [LayerTestState](/auto-docs/playground-react/classes/PlaygroundMockTools.LayerTestState.md)

### Functions

* [createContainer](/auto-docs/playground-react/functions/PlaygroundMockTools.createContainer.md)
* [createLayerTestState](/auto-docs/playground-react/functions/PlaygroundMockTools.createLayerTestState.md)
* [createPlayground](/auto-docs/playground-react/functions/PlaygroundMockTools.createPlayground.md)
* [getLayerTestState](/auto-docs/playground-react/functions/PlaygroundMockTools.getLayerTestState.md)
