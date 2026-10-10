# @flowgram.ai/minimap-plugin

import { PackageManagerTabs } from '@theme';

<PackageManagerTabs
  command={{
npm: "npm install @flowgram.ai/minimap-plugin"
}}
/>

## EditorProps

```ts pure
import { createMinimapPlugin } from '@flowgram.ai/minimap-plugin'


{
  plugins: () => [
    /**
     * Minimap plugin
     */
    createMinimapPlugin({
      disableLayer: true,
      enableDisplayAllNodes: true,
      canvasStyle: {
        canvasWidth: 182,
        canvasHeight: 102,
        canvasPadding: 50,
        canvasBackground: 'rgba(245, 245, 245, 1)',
        canvasBorderRadius: 10,
        viewportBackground: 'rgba(235, 235, 235, 1)',
        viewportBorderRadius: 4,
        viewportBorderColor: 'rgba(201, 201, 201, 1)',
        viewportBorderWidth: 1,
        viewportBorderDashLength: 2,
        nodeColor: 'rgba(255, 255, 255, 1)',
        nodeBorderRadius: 2,
        nodeBorderWidth: 0.145,
        nodeBorderColor: 'rgba(6, 7, 9, 0.10)',
        overlayColor: 'rgba(255, 255, 255, 0)',
      },
    }),
  ]
}
```

## 缩略图组件

```tsx pure
import { MinimapRender } from '@flowgram.ai/minimap-plugin';


export const Minimap = () => {
  return (
    <div
      style={{
        position: 'absolute',
        left: 16,
        bottom: 51,
        zIndex: 100,
        width: 182,
      }}
    >
      <MinimapRender
        containerStyles={{
          pointerEvents: 'auto',
          position: 'relative',
          top: 'unset',
          right: 'unset',
          bottom: 'unset',
          left: 'unset',
        }}
        inactiveStyle={{
          opacity: 1,
          scale: 1,
          translateX: 0,
          translateY: 0,
        }}
      />
    </div>
  );
};

```
