# DisposableCollection

## Usage

```ts pure

import { DisposableCollection, Disposable } from '@flowgram.ai/utils'
const disposable1: Disposable = {
  dispose() {
    console.log(1)
  },
};
const disposable2: Disposable = {
  dispose() {
    console.log(2)
  },
};
const dc = new DisposableCollection();
dc.onDispose(() => {
  console.log('end')
});

dc.pushAll([disposable1, disposable2]);
dc.dispose(); // Log: 1, 2, dispose end

```

## Source Code

https://github.com/bytedance/flowgram.ai/blob/main/packages/common/utils/src/disposable.ts
